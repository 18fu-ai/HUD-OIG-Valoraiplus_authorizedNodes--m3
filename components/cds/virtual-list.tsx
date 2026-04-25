'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number | ((index: number, item: T) => number);
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  containerClassName?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  emptyComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  isLoading?: boolean;
  scrollToIndex?: number;
  getItemKey?: (item: T, index: number) => string | number;
}

interface VirtualItem<T> {
  item: T;
  index: number;
  offset: number;
  height: number;
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  overscan = 5,
  className,
  containerClassName,
  onEndReached,
  endReachedThreshold = 200,
  emptyComponent,
  loadingComponent,
  isLoading = false,
  scrollToIndex,
  getItemKey,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Calculate item heights and offsets
  const { virtualItems, totalHeight, heightCache } = useMemo(() => {
    const cache: number[] = [];
    let offset = 0;
    
    const virtualItems: VirtualItem<T>[] = items.map((item, index) => {
      const height = typeof itemHeight === 'function' 
        ? itemHeight(index, item) 
        : itemHeight;
      cache[index] = height;
      const virtualItem = { item, index, offset, height };
      offset += height;
      return virtualItem;
    });

    return {
      virtualItems,
      totalHeight: offset,
      heightCache: cache,
    };
  }, [items, itemHeight]);

  // Find visible range
  const visibleItems = useMemo(() => {
    if (virtualItems.length === 0) return [];

    let startIndex = 0;
    let endIndex = virtualItems.length - 1;

    // Binary search for start
    let low = 0;
    let high = virtualItems.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (virtualItems[mid].offset + virtualItems[mid].height < scrollTop) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    startIndex = Math.max(0, low - overscan);

    // Find end index
    const viewportEnd = scrollTop + containerHeight;
    for (let i = startIndex; i < virtualItems.length; i++) {
      if (virtualItems[i].offset > viewportEnd) {
        endIndex = Math.min(virtualItems.length - 1, i + overscan);
        break;
      }
    }

    return virtualItems.slice(startIndex, endIndex + 1);
  }, [virtualItems, scrollTop, containerHeight, overscan]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);

    // Check if end reached
    if (onEndReached) {
      const distanceFromEnd = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (distanceFromEnd < endReachedThreshold) {
        onEndReached();
      }
    }
  }, [onEndReached, endReachedThreshold]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    setContainerHeight(container.clientHeight);

    return () => resizeObserver.disconnect();
  }, []);

  // Scroll to index
  useEffect(() => {
    if (scrollToIndex !== undefined && containerRef.current && virtualItems[scrollToIndex]) {
      containerRef.current.scrollTop = virtualItems[scrollToIndex].offset;
    }
  }, [scrollToIndex, virtualItems]);

  if (items.length === 0 && !isLoading) {
    return <>{emptyComponent}</>;
  }

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', containerClassName)}
      onScroll={handleScroll}
    >
      <div
        className={cn('relative', className)}
        style={{ height: totalHeight }}
      >
        {visibleItems.map(({ item, index, offset, height }) => (
          <div
            key={getItemKey ? getItemKey(item, index) : index}
            className="absolute left-0 right-0"
            style={{
              top: offset,
              height,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      {isLoading && loadingComponent}
    </div>
  );
}

// Simplified virtualized message list for chat
interface VirtualMessageListProps<T> {
  messages: T[];
  renderMessage: (message: T, index: number) => React.ReactNode;
  className?: string;
  estimatedItemHeight?: number;
  autoScrollToBottom?: boolean;
}

export function VirtualMessageList<T>({
  messages,
  renderMessage,
  className,
  estimatedItemHeight = 120,
  autoScrollToBottom = true,
}: VirtualMessageListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<Map<number, number>>(new Map());
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const prevMessageCount = useRef(messages.length);

  // Calculate offsets
  const { offsets, totalHeight } = useMemo(() => {
    const offsets: number[] = [];
    let offset = 0;
    
    messages.forEach((_, index) => {
      offsets[index] = offset;
      offset += heights.get(index) || estimatedItemHeight;
    });

    return { offsets, totalHeight: offset };
  }, [messages, heights, estimatedItemHeight]);

  // Find visible range
  const visibleRange = useMemo(() => {
    if (messages.length === 0) return { start: 0, end: 0 };

    let start = 0;
    let end = messages.length;

    for (let i = 0; i < messages.length; i++) {
      const itemBottom = offsets[i] + (heights.get(i) || estimatedItemHeight);
      if (itemBottom >= scrollTop) {
        start = Math.max(0, i - 3);
        break;
      }
    }

    for (let i = start; i < messages.length; i++) {
      if (offsets[i] > scrollTop + containerHeight) {
        end = Math.min(messages.length, i + 3);
        break;
      }
    }

    return { start, end };
  }, [messages.length, offsets, heights, scrollTop, containerHeight, estimatedItemHeight]);

  // Measure items
  const measureRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      const height = el.getBoundingClientRect().height;
      setHeights(prev => {
        if (prev.get(index) === height) return prev;
        const next = new Map(prev);
        next.set(index, height);
        return next;
      });
    }
  }, []);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (autoScrollToBottom && messages.length > prevMessageCount.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    prevMessageCount.current = messages.length;
  }, [messages.length, autoScrollToBottom]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    setContainerHeight(container.clientHeight);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {messages.slice(visibleRange.start, visibleRange.end).map((message, i) => {
          const actualIndex = visibleRange.start + i;
          return (
            <div
              key={actualIndex}
              ref={measureRef(actualIndex)}
              style={{
                position: 'absolute',
                top: offsets[actualIndex],
                left: 0,
                right: 0,
              }}
            >
              {renderMessage(message, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
