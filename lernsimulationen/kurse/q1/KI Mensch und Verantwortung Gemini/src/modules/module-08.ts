import { Chapter } from '../types';

export const module08: Chapter = {
  id: 8,
  title: '8. Roboter am Fließband & am Büro-Schreibtisch',
  subtitle: 'Wirtschaft 4.0 & Zukunft der Arbeit',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Ökonomie',
  xpReward: 150,
  image: 'assets/images/mission_control.jpg',
  dossierLore: 'ÖKONOMIE-DOSSIER #008: Transformation des Arbeitsmarktes durch KI-gestützte Automatisierung.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Die Automatisierungswelle erreicht nicht mehr nur Fabriken, sondern auch Büros, Kanzleien und Redaktionen.'",
    "[Dr. Elena Vance]: 'Viele Menschen sorgen sich um ihre Existenz. Wie verteilen wir den Wohlstand, der durch KI geschaffen wird?'",
    "[Dr. Malik Thorne]: 'Wir müssen über Umschulungen, soziale Absicherung und neue Bildungsmodelle nachdenken.'"
  ],
  dilemmaChoice: {
    prompt: 'Wirtschafts-Dilemma: Soll eine Robotertaxe für Unternehmen eingeführt werden, die Personal durch KI ersetzen?',
    options: [
      { label: 'A) Robotersteuer zur Umschulung', stance: 'Sozialer Ausgleich', consequence: 'Finanziert Weiterbildung.', xpBonus: 25 },
      { label: 'B) Keine Steuer auf Technik', stance: 'Wettbewerbsfähigkeit', consequence: 'Fördert rasche Innovation.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Strukturieren Sie die Zukunftskompetenzen des Menschen in einer HTML-Liste.',
  initialCode: '<ol>\n  <li>Kritisches Urteilsvermögen</li>\n  <li>Empathie & Seelsorge</li>\n  <li>Ethische Begründungsfähigkeit</li>\n</ol>',
  reflectionPrompt: 'Welche Arbeit hat für Sie einen Wert, den keine KI jemals ersetzen sollte?',
  quiz: {
    question: 'Welche Fähigkeiten gewinnen in einer automationsgeprägten Arbeitswelt an Bedeutung?',
    options: [
      { text: 'A) Empathie, Kreativität, kritisches Denken und soziale Verantwortung.', correct: true },
      { text: 'B) Schnelles Auswendiglernen von Zahlenreihen.', correct: false }
    ],
    explanation: 'Korrekt! Menschliche Soft-Skills und moralische Urteilskraft werden unersetzbar.'
  }
};
