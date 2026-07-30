import { Chapter } from '../types';

export const module15: Chapter = {
  id: 15,
  title: '15. ChatGPT in der Schule: Wer denkt hier eigentlich?',
  subtitle: 'Bildung, Wissen & Eigenständigkeit',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Bildung',
  xpReward: 150,
  image: 'assets/images/hero.jpg',
  dossierLore: 'BILDUNGS-DOSSIER #015: Verändertes Wissensverständnis und kritische Medienkompetenz bei der Nutzung generativer Sprachmodelle im Unterricht.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Generative Sprachmodelle schreiben Facharbeiten in Sekundenschnelle.'",
    "[Dr. Elena Vance]: 'Verlernen wir dadurch das eigene Denken und die Fähigkeit zur eigenen Urteilsbildung?'",
    "[Dr. Malik Thorne]: 'Nicht, wenn wir lernen, KI als Werkzeug zu nutzen und ihre Halluzinationen stets kritisch zu prüfen!'"
  ],
  dilemmaChoice: {
    prompt: 'Bildungs-Dilemma: Sollen KI-Tools in Klassenarbeiten erlaubt sein, wenn sie deklariert werden?',
    options: [
      { label: 'A) Erlauben als Werkzeug', stance: 'Zukunftskompetenz', consequence: 'Fördert kritischen Umgang.', xpBonus: 25 },
      { label: 'B) Verbot in Prüfungen', stance: 'Eigenleistung', consequence: 'Prüft analoges Grundwissen.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Formulieren Sie 3 goldene Regeln für KI im Unterricht.',
  initialCode: '<ol>\n  <li>KI als Ideengeber nutzen</li>\n  <li>Fakten stets an Quellen verifizieren</li>\n  <li>Eigene Gedanken formulieren</li>\n</ol>',
  reflectionPrompt: 'Wie verändert der Einsatz von KI Ihren persönlichen Lernalltag?',
  quiz: {
    question: 'Was ist die wichtigste Fähigkeit beim Nutzen generativer Text-KIs?',
    options: [
      { text: 'A) Kritische Verifikation der Ausgaben & eigenes Urteilsvermögen.', correct: true },
      { text: 'B) Ungeprüftes Kopieren aller Texte.', correct: false }
    ],
    explanation: 'Ausgezeichnet! Kritisches Denken schützt vor Fehlinformationen.'
  }
};
