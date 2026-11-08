/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Flame,
  FileText,
  Search,
  Filter,
  ShieldAlert,
  Wrench,
  Users,
  Briefcase,
  Calendar,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { PhraseItem, WelderSubcategory } from './types';
import { welderPhrases } from './welderPhrasesData';
import { extraWelderPhrases } from './phrasesData';
import { PhraseCard } from './PhraseCard';
import { WelderLetterModal } from './WelderLetterModal';
import { normalizeForSearch } from './storage';

const allWelderPhrases: PhraseItem[] = [...welderPhrases, ...extraWelderPhrases];

const subcategoryLabels: { id: WelderSubcategory | 'all'; nameRu: string; icon: React.ReactNode }[] = [
  { id: 'all', nameRu: 'Все фразы сварщика', icon: <Flame className="w-4 h-4" /> },
  { id: 'search', nameRu: 'Поиск вакансий', icon: <Search className="w-4 h-4" /> },
  { id: 'call', nameRu: 'Звонок работодателю', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'message', nameRu: 'Сообщение', icon: <FileText className="w-4 h-4" /> },
  { id: 'resume', nameRu: 'Резюме и статус', icon: <FileText className="w-4 h-4" /> },
  { id: 'interview', nameRu: 'Собеседование', icon: <Users className="w-4 h-4" /> },
  { id: 'skills', nameRu: 'Опыт и методы (MIG/TIG/MMA)', icon: <Flame className="w-4 h-4" /> },
  { id: 'conditions', nameRu: 'Зарплата и условия', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'first_day', nameRu: 'Первый рабочий день', icon: <Calendar className="w-4 h-4" /> },
  { id: 'team', nameRu: 'Бригадир и коллеги', icon: <Users className="w-4 h-4" /> },
  { id: 'tools', nameRu: 'Инструменты и газ', icon: <Wrench className="w-4 h-4" /> },
  { id: 'safety', nameRu: 'СИЗ и защита', icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 'danger', nameRu: 'Опасность и вентиляция', icon: <ShieldAlert className="w-4 h-4" /> },
];

interface WelderSectionProps {
  onShowToSpeaker: (phrase: PhraseItem) => void;
}

export const WelderSection: React.FC<WelderSectionProps> = ({
  onShowToSpeaker,
}) => {
  const [selectedSub, setSelectedSub] = React.useState<WelderSubcategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showLetterModal, setShowLetterModal] = React.useState(false);

  const filteredPhrases = React.useMemo(() => {
    const q = normalizeForSearch(searchQuery);
    return allWelderPhrases.filter((p) => {
      if (selectedSub !== 'all' && p.subcategory !== selectedSub) {
        return false;
      }
      if (!q) return true;
      const matchRu = normalizeForSearch(p.ru).includes(q);
      const matchEs = normalizeForSearch(p.es).includes(q);
      const matchTr = p.transcription ? normalizeForSearch(p.transcription).includes(q) : false;
      return matchRu || matchEs || matchTr;
    });
  }, [selectedSub, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Hero Banner for Welder Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Главный профессиональный раздел
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2">
            Испанский для работы сварщиком
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            Специализированный раздел для специалиста с 5-летним стажем: звонок в цех, прохождение теста, термины полуавтомата MIG/MAG, TIG и электрода, техника безопасности и общение с испанским бригадиром.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowLetterModal(true)}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Составить резюме и сообщение</span>
            </button>
            <div className="text-xs text-slate-300 bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10">
              В базе: <strong className="text-white">{allWelderPhrases.length} профессиональных фраз</strong>
            </div>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Technical Cheat Sheet Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-600" />
          <span>Шпаргалка испанских названий в цехе</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <p className="text-slate-500">Полуавтомат</p>
            <p className="font-bold text-slate-900 mt-0.5">La semiautomática</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <p className="text-slate-500">Болгарка</p>
            <p className="font-bold text-slate-900 mt-0.5">La radial / amoladora</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <p className="text-slate-500">Струбцина</p>
            <p className="font-bold text-slate-900 mt-0.5">El sargento</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <p className="text-slate-500">Прихватка</p>
            <p className="font-bold text-slate-900 mt-0.5">Puntear / punto</p>
          </div>
        </div>
      </div>

      {/* Search & Subcategory Filter */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по фразам сварщика (на русском или испанском)..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded-md"
            >
              Сброс
            </button>
          )}
        </div>

        {/* Subcategories Horizontal Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {subcategoryLabels.map((sub) => {
            const isActive = selectedSub === sub.id;
            const count =
              sub.id === 'all'
                ? allWelderPhrases.length
                : allWelderPhrases.filter((p) => p.subcategory === sub.id).length;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{sub.nameRu}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrases Grid */}
      {filteredPhrases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              onShowToSpeaker={onShowToSpeaker}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <Flame className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">Ничего не найдено</h4>
          <p className="text-xs text-slate-500 mt-1">
            Попробуйте изменить поисковый запрос или переключить категорию.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSub('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            Показать все фразы сварщика
          </button>
        </div>
      )}

      {/* Cover Letter / Presentation Modal */}
      {showLetterModal && (
        <WelderLetterModal onClose={() => setShowLetterModal(false)} />
      )}
    </div>
  );
};
