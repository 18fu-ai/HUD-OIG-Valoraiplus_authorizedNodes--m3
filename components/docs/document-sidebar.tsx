'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, FileCode, Building2, Users, Lock, 
  Coins, Server, FileText, Network, CheckCircle2
} from 'lucide-react';

const sections = [
  {
    id: 'security-architecture',
    title: 'Security Architecture',
    icon: Shield,
    status: 'LOCKED',
    category: 'Security',
  },
  {
    id: 'smart-contract',
    title: 'Smart Contract Specification',
    icon: FileCode,
    status: 'DEPLOYED',
    category: 'Technical',
  },
  {
    id: 'institutional-liability',
    title: 'Institutional Liability Matrix',
    icon: Building2,
    status: 'ANCHORED',
    category: 'Legal',
  },
  {
    id: 'governance',
    title: 'Governance Structure',
    icon: Users,
    status: 'CONFIRMED',
    category: 'Governance',
  },
  {
    id: 'verification-layer',
    title: 'Verification Layer',
    icon: Lock,
    status: 'DEPLOYED',
    category: 'Technical',
  },
  {
    id: 'beneficiary-tokens',
    title: 'Beneficiary Tokens',
    icon: Coins,
    status: 'PROTECTED',
    category: 'Assets',
  },
  {
    id: 'node-specifications',
    title: 'Node Specifications',
    icon: Server,
    status: 'OPERATIONAL',
    category: 'Infrastructure',
  },
  {
    id: 'federal-coordination',
    title: 'Federal Coordination',
    icon: Building2,
    status: 'ACTIVE',
    category: 'Legal',
  },
  {
    id: 'audit-trail',
    title: 'Technical Audit Trail',
    icon: FileText,
    status: 'DOCUMENTED',
    category: 'Evidence',
  },
  {
    id: 'network-topology',
    title: 'Network Topology',
    icon: Network,
    status: 'MAPPED',
    category: 'Infrastructure',
  },
];

const categories = ['Security', 'Technical', 'Legal', 'Governance', 'Assets', 'Infrastructure', 'Evidence'];

interface DocumentSidebarProps {
  selectedSection: string;
  onSelectSection: (section: string) => void;
  searchQuery: string;
}

export function DocumentSidebar({ selectedSection, onSelectSection, searchQuery }: DocumentSidebarProps) {
  const filteredSections = searchQuery
    ? sections.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections;

  const groupedSections = categories.map(category => ({
    category,
    items: filteredSections.filter(s => s.category === category),
  })).filter(g => g.items.length > 0);

  return (
    <div className="w-72 border-r border-border bg-card/30 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="p-4 space-y-6">
        {groupedSections.map(({ category, items }) => (
          <div key={category}>
            <h3 className="font-mono text-xs text-muted-foreground uppercase mb-2 px-2">
              {category}
            </h3>
            <div className="space-y-1">
              {items.map((section) => {
                const Icon = section.icon;
                const isSelected = selectedSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => onSelectSection(section.id)}
                    className={cn(
                      'w-full p-3 rounded-md text-left transition-all',
                      'flex items-start gap-3',
                      isSelected
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-secondary/50 border border-transparent'
                    )}
                  >
                    <Icon className={cn(
                      'w-4 h-4 mt-0.5 flex-shrink-0',
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-mono text-sm truncate',
                        isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                      )}>
                        {section.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="font-mono text-xs text-green-400">{section.status}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
