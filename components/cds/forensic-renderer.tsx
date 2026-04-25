'use client';

import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronDown,
  ChevronRight,
  FileSearch,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Hash,
  Layers,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Filter,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

// Types
interface ForensicEvidence {
  id: string;
  type: 'document' | 'email' | 'transaction' | 'voip' | 'metadata' | 'hash';
  source: string;
  timestamp: string;
  hash?: string;
  status: 'verified' | 'pending' | 'flagged' | 'spoliated';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  details?: Record<string, unknown>;
  children?: ForensicEvidence[];
}

interface ForensicChain {
  id: string;
  name: string;
  status: string;
  items: ForensicEvidence[];
  metadata: {
    totalItems: number;
    verifiedItems: number;
    flaggedItems: number;
    lastUpdated: string;
  };
}

// Status badge component
const StatusBadge = memo(function StatusBadge({ 
  status 
}: { 
  status: ForensicEvidence['status'] 
}) {
  const config = {
    verified: { 
      className: 'bg-status-anchored/20 text-status-anchored border-status-anchored/40',
      icon: <CheckCircle2 className="w-3 h-3" />
    },
    pending: { 
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      icon: <Clock className="w-3 h-3" />
    },
    flagged: { 
      className: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      icon: <AlertTriangle className="w-3 h-3" />
    },
    spoliated: { 
      className: 'bg-destructive/20 text-destructive border-destructive/40',
      icon: <AlertTriangle className="w-3 h-3" />
    },
  };

  const { className, icon } = config[status];

  return (
    <Badge variant="outline" className={cn('font-mono text-[10px] gap-1', className)}>
      {icon}
      {status.toUpperCase()}
    </Badge>
  );
});

// Severity indicator
const SeverityIndicator = memo(function SeverityIndicator({ 
  severity 
}: { 
  severity: ForensicEvidence['severity'] 
}) {
  const colors = {
    critical: 'bg-destructive',
    high: 'bg-amber-500',
    medium: 'bg-yellow-500',
    low: 'bg-muted-foreground',
  };

  return (
    <div className="flex items-center gap-1.5" title={`Severity: ${severity}`}>
      <div className={cn('w-2 h-2 rounded-full', colors[severity])} />
      <span className="font-mono text-[10px] text-muted-foreground uppercase">
        {severity}
      </span>
    </div>
  );
});

