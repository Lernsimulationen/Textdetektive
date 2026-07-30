import type {
  ChapterConfig,
  ChapterStatus,
  CourseConfig,
  PerspectiveId,
  ProjectState,
} from "../../types";

export type ViewId =
  | "mission"
  | "sectors"
  | "profile"
  | "archive"
  | "live"
  | "editor";

export const navItems: Array<{ id: ViewId; label: string; mark: string }> = [
  { id: "mission", label: "Mission", mark: "01" },
  { id: "sectors", label: "Sektoren", mark: "02" },
  { id: "profile", label: "Akte", mark: "03" },
  { id: "archive", label: "Archiv", mark: "04" },
  { id: "live", label: "Live-Labor", mark: "05" },
  { id: "editor", label: "Kurswerkstatt", mark: "06" },
];

export const avatars = [
  { id: "aurelia", initials: "AU", name: "Aurelia", tone: "amber" },
  { id: "kael", initials: "KL", name: "Kael", tone: "teal" },
  { id: "mira", initials: "MR", name: "Mira", tone: "rose" },
  { id: "sol", initials: "SL", name: "Sol", tone: "violet" },
];

export const viewTitles: Record<ViewId, string> = {
  mission: "Missionszentrale",
  sectors: "Sektorenkarte",
  profile: "Persönliche Akte",
  archive: "Kommissionsarchiv",
  live: "Live-Labor",
  editor: "Kurswerkstatt",
};

export function chapterStatus(
  chapter: ChapterConfig,
  project: ProjectState,
): ChapterStatus {
  if (project.completedChapterIds.includes(chapter.id)) return "completed";
  const available = chapter.prerequisites.every((id) =>
    project.completedChapterIds.includes(id),
  );
  return available ? "available" : "locked";
}

export function perspectiveLabel(
  course: CourseConfig,
  id: PerspectiveId,
): string {
  return course.perspectives.find((item) => item.id === id)?.label ?? id;
}

export function perspectiveShort(
  course: CourseConfig,
  id: PerspectiveId,
): string {
  return course.perspectives.find((item) => item.id === id)?.shortLabel ?? id;
}

export function nextChapter(
  course: CourseConfig,
  project: ProjectState,
): ChapterConfig | undefined {
  return [...course.chapters]
    .sort((a, b) => a.order - b.order)
    .find((item) => chapterStatus(item, project) === "available");
}

