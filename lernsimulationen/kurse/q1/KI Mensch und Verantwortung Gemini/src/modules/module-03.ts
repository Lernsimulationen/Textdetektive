import { Chapter } from '../types';

export const module03: Chapter = {
  id: 3,
  title: '3. Wer steuert das Netz? Macht & Echokammern',
  subtitle: 'Soziologische Medien-Analyse',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Politik',
  xpReward: 150,
  image: 'assets/images/bias.jpg',
  dossierLore: 'MEDIEN-DOSSIER #003: Algorithmen auf Social-Media-Plattformen maximieren die Aufmerksamkeit durch emotionale Zuspitzung.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Blick auf den Lage-Monitor! Wir beobachten eine massive Polarisierung in den sozialen Medien.'",
    "[Dr. Malik Thorne]: 'Empfehlungs-Algorithmen belohnen Aufregung und Wut mit höherer Reichweite. Dadurch entstehen Filterblasen.'",
    "[Dr. Elena Vance]: 'Wenn Bürger nur noch ihre eigenen Vorurteile bestätigt bekommen, gerät der demokratische Diskurs in Gefahr.'",
    "[Dr. Malik Thorne]: 'Wir müssen untersuchen, wie Algorithmen öffentliche Meinungen steuern!'"
  ],
  dilemmaChoice: {
    prompt: 'Sowi-Dilemma: Soll der Staat Algorithmen gesetzlich zwingen, kontroverse Perspektiven anzuzeigen?',
    options: [
      {
        label: 'A) Staatliche Eingriffspflicht',
        stance: 'Demokratieschutz',
        consequence: 'Bricht Filterblasen auf, birgt jedoch das Risiko von Zensurdebatten.',
        xpBonus: 25
      },
      {
        label: 'B) Freiwillige Selbstverpflichtung',
        stance: 'Marktfreiheit',
        consequence: 'Schont die Netzfreiheit, vertraut aber auf Profitorientierte Konzerne.',
        xpBonus: 25
      }
    ]
  },
  taskInstruction: 'Strukturieren Sie eine HTML-Analyse zu Filterblasen.',
  initialCode: '<article class="sowi-analysis">\n  <h3>Gefahr für die Demokratie</h3>\n  <p>Algorithmen belohnen Klicks, nicht die Wahrheit.</p>\n</article>',
  reflectionPrompt: 'Wie können wir uns persönlich davor schützen, in einer algorithmischen Filterblase zu landen?',
  quiz: {
    question: 'Warum fördern Social-Media-Algorithmen oft Polarisierung?',
    options: [
      { text: 'A) Weil emotionale Wut-Inhalte zu höheren Verweildauern und Werbeeinnahmen führen.', correct: true },
      { text: 'B) Weil Algorithmen besonders friedfertig sind.', correct: false },
      { text: 'C) Das ist ein reiner Zufall ohne wirtschaftliches Interesse.', correct: false }
    ],
    explanation: 'Richtig! Das Geschäftsmodell vieler Plattformen baut auf Klicks durch Aufregung auf.'
  }
};
