import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { AITool, ToolCategory } from '../types';
import { ToolIcon } from './ToolIcon';

interface ToolCardsGridProps {
  tools: AITool[];
  onSelectTool: (tool: AITool) => void;
}

export const ToolCardsGrid: React.FC<ToolCardsGridProps> = ({ tools, onSelectTool }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ToolCategory; label: string }[] = [
    { id: 'all', label: 'All Tools (10)' },
    { id: 'learning', label: 'Learning & Study' },
    { id: 'creativity', label: 'Writing & Media' },
    { id: 'productivity', label: 'Productivity & Docs' },
    { id: 'coding', label: 'Code & Dev' },
    { id: 'math', label: 'Math & Logic' }
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === 'all' ||
      tool.category === activeCategory ||
      (activeCategory === 'creativity' && tool.category === 'creation');
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="ai-tools" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Supertool Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Choose Your AI Tool
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-base max-w-xl">
            Ten specialized assistants built for distinct workflows. Select any tool to open its dedicated studio.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/80 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer backdrop-blur-sm"
          >
            {/* Top row with icon & badge */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.accentColor} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                  <ToolIcon name={tool.iconName} className="w-6 h-6" />
                </div>
                {tool.badge && (
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/70 group-hover:border-indigo-500 transition-colors">
                    {tool.badge}
                  </span>
                )}
              </div>

              {/* Tool Name & Category */}
              <div className="mb-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-400/80">
                  {tool.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {tool.shortDesc}
              </p>

              {/* Sample prompt chip */}
              {tool.samplePrompts[0] && (
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 mb-4 line-clamp-1 italic group-hover:border-slate-700 transition-colors">
                  "{tool.samplePrompts[0]}"
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Launch Studio
              </span>
              <div className="w-7 h-7 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center group-hover:translate-x-1.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-base">
            No AI tools match "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
