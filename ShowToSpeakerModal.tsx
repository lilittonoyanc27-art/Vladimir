/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, Volume1, X, Copy, Check } from 'lucide-react';
import { speechService } from './speech';

interface ShowToSpeakerModalProps {
  phraseEs: string;
  phraseRu: string;
  tip?: string;
  onClose: () => void;
}

export const ShowToSpeakerModal: React.FC<ShowToSpeakerModalProps> = ({
  phraseEs,
  phraseRu,
  tip,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const unsub = speechService.subscribe((id, speaking) => {
      setIsPlaying(speaking && id === 'speaker-modal');
    });
    return unsub;
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(phraseEs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayNormal = () => {
    speechService.speak('speaker-modal', phraseEs, 0.95);
  };

  const handlePlaySlow = () => {
    speechService.speak('speaker-modal', phraseEs, 0.65);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Показать собеседнику в Испании
            </span>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition"
            aria-label="Закрыть окно"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big high-contrast Spanish text display */}
        <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-blue-50/50 to-white">
          <p className="text-xs text-blue-700 font-medium mb-3">
            Поверните экран телефона к сотруднику или покажите текст:
          </p>
          <div className="p-6 bg-blue-900 text-white rounded-2xl shadow-inner border border-blue-800">
            <p className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight text-white select-all">
              {phraseEs}
            </p>
          </div>

          {/* Meaning for the user in Russian */}
          <div className="mt-6 text-left p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Значение на русском:
            </p>
            <p className="text-base sm:text-lg font-medium text-slate-900">
              {phraseRu}
            </p>
            {tip && (
              <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                Совет: {tip}
              </p>
            )}
          </div>
        </div>

        {/* Actions footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayNormal}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition ${
                isPlaying
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Озвучить</span>
            </button>
            <button
              onClick={handlePlaySlow}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 flex items-center gap-1.5 transition"
              title="Медленное произношение (0.65x)"
            >
              <Volume1 className="w-4 h-4 text-blue-600" />
              <span>Медленно</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 flex items-center gap-1.5 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
