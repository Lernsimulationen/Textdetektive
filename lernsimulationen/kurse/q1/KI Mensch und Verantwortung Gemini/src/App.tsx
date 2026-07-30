import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { WelcomeIntro } from './components/WelcomeIntro';
import { MissionControl } from './components/MissionControl';
import { ChapterViewer } from './components/ChapterViewer';
import { AvatarCreator } from './components/AvatarCreator';
import { DataPortabilityModal } from './components/DataPortabilityModal';
import { PrivacyModal } from './components/PrivacyModal';
import { OfflineBuzzer } from './components/OfflineBuzzer';

const MainLayout: React.FC = () => {
  const { chapters, activeChapterId, setActiveChapterId, profile } = useGame();
  
  const [view, setView] = useState<'welcome' | 'hq' | 'chapter'>(() => {
    return profile.completedChapterIds.length === 0 ? 'welcome' : 'hq';
  });

  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showBuzzerModal, setShowBuzzerModal] = useState(false);

  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  const handleSelectChapter = (id: number) => {
    setActiveChapterId(id);
    setView('chapter');
  };

  const handleStartFirstChapter = () => {
    setActiveChapterId(1);
    setView('chapter');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar 
        onOpenAvatarModal={() => setShowAvatarCreator(true)}
        onOpenDataModal={() => setShowDataModal(true)}
        onOpenPrivacyModal={() => setShowPrivacyModal(true)}
        onOpenBuzzerModal={() => setShowBuzzerModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {view === 'welcome' ? (
          <WelcomeIntro 
            onEnterHQ={() => setView('hq')} 
            onStartFirstChapter={handleStartFirstChapter}
            onOpenAvatarCreator={() => setShowAvatarCreator(true)}
          />
        ) : view === 'hq' ? (
          <MissionControl 
            onSelectChapter={handleSelectChapter} 
            onOpenWelcomeIntro={() => setView('welcome')}
          />
        ) : (
          <ChapterViewer 
            chapter={activeChapter} 
            onBack={() => setView('hq')} 
            onSelectChapter={handleSelectChapter}
          />
        )}
      </main>

      {/* Modals & Creators */}
      {showAvatarCreator && <AvatarCreator onClose={() => setShowAvatarCreator(false)} />}
      {showDataModal && <DataPortabilityModal onClose={() => setShowDataModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      {showBuzzerModal && <OfflineBuzzer onClose={() => setShowBuzzerModal(false)} />}

      {/* Footer */}
      <footer className="border-t border-slate-850 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>KI-Ethik-Kommission • Oberstufen-Projektkurs (Religionslehre & Sowi)</span>
          <span>100% Offline-First PWA • DSGVO-Konform</span>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  );
}
