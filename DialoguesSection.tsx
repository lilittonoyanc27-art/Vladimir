/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Plane,
  Building,
  Utensils,
  MapPin,
  Home,
  FileText,
} from 'lucide-react';
import { DialogueItem, DialogueTurn } from './types';
import { allDialogues } from './dialoguesData';
import { speechService } from './speech';

interface DialoguesSectionProps {
  onShowToSpeaker?: (phrase: { ru: string; es: string; transcription?: string; tip?: string }) => void;
}

const dialogueCategoryLabels: Record<string, { nameRu: string; icon: React.ReactNode }> = {
  all: { nameRu: 'Все диалоги', icon: <Sparkles className="w-4 h-4" /> },
  welder: { nameRu: 'Сварка и работа', icon: <Flame className="w-4 h-4 text-amber-500" /> },
  travel: { nameRu: 'Аэропорт и дорога', icon: <Plane className="w-4 h-4 text-blue-500" /> },
  hotel: { nameRu: 'Отель', icon: <Building className="w-4 h-4 text-teal-500" /> },
  housing: { nameRu: 'Аренда жилья', icon: <Home className="w-4 h-4 text-amber-600" /> },
  food: { nameRu: 'Кафе и еда', icon: <Utensils className="w-4 h-4 text-orange-500" /> },
  city: { nameRu: 'Город и транспорт', icon: <MapPin className="w-4 h-4 text-purple-500" /> },
  documents: { nameRu: 'Мэрия и банк', icon: <FileText className="w-4 h-4 text-slate-600" /> },
};

