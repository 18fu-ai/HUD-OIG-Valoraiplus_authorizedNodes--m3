'use client';

import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, Info, XCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'default' | 'chat' | 'forensic' | 'compact';
  enableCopy?: boolean;
}

// Token types for parser
type TokenType = 
  | 'heading' 
  | 'bold' 
  | 'italic' 
  | 'code' 
  | 'codeblock' 
  | 'link' 
  | 'list' 
  | 'table' 
  | 'blockquote' 
  | 'hr' 
  | 'paragraph'
  | 'status'
  | 'alert';

interface Token {
  type: TokenType;
  content: string;
  level?: number;
  items?: string[];
  rows?: string[][];
  variant?: string;
}

// Parse markdown into tokens
function parseMarkdown(content: string): Token[] {
  const tokens: Token[] = [];
  // Guard against undefined/null content
  if (!content || typeof content !== 'string') {
    return tokens;
  }
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // Code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      tokens.push({
        type: 'codeblock',
        content: codeLines.join('\n'),
        variant: lang || 'text',
      });
      i++;
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      tokens.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      i++;
      continue;
    }

    // Status badges [STATUS: text] or [ALERT: text]
    const statusMatch = trimmed.match(/^\[(STATUS|ALERT|INFO|SUCCESS|WARNING|ERROR):\s*(.+)\]$/i);
    if (statusMatch) {
      tokens.push({
        type: statusMatch[1].toUpperCase() === 'ALERT' ? 'alert' : 'status',
        variant: statusMatch[1].toLowerCase(),
        content: statusMatch[2],
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(trimmed)) {
      tokens.push({ type: 'hr', content: '' });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().slice(1).trim());
        i++;
      }
      tokens.push({
        type: 'blockquote',
        content: quoteLines.join('\n'),
      });
      continue;
    }

    // Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim();
        // Skip separator rows
        if (!/^\|[-:\s|]+\|$/.test(row)) {
          const cells = row.split('|').slice(1, -1).map(c => c.trim());
          tableRows.push(cells);
        }
        i++;
      }
      if (tableRows.length > 0) {
        tokens.push({
          type: 'table',
          content: '',
          rows: tableRows,
        });
      }
      continue;
    }

    // List items
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && (/^[-*+]\s/.test(lines[i].trim()) || /^\d+\.\s/.test(lines[i].trim()))) {
        const item = lines[i].trim().replace(/^[-*+]\s|^\d+\.\s/, '');
        listItems.push(item);
        i++;
      }
      tokens.push({
        type: 'list',
        content: '',
        items: listItems,
      });
      continue;
    }

    // Paragraph
    tokens.push({
      type: 'paragraph',
      content: trimmed,
    });
    i++;
  }

  return tokens;
}

