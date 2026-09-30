import React, { useState } from 'react';
import {
  History,
  Star,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Bot
} from 'lucide-react';
import { ActivityItem, AITool } from '../types';

interface RecentActivitySectionProps {
  activity: ActivityItem[];
  tools: AITool[];
  onToggleFavorite: (id: string) => void;
  onDeleteActivity: (id: string) => void;
  onClearHistory: () => void;
  onViewActivity: (item: ActivityItem) => void;
  onRerunActivity: (item: ActivityItem) => void;
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
  activity,
  tools,
  onToggleFavorite,
  onDeleteActivity,
  onClearHistory,
  onViewActivity,
  onRerunActivity
}) => {
  const [search, setSearch] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: ActivityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.result);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredActivity = activity.filter((item) => {
    const matchesTool = selectedToolFilter === 'all' || item.toolId === selectedToolFilter;
    const matchesSearch =
      search === '' ||
      item.prompt.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase()) ||
      item.toolName.toLowerCase().includes(search.toLowerCase());
    return matchesTool && matchesSearch;
  });

  return (
    <section id="recent-activity" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Recent Activity & History
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Access previous answers, favorite top outputs, or pick up where you left off.
          </p>
        </div>

        {/* Clear All button */}
        {activity.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire activity history?')) {
                onClearHistory();
              }
            }}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search queries and answers..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedToolFilter}
            onChange={(e) => setSelectedToolFilter(e.target.value)}
            aria-label="Filter activity by AI tool"
            className="w-full sm:w-48 py-2 px-3 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Tools</option>
            {tools.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity List */}
      {filteredActivity.length > 0 ? (
        <div className="space-y-3">
          {filteredActivity.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewActivity(item)}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                    {item.toolName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {item.timestamp}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {item.model}
                  </span>
                  {item.mediaName && (
                    <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 border border-purple-200/40 dark:border-purple-800/40">
                      📎 {item.mediaName}
                    </span>
                  )}
                </div>

                <p className="text-base font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.prompt}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {item.result.replace(/###|##|#|\*\*|`/g, '')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                {/* Favorite */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    item.favorite
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star className={`w-4 h-4 ${item.favorite ? 'fill-amber-500' : ''}`} />
                </button>

                {/* Copy */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(item, e)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy result"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Re-run */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRerunActivity(item);
                  }}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                  title="Re-run in Tool Studio"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteActivity(item.id);
                  }}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                  title="Delete from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Bot className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No activity items match your search.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try a different search term or run a query above!
          </p>
        </div>
      )}
    </section>
  );
};
