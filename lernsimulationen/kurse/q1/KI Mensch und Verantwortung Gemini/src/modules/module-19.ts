import { Chapter } from '../types';

export const module19: Chapter = {
  id: 19,
  title: '19. Das große interdisziplinäre Ethik-Audit',
  subtitle: 'Synthese von Religionslehre & Sowi',
  perspective: 'NEUTRAL',
  category: 'Prüfung • Synthese',
  xpReward: 250,
  image: 'assets/images/mission_control.jpg',
  dossierLore: 'AUDIT-AKTE #019: Zusammenführung von theologischer Anthropologie und sozialwissenschaftlicher Machtanalyse.',
  storyDialogue: [
    "[Dr. Elena Vance]: 'Agent, Sie haben alle Schulungseinheiten gemeistert.'",
    "[Prof. Samuel Berg]: 'Sie haben die Würde des Menschen aus theologischer Sicht durchleuchtet.'",
    "[Dr. Malik Thorne]: 'Und die gesellschaftlichen Machtstrukturen aus sozialwissenschaftlicher Sicht analysiert.'",
    "[Dr. Elena Vance]: 'Führen Sie beide Fäden in Ihrem Abschluss-Audit zusammen!'"
  ],
  dilemmaChoice: {
    prompt: 'Audit-Dilemma: Welcher Grundsatz ist der wichtigste Anker für die Zukunft von KI?',
    options: [
      { label: 'A) Der Mensch bleibt stets die oberste Instanz', stance: 'Human-in-the-Loop', consequence: 'Letztentscheidung liegt nie bei Maschinen.', xpBonus: 25 },
      { label: 'B) Lückenlose Algorithmen-Transparenz', stance: 'XAI & Open Source', consequence: 'Macht Systeme überprüfbar.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie Ihre finale Gesamtschau im HTML-Audit.',
  initialCode: '<summary class="final-audit">\n  <h3>Ethik-Audit: KI im Dienste der Menschheit</h3>\n  <p>Würde schützen. Transparenz wahren. Verantwortung tragen.</p>\n</summary>',
  reflectionPrompt: 'Welche Erkenntnis aus dem Projektkurs hat Ihr Bild auf Künstliche Intelligenz am stärksten geprägt?',
  quiz: {
    question: 'Was erfordert eine fundierte ethische Urteilsbildung?',
    options: [
      { text: 'A) Das Zusammenführen interdisziplinärer Perspektiven (Religionslehre, Soziologie, Technik).', correct: true },
      { text: 'B) Ausschließlich nach Bauchgefühl zu entscheiden.', correct: false }
    ],
    explanation: 'Richtig! Vielschichtiges Denken führt zu verantwortungsvollen Urteilen.'
  }
};