// Render inline markdown (bold, italic, code, links)
function renderInline(text: string, variant: string = 'default'): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns: { regex: RegExp; render: (match: RegExpMatchArray) => React.ReactNode }[] = [
    // Bold
    {
      regex: /\*\*(.+?)\*\*/,
      render: (m) => <strong key={key++} className="font-bold text-foreground">{m[1]}</strong>,
    },
    // Italic
    {
      regex: /\*(.+?)\*/,
      render: (m) => <em key={key++} className="italic">{m[1]}</em>,
    },
    // Inline code
    {
      regex: /`([^`]+)`/,
      render: (m) => (
        <code key={key++} className="px-1.5 py-0.5 rounded bg-secondary/50 font-mono text-xs text-primary">
          {m[1]}
        </code>
      ),
    },
    // Links
    {
      regex: /\[([^\]]+)\]\(([^)]+)\)/,
      render: (m) => (
        <a
          key={key++}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          {m[1]}
        </a>
      ),
    },
    // Status indicators like [ANCHORED] or [SATURATED]
    {
      regex: /\[(ANCHORED|SATURATED|ACTIVE|LOCKED|SYNCED|ENFORCED|PENDING|ERROR)\]/i,
      render: (m) => {
        const status = m[1].toUpperCase();
        const colorMap: Record<string, string> = {
          ANCHORED: 'text-status-anchored bg-status-anchored/10',
          SATURATED: 'text-status-saturated bg-status-saturated/10',
          ACTIVE: 'text-status-active bg-status-active/10',
          LOCKED: 'text-status-locked bg-status-locked/10',
          SYNCED: 'text-cyan-400 bg-cyan-400/10',
          ENFORCED: 'text-amber-400 bg-amber-400/10',
          PENDING: 'text-yellow-400 bg-yellow-400/10',
          ERROR: 'text-destructive bg-destructive/10',
        };
        return (
          <span
            key={key++}
            className={cn(
              'inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px] font-bold',
              colorMap[status] || 'text-muted-foreground bg-muted/20'
            )}
          >
            {status}
          </span>
        );
      },
    },
  ];

  while (remaining) {
    let earliestMatch: { index: number; match: RegExpMatchArray; pattern: typeof patterns[0] } | null = null;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index !== undefined) {
        if (!earliestMatch || match.index < earliestMatch.index) {
          earliestMatch = { index: match.index, match, pattern };
        }
      }
    }

    if (earliestMatch) {
      if (earliestMatch.index > 0) {
        elements.push(remaining.slice(0, earliestMatch.index));
      }
      elements.push(earliestMatch.pattern.render(earliestMatch.match));
      remaining = remaining.slice(earliestMatch.index + earliestMatch.match[0].length);
    } else {
      elements.push(remaining);
      break;
    }
  }

  return elements;
}

// Code block component with copy
const CodeBlock = memo(function CodeBlock({ 
  content, 
  language,
  enableCopy 
}: { 
  content: string; 
  language?: string;
  enableCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3">
      {language && (
        <div className="absolute top-0 left-0 px-2 py-1 bg-secondary/80 rounded-tl rounded-br text-[10px] font-mono text-muted-foreground">
          {language}
        </div>
      )}
      {enableCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-3 h-3 text-status-anchored" />
          ) : (
            <Copy className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      )}
      <pre className="p-4 pt-8 rounded-lg bg-secondary/30 border border-border overflow-x-auto">
        <code className="font-mono text-xs text-foreground whitespace-pre-wrap break-words">
          {content}
        </code>
      </pre>
    </div>
  );
});

// Alert/Status component
const AlertBlock = memo(function AlertBlock({ variant, content }: { variant: string; content: string }) {
  const config: Record<string, { icon: React.ReactNode; className: string }> = {
    success: { 
      icon: <CheckCircle2 className="w-4 h-4" />, 
      className: 'border-status-anchored/50 bg-status-anchored/10 text-status-anchored' 
    },
    warning: { 
      icon: <AlertTriangle className="w-4 h-4" />, 
      className: 'border-amber-500/50 bg-amber-500/10 text-amber-400' 
    },
    error: { 
      icon: <XCircle className="w-4 h-4" />, 
      className: 'border-destructive/50 bg-destructive/10 text-destructive' 
    },
    info: { 
      icon: <Info className="w-4 h-4" />, 
      className: 'border-primary/50 bg-primary/10 text-primary' 
    },
    alert: { 
      icon: <AlertTriangle className="w-4 h-4" />, 
      className: 'border-amber-500/50 bg-amber-500/10 text-amber-400' 
    },
  };

  const { icon, className } = config[variant] || config.info;

  return (
    <div className={cn('flex items-start gap-3 p-3 rounded-lg border my-2', className)}>
      {icon}
      <span className="font-mono text-sm">{content}</span>
    </div>
  );
});

// Main renderer component
export const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  className,
  variant = 'default',
  enableCopy = true,
}: MarkdownRendererProps) {
  // Guard: return empty if no content
  const safeContent = content ?? '';
  const tokens = useMemo(() => parseMarkdown(safeContent), [safeContent]);

  const variantStyles = {
    default: 'text-foreground',
    chat: 'text-emerald-400',
    forensic: 'text-amber-300',
    compact: 'text-foreground text-sm',
  };

  return (
    <div className={cn('space-y-2', variantStyles[variant], className)}>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'heading':
            const HeadingTag = `h${token.level || 2}` as keyof JSX.IntrinsicElements;
            const headingSizes: Record<number, string> = {
              1: 'text-2xl font-bold',
              2: 'text-xl font-bold',
              3: 'text-lg font-semibold',
              4: 'text-base font-semibold',
              5: 'text-sm font-semibold',
              6: 'text-xs font-semibold uppercase tracking-wider',
            };
            return (
              <HeadingTag
                key={index}
                className={cn(
                  headingSizes[token.level || 2],
                  'font-mono text-foreground mt-4 mb-2'
                )}
              >
                {renderInline(token.content, variant)}
              </HeadingTag>
            );

          case 'paragraph':
            return (
              <p key={index} className="leading-relaxed">
                {renderInline(token.content, variant)}
              </p>
            );

          case 'codeblock':
            return (
              <CodeBlock
                key={index}
                content={token.content}
                language={token.variant}
                enableCopy={enableCopy}
              />
            );

          case 'list':
            return (
              <ul key={index} className="space-y-1 ml-4">
                {token.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">-</span>
                    <span>{renderInline(item, variant)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={index} className="overflow-x-auto my-3">
                <table className="w-full border-collapse font-mono text-xs">
                  <tbody>
                    {token.rows?.map((row, i) => (
                      <tr key={i} className={i === 0 ? 'border-b border-border' : ''}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={cn(
                              'px-3 py-2 border-r border-border last:border-r-0',
                              i === 0 ? 'font-bold text-foreground' : 'text-muted-foreground'
                            )}
                          >
                            {renderInline(cell, variant)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'blockquote':
            return (
              <blockquote
                key={index}
                className="border-l-2 border-primary/50 pl-4 py-1 italic text-muted-foreground"
              >
                {renderInline(token.content, variant)}
              </blockquote>
            );

          case 'hr':
            return <hr key={index} className="border-border my-4" />;

          case 'status':
          case 'alert':
            return (
              <AlertBlock
                key={index}
                variant={token.variant || 'info'}
                content={token.content}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
});

export default MarkdownRenderer;
