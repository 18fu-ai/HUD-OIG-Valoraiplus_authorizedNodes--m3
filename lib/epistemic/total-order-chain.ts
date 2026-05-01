/**
 * VALORAIPLUS Total Order Epistemic Chain
 * Maintains monotonic ordering of all epistemic events
 */

import type { EpistemicEvent } from './types';

export class TotalOrderEpistemicChain {
  private events: EpistemicEvent[] = [];
  private sequenceCounter: number = 0;

  /**
   * Append event to chain, maintaining total order by timestamp
   */
  append(event: EpistemicEvent): void {
    this.events.push({
      ...event,
      id: event.id || `evt_${++this.sequenceCounter}_${Date.now()}`,
    });

    // Sort by timestamp to maintain total order
    this.events.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Get all events in total order
   */
  getEvents(): EpistemicEvent[] {
    return [...this.events];
  }

  /**
   * Get events by type
   */
  getEventsByType(type: string): EpistemicEvent[] {
    return this.events.filter(e => e.type === type);
  }

  /**
   * Get latest event
   */
  getLatestEvent(): EpistemicEvent | null {
    return this.events.length > 0 
      ? this.events[this.events.length - 1] 
      : null;
  }

  /**
   * Get event count
   */
  getEventCount(): number {
    return this.events.length;
  }

  /**
   * Compute chain hash for integrity verification
   */
  computeChainHash(): string {
    const chainData = this.events
      .map(e => `${e.id}:${e.timestamp}:${e.type}`)
      .join('|');
    
    // Simple hash for demonstration - in production use crypto
    let hash = 0;
    for (let i = 0; i < chainData.length; i++) {
      const char = chainData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `0x${Math.abs(hash).toString(16).padStart(16, '0')}`;
  }

  /**
   * Verify chain integrity
   */
  verifyChainIntegrity(): boolean {
    // Check monotonic ordering
    for (let i = 1; i < this.events.length; i++) {
      if (this.events[i].timestamp < this.events[i - 1].timestamp) {
        return false;
      }
    }
    return true;
  }

  /**
   * Clear chain (for testing)
   */
  clear(): void {
    this.events = [];
    this.sequenceCounter = 0;
  }
}

// Singleton instance
export const epistemicChain = new TotalOrderEpistemicChain();
