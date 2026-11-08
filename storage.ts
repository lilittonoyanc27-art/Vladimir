/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WelderProfileState } from './types';

const FAVORITES_KEY = 'spain_welder_favs';
const PROGRESS_KEY = 'spain_welder_progress';
const SETTINGS_KEY = 'spain_welder_settings';
const PROFILE_KEY = 'spain_welder_profile';
const ERRORS_KEY = 'spain_welder_errors';

export interface UserProgress {
  learnedPhraseIds: string[];
  totalExercisesDone: number;
  correctAnswersCount: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface UserSettings {
  showTranscription: boolean;
  defaultSpeed: number; // 0.95 or 0.65
}

export const defaultWelderProfile: WelderProfileState = {
  name: 'Владимир',
  yearsExperience: 5,
  specializations: ['MIG/MAG (Полуавтомат)', 'TIG (Аргон)', 'MMA (Электрод)'],
  certifications: ['Курс охраны труда PRL 20h'],
  workPermitStatus: 'in_process',
  hasDriverLicense: true,
  city: 'Мадрид / Валенсия',
  phone: '+34 600 000 000',
};

export const defaultSettings: UserSettings = {
  showTranscription: true,
  defaultSpeed: 0.95,
};

export const defaultProgress: UserProgress = {
  learnedPhraseIds: [],
  totalExercisesDone: 0,
  correctAnswersCount: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): boolean {
  try {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    let updated: string[];
    let isNowFav: boolean;
    if (index >= 0) {
      updated = favs.filter((item) => item !== id);
      isNowFav = false;
    } else {
      updated = [...favs, id];
      isNowFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return isNowFav;
  } catch {
    return false;
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function getProgress(): UserProgress {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? { ...defaultProgress, ...JSON.parse(data) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(updater: (prev: UserProgress) => UserProgress) {
  try {
    const current = getProgress();
    const updated = updater(current);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving progress', e);
  }
}

export function markPhraseLearned(id: string) {
  saveProgress((p) => {
    if (p.learnedPhraseIds.includes(id)) return p;
    return { ...p, learnedPhraseIds: [...p.learnedPhraseIds, id] };
  });
}

export function recordExerciseResult(phraseId: string, isCorrect: boolean) {
  saveProgress((p) => ({
    ...p,
    totalExercisesDone: p.totalExercisesDone + 1,
    correctAnswersCount: isCorrect ? p.correctAnswersCount + 1 : p.correctAnswersCount,
  }));

  // Track errors for dedicated review
  try {
    const errorList: string[] = JSON.parse(localStorage.getItem(ERRORS_KEY) || '[]');
    if (!isCorrect) {
      if (!errorList.includes(phraseId)) {
        errorList.push(phraseId);
      }
    } else {
      // If answered correctly, remove from errors
      const idx = errorList.indexOf(phraseId);
      if (idx !== -1) {
        errorList.splice(idx, 1);
      }
    }
    localStorage.setItem(ERRORS_KEY, JSON.stringify(errorList));
  } catch {
    // ignore
  }
}

export function getErrorPhraseIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ERRORS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearErrorPhraseIds() {
  localStorage.removeItem(ERRORS_KEY);
}

export function getSettings(): UserSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: UserSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings', e);
  }
}

export function getWelderProfile(): WelderProfileState {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? { ...defaultWelderProfile, ...JSON.parse(data) } : defaultWelderProfile;
  } catch {
    return defaultWelderProfile;
  }
}

export function saveWelderProfile(profile: WelderProfileState) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function resetAllProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(ERRORS_KEY);
}

/**
 * Normalizes strings by removing Spanish accents (á -> a, ñ is kept distinct or normalized, etc.)
 * for fuzzy search in both Russian and Spanish.
 */
export function normalizeForSearch(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics except special if needed
    .trim();
}
