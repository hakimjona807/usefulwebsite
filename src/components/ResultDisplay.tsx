import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface ResultDisplayProps {
  content: string;
  className?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, className = '' }) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Helper to parse markdown-like text into structured visual blocks
  const renderFormattedContent = () => {
    if (!content) return null;

    // Split by triple backticks for code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      // Check if code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        let language = 'text';
        let codeLines = lines;

        if (lines.length > 0 && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
          language = lines[0].trim();
          codeLines = lines.slice(1);
        }

        const rawCode = codeLines.join('\n');
        const codeId = `code-${index}`;

        return (
          <div key={index} className="my-4 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 text-slate-100 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono uppercase tracking-wider text-slate-300 font-semibold">{language}</span>
              </div>
              <button
                onClick={() => copyCode(rawCode, codeId)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-medium cursor-pointer"
                title="Copy code"
              >
                {copiedCodeId === codeId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-200 selection:bg-indigo-600 selection:text-white">
              <code>{rawCode}</code>
            </pre>
          </div>
        );
      }

      // Format standard markdown lines
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-3">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();

            if (!trimmed) {
              return <div key={lIdx} className="h-2" />;
            }

            // Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={lIdx} className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-indigo-500 inline-block"></span>
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={lIdx} className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-3 mb-1">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={lIdx} className="text-2xl font-bold text-slate-900 dark:text-white mt-5 mb-2 tracking-tight">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            // Blockquotes
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote
                  key={lIdx}
                  className="pl-4 py-2 border-l-4 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-950/30 rounded-r-lg text-slate-800 dark:text-slate-200 italic my-2"
                >
                  {trimmed.replace('> ', '').replace(/^["']|["']$/g, '')}
                </blockquote>
              );
            }

            // Bullet points
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const text = trimmed.slice(2);
              return (
                <div key={lIdx} className="flex items-start gap-2.5 ml-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                  <span>{formatInlineMarkdown(text)}</span>
                </div>
              );
            }

            // Numbered items
            if (/^\d+\.\s/.test(trimmed)) {
              const num = trimmed.match(/^(\d+\.)\s/)?.[1];
              const text = trimmed.replace(/^\d+\.\s/, '');
              return (
                <div key={lIdx} className="flex items-start gap-2.5 ml-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">{num}</span>
                  <span>{formatInlineMarkdown(text)}</span>
                </div>
              );
            }

            // Horizontal rule
            if (trimmed === '---') {
              return <hr key={lIdx} className="my-4 border-slate-200 dark:border-slate-800" />;
            }

            // Normal paragraph
            return (
              <p key={lIdx} className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {formatInlineMarkdown(trimmed)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  // Helper for bold and inline code
  const formatInlineMarkdown = (text: string): React.ReactNode => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\$\$.*?\$\$)/g);
    return parts.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-white">{seg.slice(2, -2)}</strong>;
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-xs sm:text-sm">
            {seg.slice(1, -1)}
          </code>
        );
      }
      if (seg.startsWith('$$') && seg.endsWith('$$')) {
        return (
          <span key={i} className="px-2 py-0.5 mx-1 font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-200/50 dark:border-indigo-800/50">
            {seg.slice(2, -2)}
          </span>
        );
      }
      return seg;
    });
  };

  return <div className={`prose-content ${className}`}>{renderFormattedContent()}</div>;
};
