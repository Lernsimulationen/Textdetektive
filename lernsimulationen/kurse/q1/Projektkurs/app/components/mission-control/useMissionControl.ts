"use client";

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { defaultCourse } from "../../data/course";
import { OfflineLiveAdapter } from "../../integrations/live/offline-adapter";
import {
  createProject,
  downloadJson,
  isCourseConfig,
  makeProjectFile,
  readProjectFile,
  syncBadges,
} from "../../lib/project-file";
import type { ChapterConfig, CourseConfig, ProjectState } from "../../types";
import { avatars, nextChapter, type ViewId, viewTitles } from "./model";

const initialVotes = {
  zustimmung: 0,
  unentschieden: 0,
  widerspruch: 0,
};

export function useMissionControl() {
  const [course, setCourse] = useState<CourseConfig>(defaultCourse);
  const [project, setProject] = useState<ProjectState>(() =>
    createProject(defaultCourse),
  );
  const [view, setView] = useState<ViewId>("mission");
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingChapterId, setEditingChapterId] = useState(
    defaultCourse.chapters[0].id,
  );
  const projectInputRef = useRef<HTMLInputElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);
  const offlineAdapterRef = useRef(new OfflineLiveAdapter());
  const [buzzCount, setBuzzCount] = useState(0);
  const [voteCounts, setVoteCounts] =
    useState<Record<string, number>>(initialVotes);
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [onlineStatus, setOnlineStatus] = useState("Nicht verbunden");

  const activeChapter = course.chapters.find(
    (chapter) => chapter.id === activeChapterId,
  );
  const editingChapter = course.chapters.find(
    (chapter) => chapter.id === editingChapterId,
  );
  const completedXp = useMemo(
    () =>
      course.chapters
        .filter((chapter) => project.completedChapterIds.includes(chapter.id))
        .reduce((sum, chapter) => sum + chapter.xp, 0),
    [course.chapters, project.completedChapterIds],
  );
  const totalXp = course.chapters.reduce((sum, chapter) => sum + chapter.xp, 0);
  const completedCount = project.completedChapterIds.length;
  const progress = Math.round(
    (completedCount / Math.max(course.chapters.length, 1)) * 100,
  );
  const level = Math.floor(completedXp / course.gamification.xpPerLevel) + 1;
  const levelProgress =
    ((completedXp % course.gamification.xpPerLevel) /
      course.gamification.xpPerLevel) *
    100;
  const rank =
    course.gamification.rankTitles[
      Math.min(level - 1, course.gamification.rankTitles.length - 1)
    ] ?? "Mitglied";
  const currentMission = nextChapter(course, project);
  const selectedAvatar =
    avatars.find((avatar) => avatar.id === project.avatarId) ?? avatars[0];

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => undefined);
    }
  }, []);

  const mutateProject = (update: (state: ProjectState) => ProjectState) => {
    setProject((state) =>
      syncBadges(
        { ...update(state), updatedAt: new Date().toISOString() },
        course,
      ),
    );
    setDirty(true);
  };

  const exportProject = () => {
    downloadJson(
      makeProjectFile(project, course),
      `${course.id}-${project.callSign.toLowerCase()}.mission-project.json`,
    );
    setDirty(false);
    showToast("Projektdatei wurde vorbereitet.");
  };

  const beginProject = () => {
    setShowWelcome(false);
    setDirty(true);
  };

  const exportCourse = () => {
    downloadJson(course, `${course.id}.mission-course.json`);
    showToast("Kursdatei wurde vorbereitet.");
  };

  const importProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const imported = await readProjectFile(file);
      setCourse(imported.courseSnapshot);
      setProject(syncBadges(imported.project, imported.courseSnapshot));
      setEditingChapterId(imported.courseSnapshot.chapters[0]?.id ?? "");
      setShowWelcome(false);
      setDirty(false);
      showToast("Projektakte erfolgreich geöffnet.");
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Die Datei konnte nicht geöffnet werden.",
      );
    }
  };

  const importCourse = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isCourseConfig(parsed)) throw new Error("Ungültige Kursdatei.");
      setCourse(parsed);
      setProject(createProject(parsed));
      setEditingChapterId(parsed.chapters[0]?.id ?? "");
      setDirty(true);
      showToast("Kurs geladen. Eine neue Projektakte wurde angelegt.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Import fehlgeschlagen.");
    }
  };

  const completeChapter = (chapter: ChapterConfig) => {
    mutateProject((state) => ({
      ...state,
      completedChapterIds: state.completedChapterIds.includes(chapter.id)
        ? state.completedChapterIds
        : [...state.completedChapterIds, chapter.id],
    }));
    setActiveChapterId(null);
    showToast(`Mission abgeschlossen · +${chapter.xp} XP`);
  };

  const updateChapter = (
    chapterId: string,
    patch: Partial<ChapterConfig>,
  ) => {
    setCourse((current) => ({
      ...current,
      chapters: current.chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, ...patch } : chapter,
      ),
    }));
    setDirty(true);
  };

  const updateCourseDetails = (
    patch: Partial<Pick<CourseConfig, "title" | "subtitle" | "storyIntro">>,
  ) => {
    setCourse((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const addChapter = () => {
    const order = course.chapters.length + 1;
    const id = `kapitel-${String(order).padStart(2, "0")}-${Date.now().toString(36)}`;
    const previous = [...course.chapters].sort((a, b) => b.order - a.order)[0];
    const chapter: ChapterConfig = {
      id,
      order,
      title: "Neuer Auftrag",
      codename: "Ohne Codename",
      teaser: "Strukturplatz für eine neue Mission",
      briefing:
        "Das Briefing für diesen Auftrag wird in der Kurswerkstatt ergänzt.",
      perspective: "joint",
      xp: 100,
      duration: "90 Min.",
      prerequisites: previous ? [previous.id] : [],
      materialLinks: [],
    };
    setCourse((current) => ({
      ...current,
      chapters: [...current.chapters, chapter],
    }));
    setEditingChapterId(id);
    setDirty(true);
    showToast("Neues Kapitel angelegt.");
  };

  const removeChapter = (chapterId: string) => {
    if (course.chapters.length <= 1) return;
    const remaining = course.chapters
      .filter((chapter) => chapter.id !== chapterId)
      .map((chapter, index, chapters) => ({
        ...chapter,
        order: index + 1,
        prerequisites:
          index === 0
            ? []
            : ([chapters[index - 1]?.id].filter(Boolean) as string[]),
      }));
    setCourse((current) => ({ ...current, chapters: remaining }));
    setEditingChapterId(remaining[0]?.id ?? "");
    setDirty(true);
    showToast("Kapitel entfernt.");
  };

  const castOfflineVote = async (optionId: string) => {
    await offlineAdapterRef.current.vote(crypto.randomUUID(), optionId);
    setVoteCounts((counts) => ({
      ...counts,
      [optionId]: (counts[optionId] ?? 0) + 1,
    }));
  };

  const resetVotes = () => setVoteCounts(initialVotes);

  const prepareSupabase = async () => {
    if (!liveEnabled) return;
    try {
      const { SupabaseLiveAdapter } = await import(
        "../../integrations/live/supabase-adapter"
      );
      const adapter = new SupabaseLiveAdapter({
        projectUrl: supabaseUrl,
        anonKey: supabaseKey,
      });
      await adapter.connect(roomCode);
      setOnlineStatus("Adapter bereit · noch keine Daten übertragen");
    } catch (error) {
      setOnlineStatus(
        error instanceof Error ? error.message : "Konfiguration ungültig",
      );
    }
  };

  return {
    course,
    setCourse,
    project,
    view,
    setView,
    showWelcome,
    setShowWelcome,
    activeChapter,
    setActiveChapterId,
    dirty,
    toast,
    editingChapter,
    setEditingChapterId,
    projectInputRef,
    courseInputRef,
    buzzCount,
    setBuzzCount,
    voteCounts,
    resetVotes,
    liveEnabled,
    setLiveEnabled,
    supabaseUrl,
    setSupabaseUrl,
    supabaseKey,
    setSupabaseKey,
    roomCode,
    setRoomCode,
    onlineStatus,
    setOnlineStatus,
    completedXp,
    totalXp,
    completedCount,
    progress,
    level,
    levelProgress,
    rank,
    currentMission,
    selectedAvatar,
    mutateProject,
    exportProject,
    beginProject,
    exportCourse,
    importProject,
    importCourse,
    completeChapter,
    updateChapter,
    updateCourseDetails,
    addChapter,
    removeChapter,
    castOfflineVote,
    prepareSupabase,
    viewTitle: viewTitles[view],
  };
}

export type MissionController = ReturnType<typeof useMissionControl>;
