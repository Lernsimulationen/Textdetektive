import React, { useState } from 'react';
import { X, Radio, Zap, Volume2, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Props {
  onClose: () => void;
}

export const OfflineBuzzer: React.FC<Props> = ({ onClose }) => {
  const { profile } = useGame();
  const [buzzedTime, setBuzzedTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState('Drücke "Buzzer Testen" um den Timer zu starten.');

  const handleStartTest = () => {
    setIsReady(false);
    setBuzzedTime(null);
    setReactionTime(null);
    setStatusMsg('Achtung... Warten auf das Signal (Grün)...');

    const randomDelay = 1500 + Math.random() * 2500;
    setTimeout(() => {
      setIsReady(true);
      setStartTime(Date.now());
      setStatusMsg('JETZT DRÜCKEN! 🚨');
    }, randomDelay);
  };

  const handleBuzzerClick = () => {
    if (!isReady || !startTime) {
      setStatusMsg('⚠️ Zu früh gedrückt! Fehlstart.');
      setIsReady(false);
      return;
    }

    const elapsed = Date.now() - startTime;
    setReactionTime(elapsed);
    setBuzzedTime(Date.now());
    setIsReady(false);
    setStatusMsg(`🎉 GEBUZZERT! Reaktionszeit: ${elapsed} ms`);

    // Simulated Supabase Hook Call (Prepared for optional cloud live voting)
    console.log('[Supabase Event Hook Prepared]:', {
      event: 'offline_buzzer_press',
      agent: profile.name,
      reactionMs: elapsed,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> OFFLINE BUZZER MODUL
          </div>
          <h3 className="text-2xl font-extrabold text-white">Live-Buzzer & Simulation</h3>
          <p className="text-xs text-slate-400 mt-1">Vorbereitet für Unterrichts-Abstimmungen & Gruppen-Einsätze.</p>
        </div>

        {/* Big Interactive Red/Green Buzzer */}
        <div className="text-center space-y-6">
          <div className="text-sm font-mono text-cyan-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            {statusMsg}
          </div>

          <div className="flex justify-center my-4">
            <button
              onClick={handleBuzzerClick}
              className={`w-44 h-44 rounded-full font-black text-2xl uppercase tracking-wider text-white shadow-2xl transition-all transform active:scale-95 flex items-center justify-center border-4 ${
                isReady
                  ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 border-emerald-300 shadow-[0_0_50px_rgba(16,185,129,0.6)] animate-pulse'
                  : 'bg-gradient-to-b from-rose-600 to-rose-800 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.4)]'
              }`}
            >
              {isReady ? 'BUZZER!' : 'BEREIT'}
            </button>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-sm rounded-xl border border-slate-700 transition"
          >
            ⚡ Buzzer-Reaktionstest starten
          </button>
        </div>

        {/* Supabase Ready Indicator */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Supabase Live-Schnittstelle:</span>
          <span className="text-emerald-400 font-bold">● VORBEREITET (OFFLINE REGIMEN)</span>
        </div>
      </div>
    </div>
  );
};
