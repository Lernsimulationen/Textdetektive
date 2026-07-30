import React, { useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { X, Download, Upload, Trash2, CheckCircle2, ShieldCheck, FileText, Clock, Code, Award } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const DataPortabilityModal: React.FC<Props> = ({ onClose }) => {
  const { profile, exportProfileJSON, importProfileJSON, resetAllData } = useGame();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importProfileJSON(content);
        if (success) {
          setImportStatus('✅ Projektdatei mit allen Eingaben & Zeitstempeln erfolgreich importiert!');
        } else {
          setImportStatus('❌ Fehler: Ungültiges Dateiformat.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 mb-2">
            <ShieldCheck className="w-4 h-4" /> ONENOTE & TEAMS INTEGRATION
          </div>
          <h3 className="text-2xl font-extrabold text-white">Projektdatei-Verwaltung</h3>
          <p className="text-xs text-slate-400 mt-1">
            Alle deine Eingaben, Reflexionen, HTML-Codes und genauen Zeitstempel werden in einer transparenten Datei gesichert.
          </p>
        </div>

        {/* Audit Content Summary */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2 text-xs text-slate-300">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> In der Export-Datei enthalten:
          </div>
          <ul className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
            <li className="flex items-center gap-1.5 text-slate-200">✅ Agenten-Bio & Profil</li>
            <li className="flex items-center gap-1.5 text-slate-200">✅ Absolvierte Kapitel (ISO-Zeit)</li>
            <li className="flex items-center gap-1.5 text-slate-200">✅ Alle HTML-Codes (Zeitstempel)</li>
            <li className="flex items-center gap-1.5 text-slate-200">✅ Alle Reflexionstexte (Zeitstempel)</li>
            <li className="flex items-center gap-1.5 text-slate-200">✅ Dilemma-Entscheidungen</li>
            <li className="flex items-center gap-1.5 text-slate-200">✅ Ränge & Belohnungs-Relikte</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Download JSON */}
          <button
            onClick={exportProfileJSON}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm transition shadow-xl group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition" />
              <div className="text-left">
                <div>Projektdatei herunterladen (.json)</div>
                <div className="text-[11px] font-normal opacity-80">Perfekt zum Speichern in OneNote oder Abgeben auf MS Teams</div>
              </div>
            </div>
            <span className="text-xs font-mono bg-white/20 px-2 py-1 rounded">V2.0</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 font-extrabold text-sm transition"
          >
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <div>Vorhandene Projektdatei hochladen</div>
                <div className="text-[11px] font-normal text-slate-400">Fortschritt & Notizen aus einer früheren Stunde laden</div>
              </div>
            </div>
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
          />

          {importStatus && (
            <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-bold text-cyan-300 text-center animate-fadeIn">
              {importStatus}
            </div>
          )}
        </div>

        {/* Reset Confirmation */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
          {!showConfirmReset ? (
            <button 
              onClick={() => setShowConfirmReset(true)} 
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Spielstand zurücksetzen
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">Wirklich löschen?</span>
              <button 
                onClick={() => { resetAllData(); setShowConfirmReset(false); onClose(); }} 
                className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                Ja, Löschen
              </button>
              <button 
                onClick={() => setShowConfirmReset(false)} 
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold"
              >
                Nein
              </button>
            </div>
          )}

          <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
