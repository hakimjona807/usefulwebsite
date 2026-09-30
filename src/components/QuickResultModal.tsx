import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Star, Download, ExternalLink, Bot, ArrowRight } from 'lucide-react';
import { ResultDisplay } from './ResultDisplay';
import { ActivityItem, AITool } from '../types';

interface QuickResultModalProps {
  item: ActivityItem | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onOpenInTool: (toolId: string, prompt: string) => void;
}

export const QuickResultModal: React.FC<QuickResultModalProps> = ({
  item,
  onClose,
  onToggleFavorite,
  onOpenInTool,
}) => {
  if (!item) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([`# ${item.toolName}\n**Prompt**: ${item.prompt}\n\n${item.result}`], {
      type: 'text/markdown;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lifeai-response-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">LifeAI Result</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                  {item.toolName}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Engine: {item.model}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                item.favorite
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500'
              }`}
              title={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${item.favorite ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copy output"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleExport}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Query details */}
        <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/30 border-b border-slate-100 dark:border-slate-850">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Your Inquiry</p>
          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            {item.prompt}
          </p>
          {item.mediaName && (
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
              📎 Attachment: {item.mediaName}
            </p>
          )}
        </div>

        {/* Result content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
            <ResultDisplay content={item.result} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
          <span className="text-xs text-slate-400">Response generated in real-time</span>
          <button
            onClick={() => onOpenInTool(item.toolId, item.prompt)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors"
          >
            <span>Open in {item.toolName} Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
