import { Chapter } from '../types';

export const module09: Chapter = {
  id: 9,
  title: '9. Der gefälschte Kanzler: Die Deepfake-Krise',
  subtitle: 'Desinformation & Medienkritik',
  perspective: 'NEUTRAL',
  category: 'Medien • Fälschungssicherheit',
  xpReward: 150,
  image: 'assets/images/deepfake.jpg',
  dossierLore: 'MEDIEN-FORENSIK #009: Synthetische Audiogenerierung und Gesichtstausch stellen Demokratien vor neuartige Fälschungsgefahren.',
  storyDialogue: [
    "[ALERT - DEEPFAKE IM NETZ DETEKTIERT]:",
    "[K.I.R.A. System-Voice]: 'Warnung: Ein KI-generiertes Video zeigt eine gefälschte Rücktrittserklärung der Regierung.'",
    "[Dr. Elena Vance]: 'Wenn man seinen eigenen Augen und Ohren nicht mehr trauen kann, gerät das Vertrauen in Medien und Politik ins Wanken!'",
    "[Dr. Malik Thorne]: 'Der EU AI Act schreibt eine Kennzeichnungspflicht für alle KI-Medien vor. Lassen Sie uns das umsetzen!'"
  ],
  dilemmaChoice: {
    prompt: 'Medien-Dilemma: Sollen unberechtigte Deepfake-Erstellungstools im Netz per Firewall gesperrt werden?',
    options: [
      { label: 'A) Strikte Web-Sperren', stance: 'Desinformations-Schutz', consequence: 'Schützt vor Fälschungen.', xpBonus: 25 },
      { label: 'B) Aufklärung & Wasserzeichen', stance: 'Transparenz-Lösung', consequence: 'Bewahrt offenes Internet.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Kennzeichnen Sie ein synthetisches Bild mit HTML-Attributen.',
  initialCode: '<figure data-ai-generated="true">\n  <span class="badge">🤖 KI-Generiertes Medium</span>\n  <figcaption>Inhalt nach EU AI Act transparent deklariert.</figcaption>\n</figure>',
  reflectionPrompt: 'Wie können Bürgerinnen und Bürger in Zukunft Fälschungen von echten Nachrichten unterscheiden?',
  quiz: {
    question: 'Welche Vorgabe macht der EU AI Act für KI-generierte Bilder und Videos?',
    options: [
      { text: 'A) Eine klare visuelle und technische Kennzeichnungspflicht als synthetisches Medium.', correct: true },
      { text: 'B) Das Verbot, Kamerafotos zu machen.', correct: false }
    ],
    explanation: 'Richtig! Transparenz schützt vor Täuschung und gezielter Desinformation.'
  }
};
