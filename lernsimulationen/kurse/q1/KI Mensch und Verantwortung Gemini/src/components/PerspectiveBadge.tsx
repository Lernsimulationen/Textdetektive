import React from 'react';
import { SubjectPerspective } from '../types';

interface Props {
  perspective: SubjectPerspective;
}

export const PerspectiveBadge: React.FC<Props> = ({ perspective }) => {
  if (perspective === 'REL') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.2)]">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
        🟡 Evangelische Religionslehre
      </span>
    );
  }

  if (perspective === 'SOWI') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 border border-red-500/40 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
        🔴 Sozialwissenschaften
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
      🌐 Interdisziplinär / Neutral
    </span>
  );
};
