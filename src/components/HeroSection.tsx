import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  X,
  Loader2,
  FileCheck,
  CheckCircle2,
  Zap,
  Globe2,
  Calculator,
  Code
} from 'lucide-react';
import { MediaAttachment } from '../types';

interface HeroSectionProps {
  onAskAI: (prompt: string, media?: MediaAttachment) => void;
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAskAI,
  isLoading,
  onSelectPrompt
}) => {
  const [prompt, setPrompt] = useState('');
  const [attachment, setAttachment] = useState<MediaAttachment | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!prompt.trim() && !attachment) || isLoading) return;
    onAskAI(prompt.trim(), attachment || undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      setAttachment({
        name: file.name,
        type: file.type || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
        data: base64Data,
        previewUrl: type === 'image' ? (reader.result as string) : undefined,
        size: file.size
      });
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const quickPrompts = [
    { label: 'Solve 2x² + 5x - 3 = 0', icon: Calculator, category: 'Homework' },
    { label: 'Translate to Spanish for business', icon: Globe2, category: 'Translate' },
    { label: 'Write a compelling client pitch email', icon: Zap, category: 'Writing' },
    { label: 'TypeScript debounce hook with cleanup', icon: Code, category: 'Code' }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/20 to-purple-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 shadow-sm mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Next-Generation Intelligence Hub</span>
        </div>

        {/* 3. Large Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
          Everything you need.{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            One AI.
          </span>
        </h1>

        {/* 4. Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Learn, create, translate, solve, write and build with AI.
        </p>

        {/* 5. Large AI input box */}
        <div className="relative text-left bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl shadow-indigo-500/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 transition-all duration-200 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 backdrop-blur-xl">
          {/* Attached file preview */}
          {attachment && (
            <div className="mb-3 flex items-center gap-2.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              {attachment.previewUrl ? (
                <img
                  src={attachment.previewUrl}
                  alt="Upload preview"
                  className="w-10 h-10 object-cover rounded-lg border border-slate-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  <FileCheck className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white truncate">{attachment.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {attachment.size ? `${(attachment.size / 1024).toFixed(0)} KB` : 'Attached file'} • Ready for analysis
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Text Area */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="What can I help you with?"
            className="w-full bg-transparent resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-lg focus:outline-none leading-relaxed"
          />

          {/* Input Footer with 6. Buttons: Ask AI, Upload Image, Upload PDF */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            {/* Upload Buttons */}
            <div className="flex items-center gap-2">
              {/* Hidden file inputs */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'image')}
              />
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'pdf')}
              />

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer"
                title="Upload image for AI visual analysis"
              >
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer"
                title="Upload document or PDF for analysis"
              >
                <FileText className="w-4 h-4 text-purple-500" />
                <span>Upload PDF</span>
              </button>
            </div>

            {/* Ask AI button */}
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading || (!prompt.trim() && !attachment)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all duration-200 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">Try asking:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(qp.label);
                onSelectPrompt(qp.label);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 shadow-xs transition-all duration-150 cursor-pointer"
            >
              <qp.icon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Feature proof badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>10 Dedicated AI Supertools</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Powered by Gemini 3.8 Flash</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Multimodal: Text, Images & Documents</span>
          </div>
        </div>
      </div>
    </section>
  );
};
