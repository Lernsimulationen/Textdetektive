import { Chapter } from '../types';

export const module01: Chapter = {
  id: 1,
  title: '1. Berufung in die Ethik-Kommission',
  subtitle: 'Code-Name: Operation Humanitas',
  perspective: 'NEUTRAL',
  category: 'Ausbildung • Phase I',
  xpReward: 100,
  image: 'assets/images/mission_control.jpg',
  dossierLore: 'STRENG GEHEIM: Akte #001. Die KI-Ethik-Kommission wurde per Bundestags-Beschluss ins Leben gerufen, um den unkontrollierten Einsatz von KI-Algorithmen in Justiz, Finanzwesen und Medien zu überwachen.',
  storyDialogue: [
    "[Dr. Elena Vance - Kommissionsleiterin]: 'Willkommen im Hochsicherheits-Trakt der KI-Ethik-Kommission.'",
    "[Dr. Elena Vance]: 'Die Welt um uns verändert sich rasant. Algorithmen entscheiden über Kreditwürdigkeiten, medizinische Behandlungen und Informationsströme.'",
    "[Prof. Samuel Berg - Religionsethiker]: 'Doch wer schützt das, was den Menschen ausmacht? Seine Würde, seine Freiheit, seine Verantwortung vor Gott und den Mitmenschen?'",
    "[Dr. Malik Thorne - Sozialwissenschaftler]: 'Wir haben Sie ausgewählt, weil Sie sowohl die technischen als auch die gesellschaftlichen Abgründe hinterfragen. Ihre Ausbildung beginnt jetzt!'"
  ],
  dilemmaChoice: {
    prompt: 'Missions-Entscheidung: Wie soll die Kommission künftig bei hochriskanten KI-Projekten vorgehen?',
    options: [
      {
        label: 'A) Präventives Verbot',
        stance: 'Strikter Schutz',
        consequence: 'Maximale Sicherheit für Bürgerrechte, jedoch verlangsamt es Innovationen.',
        xpBonus: 25
      },
      {
        label: 'B) Begleitende Aufsicht',
        stance: 'Innovations-Balance',
        consequence: 'Förderung von Forschung bei fortlaufender Ethik-Kontrolle.',
        xpBonus: 25
      }
    ]
  },
  taskInstruction: 'Legen Sie Ihre offizielle Rekruten-Akte in HTML an.',
  initialCode: '<article class="agent-file">\n  <h2>Einsatzakte: Rekrut/in für KI-Ethik</h2>\n  <p>Status: Eid auf die Menschenwürde abgelegt.</p>\n</article>',
  reflectionPrompt: 'Warum reicht es nicht aus, KI-Systeme nur nach ihrer technischen Leistungsfähigkeit zu beurteilen?',
  quiz: {
    question: 'Welche Kernaufgabe verfolgt die KI-Ethik-Kommission?',
    options: [
      { text: 'A) Alle Computer sofort durch analoge Papierakten zu ersetzen.', correct: false },
      { text: 'B) Algorithmen kritisch zu durchleuchten und Menschenrechte & Würde einzufordern.', correct: true },
      { text: 'C) Maximale Profite für große Technologie-Konzerne zu generieren.', correct: false }
    ],
    explanation: 'Korrekt! Ethik-Kommissionen wägen Chancen und Gefahren im Sinne des Gemeinwohls und der Menschenwürde ab.'
  },
  teamsLink: 'https://teams.microsoft.com',
  oneNoteLink: 'https://onenote.com'
};
