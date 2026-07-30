import { SessionState, SessionSettings, SoundType } from '../types';
import { getDataService } from '../services/DataService';

export class SettingsModal {
  private container: HTMLElement | null = null;

  open(state: SessionState, onClose: () => void): void {
    this.close();

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const settings = state.settings;

    backdrop.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>⚙️ Lehrer-Einstellungen</h2>
          <button class="modal-close-btn" id="close-modal-btn">&times;</button>
        </div>

        <div class="settings-grid">
          <!-- Dark Mode -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Dunkelmodus (Dark Mode)</label>
              <span>Dunkles Farbschema aktivieren</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-darkmode" ${settings.darkMode ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Sound Type -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Buzzer-Sound</label>
              <span>Wähle den Ton für Reaktionen</span>
            </div>
            <select id="set-soundtype" style="padding: 8px 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
              <option value="none" ${settings.soundType === 'none' ? 'selected' : ''}>Kein Ton</option>
              <option value="beep" ${settings.soundType === 'beep' ? 'selected' : ''}>Piep</option>
              <option value="bell" ${settings.soundType === 'bell' ? 'selected' : ''}>Glocke</option>
              <option value="buzzer" ${settings.soundType === 'buzzer' ? 'selected' : ''}>Buzzer</option>
              <option value="fanfare" ${settings.soundType === 'fanfare' ? 'selected' : ''}>Fanfare</option>
            </select>
          </div>

          <!-- Confetti -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Konfetti-Animation</label>
              <span>Feuerwerk bei Gewinner</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-confetti" ${settings.confettiEnabled ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Auto Lock -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Automatische Sperre</label>
              <span>Sperrt Buzzer sofort nach der ersten Antwort</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-autolock" ${settings.autoLock ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Countdown Seconds -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Countdown-Dauer (Sekunden)</label>
              <span>Standardwert für Countdown vor Runden</span>
            </div>
            <input type="number" id="set-countdown" min="1" max="10" value="${settings.countdownSeconds}" style="width: 70px; padding: 6px; text-align: center;">
          </div>

          <!-- Visible Places -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Sichtbare Plätze</label>
              <span>Anzahl der Plätze auf der Ränge-Liste</span>
            </div>
            <input type="number" id="set-visibleplaces" min="1" max="20" value="${settings.visiblePlaces}" style="width: 70px; padding: 6px; text-align: center;">
          </div>

          <!-- Poll Title & Options -->
          <div class="setting-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <div class="setting-info">
              <label>Umfrage-Optionen (Komma-getrennt)</label>
              <span>Beispiel: A, B, C, D oder Ja, Nein, Enthaltung</span>
            </div>
            <input type="text" id="set-polloptions" value="${settings.pollOptions.join(', ')}" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
          <button class="btn btn-secondary" id="cancel-settings-btn">Abbrechen</button>
          <button class="btn btn-success" id="save-settings-btn">Speichern</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.container = backdrop;

    // Event listeners
    backdrop.querySelector('#close-modal-btn')?.addEventListener('click', () => this.close());
    backdrop.querySelector('#cancel-settings-btn')?.addEventListener('click', () => this.close());

    backdrop.querySelector('#save-settings-btn')?.addEventListener('click', async () => {
      const soundType = (backdrop.querySelector('#set-soundtype') as HTMLSelectElement).value as SoundType;
      const darkMode = (backdrop.querySelector('#set-darkmode') as HTMLInputElement).checked;
      const confettiEnabled = (backdrop.querySelector('#set-confetti') as HTMLInputElement).checked;
      const autoLock = (backdrop.querySelector('#set-autolock') as HTMLInputElement).checked;
      const countdownSeconds = parseInt((backdrop.querySelector('#set-countdown') as HTMLInputElement).value, 10) || 3;
      const visiblePlaces = parseInt((backdrop.querySelector('#set-visibleplaces') as HTMLInputElement).value, 10) || 5;

      const rawPoll = (backdrop.querySelector('#set-polloptions') as HTMLInputElement).value;
      const pollOptions = rawPoll.split(',').map((s) => s.trim()).filter((s) => s.length > 0);

      const updated: Partial<SessionSettings> = {
        soundType,
        soundEnabled: soundType !== 'none',
        darkMode,
        confettiEnabled,
        autoLock,
        countdownSeconds,
        visiblePlaces,
        pollOptions: pollOptions.length > 0 ? pollOptions : ['A', 'B', 'C', 'D'],
      };

      if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      await getDataService().updateSettings(state.code, updated);
      onClose();
      this.close();
    });
  }

  close(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
