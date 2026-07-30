import { Chapter } from '../types';

export const module04: Chapter = {
  id: 4,
  title: '4. Akte Gläserner Mensch: Der Wert der Anonymität',
  subtitle: 'Datenschutz & DSGVO-Garantie',
  perspective: 'NEUTRAL',
  category: 'Datenschutz • Grundrechte',
  xpReward: 150,
  image: 'assets/images/privacy.jpg',
  dossierLore: 'SECURITY AKTE #004: Unverschlüsselte Bewegungsprofile können zur Erstellung lückenloser Bürgerprofile genutzt werden.',
  storyDialogue: [
    "[Dr. Elena Vance]: 'Agent! Unser Überwachungssystem hat einen illegalen Daten-Mining-Versuch abgefangen.'",
    "[K.I.R.A. System-Voice]: 'Meldung: 4,2 Millionen Bewegungsprofile wurden unverschlüsselt verarbeitet.'",
    "[Dr. Elena Vance]: 'Datenschutz ist kein lästiges Gesetz, sondern das Schild der Bürger vor Überwachung. Das Prinzip des Datenminimalismus verlangt: Erhebe nur, was absolut notwendig ist!'"
  ],
  dilemmaChoice: {
    prompt: 'Datenschutz-Entscheidung: Sollen Anonymisierungs-Tools für Bürger gesetzlich gefördert werden?',
    options: [
      { label: 'A) Ja, Anonymität ist Bürgerrecht', stance: 'Privatsphäre', consequence: 'Stärkt Grundrechte vor Konzernen.', xpBonus: 25 },
      { label: 'B) Neugier kontrollieren', stance: 'Sicherheits-Fokus', consequence: 'Vereinfacht Strafverfolgung.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie ein DSGVO-konformes Registrierungsformular ohne unnötige Datenfelder.',
  initialCode: '<form class="privacy-form">\n  <label>Anonymes Pseudonym:</label>\n  <input type="text" required autocomplete="off">\n</form>',
  reflectionPrompt: 'Wo verläuft für Sie persönlich die Grenze zwischen nützlicher Personalisierung und unzulässiger Überwachung?',
  quiz: {
    question: 'Was fordert das Prinzip des Datenminimalismus (DSGVO)?',
    options: [
      { text: 'A) Es dürfen nur Daten verarbeitet werden, die für den Zweck zwingend nötig sind.', correct: true },
      { text: 'B) Dass Server möglichst kleine Festplatten nutzen.', correct: false }
    ],
    explanation: 'Ausgezeichnet! Datensparsamkeit schützt Bürger vor Missbrauch und Überwachung.'
  }
};
