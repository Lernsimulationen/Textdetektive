/* ----------------------------------------------------
   APPLICATION LOGIC - KI: MENSCH UND VERANTWORTUNG
   Modulare Lernplattform & Datenschutz-System
   ---------------------------------------------------- */

// Module Data Definitions
const MODULES = [
  {
    id: 1,
    category: "Modul 1 • KI-Ethik & Menschliche Kontrolle",
    title: "Menschliche Autonomie & Human-in-the-Loop",
    image: "assets/images/hero.jpg",
    content: `
      <h3>1. Das Verhältnis von Mensch und Künstlicher Intelligenz</h3>
      <p>Künstliche Intelligenz (KI) nimmt zunehmend Einfluss auf Entscheidungen in Medizin, Arbeitsmarkt und Recht. Eine Kernfrage der KI-Ethik lautet: <strong>Wer behält die Letztentscheidung?</strong></p>
      
      <div class="highlight-box">
        <h4>💡 Das "Human-in-the-Loop" Prinzip</h4>
        <p>Ein ethisches KI-System sollte den Menschen nicht ersetzen, sondern als Werkzeug unterstützen. Bei kritischen Entscheidungen (z. B. Diagnosen oder Kreditvergaben) muss immer ein Mensch die Kontrolle und Verantwortung behalten.</p>
      </div>

      <h3>2. HTML-Praxis: Barrierefreie & semantische HTML-Struktur</h3>
      <p>Ethische Verantwortung in der Webentwicklung bedeutet auch <strong>Inklusion</strong>. Mit semantischem HTML stellen wir sicher, dass Inhalte für alle Menschen und Assistenzsysteme (Screenreader) zugänglich sind.</p>

      <div class="playground-container">
        <div class="playground-header">
          <span>💻 Interaktives HTML-Lab: Semantische Tags</span>
          <button class="btn-secondary" onclick="resetCode(1)">Code zurücksetzen</button>
        </div>
        <div class="playground-grid">
          <textarea id="code-input-1" class="code-input-area" oninput="updatePreview(1)"><article aria-label="KI Ethik Deklaration">
  <h2>Ethik-Richtlinie 1: Menschliche Autonomie</h2>
  <p>KI-Systeme müssen so gestaltet sein, dass sie die menschliche Würde achten.</p>
  <button aria-label="Richtlinie bestätigen">Zustimmen</button>
</article></textarea>
          <div id="code-preview-1" class="code-preview-area"></div>
        </div>
      </div>
    `,
    quiz: {
      question: "Was besagt das 'Human-in-the-Loop' Prinzip in der KI-Ethik?",
      options: [
        { text: "A) KI-Systeme müssen komplett ohne menschliche Eingriffe arbeiten.", correct: false },
        { text: "B) Ein Mensch behält die Letztentscheidung und Kontrolle bei kritischen Beschlüssen.", correct: true },
        { text: "C) Menschen müssen KI-Modelle durch ständiges Tippen am Laufen halten.", correct: false },
        { text: "D) KI ersetzt den Menschen in allen Führungsentscheidungen.", correct: false }
      ],
      explanation: "Richtig! Human-in-the-Loop bedeutet, dass bei ethisch relevanten Beschlüssen stets ein menschlicher Experten-Check erforderlich ist."
    }
  },
  {
    id: 2,
    category: "Modul 2 • Datenschutz & Digitale Selbstbestimmung",
    title: "Datenschutz nach DSGVO & Datenminimalismus",
    image: "assets/images/privacy.jpg",
    content: `
      <h3>1. Warum ist Datenschutz bei KI entscheidend?</h3>
      <p>KI-Systeme werden mit gigantischen Datenmengen trainiert. Wenn personenbezogene Daten ohne Einwilligung verarbeitet werden, drohen Grundrechtsverletzungen. Das Prinzip des <strong>Datenminimalismus</strong> besagt: Verarbeite nur so viele Daten wie absolut notwendig!</p>
      
      <div class="highlight-box privacy-theme">
        <h4>🔒 Privacy by Design in dieser Lernplattform</h4>
        <p>Diese Plattform speichert Ihren Lernfortschritt ausschließlich <strong>lokal in Ihrem Browser (LocalStorage)</strong>. Es werden keine Server-Tracking-Cookies oder Analyse-Skripte eingesetzt.</p>
      </div>

      <h3>2. HTML-Praxis: Datenschutzkonforme Formulare</h3>
      <p>Formulare in HTML müssen Nutzer klar informieren und explizite Einwilligungen (Opt-in) einholen.</p>

      <div class="playground-container">
        <div class="playground-header">
          <span>💻 Interaktives HTML-Lab: DSGVO-Formular</span>
          <button class="btn-secondary" onclick="resetCode(2)">Code zurücksetzen</button>
        </div>
        <div class="playground-grid">
          <textarea id="code-input-2" class="code-input-area" oninput="updatePreview(2)"><form style="font-family: sans-serif;">
  <label for="username">Pseudonym:</label><br>
  <input type="text" id="username" required autocomplete="off"><br><br>
  
  <input type="checkbox" id="privacy-consent" required>
  <label for="privacy-consent">Ich stimme der lokalen Datenspeicherung zu.</label><br><br>
  
  <button type="submit">Daten anonym senden</button>
</form></textarea>
          <div id="code-preview-2" class="code-preview-area"></div>
        </div>
      </div>
    `,
    quiz: {
      question: "Was versteht man unter 'Datenminimalismus' bei KI-Anwendungen?",
      options: [
        { text: "A) Dass KI-Modelle auf möglichst kleinen Computern ausgeführt werden.", correct: false },
        { text: "B) Es dürfen nur Daten verarbeitet werden, die für den Zweck zwingend nötig sind.", correct: true },
        { text: "C) Die Speicherkapazität der Festplatte wird künstlich verringert.", correct: false },
        { text: "D) Daten werden nach 5 Minuten automatisch im Internet veröffentlicht.", correct: false }
      ],
      explanation: "Exakt! Datenminimalismus schützt die Privatsphäre, indem unnötige Datensammlungen vermieden werden."
    }
  },
  {
    id: 3,
    category: "Modul 3 • Algorithmen-Transparenz & Bias-Vermeidung",
    title: "Verzerrungen (Bias) & Nachvollziehbarkeit",
    image: "assets/images/bias.jpg",
    content: `
      <h3>1. Wie entstehen Vorurteile (Bias) in der KI?</h3>
      <p>KI-Modelle lernen aus historischen Daten. Wenn diese Trainingsdaten Diskriminierungen oder Lücken enthalten, übernimmt die KI diese Fehler. Man spricht von <strong>Algorithmic Bias</strong>.</p>

      <div class="highlight-box">
        <h4>⚖️ Das Transparenzgebot</h4>
        <p>Betroffene Personen müssen nachvollziehen können, nach welchen Kriterien eine KI eine Entscheidung getroffen hat (Explainable AI / XAI).</p>
      </div>

      <h3>2. HTML-Praxis: Interaktive Transparenz-Elemente</h3>
      <p>In HTML lässt sich Transparenz hervorragend mit dem <code>&lt;details&gt;</code>-Tag strukturieren, damit Nutzer Erklärungsebenen selbst aufklappen können.</p>

      <div class="playground-container">
        <div class="playground-header">
          <span>💻 Interaktives HTML-Lab: Transparenz-Akkordeon</span>
          <button class="btn-secondary" onclick="resetCode(3)">Code zurücksetzen</button>
        </div>
        <div class="playground-grid">
          <textarea id="code-input-3" class="code-input-area" oninput="updatePreview(3)"><details style="font-family: sans-serif; border: 1px solid #ccc; padding: 8px; border-radius: 6px;">
  <summary style="font-weight: bold; cursor: pointer;">🔍 Wie wurde dieses Ergebnis berechnet?</summary>
  <p style="margin-top: 8px;">Die KI hat folgende Parameter berücksichtigt:</p>
  <ul>
    <li>Faktencheck-Score: 98%</li>
    <li>Quelle: Verifizierte Studien</li>
  </ul>
</details></textarea>
          <div id="code-preview-3" class="code-preview-area"></div>
        </div>
      </div>
    `,
    quiz: {
      question: "Warum ist Algorithmic Bias (Verzerrung) in KI-Systemen gefährlich?",
      options: [
        { text: "A) Weil es die Rechengeschwindigkeit der Prozessoren verlangsamt.", correct: false },
        { text: "B) Weil KI dadurch unbemerkt bestehende gesellschaftliche Diskriminierungen verstärken kann.", correct: true },
        { text: "C) Bias führt dazu, dass Monitore falsch leuchten.", correct: false },
        { text: "D) Es betrifft nur Grafikgenerierung, keine echten Menschen.", correct: false }
      ],
      explanation: "Ausgezeichnet! Wenn Trainingsdaten fehlerhaft oder einseitig sind, werden Benachteiligungen automatisiert fortgeführt."
    }
  },
  {
    id: 4,
    category: "Modul 4 • Verantwortung, Deepfakes & EU AI Act",
    title: "Kennzeichnungspflicht & Medienverantwortung",
    image: "assets/images/responsibility.jpg",
    content: `
      <h3>1. Deepfakes und Kennzeichnungspflicht</h3>
      <p>Generative KI kann fotorealistische Bilder, Stimmen und Videos erzeugen. Ohne Transparenz droht der Verlust des Vertrauens in Medien. Der <strong>EU AI Act</strong> schreibt daher vor, dass synthetische Inhalte klar gekennzeichnet werden müssen.</p>

      <div class="highlight-box">
        <h4>🚨 Transparenz für KI-Generierte Medien</h4>
        <p>Nutzer müssen auf den ersten Blick erkennen können, ob ein Bild oder Text von einem KI-Modell erschaffen wurde.</p>
      </div>

      <h3>2. HTML-Praxis: Kennzeichnung mit HTML5 <code>&lt;figure&gt;</code> & Data-Attributen</h3>
      <p>Mit HTML5 können wir Medien mit Metadaten und visuellen Labels versehen.</p>

      <div class="playground-container">
        <div class="playground-header">
          <span>💻 Interaktives HTML-Lab: KI-Medienkennzeichnung</span>
          <button class="btn-secondary" onclick="resetCode(4)">Code zurücksetzen</button>
        </div>
        <div class="playground-grid">
          <textarea id="code-input-4" class="code-input-area" oninput="updatePreview(4)"><figure style="font-family: sans-serif; text-align: center; border: 1px dashed #6366f1; padding: 10px;">
  <span style="background: #6366f1; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">🤖 KI-Generiert</span>
  <p style="margin-top: 10px;">[Symbolisches Bild der KI-Verantwortung]</p>
  <figcaption style="font-size: 12px; color: #555;">Bild generiert mit Bild-KI (Antigravity-Engine)</figcaption>
</figure></textarea>
          <div id="code-preview-4" class="code-preview-area"></div>
        </div>
      </div>
    `,
    quiz: {
      question: "Welche Pflicht sieht der EU AI Act für KI-generierte Inhalte vor?",
      options: [
        { text: "A) Generierte Bilder müssen nach 24 Stunden gelöscht werden.", correct: false },
        { text: "B) KI-Inhalte müssen für Nutzer klar als solche gekennzeichnet werden.", correct: true },
        { text: "C) KI-Bilder dürfen nur in Schwarz-Weiß gedruckt werden.", correct: false },
        { text: "D) Es gibt keine Vorgaben für KI-Medien.", correct: false }
      ],
      explanation: "Korrekt! Transparenz ist essenziell, damit Verwirrung und Täuschung vermieden werden."
    }
  },
  {
    id: 5,
    category: "Modul 5 • Praxis-Lab & Abschluss-Zertifikat",
    title: "Der HTML-Ehrenkodex für Verantwortung in der KI",
    image: "assets/images/hero.jpg",
    content: `
      <h3>1. Ihr persönlicher Verhaltenskodex</h3>
      <p>Herzlichen Glückwunsch zur Erreichung des finalen Moduls! Hier verfassen Sie Ihren eigenen <strong>HTML-Verhaltenskodex für ethischen KI-Einsatz</strong>.</p>
      <p>Fügen Sie dem folgenden HTML-Dokument Ihre eigenen Grundsätze hinzu!</p>

      <div class="playground-container">
        <div class="playground-header">
          <span>💻 Finale HTML-Aufgabe: KI-Ehrenkodex</span>
          <button class="btn-secondary" onclick="resetCode(5)">Code zurücksetzen</button>
        </div>
        <div class="playground-grid">
          <textarea id="code-input-5" class="code-input-area" oninput="updatePreview(5)"><div style="font-family: sans-serif; padding: 15px; background: #f8fafc; border-radius: 8px; color: #0f172a;">
  <h2 style="color: #4338ca;">📜 Mein Kodex: Mensch & KI</h2>
  <ol>
    <li>Ich schütze stets die Daten der Nutzer.</li>
    <li>Ich hinterfrage KI-Ergebnisse auf Bias.</li>
    <li>Ich stelle sicher, dass der Mensch die Kontrolle behält.</li>
  </ol>
</div></textarea>
          <div id="code-preview-5" class="code-preview-area"></div>
        </div>
      </div>

      <div class="certificate-box" id="certificate-section" style="display: none;">
        <div class="certificate-title">🎓 Zertifikat freigeschaltet!</div>
        <p>Sie haben alle Module & Quiz-Aufgaben zum Thema <strong>KI: Mensch und Verantwortung</strong> erfolgreich gemeistert.</p>
        <br>
        <button class="btn-primary" onclick="openCertificateModal()">📜 Zertifikat anzeigen & drucken</button>
      </div>
    `,
    quiz: {
      question: "Was ist der wichtigste Leitgedanke beim Einsatz von KI in der Gesellschaft?",
      options: [
        { text: "A) Gewinne um jeden Preis maximieren.", correct: false },
        { text: "B) Technik dient dem Menschen – Verantwortung und Ethik stehen an erster Stelle.", correct: true },
        { text: "C) KI sollte ohne Regeln entwickelt werden.", correct: false },
        { text: "D) Der Mensch sollte alle Entscheidungen an Algorithmen abgeben.", correct: false }
      ],
      explanation: "Wunderbar! Technik muss stets dem Wohle des Menschen und der Gesellschaft dienen."
    }
  }
];

