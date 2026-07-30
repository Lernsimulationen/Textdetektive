import './styles/main.css';
import './styles/teacher.css';
import './styles/student.css';
import './styles/components.css';

import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentView } from './components/StudentView';

// Register PWA Service Worker if supported
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}

function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const joinCode = urlParams.get('join') || urlParams.get('code');
  const modeParam = urlParams.get('mode');

  if (joinCode || modeParam === 'student') {
    const studentView = new StudentView();
    studentView.init(appContainer, joinCode || undefined);
    return;
  }

  if (modeParam === 'teacher') {
    const teacherDashboard = new TeacherDashboard();
    teacherDashboard.init(appContainer);
    return;
  }

  // Default Home Choice Screen
  appContainer.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div class="card" style="max-width: 520px; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h1 style="font-size: 2.2rem; background: linear-gradient(135deg, var(--accent-color), #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Classroom Buzzer
          </h1>
          <p style="color: var(--text-muted); margin-top: 6px;">
            Die moderne, datenschutzfreundliche Buzzer-Plattform für den Unterricht.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <button class="btn btn-lg" id="btn-start-teacher" style="padding: 20px; font-size: 1.2rem;">
            👨‍🏫 Lehrer-Dashboard Starten
          </button>
          <button class="btn btn-lg btn-secondary" id="btn-start-student" style="padding: 20px; font-size: 1.2rem;">
            📱 Schüler-Ansicht Öffnen
          </button>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 16px; font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-around;">
          <span>✓ 100% Offline (PWA)</span>
          <span>✓ Keine Cookies & Tracking</span>
          <span>✓ Supabase-ready</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-start-teacher')?.addEventListener('click', () => {
    const teacherDashboard = new TeacherDashboard();
    teacherDashboard.init(appContainer);
  });

  document.getElementById('btn-start-student')?.addEventListener('click', () => {
    const studentView = new StudentView();
    studentView.init(appContainer);
  });
}

document.addEventListener('DOMContentLoaded', initApp);
