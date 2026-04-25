'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeButtonProps {
  variant?: 'default' | 'minimal' | 'floating';
  className?: string;
  showLabel?: boolean;
}

export function HomeButton({ 
  variant = 'default', 
  className,
  showLabel = true 
}: HomeButtonProps) {
  if (variant === 'floating') {
    return (
      <Link
        href="/"
        className={cn(
          'fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full',
          'bg-primary text-primary-foreground shadow-lg hover:shadow-xl',
          'transition-all hover:scale-105 font-mono text-sm',
          'border border-primary/40',
          className
        )}
      >
        <Home className="w-4 h-4" />
        {showLabel && <span>HOME</span>}
      </Link>
    );
  }

  if (variant === 'minimal') {
    return (
      <Link
        href="/"
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded',
          'text-muted-foreground hover:text-primary transition-colors',
          'font-mono text-xs',
          className
        )}
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Back to Home</span>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
        'bg-secondary/50 border border-border hover:border-primary/40',
        'text-foreground hover:text-primary transition-all',
        'font-mono text-sm',
        className
      )}
    >
      <Home className="w-4 h-4" />
      {showLabel && <span>Return to Home</span>}
    </Link>
  );
}

// Breadcrumb-style home navigation
export function HomeBreadcrumb({ 
  currentPage,
  className 
}: { 
  currentPage: string;
  className?: string;
}) {
  return (
    <nav className={cn('flex items-center gap-2 font-mono text-xs', className)}>
      <Link 
        href="/" 
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        HOME
      </Link>
      <span className="text-muted-foreground/50">/</span>
      <span className="text-primary">{currentPage.toUpperCase()}</span>
    </nav>
  );
}
