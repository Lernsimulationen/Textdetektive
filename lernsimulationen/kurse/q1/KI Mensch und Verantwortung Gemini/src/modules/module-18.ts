import { Chapter } from '../types';

export const module18: Chapter = {
  id: 18,
  title: '18. Der Wunsch nach Ewigkeit: Transhumanismus',
  subtitle: 'Philosophie & Unsterblichkeit',
  perspective: 'REL',
  category: 'Religionslehre • Philosophie',
  xpReward: 200,
  image: 'assets/images/human_responsibility.jpg',
  dossierLore: 'PHILOSOPHIE-AKTE #018: Kritische Auseinandersetzung mit transhumanistischen Ideen zur digitalen Unsterblichkeit.',
  storyDialogue: [
    "[Prof. Samuel Berg]: 'Transhumanisten träumen davon, das menschliche Gehirn in die Cloud hochzuladen, um den Tod zu besiegen.'",
    "[Prof. Samuel Berg]: 'Aus christlicher Sicht verleiht gerade die Begrenztheit und Endlichkeit unseres Erdenlebens jedem Augenblick seine Kostbarkeit.'",
    "[Dr. Elena Vance]: 'Sollten wir versuchen, Gott zu spielen?'"
  ],
  dilemmaChoice: {
    prompt: 'Philosophie-Dilemma: Darf Forschung zur technologischen Verschmelzung von Mensch und Gehirn-Chips öffentlich gefördert werden?',
    options: [
      { label: 'A) Strikte bioethische Schranken', stance: 'Menschenbild-Schutz', consequence: 'Verhindert Aufspaltung der Gesellschaft.', xpBonus: 25 },
      { label: 'B) Medizinische Ausnahmen gestatten', stance: 'Therapie-Fokus', consequence: 'Erlaubt Prothesen für Gelähmte.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Verfassen Sie eine HTML-Reflexion zur Kostbarkeit der menschlichen Endlichkeit.',
  initialCode: '<article class="philosophy">\n  <h3>Endlichkeit & Würde</h3>\n  <p>Das Leben ist kostbar, weil es begrenzt und einmalig ist.</p>\n</article>',
  reflectionPrompt: 'Würden Sie Ihr Bewusstsein auf einen Server hochladen wollen, wenn das möglich wäre?',
  quiz: {
    question: 'Was versteht man unter Transhumanismus?',
    options: [
      { text: 'A) Die Bewegung, menschliche körperliche und geistige Grenzen durch Technik aufzuheben.', correct: true },
      { text: 'B) Einen Verein für Eisenbahnen.', correct: false }
    ],
    explanation: 'Korrekt! Eine der zentralen Debatten moderner Philosophie & Bioethik.'
  }
};
