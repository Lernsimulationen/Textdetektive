import { Chapter } from '../types';

export const module13: Chapter = {
  id: 13,
  title: '13. Die Geheimnisse der Black Box (XAI)',
  subtitle: 'Erklärbare KI & Transparenz',
  perspective: 'NEUTRAL',
  category: 'Technologie • Transparenz',
  xpReward: 150,
  image: 'assets/images/bias.jpg',
  dossierLore: 'TECH-DOSSIER #013: Explainable AI (XAI) fordert nachvollziehbare Entscheidungsbäume statt undurchschaubarer Neuronale-Netz-Parameter.',
  storyDialogue: [
    "[Dr. Elena Vance]: 'Das Black-Box-Problem ist eine unserer größten Herausforderungen.'",
    "[Dr. Elena Vance]: 'Wenn eine KI eine Medizin-Diagnose stellt, aber selbst der Arzt nicht nachvollziehen kann warum – wie sollen wir dem Urteil vertrauen?'",
    "[Dr. Malik Thorne]: 'Erklärbare KI (Explainable AI / XAI) zwingt Systeme dazu, ihre Kriterien offenzulegen.'"
  ],
  dilemmaChoice: {
    prompt: 'Transparenz-Dilemma: Sollen KI-Systeme ohne XAI-Erklärbarkeit in Medizin und Justiz verboten werden?',
    options: [
      { label: 'A) Strikte Erklärbarkeits-Pflicht', stance: 'Nachvollziehbarkeit', consequence: 'Verhindert unbegründete Urteile.', xpBonus: 25 },
      { label: 'B) Hohe Präzision geht vor', stance: 'Ergebnis-Fokus', consequence: 'Nutzt komplexe Modelle.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie ein aufklappbares HTML-Details Element für Erklärungs-Transparenz.',
  initialCode: '<details>\n  <summary>🔍 Transparenz-Bericht anzeigen</summary>\n  <p>Berücksichtigte Kriterien: Alter, Blutwerte, Symptom-Historie.</p>\n</details>',
  reflectionPrompt: 'Würden Sie sich von einer KI behandeln lassen, deren Arbeitsweise kein Mensch erklären kann?',
  quiz: {
    question: 'Was versteht man unter Explainable AI (XAI)?',
    options: [
      { text: 'A) Verfahren, die Entscheidungen von KI-Modellen für Menschen nachvollziehbar machen.', correct: true },
      { text: 'B) Ein Fachbuch über Programmierung.', correct: false }
    ],
    explanation: 'Korrekt! Ohne Transparenz gibt es keine wirksame Kontrolle.'
  }
};
