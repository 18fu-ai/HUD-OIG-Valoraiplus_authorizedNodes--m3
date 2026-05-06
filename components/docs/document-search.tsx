'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocumentSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function DocumentSearch({ query, onQueryChange }: DocumentSearchProps) {
  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="pl-9 pr-9 font-mono text-sm bg-secondary/50 border-border"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