// Single evidence item renderer
const EvidenceItem = memo(function EvidenceItem({
  evidence,
  depth = 0,
  expanded,
  onToggle,
}: {
  evidence: ForensicEvidence;
  depth?: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const hasChildren = evidence.children && evidence.children.length > 0;

  const handleCopyHash = async () => {
    if (evidence.hash) {
      await navigator.clipboard.writeText(evidence.hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const typeIcons = {
    document: <FileSearch className="w-4 h-4" />,
    email: <FileSearch className="w-4 h-4" />,
    transaction: <Hash className="w-4 h-4" />,
    voip: <FileSearch className="w-4 h-4" />,
    metadata: <Layers className="w-4 h-4" />,
    hash: <Lock className="w-4 h-4" />,
  };

  return (
    <div className={cn('border-l-2 border-border', depth > 0 && 'ml-4')}>
      <div
        className={cn(
          'flex items-start gap-3 p-3 hover:bg-secondary/30 transition-colors cursor-pointer',
          evidence.status === 'spoliated' && 'bg-destructive/5'
        )}
        onClick={onToggle}
      >
        {/* Expand/collapse icon */}
        <div className="shrink-0 mt-0.5">
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </div>

        {/* Type icon */}
        <div className="shrink-0 mt-0.5 text-primary">
          {typeIcons[evidence.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-medium text-foreground truncate">
              {evidence.source}
            </span>
            <StatusBadge status={evidence.status} />
            <SeverityIndicator severity={evidence.severity} />
          </div>
          
          <p className="font-mono text-xs text-muted-foreground line-clamp-2">
            {evidence.description}
          </p>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="font-mono">{evidence.timestamp}</span>
            <span className="font-mono uppercase">{evidence.type}</span>
            {evidence.hash && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyHash();
                }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span className="truncate max-w-[120px]">{evidence.hash}</span>
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Details panel */}
      {showDetails && evidence.details && (
        <div className="ml-11 mr-3 mb-3 p-3 rounded bg-secondary/20 border border-border">
          <pre className="font-mono text-[10px] text-muted-foreground overflow-x-auto">
            {JSON.stringify(evidence.details, null, 2)}
          </pre>
        </div>
      )}

      {/* Children */}
      {expanded && hasChildren && (
        <div className="border-t border-border">
          {evidence.children?.map((child) => (
            <EvidenceItemWrapper key={child.id} evidence={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
});

// Wrapper to manage expand state
function EvidenceItemWrapper({ 
  evidence, 
  depth = 0 
}: { 
  evidence: ForensicEvidence; 
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <EvidenceItem
      evidence={evidence}
      depth={depth}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    />
  );
}

// Main forensic chain renderer
export const ForensicChainRenderer = memo(function ForensicChainRenderer({
  chain,
  className,
  compact = false,
}: {
  chain: ForensicChain;
  className?: string;
  compact?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ForensicEvidence['status'] | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<ForensicEvidence['severity'] | 'all'>('all');

  // Filter items
  const filteredItems = useMemo(() => {
    return chain.items.filter((item) => {
      const matchesSearch = !searchQuery || 
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [chain.items, searchQuery, statusFilter, severityFilter]);

  return (
    <Card className={cn('border-border', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            {chain.name}
          </CardTitle>
          <Badge variant="outline" className="font-mono text-[10px]">
            {chain.status}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
          <span>Total: {chain.metadata.totalItems}</span>
          <span className="text-status-anchored">Verified: {chain.metadata.verifiedItems}</span>
          <span className="text-destructive">Flagged: {chain.metadata.flaggedItems}</span>
          <span>Updated: {chain.metadata.lastUpdated}</span>
        </div>
      </CardHeader>

      {!compact && (
        <div className="px-4 pb-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono text-xs h-8"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="h-7 px-2 rounded border border-border bg-background font-mono text-xs"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="spoliated">Spoliated</option>
            </select>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as typeof severityFilter)}
              className="h-7 px-2 rounded border border-border bg-background font-mono text-xs"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      <CardContent className="p-0 border-t border-border max-h-[500px] overflow-auto">
        {filteredItems.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground font-mono text-sm">
            No evidence items match your filters
          </div>
        ) : (
          filteredItems.map((item) => (
            <EvidenceItemWrapper key={item.id} evidence={item} />
          ))
        )}
      </CardContent>
    </Card>
  );
});

// Multi-chain forensic dashboard
export const ForensicDashboard = memo(function ForensicDashboard({
  chains,
  className,
}: {
  chains: ForensicChain[];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(chains[0]?.id || '');

  // Calculate totals
  const totals = useMemo(() => {
    return chains.reduce(
      (acc, chain) => ({
        total: acc.total + chain.metadata.totalItems,
        verified: acc.verified + chain.metadata.verifiedItems,
        flagged: acc.flagged + chain.metadata.flaggedItems,
      }),
      { total: 0, verified: 0, flagged: 0 }
    );
  }, [chains]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-primary" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">Total Evidence</p>
                <p className="font-mono text-lg font-bold text-foreground">{totals.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-status-anchored/30 bg-status-anchored/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-anchored" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">Verified</p>
                <p className="font-mono text-lg font-bold text-status-anchored">{totals.verified}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">Flagged</p>
                <p className="font-mono text-lg font-bold text-destructive">{totals.flagged}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">Chains</p>
                <p className="font-mono text-lg font-bold text-primary">{chains.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Chain View */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          {chains.map((chain) => (
            <TabsTrigger
              key={chain.id}
              value={chain.id}
              className="font-mono text-xs"
              aria-pressed={activeTab === chain.id}
            >
              {chain.name}
              <Badge variant="outline" className="ml-2 text-[10px]">
                {chain.metadata.totalItems}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {chains.map((chain) => (
          <TabsContent key={chain.id} value={chain.id} className="mt-4">
            <ForensicChainRenderer chain={chain} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
});

export default ForensicChainRenderer;
