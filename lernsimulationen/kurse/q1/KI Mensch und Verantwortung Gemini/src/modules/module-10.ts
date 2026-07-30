import { Chapter } from '../types';

export const module10: Chapter = {
  id: 10,
  title: '10. Der Unfall des autonomen Taxis',
  subtitle: 'Recht & Produkthaftung',
  perspective: 'SOWI',
  category: 'Sozialwissenschaften • Recht',
  xpReward: 150,
  image: 'assets/images/privacy.jpg',
  dossierLore: 'RECHTS-AKTE #010: Klärung der juristischen Haftung im Zivilrecht bei Fehlentscheidungen autonomer Fahrzeuge.',
  storyDialogue: [
    "[Dr. Malik Thorne]: 'Ein autonomes Taxi bremst bei Nässe zu spät und beschädigt eine Straßenlaterne.'",
    "[Dr. Elena Vance]: 'Wer zahlt den Schaden? Der Fahrgast, der Programmierer, der Sensor-Hersteller oder die Autovermietung?'",
    "[Dr. Malik Thorne]: 'Eine KI ist kein Rechtssubjekt. Die rechtliche Verantwortung muss immer bei natürlichen oder juristischen Personen liegen.'"
  ],
  dilemmaChoice: {
    prompt: 'Rechts-Dilemma: Wer trägt die Hauptverantwortung bei Fehlentscheidungen autonomer Fahrzeuge?',
    options: [
      { label: 'A) Der Fahrzeughersteller', stance: 'Produkthaftung', consequence: 'Hersteller haften für ihre Algorithmen.', xpBonus: 25 },
      { label: 'B) Der Fahrzeughalter', stance: 'Betreiberverantwortung', consequence: 'Halter müssen Versicherungen abschließen.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Baue eine Übersicht zur rechtlichen Verantwortung bei KI-Unfällen.',
  initialCode: '<article class="legal-notice">\n  <h3>Haftungs-Prinzip</h3>\n  <p>Verantwortung liegt stets bei Menschen & Herstellern.</p>\n</article>',
  reflectionPrompt: 'Sollte ein Roboter jemals Zeugenaussagen vor Gericht bewerten dürfen?',
  quiz: {
    question: 'Können KI-Systeme juristisch selbst haftbar gemacht werden?',
    options: [
      { text: 'A) Nein, Haftungsträger sind immer Menschen, Entwickler oder Unternehmen.', correct: true },
      { text: 'B) Ja, Roboter können Strafzettel bezahlen.', correct: false }
    ],
    explanation: 'Korrekt! Nur Rechts-Personen können juristische Verantwortung tragen.'
  }
};