// App State Management
let currentModuleId = 1;
let completedModules = JSON.parse(localStorage.getItem('ki_completed_modules') || '[]');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderModuleList();
  loadModule(currentModuleId);
  updateGlobalProgress();
});

// Render Sidebar Navigation
function renderModuleList() {
  const listEl = document.getElementById('module-list');
  if (!listEl) return;

  listEl.innerHTML = MODULES.map(m => {
    const isCompleted = completedModules.includes(m.id);
    const isActive = m.id === currentModuleId;
    return `
      <li>
        <button class="module-item-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="loadModule(${m.id})">
          <span class="module-number">${isCompleted ? '✓' : m.id}</span>
          <span>${m.title}</span>
        </button>
      </li>
    `;
  }).join('');
}

// Load Content for selected Module
function loadModule(id) {
  currentModuleId = id;
  const moduleData = MODULES.find(m => m.id === id);
  if (!moduleData) return;

  renderModuleList();

  const mainEl = document.getElementById('main-content-card');
  mainEl.innerHTML = `
    <div class="module-header">
      <span class="module-category">${moduleData.category}</span>
      <h1 class="module-title">${moduleData.title}</h1>
    </div>

    <div class="hero-image-wrapper">
      <img src="${moduleData.image}" alt="${moduleData.title}">
    </div>

    <div class="article-section">
      ${moduleData.content}
    </div>

    <!-- Quiz Section -->
    <div class="quiz-container">
      <div class="quiz-header">
        <span>❓ Wissenstest zu Modul ${moduleData.id}</span>
      </div>
      <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem;">${moduleData.quiz.question}</p>
      
      <div class="quiz-options">
        ${moduleData.quiz.options.map((opt, idx) => `
          <button class="quiz-option-btn" onclick="checkQuizAnswer(${moduleData.id}, ${idx}, ${opt.correct}, this)">
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback-${moduleData.id}" class="quiz-feedback"></div>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-actions">
      <button class="btn-secondary" onclick="loadModule(${id > 1 ? id - 1 : 1})" ${id === 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
        ← Vorheriges Modul
      </button>
      <button class="btn-primary" onclick="nextModuleOrFinish(${id})">
        ${id === MODULES.length ? 'Fortschritt prüfen 🏆' : 'Nächstes Modul →'}
      </button>
    </div>
  `;

  // Initialize live code preview after DOM insertion
  setTimeout(() => {
    updatePreview(id);
    if (id === 5 && completedModules.length === MODULES.length) {
      const certBox = document.getElementById('certificate-section');
      if (certBox) certBox.style.display = 'block';
    }
  }, 50);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Live HTML Code Playground Update
function updatePreview(id) {
  const textarea = document.getElementById(`code-input-${id}`);
  const preview = document.getElementById(`code-preview-${id}`);
  if (textarea && preview) {
    preview.innerHTML = textarea.value;
  }
}

function resetCode(id) {
  const defaultCodes = {
    1: `<article aria-label="KI Ethik Deklaration">\n  <h2>Ethik-Richtlinie 1: Menschliche Autonomie</h2>\n  <p>KI-Systeme müssen so gestaltet sein, dass sie die menschliche Würde achten.</p>\n  <button aria-label="Richtlinie bestätigen">Zustimmen</button>\n</article>`,
    2: `<form style="font-family: sans-serif;">\n  <label for="username">Pseudonym:</label><br>\n  <input type="text" id="username" required autocomplete="off"><br><br>\n  \n  <input type="checkbox" id="privacy-consent" required>\n  <label for="privacy-consent">Ich stimme der lokalen Datenspeicherung zu.</label><br><br>\n  \n  <button type="submit">Daten anonym senden</button>\n</form>`,
    3: `<details style="font-family: sans-serif; border: 1px solid #ccc; padding: 8px; border-radius: 6px;">\n  <summary style="font-weight: bold; cursor: pointer;">🔍 Wie wurde dieses Ergebnis berechnet?</summary>\n  <p style="margin-top: 8px;">Die KI hat folgende Parameter berücksichtigt:</p>\n  <ul>\n    <li>Faktencheck-Score: 98%</li>\n    <li>Quelle: Verifizierte Studien</li>\n  </ul>\n</details>`,
    4: `<figure style="font-family: sans-serif; text-align: center; border: 1px dashed #6366f1; padding: 10px;">\n  <span style="background: #6366f1; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">🤖 KI-Generiert</span>\n  <p style="margin-top: 10px;">[Symbolisches Bild der KI-Verantwortung]</p>\n  <figcaption style="font-size: 12px; color: #555;">Bild generiert mit Bild-KI (Antigravity-Engine)</figcaption>\n</figure>`,
    5: `<div style="font-family: sans-serif; padding: 15px; background: #f8fafc; border-radius: 8px; color: #0f172a;">\n  <h2 style="color: #4338ca;">📜 Mein Kodex: Mensch & KI</h2>\n  <ol>\n    <li>Ich schütze stets die Daten der Nutzer.</li>\n    <li>Ich hinterfrage KI-Ergebnisse auf Bias.</li>\n    <li>Ich stelle sicher, dass der Mensch die Kontrolle behält.</li>\n  </ol>\n</div>`
  };

  const textarea = document.getElementById(`code-input-${id}`);
  if (textarea) {
    textarea.value = defaultCodes[id] || '';
    updatePreview(id);
  }
}

// Evaluate Quiz Answers
function checkQuizAnswer(moduleId, optionIndex, isCorrect, btnEl) {
  const container = btnEl.closest('.quiz-options');
  const buttons = container.querySelectorAll('.quiz-option-btn');
  const feedbackEl = document.getElementById(`quiz-feedback-${moduleId}`);
  const moduleData = MODULES.find(m => m.id === moduleId);

  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    btnEl.classList.add('correct');
    feedbackEl.className = 'quiz-feedback show success';
    feedbackEl.innerHTML = `✅ ${moduleData.quiz.explanation}`;
    
    markModuleCompleted(moduleId);
  } else {
    btnEl.classList.add('wrong');
    feedbackEl.className = 'quiz-feedback show error';
    feedbackEl.innerHTML = `❌ Leider nicht ganz richtig. Versuche es noch einmal oder lies den Text oben.`;

    // Allow retry after 1.5 seconds
    setTimeout(() => {
      buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('wrong', 'correct');
      });
      feedbackEl.className = 'quiz-feedback';
    }, 2000);
  }
}

// Mark Module as Completed
function markModuleCompleted(id) {
  if (!completedModules.includes(id)) {
    completedModules.push(id);
    localStorage.setItem('ki_completed_modules', JSON.stringify(completedModules));
    renderModuleList();
    updateGlobalProgress();

    if (id === 5 || completedModules.length === MODULES.length) {
      const certBox = document.getElementById('certificate-section');
      if (certBox) certBox.style.display = 'block';
    }
  }
}

// Global Progress Bar Update
function updateGlobalProgress() {
  const progressFill = document.getElementById('global-progress-fill');
  const statusText = document.getElementById('sidebar-status-text');

  const percent = Math.round((completedModules.length / MODULES.length) * 100);

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (statusText) statusText.innerHTML = `Fortschritt: <strong>${percent}%</strong> (${completedModules.length}/${MODULES.length} Module)`;
}

// Navigation Helper
function nextModuleOrFinish(currentId) {
  if (currentId < MODULES.length) {
    loadModule(currentId + 1);
  } else {
    if (completedModules.length === MODULES.length) {
      openCertificateModal();
    } else {
      alert(`Sie haben ${completedModules.length} von ${MODULES.length} Modulen abgeschlossen. Bitte lösen Sie alle Quizfragen für das Zertifikat.`);
    }
  }
}

// Modals Logic
function openPrivacyModal() {
  document.getElementById('privacy-modal').classList.add('active');
}

function closePrivacyModal() {
  document.getElementById('privacy-modal').classList.remove('active');
}

function wipeUserData() {
  if (confirm("Möchten Sie Ihren gesamten Lernfortschritt wirklich löschen? Diese Aktion findet nur lokal statt.")) {
    localStorage.removeItem('ki_completed_modules');
    completedModules = [];
    renderModuleList();
    updateGlobalProgress();
    loadModule(1);
    closePrivacyModal();
    alert("Sämtliche lokalen Lerndaten wurden vollständig entfernt.");
  }
}

function openCertificateModal() {
  const certModal = document.getElementById('certificate-modal');
  if (certModal) certModal.classList.add('active');
}

function closeCertificateModal() {
  const certModal = document.getElementById('certificate-modal');
  if (certModal) certModal.classList.remove('active');
}

function printCertificate() {
  window.print();
}
