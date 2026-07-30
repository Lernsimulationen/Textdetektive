import React from 'react';
import { VectorAvatarConfig } from '../types';

interface Props {
  config: VectorAvatarConfig;
  className?: string;
}

export const DEFAULT_VECTOR_AVATAR: VectorAvatarConfig = {
  skinTone: '#f5d0c5',
  hairStyle: 'undercut',
  hairColor: '#06b6d4',
  eyeType: 'cyber_cyan',
  cyberware: 'circuit_lines',
  expression: 'determined',
  outfitStyle: 'tactical_armor',
  outfitColor: '#4f46e5',
  accessory: 'sci_visor',
  bgGlow: '#06b6d4'
};

export const VectorAvatarSVG: React.FC<Props> = ({ config, className = "w-full h-full" }) => {
  const c = { ...DEFAULT_VECTOR_AVATAR, ...config };

  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background Radial Glow Gradient */}
        <radialGradient id="bgGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.bgGlow} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
        </radialGradient>

        {/* Visor Glass Gradient */}
        <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.bgGlow} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
        </linearGradient>

        {/* Armor Metallic Shimmer */}
        <linearGradient id="armorMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.outfitColor} />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
      </defs>

      {/* Layer 1: Background Aura & Tech Grid */}
      <rect width="200" height="200" rx="24" fill="url(#bgGlowGrad)" />
      <circle cx="100" cy="100" r="85" fill="none" stroke={c.bgGlow} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.2" />

      {/* Layer 2: Outfit / Shoulders */}
      {c.outfitStyle === 'tactical_armor' && (
        <g id="outfit-armor">
          <path d="M 30 190 Q 100 130 170 190 Z" fill="url(#armorMetal)" />
          <path d="M 60 155 L 100 175 L 140 155 L 100 195 Z" fill={c.outfitColor} opacity="0.8" />
          <circle cx="100" cy="165" r="5" fill={c.bgGlow} className="animate-pulse" />
        </g>
      )}

      {c.outfitStyle === 'trenchcoat' && (
        <g id="outfit-coat">
          <path d="M 25 190 Q 100 120 175 190 Z" fill="#1e293b" />
          <path d="M 50 160 L 85 195 L 100 170 L 115 195 L 150 160" fill="none" stroke={c.outfitColor} strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {c.outfitStyle === 'cyber_hoodie' && (
        <g id="outfit-hoodie">
          <path d="M 20 190 C 40 140 160 140 180 190 Z" fill={c.outfitColor} />
          <path d="M 65 150 Q 100 180 135 150" fill="none" stroke="#0f172a" strokeWidth="8" />
        </g>
      )}

      {c.outfitStyle === 'agent_suit' && (
        <g id="outfit-suit">
          <path d="M 35 190 Q 100 135 165 190 Z" fill="#0f172a" />
          <polygon points="100,145 85,190 115,190" fill="#f8fafc" />
          <polygon points="100,150 95,190 105,190" fill={c.outfitColor} />
        </g>
      )}

      {/* Layer 3: Neck & Face Base */}
      <rect x="88" y="115" width="24" height="30" rx="4" fill={c.skinTone} />
      {/* Neck Cyber Line */}
      <line x1="88" y1="130" x2="112" y2="130" stroke={c.bgGlow} strokeWidth="2" opacity="0.6" />

      {/* Head Shape */}
      <path d="M 60 85 C 60 45 140 45 140 85 C 140 125 60 125 60 85 Z" fill={c.skinTone} />

      {/* Layer 4: Expression (Mouth & Nose) */}
      {/* Nose */}
      <path d="M 97 92 L 100 97 L 95 97" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth */}
      {c.expression === 'determined' && (
        <line x1="90" y1="108" x2="110" y2="108" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {c.expression === 'smile' && (
        <path d="M 88 106 Q 100 115 112 106" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {c.expression === 'neutral' && (
        <line x1="92" y1="107" x2="108" y2="107" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      )}
      {c.expression === 'respirator' && (
        <g id="respirator-mask">
          <path d="M 72 98 Q 100 125 128 98 L 120 120 L 80 120 Z" fill="#1e293b" stroke={c.bgGlow} strokeWidth="1.5" />
          <circle cx="100" cy="112" r="4" fill={c.bgGlow} />
        </g>
      )}

      {/* Layer 5: Cyberware & Face Markings */}
      {c.cyberware === 'circuit_lines' && (
        <g id="cyber-circuit">
          <path d="M 65 75 L 78 75 L 85 85" fill="none" stroke={c.bgGlow} strokeWidth="1.5" />
          <circle cx="65" cy="75" r="2" fill={c.bgGlow} />
          <circle cx="85" cy="85" r="2" fill={c.bgGlow} />
        </g>
      )}
      {c.cyberware === 'temple_node' && (
        <g id="temple-node">
          <circle cx="132" cy="72" r="5" fill="#1e293b" stroke={c.bgGlow} strokeWidth="1.5" />
          <circle cx="132" cy="72" r="2" fill={c.bgGlow} />
        </g>
      )}
      {c.cyberware === 'face_paint' && (
        <g id="face-paint">
          <polygon points="68,80 75,70 78,85" fill="#f43f5e" opacity="0.7" />
          <polygon points="132,80 125,70 122,85" fill="#f43f5e" opacity="0.7" />
        </g>
      )}

      {/* Layer 6: Eyes & Iris */}
      <g id="eyes">
        {/* Left Eye */}
        <ellipse cx="80" cy="80" rx="8" ry="5" fill="#ffffff" />
        <circle cx="80" cy="80" r="4" fill={c.eyeType === 'cyber_cyan' ? '#06b6d4' : c.eyeType === 'cyber_ruby' ? '#f43f5e' : c.eyeType === 'gold' ? '#f59e0b' : '#3b82f6'} />
        <circle cx="80" cy="80" r="1.5" fill="#0f172a" />
        {/* Right Eye */}
        <ellipse cx="120" cy="80" rx="8" ry="5" fill="#ffffff" />
        <circle cx="120" cy="80" r={c.eyeType === 'cyber_cyan' ? '#06b6d4' : c.eyeType === 'cyber_ruby' ? '#f43f5e' : c.eyeType === 'gold' ? '#f59e0b' : '#3b82f6'} />
        <circle cx="120" cy="80" r="1.5" fill="#0f172a" />

        {/* Eyebrows */}
        <path d="M 72 71 Q 80 68 88 72" fill="none" stroke={c.hairColor} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 112 72 Q 120 68 128 71" fill="none" stroke={c.hairColor} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Layer 7: Hair & Headgear */}
      {c.hairStyle === 'undercut' && (
        <g id="hair-undercut">
          <path d="M 58 80 C 55 40 145 40 142 80 C 135 48 65 48 58 80 Z" fill={c.hairColor} />
          <path d="M 60 55 C 80 30 120 30 145 60 C 120 40 80 40 60 55 Z" fill={c.hairColor} />
        </g>
      )}

      {c.hairStyle === 'spikes' && (
        <g id="hair-spikes">
          <polygon points="65,55 75,25 85,50 95,20 105,50 115,22 125,52 135,30 140,65" fill={c.hairColor} />
        </g>
      )}

      {c.hairStyle === 'bob' && (
        <g id="hair-bob">
          <path d="M 55 95 C 50 35 150 35 145 95 L 135 60 C 120 40 80 40 65 60 Z" fill={c.hairColor} />
        </g>
      )}

      {c.hairStyle === 'dreads' && (
        <g id="hair-dreads">
          <rect x="62" y="35" width="6" height="50" rx="3" fill={c.hairColor} />
          <rect x="74" y="25" width="7" height="60" rx="3.5" fill={c.hairColor} />
          <rect x="86" y="20" width="7" height="65" rx="3.5" fill={c.hairColor} />
          <rect x="100" y="20" width="7" height="65" rx="3.5" fill={c.hairColor} />
          <rect x="114" y="25" width="7" height="60" rx="3.5" fill={c.hairColor} />
          <rect x="126" y="35" width="6" height="50" rx="3" fill={c.hairColor} />
        </g>
      )}

      {c.hairStyle === 'hood' && (
        <g id="hair-hood">
          <path d="M 45 100 C 45 25 155 25 155 100 L 140 100 C 140 40 60 40 60 100 Z" fill="#1e293b" />
        </g>
      )}

      {/* Layer 8: Visor / Accessories Overlay */}
      {c.accessory === 'sci_visor' && (
        <g id="accessory-visor">
          <path d="M 64 70 L 136 70 L 130 90 L 70 90 Z" fill="url(#visorGrad)" stroke={c.bgGlow} strokeWidth="1.5" />
          <line x1="68" y1="80" x2="132" y2="80" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        </g>
      )}

      {c.accessory === 'ar_glasses' && (
        <g id="accessory-glasses">
          <rect x="68" y="72" width="26" height="16" rx="4" fill="none" stroke={c.bgGlow} strokeWidth="2.5" />
          <rect x="106" y="72" width="26" height="16" rx="4" fill="none" stroke={c.bgGlow} strokeWidth="2.5" />
          <line x1="94" y1="78" x2="106" y2="78" stroke={c.bgGlow} strokeWidth="2" />
        </g>
      )}

      {c.accessory === 'headset' && (
        <g id="accessory-headset">
          <circle cx="58" cy="82" r="8" fill="#1e293b" stroke={c.bgGlow} strokeWidth="2" />
          <path d="M 58 82 Q 75 102 92 102" fill="none" stroke={c.bgGlow} strokeWidth="2" />
          <circle cx="92" cy="102" r="3" fill="#f43f5e" />
        </g>
      )}
    </svg>
  );
};