export const DialoguesSection: React.FC<DialoguesSectionProps> = () => {
  const [selectedCat, setSelectedCat] = React.useState<string>('all');
  const [activeDialogueId, setActiveDialogueId] = React.useState<string>(allDialogues[0].id);
  const [hideRussian, setHideRussian] = React.useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(false);
  const [activeTurnIndex, setActiveTurnIndex] = React.useState<number | null>(null);
  const [isTrainingMode, setIsTrainingMode] = React.useState(false);
  const [trainingTurnIndex, setTrainingTurnIndex] = React.useState<number>(1);
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number | null>(null);
  const [answeredCorrect, setAnsweredCorrect] = React.useState<boolean | null>(null);

  const activeDialogue =
    allDialogues.find((d) => d.id === activeDialogueId) || allDialogues[0];

  const filteredDialogues = React.useMemo(() => {
    if (selectedCat === 'all') return allDialogues;
    return allDialogues.filter((d) => d.category === selectedCat);
  }, [selectedCat]);

  // Clean stop when changing dialogue
  React.useEffect(() => {
    speechService.stop();
    setIsAutoPlaying(false);
    setActiveTurnIndex(null);
    setIsTrainingMode(false);
    setTrainingTurnIndex(1);
    setSelectedOptionIndex(null);
    setAnsweredCorrect(null);
  }, [activeDialogueId]);

  // Sequential audio player
  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    let index = 0;

    const playNext = () => {
      if (index >= activeDialogue.turns.length) {
        setIsAutoPlaying(false);
        setActiveTurnIndex(null);
        return;
      }

      setActiveTurnIndex(index);
      const turn = activeDialogue.turns[index];
      const res = speechService.speak(`diag-seq-${index}`, turn.textEs, 0.9);

      if (!res.success) {
        setIsAutoPlaying(false);
        setActiveTurnIndex(null);
        return;
      }

      // Estimate duration based on text length + pause
      const estimatedMs = Math.max(2200, (turn.textEs.length / 12) * 1000 + 1200);
      const timer = setTimeout(() => {
        index++;
        playNext();
      }, estimatedMs);

      // Cleanup if user clicks stop
      return () => clearTimeout(timer);
    };

    playNext();
  };

  const stopAutoPlay = () => {
    speechService.stop();
    setIsAutoPlaying(false);
    setActiveTurnIndex(null);
  };

  const playSingleTurn = (index: number, text: string) => {
    speechService.stop();
    setIsAutoPlaying(false);
    setActiveTurnIndex(index);
    speechService.speak(`diag-turn-${index}`, text, 0.9);
  };

  // Interactive training flow
  const currentTrainingTurn = activeDialogue.turns[trainingTurnIndex];
  const interlocutorTurn = activeDialogue.turns[trainingTurnIndex - 1];

  // Derive 3 options for the training question (using either custom options or generator)
  const trainingOptions = React.useMemo(() => {
    if (!currentTrainingTurn) return [];
    if (currentTrainingTurn.trainingOptions && currentTrainingTurn.trainingOptions.length >= 2) {
      return currentTrainingTurn.trainingOptions;
    }

    // Default plausible choices if specific ones not defined
    const correctEs = currentTrainingTurn.textEs;
    const correctRu = currentTrainingTurn.textRu;

    return [
      {
        textEs: correctEs,
        textRu: correctRu,
        isCorrect: true,
      },
      {
        textEs: 'No tengo tiempo para hablar de esto ahora.',
        textRu: 'У меня нет времени говорить об этом сейчас.',
        isCorrect: false,
        explanation: 'Слишком грубый или неуместный ответ в этой ситуации.',
      },
      {
        textEs: '¿Dónde está la estación de tren?',
        textRu: 'Где находится железнодорожный вокзал?',
        isCorrect: false,
        explanation: 'Не относится к смыслу текущего вопроса собеседника.',
      },
    ].sort(() => Math.random() - 0.5);
  }, [currentTrainingTurn]);

  const handleSelectOption = (index: number, isCorrect: boolean) => {
    setSelectedOptionIndex(index);
    setAnsweredCorrect(isCorrect);
    if (isCorrect) {
      speechService.speak('correct-answer', trainingOptions[index].textEs, 0.9);
    }
  };

  const handleNextTrainingTurn = () => {
    setSelectedOptionIndex(null);
    setAnsweredCorrect(null);
    // Move to next user turn (turns 1, 3, 5, etc.)
    const nextIndex = trainingTurnIndex + 2;
    if (nextIndex < activeDialogue.turns.length) {
      setTrainingTurnIndex(nextIndex);
    } else {
      // Completed dialogue training
      setIsTrainingMode(false);
      setTrainingTurnIndex(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {Object.keys(dialogueCategoryLabels).map((key) => {
          const item = dialogueCategoryLabels[key];
          const isAct = selectedCat === key;
          const count =
            key === 'all'
              ? allDialogues.length
              : allDialogues.filter((d) => d.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setSelectedCat(key)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
                isAct
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.nameRu}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Dialogue Layout (2-column on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dialogue List (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs flex flex-col max-h-[750px]">
          <div className="px-2 py-1 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Список ситуаций ({filteredDialogues.length})
            </span>
          </div>
          <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
            {filteredDialogues.map((diag, idx) => {
              const isSelected = diag.id === activeDialogue.id;
              return (
                <button
                  key={diag.id}
                  onClick={() => setActiveDialogueId(diag.id)}
                  className={`w-full min-h-[52px] p-3 rounded-2xl text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm truncate">{diag.titleRu}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 shrink-0">
                    {diag.turns.length} реплик
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Dialogue Player & Interactive Training (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Card */}
          <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Разговорник в действии
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {activeDialogue.titleRu}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {activeDialogue.situation}
                </p>
              </div>

              {/* Roles Badge */}
              <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200/60 text-xs">
                <span className="font-semibold text-slate-800">
                  {activeDialogue.roles.person1.nameRu}
                </span>
                <span className="text-slate-400">↔</span>
                <span className="font-semibold text-blue-700">
                  {activeDialogue.roles.person2.nameRu}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                {/* Auto Play continuous whole dialogue */}
                {!isAutoPlaying ? (
                  <button
                    onClick={startAutoPlay}
                    className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 shadow-xs transition"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Слушать весь диалог</span>
                  </button>
                ) : (
                  <button
                    onClick={stopAutoPlay}
                    className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5 shadow-xs transition animate-pulse"
                  >
                    <Square className="w-4 h-4 fill-slate-950" />
                    <span>Остановить воспроизведение</span>
                  </button>
                )}

                {/* Hide Russian toggle */}
                <button
                  onClick={() => setHideRussian(!hideRussian)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                    hideRussian
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Скрыть русский перевод для тренировки слуха и понимания"
                >
                  {hideRussian ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{hideRussian ? 'Русский скрыт' : 'Скрыть перевод'}</span>
                </button>
              </div>

              {/* Mode Switch: Listen vs Interactive Training */}
              <button
                onClick={() => {
                  speechService.stop();
                  setIsAutoPlaying(false);
                  setIsTrainingMode(!isTrainingMode);
                  setTrainingTurnIndex(1);
                  setSelectedOptionIndex(null);
                  setAnsweredCorrect(null);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  isTrainingMode
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isTrainingMode ? 'Вернуться к чтению' : 'Режим тренировки ответов'}</span>
              </button>
            </div>
          </div>

          {/* Dialogue Content or Interactive Training */}
          {!isTrainingMode ? (
            /* Standard Reading View with Audio per turn */
            <div className="space-y-3">
              {activeDialogue.turns.map((turn, index) => {
                const isSpeaker1 = turn.speakerId === 'person1';
                const role = isSpeaker1
                  ? activeDialogue.roles.person1
                  : activeDialogue.roles.person2;
                const isTurnActive = activeTurnIndex === index;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border transition-all ${
                      isTurnActive
                        ? 'bg-amber-50/80 border-amber-300 shadow-md ring-2 ring-amber-400'
                        : isSpeaker1
                        ? 'bg-white border-slate-200/90 ml-0 mr-4 sm:mr-8'
                        : 'bg-blue-50/70 border-blue-200 ml-4 sm:ml-8 mr-0'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs font-bold ${
                          isSpeaker1 ? 'text-slate-700' : 'text-blue-800'
                        }`}
                      >
                        {role.nameRu} ({role.nameEs})
                      </span>
                      <button
                        onClick={() => playSingleTurn(index, turn.textEs)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-100/80 transition"
                        title="Прослушать эту реплику"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Spanish phrase */}
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {turn.textEs}
                    </p>

                    {/* Russian translation */}
                    {!hideRussian && (
                      <p className="text-sm font-medium text-slate-600 mt-1 leading-snug">
                        {turn.textRu}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Interactive Training Mode View */
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Тренировка диалога • Шаг {Math.ceil(trainingTurnIndex / 2)} из{' '}
                    {Math.ceil(activeDialogue.turns.length / 2)}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Выберите правильный ответ на испанском
                </span>
              </div>

              {/* Interlocutor Prompt */}
              {interlocutorTurn && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 block mb-1">
                    Собеседник говорит вам ({activeDialogue.roles.person1.nameRu}):
                  </span>
                  <p className="text-lg font-bold text-slate-900">
                    {interlocutorTurn.textEs}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    «{interlocutorTurn.textRu}»
                  </p>
                  <button
                    onClick={() =>
                      speechService.speak('prompt', interlocutorTurn.textEs, 0.9)
                    }
                    className="mt-2 text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Послушать ещё раз</span>
                  </button>
                </div>
              )}

              {/* User options */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  Ваш ответ (выберите подходящую реплику):
                </p>

                {trainingOptions.map((opt, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;
                  let btnStyle = 'bg-white border-slate-300 hover:border-blue-400 text-slate-800';

                  if (selectedOptionIndex !== null) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={selectedOptionIndex !== null}
                      onClick={() => handleSelectOption(optIdx, opt.isCorrect)}
                      className={`w-full min-h-[56px] p-4 rounded-2xl text-left border-2 transition flex items-start justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="space-y-1">
                        <p className="text-base font-bold leading-snug">{opt.textEs}</p>
                        <p className="text-xs text-slate-600">{opt.textRu}</p>
                        {selectedOptionIndex !== null && !opt.isCorrect && opt.explanation && (
                          <p className="text-xs text-rose-700 italic pt-1">
                            {opt.explanation}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 mt-0.5">
                        {selectedOptionIndex !== null && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                        {selectedOptionIndex !== null && !opt.isCorrect && isSelected && (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback footer */}
              {selectedOptionIndex !== null && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    {answeredCorrect ? (
                      <p className="text-sm font-bold text-emerald-700">
                        Отлично! Ответ выбран абсолютно верно.
                      </p>
                    ) : (
                      <p className="text-sm font-bold text-rose-600">
                        Не совсем. Обратите внимание на правильный вариант выше.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleNextTrainingTurn}
                    className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Следующая реплика →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
