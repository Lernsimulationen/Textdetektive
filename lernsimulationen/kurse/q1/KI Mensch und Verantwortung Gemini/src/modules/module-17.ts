import { Chapter } from '../types';

export const module17: Chapter = {
  id: 17,
  title: '17. KRISENEINSATZ: Der weltweite Server-Ausfall',
  subtitle: 'Krisensimulation & Resilienz',
  perspective: 'SOWI',
  category: 'Kriseneinsatz • Resilienz',
  xpReward: 200,
  image: 'assets/images/crisis.jpg',
  dossierLore: 'NOTFALL-ALERT #017: Simulation eines weltweiten Ausfalls kritischer Infrastrukturen durch Unterseekabel-Schäden.',
  storyDialogue: [
    "[🚨 ALARMSTUFE ROT - KRISENSIMULATION]:",
    "[K.I.R.A. System-Voice]: 'Warnung: Ein weltweiter Kabelbruch trennt die Haupt-Rechenzentren vom Netz.'",
    "[Dr. Malik Thorne]: 'Logistiknetze, Ampelsysteme und Medizin-Datenbanken stehen still!'",
    "[Dr. Elena Vance]: 'Das zeigt unsere Verwundbarkeit. Eine Gesellschaft muss auch analog handlungsfähig bleiben!'"
  ],
  dilemmaChoice: {
    prompt: 'Krisen-Dilemma: Welche Notfall-Maßnahme soll im Hauptquartier zuerst aktiviert werden?',
    options: [
      { label: 'A) Manuelles Not-Protokoll', stance: 'Analoge Resilienz', consequence: 'Sichert Grundversorgung per Handbetrieb.', xpBonus: 25 },
      { label: 'B) Satelliten-Backup', stance: 'Technik-Backup', consequence: 'Versucht digitale Verbindung zu retten.', xpBonus: 25 }
    ]
  },
  taskInstruction: 'Erstellen Sie ein Notfall-Protokoll für analoge Handlungsfähigkeit.',
  initialCode: '<div class="emergency-plan">\n  ⚠️ Notfall-Protokoll: Analoge Steuerung aktivieren!\n</div>',
  reflectionPrompt: 'Wie vorbereitet sind Sie persönlich auf einen mehrtägigen Strom- oder Internetausfall?',
  quiz: {
    question: 'Was lehrt uns eine Krisensimulation über digitale Systeme?',
    options: [
      { text: 'A) Die Notwendigkeit von Ausfallkonzepten und analoger Resilienz.', correct: true },
      { text: 'B) Dass Computer nie kaputtgehen.', correct: false }
    ],
    explanation: 'Ausgezeichnet! Resilienz bedeutet, auch ohne Technik handlungsfähig zu bleiben.'
  }
};
