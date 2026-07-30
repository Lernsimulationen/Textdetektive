import type { MissionController } from "../useMissionControl";
import {
  chapterStatus,
  perspectiveLabel,
  perspectiveShort,
} from "../model";

export function MissionView({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    course,
    project,
    currentMission,
    completedCount,
    progress,
    rank,
    level,
    completedXp,
    setActiveChapterId,
    setView,
    exportProject,
  } = controller;

  const routeStart = Math.max(
    (currentMission?.order ?? course.chapters.length) - 2,
    0,
  );
  const lastBadge = course.badges.find(
    (item) =>
      item.id ===
      project.collectedBadgeIds[project.collectedBadgeIds.length - 1],
  );

  return (
    <div className="dashboard-grid">
      <section className="hero-panel">
        <img className="hero-art" src="./og.png" alt="" />
        <div className="hero-scanlines" aria-hidden="true" />
        <div className="hero-copy">
          <span className="section-kicker">AKTIVER AUFTRAG</span>
          <span
            className={`perspective-pill perspective-${currentMission?.perspective ?? "joint"}`}
          >
            {currentMission
              ? perspectiveLabel(course, currentMission.perspective)
              : "Mandat erfüllt"}
          </span>
          <h2>
            {currentMission?.title ?? "Kommission vollständig ausgebildet"}
          </h2>
          <p>
            {currentMission?.briefing ??
              "Alle Sektoren wurden abgeschlossen. Die Projektakte ist bereit für die Übergabe."}
          </p>
          {currentMission ? (
            <button
              className="button primary"
              type="button"
              onClick={() => setActiveChapterId(currentMission.id)}
            >
              Briefing öffnen <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className="button primary" type="button" onClick={exportProject}>
              Abschlussakte sichern
            </button>
          )}
        </div>
        <div className="orbital-display" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core-node">
            <span>
              {String(currentMission?.order ?? course.chapters.length).padStart(
                2,
                "0",
              )}
            </span>
            <small>SEKTOR</small>
          </div>
          <div className="data-point point-a" />
          <div className="data-point point-b" />
          <div className="data-point point-c" />
        </div>
        <div className="hero-meta">
          <span>{currentMission?.duration ?? "—"}</span>
          <span>{currentMission?.xp ?? 0} XP</span>
          <span>
            {completedCount}/{course.chapters.length} Protokolle
          </span>
        </div>
      </section>

      <section className="panel progress-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">MANDATSSTATUS</span>
            <h3>Ausbildungsfortschritt</h3>
          </div>
          <strong className="large-number">{progress}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Kursfortschritt"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="stat-row">
          <div>
            <span>Rang</span>
            <strong>{rank}</strong>
          </div>
          <div>
            <span>Level</span>
            <strong>{String(level).padStart(2, "0")}</strong>
          </div>
          <div>
            <span>Erfahrung</span>
            <strong>{completedXp} XP</strong>
          </div>
        </div>
      </section>

      <section className="panel sector-preview">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">SEKTOREN</span>
            <h3>Nächste Freigaben</h3>
          </div>
          <button
            className="text-action"
            type="button"
            onClick={() => setView("sectors")}
          >
            Karte öffnen
          </button>
        </div>
        <div className="mini-route">
          {course.chapters
            .slice(routeStart, routeStart + 5)
            .map((chapter) => {
              const status = chapterStatus(chapter, project);
              return (
                <button
                  type="button"
                  key={chapter.id}
                  className={`mini-node ${status} perspective-${chapter.perspective}`}
                  disabled={status === "locked"}
                  onClick={() => setActiveChapterId(chapter.id)}
                  aria-label={`${chapter.order}. ${chapter.title} – ${status}`}
                >
                  {status === "completed" ? "✓" : chapter.order}
                </button>
              );
            })}
        </div>
        <div className="legend">
          <span>
            <i className="legend-dot religion" /> Religionslehre
          </span>
          <span>
            <i className="legend-dot social" /> Sozialwissenschaften
          </span>
          <span>
            <i className="legend-dot joint" /> Gemeinsam
          </span>
        </div>
      </section>

      <section className="panel badge-preview">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">ARCHIV</span>
            <h3>Letztes Abzeichen</h3>
          </div>
        </div>
        {lastBadge ? (
          <div className="featured-badge">
            <span className="badge-seal">{lastBadge.icon}</span>
            <div>
              <strong>{lastBadge.name}</strong>
              <p>{lastBadge.description}</p>
            </div>
          </div>
        ) : (
          <div className="empty-state compact">
            <span className="badge-seal locked">I</span>
            <p>Das erste Abzeichen wird nach Protokoll 01 sichtbar.</p>
          </div>
        )}
      </section>
    </div>
  );
}

