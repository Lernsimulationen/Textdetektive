import React from 'react';
import { useGame } from '../context/GameContext';
import { AVATARS } from '../config/avatarsConfig';
import { Shield, Download, Radio, Palette } from 'lucide-react';

interface Props {
  onOpenAvatarModal: () => void;
  onOpenDataModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenBuzzerModal: () => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenAvatarModal,
  onOpenDataModal,
  onOpenPrivacyModal,
  onOpenBuzzerModal
}) => {
  const { profile } = useGame();
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const currentLevelXp = profile.xp % 200;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / 200) * 100));

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-extrabold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/40">
            HQ
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">KI-ETHIK-KOMMISSION</div>
            <h1 className="text-base font-extrabold text-white leading-none">Mensch & Verantwortung</h1>
          </div>
        </div>

        {/* Gamification Level & Avatar Builder Widget */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenAvatarModal} 
            className="flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-1.5 pr-4 transition group"
            title="KI-Avatar Creator öffnen"
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-cyan-400/60 bg-slate-900 group-hover:scale-105 transition shadow-lg">
              <img src={currentAvatar.image} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                {profile.name}
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30">
                  Lvl {profile.level}
                </span>
              </div>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </button>

          {/* Offline Buzzer Button */}
          <button 
            onClick={onOpenBuzzerModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            title="Offline Buzzer Modul"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Buzzer</span>
          </button>

          {/* OneNote / Teams Data File Transfer */}
          <button 
            onClick={onOpenDataModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 text-xs font-bold transition"
            title="Projektdatei für OneNote/Teams sichern oder laden"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Projektdatei</span>
          </button>

          {/* DSGVO Privacy Status */}
          <button 
            onClick={onOpenPrivacyModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">100% Offline</span>
          </button>
        </div>

      </div>
    </header>
  );
};
