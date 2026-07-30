import type { MissionController } from "../useMissionControl";

export function ArchiveView({
  controller,
}: {
  controller: MissionController;
}) {
  const { course, project } = controller;

  return (
    <section>
      <div className="map-intro">
        <div>
          <span className="section-kicker">SAMMELARCHIV</span>
          <h2>Abzeichen & Nachweise</h2>
          <p>
            Freigeschaltete Nachweise bleiben Bestandteil deiner Projektdatei.
          </p>
        </div>
      </div>
      <div className="badge-grid">
        {course.badges.map((badge) => {
          const earned = project.collectedBadgeIds.includes(badge.id);
          return (
            <article
              key={badge.id}
              className={earned ? "badge-card earned" : "badge-card"}
            >
              <span className={earned ? "badge-seal" : "badge-seal locked"}>
                {badge.icon}
              </span>
              <span className="chapter-meta">
                {earned
                  ? "FREIGESCHALTET"
                  : `AB ${badge.condition.value} PROTOKOLLEN`}
              </span>
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

