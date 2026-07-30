import type { MissionController } from "./useMissionControl";

export function Topbar({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    viewTitle,
    dirty,
    exportProject,
    selectedAvatar,
    setView,
  } = controller;

  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">KI-ETHIK-KOMMISSION · SEKTION 01</span>
        <h1>{viewTitle}</h1>
      </div>
      <div className="top-actions">
        <div className={dirty ? "save-state dirty" : "save-state"}>
          <span className="status-dot" />
          {dirty ? "Nicht gesichert" : "Projektdatei aktuell"}
        </div>
        <button
          className="button secondary"
          type="button"
          onClick={exportProject}
        >
          Projekt sichern
        </button>
        <button
          className={`avatar avatar-${selectedAvatar.tone}`}
          type="button"
          onClick={() => setView("profile")}
          aria-label="Persönliche Akte öffnen"
        >
          {selectedAvatar.initials}
        </button>
      </div>
    </header>
  );
}

