/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Volume2,
  Volume1,
  Star,
  Copy,
  Check,
  Maximize2,
  Lightbulb,
} from 'lucide-react';
import { PhraseItem } from './types';
import { speechService } from './speech';
import { toggleFavorite, isFavorite } from './storage';

interface PhraseCardProps {
  phrase: PhraseItem;
  onShowToSpeaker: (phrase: PhraseItem) => void;
  onFavoriteChange?: () => void;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  onShowToSpeaker,
  onFavoriteChange,
}) => {
  const [favorite, setFavorite] = React.useState(isFavorite(phrase.id));
  const [copied, setCopied] = React.useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsub = speechService.subscribe((id, speaking) => {
      setCurrentSpeakingId(speaking ? id : null);
    });
    return unsub;
  }, []);

  const isSpeakingNormal = currentSpeakingId === `${phrase.id}-norm`;
  const isSpeakingSlow = currentSpeakingId === `${phrase.id}-slow`;

  const handleToggleFav = () => {
    const nextState = toggleFavorite(phrase.id);
    setFavorite(nextState);
    if (onFavoriteChange) onFavoriteChange();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase.es);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handlePlay = (slow = false) => {
    const callId = `${phrase.id}-${slow ? 'slow' : 'norm'}`;
    speechService.speak(callId, phrase.es, slow ? 0.65 : 0.95);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all p-4 sm:p-5 flex flex-col justify-between">
      {/* Top row: Russian text & Actions */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
            {phrase.ru}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleToggleFav}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition"
              title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Star
                className={`w-5 h-5 transition-transform active:scale-125 ${
                  favorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                }`}
              />
            </button>
            <button
              onClick={() => onShowToSpeaker(phrase)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
              title="Показать собеседнику крупно"
              aria-label="Показать собеседнику крупно"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spanish translation (Natural peninsular Spanish) */}
        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100/80 mb-2.5">
          <p className="text-base sm:text-lg font-bold text-blue-950 leading-relaxed tracking-tight">
            {phrase.es}
          </p>
        </div>

        {/* Tip / context if provided */}
        {phrase.tip && (
          <div className="flex items-start gap-1.5 px-2.5 py-1.5 mb-2.5 rounded-lg bg-amber-50/70 border border-amber-200/50 text-xs text-amber-900">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>{phrase.tip}</span>
          </div>
        )}
      </div>


      {/* Action Toolbar */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-1">
        <div className="flex items-center gap-1.5">
          {/* Normal audio */}
          <button
            onClick={() => handlePlay(false)}
            className={`min-h-[44px] px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              isSpeakingNormal
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
            title="Озвучить на испанском (обычная скорость)"
          >
            <Volume2 className="w-4 h-4 text-blue-600 group-hover:scale-105" />
            <span>Слушать</span>
          </button>

          {/* Slow audio */}
          <button
            onClick={() => handlePlay(true)}
            className={`min-h-[44px] px-2.5 rounded-xl text-xs font-medium flex items-center gap-1 transition ${
              isSpeakingSlow
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
            title="Медленное произношение (0.65x)"
          >
            <Volume1 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Медленно</span>
          </button>
        </div>

        {/* Copy Spanish */}
        <button
          onClick={handleCopy}
          className="min-h-[44px] px-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1 transition"
          title="Копировать испанский текст"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Скопировано</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Копия</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
