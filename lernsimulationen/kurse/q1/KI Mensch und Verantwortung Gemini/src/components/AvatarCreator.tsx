import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AVATARS } from '../config/avatarsConfig';
import { X, Sparkles, UserCheck, Shield, Camera, FileText, Sliders, Check, Award } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AvatarCreator: React.FC<Props> = ({ onClose }) => {
  const { profile, updateAvatar, updateProfileName, updateProfileBio, updateSpecialization, updateFilterStyle } = useGame();

  const [agentName, setAgentName] = useState(profile.name);
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId || 'agent_female_cyber');
  const [agentBio, setAgentBio] = useState(profile.bio || 'Ich engagiere mich in der KI-Ethik-Kommission, um Menschenwürde und Transparenz im digitalen Zeitalter zu verteidigen.');
  const [specialization, setSpecialization] = useState<'REL' | 'SOWI' | 'NEUTRAL'>(profile.specialization || 'NEUTRAL');
  const [filterStyle, setFilterStyle] = useState<'cyber' | 'matrix' | 'gold' | 'monochrome' | 'tactical'>(profile.filterStyle || 'cyber');

  const selectedAvatar = AVATARS.find(a => a.id === selectedAvatarId) || AVATARS[0];

  const filterClasses: Record<string, { img: string; border: string; badge: string; shadow: string }> = {
    cyber: {
      img: 'hue-rotate-0 brightness-105 contrast-110',
      border: 'border-cyan-400',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      shadow: 'shadow-[0_0_35px_rgba(6,182,212,0.45)]'
    },
    matrix: {
      img: 'hue-rotate-90 saturate-150 contrast-125',
      border: 'border-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      shadow: 'shadow-[0_0_35px_rgba(16,185,129,0.45)]'
    },
    gold: {
      img: 'sepia contrast-115 brightness-110',
      border: 'border-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      shadow: 'shadow-[0_0_35px_rgba(245,158,11,0.45)]'
    },
    monochrome: {
      img: 'grayscale contrast-130 brightness-95',
      border: 'border-slate-300',
      badge: 'bg-slate-700/40 text-slate-200 border-slate-500/40',
      shadow: 'shadow-[0_0_35px_rgba(203,213,225,0.35)]'
    },
    tactical: {
      img: 'hue-rotate-[140deg] saturate-150 contrast-120',
      border: 'border-rose-500',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      shadow: 'shadow-[0_0_35px_rgba(244,63,94,0.45)]'
    }
  };

  const activeFilter = filterClasses[filterStyle] || filterClasses.cyber;

  const handleSave = () => {
    if (agentName.trim()) updateProfileName(agentName.trim());
    if (agentBio.trim()) updateProfileBio(agentBio.trim());
    updateSpecialization(specialization);
    updateFilterStyle(filterStyle);
    updateAvatar(selectedAvatarId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> KI-BILD AVATAR & AGENTEN-BIO STUDIO
            </div>
            <h3 className="text-2xl font-black text-white">Dein offizieller Dienst-Ausweis</h3>
            <p className="text-xs text-slate-400">Wähle dein KI-Portrait, erstelle deine persönliche Ethik-Bio & wähle deine Spezialisierung.</p>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Layout: Live Rendered Agent ID Card + Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LIVE AGENT ID CARD PREVIEW */}
          <div className="lg:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl relative overflow-hidden text-center">
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-3 text-[10px] font-mono">
              <span className="text-slate-400">DIENST-ID:</span>
              <span className="text-cyan-400 font-bold">{profile.badgeCode || 'KOM-2026-ETHIK'}</span>
            </div>

            {/* AI Image Photo */}
            <div className={`w-44 h-44 mx-auto rounded-3xl overflow-hidden border-2 ${activeFilter.border} ${activeFilter.shadow} relative bg-slate-900 transition-all duration-300`}>
              <img 
                src={selectedAvatar.image} 
                alt={selectedAvatar.name} 
                className={`w-full h-full object-cover transition-all duration-500 ${activeFilter.img}`}
              />
            </div>

            <div>
              <div className="text-lg font-black text-white">{agentName || 'Agent/in'}</div>
              <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">
                {selectedAvatar.role}
              </div>
            </div>

            {/* Specialization Tag */}
            <div className="flex justify-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                specialization === 'REL'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  : specialization === 'SOWI'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}>
                {specialization === 'REL' ? '🟡 Evangelische Religionslehre' : specialization === 'SOWI' ? '🔴 Sozialwissenschaften' : '🔵 Interdisziplinäre Ethik'}
              </span>
            </div>

            {/* Student Personal Bio Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-850 text-xs text-slate-300 text-left space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                <FileText className="w-3 h-3 text-cyan-400" /> Ethik-Statement / Bio:
              </div>
              <p className="italic text-slate-200 text-[11px] leading-relaxed line-clamp-3">
                "{agentBio || 'Noch kein Statement hinterlegt.'}"
              </p>
            </div>

          </div>

          {/* EDITOR CONTROLS */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* 1. Agent Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">1. Agenten-Name / Codename</label>
              <input 
                type="text" 
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                placeholder="Deinen Codenamen eingeben..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            {/* 2. Personal Student Agent Bio / Mission Statement */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>2. Meine persönliche Bio & Ethik-Statement</span>
                <span className="text-[10px] text-indigo-400 font-mono">Freie Eingabe</span>
              </label>
              <textarea 
                value={agentBio}
                onChange={e => setAgentBio(e.target.value)}
                placeholder="Schreibe hier, warum du der Kommission beitrittst und was deine ethischen Werte bei Künstlicher Intelligenz sind..."
                className="w-full h-24 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
              />
            </div>

            {/* 3. Specialization Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">3. Meine Fach-Spezialisierung im Projektkurs</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  onClick={() => setSpecialization('REL')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    specialization === 'REL' ? 'bg-yellow-950/70 border-yellow-500 text-yellow-300 font-bold shadow-lg' : 'bg-slate-950 border-slate-850 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">🟡 Religionslehre</div>
                  <div className="text-[10px] text-slate-400">Anthropologie & Menschenwürde</div>
                </button>

                <button
                  onClick={() => setSpecialization('SOWI')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    specialization === 'SOWI' ? 'bg-red-950/70 border-red-500 text-red-300 font-bold shadow-lg' : 'bg-slate-950 border-slate-850 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">🔴 Sozialwissenschaften</div>
                  <div className="text-[10px] text-slate-400">Politik, Recht & Bias-Analysen</div>
                </button>

                <button
                  onClick={() => setSpecialization('NEUTRAL')}
                  className={`p-3 rounded-2xl border text-left transition ${
                    specialization === 'NEUTRAL' ? 'bg-indigo-950/70 border-indigo-500 text-indigo-300 font-bold shadow-lg' : 'bg-slate-950 border-slate-850 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">🔵 Interdisziplinär</div>
                  <div className="text-[10px] text-slate-400">Ganzheitliche Ethik-Synthese</div>
                </button>
              </div>
            </div>

            {/* 4. KI-Portrait Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">4. KI-Generiertes Portrait-Bild wählen</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {AVATARS.map(avatar => {
                  const isSelected = selectedAvatarId === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatarId(avatar.id)}
                      className={`p-1.5 rounded-2xl border text-center transition ${
                        isSelected ? 'bg-indigo-950 border-cyan-400 scale-105 shadow-xl' : 'bg-slate-950 border-slate-850 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-16 rounded-xl overflow-hidden bg-slate-900 mb-1">
                        <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] font-bold text-white truncate">{avatar.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Stimmungs-Filter & Kamera-Effekte */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">5. Hologramm-Filter & Foto-Stimmung</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'cyber', label: '🩵 Cyber Cyan' },
                  { id: 'matrix', label: '💚 Neon Matrix' },
                  { id: 'gold', label: '💛 Ethik Gold' },
                  { id: 'monochrome', label: '🩶 Forensik Schwarz/Weiß' },
                  { id: 'tactical', label: '🩷 Taktisches Rot' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilterStyle(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl border font-bold transition ${
                      filterStyle === f.id ? 'bg-slate-800 border-white text-white shadow-lg' : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold">
            Abbrechen
          </button>

          <button 
            onClick={handleSave} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 hover:from-indigo-400 hover:to-emerald-300 text-white rounded-xl text-xs font-black shadow-xl transition hover:scale-[1.02]"
          >
            <UserCheck className="w-4 h-4" /> Dienst-Ausweis & Bio speichern
          </button>
        </div>
      </div>
    </div>
  );
};
