import React, { useState, useRef, useEffect } from 'react';
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
  Code,
  Flame,
  Bot
} from 'lucide-react';
import { MediaAttachment } from '../types';

interface HeroSectionProps {
  onAskAI: (prompt: string, media?: MediaAttachment) => void;
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
}

const PLACEHOLDER_PROMPTS = [
  "What can I help you with? (e.g. Solve 3x² - 12x + 9 = 0)",
  "What can I help you with? (e.g. Translate this proposal into French)",
  "What can I help you with? (e.g. Write a high-converting landing page copy)",
  "What can I help you with? (e.g. Create a 35mm cinematic prompt for Veo)",
  "What can I help you with? (e.g. Debug this TypeScript useEffect hook)",
  "What can I help you with? (e.g. Calculate monthly mortgage on $450k at 6.2%)",
];

const LOADING_STEPS = [
  "Analyzing context & parameters...",
  "Consulting Gemini 3.8 Flash Neural Engine...",
  "Structuring & formatting accurate solution...",
  "Finalizing response..."
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAskAI,
  isLoading,
  onSelectPrompt
}) => {
  const [prompt, setPrompt] = useState('');
  const [attachment, setAttachment] = useState<MediaAttachment | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder prompts smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Step through loading messages
  useEffect(() => {
    if (!isLoading) {
      setLoadingStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

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
    e.target.value = '';
  };

  const quickPrompts = [
    { label: 'Solve 2x² + 5x - 3 = 0', icon: Calculator, category: 'Homework' },
    { label: 'Translate to Spanish for business', icon: Globe2, category: 'Translate' },
    { label: 'Write a compelling client pitch email', icon: Zap, category: 'Writing' },
    { label: 'TypeScript debounce hook with cleanup', icon: Code, category: 'Code' }
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-18 md:pb-24 bg-grid-pattern">
      {/* Dynamic Animated Glowing background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/25 to-purple-600/20 blur-3xl rounded-full pointer-events-none -z-10 animate-float" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[320px] bg-gradient-to-bl from-purple-600/20 via-violet-600/20 to-cyan-500/20 blur-3xl rounded-full pointer-events-none -z-10 animate-float-reverse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top pill badge with glow animation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-950/80 border border-indigo-500/30 dark:border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10 mb-6 hover:scale-105 transition-transform duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="tracking-wide">Powered by Gemini 3.8 Flash • Sub-second Latency</span>
        </div>

        {/* Large Hero Heading with animated gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
          Everything you need.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            One AI.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Learn, create, translate, solve, write and build with AI.
        </p>

        {/* Large AI input box with glowing border container */}
        <div className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-2xl shadow-indigo-500/10 transition-all duration-300">
          <div className="relative text-left bg-slate-900/95 dark:bg-slate-950/95 rounded-[23px] p-4 sm:p-5 backdrop-blur-xl border border-slate-800/80">
            {/* Attached file preview */}
            {attachment && (
              <div className="mb-3 flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-white">
                {attachment.previewUrl ? (
                  <img
                    src={attachment.previewUrl}
                    alt="Upload preview"
                    className="w-10 h-10 object-cover rounded-lg border border-slate-600"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 border border-indigo-800">
                    <FileCheck className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{attachment.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {attachment.size ? `${(attachment.size / 1024).toFixed(0)} KB` : 'Attached file'} • Ready for analysis
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
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
              placeholder={PLACEHOLDER_PROMPTS[placeholderIndex]}
              className="w-full bg-transparent resize-none text-white placeholder:text-slate-500 text-base sm:text-lg focus:outline-none leading-relaxed transition-all duration-300"
            />

            {/* Loading step badge if thinking */}
            {isLoading && (
              <div className="mb-3 py-1.5 px-3 rounded-lg bg-indigo-950/70 border border-indigo-800/60 flex items-center gap-2 text-xs text-indigo-300 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>{LOADING_STEPS[loadingStepIndex]}</span>
              </div>
            )}

            {/* Input Footer with Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              {/* Upload Buttons */}
              <div className="flex items-center gap-2">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 hover:border-blue-500/50 transition-all duration-150 cursor-pointer hover:scale-102 active:scale-98"
                  title="Upload image for AI visual analysis"
                >
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>Upload Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 hover:border-purple-500/50 transition-all duration-150 cursor-pointer hover:scale-102 active:scale-98"
                  title="Upload document or PDF for analysis"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Upload PDF</span>
                </button>
              </div>

              {/* Ask AI button with rich glowing gradient */}
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isLoading || (!prompt.trim() && !attachment)}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-103 active:scale-97 transition-all duration-200 cursor-pointer"
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
        </div>

        {/* Quick prompt suggestions with hover animations */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">Try asking:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(qp.label);
                onSelectPrompt(qp.label);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white hover:bg-indigo-950/40 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <qp.icon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Feature proof badges with glowing checkmarks */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>10 Dedicated AI Supertools</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Powered by Gemini 3.8 Flash</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Multimodal: Text, Images & Documents</span>
          </div>
        </div>
      </div>
    </section>
  );
};
