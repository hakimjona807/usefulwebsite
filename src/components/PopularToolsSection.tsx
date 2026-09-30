import React from 'react';
import { Flame, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { AITool } from '../types';
import { ToolIcon } from './ToolIcon';

interface PopularToolsSectionProps {
  tools: AITool[];
  onSelectTool: (tool: AITool, promptToUse?: string) => void;
}

export const PopularToolsSection: React.FC<PopularToolsSectionProps> = ({ tools, onSelectTool }) => {
  const popularTools = tools.filter((t) => t.popular);

  return (
    <section className="py-12 md:py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Most Popular AI Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Trusted by millions of students, writers, and engineers worldwide.
            </p>
          </div>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${tool.accentColor} flex items-center justify-center text-white shadow-sm`}>
                      <ToolIcon name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{tool.categoryLabel}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    High Accuracy
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed">
                  {tool.longDesc}
                </p>

                {/* Popular sample prompts with 1-click execution */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Quick One-Click Prompts:
                  </span>
                  {tool.samplePrompts.slice(0, 2).map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => onSelectTool(tool, prompt)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="text-xs text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 line-clamp-1">
                        "{prompt}"
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0 ml-2">
                        <Play className="w-3 h-3 fill-indigo-600 dark:fill-indigo-400" />
                        <span>Run</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Gemini 3.8 Flash • Sub-second latency</span>
                <button
                  onClick={() => onSelectTool(tool)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                >
                  <span>Open Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
