/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Home,
  Flame,
  MessageSquare,
  BookOpen,
  Users,
  GraduationCap,
} from 'lucide-react';
import { ActiveTab } from './types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'welder', label: 'Сварщик', icon: Flame, isSpecial: true },
    { id: 'phrases', label: 'Фразы', icon: MessageSquare },
    { id: 'dictionary', label: 'Словарь', icon: BookOpen },
    { id: 'dialogues', label: 'Диалоги', icon: Users },
    { id: 'practice', label: 'Тренажёр', icon: GraduationCap },
  ];

  return (
    <nav
      aria-label="Нижнее мобильное меню"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-safe shadow-lg"
    >
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as ActiveTab)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition active:scale-90"
              aria-label={tab.label}
            >
              <div
                className={`p-1 rounded-xl transition ${
                  isActive
                    ? tab.isSpecial
                      ? 'text-amber-500 bg-amber-50'
                      : 'text-blue-700 bg-blue-50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${tab.isSpecial && isActive ? 'fill-amber-400' : ''}`} />
              </div>
              <span
                className={`text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive
                    ? tab.isSpecial
                      ? 'text-amber-700 font-bold'
                      : 'text-blue-700 font-bold'
                    : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
