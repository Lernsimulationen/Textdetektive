import { avatars } from "../model";
import type { MissionController } from "../useMissionControl";

export function ProfileView({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    course,
    project,
    selectedAvatar,
    rank,
    level,
    completedXp,
    totalXp,
    levelProgress,
    completedCount,
    mutateProject,
  } = controller;

  return (
    <div className="profile-grid">
      <section className="panel identity-panel">
        <span className="section-kicker">LOKALE IDENTITÄT</span>
        <div
          className={`avatar avatar-large avatar-${selectedAvatar.tone}`}
        >
          {selectedAvatar.initials}
        </div>
        <label>
          Rufzeichen
          <input
            value={project.callSign}
            maxLength={16}
            onChange={(event) =>
              mutateProject((state) => ({
                ...state,
                callSign: event.target.value
                  .replace(/[^\p{L}\p{N}-]/gu, "")
                  .toUpperCase(),
              }))
            }
          />
        </label>
        <p className="privacy-note">
          Nutze ein erfundenes Rufzeichen – keinen Klarnamen.
        </p>
      </section>

      <section className="panel avatar-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">AVATAR-MODUL</span>
            <h3>Erscheinungsbild wählen</h3>
          </div>
        </div>
        <div className="avatar-options">
          {avatars.map((avatar) => (
            <button
              type="button"
              key={avatar.id}
              className={
                avatar.id === project.avatarId
                  ? "avatar-option selected"
                  : "avatar-option"
              }
              onClick={() =>
                mutateProject((state) => ({
                  ...state,
                  avatarId: avatar.id,
                }))
              }
            >
              <span className={`avatar avatar-${avatar.tone}`}>
                {avatar.initials}
              </span>
              <strong>{avatar.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="panel dossier-panel">
        <span className="section-kicker">STATUS</span>
        <h3>{rank}</h3>
        <p>
          Level {level} · {completedXp} von {totalXp} möglichen XP
        </p>
        <div className="progress-track thin">
          <span style={{ width: `${levelProgress}%` }} />
        </div>
        <div className="dossier-stats">
          <div>
            <strong>{completedCount}</strong>
            <span>Protokolle</span>
          </div>
          <div>
            <strong>{project.collectedBadgeIds.length}</strong>
            <span>Abzeichen</span>
          </div>
          <div>
            <strong>{course.chapters.length - completedCount}</strong>
            <span>Offen</span>
          </div>
        </div>
      </section>

      <section className="panel settings-panel">
        <span className="section-kicker">LESEMODUS</span>
        <h3>Textgeschwindigkeit</h3>
        <div className="segmented">
          {(["normal", "fast", "instant"] as const).map((speed) => (
            <button
              key={speed}
              type="button"
              className={
                project.settings.typewriterSpeed === speed ? "active" : ""
              }
              onClick={() =>
                mutateProject((state) => ({
                  ...state,
                  settings: { ...state.settings, typewriterSpeed: speed },
                }))
              }
            >
              {speed === "normal"
                ? "Ruhig"
                : speed === "fast"
                  ? "Schnell"
                  : "Sofort"}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

