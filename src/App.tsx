/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToolCardsGrid } from './components/ToolCardsGrid';
import { PopularToolsSection } from './components/PopularToolsSection';
import { RecentActivitySection } from './components/RecentActivitySection';
import { FavoritesView } from './components/FavoritesView';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { ToolRunnerModal } from './components/ToolRunnerModal';
import { QuickResultModal } from './components/QuickResultModal';
import { AI_TOOLS, INITIAL_ACTIVITY } from './data/toolsData';
import { NavTab, AITool, ActivityItem, MediaAttachment, ToolId } from './types';

export default function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Dark / Light Theme state - defaults to true (Dark mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lifeai_theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark mode
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lifeai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lifeai_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Activity History State
  const [activity, setActivity] = useState<ActivityItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lifeai_activity');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ACTIVITY;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lifeai_activity', JSON.stringify(activity));
    }
  }, [activity]);

  // Active Tool Modal
  const [activeTool, setActiveTool] = useState<AITool | null>(null);
  const [activeToolPrompt, setActiveToolPrompt] = useState<string>('');

  // Quick Result Modal for Hero Ask AI
  const [quickResultItem, setQuickResultItem] = useState<ActivityItem | null>(null);
  const [isHeroLoading, setIsHeroLoading] = useState<boolean>(false);

  // Favorites
  const favorites = activity.filter((item) => item.favorite);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string) => {
    setActivity((prev) =>
      prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item))
    );
    if (quickResultItem && quickResultItem.id === id) {
      setQuickResultItem((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null));
    }
  };

  // Delete activity item
  const handleDeleteActivity = (id: string) => {
    setActivity((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all history
  const handleClearHistory = () => {
    setActivity([]);
  };

  // Save new result from Tool Runner
  const handleSaveResult = (newItem: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const created: ActivityItem = {
      ...newItem,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    setActivity((prev) => [created, ...prev]);
  };

  // Smart detector to pick the best tool for the Hero input
  const detectToolId = (text: string, media?: MediaAttachment): ToolId => {
    if (media?.type?.includes('pdf') || media?.name?.endsWith('.pdf')) {
      return 'pdf_ai';
    }
    if (media?.type?.startsWith('image/') || media?.name?.match(/\.(png|jpg|jpeg|webp)$/i)) {
      return 'image_ai';
    }

    const lower = text.toLowerCase();
    if (lower.includes('translate') || lower.includes('in spanish') || lower.includes('in french') || lower.includes('in german')) {
      return 'translator';
    }
    if (lower.includes('solve') || lower.includes('homework') || lower.includes('equation') || lower.includes('chemistry') || lower.includes('physics')) {
      return 'homework';
    }
    if (lower.includes('function') || lower.includes('typescript') || lower.includes('python') || lower.includes('code') || lower.includes('bug') || lower.includes('react') || lower.includes('sql')) {
      return 'code';
    }
    if (lower.includes('write') || lower.includes('email') || lower.includes('essay') || lower.includes('draft') || lower.includes('resume')) {
      return 'writing';
    }
    if (lower.includes('video') || lower.includes('veo') || lower.includes('sora') || lower.includes('cinematic')) {
      return 'video_prompt';
    }
    if (lower.includes('quiz') || lower.includes('flashcard') || lower.includes('study') || lower.includes('exam')) {
      return 'study';
    }
    if (lower.includes('calculate') || lower.includes('mortgage') || lower.includes('interest') || lower.includes('formula') || lower.includes('math')) {
      return 'calculator';
    }
    if (lower.includes('idea') || lower.includes('startup') || lower.includes('brainstorm') || lower.includes('business')) {
      return 'idea';
    }
    return 'general';
  };

  // Hero section "Ask AI" handler
  const handleHeroAskAI = async (promptText: string, media?: MediaAttachment) => {
    setIsHeroLoading(true);
    const chosenToolId = detectToolId(promptText, media);
    const matchedTool = AI_TOOLS.find((t) => t.id === chosenToolId);
    const toolName = matchedTool ? matchedTool.name : 'Universal AI';

    try {
      const payload: any = {
        prompt: promptText,
        tool: chosenToolId,
        options: {},
      };

      if (media) {
        payload.media = [
          {
            mimeType: media.type,
            data: media.data,
            filename: media.name,
          },
        ];
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const outputText = data.result || 'No response generated.';

      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        toolId: chosenToolId,
        toolName,
        prompt: promptText || (media ? `Attached file: ${media.name}` : 'General inquiry'),
        result: outputText,
        timestamp: 'Just now',
        model: data.model || 'gemini-3.8-flash',
        favorite: false,
        mediaName: media?.name,
        mediaType: media?.type,
      };

      setActivity((prev) => [newActivity, ...prev]);
      setQuickResultItem(newActivity);
    } catch (err: any) {
      console.error('Hero request failed:', err);
      const fallbackItem: ActivityItem = {
        id: `act-${Date.now()}`,
        toolId: chosenToolId,
        toolName,
        prompt: promptText,
        result: `Failed to connect with server. Please try again. (${err?.message || 'Network error'})`,
        timestamp: 'Just now',
        model: 'system-error',
        favorite: false,
      };
      setQuickResultItem(fallbackItem);
    } finally {
      setIsHeroLoading(false);
    }
  };

  // Launch a specific tool studio
  const handleOpenTool = (tool: AITool, promptToUse?: string) => {
    setActiveTool(tool);
    setActiveToolPrompt(promptToUse || '');
  };

  // Re-run an activity item in its tool
  const handleRerunActivity = (item: ActivityItem) => {
    const foundTool = AI_TOOLS.find((t) => t.id === item.toolId) || AI_TOOLS[0];
    setActiveTool(foundTool);
    setActiveToolPrompt(item.prompt);
  };

  // Scroll to hero input
  const handleScrollToHero = () => {
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 2. Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        historyCount={activity.length}
        favoritesCount={favorites.length}
        onOpenQuickPrompt={handleScrollToHero}
      />

      {/* Main Content based on selected tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 3, 4, 5, 6. Large Hero Section with Input and Upload Buttons */}
            <HeroSection
              onAskAI={handleHeroAskAI}
              isLoading={isHeroLoading}
              onSelectPrompt={(text) => handleHeroAskAI(text)}
            />

            {/* 8. Popular Tools Section */}
            <PopularToolsSection tools={AI_TOOLS} onSelectTool={handleOpenTool} />

            {/* 7. All AI Tool Cards Grid */}
            <ToolCardsGrid tools={AI_TOOLS} onSelectTool={handleOpenTool} />

            {/* 9. Recent Activity Section */}
            <RecentActivitySection
              activity={activity}
              tools={AI_TOOLS}
              onToggleFavorite={handleToggleFavorite}
              onDeleteActivity={handleDeleteActivity}
              onClearHistory={handleClearHistory}
              onViewActivity={(item) => setQuickResultItem(item)}
              onRerunActivity={handleRerunActivity}
            />
          </>
        )}

        {currentTab === 'tools' && (
          <div className="pt-6">
            <ToolCardsGrid tools={AI_TOOLS} onSelectTool={handleOpenTool} />
            <PopularToolsSection tools={AI_TOOLS} onSelectTool={handleOpenTool} />
          </div>
        )}

        {currentTab === 'history' && (
          <div className="pt-6">
            <RecentActivitySection
              activity={activity}
              tools={AI_TOOLS}
              onToggleFavorite={handleToggleFavorite}
              onDeleteActivity={handleDeleteActivity}
              onClearHistory={handleClearHistory}
              onViewActivity={(item) => setQuickResultItem(item)}
              onRerunActivity={handleRerunActivity}
            />
          </div>
        )}

        {currentTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onRerunActivity={handleRerunActivity}
            onOpenQuickPrompt={handleScrollToHero}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingSection
            onSelectPlan={(plan) => {
              if (plan === 'Free') {
                alert('You are already enjoying the LifeAI Free Starter plan!');
              } else {
                alert(`Thank you for your interest in LifeAI ${plan}! Upgrade flow initiated.`);
              }
            }}
          />
        )}
      </main>

      {/* 10. Footer with About, Privacy, Terms, Contact */}
      <Footer />

      {/* Tool Runner Modal */}
      {activeTool && (
        <ToolRunnerModal
          tool={activeTool}
          initialPrompt={activeToolPrompt}
          onClose={() => {
            setActiveTool(null);
            setActiveToolPrompt('');
          }}
          onSaveResult={handleSaveResult}
        />
      )}

      {/* Quick Result Modal */}
      {quickResultItem && (
        <QuickResultModal
          item={quickResultItem}
          onClose={() => setQuickResultItem(null)}
          onToggleFavorite={handleToggleFavorite}
          onOpenInTool={(toolId, p) => {
            setQuickResultItem(null);
            const foundTool = AI_TOOLS.find((t) => t.id === toolId) || AI_TOOLS[0];
            setActiveTool(foundTool);
            setActiveToolPrompt(p);
          }}
        />
      )}
    </div>
  );
}
