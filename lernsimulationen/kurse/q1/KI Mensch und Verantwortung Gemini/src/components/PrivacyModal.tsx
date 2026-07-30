import React from 'react';
import { X, ShieldCheck, Lock, WifiOff, EyeOff } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const PrivacyModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> DSGVO & OFFLINE-GARANTIE
          </div>
          <h3 className="text-2xl font-extrabold text-white">Datenschutz & Privacy by Design</h3>
          <p className="text-xs text-slate-400 mt-1">Strikter Schutz der Schülersphäre ohne Tracking.</p>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-850">
            <WifiOff className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">100% Offline-First & PWA</strong>
              Diese Anwendung benötigt nach dem Laden keinerlei Internetverbindung. Sämtliche Skripte und Icons sind lokal gebündelt.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-850">
            <EyeOff className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">Keine Konten & Keine Tracker</strong>
              Es gibt keine Registrierung, keine Benutzerkonten, keine Werbe-Cookies und keine Analyse-Dienste (wie Google Analytics).
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-850">
            <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">Volle Datenhoheit bei Schülern</strong>
              Fortschritte und Notizen verbleiben auf dem iPad/Gerät und können als verschlüsselte Projektdatei lokal exportiert werden.
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-right">
          <button onClick={onClose} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition">
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
