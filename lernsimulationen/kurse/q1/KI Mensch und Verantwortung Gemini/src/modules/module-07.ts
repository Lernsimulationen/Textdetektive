import { Chapter } from '../types';

export const module07: Chapter = {
  id: 7,
  title: '7. Autonome Drohnen: Der Befehl zum Schlag',
  subtitle: 'Friedensethik & Kriegsführung',
  perspective: 'REL',
  category: 'Religionslehre • Friedensethik',
  xpReward: 200,
  image: 'assets/images/hero.jpg',
  dossierLore: 'FRIEDENSETHIK-AKTE #007: Völkerrechtliche Debatte über künstliche Systeme im militärischen Einsatz ohne menschliches Veto.',
  storyDialogue: [
    "[SOS-NOTFALL-SIGNAL IN DER MISSIONSZENTRALE]:",
    "[Dr. Elena Vance]: 'Rufe alle Kommissionsmitglieder zusammen! Ein Militärkonzern erprobt autonome Kampfdrohnen ohne menschliche Zielbestätigung.'",
    "[Prof. Samuel Berg]: 'Aus friedensethischer Sicht ist das eine Katastrophe. Maschinen dürfen niemals das Recht erhalten, über Leben und Tod eines Menschen zu entscheiden!'",
    "[Dr. Malik Thorne]: 'Wir müssen ein internationales Moratorium durchsetzen!'"
  ],
  dilemmaChoice: {
    prompt: 'Militär-Dilemma: Soll die Kommission ein internationales Verbot autonomer Kampfdrohnen fordern?',
    options: [
      { label: 'A) Striktes internationales Verbot', stance: 'Völkerrecht & Würde', consequence: 'Schützt Menschenleben vor Algorithmen.', xpBonus: 25 },
      { label: 'B) Defensiver Einsatz erlaubt', stance: 'Reaktive Abwehr', consequence: 'Erlaubt Abwehrraketen ohne Piloten.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie ein HTML-Ethik-Manifest gegen autonome Waffensysteme.',
  initialCode: '<article class="manifest">\n  <h2>Manifest: Menschliche Kontrolle über Leben und Tod</h2>\n  <p>Tötungsentscheidungen dürfen niemals an Algorithmen delegiert werden.</p>\n</article>',
  reflectionPrompt: 'Warum ist die menschliche Befehlskette (Human-in-the-Loop) im Krieg völkerrechtlich unverzichtbar?',
  quiz: {
    question: 'Was fordert die UN-Ethikkommission bei autonomen Waffensystemen?',
    options: [
      { text: 'A) Das strikte Verbot von Systemen ohne menschliche Befehlskette.', correct: true },
      { text: 'B) Mehr KI-Kampfdrohnen einzusetzen.', correct: false }
    ],
    explanation: 'Ausgezeichnet! Die Letztentscheidung über Leben und Tod muss stets bei einem verantwortlichen Menschen liegen.'
  }
};
