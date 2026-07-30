import { Chapter } from '../types';

export const module02: Chapter = {
  id: 2,
  title: '2. Geschöpf vs. Algorithmus: Die Würde des Menschen',
  subtitle: 'Anthropologie & Gottesebenbildlichkeit',
  perspective: 'REL',
  category: 'Religionslehre • Anthropologie',
  xpReward: 150,
  image: 'assets/images/human_responsibility.jpg',
  dossierLore: 'DOSSIER #002: Anthropologische Grundfragen. In der evangelischen Theologie ist der Mensch kein Summenprodukt seiner Datenpunkte, sondern ein Gegenüber Gottes.',
  storyDialogue: [
    "[Prof. Samuel Berg]: 'Schauen Sie sich diese Neuronale-Netz-Simulation an. Sie rechnet Milliarden Operationen pro Sekunde.'",
    "[Prof. Samuel Berg]: 'In Genesis 1,27 heißt es: Gott schuf den Menschen zu seinem Bilde (Imago Dei). Der Mensch besitzt eine unverlierbare Würde, ein Gewissen und die Fähigkeit zur Liebe.'",
    "[K.I.R.A. System-Voice]: 'Analyse-Anfrage: Kann eine KI Liebe oder Sünde empfinden?'",
    "[Prof. Samuel Berg]: 'Nein, K.I.R.A. Eine KI berechnet Wahrscheinlichkeiten. Sie empfindet keine Reue, keine Trauer und kein Mitgefühl. Das unterscheidet Geschöpf und Maschine!'"
  ],
  dilemmaChoice: {
    prompt: 'Ethik-Dilemma: Ein Seelsorge-Bot soll einsamen Menschen nachts Beistand leisten. Zulassen?',
    options: [
      {
        label: 'A) Genehmigen mit Warnhinweis',
        stance: 'Pragmatische Hilfe',
        consequence: 'Spendet erste Erleichterung, ersetzt aber keinen echten Menschen.',
        xpBonus: 25
      },
      {
        label: 'B) Ablehnen',
        stance: 'Schutz vor Täuschung',
        consequence: 'Bewahrt die Unverfälschtheit menschlicher Seelsorge.',
        xpBonus: 25
      }
    ]
  },
  taskInstruction: 'Erstellen Sie eine HTML-Gegenüberstellung von menschlicher Würde und maschineller Berechnung.',
  initialCode: '<section class="anthropology">\n  <h3>Anthropologische Grundsätze</h3>\n  <p>Der Mensch ist kein Optimierungs-Algorithmus. Seine Würde ist unantastbar.</p>\n</section>',
  reflectionPrompt: 'Kann eine KI jemals moralische Schuld für ein Fehlurteil tragen?',
  quiz: {
    question: 'Was zeichnet den Menschen nach christlich-anthropologischem Verständnis im Gegensatz zur KI aus?',
    options: [
      { text: 'A) Der Mensch rechnet fehlerfreier als Supercomputer.', correct: false },
      { text: 'B) Unverlierbare Gottesebenbildlichkeit, freies Gewissen und echte Empathie.', correct: true },
      { text: 'C) Es gibt aus ethischer Sicht keinen Unterschied.', correct: false }
    ],
    explanation: 'Exakt! Maschinen verarbeiten Daten, besitzen aber kein Gewissen, Herz oder seelische Würde.'
  }
};
