"use client";

import { ArchiveView } from "./mission-control/views/ArchiveView";
import { EditorView } from "./mission-control/views/EditorView";
import { LiveView } from "./mission-control/views/LiveView";
import { MissionView } from "./mission-control/views/MissionView";
import { ProfileView } from "./mission-control/views/ProfileView";
import { SectorsView } from "./mission-control/views/SectorsView";
import { MissionDialog } from "./mission-control/MissionDialog";
import { Navigation } from "./mission-control/Navigation";
import { Topbar } from "./mission-control/Topbar";
import { useMissionControl } from "./mission-control/useMissionControl";
import { WelcomeDialog } from "./mission-control/WelcomeDialog";

export function MissionControl() {
  const controller = useMissionControl();

  return (
    <main className="app-shell">
      <Navigation controller={controller} />

      <section className="workspace">
        <Topbar controller={controller} />
        <div className="content">
          {controller.view === "mission" && (
            <MissionView controller={controller} />
          )}
          {controller.view === "sectors" && (
            <SectorsView controller={controller} />
          )}
          {controller.view === "profile" && (
            <ProfileView controller={controller} />
          )}
          {controller.view === "archive" && (
            <ArchiveView controller={controller} />
          )}
          {controller.view === "live" && (
            <LiveView controller={controller} />
          )}
          {controller.view === "editor" && (
            <EditorView controller={controller} />
          )}
        </div>
      </section>

      <input
        ref={controller.projectInputRef}
        className="visually-hidden"
        type="file"
        accept=".json,application/json"
        onChange={controller.importProject}
      />
      <input
        ref={controller.courseInputRef}
        className="visually-hidden"
        type="file"
        accept=".json,application/json"
        onChange={controller.importCourse}
      />

      {controller.showWelcome && <WelcomeDialog controller={controller} />}
      <MissionDialog controller={controller} />
      {controller.toast && (
        <div className="toast" role="status">
          {controller.toast}
        </div>
      )}
    </main>
  );
}

