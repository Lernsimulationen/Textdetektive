import { Chapter } from '../types';

export const module11: Chapter = {
  id: 11,
  title: '11. Rechenzentren im Hitzesommer',
  subtitle: 'Schöpfungsethik & Ökologie',
  perspective: 'REL',
  category: 'Religionslehre • Ökologie',
  xpReward: 150,
  image: 'assets/images/green_ai.jpg',
  dossierLore: 'ÖKOLOGIE-AKTE #011: Der weltweite Energie- und Wasserverbrauch von KI-Supercomputern belastet die Umweltressourcen.',
  storyDialogue: [
    "[Prof. Samuel Berg]: 'Bedenken Sie den ökologischen Preis unserer digitalen Zivilisation.'",
    "[Prof. Samuel Berg]: 'Ein einziger KI-Modell-Trainingslauf verbraucht Strom wie Hunderte Flüge über den Atlantik.'",
    "[Prof. Samuel Berg]: 'Bewahrung der Schöpfung verlangt Green IT: Wir dürfen die Natur nicht für technische Bequemlichkeit opfern.'"
  ],
  dilemmaChoice: {
    prompt: 'Öko-Dilemma: Sollen KI-Modelltrainings mit fossiler Energie verboten werden?',
    options: [
      { label: 'A) 100% Ökostrom-Pflicht', stance: 'Schöpfungsschutz', consequence: 'Nachhaltige Rechenzentren.', xpBonus: 25 },
      { label: 'B) Übergangsfristen', stance: 'Flexibilität', consequence: 'Vermeidet Serverengpässe.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie einen HTML-Aufruf für nachhaltige KI-Nutzung (Green AI).',
  initialCode: '<section class="eco-appeal">\n  <h3>Green AI: Schöpfung bewahren</h3>\n  <p>Erneuerbare Energien für Rechenzentren einfordern!</p>\n</section>',
  reflectionPrompt: 'Ist der hohe Energieverbrauch von KI-Systemen ethisch vertretbar, wenn er zur Heilung von Krankheiten beiträgt?',
  quiz: {
    question: 'Was versteht man unter dem Begriff Green AI?',
    options: [
      { text: 'A) Energiesparende und nachhaltig betriebene KI-Entwicklung.', correct: true },
      { text: 'B) Servergehäuse grün anzustreichen.', correct: false }
    ],
    explanation: 'Ausgezeichnet! Nachhaltigkeit gehört zu den Säulen zukunftsfähiger Technik.'
  }
};
