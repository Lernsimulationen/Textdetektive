import type { BadgeConfig, ChapterConfig, CourseConfig, PerspectiveId } from "../types";

const chapterSeeds: Array<
  [string, string, PerspectiveId, string, string]
> = [
  ["Eintritt in die Kommission", "Protokoll Null", "joint", "Die Einladung", "Du wurdest für die Ausbildung der neuen KI-Ethik-Kommission ausgewählt."],
  ["Ausbildung I", "Blick schärfen", "religion", "Erste Orientierung", "Das Archiv öffnet den ersten Ausbildungssektor."],
  ["Ausbildung II", "Systemblick", "social", "Zweite Orientierung", "Die Lagezentrale erwartet eine strukturierte Bestandsaufnahme."],
  ["Erstes Einsatzgebiet", "Signal im Rauschen", "joint", "Auftaktmission", "Ein unbekannter Vorgang erreicht die Kommission."],
  ["KI verstehen I", "Maschinenraum", "social", "Grundlagenlabor", "Der technische Analysebereich wird freigegeben."],
  ["KI verstehen II", "Grenzfragen", "religion", "Deutungsraum", "Ein zweiter Blick auf Menschenbild und Grenzen wird notwendig."],
  ["Daten analysieren I", "Datenspur", "social", "Prüfauftrag", "Die Herkunft einer Entscheidung muss rekonstruiert werden."],
  ["Daten analysieren II", "Unsichtbare Muster", "joint", "Kreuzprüfung", "Zwei Perspektiven treffen auf denselben Datensatz."],
  ["Verantwortung übernehmen", "Zurechnung", "religion", "Verantwortungsmatrix", "Die Kommission muss Zuständigkeiten sichtbar machen."],
  ["Gesellschaftliche Folgen I", "Resonanz", "social", "Folgenabschätzung", "Ein lokaler Fall beginnt, gesellschaftliche Kreise zu ziehen."],
  ["Gesellschaftliche Folgen II", "Würde unter Druck", "religion", "Schutzauftrag", "Die Folgenanalyse erreicht eine persönliche Grenze."],
  ["Öffentlichkeit", "Offenes Protokoll", "social", "Kommunikationslage", "Die Kommission muss ihre Kriterien öffentlich vertreten."],
  ["Konfliktzone", "Rote Linie", "joint", "Dilemma", "Zwei tragfähige Positionen scheinen unvereinbar."],
  ["Ethikrat I", "Anhörung", "religion", "Votum vorbereiten", "Der interne Rat fordert eine begründete Stellungnahme."],
  ["Ethikrat II", "Interessenausgleich", "social", "Votum prüfen", "Institutionen, Macht und Folgen geraten in den Fokus."],
  ["Krisensimulation I", "Ausfall", "joint", "Lagewechsel", "Ein unerwartetes Ereignis setzt die bisherigen Pläne außer Kraft."],
  ["Krisensimulation II", "Zeitfenster", "social", "Entscheidung unter Druck", "Die Lage verlangt Prioritäten bei unvollständigen Informationen."],
  ["Krisensimulation III", "Gewissensraum", "religion", "Letzte Prüfung", "Die Entscheidung muss auch vor dem eigenen Maßstab bestehen."],
  ["Abschlussmission", "Mandat", "joint", "Kommissionsvotum", "Alle Perspektiven laufen in einem gemeinsamen Votum zusammen."],
  ["Übergabe", "Horizont", "joint", "Neues Mandat", "Die Ausbildung endet. Die Verantwortung bleibt."],
];

function chapter(
  seed: (typeof chapterSeeds)[number],
  index: number,
): ChapterConfig {
  const [title, codename, perspective, teaser, briefing] = seed;
  const id = `kapitel-${String(index + 1).padStart(2, "0")}`;
  return {
    id,
    order: index + 1,
    title,
    codename,
    teaser,
    briefing,
    perspective,
    xp: index === 19 ? 240 : 100 + (index % 4) * 20,
    duration: index === 0 ? "30 Min." : "90 Min.",
    prerequisites: index === 0 ? [] : [`kapitel-${String(index).padStart(2, "0")}`],
    materialLinks: [],
  };
}

const badges: BadgeConfig[] = [
  {
    id: "erstkontakt",
    name: "Erstkontakt",
    description: "Die erste Mission wurde abgeschlossen.",
    icon: "I",
    condition: { type: "chapters-completed", value: 1 },
  },
  {
    id: "perspektivwechsel",
    name: "Perspektivwechsel",
    description: "Fünf Aufträge wurden dokumentiert.",
    icon: "V",
    condition: { type: "chapters-completed", value: 5 },
  },
  {
    id: "krisenfest",
    name: "Krisenfest",
    description: "Die Krisensimulation wurde erreicht.",
    icon: "XVI",
    condition: { type: "chapters-completed", value: 16 },
  },
  {
    id: "kommissionsrat",
    name: "Kommissionsrat",
    description: "Das vollständige Mandat wurde erfüllt.",
    icon: "XX",
    condition: { type: "chapters-completed", value: 20 },
  },
];

export const defaultCourse: CourseConfig = {
  format: "mission-course",
  version: 1,
  id: "ki-mensch-verantwortung",
  title: "KI – Mensch – Verantwortung",
  subtitle: "Projektkurs · Evangelische Religionslehre × Sozialwissenschaften",
  commissionName: "KI-Ethik-Kommission",
  storyIntro:
    "Eine neue Generation autonomer Systeme verändert Entscheidungen, Institutionen und Selbstbilder. Die Kommission braucht Menschen, die genauer hinsehen: aus unterschiedlichen Perspektiven, mit Urteilskraft und der Bereitschaft, Verantwortung zu übernehmen.",
  perspectives: [
    {
      id: "religion",
      shortLabel: "ER",
      label: "Evangelische Religionslehre",
      color: "#e7bd4b",
    },
    {
      id: "social",
      shortLabel: "SW",
      label: "Sozialwissenschaften",
      color: "#e6635d",
    },
    {
      id: "joint",
      shortLabel: "GEM",
      label: "Gemeinsame Perspektive",
      color: "#79c9c1",
    },
  ],
  chapters: chapterSeeds.map(chapter),
  badges,
  gamification: {
    enabled: true,
    xpPerLevel: 500,
    rankTitles: [
      "Anwärter:in",
      "Analyst:in",
      "Delegierte:r",
      "Kommissionsrat",
      "Mandatsträger:in",
    ],
  },
  liveModule: {
    enabled: true,
    allowSupabase: true,
  },
};

