import { chapterStatus, perspectiveShort } from "../model";
import type { MissionController } from "../useMissionControl";

export function SectorsView({
  controller,
}: {
  controller: MissionController;
}) {
  const { course, project, completedCount, setActiveChapterId } = controller;

  return (
    <section className="sector-map">
      <div className="map-intro">
        <div>
          <span className="section-kicker">20 PROTOKOLLE · 1 MANDAT</span>
          <h2>Weg durch die Kommission</h2>
          <p>
            Jeder Sektor baut auf dem vorherigen Auftrag auf. Perspektiven sind
            farblich und textlich gekennzeichnet.
          </p>
        </div>
        <div className="map-progress">
          <strong>{completedCount}</strong>
          <span>
            von {course.chapters.length}
            <br />
            abgeschlossen
          </span>
        </div>
      </div>
      <div className="chapter-route">
        {[...course.chapters]
          .sort((a, b) => a.order - b.order)
          .map((chapter, index) => {
            const status = chapterStatus(chapter, project);
            return (
              <article
                key={chapter.id}
                className={`chapter-card ${status} perspective-${chapter.perspective} ${
                  index % 2 ? "route-right" : "route-left"
                }`}
              >
                <button
                  type="button"
                  disabled={status === "locked"}
                  onClick={() => setActiveChapterId(chapter.id)}
                >
                  <span className="chapter-number">
                    {status === "completed"
                      ? "✓"
                      : String(chapter.order).padStart(2, "0")}
                  </span>
                  <span className="chapter-copy">
                    <span className="chapter-meta">
                      {perspectiveShort(course, chapter.perspective)} ·{" "}
                      {chapter.duration}
                    </span>
                    <strong>{chapter.title}</strong>
                    <small>{chapter.codename}</small>
                  </span>
                  <span className="chapter-status">
                    {status === "locked"
                      ? "Gesperrt"
                      : status === "completed"
                        ? "Protokolliert"
                        : "Bereit"}
                  </span>
                </button>
              </article>
            );
          })}
      </div>
    </section>
  );
}

