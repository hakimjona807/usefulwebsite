import React, { useState } from 'react';
import {
  Bookmark,
  Star,
  Copy,
  Check,
  Download,
  Trash2,
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';
import { ActivityItem } from '../types';
import { ResultDisplay } from './ResultDisplay';

interface FavoritesViewProps {
  favorites: ActivityItem[];
  onToggleFavorite: (id: string) => void;
  onRerunActivity: (item: ActivityItem) => void;
  onOpenQuickPrompt: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  onRerunActivity,
  onOpenQuickPrompt
}) => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: ActivityItem) => {
    navigator.clipboard.writeText(item.result);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAllFavorites = () => {
    if (favorites.length === 0) return;
    const content = favorites
      .map(
        (f, i) =>
          `# ${i + 1}. [${f.toolName}] ${f.prompt}\n*Date: ${f.timestamp}*\n\n${f.result}\n\n---\n`
      )
      .join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lifeai-favorites-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtered = favorites.filter(
    (item) =>
      item.prompt.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase()) ||
      item.toolName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Library</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Your Pinned Favorites
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Easily review, copy, or export your most valuable AI outputs.
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={exportAllFavorites}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export to Markdown</span>
          </button>
        )}
      </div>

      {/* Search */}
      {favorites.length > 0 && (
        <div className="relative mb-6 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search favorites..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      )}

      {/* Grid of Favorites */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {item.toolName}
                    </span>
                    <span className="text-xs text-slate-400">{item.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => handleCopy(item)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      title="Copy result"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => onRerunActivity(item)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Open in Studio"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="p-2 rounded-xl border border-amber-300 dark:border-amber-700/60 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Star className="w-4 h-4 fill-amber-500" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {item.prompt}
                </h3>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
                  <ResultDisplay content={isExpanded ? item.result : item.result.slice(0, 350) + (item.result.length > 350 ? '...' : '')} />
                  {item.result.length > 350 && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Show Less' : 'Read Full Output'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-500 mx-auto mb-4">
            <Star className="w-7 h-7 fill-amber-500/20" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No favorites saved yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
            When you generate great answers or prompts, click the star icon to pin them here for instant access.
          </p>
          <button
            onClick={onOpenQuickPrompt}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try an AI Tool Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
