import { SessionState, Participant } from '../types';
import { ConfettiService } from '../services/ConfettiService';
import { SoundService } from '../services/SoundService';

export class SmartboardDisplay {
  private lastWinningBuzzId: string | null = null;

  render(state: SessionState, container: HTMLElement): void {
    container.innerHTML = '';
    container.className = `smartboard-stage ${state.isLocked ? 'locked' : 'active-stage'}`;

    // 1. Render Countdown Overlay if active
    if (state.countdown !== null) {
      const overlay = document.createElement('div');
      overlay.className = 'countdown-overlay';
      overlay.innerHTML = `<div class="countdown-number">${state.countdown}</div>`;
      container.appendChild(overlay);
      return;
    }

    // 2. Mode-Specific Render Logic
    switch (state.mode) {
      case 'buzzer':
        this.renderBuzzerMode(state, container);
        break;

      case 'right_wrong':
        this.renderRightWrongMode(state, container);
        break;

      case 'poll':
        this.renderPollMode(state, container);
        break;

      case 'speed':
        this.renderSpeedMode(state, container);
        break;
    }
  }

  private renderBuzzerMode(state: SessionState, container: HTMLElement): void {
    if (state.buzzes.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted);">
          <div style="font-size: 4rem; margin-bottom: 12px;">🔔</div>
          <h2>Buzzer-Bereit</h2>
          <p style="margin-top: 8px;">Warte auf Antworten...</p>
        </div>
      `;
      this.lastWinningBuzzId = null;
      return;
    }

    const winnerBuzz = state.buzzes[0];
    const winner: Participant | undefined = state.participants[winnerBuzz.participantId];

    if (!winner) return;

    // Trigger visual/audio effects on new winner
    if (this.lastWinningBuzzId !== winnerBuzz.participantId) {
      this.lastWinningBuzzId = winnerBuzz.participantId;

      if (state.settings.animationEnabled) {
        document.body.classList.add('flash-effect');
        setTimeout(() => document.body.classList.remove('flash-effect'), 400);
      }

      if (state.settings.confettiEnabled) {
        ConfettiService.trigger();
      }

      if (state.settings.soundEnabled) {
        SoundService.play(state.settings.soundType);
      }
    }

    const formattedTime = new Date(winnerBuzz.timestamp).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });

    const banner = document.createElement('div');
    banner.className = 'winner-banner';
    banner.innerHTML = `
      <div class="badge" style="background-color: ${winner.color}; color: #ffffff; font-size: 1.2rem; padding: 8px 20px;">
        1. Platz
      </div>
      <div class="winner-name" style="color: ${winner.color};">
        ${winner.name}
      </div>
      <div class="winner-timestamp">
        Zeitstempel: ${formattedTime}
      </div>
    `;

    container.appendChild(banner);

    // Show remaining buzzed places up to visiblePlaces setting
    if (state.buzzes.length > 1) {
      const runnersUp = document.createElement('div');
      runnersUp.style.marginTop = '24px';
      runnersUp.style.display = 'flex';
      runnersUp.style.gap = '12px';
      runnersUp.style.flexWrap = 'wrap';
      runnersUp.style.justifyContent = 'center';

      state.buzzes.slice(1, state.settings.visiblePlaces).forEach((buzz, idx) => {
        const p = state.participants[buzz.participantId];
        if (p) {
          const runnerBadge = document.createElement('div');
          runnerBadge.style.padding = '8px 14px';
          runnerBadge.style.borderRadius = 'var(--border-radius-full)';
          runnerBadge.style.backgroundColor = p.color;
          runnerBadge.style.color = '#ffffff';
          runnerBadge.style.fontWeight = 'bold';
          runnerBadge.style.fontSize = '0.95rem';
          runnerBadge.textContent = `${idx + 2}. ${p.name}`;
          runnersUp.appendChild(runnerBadge);
        }
      });
      container.appendChild(runnersUp);
    }
  }

  private renderRightWrongMode(state: SessionState, container: HTMLElement): void {
    const totalVotes = Object.keys(state.votes).length;
    let rightCount = 0;
    let wrongCount = 0;

    Object.values(state.votes).forEach((v) => {
      if (v.option === 'right') rightCount++;
      if (v.option === 'wrong') wrongCount++;
    });

    const rightPct = totalVotes > 0 ? Math.round((rightCount / totalVotes) * 100) : 0;
    const wrongPct = totalVotes > 0 ? Math.round((wrongCount / totalVotes) * 100) : 0;

    container.innerHTML = `
      <div style="width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 24px;">
        <h2 style="text-align: center; font-size: 2rem;">Richtig / Falsch Auswertung</h2>
        <div style="display: flex; justify-content: space-around; font-size: 1.2rem; font-weight: bold;">
          <span>Gesamt-Stimmen: ${totalVotes}</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Richtig Bar -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: bold;">
              <span>🟢 Richtig (${rightCount})</span>
              <span>${rightPct}%</span>
            </div>
            <div class="poll-bar-track">
              <div class="poll-bar-fill" style="width: ${rightPct}%; background: #10b981;"></div>
            </div>
          </div>

          <!-- Falsch Bar -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: bold;">
              <span>🔴 Falsch (${wrongCount})</span>
              <span>${wrongPct}%</span>
            </div>
            <div class="poll-bar-track">
              <div class="poll-bar-fill" style="width: ${wrongPct}%; background: #ef4444;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderPollMode(state: SessionState, container: HTMLElement): void {
    const totalVotes = Object.keys(state.votes).length;
    const counts: Record<string, number> = {};

    state.settings.pollOptions.forEach((opt) => (counts[opt] = 0));

    Object.values(state.votes).forEach((v) => {
      if (counts[v.option] !== undefined) {
        counts[v.option]++;
      }
    });

    const chartHtml = state.settings.pollOptions
      .map((opt) => {
        const count = counts[opt] || 0;
        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        return `
        <div class="poll-bar-row">
          <div class="poll-option-label">${opt}</div>
          <div class="poll-bar-track">
            <div class="poll-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <div class="poll-val-count">${count} (${pct}%)</div>
        </div>
      `;
      })
      .join('');

    container.innerHTML = `
      <div class="poll-chart-container">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 12px;">${state.settings.pollTitle}</h2>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">
          Abgegebene Stimmen: ${totalVotes}
        </p>
        ${chartHtml}
      </div>
    `;
  }

