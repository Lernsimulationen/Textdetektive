import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PerspectiveBadge } from './PerspectiveBadge';
import { Award, CheckCircle2, Lock, Play, Compass, Sparkles, Trophy, ArrowRight, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { RANKS_AND_REWARDS } from '../config/ranksConfig';

interface Props {
  onSelectChapter: (id: number) => void;
  onOpenWelcomeIntro: () => void;
}

export const MissionControl: React.FC<Props> = ({ onSelectChapter, onOpenWelcomeIntro }) => {
  const { chapters, profile, badges } = useGame();
  const [showLogbook, setShowLogbook] = useState(false);

  const completedCount = profile.completedChapterIds.length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  // Identify next active chapter
  const nextChapterId = Math.min(chapters.length, completedCount + 1);
  const activeChapter = chapters.find(c => c.id === nextChapterId) || chapters[0];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Top Banner & Orientation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
            FÜHRUNGSSTAND • KI-ETHIK-KOMMISSION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Missionszentrale
          </h2>
        </div>

        <button
          onClick={onOpenWelcomeIntro}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" /> Setting-Intro ansehen
        </button>
      </div>

      {/* FOCUS CARD: YOUR NEXT ACTIVE MISSION */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              DEINE AKTUELLE MISSION ({nextChapterId} / {chapters.length})
            </span>
          </div>
          <PerspectiveBadge perspective={activeChapter.perspective} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              {activeChapter.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {activeChapter.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeChapter.subtitle}
            </p>

            {activeChapter.dossierLore && (
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start gap-2">
                <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{activeChapter.dossierLore}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/60 border border-indigo-500/30 rounded-2xl text-center space-y-4">
            <div>
              <div className="text-xs font-mono text-slate-400">Belohnung:</div>
              <div className="text-2xl font-black text-yellow-400">+{activeChapter.xpReward} XP</div>
            </div>

            <button
              onClick={() => onSelectChapter(activeChapter.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-black text-sm shadow-xl transition hover:scale-[1.03]"
            >
              Mission jetzt starten <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-1.5">
            <span>KURS-FORTSCHRITT</span>
            <span className="text-cyan-400 font-bold">{progressPercent}% ({completedCount}/{chapters.length} abgeschlossen)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-700 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* RANG- & BELOHNUNGSSYSTEM SHOWCASE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Dienst-Rang & Freischaltbare Belohnungen</span>
          </h3>
          <span className="text-xs text-indigo-300 font-mono">Level {profile.level} • {profile.rank}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RANKS_AND_REWARDS.map(rr => {
            const isUnlocked = profile.level >= rr.level;
            return (
              <div 
                key={rr.level}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isUnlocked 
                    ? 'bg-indigo-950/40 border-indigo-500/40 text-white shadow-lg' 
                    : 'bg-slate-950/30 border-slate-850 opacity-40 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400 font-bold">Lvl {rr.level}</div>
                <div className="text-xs font-bold text-white line-clamp-1">{rr.title}</div>
                <div className="text-[10px] text-cyan-300 mt-1 line-clamp-1">{rr.unlockedItem}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COLLAPSIBLE LOGBOOK / MISSIONS-ARCHIV */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <button
          onClick={() => setShowLogbook(prev => !prev)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Missions-Logbuch (Alle 20 Kapitel)</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{showLogbook ? 'Einklappen' : 'Aufklappen'}</span>
            {showLogbook ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showLogbook && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800 animate-fadeIn">
            {chapters.map(chap => {
              const isCompleted = profile.completedChapterIds.includes(chap.id);
              const isUnlocked = chap.id === 1 || profile.completedChapterIds.includes(chap.id - 1) || isCompleted;

              return (
                <button
                  key={chap.id}
                  disabled={!isUnlocked}
                  onClick={() => onSelectChapter(chap.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between ${
                    isCompleted
                      ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                      : isUnlocked
                      ? 'bg-slate-900/90 border-slate-700 text-white hover:border-indigo-500'
                      : 'bg-slate-950/40 border-slate-850 opacity-40 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-mono text-[11px]">
                      <span className="text-indigo-400">Kapitel {chap.id}</span>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : !isUnlocked && <Lock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="font-bold line-clamp-1">{chap.title}</div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
                    <span>+{chap.xpReward} XP</span>
                    <span className="text-cyan-400 font-semibold">{chap.perspective}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
