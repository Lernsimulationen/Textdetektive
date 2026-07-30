import React, { useState, useEffect } from 'react';
import { FastForward, Play, Volume2 } from 'lucide-react';

interface Props {
  lines: string[];
  onComplete?: () => void;
}

export const TypewriterText: React.FC<Props> = ({ lines, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedCharCount, setDisplayedCharCount] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const currentLine = lines[currentLineIndex] || '';

  useEffect(() => {
    if (isFinished) return;

    if (displayedCharCount < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedCharCount(prev => prev + 1);
      }, 30 / speedMultiplier);
      return () => clearTimeout(timeout);
    } else {
      if (currentLineIndex < lines.length - 1) {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setDisplayedCharCount(0);
        }, 550 / speedMultiplier);
        return () => clearTimeout(timeout);
      } else {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    }
  }, [displayedCharCount, currentLineIndex, currentLine, lines, speedMultiplier, isFinished, onComplete]);

  const handleSkipAll = () => {
    setCurrentLineIndex(lines.length - 1);
    setDisplayedCharCount(lines[lines.length - 1].length);
    setIsFinished(true);
    if (onComplete) onComplete();
  };

  const toggleSpeed = () => {
    setSpeedMultiplier(prev => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
  };

  // Helper to style speaker names like [Dr. Elena Vance]
  const renderFormattedLine = (text: string) => {
    const speakerMatch = text.match(/^(\[[^\]]+\])(.*)/);
    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const message = speakerMatch[2];

      let badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      if (speaker.includes('Prof. Samuel Berg') || speaker.includes('REL')) {
        badgeColor = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      } else if (speaker.includes('Dr. Malik Thorne') || speaker.includes('SOWI')) {
        badgeColor = 'bg-red-500/20 text-red-300 border-red-500/40';
      } else if (speaker.includes('K.I.R.A.') || speaker.includes('SYSTEM')) {
        badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      } else if (speaker.includes('Elena Vance')) {
        badgeColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      }

      return (
        <span>
          <span className={`inline-block px-2.5 py-0.5 mr-2 rounded-md border text-xs font-mono font-bold ${badgeColor}`}>
            {speaker.replace('[', '').replace(']', '')}
          </span>
          <span>{message}</span>
        </span>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative backdrop-blur-md">
      <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-800 text-xs font-mono text-indigo-400">
        <span className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>KOMMISSIONS-AUDIO-BRIEFING</span>
        </span>
        <div className="flex gap-2">
          <button 
            onClick={toggleSpeed}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition border border-slate-700"
            title="Geschwindigkeit anpassen"
          >
            <Play className="w-3 h-3" /> {speedMultiplier}x Tempo
          </button>
          <button 
            onClick={handleSkipAll}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-mono transition"
          >
            <FastForward className="w-3 h-3" /> Überspringen
          </button>
        </div>
      </div>

      <div className="space-y-4 min-h-[110px] font-sans text-base leading-relaxed">
        {lines.slice(0, currentLineIndex).map((line, idx) => (
          <div key={idx} className="text-slate-400 opacity-75">
            {renderFormattedLine(line)}
          </div>
        ))}
        <div className="text-slate-100 font-medium">
          {renderFormattedLine(currentLine.substring(0, displayedCharCount))}
          {!isFinished && <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse"></span>}
        </div>
      </div>
    </div>
  );
};
