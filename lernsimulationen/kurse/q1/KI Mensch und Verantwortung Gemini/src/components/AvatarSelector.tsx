import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AVATARS } from '../config/avatarsConfig';
import { X, UserCheck, Edit3 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AvatarSelector: React.FC<Props> = ({ onClose }) => {
  const { profile, updateAvatar, updateProfileName } = useGame();
  const [nameInput, setNameInput] = useState(profile.name);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateProfileName(nameInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            <span>Agenten-Profil & Avatar</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Wähle deinen Dienst-Avatar in der KI-Ethik-Kommission.</p>
        </div>

        {/* Name Editing Form */}
        <form onSubmit={handleSaveName} className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Agenten-Name / Codename</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
            />
            <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-xs font-bold transition flex items-center gap-1">
              <Edit3 className="w-4 h-4" /> Speichern
            </button>
          </div>
        </form>

        {/* Avatars Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Verfügbare Avatare</label>
          <div className="grid grid-cols-2 gap-4">
            {AVATARS.map(avatar => {
              const isSelected = profile.avatarId === avatar.id;
              return (
                <button
                  key={avatar.id}
                  onClick={() => updateAvatar(avatar.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition ${
                    isSelected 
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg' 
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0">
                    <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{avatar.name}</div>
                    <div className="text-[11px] text-slate-400">{avatar.role}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-right">
          <button onClick={onClose} className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition">
            Fertigstellen
          </button>
        </div>
      </div>
    </div>
  );
};
