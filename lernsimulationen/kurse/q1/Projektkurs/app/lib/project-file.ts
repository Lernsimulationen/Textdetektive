import type { CourseConfig, ProjectFile, ProjectState } from "../types";

const MAX_FILE_SIZE = 2_000_000;

export function createProject(course: CourseConfig): ProjectState {
  const now = new Date().toISOString();
  return {
    projectId: crypto.randomUUID(),
    courseId: course.id,
    createdAt: now,
    updatedAt: now,
    avatarId: "aurelia",
    callSign: "NOVA",
    completedChapterIds: [],
    chapterNotes: {},
    reflections: {},
    collectedBadgeIds: [],
    selectedTitle: course.gamification.rankTitles[0] ?? "Mitglied",
    settings: {
      typewriterSpeed: "normal",
      sound: false,
      reducedMotion: false,
    },
  };
}

export function syncBadges(
  project: ProjectState,
  course: CourseConfig,
): ProjectState {
  const completed = project.completedChapterIds.length;
  const earned = course.badges
    .filter(
      (badge) =>
        badge.condition.type === "chapters-completed" &&
        completed >= badge.condition.value,
    )
    .map((badge) => badge.id);
  return {
    ...project,
    updatedAt: new Date().toISOString(),
    collectedBadgeIds: earned,
  };
}

export function makeProjectFile(
  project: ProjectState,
  course: CourseConfig,
): ProjectFile {
  return {
    format: "mission-project",
    version: 1,
    exportedAt: new Date().toISOString(),
    courseSnapshot: course,
    project: { ...project, updatedAt: new Date().toISOString() },
  };
}

export function downloadJson(value: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProjectFile(value: unknown): value is ProjectFile {
  if (!isObject(value)) return false;
  if (value.format !== "mission-project" || value.version !== 1) return false;
  if (!isObject(value.project) || !isObject(value.courseSnapshot)) return false;
  return (
    typeof value.project.projectId === "string" &&
    typeof value.project.courseId === "string" &&
    typeof value.project.avatarId === "string" &&
    Array.isArray(value.project.completedChapterIds) &&
    value.project.completedChapterIds.every((id) => typeof id === "string") &&
    value.courseSnapshot.format === "mission-course" &&
    Array.isArray(value.courseSnapshot.chapters)
  );
}

export async function readProjectFile(file: File): Promise<ProjectFile> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Die Projektdatei ist größer als 2 MB.");
  }
  const parsed: unknown = JSON.parse(await file.text());
  if (!isProjectFile(parsed)) {
    throw new Error("Die Datei ist keine gültige Projektdatei der Version 1.");
  }
  return parsed;
}

export function isCourseConfig(value: unknown): value is CourseConfig {
  if (!isObject(value)) return false;
  return (
    value.format === "mission-course" &&
    value.version === 1 &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    Array.isArray(value.chapters) &&
    value.chapters.every(
      (chapter) =>
        isObject(chapter) &&
        typeof chapter.id === "string" &&
        typeof chapter.title === "string" &&
        typeof chapter.order === "number",
    )
  );
}

