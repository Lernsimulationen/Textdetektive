import { Typewriter } from "../Typewriter";
import type { MissionController } from "./useMissionControl";

export function WelcomeDialog({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    course,
    project,
    beginProject,
    projectInputRef,
  } = controller;

  return (
    <div
      className="welcome-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="welcome-grid" aria-hidden="true" />
      <div className="welcome-card">
        <div className="welcome-brand">
          <span className="brand-mark large">K</span>
          <span>INITIALE AUTORISIERUNG</span>
        </div>
        <span className="section-kicker">PROJEKTKURS · MANDAT 01</span>
        <h2 id="welcome-title">{course.title}</h2>
        <p className="welcome-subtitle">{course.subtitle}</p>
        <Typewriter
          text={course.storyIntro}
          speed={project.settings.typewriterSpeed}
        />
        <div className="welcome-actions">
          <button
            className="button primary"
            type="button"
            onClick={beginProject}
          >
            Neue Akte anlegen
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => projectInputRef.current?.click()}
          >
            Projektdatei öffnen
          </button>
        </div>
        <div className="welcome-privacy">
          <span className="status-dot" />
          Lokal · ohne Konto · keine Cloudspeicherung
        </div>
      </div>
      <div className="welcome-coordinate coordinate-a">51.1657° N</div>
      <div className="welcome-coordinate coordinate-b">PROTOKOLL // 001</div>
    </div>
  );
}
