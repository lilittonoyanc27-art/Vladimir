/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ActiveTab, PhraseCategory } from './types';
import { speechService } from './speech';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { QuickAccess } from './QuickAccess';
import { WelderSection } from './WelderSection';
import { PhraseSection } from './PhraseSection';
import { DictionarySection } from './DictionarySection';
import { DialoguesSection } from './DialoguesSection';
import { PracticeSection } from './PracticeSection';
import { ShowToSpeakerModal } from './ShowToSpeakerModal';
import { WelderLetterModal } from './WelderLetterModal';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('home');
  const [selectedPhraseCategory, setSelectedPhraseCategory] = React.useState<PhraseCategory | 'all'>('all');
  const [speakerModalPhrase, setSpeakerModalPhrase] = React.useState<{
    ru: string;
    es: string;
    tip?: string;
  } | null>(null);
  const [showLetterModal, setShowLetterModal] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  React.useEffect(() => {
    const unsub = speechService.subscribe((_id, speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  const handleSelectCategoryFromHome = (cat: PhraseCategory | 'all') => {
    setSelectedPhraseCategory(cat);
    setActiveTab('phrases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowToSpeaker = (phrase: {
    ru: string;
    es: string;
    tip?: string;
  }) => {
    setSpeakerModalPhrase(phrase);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLetterModal={() => setShowLetterModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 min-w-0">
        {activeTab === 'home' && (
          <QuickAccess
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={handleSelectCategoryFromHome}
            onShowToSpeaker={handleShowToSpeaker}
          />
        )}

        {activeTab === 'welder' && (
          <WelderSection
            onShowToSpeaker={handleShowToSpeaker}
          />
        )}

        {activeTab === 'phrases' && (
          <PhraseSection
            initialCategory={selectedPhraseCategory}
            onShowToSpeaker={handleShowToSpeaker}
          />
        )}

        {activeTab === 'dictionary' && <DictionarySection />}

        {activeTab === 'dialogues' && (
          <DialoguesSection onShowToSpeaker={handleShowToSpeaker} />
        )}

        {activeTab === 'practice' && <PracticeSection />}
      </main>

      {/* Floating Active Speech Controller (if audio is currently speaking) */}
      {isSpeaking && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 bg-blue-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-blue-700 flex items-center gap-3 animate-bounce-subtle">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-semibold">Идёт испанская речь...</span>
          </div>
          <button
            onClick={() => speechService.stop()}
            className="min-h-[36px] px-2.5 py-1 rounded-lg bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Остановить</span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Fixed Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Show to Speaker Modal */}
      {speakerModalPhrase && (
        <ShowToSpeakerModal
          phraseEs={speakerModalPhrase.es}
          phraseRu={speakerModalPhrase.ru}
          tip={speakerModalPhrase.tip}
          onClose={() => setSpeakerModalPhrase(null)}
        />
      )}

      {/* Welder Cover Letter Generator Modal */}
      {showLetterModal && (
        <WelderLetterModal onClose={() => setShowLetterModal(false)} />
      )}
    </div>
  );
}
