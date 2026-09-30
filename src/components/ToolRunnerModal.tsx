import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Star,
  Download,
  Image as ImageIcon,
  FileText,
  Trash2,
  ArrowRight,
  RefreshCw,
  Sliders,
  Send
} from 'lucide-react';
import { AITool, MediaAttachment, ActivityItem } from '../types';
import { ToolIcon } from './ToolIcon';
import { ResultDisplay } from './ResultDisplay';

interface ToolRunnerModalProps {
  tool: AITool | null;
  initialPrompt?: string;
  onClose: () => void;
  onSaveResult: (item: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
}

export const ToolRunnerModal: React.FC<ToolRunnerModalProps> = ({
  tool,
  initialPrompt = '',
  onClose,
  onSaveResult
}) => {
  if (!tool) return null;

  const [prompt, setPrompt] = useState(initialPrompt);
  const [options, setOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    tool.options?.forEach((opt) => {
      initial[opt.key] = opt.defaultValue;
    });
    return initial;
  });

  const [attachment, setAttachment] = useState<MediaAttachment | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-run if initialPrompt was provided
  useEffect(() => {
    if (initialPrompt && !result && !isLoading) {
      handleRun(initialPrompt);
    }
  }, [initialPrompt]);

  const handleRun = async (overridePrompt?: string) => {
    const textToRun = overridePrompt || prompt;
    if ((!textToRun.trim() && !attachment) || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsFavorite(false);

    try {
      const payload: any = {
        prompt: textToRun,
        tool: tool.id,
        options,
      };

      if (attachment) {
        payload.media = [
          {
            mimeType: attachment.type,
            data: attachment.data,
            filename: attachment.name,
          },
        ];
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned error ${res.status}`);
      }

      const data = await res.json();
      const outputText = data.result || 'No response returned.';
      setResult(outputText);

      // Save to parent activity history
      onSaveResult({
        toolId: tool.id,
        toolName: tool.name,
        prompt: textToRun,
        result: outputText,
        model: data.model || 'gemini-3.8-flash',
        favorite: false,
        mediaName: attachment?.name,
        mediaType: attachment?.type,
      });
    } catch (err: any) {
      console.error('Error generating AI output:', err);
      setError(err?.message || 'Failed to generate output. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      setAttachment({
        name: file.name,
        type: file.type || 'application/octet-stream',
        data: base64Data,
        previewUrl: file.type.startsWith('image/') ? (reader.result as string) : undefined,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (!result) return;
    const blob = new Blob([`# ${tool.name}\n\n**Prompt**: ${prompt}\n\n${result}`], {
      type: 'text/markdown;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.id}-output-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.accentColor} flex items-center justify-center text-white shadow-sm`}>
              <ToolIcon name={tool.iconName} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                  {tool.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {tool.shortDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Options Bar if tool has configurable dropdowns */}
          {tool.options && tool.options.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Tool Settings:</span>
              </div>
              {tool.options.map((opt) => (
                <div key={opt.key} className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {opt.label}:
                  </label>
                  <select
                    value={options[opt.key] || opt.defaultValue}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, [opt.key]: e.target.value }))
                    }
                    className="py-1 px-2.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    {opt.options?.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Prompt input box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Prompt / Task
              </label>
              {tool.acceptsMedia && tool.acceptsMedia !== 'none' && (
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={
                      tool.acceptsMedia === 'image'
                        ? 'image/*'
                        : tool.acceptsMedia === 'pdf'
                        ? 'application/pdf,.doc,.docx,.txt'
                        : 'image/*,application/pdf'
                    }
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {tool.acceptsMedia === 'image' ? (
                      <ImageIcon className="w-3.5 h-3.5" />
                    ) : (
                      <FileText className="w-3.5 h-3.5" />
                    )}
                    <span>Attach {tool.acceptsMedia === 'image' ? 'Image' : 'File / PDF'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Attached file chip */}
            {attachment && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs">
                {attachment.previewUrl ? (
                  <img
                    src={attachment.previewUrl}
                    alt="attachment"
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                )}
                <span className="font-semibold text-slate-900 dark:text-white truncate flex-1">
                  {attachment.name}
                </span>
                <button
                  onClick={() => setAttachment(null)}
                  className="p-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder={tool.placeholder}
                className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 leading-relaxed resize-none"
              />
            </div>

            {/* Sample prompt quick chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Suggestions:</span>
              {tool.samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(sp)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer"
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Action trigger button */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => handleRun()}
              disabled={isLoading || (!prompt.trim() && !attachment)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 disabled:opacity-50 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing with Gemini 3.8 Flash...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run {tool.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Output Studio */}
          {result && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI Output
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleExport}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Export as Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleRun()}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Regenerate answer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                <ResultDisplay content={result} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
