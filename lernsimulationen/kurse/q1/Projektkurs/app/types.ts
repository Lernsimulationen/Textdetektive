export type PerspectiveId = "religion" | "social" | "joint";
export type ChapterStatus = "locked" | "available" | "completed";

export interface Perspective {
  id: PerspectiveId;
  shortLabel: string;
  label: string;
  color: string;
}

export interface ChapterConfig {
  id: string;
  order: number;
  title: string;
  codename: string;
  teaser: string;
  briefing: string;
  perspective: PerspectiveId;
  xp: number;
  duration: string;
  prerequisites: string[];
  materialLinks: Array<{ label: string; url: string }>;
}

export interface BadgeConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: { type: "chapters-completed"; value: number };
}

export interface CourseConfig {
  format: "mission-course";
  version: 1;
  id: string;
  title: string;
  subtitle: string;
  commissionName: string;
  storyIntro: string;
  perspectives: Perspective[];
  chapters: ChapterConfig[];
  badges: BadgeConfig[];
  gamification: {
    enabled: boolean;
    xpPerLevel: number;
    rankTitles: string[];
  };
  liveModule: {
    enabled: boolean;
    allowSupabase: boolean;
  };
}

export interface ProjectState {
  projectId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  avatarId: string;
  callSign: string;
  completedChapterIds: string[];
  chapterNotes: Record<string, string>;
  reflections: Record<string, string>;
  collectedBadgeIds: string[];
  selectedTitle: string;
  settings: {
    typewriterSpeed: "normal" | "fast" | "instant";
    sound: boolean;
    reducedMotion: boolean;
  };
}

export interface ProjectFile {
  format: "mission-project";
  version: 1;
  exportedAt: string;
  courseSnapshot: CourseConfig;
  project: ProjectState;
}