  private renderSpeedMode(state: SessionState, container: HTMLElement): void {
    if (state.buzzes.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted);">
          <div style="font-size: 4rem; margin-bottom: 12px;">⏱️</div>
          <h2>Schnelligkeits-Messung</h2>
          <p style="margin-top: 8px;">Warte auf Reaktion der Schüler...</p>
        </div>
      `;
      return;
    }

    const rows = state.buzzes.map((buzz) => {
      const p = state.participants[buzz.participantId];
      if (!p) return '';
      const formattedTime = new Date(buzz.timestamp).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      });

      return `
        <tr style="border-bottom: 1px solid var(--border-color);">
          <td style="padding: 12px; font-weight: bold; font-size: 1.2rem;">#${buzz.order}</td>
          <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${p.color};"></div>
            <span style="font-weight: 700; font-size: 1.2rem;">${p.name}</span>
          </td>
          <td style="padding: 12px; font-family: monospace; font-size: 1.1rem; text-align: right;">${formattedTime}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="width: 100%; max-width: 700px;">
        <h2 style="text-align: center; margin-bottom: 16px;">Reihenfolge der Antworten</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
              <th style="padding: 12px;">Rang</th>
              <th style="padding: 12px;">Teilnehmer</th>
              <th style="padding: 12px; text-align: right;">Zeitstempel</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }
}
