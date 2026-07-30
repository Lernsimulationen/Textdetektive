import React, { useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { X, Download, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const DataPortabilityModal: React.FC<Props> = ({ onClose }) => {
  const { exportProfileJSON, importProfileJSON, resetAllData, profile } = useGame();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importProfileJSON(content);
        if (success) {
          setImportStatus('✅ Projektdatei erfolgreich geladen!');
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus('❌ Fehler: Ungültige Projektdatei.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>Projektdatei (OneNote / Teams)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Sichere deinen Lernfortschritt als lokale JSON-Datei.</p>
        </div>

        {/* Info Box for OneNote/Teams */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 text-xs text-indigo-200 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-indigo-300">
            💡 So nutzt du die Datei mit Microsoft OneNote & Teams:
          </div>
          <p>
            Da keine Benutzerkonten existieren, speichert diese Datei deinen gesamten Fortschritt, deine Badges und deine Verhaltenskodex-Reflexionen.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>Klicke auf <strong>"Exportieren"</strong> und sichere die Datei in OneNote/Teams.</li>
            <li>In der nächsten Stunde lädst du die Datei einfach wieder hoch.</li>
          </ul>
        </div>

        {/* Export & Import Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={exportProfileJSON}
            className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex flex-col items-center justify-center gap-2 shadow-xl transition"
          >
            <Download className="w-6 h-6" />
            <span>Projektdatei exportieren</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-sm flex flex-col items-center justify-center gap-2 transition"
          >
            <Upload className="w-6 h-6" />
            <span>Projektdatei importieren</span>
          </button>

          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>

        {importStatus && (
          <div className="text-center font-bold text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white">
            {importStatus}
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
          <button onClick={resetAllData} className="text-rose-400 hover:underline">
            Fortschritt zurücksetzen
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
