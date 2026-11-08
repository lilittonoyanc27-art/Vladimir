/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type SpeechListener = (speakingId: string | null, isSpeaking: boolean) => void;

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentId: string | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private voices: SpeechSynthesisVoice[] = [];
  private hasInitializedVoices = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    this.hasInitializedVoices = true;
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.currentId, this.currentUtterance !== null);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(id: string | null, isSpeaking: boolean) {
    this.currentId = id;
    this.listeners.forEach((listener) => listener(id, isSpeaking));
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    this.currentUtterance = null;
    this.notify(null, false);
  }

  public speak(
    id: string,
    text: string,
    rate: number = 0.95
  ): { success: boolean; message?: string } {
    if (!this.isSupported()) {
      return {
        success: false,
        message: 'Озвучка не поддерживается вашим браузером.',
      };
    }

    // Stop ongoing speech
    this.stop();

    if (!text || text.trim() === '') {
      return { success: false, message: 'Нет текста для озвучки.' };
    }

    // Find best Spanish voice (prefer es-ES from Spain)
    if (!this.hasInitializedVoices || this.voices.length === 0) {
      this.initVoices();
    }

    const spanishVoices = this.voices.filter(
      (v) => v.lang.startsWith('es-ES') || v.lang.startsWith('es')
    );

    const preferredVoice =
      spanishVoices.find((v) => v.lang === 'es-ES' && !v.localService) ||
      spanishVoices.find((v) => v.lang.toLowerCase().includes('es-es')) ||
      spanishVoices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = rate; // 0.95 for normal, 0.65 for slow
    utterance.pitch = 1.0;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      this.notify(id, true);
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      this.notify(null, false);
    };

    utterance.onerror = (e) => {
      // Ignore user cancellation errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech error:', e.error);
      }
      this.currentUtterance = null;
      this.notify(null, false);
    };

    try {
      window.speechSynthesis.speak(utterance);
      return { success: true };
    } catch (err) {
      this.notify(null, false);
      return {
        success: false,
        message: 'Не удалось запустить озвучку. Проверьте настройки звука на устройстве.',
      };
    }
  }

  public getCurrentPlayingId(): string | null {
    return this.currentId;
  }
}

export const speechService = new SpeechService();
