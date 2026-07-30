import React, { useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  onImportSuccess?: () => void;
}

export const QuickImportZone: React.FC<Props> = ({ onImportSuccess }) => {
  const { importProfileJSON } = useGame();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importProfileJSON(content);
        if (success) {
          setStatusMsg('✅ Projektdatei erfolgreich geladen! Willkommen zurück.');
          if (onImportSuccess) {
            setTimeout(onImportSuccess, 1200);
          }
        } else {
          setStatusMsg('❌ Fehler: Ungültige Projektdatei.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-900/90 border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 rounded-3xl p-6 transition group">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <Upload className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Fortschritt aus OneNote / Teams fortsetzen?</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Lade deine gespeicherte <code className="text-indigo-300 font-mono">ethik_kommission_...json</code> Datei hier hoch.
            </p>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl transition flex-shrink-0"
        >
          <Upload className="w-4 h-4" /> Projektdatei laden
        </button>

        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
      </div>

      {statusMsg && (
        <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs font-bold text-center text-cyan-300 animate-fadeIn">
          {statusMsg}
        </div>
      )}
    </div>
  );
};
