import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlayerProfile, Chapter, Badge, ExportProjectFile } from '../types';
import { INITIAL_CHAPTERS } from '../config/courseConfig';
import { BADGES } from '../config/badgesConfig';
import { RANKS_AND_REWARDS } from '../config/ranksConfig';

interface GameContextType {
  profile: PlayerProfile;
  chapters: Chapter[];
  badges: Badge[];
  activeChapterId: number;
  setActiveChapterId: (id: number) => void;
  updateAvatar: (avatarId: string) => void;
  updateProfileName: (name: string) => void;
  updateProfileBio: (bio: string) => void;
  updateSpecialization: (spec: 'REL' | 'SOWI' | 'NEUTRAL') => void;
  updateFilterStyle: (filter: 'cyber' | 'matrix' | 'gold' | 'monochrome' | 'tactical') => void;
  completeChapter: (chapterId: number, xp: number) => void;
  recordDilemmaDecision: (chapterId: number, optionIndex: number, xpBonus: number) => void;
  saveNote: (chapterId: number, note: string) => void;
  saveReflection: (chapterId: number, reflection: string) => void;
  exportProfileJSON: () => void;
  importProfileJSON: (jsonString: string) => boolean;
  resetAllData: () => void;
}

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Ethik-Rekrut',
  avatarId: 'agent_female_cyber',
  bio: 'Ich engagiere mich in der KI-Ethik-Kommission, um Menschenwürde und Transparenz im digitalen Zeitalter zu verteidigen.',
  specialization: 'NEUTRAL',
  badgeCode: 'KOM-2026-ETHIK-89',
  filterStyle: 'cyber',
  level: 1,
  xp: 0,
  rank: 'Junior Rekrut/in',
  completedChapterIds: [],
  unlockedBadgeIds: ['badge_initiation'],
  unlockedRewardIds: ['📜 Akte: Eid auf die Menschenwürde'],
  dilemmaDecisions: {},
  notes: {},
  reflections: {},
  
  // Timestamps
  createdAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
  chapterCompletedAt: {},
  reflectionSavedAt: {},
  codeSavedAt: {},
  dilemmaDecidedAt: {},

  settings: {
    typewriterSpeed: 1,
    soundEnabled: true
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem('ethik_kommission_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_PROFILE;
  });

  const [activeChapterId, setActiveChapterId] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem('ethik_kommission_profile', JSON.stringify(profile));
  }, [profile]);

  const nowISO = () => new Date().toISOString();

  const updateAvatar = (avatarId: string) => {
    setProfile(prev => ({ ...prev, avatarId, lastUpdatedAt: nowISO() }));
  };

  const updateProfileName = (name: string) => {
    setProfile(prev => ({ ...prev, name, lastUpdatedAt: nowISO() }));
  };

  const updateProfileBio = (bio: string) => {
    setProfile(prev => ({ ...prev, bio, lastUpdatedAt: nowISO() }));
  };

  const updateSpecialization = (specialization: 'REL' | 'SOWI' | 'NEUTRAL') => {
    setProfile(prev => ({ ...prev, specialization, lastUpdatedAt: nowISO() }));
  };

  const updateFilterStyle = (filterStyle: 'cyber' | 'matrix' | 'gold' | 'monochrome' | 'tactical') => {
    setProfile(prev => ({ ...prev, filterStyle, lastUpdatedAt: nowISO() }));
  };

  const completeChapter = (chapterId: number, xpToAdd: number) => {
    setProfile(prev => {
      if (prev.completedChapterIds.includes(chapterId)) return prev;

      const timestamp = nowISO();
      const newCompleted = [...prev.completedChapterIds, chapterId];
      const newXp = prev.xp + xpToAdd;
      const newLevel = Math.floor(newXp / 200) + 1;

      let newRank = 'Junior Rekrut/in';
      const rewards = [...prev.unlockedRewardIds];
      
      RANKS_AND_REWARDS.forEach(r => {
        if (newLevel >= r.level) {
          newRank = r.title;
          if (!rewards.includes(r.unlockedItem)) {
            rewards.push(r.unlockedItem);
          }
        }
      });

      const newBadgeIds = [...prev.unlockedBadgeIds];
      if (newCompleted.length >= 1 && !newBadgeIds.includes('badge_initiation')) newBadgeIds.push('badge_initiation');
      if (newCompleted.includes(4) && !newBadgeIds.includes('badge_privacy')) newBadgeIds.push('badge_privacy');
      if (newCompleted.includes(2) && !newBadgeIds.includes('badge_rel_philosopher')) newBadgeIds.push('badge_rel_philosopher');
      if (newCompleted.includes(3) && !newBadgeIds.includes('badge_sowi_analyst')) newBadgeIds.push('badge_sowi_analyst');
      if (newCompleted.length >= 20 && !newBadgeIds.includes('badge_commissioner')) newBadgeIds.push('badge_commissioner');

      return {
        ...prev,
        completedChapterIds: newCompleted,
        xp: newXp,
        level: newLevel,
        rank: newRank,
        unlockedBadgeIds: newBadgeIds,
        unlockedRewardIds: rewards,
        lastUpdatedAt: timestamp,
        chapterCompletedAt: {
          ...(prev.chapterCompletedAt || {}),
          [chapterId]: timestamp
        }
      };
    });
  };

  const recordDilemmaDecision = (chapterId: number, optionIndex: number, xpBonus: number) => {
    setProfile(prev => {
      if (prev.dilemmaDecisions[chapterId] !== undefined) return prev;
      const timestamp = nowISO();
      return {
        ...prev,
        xp: prev.xp + xpBonus,
        dilemmaDecisions: { ...prev.dilemmaDecisions, [chapterId]: optionIndex },
        lastUpdatedAt: timestamp,
        dilemmaDecidedAt: {
          ...(prev.dilemmaDecidedAt || {}),
          [chapterId]: timestamp
        }
      };
    });
  };

  const saveNote = (chapterId: number, note: string) => {
    setProfile(prev => {
      const timestamp = nowISO();
      return {
        ...prev,
        notes: { ...prev.notes, [chapterId]: note },
        lastUpdatedAt: timestamp,
        codeSavedAt: {
          ...(prev.codeSavedAt || {}),
          [chapterId]: timestamp
        }
      };
    });
  };

  const saveReflection = (chapterId: number, reflection: string) => {
    setProfile(prev => {
      const timestamp = nowISO();
      return {
        ...prev,
        reflections: { ...prev.reflections, [chapterId]: reflection },
        lastUpdatedAt: timestamp,
        reflectionSavedAt: {
          ...(prev.reflectionSavedAt || {}),
          [chapterId]: timestamp
        }
      };
    });
  };

  const exportProfileJSON = () => {
    const timestamp = nowISO();

    // Create comprehensive export bundle
    const exportBundle: ExportProjectFile = {
      formatVersion: '2.0-ETHIK-KOMMISSION',
      exportedAt: timestamp,
      courseTitle: 'KI – Mensch – Verantwortung (Religionslehre & Sowi)',
      studentProfile: {
        ...profile,
        lastUpdatedAt: timestamp
      },
      chapterLogs: INITIAL_CHAPTERS.map(ch => {
        const dilemmaIdx = profile.dilemmaDecisions[ch.id];
        const dilemmaOpt = dilemmaIdx !== undefined && ch.dilemmaChoice ? ch.dilemmaChoice.options[dilemmaIdx] : undefined;

        return {
          chapterId: ch.id,
          chapterTitle: ch.title,
          completedAt: profile.chapterCompletedAt?.[ch.id] || undefined,
          dilemmaChoiceIndex: dilemmaIdx,
          dilemmaStance: dilemmaOpt?.label || undefined,
          dilemmaTimestamp: profile.dilemmaDecidedAt?.[ch.id] || undefined,
          htmlCodeInput: profile.notes[ch.id] || undefined,
          htmlCodeTimestamp: profile.codeSavedAt?.[ch.id] || undefined,
          studentReflection: profile.reflections[ch.id] || undefined,
          reflectionTimestamp: profile.reflectionSavedAt?.[ch.id] || undefined
        };
      })
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ethik_kommission_${profile.name.replace(/\s+/g, '_')}_fortschritt.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProfileJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      
      // Support formatVersion 2.0 bundle or direct profile import
      if (parsed && typeof parsed === 'object') {
        if ('studentProfile' in parsed && parsed.studentProfile) {
          setProfile(parsed.studentProfile);
          return true;
        } else if ('xp' in parsed) {
          setProfile(parsed);
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const resetAllData = () => {
    localStorage.removeItem('ethik_kommission_profile');
    setProfile(DEFAULT_PROFILE);
    setActiveChapterId(1);
  };

  return (
    <GameContext.Provider value={{
      profile,
      chapters: INITIAL_CHAPTERS,
      badges: BADGES,
      activeChapterId,
      setActiveChapterId,
      updateAvatar,
      updateProfileName,
      updateProfileBio,
      updateSpecialization,
      updateFilterStyle,
      completeChapter,
      recordDilemmaDecision,
      saveNote,
      saveReflection,
      exportProfileJSON,
      importProfileJSON,
      resetAllData
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
