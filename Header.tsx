/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { ActiveTab } from './types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenLetterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenLetterModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shadow-xs">
            <Flame className="w-5 h-5" />
          </span>
          <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Испанский для работы и поездки
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line nav links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onTabChange('home')}
            className={`whitespace-nowrap shrink-0 transition ${
              activeTab === 'home'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => onTabChange('welder')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
              activeTab === 'welder'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Сварщик (100+)</span>
          </button>
          <button
            onClick={() => onTabChange('phrases')}
            className={`whitespace-nowrap shrink-0 transition ${
              activeTab === 'phrases'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Разговорник (400+)
          </button>
          <button
            onClick={() => onTabChange('dictionary')}
            className={`whitespace-nowrap shrink-0 transition ${
              activeTab === 'dictionary'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Словарь (600+)
          </button>
          <button
            onClick={() => onTabChange('dialogues')}
            className={`whitespace-nowrap shrink-0 transition ${
              activeTab === 'dialogues'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Диалоги (35)
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`whitespace-nowrap shrink-0 transition ${
              activeTab === 'practice'
                ? 'text-blue-700 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Тренажёр
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <PWAInstallButton />
          <button
            onClick={onOpenLetterModal}
            className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Письмо в цех</span>
          </button>
        </div>
      </div>
    </header>
  );
};
