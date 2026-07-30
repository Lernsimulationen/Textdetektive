import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { VectorAvatarConfig } from '../types';
import { VectorAvatarSVG, DEFAULT_VECTOR_AVATAR } from './VectorAvatarSVG';
import { X, Sparkles, UserCheck, Palette, Shield, Eye, Check, RefreshCw, Sliders, Layers } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AvatarBuilder: React.FC<Props> = ({ onClose }) => {
  const { profile, updateAvatar, updateProfileName } = useGame();

  const [agentName, setAgentName] = useState(profile.name);
  const [activeCategory, setActiveCategory] = useState<'head' | 'hair' | 'eyes' | 'outfit' | 'gear'>('head');

  const [config, setConfig] = useState<VectorAvatarConfig>(() => {
    return profile.vectorAvatar || DEFAULT_VECTOR_AVATAR;
  });

  const skinTones = [
    { name: 'Cyber Light', hex: '#f5d0c5' },
    { name: 'Warm Tan', hex: '#e0ac69' },
    { name: 'Deep Bronze', hex: '#c68642' },
    { name: 'Dark Mocha', hex: '#4a2e1b' },
    { name: 'Android Synthetic', hex: '#cbd5e1' },
    { name: 'Cyber Blue', hex: '#0284c7' }
  ];

  const hairColors = [
    { name: 'Cyber Cyan', hex: '#06b6d4' },
    { name: 'Electric Violet', hex: '#8b5cf6' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Flame Red', hex: '#ef4444' },
    { name: 'Platinum', hex: '#f8fafc' },
    { name: 'Jet Black', hex: '#1e293b' },
    { name: 'Gold', hex: '#eab308' }
  ];

  const outfitColors = [
    { name: 'Commission Indigo', hex: '#4f46e5' },
    { name: 'Cyber Cyan', hex: '#0891b2' },
    { name: 'Emerald Guardian', hex: '#059669' },
    { name: 'Sowi Red', hex: '#dc2626' },
    { name: 'Rel Yellow', hex: '#d97706' },
    { name: 'Midnight Dark', hex: '#1e293b' }
  ];

  const glowColors = [
    { name: 'Cyan Glow', hex: '#06b6d4' },
    { name: 'Indigo Glow', hex: '#6366f1' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Gold Glow', hex: '#f59e0b' },
    { name: 'Rose Glow', hex: '#f43f5e' }
  ];

  const handleSave = () => {
    if (agentName.trim()) {
      updateProfileName(agentName.trim());
    }
    // Update vector avatar configuration in profile
    const context = (window as any).__gameContext;
    if (profile) {
      profile.vectorAvatar = config;
    }
    updateAvatar(profile.avatarId || 'agent_alpha');
    onClose();
  };

  const handleRandomize = () => {
    setConfig({
      skinTone: skinTones[Math.floor(Math.random() * skinTones.length)].hex,
      hairStyle: ['undercut', 'spikes', 'bob', 'dreads', 'hood'][Math.floor(Math.random() * 5)],
      hairColor: hairColors[Math.floor(Math.random() * hairColors.length)].hex,
      eyeType: ['cyber_cyan', 'cyber_ruby', 'gold', 'emerald'][Math.floor(Math.random() * 4)],
      cyberware: ['none', 'circuit_lines', 'temple_node', 'face_paint'][Math.floor(Math.random() * 4)],
      expression: ['determined', 'smile', 'neutral', 'respirator'][Math.floor(Math.random() * 4)],
      outfitStyle: ['tactical_armor', 'trenchcoat', 'cyber_hoodie', 'agent_suit'][Math.floor(Math.random() * 4)],
      outfitColor: outfitColors[Math.floor(Math.random() * outfitColors.length)].hex,
      accessory: ['sci_visor', 'ar_glasses', 'headset', 'none'][Math.floor(Math.random() * 4)],
      bgGlow: glowColors[Math.floor(Math.random() * glowColors.length)].hex
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> INTERAKTIVER AVATAR BUILDER
            </div>
            <h3 className="text-2xl font-black text-white">Vektor-Agenten-Generator</h3>
            <p className="text-xs text-slate-400">Generiere deinen individuellen Vektor-Avatar in Echtzeit.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRandomize}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 transition"
              title="Zufälligen Avatar generieren"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Zufall
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Grid: Live Rendered Vector Avatar + Tabbed Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LIVE VECTOR AVATAR RENDERER CARD */}
          <div className="lg:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-slate-900">
              <VectorAvatarSVG config={config} />
            </div>

            <div>
              <div className="text-lg font-black text-white">{agentName || 'Agent'}</div>
              <div className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                {profile.rank}
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-[11px] font-mono text-slate-400 space-y-1">
              <div>Typ: <span className="text-indigo-300 font-bold">{config.outfitStyle}</span></div>
              <div>Visier: <span className="text-cyan-300 font-bold">{config.accessory}</span></div>
            </div>
          </div>

          {/* TABBED CONTROLS */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Agent Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Codename / Agenten-Name</label>
              <input 
                type="text" 
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                placeholder="Codename eingeben..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            {/* Category Navigation Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 text-xs font-bold">
              {[
                { id: 'head', label: '👤 Kopf & Haut' },
                { id: 'hair', label: '✂️ Haare & Farbe' },
                { id: 'eyes', label: '👁️ Augen & Cyber' },
                { id: 'outfit', label: '🛡️ Outfit' },
                { id: 'gear', label: '🥽 Visiere & Aura' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-2 rounded-xl transition flex-shrink-0 ${
                    activeCategory === cat.id 
                      ? 'bg-indigo-600 text-white font-bold shadow-md' 
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Category 1: Kopf & Haut */}
            {activeCategory === 'head' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Hautton & Teint</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {skinTones.map(st => (
                      <button
                        key={st.hex}
                        onClick={() => setConfig(prev => ({ ...prev, skinTone: st.hex }))}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                          config.skinTone === st.hex ? 'bg-indigo-950 border-indigo-400 shadow-md' : 'bg-slate-950 border-slate-850'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full border border-slate-700" style={{ backgroundColor: st.hex }}></span>
                        <span className="text-[10px] text-slate-300 font-mono truncate w-full">{st.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Mimik / Gesichtsausdruck</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'determined', label: 'Entschlossen' },
                      { id: 'smile', label: 'Zuversichtlich' },
                      { id: 'neutral', label: 'Analytisch' },
                      { id: 'respirator', label: 'Cyber-Maske' }
                    ].map(exp => (
                      <button
                        key={exp.id}
                        onClick={() => setConfig(prev => ({ ...prev, expression: exp.id }))}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          config.expression === exp.id ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category 2: Haare & Farbe */}
            {activeCategory === 'hair' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Frisur & Kopfbedeckung</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'undercut', label: 'Cyber Undercut' },
                      { id: 'spikes', label: 'Neon Spikes' },
                      { id: 'bob', label: 'Sleek Bob' },
                      { id: 'dreads', label: 'Tech Dreads' },
                      { id: 'hood', label: 'Combat Hood' }
                    ].map(hs => (
                      <button
                        key={hs.id}
                        onClick={() => setConfig(prev => ({ ...prev, hairStyle: hs.id }))}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          config.hairStyle === hs.id ? 'bg-indigo-950 border-indigo-400 text-indigo-300' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {hs.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Haarfarbe</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {hairColors.map(hc => (
                      <button
                        key={hc.hex}
                        onClick={() => setConfig(prev => ({ ...prev, hairColor: hc.hex }))}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                          config.hairColor === hc.hex ? 'bg-indigo-950 border-indigo-400 shadow-md' : 'bg-slate-950 border-slate-850'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700" style={{ backgroundColor: hc.hex }}></span>
                        <span className="text-[9px] text-slate-300 font-mono truncate w-full">{hc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category 3: Augen & Cyberware */}
            {activeCategory === 'eyes' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Augen & Cyber-Iris</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'cyber_cyan', label: 'Cyan Optik' },
                      { id: 'cyber_ruby', label: 'Ruby Scanner' },
                      { id: 'gold', label: 'Gold Iris' },
                      { id: 'emerald', label: 'Emerald Bio' }
                    ].map(eye => (
                      <button
                        key={eye.id}
                        onClick={() => setConfig(prev => ({ ...prev, eyeType: eye.id }))}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          config.eyeType === eye.id ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {eye.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Cyberware & Implantate</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'circuit_lines', label: 'Circuit Lines' },
                      { id: 'temple_node', label: 'Schläfen-Node' },
                      { id: 'face_paint', label: 'Taktische Farbe' },
                      { id: 'none', label: 'Keine Implantate' }
                    ].map(cw => (
                      <button
                        key={cw.id}
                        onClick={() => setConfig(prev => ({ ...prev, cyberware: cw.id }))}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          config.cyberware === cw.id ? 'bg-indigo-950 border-indigo-400 text-indigo-300' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {cw.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category 4: Outfit & Rüstung */}
            {activeCategory === 'outfit' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Dienst-Kleidung / Rüstung</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'tactical_armor', label: '🛡️ Taktische Kommissions-Rüstung' },
                      { id: 'trenchcoat', label: '🧥 Ethik-Trenchcoat' },
                      { id: 'cyber_hoodie', label: '🥷 Cyberpunk Hoodie' },
                      { id: 'agent_suit', label: '👔 Diplomatische Dienst-Rüstung' }
                    ].map(of => (
                      <button
                        key={of.id}
                        onClick={() => setConfig(prev => ({ ...prev, outfitStyle: of.id }))}
                        className={`p-3 rounded-xl border text-left font-semibold transition ${
                          config.outfitStyle === of.id ? 'bg-indigo-950 border-indigo-400 text-white' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {of.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Outfit-Farbe</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {outfitColors.map(oc => (
                      <button
                        key={oc.hex}
                        onClick={() => setConfig(prev => ({ ...prev, outfitColor: oc.hex }))}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                          config.outfitColor === oc.hex ? 'bg-indigo-950 border-indigo-400 shadow-md' : 'bg-slate-950 border-slate-850'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full stroke-white border border-slate-700" style={{ backgroundColor: oc.hex }}></span>
                        <span className="text-[9px] text-slate-300 font-mono truncate w-full">{oc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category 5: Visiere & Aura */}
            {activeCategory === 'gear' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Visier & Equipment Overlay</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'sci_visor', label: '🥽 Sci-Fi Visier' },
                      { id: 'ar_glasses', label: '👓 AR-Data-Brille' },
                      { id: 'headset', label: '🎧 Funk-Headset' },
                      { id: 'none', label: 'Ohne Visier' }
                    ].map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => setConfig(prev => ({ ...prev, accessory: acc.id }))}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          config.accessory === acc.id ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-850 text-slate-400'
                        }`}
                      >
                        {acc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Hologramm-Aura / Hintergrund-Leuchten</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {glowColors.map(gc => (
                      <button
                        key={gc.hex}
                        onClick={() => setConfig(prev => ({ ...prev, bgGlow: gc.hex }))}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                          config.bgGlow === gc.hex ? 'bg-indigo-950 border-indigo-400 shadow-md' : 'bg-slate-950 border-slate-850'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: gc.hex, color: gc.hex }}></span>
                        <span className="text-[9px] text-slate-300 font-mono truncate w-full">{gc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
            <UserCheck className="w-4 h-4" /> Vektor-Avatar speichern & übernehmen
          </button>
        </div>
      </div>
    </div>
  );
};
