/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Search,
  Star,
  Eye,
  EyeOff,
  Plane,
  ShieldCheck,
  Bus,
  Building,
  Home,
  Utensils,
  ShoppingBag,
  MapPin,
  Smartphone,
  HeartPulse,
  FileText,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { PhraseItem, PhraseCategory } from './types';
import { allPhrases, categoryNames } from './phrasesData';
import { PhraseCard } from './PhraseCard';
import { normalizeForSearch, getFavorites } from './storage';

interface PhraseSectionProps {
  initialCategory?: PhraseCategory | 'all';
  onShowToSpeaker: (phrase: PhraseItem) => void;
}

const categoryIcons: Record<PhraseCategory, React.ReactNode> = {
  welder: <Flame className="w-4 h-4 text-amber-500" />,
  basics: <MessageCircle className="w-4 h-4 text-blue-500" />,
  airport: <Plane className="w-4 h-4 text-sky-500" />,
  passport: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
  transport: <Bus className="w-4 h-4 text-emerald-500" />,
  hotel: <Building className="w-4 h-4 text-teal-500" />,
  housing: <Home className="w-4 h-4 text-amber-600" />,
  restaurant: <Utensils className="w-4 h-4 text-orange-500" />,
  shopping: <ShoppingBag className="w-4 h-4 text-rose-500" />,
  city: <MapPin className="w-4 h-4 text-purple-500" />,
  phone: <Smartphone className="w-4 h-4 text-blue-600" />,
  health: <HeartPulse className="w-4 h-4 text-red-500" />,
  documents: <FileText className="w-4 h-4 text-slate-600" />,
};

export const PhraseSection: React.FC<PhraseSectionProps> = ({
  initialCategory = 'all',
  onShowToSpeaker,
}) => {
  const [selectedCat, setSelectedCat] = React.useState<PhraseCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);
  const [favoritesList, setFavoritesList] = React.useState<string[]>(getFavorites);

  React.useEffect(() => {
    setSelectedCat(initialCategory);
  }, [initialCategory]);

  const refreshFavorites = () => {
    setFavoritesList(getFavorites());
  };

  const filteredPhrases = React.useMemo(() => {
    const q = normalizeForSearch(searchQuery);
    return allPhrases.filter((p) => {
      if (onlyFavorites && !favoritesList.includes(p.id)) {
        return false;
      }
      if (selectedCat !== 'all' && p.category !== selectedCat) {
        return false;
      }
      if (!q) return true;
      const matchRu = normalizeForSearch(p.ru).includes(q);
      const matchEs = normalizeForSearch(p.es).includes(q);
      return matchRu || matchEs;
    });
  }, [selectedCat, searchQuery, onlyFavorites, favoritesList]);

  return (
    <div className="space-y-5">
      {/* Search and control bar */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по 400+ фразам (на русском или испанском)..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Favorites filter toggle */}
            <button
              onClick={() => {
                setOnlyFavorites(!onlyFavorites);
                refreshFavorites();
              }}
              className={`min-h-[44px] px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                onlyFavorites
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <Star className={`w-4 h-4 ${onlyFavorites ? 'fill-slate-950' : ''}`} />
              <span>Только избранное ({favoritesList.length})</span>
            </button>
          </div>
        </div>
      </div>


      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedCat('all')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-2 transition ${
            selectedCat === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Все разделы</span>
          <span className="text-[10px] opacity-80">({allPhrases.length})</span>
        </button>

        {(Object.keys(categoryNames) as PhraseCategory[]).map((cat) => {
          const info = categoryNames[cat];
          const isAct = selectedCat === cat;
          const count = allPhrases.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
                isAct
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {categoryIcons[cat]}
              <span>{info.nameRu}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isAct ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Phrases Grid */}
      {filteredPhrases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              onShowToSpeaker={onShowToSpeaker}
              onFavoriteChange={refreshFavorites}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-base font-bold text-slate-800">Фразы не найдены</p>
          <p className="text-xs text-slate-500 mt-1">
            {onlyFavorites
              ? 'У вас пока нет сохранённых фраз в избранном. Нажмите на звёздочку на карточке фразы!'
              : 'Попробуйте сбросить поисковый запрос.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCat('all');
              setOnlyFavorites(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            Показать все фразы
          </button>
        </div>
      )}
    </div>
  );
};
