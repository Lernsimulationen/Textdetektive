import { navItems } from "./model";
import type { MissionController } from "./useMissionControl";

export function Navigation({
  controller,
}: {
  controller: MissionController;
}) {
  const { view, setView } = controller;

  return (
    <aside className="sidebar" aria-label="Hauptnavigation">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          K
        </span>
        <div>
          <strong>KOMMISSION</strong>
          <span>Lokale Instanz</span>
        </div>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={view === item.id ? "nav-item active" : "nav-item"}
            type="button"
            onClick={() => setView(item.id)}
            aria-current={view === item.id ? "page" : undefined}
          >
            <span className="nav-index">{item.mark}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="privacy-chip">
        <span className="status-dot" />
        <div>
          <strong>Offline-Kern aktiv</strong>
          <span>Keine Übertragung</span>
        </div>
      </div>
    </aside>
  );
}

