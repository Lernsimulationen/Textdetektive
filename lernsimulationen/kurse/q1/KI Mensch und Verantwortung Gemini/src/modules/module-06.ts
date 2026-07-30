import { Chapter } from '../types';

export const module06: Chapter = {
  id: 6,
  title: '6. Der rassistische Algorithmus: Der Kredit-Fall',
  subtitle: 'Algorithmic Bias & Diskriminierung',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Ungleichheit',
  xpReward: 150,
  image: 'assets/images/bias.jpg',
  dossierLore: 'SOWI-FALLAKTE #006: Algorithmen spiegeln historische Benachteligungen wider, wenn Trainingsdaten ohne Bereinigung übernommen werden.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Dringender Fall für den Ethikrat! Ein KI-Kreditvergabesystem lehnt Menschen aus bestimmten Stadtteilen systematisch ab.'",
    "[Prof. Samuel Berg]: 'Warum tut die KI das?'",
    "[Dr. Malik Thorne]: 'Weil die Trainingsdaten der letzten 20 Jahre gesellschaftliche Benachteiligungen enthalten. Die KI spiegelt die Diskriminierung der Vergangenheit wider und verstärkt sie!'"
  ],
  dilemmaChoice: {
    prompt: 'Dilemma: Sollen Entwickler gesetzlich gezwungen werden, Trainingsdaten vorab auf Diskriminierung zu testen?',
    options: [
      { label: 'A) Gesetzliche Pflichtprüfungen', stance: 'Gleichbehandlung', consequence: 'Verhindert Benachteiligung vorab.', xpBonus: 25 },
      { label: 'B) Freiwillige Zertifikate', stance: 'Eigenverantwortung', consequence: 'Geringerer Aufwand für Startups.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie eine HTML-Liste mit Maßnahmen zur Korrektur von Bias.',
  initialCode: '<ul>\n  <li>Vielfältige Trainingsdaten</li>\n  <li>Regelmäßige Auditierung durch unabhängige Ethikräte</li>\n</ul>',
  reflectionPrompt: 'Wer trägt die Schuld, wenn ein Kredit-Algorithmus diskriminiert: Die KI, der Entwickler oder die Bank?',
  quiz: {
    question: 'Wie entsteht Algorithmic Bias (systematische Verzerrung)?',
    options: [
      { text: 'A) Durch fehlerhafte oder einseitige historische Trainingsdaten.', correct: true },
      { text: 'B) Durch schwankende Stromspannungen.', correct: false }
    ],
    explanation: 'Richtig! KI lernt aus vergangenen Daten – und übernimmt damit auch bestehende Vorurteile.'
  }
};
