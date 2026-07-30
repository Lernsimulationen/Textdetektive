import { SessionState, SessionMode, GroupMode } from '../types';
import { getDataService } from '../services/DataService';
import { QRCodeService } from '../services/QRCodeService';
import { SmartboardDisplay } from './SmartboardDisplay';
import { SettingsModal } from './SettingsModal';
import { COLOR_PALETTE } from '../services/GroupNameGenerator';

export class TeacherDashboard {
  private smartboard: SmartboardDisplay = new SmartboardDisplay();
  private settingsModal: SettingsModal = new SettingsModal();
  private currentCode: string | null = null;
  private unsubscribe: (() => void) | null = null;

  async init(container: HTMLElement, code?: string): Promise<void> {
    const dataService = getDataService();

    let state: SessionState | null = null;
    if (code) {
      state = await dataService.getState(code);
    }

    if (!state) {
      state = await dataService.createSession('buzzer');
    }

    this.currentCode = state.code;

    // Apply dark mode if enabled in settings
    if (state.settings.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    this.renderSkeleton(container, state);
    this.setupKeyboardShortcuts();

    // Subscribe to state updates
    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = dataService.subscribeToState(this.currentCode, (newState) => {
      this.update(newState, container);
    });
  }

  private renderSkeleton(container: HTMLElement, state: SessionState): void {
    container.innerHTML = `
      <div class="teacher-layout">
        <!-- Header Topbar -->
        <header class="teacher-header">
          <div class="teacher-title-group">
            <h1>Classroom Buzzer</h1>
            <span class="badge" id="round-badge">Runde ${state.roundNumber}</span>
          </div>

          <!-- Mode Nav Switcher -->
          <nav class="mode-nav" id="mode-nav">
            <button data-mode="buzzer" class="${state.mode === 'buzzer' ? 'active' : ''}">Buzzer</button>
            <button data-mode="right_wrong" class="${state.mode === 'right_wrong' ? 'active' : ''}">Richtig / Falsch</button>
            <button data-mode="poll" class="${state.mode === 'poll' ? 'active' : ''}">Umfrage</button>
            <button data-mode="speed" class="${state.mode === 'speed' ? 'active' : ''}">Schnelligkeit</button>
          </nav>

          <!-- Topbar Action Buttons -->
          <div class="header-actions">
            <button class="btn btn-secondary" id="btn-group-toggle">
              ${state.groupMode === 'group' ? '👥 Gruppenmodus' : '👤 Einzelmodus'}
            </button>
            <button class="btn btn-secondary" id="btn-fullscreen" title="Vollbild (F)">🖥️</button>
            <button class="btn btn-secondary" id="btn-settings" title="Einstellungen">⚙️</button>
            <button class="btn btn-secondary" id="btn-export-csv" title="Ergebnisse als CSV exportieren">📥 CSV</button>
          </div>
        </header>

        <!-- Main Dashboard Grid -->
        <main class="dashboard-grid">
          <!-- Left Column: Session Info & QR Code -->
          <section class="card session-info-card">
            <h2>Sitzung Beitreten</h2>
            <div class="qr-code-wrapper" id="qr-code-container">
              <!-- QR Code rendered here -->
            </div>
            <div class="session-code-display">
              <span>Sitzungscode</span>
              <div class="session-code-value">${state.code}</div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              Schüler scannen QR-Code oder tippen Code ein.
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 10px;">
              <button class="btn btn-secondary" id="btn-regen-qr">QR-Code neu erzeugen</button>
            </div>
          </section>

          <!-- Center Column: Smartboard Stage & Controls -->
          <section style="display: flex; flex-direction: column; gap: 16px;">
            <!-- Stage Controls -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="btn btn-lg ${state.isLocked ? 'btn-success' : 'btn-danger'}" id="btn-lock-toggle" style="flex: 1;">
                ${state.isLocked ? '🔓 Buzzer Freigeben (Space)' : '🔒 Buzzer Sperren (Space)'}
              </button>
              <button class="btn btn-lg btn-secondary" id="btn-countdown">⏱️ Countdown (C)</button>
              <button class="btn btn-lg btn-secondary" id="btn-reset-round">🔄 Neue Runde (R)</button>
              <button class="btn btn-lg btn-secondary" id="btn-clear-results">🧹 Leeren</button>
            </div>

            <!-- Smartboard Stage Container -->
            <div id="smartboard-container"></div>
          </section>

          <!-- Right Column: Participant List & Leaderboard -->
          <section class="card" style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2>Teilnehmer (<span id="participant-count">0</span>)</h2>
            </div>
            <div class="participant-list" id="participant-list-container">
              <!-- Participants injected here -->
            </div>
          </section>
        </main>
      </div>
    `;

    this.renderQRCode(state.code, container);
    this.smartboard.render(state, container.querySelector('#smartboard-container') as HTMLElement);
    this.renderParticipantList(state, container);
    this.bindEvents(container, state);
  }

  private update(state: SessionState, container: HTMLElement): void {
    const roundBadge = container.querySelector('#round-badge');
    if (roundBadge) roundBadge.textContent = `Runde ${state.roundNumber}`;

    const lockBtn = container.querySelector('#btn-lock-toggle');
    if (lockBtn) {
      lockBtn.className = `btn btn-lg ${state.isLocked ? 'btn-success' : 'btn-danger'}`;
      lockBtn.textContent = state.isLocked ? '🔓 Buzzer Freigeben (Space)' : '🔒 Buzzer Sperren (Space)';
    }

    const groupToggle = container.querySelector('#btn-group-toggle');
    if (groupToggle) {
      groupToggle.textContent = state.groupMode === 'group' ? '👥 Gruppenmodus' : '👤 Einzelmodus';
    }

    // Update Mode Nav Active
    const navButtons = container.querySelectorAll('#mode-nav button');
    navButtons.forEach((btn) => {
      const mode = btn.getAttribute('data-mode');
      if (mode === state.mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const smartboardEl = container.querySelector('#smartboard-container') as HTMLElement;
    if (smartboardEl) {
      this.smartboard.render(state, smartboardEl);
    }

    this.renderParticipantList(state, container);
  }

  private async renderQRCode(code: string, container: HTMLElement): Promise<void> {
    const qrContainer = container.querySelector('#qr-code-container');
    if (!qrContainer) return;

    // Direct link URL for scanning students
    const joinUrl = `${window.location.origin}${window.location.pathname}?join=${code}`;
    const svg = await QRCodeService.generateSVG(joinUrl);
    qrContainer.innerHTML = svg;
  }

  private renderParticipantList(state: SessionState, container: HTMLElement): void {
    const listContainer = container.querySelector('#participant-list-container');
    const countEl = container.querySelector('#participant-count');
    if (!listContainer) return;

    const participants = Object.values(state.participants);
    if (countEl) countEl.textContent = participants.length.toString();

    if (participants.length === 0) {
      listContainer.innerHTML = `
        <p style="text-align: center; color: var(--text-muted); padding: 20px 0;">
          Noch keine Schüler beigetreten.
        </p>
      `;
      return;
    }

    listContainer.innerHTML = participants
      .map((p) => `
        <div class="participant-item" style="border-left-color: ${p.color};">
          <div class="participant-info">
            <div class="participant-avatar" style="background-color: ${p.color};">
              ${p.name.slice(0, 2)}
            </div>
            <div>
              <div class="participant-name">${p.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Punkte: <strong>${p.score}</strong></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="score-controls">
              <button data-action="score-minus" data-id="${p.id}">-</button>
              <button data-action="score-plus" data-id="${p.id}">+</button>
            </div>
            <button class="btn btn-secondary" data-action="change-color" data-id="${p.id}" style="padding: 4px 8px; font-size: 0.8rem;" title="Farbe ändern">🎨</button>
            <button class="btn btn-danger" data-action="remove-student" data-id="${p.id}" style="padding: 4px 8px; font-size: 0.8rem;" title="Entfernen">&times;</button>
          </div>
        </div>
      `)
      .join('');

    // Bind action listeners inside participant list
    listContainer.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const action = target.getAttribute('data-action');
        const pId = target.getAttribute('data-id');
        if (!pId || !this.currentCode) return;

        const ds = getDataService();
        if (action === 'score-plus') {
          await ds.updateScore(this.currentCode, pId, 1);
        } else if (action === 'score-minus') {
          await ds.updateScore(this.currentCode, pId, -1);
        } else if (action === 'remove-student') {
          await ds.removeParticipant(this.currentCode, pId);
        } else if (action === 'change-color') {
          const nextColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
          await ds.setParticipantColor(this.currentCode, pId, nextColor);
        }
      });
    });
  }

