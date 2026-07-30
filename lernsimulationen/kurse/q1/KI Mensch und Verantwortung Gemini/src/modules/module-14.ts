import { Chapter } from '../types';

export const module14: Chapter = {
  id: 14,
  title: '14. Der Pflegeroboter im Seniorenheim',
  subtitle: 'Bioethik & Seelsorge',
  perspective: 'REL',
  category: 'Religionslehre • Pflegeethik',
  xpReward: 150,
  image: 'assets/images/human_responsibility.jpg',
  dossierLore: 'BIOETHIK-AKTE #014: Einsatz von Assistenz-Robotern in Senioreneinrichtungen zur Bewältigung des Pflegenotstands.',
  storyDialogue: [
    "[Prof. Samuel Berg]: 'Ein Pflegeheim setzt Roboter-Robben und Sprach-Assistenten gegen die Einsamkeit von Senioren ein.'",
    "[Prof. Samuel Berg]: 'Technik kann Erinnerungs-Hilfe leisten. Aber sie kann niemanden in den Arm nehmen oder das Gefühl von Gottvertrauen spenden.'",
    "[Dr. Elena Vance]: 'Der Mensch braucht Menschen – Maschinen dürfen Zuwendung nicht ersetzen, sondern nur entlasten!'"
  ],
  dilemmaChoice: {
    prompt: 'Pflege-Dilemma: Sollen Pflegeroboter zur Entlastung bei körperlichen Aufgaben erlaubt sein?',
    options: [
      { label: 'A) Erlauben als Werkzeug', stance: 'Entlastung', consequence: 'Mehr Zeit für menschliche Beziehungsarbeit.', xpBonus: 25 },
      { label: 'B) Ablehnen', stance: 'Gegen Maschinisierung', consequence: 'Verhindert Entfremdung in Pflege.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie eine HTML-Deklaration zur Pflege-Ethik.',
  initialCode: '<article class="care-ethics">\n  <h3>Grundsätze der Pflegeethik</h3>\n  <p>Roboter entlasten Routine – Menschen spenden Wärme.</p>\n</article>',
  reflectionPrompt: 'Kann eine künstliche Zuwendung echten Trost spenden oder ist sie eine Täuschung?',
  quiz: {
    question: 'Was ist die ethische Rolle von KI in Pflegeberufen?',
    options: [
      { text: 'A) Entlastung bei Verwaltung & Mechanik, während menschliche Zuwendung zentral bleibt.', correct: true },
      { text: 'B) Der vollständige Ersatz von Pflegekräften.', correct: false }
    ],
    explanation: 'Richtig! Beziehungsarbeit bleibt Kern menschlicher Gemeinschaft.'
  }
};
