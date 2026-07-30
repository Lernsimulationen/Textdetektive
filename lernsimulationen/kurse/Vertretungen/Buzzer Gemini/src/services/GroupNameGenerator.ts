// High-contrast, colorblind-friendly color palette (Okabe-Ito & IBM Accessible Palette derivatives)
export const COLOR_PALETTE = [
  '#E69F00', // Warm Amber / Gold
  '#56B4E9', // Sky Blue
  '#009E73', // Emerald Green
  '#F0E442', // Bright Yellow
  '#0072B2', // Deep Cobalt
  '#D55E00', // Vermilion / Coral
  '#CC79A7', // Soft Violet / Pink
  '#999999', // Slate Gray
  '#661100', // Dark Rust
  '#6699CC', // Steel Blue
  '#882255', // Wine / Magenta
  '#44AA99', // Teal
  '#117733', // Dark Green
  '#332288', // Indigo
  '#AA4499', // Orchid
  '#DDCC77', // Sand / Khaki
];

// Creative list of 100+ German group names
export const CREATIVE_GROUP_NAMES: string[] = [
  // Tiere & Natur (25)
  'Tiger', 'Orcas', 'Vulkane', 'Eulen', 'Wölfe', 'Pinguine', 'Adler', 'Löwen',
  'Panther', 'Geparden', 'Delfine', 'Haie', 'Falke', 'Kolibris', 'Krokodile',
  'Bären', 'Bisons', 'Luchse', 'Gecko', 'Chamäleons', 'Mantrakrabben', 'Tukane',
  'Biber', 'Elche', 'Füchse',

  // Weltall & Kosmos (20)
  'Kometen', 'Saturn', 'Phönix', 'Galaxien', 'Supernova', 'Asteroiden', 'Pulsare',
  'Neptun', 'Orion', 'Sirius', 'Kosmonauten', 'Meteoriten', 'Sonnenstürme', 'Staubwolken',
  'Milchstraße', 'Jupiter', 'Andromeda', 'Lichtjahre', 'Neutronen', 'Schwarze Löcher',

  // Wissenschaft & Technik (20)
  'Roboter', 'Quanten', 'Photonen', 'Laser', 'Elektronen', 'Algorithmen', 'Protonen',
  'Tachyonen', 'Megabyte', 'Zahnräder', 'Nanobots', 'Hyperlinks', 'Matrix', 'Stromkreise',
  'Vektoren', 'Pyramiden', 'Turbinen', 'Transistoren', 'Schaltkreise', 'Reaktoren',

  // Mythologie & Legenden (15)
  'Drachen', 'Titanen', 'Gryphons', 'Hydra', 'Götter', 'Pegasus', 'Sphinx', 'Zentauren',
  'Minotauren', 'Odysseus', 'Valkyren', 'Kraken', 'Neptune', 'Salamander', 'Siren',

  // Elemente & Dynamik (20)
  'Wirbelstürme', 'Blitze', 'Tsunamis', 'Lawinen', 'Feuerbälle', 'Magma', 'Geysire',
  'Orkane', 'Zyklone', 'Kristalle', 'Diamanten', 'Gletscher', 'Rubine', 'Smaragde',
  'Magneten', 'Eisberge', 'Sturmkräuter', 'Tornado', 'Meteor', 'Polarlicht'
];

export class GroupNameGenerator {
  /**
   * Returns a random creative group name
   */
  static getRandomName(usedNames: string[] = []): string {
    const available = CREATIVE_GROUP_NAMES.filter(n => !usedNames.includes(n));
    if (available.length === 0) {
      // Fallback if all 100+ names are in use
      const base = CREATIVE_GROUP_NAMES[Math.floor(Math.random() * CREATIVE_GROUP_NAMES.length)];
      return `${base} ${Math.floor(Math.random() * 99) + 1}`;
    }
    return available[Math.floor(Math.random() * available.length)];
  }

  /**
   * Assigns a distinct color from the colorblind-friendly palette
   */
  static assignColor(index: number): string {
    return COLOR_PALETTE[index % COLOR_PALETTE.length];
  }
}
