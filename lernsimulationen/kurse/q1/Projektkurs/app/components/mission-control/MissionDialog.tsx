import { Typewriter } from "../Typewriter";
import { chapterStatus, perspectiveShort } from "./model";
import type { MissionController } from "./useMissionControl";

export function MissionDialog({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    course,
    project,
    activeChapter,
    setActiveChapterId,
    mutateProject,
    completeChapter,
  } = controller;

  if (!activeChapter) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={() => setActiveChapterId(null)}
    >
      <section
        className="mission-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={() => setActiveChapterId(null)}
          aria-label="Briefing schließen"
        >
          ×
        </button>
        <div
          className={`modal-band perspective-${activeChapter.perspective}`}
        />
        <span className="section-kicker">
          PROTOKOLL {String(activeChapter.order).padStart(2, "0")} ·{" "}
          {perspectiveShort(course, activeChapter.perspective)}
        </span>
        <h2 id="mission-title">{activeChapter.title}</h2>
        <p className="modal-codename">CODENAME: {activeChapter.codename}</p>
        <div className="briefing-box">
          <span>MISSIONSBRIEFING</span>
          <Typewriter
            text={activeChapter.briefing}
            speed={project.settings.typewriterSpeed}
          />
        </div>
        <label className="mission-note">
          Persönliche Notiz
          <textarea
            rows={4}
            placeholder="Nur lokal in der Projektdatei · keine Klarnamen verwenden"
            value={project.chapterNotes[activeChapter.id] ?? ""}
            onChange={(event) =>
              mutateProject((state) => ({
                ...state,
                chapterNotes: {
                  ...state.chapterNotes,
                  [activeChapter.id]: event.target.value,
                },
              }))
            }
          />
        </label>
        <div className="modal-footer">
          <span>
            {activeChapter.duration} · {activeChapter.xp} XP
          </span>
          {chapterStatus(activeChapter, project) === "completed" ? (
            <span className="completed-label">✓ Protokolliert</span>
          ) : (
            <button
              className="button primary"
              type="button"
              onClick={() => completeChapter(activeChapter)}
            >
              Mission abschließen
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

