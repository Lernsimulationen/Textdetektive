import { SessionState, Participant } from '../types';
import { getDataService } from '../services/DataService';
import { GroupNameGenerator, CREATIVE_GROUP_NAMES } from '../services/GroupNameGenerator';

export class StudentView {
  private currentCode: string | null = null;
  private currentParticipant: Participant | null = null;
  private unsubscribe: (() => void) | null = null;

  async init(container: HTMLElement, defaultCode?: string): Promise<void> {
    this.currentCode = defaultCode ? defaultCode.toUpperCase() : null;

    // Check if participant already stored in session
    const storedPart = sessionStorage.getItem('cb_participant');
    if (storedPart && this.currentCode) {
      try {
        this.currentParticipant = JSON.parse(storedPart) as Participant;
      } catch (e) {
        console.error(e);
      }
    }

    if (this.currentParticipant && this.currentCode) {
      this.subscribeAndRender(container);
    } else {
      this.renderJoinForm(container);
    }
  }

  private async renderJoinForm(container: HTMLElement): Promise<void> {
    const dataService = getDataService();
    let initialGroupMode = false;

    if (this.currentCode) {
      const state = await dataService.getState(this.currentCode);
      if (state && state.groupMode === 'group') {
        initialGroupMode = true;
      }
    }

    const groupOptionsHtml = CREATIVE_GROUP_NAMES.map(
      (g) => `<option value="${g}">${g}</option>`
    ).join('');

    container.innerHTML = `
      <div class="student-container">
        <div class="card join-card">
          <div class="join-title">
            <h1>Classroom Buzzer</h1>
            <p style="color: var(--text-muted);">Sitzung beitreten</p>
          </div>

          <form id="join-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label for="input-code">Sitzungscode (4 Zeichen)</label>
              <input type="text" id="input-code" class="form-input" maxlength="4" placeholder="z. B. B7K2" value="${this.currentCode || ''}" required>
            </div>

            <!-- Single Mode Name Input (max 3 chars) -->
            <div class="form-group" id="group-single-input" style="${initialGroupMode ? 'display: none;' : ''}">
              <label for="input-name">Deine Initialen / Kürzel (max. 3 Zeichen)</label>
              <input type="text" id="input-name" class="form-input" maxlength="3" placeholder="z. B. ABC" ${!initialGroupMode ? 'required' : ''}>
            </div>

            <!-- Group Mode Selector -->
            <div class="form-group" id="group-select-input" style="${!initialGroupMode ? 'display: none;' : ''}">
              <label for="select-group">Wähle deinen Gruppennamen</label>
              <div class="group-selection-row">
                <select id="select-group">
                  ${groupOptionsHtml}
                </select>
                <button type="button" class="btn btn-secondary" id="btn-random-group" title="Zufälliger Gruppenname">🎲 Zufall</button>
              </div>
            </div>

            <div id="join-error" style="color: var(--danger-color); font-weight: bold; min-height: 24px;"></div>

            <button type="submit" class="btn btn-lg" style="width: 100%; margin-top: 10px;">
              🚀 Beitreten
            </button>
          </form>
        </div>
      </div>
    `;

    // Code input listener to adapt Single vs Group mode dynamically
    const codeInput = container.querySelector('#input-code') as HTMLInputElement;
    codeInput?.addEventListener('input', async () => {
      const codeVal = codeInput.value.trim().toUpperCase();
      if (codeVal.length === 4) {
        const state = await dataService.getState(codeVal);
        if (state) {
          const singleEl = container.querySelector('#group-single-input') as HTMLElement;
          const selectEl = container.querySelector('#group-select-input') as HTMLElement;
          const nameInput = container.querySelector('#input-name') as HTMLInputElement;

          if (state.groupMode === 'group') {
            singleEl.style.display = 'none';
            selectEl.style.display = 'block';
            nameInput.removeAttribute('required');
          } else {
            singleEl.style.display = 'block';
            selectEl.style.display = 'none';
            nameInput.setAttribute('required', 'true');
          }
        }
      }
    });

    // Random Group Roll Button
    container.querySelector('#btn-random-group')?.addEventListener('click', () => {
      const selectEl = container.querySelector('#select-group') as HTMLSelectElement;
      if (selectEl) {
        const randomName = GroupNameGenerator.getRandomName();
        selectEl.value = randomName;
      }
    });

    // Submit Join Form
    container.querySelector('#join-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = container.querySelector('#join-error');
      if (errEl) errEl.textContent = '';

      const codeVal = (container.querySelector('#input-code') as HTMLInputElement).value.trim().toUpperCase();
      const singleEl = container.querySelector('#group-single-input') as HTMLElement;
      const isGroup = singleEl.style.display === 'none';

      let nameVal = '';
      if (isGroup) {
        nameVal = (container.querySelector('#select-group') as HTMLSelectElement).value;
      } else {
        nameVal = (container.querySelector('#input-name') as HTMLInputElement).value.trim().toUpperCase().slice(0, 3);
      }

      try {
        const participant = await dataService.joinSession(codeVal, nameVal, isGroup);
        this.currentCode = codeVal;
        this.currentParticipant = participant;
        sessionStorage.setItem('cb_participant', JSON.stringify(participant));
        this.subscribeAndRender(container);
      } catch (err: unknown) {
        if (errEl) {
          errEl.textContent = err instanceof Error ? err.message : 'Fehler beim Beitreten';
        }
      }
    });
  }

  private subscribeAndRender(container: HTMLElement): void {
    if (!this.currentCode || !this.currentParticipant) return;

    const dataService = getDataService();
    if (this.unsubscribe) this.unsubscribe();

    this.unsubscribe = dataService.subscribeToState(this.currentCode, (state) => {
      this.renderStage(container, state);
    });
  }

  private renderStage(container: HTMLElement, state: SessionState): void {
    if (!this.currentParticipant) return;

    const p = this.currentParticipant;

    // Check if student buzzed or voted
    const hasBuzzed = state.buzzes.some((b) => b.participantId === p.id);
    const vote = state.votes[p.id];
    const isLocked = state.isLocked || (state.settings.autoLock && state.buzzes.length > 0);

    container.innerHTML = `
      <div class="student-container">
        <!-- Student Header -->
        <header class="student-header-info">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${p.color}; border: 2px solid white;"></div>
            <strong style="font-size: 1.2rem;">${p.name}</strong>
          </div>
          <div class="badge">Code: ${state.code}</div>
        </header>

        <!-- Main Stage depending on mode -->
        <main class="student-stage">
          ${this.renderModeControls(state, hasBuzzed, vote, isLocked)}
        </main>
      </div>
    `;

    this.bindStageEvents(container, state, p);
  }

  private renderModeControls(
    state: SessionState,
    hasBuzzed: boolean,
    vote: { participantId: string; option: string } | undefined,
    isLocked: boolean
  ): string {
    if (state.countdown !== null) {
      return `
        <div style="text-align: center;">
          <div style="font-size: 5rem; font-weight: 900; color: var(--accent-color);">${state.countdown}</div>
          <p style="font-size: 1.2rem; color: var(--text-muted); font-weight: bold;">Achtung... Bereitmachen!</p>
        </div>
      `;
    }

    switch (state.mode) {
      case 'buzzer':
      case 'speed': {
        const disabled = isLocked || hasBuzzed;
        return `
          <div class="buzzer-button-wrapper">
            <button class="huge-buzzer" id="btn-student-buzz" ${disabled ? 'disabled' : ''}>
              ${hasBuzzed ? 'GEBUZZERT!' : isLocked ? 'GESPERRT' : 'BUZZER'}
            </button>
          </div>
          <div class="status-feedback-box ${hasBuzzed ? 'sent' : ''}">
            ${
              hasBuzzed
                ? '✅ Antwort gesendet!'
                : isLocked
                ? '🔒 Warten auf Freigabe der Lehrkraft...'
                : '👉 Drücke den Buzzer so schnell du kannst!'
            }
          </div>
        `;
      }

      case 'right_wrong': {
        return `
          <div class="choices-grid">
            <button class="choice-btn choice-btn-right" data-vote="right" ${isLocked ? 'disabled' : ''}>
              <span>🟢</span>
              <span>Richtig</span>
            </button>
            <button class="choice-btn choice-btn-wrong" data-vote="wrong" ${isLocked ? 'disabled' : ''}>
              <span>🔴</span>
              <span>Falsch</span>
            </button>
          </div>
          <div class="status-feedback-box ${vote ? 'sent' : ''}">
            ${vote ? `✅ Du hast für "${vote.option === 'right' ? 'Richtig' : 'Falsch'}" gestimmt.` : 'Wähle Richtig oder Falsch'}
          </div>
        `;
      }

      case 'poll': {
        const optionButtons = state.settings.pollOptions
          .map(
            (opt) => `
          <button class="choice-btn choice-btn-option ${vote && vote.option === opt ? 'selected' : ''}" data-vote="${opt}" ${isLocked ? 'disabled' : ''}>
            ${opt}
          </button>
        `
          )
          .join('');

        return `
          <div style="width: 100%;">
            <h2 style="text-align: center; margin-bottom: 20px;">${state.settings.pollTitle}</h2>
            <div class="choices-grid">
              ${optionButtons}
            </div>
          </div>
          <div class="status-feedback-box ${vote ? 'sent' : ''}">
            ${vote ? `✅ Option "${vote.option}" gewählt.` : 'Wähle eine Option'}
          </div>
        `;
      }
    }
  }

  private bindStageEvents(container: HTMLElement, state: SessionState, p: Participant): void {
    const ds = getDataService();

    // Buzzer Button Event
    const buzzerBtn = container.querySelector('#btn-student-buzz');
    if (buzzerBtn) {
      buzzerBtn.addEventListener('click', async () => {
        if (!this.currentCode) return;

        // Haptic feedback vibration
        if (state.settings.vibrationEnabled && 'vibrate' in navigator) {
          try {
            navigator.vibrate([50, 50, 100]);
          } catch (e) {
            console.warn(e);
          }
        }

        await ds.submitBuzz(this.currentCode, p.id);
      });
    }

    // Voting Choice Buttons Event
    container.querySelectorAll('button[data-vote]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const voteOpt = btn.getAttribute('data-vote');
        if (!this.currentCode || !voteOpt) return;

        if (state.settings.vibrationEnabled && 'vibrate' in navigator) {
          try {
            navigator.vibrate(60);
          } catch (e) {
            console.warn(e);
          }
        }

        await ds.submitVote(this.currentCode, p.id, voteOpt);
      });
    });
  }
}
