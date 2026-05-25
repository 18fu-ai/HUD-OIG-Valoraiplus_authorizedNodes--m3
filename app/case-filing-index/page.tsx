'use client';

import { useState, useMemo } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Search,
  FileText,
  Filter,
  ChevronDown,
  ChevronRight,
  Scale,
  Folder,
  Clock,
  AlertTriangle,
  CheckCircle,
  CircleDot,
  ExternalLink,
  FolderOpen,
  ListFilter,
  LayoutGrid,
  List,
  Download,
  ArrowUpDown,
  Upload,
} from 'lucide-react';
import {
  CASE_DOCUMENTS,
  CASE_INFO,
  STACK_DESCRIPTIONS,
  DOC_TYPE_LABELS,
  RAPIDLEGAL_UPLOAD_ORDER,
  RAPIDLEGAL_CATEGORIES,
  RAPIDLEGAL_CATEGORY_COLORS,
  getRecordSummary,
  type CaseDocument,
  type Stack,
  type DocStatus,
  type DocType,
} from '@/lib/case-documents';

type ViewMode = 'list' | 'grid' | 'stack' | 'upload';
type SortField = 'docNumber' | 'title' | 'filingDate' | 'status' | 'type';
type SortDirection = 'asc' | 'desc';

const STATUS_COLORS: Record<DocStatus, { bg: string; text: string; border: string }> = {
  FILED: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/40' },
  PENDING: { bg: 'bg-amber-500/20', text: 'text-amber-500', border: 'border-amber-500/40' },
  LODGED: { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/40' },
  ACTIVE: { bg: 'bg-chart-3/20', text: 'text-chart-3', border: 'border-chart-3/40' },
  EXECUTED: { bg: 'bg-emerald-500/20', text: 'text-emerald-500', border: 'border-emerald-500/40' },
};

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  CRITICAL: { bg: 'bg-destructive/20', text: 'text-destructive' },
  HIGH: { bg: 'bg-amber-500/20', text: 'text-amber-500' },
  MEDIUM: { bg: 'bg-blue-500/20', text: 'text-blue-500' },
  LOW: { bg: 'bg-muted', text: 'text-muted-foreground' },
};

const STACK_COLORS: Record<Stack, string> = {
  A: 'border-l-primary',
  B: 'border-l-blue-500',
  C: 'border-l-chart-3',
  D: 'border-l-amber-500',
  E: 'border-l-emerald-500',
  F: 'border-l-destructive',
  G: 'border-l-violet-500',
  H: 'border-l-cyan-500',
  EXT: 'border-l-muted-foreground',
  I: 'border-l-orange-500',
  J: 'border-l-pink-500',
};

