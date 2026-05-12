'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileJson, 
  FileText, 
  Copy, 
  Check, 
  Printer,
  FileCode,
  Loader2,
  Shield
} from 'lucide-react';

interface ExportData {
  type: 'transcript' | 'report' | 'forensic' | 'contract' | 'dashboard' | 'protocol' | 'architecture' | 'audit' | 'intelligence' | 'presentation' | 'braindish-evolution' | 'policy-engine';
  title: string;
  timestamp: string;
  content: unknown;
  metadata?: Record<string, unknown>;
}

interface ExportToolsProps {
  data: ExportData;
  formats?: ('json' | 'txt' | 'md' | 'html')[];
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
  showPreview?: boolean;
}

// Format data to JSON with sovereignty markers
function formatToJSON(data: ExportData): string {
  const exportPayload = {
    _export: {
      version: 'VALORAI-EXPORT-1.0',
      type: data.type,
      timestamp: data.timestamp,
      seal: 'DG77.77X-LOCKED',
      integrity: 'REFERENCE_ONLY_SIM',
    },
    title: data.title,
    content: data.content,
    metadata: data.metadata || {},
  };
  return JSON.stringify(exportPayload, null, 2);
}

// Format data to plain text
function formatToText(data: ExportData): string {
  const lines: string[] = [
    '═'.repeat(60),
    `VALORAI+ EXPORT | ${data.type.toUpperCase()}`,
    '═'.repeat(60),
    '',
    `Title: ${data.title}`,
    `Timestamp: ${data.timestamp}`,
    `Seal: DG77.77X-LOCKED`,
    '',
    '─'.repeat(60),
    'CONTENT',
    '─'.repeat(60),
    '',
  ];

  if (typeof data.content === 'string') {
    lines.push(data.content);
  } else if (Array.isArray(data.content)) {
    data.content.forEach((item, i) => {
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        if ('role' in obj && 'content' in obj) {
          lines.push(`[${String(obj.role).toUpperCase()}]`);
          lines.push(String(obj.content));
          lines.push('');
        } else {
          lines.push(`[${i + 1}] ${JSON.stringify(obj)}`);
        }
      } else {
        lines.push(String(item));
      }
    });
  } else if (typeof data.content === 'object') {
    lines.push(JSON.stringify(data.content, null, 2));
  }

  lines.push('');
  lines.push('─'.repeat(60));
  lines.push('METADATA');
  lines.push('─'.repeat(60));
  
  if (data.metadata) {
    Object.entries(data.metadata).forEach(([key, value]) => {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    });
  }

  lines.push('');
  lines.push('═'.repeat(60));
  lines.push('THE WALL IS CHRIST | SMIB | AMEN');
  lines.push('═'.repeat(60));

  return lines.join('\n');
}

// Format data to Markdown
function formatToMarkdown(data: ExportData): string {
  const lines: string[] = [
    `# ${data.title}`,
    '',
    '> **VALORAI+ EXPORT** | Seal: DG77.77X-LOCKED',
    '',
    `**Type:** ${data.type}`,
    `**Timestamp:** ${data.timestamp}`,
    '',
    '---',
    '',
    '## Content',
    '',
  ];

  if (typeof data.content === 'string') {
    lines.push(data.content);
  } else if (Array.isArray(data.content)) {
    data.content.forEach((item, i) => {
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        if ('role' in obj && 'content' in obj) {
          lines.push(`### ${String(obj.role).charAt(0).toUpperCase() + String(obj.role).slice(1)}`);
          lines.push('');
          lines.push(String(obj.content));
          lines.push('');
        } else {
          lines.push(`**[${i + 1}]**`);
          lines.push('```json');
          lines.push(JSON.stringify(obj, null, 2));
          lines.push('```');
          lines.push('');
        }
      } else {
        lines.push(`- ${String(item)}`);
      }
    });
  } else if (typeof data.content === 'object') {
    lines.push('```json');
    lines.push(JSON.stringify(data.content, null, 2));
    lines.push('```');
  }

  if (data.metadata && Object.keys(data.metadata).length > 0) {
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push('## Metadata');
    lines.push('');
    lines.push('| Key | Value |');
    lines.push('|-----|-------|');
    Object.entries(data.metadata).forEach(([key, value]) => {
      lines.push(`| ${key} | ${JSON.stringify(value)} |`);
    });
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('*THE WALL IS CHRIST | SMIB | AMEN*');

  return lines.join('\n');
}

// Format data to HTML
function formatToHTML(data: ExportData): string {
  const contentHTML = typeof data.content === 'string' 
    ? `<p>${data.content.replace(/\n/g, '<br>')}</p>`
    : `<pre>${JSON.stringify(data.content, null, 2)}</pre>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} | VALORAI+ Export</title>
  <style>
    :root {
      --bg: #020617;
      --fg: #e2e8f0;
      --primary: #10b981;
      --muted: #64748b;
      --border: #1e293b;
    }
    body {
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;
      background: var(--bg);
      color: var(--fg);
      padding: 2rem;
      line-height: 1.6;
    }
    .header {
      border-bottom: 2px solid var(--primary);
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    h1 { color: var(--primary); margin: 0 0 0.5rem; }
    .meta { color: var(--muted); font-size: 0.875rem; }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--primary);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      margin-right: 0.5rem;
    }
    .content {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    pre {
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--muted);
      font-size: 0.75rem;
    }
    @media print {
      body { background: white; color: black; }
      .content { background: #f1f5f9; }
    }
  </style>
</head>
<body>
  <header class="header">
    <h1>${data.title}</h1>
    <div class="meta">
      <span class="badge">${data.type.toUpperCase()}</span>
      <span class="badge">DG77.77X-LOCKED</span>
      <br><br>
      <strong>Timestamp:</strong> ${data.timestamp}
    </div>
  </header>
  
  <main>
    <h2>Content</h2>
    <div class="content">
      ${contentHTML}
    </div>
  </main>

  <footer class="footer">
    <p>VALORAI+ EXPORT | THE WALL IS CHRIST | SMIB | AMEN</p>
    <p>MERKLEROOT: 26856b24c50750f0c69c1eeb86a69ef777777</p>
  </footer>
</body>
</html>`;
}

