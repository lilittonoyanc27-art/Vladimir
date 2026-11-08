/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Search,
  Volume2,
  Star,
  BookOpen,
  Filter,
  Check,
  Copy,
} from 'lucide-react';
import { DictionaryEntry, DictionaryCategory } from './types';
import { dictionaryEntries, dictionaryCategories } from './dictionaryData';
import { speechService } from './speech';
import { normalizeForSearch, toggleFavorite, isFavorite } from './storage';

export const DictionarySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<DictionaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);
  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsub = speechService.subscribe((id, speaking) => {
      setCurrentPlayingId(speaking ? id : null);
    });
    return unsub;
  }, []);

  const handleSpeak = (entry: DictionaryEntry) => {
    const fullText = entry.article ? `${entry.article} ${entry.es}` : entry.es;
    speechService.speak(`dict-${entry.id}`, fullText, 0.9);
  };

  const handleSpeakExample = (entry: DictionaryEntry) => {
    speechService.speak(`dict-ex-${entry.id}`, entry.exampleEs, 0.9);
  };

  const handleCopy = (entry: DictionaryEntry) => {
    const fullText = entry.article ? `${entry.article} ${entry.es}` : entry.es;
    navigator.clipboard.writeText(fullText);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredEntries = React.useMemo(() => {
    const q = normalizeForSearch(searchQuery);
    return dictionaryEntries.filter((item) => {
      if (onlyFavorites && !isFavorite(`dict-${item.id}`)) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const matchRu = normalizeForSearch(item.ru).includes(q);
      const matchEs = normalizeForSearch(item.es).includes(q);
      const matchExRu = normalizeForSearch(item.exampleRu).includes(q);
      const matchExEs = normalizeForSearch(item.exampleEs).includes(q);
      return matchRu || matchEs || matchExRu || matchExEs;
    });
  }, [selectedCategory, searchQuery, onlyFavorites]);

  return (
    <div className="space-y-5">
      {/* Search and control bar */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по словарю (el electrodo, сварка, болгарка, chapa)..."
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

          {/* Favorites toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
              onlyFavorites
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <Star className={`w-4 h-4 ${onlyFavorites ? 'fill-slate-950' : ''}`} />
            <span>Избранные слова</span>
          </button>
        </div>

        {/* Info header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Показано слов: <strong className="text-slate-900">{filteredEntries.length}</strong> из{' '}
            {dictionaryEntries.length}
          </span>
          <span className="hidden sm:inline">
            Все существительные снабжены артиклями <strong className="text-blue-700">el</strong> (мужской род) / <strong className="text-rose-700">la</strong> (женский род)
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Все слова ({dictionaryEntries.length})
        </button>

        {(Object.keys(dictionaryCategories) as DictionaryCategory[]).map((cat) => {
          const info = dictionaryCategories[cat];
          const isAct = selectedCategory === cat;
          const count = dictionaryEntries.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
                isAct
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{info.nameRu}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isAct ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dictionary Entries Grid */}
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredEntries.map((entry) => {
            const isPlayingWord = currentPlayingId === `dict-${entry.id}`;
            const isPlayingEx = currentPlayingId === `dict-ex-${entry.id}`;
            const isFav = isFavorite(`dict-${entry.id}`);

            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-200 transition p-4 flex flex-col justify-between"
              >
                <div>
                  {/* Word Head: Russian, Spanish & Article */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        {entry.article && (
                          <span
                            className={`text-sm font-bold uppercase ${
                              entry.article.includes('el')
                                ? 'text-blue-700'
                                : 'text-rose-600'
                            }`}
                          >
                            {entry.article}
                          </span>
                        )}
                        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                          {entry.es}
                        </h3>
                        {entry.partOfSpeech && (
                          <span className="text-[11px] text-slate-400 italic">
                            ({entry.partOfSpeech})
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">
                        {entry.ru}
                      </p>
                    </div>

                    {/* Actions: Listen word & Fav */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleSpeak(entry)}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition ${
                          isPlayingWord
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title="Прослушать слово"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => {
                          toggleFavorite(`dict-${entry.id}`);
                          // trigger re-render
                          setSelectedCategory((c) => c);
                        }}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition"
                        title={isFav ? 'Удалить из избранного' : 'В избранное'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isFav ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => handleCopy(entry)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        title="Копировать слово"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Context Example sentence */}
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-800 leading-snug">
                        {entry.exampleEs}
                      </p>
                      <button
                        onClick={() => handleSpeakExample(entry)}
                        className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white transition ${
                          isPlayingEx ? 'text-blue-600 font-bold' : ''
                        }`}
                        title="Прослушать пример"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 mt-1 italic leading-snug">
                      {entry.exampleRu}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">Слова не найдены</h4>
          <p className="text-xs text-slate-500 mt-1">
            Попробуйте изменить поисковый запрос или переключить категорию.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyFavorites(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
          >
            Показать весь словарь
          </button>
        </div>
      )}
    </div>
  );
};
