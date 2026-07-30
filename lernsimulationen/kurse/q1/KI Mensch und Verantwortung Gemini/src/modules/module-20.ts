import { Chapter } from '../types';

export const module20: Chapter = {
  id: 20,
  title: '20. Die feierliche Ernennung & Der Verhaltenskodex',
  subtitle: 'Abschluss-Mission & Zertifikat',
  perspective: 'NEUTRAL',
  category: 'Abschluss • Zeremonie',
  xpReward: 300,
  image: 'assets/images/hero.jpg',
  dossierLore: 'ZERTIFIZIERUNGS-AKTE #020: Feierliche Verleihung des Status Oberste/r KI-Ethik-Kommissar/in.',
  storyDialogue: [
    "[FEIERLICHE ZEREMONIE IM HAUPTQUARTIER]:",
    "[Dr. Elena Vance]: 'Im Namen der KI-Ethik-Kommission verleihe ich Ihnen hiermit den Titel: Oberste/r KI-Ethik-Kommissar/in.'",
    "[Prof. Samuel Berg]: 'Mögen Sie die Grundsätze der Menschenwürde und Verantwortung in Ihre Schule, Ihr Studium und Ihr Leben tragen.'",
    "[Dr. Malik Thorne]: 'Tragen Sie Ihren Verhaltenskodex in die Welt hinaus!'"
  ],
  dilemmaChoice: {
    prompt: 'Abschluss-Schwur: Worauf verpflichten Sie sich persönlich für Ihre Zukunft?',
    options: [
      { label: 'A) Auf den Schutz der Menschenwürde', stance: 'Ethik-Pionier', consequence: 'Sie verteidigen Grundrechte in der digitalen Welt.', xpBonus: 50 },
      { label: 'B) Auf kritischen Informations-Check', stance: 'Wahrheits-Protektor', consequence: 'Sie verifizieren Medien und schützen vor Fälschungen.', xpBonus: 50 }
    ]
  },
  taskInstruction: 'Schließen Sie Ihren persönlichen KI-Verhaltenskodex ab.',
  initialCode: '<div class="commissioner-oath">\n  🎓 Zertifizierte/r KI-Ethik-Kommissar/in\n  <p>Verpflichtet auf Schutz der Würde & Verantwortung.</p>\n</div>',
  reflectionPrompt: 'Wie werden Sie in Ihrem künftigen Alltag und Beruf verantwortungsvoll mit KI umgehen?',
  quiz: {
    question: 'Welches Versprechen legt ein KI-Ethik-Kommissar ab?',
    options: [
      { text: 'A) Technik stets kritisch zu hinterfragen und den Menschen zu schützen.', correct: true },
      { text: 'B) Nie wieder ein Smartphone anzufassen.', correct: false }
    ],
    explanation: 'Glückwunsch! Sie haben den gesamten Kurs mit Auszeichnung absolviert!'
  }
};
