import React from 'react';
import { useGame } from '../context/GameContext';
import { Compass, Sparkles, ArrowRight, BookOpen, Palette, Upload } from 'lucide-react';
import { QuickImportZone } from './QuickImportZone';
import { AVATARS } from '../config/avatarsConfig';

interface Props {
  onEnterHQ: () => void;
  onStartFirstChapter: () => void;
  onOpenAvatarCreator: () => void;
}

export const WelcomeIntro: React.FC<Props> = ({ onEnterHQ, onStartFirstChapter, onOpenAvatarCreator }) => {
  const { profile } = useGame();
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const nextChapterId = profile.completedChapterIds.length + 1;
  const isBrandNew = profile.completedChapterIds.length === 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn py-4">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-indigo-500/40 bg-slate-900 shadow-2xl">
        <div className="h-80 sm:h-96 w-full relative">
          <img 
            src="assets/images/mission_control.jpg" 
            alt="Missionszentrale Briefing" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        </div>

        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              <Sparkles className="w-4 h-4" /> OPERATION HUMANITAS • BRIEFING
            </div>

            {/* Prominent Avatar Creator Button in Banner */}
            <button 
              onClick={onOpenAvatarCreator}
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/50 transition text-xs font-extrabold text-white shadow-lg group"
            >
              <img src={currentAvatar.image} alt={profile.name} className="w-7 h-7 rounded-lg object-cover border border-cyan-400 group-hover:scale-105 transition" />
              <span>KI-Avatar Creator ({profile.name})</span>
              <Palette className="w-3.5 h-3.5 text-cyan-300 ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Willkommen in der <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-yellow-300 bg-clip-text text-transparent">
                KI-Ethik-Kommission
              </span>
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Sie wurden als Nachwuchs-Kommissar/in berufen, um den unkontrollierten Einsatz von Künstlicher Intelligenz kritisch zu begleiten. 
              Ihr Auftrag: Menschenrechte schützen, Algorithmen hinterfragen und ethische Verantwortung einfordern.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={isBrandNew ? onStartFirstChapter : onEnterHQ}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-black text-base shadow-2xl hover:scale-[1.02] transition"
              >
                {isBrandNew ? 'Mission 1: Ausbildung starten →' : `Weiter zu Kapitel ${nextChapterId} →`}
              </button>

              <button
                onClick={onEnterHQ}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition"
              >
                <Compass className="w-4 h-4 text-cyan-400" /> Missionszentrale betreten
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT KI-BILD AVATAR BUILDER CARD ON STARTSEITE */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-2xl bg-slate-900 flex-shrink-0">
            <img src={currentAvatar.image} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> KI-BILD AVATAR CREATOR
            </div>
            <h3 className="text-2xl font-black text-white">Dein Agent: {profile.name} ({currentAvatar.role})</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
              Wähle dein Agenten-Portrait aus hochauflösenden KI-Grafik-Prototypen, passe dein Cyber-Equipment & deinen Codenamen an!
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAvatarCreator}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-black text-sm shadow-2xl transition flex-shrink-0 hover:scale-[1.03]"
        >
          <Palette className="w-4 h-4" /> KI-Avatar Creator öffnen
        </button>
      </div>

      {/* PROMINENT SCHNELL-IMPORT MODUL ON STARTSEITE */}
      <QuickImportZone onImportSuccess={onEnterHQ} />

      {/* Die beiden Leitwissenschaften (Religionslehre & Sowi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Religionslehre Card */}
        <div className="bg-slate-900/80 border border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 flex items-center justify-center font-bold text-lg">
            🟡
          </div>
          <h3 className="text-xl font-bold text-white">Evangelische Religionslehre</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Fokus: Anthropologie & Schöpfungsethik.</strong> Unter der Leitung von <strong className="text-yellow-300">Prof. Samuel Berg</strong> erforschen Sie die Würde des Menschen als Geschöpf Gottes, Gewissen, Nächstenliebe und Grenzen des Transhumanismus.
          </p>
          <div className="text-[11px] font-mono text-yellow-400 pt-2 border-t border-slate-800">
            Leitfrage: Wo unterscheidet sich die Menschenwürde von maschineller Datenverarbeitung?
          </div>
        </div>

        {/* Sozialwissenschaften Card */}
        <div className="bg-slate-900/80 border border-red-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 flex items-center justify-center font-bold text-lg">
            🔴
          </div>
          <h3 className="text-xl font-bold text-white">Sozialwissenschaften</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Fokus: Politik, Recht & Medien.</strong> Unter der Leitung von <strong className="text-red-300">Dr. Malik Thorne</strong> durchleuchten Sie Algorithmic Bias, Filterblasen, Produkthaftung, Social Scoring und Wirtschaft 4.0.
          </p>
          <div className="text-[11px] font-mono text-red-400 pt-2 border-t border-slate-800">
            Leitfrage: Wie schützen wir freie Demokratien vor algorithmischer Polarisierung?
          </div>
        </div>

      </div>

    </div>
  );
};
