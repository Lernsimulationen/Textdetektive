import { Chapter } from '../types';

export const module05: Chapter = {
  id: 5,
  title: '5. Die Goldene Regel im Zeitalter der KI',
  subtitle: 'Christliche Sozialethik & KI',
  perspective: 'REL',
  category: 'Religionslehre • Ethik',
  xpReward: 150,
  image: 'assets/images/human_responsibility.jpg',
  storyDialogue: [
    "[Prof. Samuel Berg]: 'Agent, schlagen Sie Matthäus 7,12 auf: Alles nun, was ihr wollt, dass euch die Leute tun sollen, das tut ihnen auch.'",
    "[Prof. Samuel Berg]: 'Wenn wir KI-Systeme in Altenheimen, Schulen oder bei Versicherungen einsetzen – würden wir wollen, dass ein Algorithmus so über uns urteilt?'",
    "[Dr. Elena Vance]: 'Ethisches Programmieren bedeutet, die Perspektive der Verwundbaren einzunehmen.'"
  ],
  dilemmaChoice: {
    prompt: 'Ethik-Dilemma: Darf ein KI-System Risiko-Prognosen für Patienten in Krankenhäusern erstellen?',
    options: [
      { label: 'A) Nur zur Beratung der Ärzte', stance: 'Mensch im Zentrum', consequence: 'Arzt behält Verantwortung.', xpBonus: 25 },
      { label: 'B) Automatische Zuteilung', stance: 'Effizienz-Fokus', consequence: 'Entlastet Personal, birgt Härtefälle.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Formulieren Sie die Goldene Regel für KI in einem HTML-Blockquote Element.',
  initialCode: '<blockquote>Die Goldene Regel für KI: Baue Systeme so, dass sie Menschen nie bloßstellen oder benachteiligen.</blockquote>',
  reflectionPrompt: 'Wie kann Nächstenliebe in einer digitalisierten Gesellschaft praktisch gelebt werden?',
  quiz: {
    question: 'Wie lässt sich die Goldene Regel auf KI anwenden?',
    options: [
      { text: 'A) KI-Systeme müssen so konstruiert werden, dass man selbst als Betroffener gerecht behandelt werden möchte.', correct: true },
      { text: 'B) KI muss aus Gold gebaut werden.', correct: false }
    ],
    explanation: 'Korrekt! Ethisches Design stellt immer den Schutz des Nächsten an die erste Stelle.'
  }
};
