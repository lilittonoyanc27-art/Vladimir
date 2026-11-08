/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PhraseCategory =
  | 'basics'
  | 'airport'
  | 'passport'
  | 'transport'
  | 'hotel'
  | 'housing'
  | 'restaurant'
  | 'shopping'
  | 'city'
  | 'phone'
  | 'health'
  | 'documents'
  | 'welder';

export type WelderSubcategory =
  | 'search'
  | 'call'
  | 'message'
  | 'resume'
  | 'interview'
  | 'skills'
  | 'conditions'
  | 'first_day'
  | 'team'
  | 'tools'
  | 'safety'
  | 'danger';

export interface PhraseItem {
  id: string;
  ru: string;
  es: string;
  transcription: string;
  category: PhraseCategory;
  subcategory?: WelderSubcategory | string;
  tip?: string;
  tags?: string[];
  isWelderCore?: boolean;
}

export type DictionaryCategory =
  | 'travel'
  | 'hotel'
  | 'food'
  | 'city'
  | 'work_docs'
  | 'welding_tools'
  | 'protective_gear'
  | 'body_health'
  | 'time_numbers'
  | 'verbs_questions';

export interface DictionaryEntry {
  id: string;
  ru: string;
  es: string;
  article?: 'el' | 'la' | 'los' | 'las' | 'el / la';
  category: DictionaryCategory;
  transcription: string;
  exampleEs: string;
  exampleRu: string;
  partOfSpeech?: 'сущ.' | 'глаг.' | 'прил.' | 'фраза' | 'нареч.' | 'числ.';
}

export interface DialogueTurn {
  speakerId: 'person1' | 'person2';
  textEs: string;
  textRu: string;
  transcription?: string;
  trainingOptions?: {
    textEs: string;
    textRu: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

export interface DialogueItem {
  id: string;
  titleRu: string;
  category: 'welder' | 'travel' | 'hotel' | 'food' | 'city' | 'housing' | 'documents';
  situation: string;
  roles: {
    person1: { nameRu: string; nameEs: string; roleRu: string };
    person2: { nameRu: string; nameEs: string; roleRu: string };
  };
  turns: DialogueTurn[];
}

export interface WelderProfileState {
  name: string;
  yearsExperience: number;
  specializations: string[]; // ['MIG/MAG', 'TIG', 'MMA (Electrodo)']
  certifications: string[]; // e.g. ['Homologación 6G', 'Cursos PRL 20h']
  workPermitStatus: 'has_permit' | 'in_process' | 'needs_sponsorship';
  hasDriverLicense: boolean;
  city: string;
  phone: string;
}

export type ActiveTab =
  | 'home'
  | 'phrases'
  | 'welder'
  | 'dictionary'
  | 'dialogues'
  | 'practice'
  | 'favorites';

export type PracticeMode =
  | 'cards'
  | 'quiz'
  | 'scramble'
  | 'listening'
  | 'dialogue_cloze'
  | 'errors';