export default function CaseFilingIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStack, setSelectedStack] = useState<Stack | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<DocStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<DocType | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('docNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedStacks, setExpandedStacks] = useState<Set<Stack>>(new Set(['A', 'J']));
  const [showFilters, setShowFilters] = useState(false);

  const summary = getRecordSummary();

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let docs = [...CASE_DOCUMENTS];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.shortDescription.toLowerCase().includes(query) ||
        doc.docNumber.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query)
      );
    }

    // Apply stack filter
    if (selectedStack !== 'all') {
      docs = docs.filter(doc => doc.stack === selectedStack);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      docs = docs.filter(doc => doc.status === selectedStatus);
    }

    // Apply type filter
    if (selectedType !== 'all') {
      docs = docs.filter(doc => doc.type === selectedType);
    }

    // Sort documents
    docs.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'docNumber':
          comparison = a.docNumber.localeCompare(b.docNumber, undefined, { numeric: true });
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'filingDate':
          comparison = a.filingDate.localeCompare(b.filingDate);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return docs;
  }, [searchQuery, selectedStack, selectedStatus, selectedType, sortField, sortDirection]);

  // Group documents by stack
  const documentsByStack = useMemo(() => {
    const groups: Record<Stack, CaseDocument[]> = {
      A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], EXT: [], I: [], J: []
    };
    filteredDocuments.forEach(doc => {
      groups[doc.stack].push(doc);
    });
    return groups;
  }, [filteredDocuments]);

  const toggleStack = (stack: Stack) => {
    const newExpanded = new Set(expandedStacks);
    if (newExpanded.has(stack)) {
      newExpanded.delete(stack);
    } else {
      newExpanded.add(stack);
    }
    setExpandedStacks(newExpanded);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const DocumentCard = ({ doc }: { doc: CaseDocument }) => (
    <div
      className={`bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer border-l-4 ${STACK_COLORS[doc.stack]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-primary">Doc {doc.docNumber}</span>
            {doc.priority && (
              <Badge className={`${PRIORITY_COLORS[doc.priority].bg} ${PRIORITY_COLORS[doc.priority].text} text-[10px] font-mono`}>
                {doc.priority}
              </Badge>
            )}
          </div>
          <h3 className="font-mono text-sm font-semibold text-foreground truncate">{doc.title}</h3>
          <p className="font-mono text-xs text-muted-foreground mt-1 line-clamp-2">{doc.shortDescription}</p>
          {doc.clerkNote && (
            <p className="font-mono text-[10px] text-amber-500 mt-2 italic">{doc.clerkNote}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={`${STATUS_COLORS[doc.status].bg} ${STATUS_COLORS[doc.status].text} font-mono text-[10px]`}>
            {doc.status}
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px]">
            {DOC_TYPE_LABELS[doc.type]}
          </Badge>
          <span className="font-mono text-[10px] text-muted-foreground">{doc.filingDate}</span>
        </div>
      </div>
    </div>
  );

  const DocumentRow = ({ doc }: { doc: CaseDocument }) => (
    <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-primary">Doc {doc.docNumber}</span>
          {doc.priority && (
            <Badge className={`${PRIORITY_COLORS[doc.priority].bg} ${PRIORITY_COLORS[doc.priority].text} text-[10px] font-mono`}>
              {doc.priority}
            </Badge>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="max-w-md">
          <p className="font-mono text-xs font-semibold text-foreground truncate">{doc.title}</p>
          <p className="font-mono text-[10px] text-muted-foreground truncate">{doc.shortDescription}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge variant="outline" className="font-mono text-[10px]">
          {DOC_TYPE_LABELS[doc.type]}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <Badge variant="outline" className="font-mono text-[10px]">
          Stack {doc.stack}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <Badge className={`${STATUS_COLORS[doc.status].bg} ${STATUS_COLORS[doc.status].text} font-mono text-[10px]`}>
          {doc.status}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <span className="font-mono text-xs text-muted-foreground">{doc.filingDate}</span>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <HomeBreadcrumb items={[{ label: 'Dept 12 Filing Index' }]} />
            <HomeButton />
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground flex items-center gap-3">
                <Scale className="w-7 h-7 text-primary" />
                Case Filing Index
              </h1>
              <p className="font-mono text-sm text-muted-foreground mt-1">
                {CASE_INFO.caseNumber} | {CASE_INFO.department} | {CASE_INFO.judge}
              </p>
            </div>
            <a
              href={CASE_INFO.masterRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg hover:bg-primary/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">Master Repository</span>
            </a>
          </div>
        </div>

        {/* Case Info Banner */}
        <Card className="bg-card border-primary/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">PLAINTIFF</div>
                <div className="font-mono text-xs text-foreground">{CASE_INFO.plaintiff}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">DEFENDANT</div>
                <div className="font-mono text-xs text-foreground">{CASE_INFO.defendant}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">STATUS</div>
                <div className="font-mono text-xs text-primary font-bold">{CASE_INFO.defendantStatus}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">RELATED CASE</div>
                <div className="font-mono text-xs text-foreground">{CASE_INFO.relatedCase}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">COURT</div>
                <div className="font-mono text-xs text-foreground">{CASE_INFO.court}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">FILING DATE</div>
                <div className="font-mono text-xs text-foreground">{CASE_INFO.filingDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Record Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-muted-foreground">TOTAL DOCS</div>
            <div className="font-mono text-2xl font-bold text-foreground">{summary.total}</div>
          </div>
          <div className="bg-primary/20 border border-primary/40 rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-primary">FILED</div>
            <div className="font-mono text-2xl font-bold text-primary">{summary.filed}</div>
          </div>
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-amber-500">PENDING</div>
            <div className="font-mono text-2xl font-bold text-amber-500">{summary.pending}</div>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-blue-500">LODGED</div>
            <div className="font-mono text-2xl font-bold text-blue-500">{summary.lodged}</div>
          </div>
          <div className="bg-chart-3/20 border border-chart-3/40 rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-chart-3">ACTIVE</div>
            <div className="font-mono text-2xl font-bold text-chart-3">{summary.active}</div>
          </div>
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-emerald-500">EXECUTED</div>
            <div className="font-mono text-2xl font-bold text-emerald-500">{summary.executed}</div>
          </div>
        </div>

        {/* Search and Filters — hidden in upload order view */}
        {viewMode !== 'upload' && (
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents by title, number, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-mono text-sm"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="font-mono text-xs"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-7 px-2"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-7 px-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'stack' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('stack')}
                  className="h-7 px-2"
                >
                  <Folder className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'upload' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('upload')}
                  className="h-7 px-2"
                  title="RapidLegal Upload Order"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="flex items-center gap-4 flex-wrap pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Stack:</span>
                  <select
                    value={selectedStack}
                    onChange={(e) => setSelectedStack(e.target.value as Stack | 'all')}
                    className="bg-secondary border border-border rounded px-2 py-1 font-mono text-xs"
                  >
                    <option value="all">All Stacks</option>
                    {(Object.keys(STACK_DESCRIPTIONS) as Stack[]).map(stack => (
                      <option key={stack} value={stack}>
                        Stack {stack} - {STACK_DESCRIPTIONS[stack].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as DocStatus | 'all')}
                    className="bg-secondary border border-border rounded px-2 py-1 font-mono text-xs"
                  >
                    <option value="all">All Statuses</option>
                    <option value="FILED">Filed</option>
                    <option value="PENDING">Pending</option>
                    <option value="LODGED">Lodged</option>
                    <option value="ACTIVE">Active</option>
                    <option value="EXECUTED">Executed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Type:</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as DocType | 'all')}
                    className="bg-secondary border border-border rounded px-2 py-1 font-mono text-xs"
                  >
                    <option value="all">All Types</option>
                    {(Object.entries(DOC_TYPE_LABELS) as [DocType, string][]).map(([type, label]) => (
                      <option key={type} value={type}>{label}</option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedStack('all');
                    setSelectedStatus('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="font-mono text-xs text-muted-foreground"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Results Count — hidden in upload order view */}
        {viewMode !== 'upload' && (
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-muted-foreground">
            Showing {filteredDocuments.length} of {CASE_DOCUMENTS.length} documents
          </span>
        </div>
        )}

        {/* Document Views */}
        {viewMode === 'list' && (
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th
                        className="font-mono text-xs text-muted-foreground text-left py-3 px-4 cursor-pointer hover:text-foreground"
                        onClick={() => toggleSort('docNumber')}
                      >
                        <div className="flex items-center gap-1">
                          DOC #
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        className="font-mono text-xs text-muted-foreground text-left py-3 px-4 cursor-pointer hover:text-foreground"
                        onClick={() => toggleSort('title')}
                      >
                        <div className="flex items-center gap-1">
                          TITLE / DESCRIPTION
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        className="font-mono text-xs text-muted-foreground text-left py-3 px-4 cursor-pointer hover:text-foreground"
                        onClick={() => toggleSort('type')}
                      >
                        <div className="flex items-center gap-1">
                          TYPE
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="font-mono text-xs text-muted-foreground text-left py-3 px-4">STACK</th>
                      <th
                        className="font-mono text-xs text-muted-foreground text-left py-3 px-4 cursor-pointer hover:text-foreground"
                        onClick={() => toggleSort('status')}
                      >
                        <div className="flex items-center gap-1">
                          STATUS
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th
                        className="font-mono text-xs text-muted-foreground text-left py-3 px-4 cursor-pointer hover:text-foreground"
                        onClick={() => toggleSort('filingDate')}
                      >
                        <div className="flex items-center gap-1">
                          DATE
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map(doc => (
                      <DocumentRow key={doc.docNumber} doc={doc} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.docNumber} doc={doc} />
            ))}
          </div>
        )}

        {viewMode === 'stack' && (
          <div className="space-y-4">
            {(Object.keys(STACK_DESCRIPTIONS) as Stack[]).map(stack => {
              const docs = documentsByStack[stack];
              if (docs.length === 0) return null;

              const isExpanded = expandedStacks.has(stack);
              const stackInfo = STACK_DESCRIPTIONS[stack];

              return (
                <Card key={stack} className={`bg-card border-border border-l-4 ${STACK_COLORS[stack]}`}>
                  <CardHeader
                    className="cursor-pointer hover:bg-secondary/30 transition-colors"
                    onClick={() => toggleStack(stack)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <FolderOpen className="w-5 h-5 text-primary" />
                        ) : (
                          <Folder className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <CardTitle className="font-mono text-sm">
                            Stack {stack}: {stackInfo.name}
                          </CardTitle>
                          <p className="font-mono text-xs text-muted-foreground">{stackInfo.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {docs.length} docs
                        </Badge>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="space-y-3 border-t border-border pt-4">
                        {docs.map(doc => (
                          <DocumentCard key={doc.docNumber} doc={doc} />
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {viewMode === 'upload' && (
          <div className="space-y-4">
            {/* Header */}
            <Card className="bg-card border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Upload className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-mono text-sm font-bold text-foreground mb-1">
                      RapidLegal / LegalConnect Upload Order — 33-Document Priority Tranche
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground">
                      Judge-readable sequencing: court readability → ADA/access → witness preservation → factual declarations → dispositive motions → forensic chronologies → related-case notices → final compliance notices.
                      Do <strong className="text-foreground">not</strong> upload the Combined Reference Copy as a separate filing. Upload Doc 065 (R2 clerk-ready version) only once.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category legend */}
            <div className="flex flex-wrap gap-2">
              {RAPIDLEGAL_CATEGORIES.map(cat => {
                const colors = RAPIDLEGAL_CATEGORY_COLORS[cat];
                return (
                  <span key={cat} className={`font-mono text-[10px] px-2 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {cat}
                  </span>
                );
              })}
            </div>

            {/* Upload order table */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="font-mono text-xs text-muted-foreground text-left py-3 px-4 w-16">#</th>
                        <th className="font-mono text-xs text-muted-foreground text-left py-3 px-4 w-28">DOC</th>
                        <th className="font-mono text-xs text-muted-foreground text-left py-3 px-4">TITLE</th>
                        <th className="font-mono text-xs text-muted-foreground text-left py-3 px-4 hidden md:table-cell">CATEGORY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RAPIDLEGAL_UPLOAD_ORDER.map(entry => {
                        const colors = RAPIDLEGAL_CATEGORY_COLORS[entry.category];
                        return (
                          <tr
                            key={entry.uploadOrder}
                            className={`border-b border-border/50 hover:bg-secondary/30 transition-colors border-l-4 ${colors.border}`}
                          >
                            <td className="py-3 px-4">
                              <span className={`font-mono text-sm font-bold ${colors.text}`}>
                                {String(entry.uploadOrder).padStart(2, '0')}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono text-xs font-bold text-primary">
                                Doc {entry.docNumber}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono text-xs text-foreground">{entry.title}</span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className={`font-mono text-[10px] px-2 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                                {entry.category}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-muted">
              <CardContent className="p-4">
                <p className="font-mono text-xs text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> The previously staged RapidLegal / LegalConnect materials are not abandoned — they remain preserved for authentication, discovery, agency review, later filing, or evidentiary use if needed. See Doc 099-R1 (Amended RJN) for the court-safe limitation on judicial notice.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-mono text-lg text-foreground mb-2">No documents found</h3>
            <p className="font-mono text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Footer Notice */}
        <Card className="bg-secondary/30 border-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="font-mono text-xs text-muted-foreground">
                <p className="mb-2">
                  <strong className="text-foreground">Notice:</strong> This index is provided as an index, roadmap, and routing aid. 
                  It is not intended to replace any separately uploaded motion, declaration, exhibit, proof of service, or accommodation request.
                </p>
                <p>
                  Any disputed factual statement in the indexed filings is submitted as Defendant&apos;s report, contention, 
                  or preservation position, subject to Court review, transcript confirmation, discovery, and admissible evidence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
