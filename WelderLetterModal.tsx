/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Copy, Check, Volume2, Save, Sparkles, AlertCircle } from 'lucide-react';
import { WelderProfileState } from './types';
import { getWelderProfile, saveWelderProfile } from './storage';
import { speechService } from './speech';

interface WelderLetterModalProps {
  onClose: () => void;
}

export const WelderLetterModal: React.FC<WelderLetterModalProps> = ({ onClose }) => {
  const [profile, setProfile] = React.useState<WelderProfileState>(getWelderProfile);
  const [copiedEs, setCopiedEs] = React.useState(false);
  const [copiedRu, setCopiedRu] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);
  const [includeSpecialties, setIncludeSpecialties] = React.useState(true);
  const [includePermit, setIncludePermit] = React.useState(true);

  const handleToggleSpecialization = (spec: string) => {
    setProfile((prev) => {
      const exists = prev.specializations.includes(spec);
      const updated = exists
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec];
      return { ...prev, specializations: updated };
    });
  };

  const handleSave = () => {
    saveWelderProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Generate Spanish Presentation
  const generateSpanishLetter = () => {
    const nameStr = profile.name.trim() || '[nombre]';
    const yearsStr = profile.yearsExperience === 1 ? 'un año' : `${profile.yearsExperience} años`;
    let text = `Hola, me llamo ${nameStr}. Busco trabajo como soldador. Tengo ${yearsStr} de experiencia. Hablo un poco de español y sigo aprendiendo.`;

    if (includeSpecialties && profile.specializations.length > 0) {
      const specList = profile.specializations
        .map((s) => {
          if (s.includes('MIG/MAG')) return 'MIG/MAG (hilo continuo)';
          if (s.includes('TIG')) return 'TIG (argón)';
          if (s.includes('MMA')) return 'electrodo revestido';
          return s;
        })
        .join(', ');
      text += ` Domina los procesos de soldadura: ${specList}.`;
    }

    if (includePermit) {
      if (profile.workPermitStatus === 'has_permit') {
        text += ' Tengo permiso de trabajo en vigor en España.';
      } else if (profile.workPermitStatus === 'in_process') {
        text += ' Mi documentación se encuentra en trámite.';
      }
    }

    if (profile.hasDriverLicense) {
      text += ' Dispongo de permiso de conducir B.';
    }

    text += ' Puedo enviarles mi currículum y fotos de mis soldaduras. ¿Tienen alguna vacante disponible en su taller? Muchas gracias por su atención.';
    return text;
  };

  // Generate Russian Presentation
  const generateRussianLetter = () => {
    const nameStr = profile.name.trim() || '[имя]';
    const years = profile.yearsExperience;
    const yearWord = years === 1 ? 'год' : years >= 2 && years <= 4 ? 'года' : 'лет';
    let text = `Здравствуйте! Меня зовут ${nameStr}. Я ищу работу сварщиком. У меня ${years} ${yearWord} опыта. Я немного говорю по-испански и продолжаю учиться.`;

    if (includeSpecialties && profile.specializations.length > 0) {
      text += ` Владею методами сварки: ${profile.specializations.join(', ')}.`;
    }

    if (includePermit) {
      if (profile.workPermitStatus === 'has_permit') {
        text += ' Имею действующее разрешение на работу в Испании.';
      } else if (profile.workPermitStatus === 'in_process') {
        text += ' Документы находятся в процессе оформления.';
      }
    }

    if (profile.hasDriverLicense) {
      text += ' Есть водительские права категории B.';
    }

    text += ' Могу отправить своё резюме и примеры швов. Есть ли у вас открытые вакансии в цехе? Большое спасибо за внимание.';
    return text;
  };

  const letterEs = generateSpanishLetter();
  const letterRu = generateRussianLetter();

  const handleCopyEs = () => {
    navigator.clipboard.writeText(letterEs);
    setCopiedEs(true);
    setTimeout(() => setCopiedEs(false), 2000);
  };

  const handleCopyRu = () => {
    navigator.clipboard.writeText(letterRu);
    setCopiedRu(true);
    setTimeout(() => setCopiedRu(false), 2000);
  };

  const handleSpeak = () => {
    speechService.speak('welder-letter', letterEs, 0.9);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Генератор сообщения работодателю в Испании
            </h2>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Note regarding user privacy and accurate facts */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Вы сами настраиваете свои реальные данные. Никакие навыки, разрешения или сертификаты
              не приписываются без вашего прямого выбора.
            </p>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Ваше имя (латиницей):
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Vladimir / Владимир"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Стаж работы сварщиком (лет):
              </label>
              <input
                type="number"
                min={1}
                max={40}
                value={profile.yearsExperience}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    yearsExperience: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Specializations (Checkboxes) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Методы сварки (выберите только те, которыми реально владеете):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'MIG/MAG (Полуавтомат)',
                'TIG (Аргон)',
                'MMA (Электрод)',
              ].map((spec) => {
                const checked = profile.specializations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleToggleSpecialization(spec)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition ${
                      checked
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{spec}</span>
                    <span className="text-xs">{checked ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legal status selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Статус разрешения на работу:
              </label>
              <select
                value={profile.workPermitStatus}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    workPermitStatus: e.target.value as WelderProfileState['workPermitStatus'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="has_permit">Есть действующее разрешение (Permiso en vigor)</option>
                <option value="in_process">В процессе оформления (En trámite)</option>
                <option value="needs_sponsorship">Требуется рабочий контракт от компании</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={profile.hasDriverLicense}
                  onChange={(e) =>
                    setProfile({ ...profile, hasDriverLicense: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                />
                <span>Есть водительские права (Категория B)</span>
              </label>
            </div>
          </div>

          {/* Live Preview Cards */}
          <div className="space-y-4 pt-2">
            {/* Spanish Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-900 text-white shadow-md border border-blue-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Текст на испанском (для WhatsApp, Email или звонка):
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSpeak}
                    className="min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-800 hover:bg-blue-700 text-white flex items-center gap-1.5 transition"
                    title="Прослушать произношение"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Озвучить</span>
                  </button>
                  <button
                    onClick={handleCopyEs}
                    className="min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition"
                  >
                    {copiedEs ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-slate-950" />
                        <span>Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-950" />
                        <span>Копировать ES</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed select-all">
                {letterEs}
              </p>
            </div>

            {/* Russian Meaning Preview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Перевод на русский:
                </span>
                <button
                  onClick={handleCopyRu}
                  className="min-h-[44px] px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg flex items-center gap-1 transition"
                >
                  {copiedRu ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  <span>Копировать RU</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {letterRu}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? 'Сохранено в память!' : 'Сохранить профиль'}</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
