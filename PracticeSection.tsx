/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Volume2,
  Sparkles,
  Trophy,
  AlertTriangle,
  Flame,
  ArrowRight,
  Shuffle,
  Star,
  Check,
  X,
  Volume1,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PracticeMode, PhraseItem } from './types';
import { allPhrases } from './phrasesData';
import {
  getProgress,
  recordExerciseResult,
  getErrorPhraseIds,
  clearErrorPhraseIds,
  resetAllProgress,
  getFavorites,
} from './storage';
import { speechService } from './speech';

export const PracticeSection: React.FC = () => {
  const [mode, setMode] = React.useState<PracticeMode>('cards');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('welder');
  const [cardIndex, setCardIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = React.useState<number | null>(null);
  const [scrambleSelectedWords, setScrambleSelectedWords] = React.useState<string[]>([]);
  const [scrambleBank, setScrambleBank] = React.useState<string[]>([]);
  const [scrambleStatus, setScrambleStatus] = React.useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [progressState, setProgressState] = React.useState(getProgress);

  // Active phrase pool based on filters
  const activePool: PhraseItem[] = React.useMemo(() => {
    if (mode === 'errors') {
      const errorIds = getErrorPhraseIds();
      const errs = allPhrases.filter((p) => errorIds.includes(p.id));
      return errs.length > 0 ? errs : allPhrases.slice(0, 10);
    }

    if (categoryFilter === 'favorites') {
      const favs = getFavorites();
      const favPhrases = allPhrases.filter((p) => favs.includes(p.id));
      return favPhrases.length > 0 ? favPhrases : allPhrases.slice(0, 15);
    }

    if (categoryFilter === 'all') return allPhrases;
    return allPhrases.filter((p) => p.category === categoryFilter);
  }, [categoryFilter, mode]);

  const currentPhrase: PhraseItem | undefined = activePool[cardIndex % activePool.length];

  // Refresh scramble bank when current phrase changes
  React.useEffect(() => {
    if (mode === 'scramble' && currentPhrase) {
      // Split Spanish phrase into words
      const words = currentPhrase.es
        .replace(/[¿?¡!.,]/g, '')
        .split(/\s+/)
        .filter(Boolean);
      // Shuffle words
      setScrambleBank([...words].sort(() => Math.random() - 0.5));
      setScrambleSelectedWords([]);
      setScrambleStatus('idle');
    }
    setShowAnswer(false);
    setSelectedQuizAnswer(null);
  }, [cardIndex, mode, currentPhrase]);

  // Quiz Options generator (1 correct + 3 random distractors)
  const quizOptions = React.useMemo(() => {
    if (!currentPhrase) return [];
    const others = allPhrases
      .filter((p) => p.id !== currentPhrase.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const list = [
      { text: currentPhrase.es, isCorrect: true, translation: currentPhrase.ru },
      ...others.map((o) => ({ text: o.es, isCorrect: false, translation: o.ru })),
    ];
    return list.sort(() => Math.random() - 0.5);
  }, [currentPhrase]);

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedQuizAnswer(null);
    setCardIndex((prev) => (prev + 1) % activePool.length);
  };

  const handleCardFeedback = (knewIt: boolean) => {
    if (!currentPhrase) return;
    recordExerciseResult(currentPhrase.id, knewIt);
    setProgressState(getProgress());
    if (knewIt && cardIndex % 5 === 4) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }
    handleNext();
  };

  const handleQuizSelect = (optIndex: number, isCorrect: boolean) => {
    if (selectedQuizAnswer !== null || !currentPhrase) return;
    setSelectedQuizAnswer(optIndex);
    recordExerciseResult(currentPhrase.id, isCorrect);
    setProgressState(getProgress());

    if (isCorrect) {
      speechService.speak('quiz-opt', quizOptions[optIndex].text, 0.9);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.75 } });
    }
  };

  const handleScrambleAddWord = (word: string, bankIdx: number) => {
    if (scrambleStatus === 'correct') return;
    setScrambleSelectedWords([...scrambleSelectedWords, word]);
    const newBank = [...scrambleBank];
    newBank.splice(bankIdx, 1);
    setScrambleBank(newBank);
  };

  const handleScrambleRemoveWord = (word: string, selIdx: number) => {
    if (scrambleStatus === 'correct') return;
    const newSel = [...scrambleSelectedWords];
    newSel.splice(selIdx, 1);
    setScrambleSelectedWords(newSel);
    setScrambleBank([...scrambleBank, word]);
  };

  const checkScrambleSentence = () => {
    if (!currentPhrase) return;
    const cleanTarget = currentPhrase.es
      .replace(/[¿?¡!.,]/g, '')
      .toLowerCase()
      .trim();
    const cleanUser = scrambleSelectedWords.join(' ').toLowerCase().trim();

    if (cleanUser === cleanTarget) {
      setScrambleStatus('correct');
      recordExerciseResult(currentPhrase.id, true);
      setProgressState(getProgress());
      speechService.speak('scramble', currentPhrase.es, 0.9);
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.75 } });
    } else {
      setScrambleStatus('wrong');
      recordExerciseResult(currentPhrase.id, false);
      setProgressState(getProgress());
    }
  };

  const errorCount = getErrorPhraseIds().length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Progress Summary */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">
              Тренажёр испанского языка
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Тренируйте перевод, аудирование на слух и сборку фраз из слов для работы и поездки.
          </p>
        </div>

        {/* Progress Counters */}
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60 shrink-0">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-600">Всего ответов</p>
            <p className="text-lg font-extrabold text-blue-900 tabular-nums">
              {progressState.totalExercisesDone}
            </p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-600">Правильно</p>
            <p className="text-lg font-extrabold text-emerald-700 tabular-nums">
              {progressState.correctAnswersCount}
            </p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-600">Точность</p>
            <p className="text-lg font-extrabold text-amber-600 tabular-nums">
              {progressState.totalExercisesDone > 0
                ? Math.round((progressState.correctAnswersCount / progressState.totalExercisesDone) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'cards', label: '1. Карточки фраз' },
          { id: 'quiz', label: '2. Выбор перевода (тест)' },
          { id: 'scramble', label: '3. Собрать фразу из слов' },
          { id: 'listening', label: '4. Аудирование на слух' },
          { id: 'errors', label: `5. Повторение ошибок (${errorCount})` },
        ].map((tab) => {
          const isAct = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id as PracticeMode);
                setCardIndex(0);
              }}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                isAct
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category selector filter for training (if not in error mode) */}
      {mode !== 'errors' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-slate-500 mr-1 shrink-0">Тема:</span>
          {[
            { id: 'welder', label: 'Сварка и работа' },
            { id: 'basics', label: 'Основы общения' },
            { id: 'airport', label: 'Аэропорт' },
            { id: 'hotel', label: 'Отель' },
            { id: 'restaurant', label: 'Ресторан' },
            { id: 'housing', label: 'Жильё' },
            { id: 'favorites', label: 'Избранное' },
            { id: 'all', label: 'Все темы' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                setCardIndex(0);
              }}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                categoryFilter === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Exercise View Container */}
      {currentPhrase ? (
        <div className="max-w-2xl mx-auto">
          {/* ================= MODE 1: CARDS ================= */}
          {mode === 'cards' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-6 pb-2 border-b border-slate-100">
                  <span className="uppercase tracking-wider font-semibold">
                    Карточка {cardIndex + 1} из {activePool.length}
                  </span>
                  <span>Русский → Вспомните испанский</span>
                </div>

                {/* Question: Russian Text */}
                <div className="text-center py-4">
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {currentPhrase.ru}
                  </p>
                  {currentPhrase.tip && (
                    <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded-xl inline-block">
                      Подсказка: {currentPhrase.tip}
                    </p>
                  )}
                </div>

                {/* Answer reveal box */}
                {showAnswer ? (
                  <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center animate-fade-in">
                    <p className="text-xl sm:text-2xl font-extrabold text-blue-950 mb-1">
                      {currentPhrase.es}
                    </p>
                    <button
                      onClick={() => speechService.speak('card-sp', currentPhrase.es, 0.9)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Послушать</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <button
                      onClick={() => {
                        setShowAnswer(true);
                        speechService.speak('card-sp', currentPhrase.es, 0.9);
                      }}
                      className="min-h-[48px] px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-sm transition"
                    >
                      Показать испанский ответ
                    </button>
                  </div>
                )}
              </div>

              {/* Assessment buttons */}
              {showAnswer && (
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCardFeedback(false)}
                    className="min-h-[48px] px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Повторить позже</span>
                  </button>
                  <button
                    onClick={() => handleCardFeedback(true)}
                    className="min-h-[48px] px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Я знаю эту фразу</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= MODE 2: QUIZ ================= */}
          {mode === 'quiz' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold">
                  Вопрос {cardIndex + 1} из {activePool.length}
                </span>
                <span>Выберите правильный перевод</span>
              </div>

              <div className="text-center py-2">
                <p className="text-xs text-slate-600 font-semibold mb-1">Как сказать по-испански:</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  «{currentPhrase.ru}»
                </p>
              </div>

              {/* 4 options */}
              <div className="space-y-3">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  let style = 'bg-white border-slate-300 hover:border-blue-400 text-slate-800';

                  if (selectedQuizAnswer !== null) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-50 border-rose-500 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedQuizAnswer !== null}
                      onClick={() => handleQuizSelect(idx, opt.isCorrect)}
                      className={`w-full min-h-[52px] p-4 rounded-2xl text-left border-2 transition flex items-center justify-between gap-3 ${style}`}
                    >
                      <span className="text-sm sm:text-base font-semibold leading-snug">
                        {opt.text}
                      </span>
                      {selectedQuizAnswer !== null && (
                        <span>
                          {opt.isCorrect ? (
                            <Check className="w-5 h-5 text-emerald-600" />
                          ) : isSelected ? (
                            <X className="w-5 h-5 text-rose-600" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Next Step */}
              {selectedQuizAnswer !== null && (
                <div className="pt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-600">
                    {quizOptions[selectedQuizAnswer].isCorrect
                      ? 'Верно! Отличная работа.'
                      : `Правильный вариант: «${currentPhrase.es}»`}
                  </p>
                  <button
                    onClick={handleNext}
                    className="min-h-[44px] px-5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Следующий вопрос →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= MODE 3: SCRAMBLE ================= */}
          {mode === 'scramble' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold">
                  Соберите фразу из слов • {cardIndex + 1}/{activePool.length}
                </span>
                <span>Тапайте слова по порядку</span>
              </div>

              <div className="text-center py-2">
                <p className="text-xs text-slate-600 mb-1">Соберите испанский перевод для:</p>
                <p className="text-xl font-extrabold text-slate-900 leading-snug">
                  «{currentPhrase.ru}»
                </p>
              </div>

              {/* Selected words dropzone */}
              <div
                className={`min-h-[70px] p-4 rounded-2xl border-2 flex flex-wrap gap-2 items-center transition ${
                  scrambleStatus === 'correct'
                    ? 'bg-emerald-50 border-emerald-400'
                    : scrambleStatus === 'wrong'
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-slate-50 border-dashed border-slate-300'
                }`}
              >
                {scrambleSelectedWords.length > 0 ? (
                  scrambleSelectedWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScrambleRemoveWord(word, idx)}
                      className="px-3 py-1.5 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-xs hover:bg-rose-600 transition"
                    >
                      {word}
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic mx-auto">
                    Нажимайте на слова ниже, чтобы составить предложение
                  </span>
                )}
              </div>

              {/* Available word bank */}
              <div className="flex flex-wrap gap-2 justify-center py-2">
                {scrambleBank.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleScrambleAddWord(word, idx)}
                    className="min-h-[44px] px-4 py-2 bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-800 text-sm font-semibold rounded-xl shadow-xs transition active:scale-95"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {/* Action and feedback */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    const words = currentPhrase.es
                      .replace(/[¿?¡!.,]/g, '')
                      .split(/\s+/)
                      .filter(Boolean);
                    setScrambleBank([...words].sort(() => Math.random() - 0.5));
                    setScrambleSelectedWords([]);
                    setScrambleStatus('idle');
                  }}
                  className="min-h-[44px] px-3 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Сбросить слова</span>
                </button>

                {scrambleStatus === 'correct' ? (
                  <button
                    onClick={handleNext}
                    className="min-h-[44px] px-5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Верно! Далее →
                  </button>
                ) : (
                  <button
                    onClick={checkScrambleSentence}
                    disabled={scrambleSelectedWords.length === 0}
                    className="min-h-[44px] px-5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
                  >
                    Проверить
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= MODE 4: LISTENING ================= */}
          {mode === 'listening' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold">
                  Аудирование • {cardIndex + 1}/{activePool.length}
                </span>
                <span>Слушайте испанскую речь без текста</span>
              </div>

              {/* Audio Listen Centerpiece */}
              <div className="text-center py-6 bg-blue-50/60 rounded-2xl border border-blue-100">
                <button
                  onClick={() => speechService.speak('listening-turn', currentPhrase.es, 0.95)}
                  className="min-h-[64px] min-w-[64px] rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg mx-auto flex items-center justify-center transition active:scale-95"
                  title="Нажмите для прослушивания"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={() => speechService.speak('listening-turn', currentPhrase.es, 0.95)}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Слушать (1.0x)
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    onClick={() => speechService.speak('listening-turn', currentPhrase.es, 0.65)}
                    className="text-xs font-bold text-amber-700 hover:underline"
                  >
                    Слушать медленно (0.65x)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase text-slate-500 tracking-wider text-center">
                  Что означает эта фраза?
                </p>
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  let style = 'bg-white border-slate-300 hover:border-blue-400 text-slate-800';

                  if (selectedQuizAnswer !== null) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-50 border-rose-500 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedQuizAnswer !== null}
                      onClick={() => handleQuizSelect(idx, opt.isCorrect)}
                      className={`w-full min-h-[52px] p-4 rounded-2xl text-left border-2 transition flex items-center justify-between gap-3 ${style}`}
                    >
                      <span className="text-sm font-semibold">{opt.translation}</span>
                      {selectedQuizAnswer !== null && opt.isCorrect && (
                        <Check className="w-5 h-5 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedQuizAnswer !== null && (
                <div className="pt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-600">
                    Испанский текст: <strong className="text-blue-900">{currentPhrase.es}</strong>
                  </p>
                  <button
                    onClick={handleNext}
                    className="min-h-[44px] px-5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Следующий аудио-тест →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= MODE 5: ERRORS ================= */}
          {mode === 'errors' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                <span className="uppercase tracking-wider font-semibold text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Повторение ошибок • {cardIndex + 1}/{activePool.length}
                </span>
                <button
                  onClick={() => {
                    clearErrorPhraseIds();
                    handleNext();
                  }}
                  className="text-xs text-slate-400 hover:text-slate-700 underline"
                >
                  Очистить список ошибок
                </button>
              </div>

              <div className="text-center py-4">
                <p className="text-sm text-slate-500 mb-1">Фраза, в которой была ошибка:</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentPhrase.ru}
                </p>
              </div>

              {showAnswer ? (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <p className="text-xl font-bold text-blue-950 mb-1">{currentPhrase.es}</p>
                  <button
                    onClick={() => speechService.speak('err-sp', currentPhrase.es, 0.9)}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Послушать ещё раз</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="min-h-[48px] px-6 rounded-2xl bg-amber-500 text-slate-950 font-bold"
                  >
                    Показать правильный ответ
                  </button>
                </div>
              )}

              {showAnswer && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleCardFeedback(true)}
                    className="min-h-[44px] px-5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Запомнил, дальше →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-900">Отличная работа!</h4>
          <p className="text-sm text-slate-500 mt-1">
            Все фразы в этом блоке пройдены или в списке ошибок сейчас пусто.
          </p>
          <button
            onClick={() => {
              setMode('cards');
              setCategoryFilter('welder');
            }}
            className="mt-4 min-h-[44px] px-6 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
          >
            Перейти к карточкам сварщика
          </button>
        </div>
      )}

      {/* Progress Reset Button & Confirmation Modal */}
      <div className="text-center pt-8 border-t border-slate-200/80">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline px-4 py-2"
        >
          Сбросить весь сохранённый прогресс обучения
        </button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Сбросить прогресс?</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Это действие сбросит счётчик решённых тестов и очистит список повторения ошибок.
              Ваши сохранённые избранные фразы останутся на месте.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  resetAllProgress();
                  setProgressState(getProgress());
                  setShowResetConfirm(false);
                }}
                className="min-h-[44px] rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
              >
                Да, сбросить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