  private bindEvents(container: HTMLElement, state: SessionState): void {
    const ds = getDataService();

    // Mode Nav Buttons
    container.querySelectorAll('#mode-nav button').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const mode = btn.getAttribute('data-mode') as SessionMode;
        if (mode && this.currentCode) {
          await ds.setMode(this.currentCode, mode);
        }
      });
    });

    // Group Mode Toggle
    container.querySelector('#btn-group-toggle')?.addEventListener('click', async () => {
      if (!this.currentCode) return;
      const nextGroupMode: GroupMode = state.groupMode === 'group' ? 'individual' : 'group';
      await ds.setGroupMode(this.currentCode, nextGroupMode);
    });

    // Lock / Unlock Toggle
    container.querySelector('#btn-lock-toggle')?.addEventListener('click', async () => {
      if (this.currentCode) await ds.toggleLock(this.currentCode);
    });

    // Countdown
    container.querySelector('#btn-countdown')?.addEventListener('click', async () => {
      if (this.currentCode) await ds.startCountdown(this.currentCode, state.settings.countdownSeconds);
    });

    // Reset Round
    container.querySelector('#btn-reset-round')?.addEventListener('click', async () => {
      if (this.currentCode) await ds.resetRound(this.currentCode);
    });

    // Clear Results
    container.querySelector('#btn-clear-results')?.addEventListener('click', async () => {
      if (this.currentCode) await ds.clearResults(this.currentCode);
    });

    // Regenerate QR
    container.querySelector('#btn-regen-qr')?.addEventListener('click', async () => {
      const newState = await ds.createSession(state.mode);
      this.init(container, newState.code);
    });

    // Fullscreen
    container.querySelector('#btn-fullscreen')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });

    // Settings Modal
    container.querySelector('#btn-settings')?.addEventListener('click', async () => {
      if (!this.currentCode) return;
      const curState = await ds.getState(this.currentCode);
      if (curState) {
        this.settingsModal.open(curState, () => {
          // Callback on saved
        });
      }
    });

    // CSV Export
    container.querySelector('#btn-export-csv')?.addEventListener('click', async () => {
      if (!this.currentCode) return;
      const curState = await ds.getState(this.currentCode);
      if (curState) this.exportCSV(curState);
    });
  }

  private setupKeyboardShortcuts(): void {
    window.onkeydown = async (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!this.currentCode) return;
      const ds = getDataService();

      if (e.code === 'Space') {
        e.preventDefault();
        await ds.toggleLock(this.currentCode);
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        const st = await ds.getState(this.currentCode);
        if (st) await ds.startCountdown(this.currentCode, st.settings.countdownSeconds);
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        await ds.resetRound(this.currentCode);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        this.toggleFullscreen();
      }
    };
  }

  private toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  private exportCSV(state: SessionState): void {
    const rows = [
      ['Sitzungscode', state.code],
      ['Runde', state.roundNumber.toString()],
      ['Modus', state.mode],
      [''],
      ['Teilnehmer Name', 'Farbe', 'Punkte', 'Buzzer Rang', 'Antwort/Wahl'],
    ];

    Object.values(state.participants).forEach((p) => {
      const buzz = state.buzzes.find((b) => b.participantId === p.id);
      const vote = state.votes[p.id];
      rows.push([
        p.name,
        p.color,
        p.score.toString(),
        buzz ? buzz.order.toString() : '-',
        vote ? vote.option : '-',
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((r) => r.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Classroom_Buzzer_${state.code}_Runde_${state.roundNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
