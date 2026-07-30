import type { MissionController } from "../useMissionControl";

const pollOptions = [
  ["zustimmung", "Zustimmung"],
  ["unentschieden", "Unentschieden"],
  ["widerspruch", "Widerspruch"],
] as const;

export function LiveView({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    buzzCount,
    setBuzzCount,
    voteCounts,
    castOfflineVote,
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
    prepareSupabase,
  } = controller;

  return (
    <div className="live-grid">
      <section className="panel buzzer-panel">
        <span className="section-kicker">LOKAL · DIESES GERÄT</span>
        <h2>Buzzer</h2>
        <p>Für schnelle Wortmeldungen ohne Netzwerk und ohne Speicherung.</p>
        <button
          className="buzzer"
          type="button"
          onClick={() => setBuzzCount((count) => count + 1)}
        >
          <span>BUZZ</span>
          <small>{buzzCount ? `${buzzCount}× ausgelöst` : "Bereit"}</small>
        </button>
        <button
          className="text-action"
          type="button"
          onClick={() => setBuzzCount(0)}
        >
          Zähler zurücksetzen
        </button>
      </section>

      <section className="panel poll-panel">
        <span className="section-kicker">ANONYME LOKALABSTIMMUNG</span>
        <h2>Spontanes Votum</h2>
        <p>Sichtbar nur in diesem Tab. Jede Berührung zählt als Stimme.</p>
        <div className="poll-options">
          {pollOptions.map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => castOfflineVote(id)}
            >
              <span>{label}</span>
              <strong>{voteCounts[id] ?? 0}</strong>
            </button>
          ))}
        </div>
        <button className="text-action" type="button" onClick={resetVotes}>
          Abstimmung leeren
        </button>
      </section>

      <section className="panel online-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker warning">
              OPTIONALES ONLINE-MODUL
            </span>
            <h3>Supabase-Adapter</h3>
          </div>
          <button
            type="button"
            className={liveEnabled ? "switch on" : "switch"}
            aria-pressed={liveEnabled}
            aria-label="Online-Zusatzmodul aktivieren"
            onClick={() => {
              setLiveEnabled((value) => !value);
              setOnlineStatus("Nicht verbunden");
            }}
          >
            <span />
          </button>
        </div>
        <p>
          Standardmäßig aus. Bei Aktivierung können anonyme Raumereignisse an
          eine schulisch geprüfte Supabase-Instanz gesendet werden.
        </p>
        {liveEnabled && (
          <div className="online-form">
            <label>
              Projekt-URL
              <input
                type="url"
                placeholder="https://…supabase.co"
                value={supabaseUrl}
                onChange={(event) => setSupabaseUrl(event.target.value)}
              />
            </label>
            <label>
              Öffentlicher anon-Key
              <input
                type="password"
                value={supabaseKey}
                onChange={(event) => setSupabaseKey(event.target.value)}
              />
            </label>
            <label>
              Raumcode
              <input
                value={roomCode}
                maxLength={24}
                onChange={(event) =>
                  setRoomCode(event.target.value.toUpperCase())
                }
              />
            </label>
            <button
              className="button secondary"
              type="button"
              onClick={prepareSupabase}
            >
              Adapter vorbereiten
            </button>
            <span className="connection-status">{onlineStatus}</span>
          </div>
        )}
      </section>
    </div>
  );
}

