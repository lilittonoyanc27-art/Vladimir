/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Plane,
  Building,
  Utensils,
  Briefcase,
  Flame,
  HeartPulse,
  Star,
  GraduationCap,
  Sparkles,
  Volume2,
  Maximize2,
  ChevronRight,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { PhraseCategory, PhraseItem } from './types';
import { allPhrases } from './phrasesData';
import { speechService } from './speech';
import { getProgress, getFavorites } from './storage';

interface QuickAccessProps {
  onNavigateTab: (tab: 'phrases' | 'welder' | 'dictionary' | 'dialogues' | 'practice') => void;
  onSelectCategory: (cat: PhraseCategory | 'all') => void;
  onShowToSpeaker: (phrase: PhraseItem) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({
  onNavigateTab,
  onSelectCategory,
  onShowToSpeaker,
}) => {
  const [favoritesCount, setFavoritesCount] = React.useState(getFavorites().length);
  const progress = getProgress();

  // Top 5 urgent essential survival phrases for quick 1-tap display
  const emergencySurvivalPhrases: PhraseItem[] = [
    {
      id: 'em-1',
      ru: 'Я не говорю по-испански. Говорите медленнее, пожалуйста.',
      es: 'No hablo español. Hable más despacio, por favor.',
      transcription: 'Но а́бло эспаньо́ль. А́бле мас дэспа́сьо, пор фаво́р.',
      category: 'basics',
    },
    {
      id: 'em-2',
      ru: 'Я сварщик с 5 годами опыта, ищу работу.',
      es: 'Soy soldador con cinco años de experiencia, busco trabajo.',
      transcription: 'Сой сольдадо́р кон си́нко а́ньос дэ экспэрье́нсья, бу́ско траба́хо.',
      category: 'welder',
    },
    {
      id: 'em-3',
      ru: 'Где стойка регистрации / выход на посадку?',
      es: '¿Dónde está el mostrador de facturación o la puerta de embarque?',
      transcription: '¿До́ндэ эста́ эль мострадо́р дэ фактурасьо́н?',
      category: 'airport',
    },
    {
      id: 'em-4',
      ru: 'У меня есть бронирование на моё имя.',
      es: 'Tengo una reserva a mi nombre.',
      transcription: 'Тэ́нго у́на рэсэ́рва а ми но́мбрэ.',
      category: 'hotel',
    },
    {
      id: 'em-5',
      ru: 'Помогите, пожалуйста! Нужен врач / 112.',
      es: '¡Ayuda, por favor! Necesito un médico / llame al 112.',
      transcription: '¡Айю́да, пор фаво́р! Нэсэси́то ун мэ́дико.',
      category: 'health',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welder Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Flame className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Испания: переезд и работа сварщиком
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2">
            Испанский для поездки и работы
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Разговорник с озвучкой, словарь с артиклями, тренировки и режим показа крупным текстом для аэропорта, отеля, ресторана и работы в цехе.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('welder')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              <Flame className="w-4 h-4" />
              <span>Главный раздел: Сварщик (100+ фраз)</span>
            </button>
            <button
              onClick={() => onNavigateTab('practice')}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
              Учить фразы ({progress.totalExercisesDone} решено)
            </button>
          </div>
        </div>

        {/* Ambient decorative elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 8 Primary Quick Access Buttons (Mandatory from prompt) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Быстрый доступ к разделам
          </h2>
          <span className="text-xs text-slate-400">Нажмите для быстрого перехода</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Аэропорт */}
          <button
            onClick={() => {
              onSelectCategory('airport');
              onNavigateTab('phrases');
            }}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Аэропорт</p>
              <p className="text-[11px] text-slate-500 truncate">Багаж, регистрация, рейс</p>
            </div>
          </button>

          {/* 2. Отель */}
          <button
            onClick={() => {
              onSelectCategory('hotel');
              onNavigateTab('phrases');
            }}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Отель</p>
              <p className="text-[11px] text-slate-500 truncate">Бронь, ключи, кондиционер</p>
            </div>
          </button>

          {/* 3. Ресторан */}
          <button
            onClick={() => {
              onSelectCategory('restaurant');
              onNavigateTab('phrases');
            }}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Ресторан</p>
              <p className="text-[11px] text-slate-500 truncate">Меню дня, счёт, прожарка</p>
            </div>
          </button>

          {/* 4. Найти работу */}
          <button
            onClick={() => onNavigateTab('welder')}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Найти работу</p>
              <p className="text-[11px] text-slate-500 truncate">Звонок, резюме, вакансии</p>
            </div>
          </button>

          {/* 5. Я сварщик */}
          <button
            onClick={() => onNavigateTab('welder')}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Я сварщик</p>
              <p className="text-[11px] text-slate-500 truncate">MIG/MAG, TIG, баллоны</p>
            </div>
          </button>

          {/* 6. Нужна помощь */}
          <button
            onClick={() => {
              onSelectCategory('health');
              onNavigateTab('phrases');
            }}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Нужна помощь</p>
              <p className="text-[11px] text-slate-500 truncate">Экстренные 112, аптека</p>
            </div>
          </button>

          {/* 7. Избранное */}
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigateTab('phrases');
            }}
            className="min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mt-2">Избранное</p>
              <p className="text-[11px] text-slate-500 truncate">Сохранённые фразы</p>
            </div>
          </button>

          {/* 8. Продолжить обучение */}
          <button
            onClick={() => onNavigateTab('practice')}
            className="min-h-[76px] p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition text-left flex flex-col justify-between group active:scale-98 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mt-2">Обучение</p>
              <p className="text-[11px] text-blue-100 truncate">Карточки, тесты, аудио</p>
            </div>
          </button>
        </div>
      </div>

      {/* Emergency Immediate Phrases: 1-Tap Show to Speaker */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Maximize2 className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Режим «Показать собеседнику» (Срочные фразы в один тап)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Нажмите карточку для показа</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emergencySurvivalPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-400 hover:shadow-xs transition flex items-center justify-between gap-3 group"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onShowToSpeaker(phrase)}
              >
                <p className="text-xs text-slate-500 font-medium">{phrase.ru}</p>
                <p className="text-sm font-bold text-blue-950 mt-0.5 leading-snug group-hover:text-blue-700 transition">
                  {phrase.es}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => speechService.speak(phrase.id, phrase.es, 0.9)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                  title="Озвучить"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onShowToSpeaker(phrase)}
                  className="min-h-[44px] px-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1"
                  title="Показать крупно"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Показать</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
