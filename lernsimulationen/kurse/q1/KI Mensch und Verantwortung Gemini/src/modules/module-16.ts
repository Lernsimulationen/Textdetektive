import { Chapter } from '../types';

export const module16: Chapter = {
  id: 16,
  title: '16. Die Schüler-Charta für digitale Ethik',
  subtitle: 'Jugendliche gestalten Netzpolitik',
  perspective: 'NEUTRAL',
  category: 'Ethikrat • Partizipation',
  xpReward: 150,
  image: 'assets/images/mission_control.jpg',
  dossierLore: 'PARTIZIPATIONS-AKTE #016: Einbindung der Stimmen von Jugendlichen in die europäische Netzpolitik.',
  storyDialogue: [
    "[Dr. Elena Vance]: 'Agent, es ist Zeit, dass die Stimme der nächsten Generation gehört wird!'",
    "[Dr. Elena Vance]: 'Entwerfen Sie den ersten Paragrafen der Schüler-Charta für verantwortungsvolle KI.'",
    "[Prof. Samuel Berg]: 'Verankern Sie darin Freiheit, Schutz der Schwachen und Transparenz!'"
  ],
  dilemmaChoice: {
    prompt: 'Charta-Dilemma: Welchem Grundsatz soll der 1. Artikel der Schüler-Charta gewidmet sein?',
    options: [
      { label: 'A) Schutz der Würde', stance: 'Menschenwürde', consequence: 'Stellt Menschenrechte an die Spitze.', xpBonus: 25 },
      { label: 'B) Recht auf Wahrheit', stance: 'Anti-Fälschung', consequence: 'Fokussiert Informationsfreiheit.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Entwerfen Sie § 1 der Schüler-Ethik-Charta in HTML.',
  initialCode: '<section class="charter">\n  <h1>§ 1 Würde & Selbstbestimmung</h1>\n  <p>Jeder Mensch hat das Recht auf ungefilterte Wahrheit & Datenschutz.</p>\n</section>',
  reflectionPrompt: 'Welchen Wunsches hätten Sie an die Politik zur Reglementierung von KI?',
  quiz: {
    question: 'Warum ist die Mitwirkung junger Menschen an Netzpolitik wichtig?',
    options: [
      { text: 'A) Weil Jugendliche die Hauptnutzer digitaler Medien sind und ihre Zukunft mitgestalten.', correct: true },
      { text: 'B) Weil Gesetzbücher sonst zu kurz sind.', correct: false }
    ],
    explanation: 'Richtig! Demokratie lebt von der Partizipation aller Generationen.'
  }
};