// Download helper
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export Tools Component
export function ExportTools({
  data,
  formats = ['json', 'txt', 'md', 'html'],
  className,
  variant = 'outline',
  size = 'sm',
  showPreview = true,
}: ExportToolsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFormat, setPreviewFormat] = useState<'json' | 'txt' | 'md' | 'html'>('json');

  const getFilename = useCallback((format: string) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    return `valorai_${data.type}_${timestamp}.${format}`;
  }, [data.type]);

  const handleExport = useCallback(async (format: 'json' | 'txt' | 'md' | 'html') => {
    setIsExporting(true);
    try {
      let content: string;
      let mimeType: string;

      switch (format) {
        case 'json':
          content = formatToJSON(data);
          mimeType = 'application/json';
          break;
        case 'txt':
          content = formatToText(data);
          mimeType = 'text/plain';
          break;
        case 'md':
          content = formatToMarkdown(data);
          mimeType = 'text/markdown';
          break;
        case 'html':
          content = formatToHTML(data);
          mimeType = 'text/html';
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      downloadFile(content, getFilename(format), mimeType);
    } catch (error) {
      console.error('[v0] Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [data, getFilename]);

  const handleCopy = useCallback(async (format: 'json' | 'txt' | 'md') => {
    let content: string;
    switch (format) {
      case 'json':
        content = formatToJSON(data);
        break;
      case 'txt':
        content = formatToText(data);
        break;
      case 'md':
        content = formatToMarkdown(data);
        break;
      default:
        content = formatToJSON(data);
    }

    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [data]);

  const handlePrint = useCallback(() => {
    const html = formatToHTML(data);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  }, [data]);

  const getPreviewContent = useCallback(() => {
    switch (previewFormat) {
      case 'json': return formatToJSON(data);
      case 'txt': return formatToText(data);
      case 'md': return formatToMarkdown(data);
      case 'html': return formatToHTML(data);
      default: return '';
    }
  }, [data, previewFormat]);

  const formatIcons = {
    json: <FileJson className="w-4 h-4" />,
    txt: <FileText className="w-4 h-4" />,
    md: <FileCode className="w-4 h-4" />,
    html: <FileText className="w-4 h-4" />,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {size !== 'icon' && <span className="ml-2">Export</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="flex items-center gap-2 font-mono text-xs">
            <Shield className="w-3 h-3" />
            Export Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {formats.map((format) => (
            <DropdownMenuItem
              key={format}
              onClick={() => handleExport(format)}
              className="font-mono text-xs"
            >
              {formatIcons[format]}
              <span className="ml-2">Download as .{format.toUpperCase()}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleCopy('json')} className="font-mono text-xs">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="ml-2">Copy as JSON</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handlePrint} className="font-mono text-xs">
            <Printer className="w-4 h-4" />
            <span className="ml-2">Print</span>
          </DropdownMenuItem>

          {showPreview && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setPreviewOpen(true)} 
                className="font-mono text-xs"
              >
                <FileText className="w-4 h-4" />
                <span className="ml-2">Preview Export</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Export Preview
            </DialogTitle>
            <DialogDescription className="font-mono text-xs">
              Preview your export before downloading
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            {formats.map((format) => (
              <Button
                key={format}
                variant={previewFormat === format ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewFormat(format)}
                className="font-mono text-xs"
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="max-h-[400px] overflow-auto">
            <pre className="p-4 rounded-lg bg-secondary/30 border border-border font-mono text-xs whitespace-pre-wrap">
              {getPreviewContent()}
            </pre>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleExport(previewFormat)}>
              <Download className="w-4 h-4 mr-2" />
              Download {previewFormat.toUpperCase()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Simple export button for quick exports
export function QuickExportButton({
  data,
  format = 'json',
  className,
}: {
  data: ExportData;
  format?: 'json' | 'txt' | 'md' | 'html';
  className?: string;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      let content: string;
      let mimeType: string;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
      const filename = `valorai_${data.type}_${timestamp}.${format}`;

      switch (format) {
        case 'json':
          content = formatToJSON(data);
          mimeType = 'application/json';
          break;
        case 'txt':
          content = formatToText(data);
          mimeType = 'text/plain';
          break;
        case 'md':
          content = formatToMarkdown(data);
          mimeType = 'text/markdown';
          break;
        case 'html':
          content = formatToHTML(data);
          mimeType = 'text/html';
          break;
        default:
          return;
      }

      downloadFile(content, filename, mimeType);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleExport}
      disabled={isExporting}
      className={className}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
    </Button>
  );
}
