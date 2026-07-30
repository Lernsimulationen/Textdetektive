import { Chapter } from '../types';

export const module12: Chapter = {
  id: 12,
  title: '12. Punktesystem für Wohlverhalten (Social Scoring)',
  subtitle: 'Freiheit vs. Totalitäre Überwachung',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Politik',
  xpReward: 150,
  image: 'assets/images/social_scoring.jpg',
  dossierLore: 'POLITIK-AKTE #012: Analyse von Social Scoring Systemen und biometrischer Massenüberwachung im öffentlichen Raum.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Agent, untersuchen Sie diese Daten aus Fernost. Ein Staat verteilt Social Scores: Wer bei Rot über die Ampel geht, verliert Bahn-Tickets.'",
    "[Dr. Elena Vance]: 'Ein solches System beraubt Menschen ihrer Freiheit und Würde. Die EU hat Social Scoring deshalb ausdrücklich verboten.'",
    "[Dr. Malik Thorne]: 'Freie Gesellschaften brauchen geschützte Räume ohne Dauerbewertung!'"
  ],
  dilemmaChoice: {
    prompt: 'Politik-Dilemma: Darf Kriminalitäts-Prognose (Predictive Policing) in Stadtteilen genutzt werden?',
    options: [
      { label: 'A) Strikte Ablehnung', stance: 'Freiheitsschutz', consequence: 'Verhindert Sippenhaft & Stigmatisierung.', xpBonus: 25 },
      { label: 'B) Eingeschränkte Erprobung', stance: 'Sicherheits-Fokus', consequence: 'Erhöht Polizeipräsenz an Brennpunkten.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Baue ein Warn-Banner gegen Social Scoring in HTML.',
  initialCode: '<div class="alert-banner">\n  🛑 Nein zu Social Scoring & Massenüberwachung!\n</div>',
  reflectionPrompt: 'Wo endet der Wunsch nach öffentlicher Sicherheit und wo beginnt der Totalitarismus?',
  quiz: {
    question: 'Wie bewertet der EU AI Act automatisierte Social-Scoring-Systeme?',
    options: [
      { text: 'A) Strikte Untersagung und Verbot zum Schutz der Bürgerrechte.', correct: true },
      { text: 'B) Pflicht für alle Schulen.', correct: false }
    ],
    explanation: 'Richtig! Die Vergabe von Wohlverhaltens-Punkten widerspricht den Grundrechten.'
  }
};
