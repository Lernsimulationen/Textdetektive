const AVATARS = [
  { id: "f01", type: "female", index: 0, name: "Anna Weber", role: "Religionslehrerin", bio: "Anna liebt Gesprächskreise und macht biblische Geschichten mit kleinen Gegenständen lebendig. In ihrer Freizeit wandert sie gern durch den Schwarzwald." },
  { id: "f02", type: "female", index: 1, name: "Bettina Krause", role: "Religionslehrerin", bio: "Bettina unterrichtet mit viel Ruhe und Humor. Sie sammelt Kinderfragen und verwandelt sie in spannende Unterrichtseinstiege." },
  { id: "f03", type: "female", index: 2, name: "Christina Vogel", role: "Religionslehrerin", bio: "Christina verbindet Musik, Gebet und Kreativprojekte. Besonders gern begleitet sie Schulchöre und Konfirmandengruppen." },
  { id: "f04", type: "female", index: 3, name: "Dorothee Hartmann", role: "Religionslehrerin", bio: "Dorothee spricht gern über Gerechtigkeit und Zusammenhalt. Ihre Lieblingsmethode ist ein Streitgespräch mit wechselnden Rollen." },
  { id: "f05", type: "female", index: 4, name: "Elisabeth Mensah", role: "Religionslehrerin", bio: "Elisabeth bringt Perspektiven aus verschiedenen Kulturen in den Unterricht. Sie liebt Kochabende und Geschichten aus ihrer Familie." },
  { id: "f06", type: "female", index: 5, name: "Friederike Scholz", role: "Religionslehrerin", bio: "Friederike arbeitet gern mit Comics und Graphic Novels. Ihr Unterricht zeigt, dass Glaubensfragen mitten im Alltag auftauchen." },
  { id: "f07", type: "female", index: 6, name: "Gisela Neumann", role: "Religionslehrerin", bio: "Gisela ist eine erfahrene Zuhörerin und liebt biografisches Lernen. Sie führt gern Zeitzeugengespräche mit der Klasse." },
  { id: "f08", type: "female", index: 7, name: "Hanna Becker", role: "Religionslehrerin", bio: "Hanna gestaltet Lernräume mit viel Farbe. Wenn sie nicht unterrichtet, fotografiert sie Pflanzen und alte Haustüren." },
  { id: "f09", type: "female", index: 8, name: "Ingrid Lorenz", role: "Religionslehrerin", bio: "Ingrid mag klare Fragen und überraschende Antworten. Ihre Lieblingsstunde beginnt oft mit einem Gegenstand aus einer Schublade." },
  { id: "f10", type: "female", index: 9, name: "Johanna Seidel", role: "Religionslehrerin", bio: "Johanna macht gern Projekte zu Frieden und Mut. Sie spielt in einer kleinen Theatergruppe und schreibt kurze Szenen." },
  { id: "f11", type: "female", index: 10, name: "Katharina Busch", role: "Religionslehrerin", bio: "Katharina liebt den Wechsel zwischen Stille und Bewegung. Für ihre Klasse entwickelt sie gern kleine Lernspiele." },
  { id: "f12", type: "female", index: 11, name: "Lea Richter", role: "Religionslehrerin", bio: "Lea fragt nach dem, was junge Menschen heute beschäftigt. Sie moderiert außerdem einen Jugendpodcast über Werte." },
  { id: "f13", type: "female", index: 12, name: "Maria König", role: "Religionslehrerin", bio: "Maria erzählt gern von Hoffnung und Neuanfängen. Ihr Ausgleich ist das Töpfern, bei dem sie ganz im Moment ankommt." },
  { id: "f14", type: "female", index: 13, name: "Nora Yilmaz", role: "Religionslehrerin", bio: "Nora öffnet den Unterricht für mehrere religiöse Stimmen. Sie backt gern, liest Krimis und liebt gute Fragen ohne schnelle Antwort." },
  { id: "f15", type: "female", index: 14, name: "Susanne Wolf", role: "Religionslehrerin", bio: "Susanne arbeitet gern mit Naturmaterialien und Symbolen. Sie fährt mit dem Rad zur Schule und kennt viele Wege durch die Stadt." },
  { id: "m01", type: "male", index: 0, name: "Andreas Müller", role: "Religionslehrer", bio: "Andreas kann komplizierte Fragen verständlich erklären. Am Wochenende spielt er Tischtennis und kocht gern für Freunde." },
  { id: "m02", type: "male", index: 1, name: "Benjamin Hartung", role: "Religionslehrer", bio: "Benjamin liebt offene Lernformen und gute Musik. Er sammelt historische Postkarten und nutzt sie als Gesprächsimpulse." },
  { id: "m03", type: "male", index: 2, name: "Christian Faber", role: "Religionslehrer", bio: "Christian unterrichtet mit ruhiger Stimme und viel Neugier. Er interessiert sich für Kirchenräume und ihre Geschichten." },
  { id: "m04", type: "male", index: 3, name: "David Krüger", role: "Religionslehrer", bio: "David bringt Bewegung in den Unterricht. Er organisiert gern Projekttage und probiert mit Jugendlichen neue Medien aus." },
  { id: "m05", type: "male", index: 4, name: "Elias Okafor", role: "Religionslehrer", bio: "Elias erzählt von Vielfalt, Zugehörigkeit und Mut. Er spielt Bass in einer Band und kennt immer einen passenden Song." },
  { id: "m06", type: "male", index: 5, name: "Friedrich Hahn", role: "Religionslehrer", bio: "Friedrich mag sorgfältige Quellenarbeit und historische Rätsel. Seine Schüler:innen schätzen seine Geduld und seinen trockenen Humor." },
  { id: "m07", type: "male", index: 6, name: "Georg Winter", role: "Religionslehrer", bio: "Georg gestaltet gern Unterricht im Freien. Er kennt viele Geschichten über Bäume, Flüsse und Menschen, die neu anfangen." },
  { id: "m08", type: "male", index: 7, name: "Henrik Jansen", role: "Religionslehrer", bio: "Henrik verbindet Philosophie mit Alltagssituationen. Er fährt gern Zug und liest unterwegs alles, was ihm in die Hände fällt." },
  { id: "m09", type: "male", index: 8, name: "Jan Petersen", role: "Religionslehrer", bio: "Jan hört aufmerksam zu und lässt Diskussionen gern offen enden. Er fotografiert das Meer und sammelt Muscheln." },
  { id: "m10", type: "male", index: 9, name: "Jonas Meier", role: "Religionslehrer", bio: "Jonas arbeitet gern mit Bildern und kurzen Filmen. Sein Ausgleich ist das Klettern, das ihn Konzentration und Vertrauen lehrt." },
  { id: "m11", type: "male", index: 10, name: "Lukas Brandt", role: "Religionslehrer", bio: "Lukas ist Fan von Rollenspielen und baut daraus Lernabenteuer. Er schreibt nebenbei kleine Fantasygeschichten." },
  { id: "m12", type: "male", index: 11, name: "Matthias König", role: "Religionslehrer", bio: "Matthias nimmt sich Zeit für leise Stimmen. Er gärtnert gern und bringt manchmal selbstgezogene Kräuter mit in die Schule." },
  { id: "m13", type: "male", index: 12, name: "Niklas Sommer", role: "Religionslehrer", bio: "Niklas liebt Debatten und faire Regeln. Er fährt Skateboard, hilft im Jugendzentrum und entdeckt gern neue Perspektiven." },
  { id: "m14", type: "male", index: 13, name: "Paul Schneider", role: "Religionslehrer", bio: "Paul verbindet Religion und Kunst. Er zeichnet gern mit der Klasse und besucht in den Ferien Museen in kleinen Städten." },
  { id: "m15", type: "male", index: 14, name: "Samuel Roth", role: "Religionslehrer", bio: "Samuel glaubt an die Kraft guter Fragen. Er kocht gern vegetarisch und führt ein Notizbuch mit Unterrichtsideen." },
  { id: "n01", type: "nonbinary", index: 0, name: "Alex Morgen", role: "Religionslehrperson", bio: "Alex arbeitet mit Geschichten, Farben und viel Raum zum Nachdenken. Alex sammelt Stimmen aus der Klasse und macht daraus gemeinsame Lernwege." },
  { id: "n02", type: "nonbinary", index: 1, name: "Jona Stern", role: "Religionslehrperson", bio: "Jona interessiert sich für Gerechtigkeit und die vielen Formen, in denen Menschen füreinander da sind. Jona liebt Musik und lange Spaziergänge." },
  { id: "n03", type: "nonbinary", index: 2, name: "Robin Licht", role: "Religionslehrperson", bio: "Robin gestaltet Lernräume, in denen Neugier wichtiger ist als die perfekte Antwort. Robin baut gern Dinge und findet in jeder Stadt einen Lieblingsort." },
];

const HISTORICAL_FEMALE = [
  ["Katharina von Bora", "1499–1552", "Katharina von Bora war eine wichtige Gestalt der Reformation und organisierte das Leben im Haushalt Martin Luthers mit großer Selbstständigkeit. Sie wird oft als ‚Herr Käthe‘ erinnert."],
  ["Argula von Grumbach", "1492–1554", "Argula von Grumbach setzte sich als bayerische Adelige öffentlich für die reformatorische Botschaft ein und schrieb mutige Briefe über Gewissensfreiheit."],
  ["Katharina Zell", "1497–1562", "Katharina Zell wirkte in Straßburg als reformatorische Autorin, Seelsorgerin und Gastgeberin. Sie engagierte sich besonders für Geflüchtete und Bedürftige."],
  ["Wibrandis Rosenblatt", "1504–1564", "Wibrandis Rosenblatt unterstützte mehrere Reformatoren und Gemeinden. Sie prägte als Pfarrfrau, Organisatorin und Mutter das reformierte Leben ihrer Zeit."],
  ["Elisabeth Cruciger", "1500–1535", "Elisabeth Cruciger war die erste bekannte evangelische Liederdichterin. Ihr Lied ‚Herr Christ, der einig Gotts Sohn‘ wird bis heute gesungen."],
  ["Marie Dentière", "1495–1561", "Marie Dentière war eine wallonische reformierte Theologin. Sie schrieb über Bildung, Glauben und die aktive Rolle von Frauen in der Kirche."],
  ["Olympia Fulvia Morata", "1526–1555", "Olympia Fulvia Morata war eine humanistische Gelehrte und überzeugte Protestantin. Sie lehrte Sprachen und Philosophie und schrieb geistliche Texte."],
  ["Jeanne d’Albret", "1528–1572", "Jeanne d’Albret, Königin von Navarra, förderte die reformierte Kirche und ließ biblische Texte ins Baskische und Béarnische übersetzen."],
  ["Susanna Wesley", "1669–1742", "Susanna Wesley prägte die methodistische Erweckungsbewegung durch ihre intensive Bibellektüre, ihre Bildungsideen und die Erziehung ihrer Kinder."],
  ["Hannah More", "1745–1833", "Hannah More war eine anglikanische Schriftstellerin und Bildungsreformerin. Sie gründete Schulen für arme Kinder und schrieb verständliche christliche Texte."],
  ["Elizabeth Fry", "1780–1845", "Elizabeth Fry war eine evangelische Quäkerin und setzte sich für bessere Haftbedingungen, Bildung und Würde für Gefangene ein."],
  ["Mary Slessor", "1848–1915", "Mary Slessor war eine schottische presbyterianische Missionarin in Nigeria. Sie vermittelte, schlichtete Konflikte und setzte sich gegen Gewalt an Kindern ein."],
  ["Sojourner Truth", "1797–1883", "Sojourner Truth war eine methodistische Predigerin und Aktivistin gegen Sklaverei und für Frauenrechte. Ihre Reden verbanden Bibel, Freiheit und Menschenwürde."],
  ["Harriet Tubman", "1822–1913", "Harriet Tubman war eine gläubige Methodistin, Fluchthelferin und Bürgerrechtlerin. Ihr Glaube gab ihr Mut im Kampf gegen die Sklaverei."],
  ["Florence Nightingale", "1820–1910", "Florence Nightingale war Anglikanerin, Krankenpflegerin und Sozialreformerin. Sie verband ihren Glauben mit Statistik, Hygiene und praktischer Nächstenliebe."],
  ["Elisabeth Schmitz", "1893–1977", "Elisabeth Schmitz war eine evangelische Lehrerin und frühe Kritikerin des kirchlichen Versagens im Nationalsozialismus. Sie half verfolgten Menschen und schrieb gegen Antisemitismus."],
  ["Sophie Scholl", "1921–1943", "Sophie Scholl war Christin und Mitglied der Widerstandsgruppe Weiße Rose. Sie setzte sich aus Gewissensgründen gegen die nationalsozialistische Diktatur ein."],
  ["Corrie ten Boom", "1892–1983", "Corrie ten Boom stammte aus einer niederländisch-reformierten Familie und versteckte während der NS-Zeit verfolgte Menschen. Später sprach sie über Vergebung."],
  ["Dorothee Sölle", "1929–2003", "Dorothee Sölle war eine evangelische Theologin und Schriftstellerin. Sie verband Mystik mit politischer Verantwortung, Frieden und Gerechtigkeit."],
  ["Nannie Helen Burroughs", "1879–1961", "Nannie Helen Burroughs war eine baptistische Pädagogin und Bürgerrechtlerin. Sie gründete eine Schule und stärkte Bildung und Selbstbestimmung Schwarzer Frauen."],
].map((entry, index) => ({ id: `hf${String(index + 1).padStart(2, "0")}`, type: "female", index, historical: true, name: entry[0], period: entry[1], role: "Historische evangelische Persönlichkeit", bio: entry[2] }));

const HISTORICAL_MALE = [
  ["Martin Luther", "1483–1546", "Martin Luther war Theologe und Reformator. Seine Bibelübersetzung und seine Kritik an kirchlichen Missständen prägten die Reformation und die deutsche Sprache."],
  ["Philipp Melanchthon", "1497–1560", "Philipp Melanchthon war Humanist, Pädagoge und Reformator. Er verfasste grundlegende Bekenntnistexte und setzte sich für Bildung an Schulen und Universitäten ein."],
  ["Johannes Calvin", "1509–1564", "Johannes Calvin war ein Genfer Reformator und Theologe. Seine Schriften prägten viele reformierte Kirchen in Europa und darüber hinaus."],
  ["Huldrych Zwingli", "1484–1531", "Huldrych Zwingli führte in Zürich die Reformation an. Er verband Bibelauslegung, soziale Verantwortung und eine Erneuerung des Gemeinwesens."],
  ["Thomas Cranmer", "1489–1556", "Thomas Cranmer war Erzbischof von Canterbury und prägte die englische Reformation. Das Book of Common Prayer geht wesentlich auf seine Arbeit zurück."],
  ["John Knox", "1514–1572", "John Knox war ein schottischer Reformator und Begründer der presbyterianischen Tradition. Er setzte sich für eine bibelorientierte Kirche und Bildung ein."],
  ["William Tyndale", "1494–1536", "William Tyndale übersetzte das Neue Testament ins Englische. Seine Arbeit machte biblische Texte für viele Menschen zugänglich und beeinflusste die englische Sprache."],
  ["Menno Simons", "1496–1561", "Menno Simons war ein niederländischer reformatorischer Theologe. Nach ihm benannte sich die mennonitische Tradition, die Gewaltlosigkeit und Nachfolge betont."],
  ["John Wesley", "1703–1791", "John Wesley war anglikanischer Pfarrer und Begründer der methodistischen Erweckungsbewegung. Er verband persönliche Frömmigkeit mit sozialem Engagement."],
  ["George Whitefield", "1714–1770", "George Whitefield war ein anglikanischer Prediger der methodistischen Erweckungsbewegung. Seine Freiluftpredigten erreichten Menschen in Großbritannien und Nordamerika."],
  ["Nikolaus Ludwig von Zinzendorf", "1700–1760", "Nikolaus Ludwig von Zinzendorf gründete die Herrnhuter Brüdergemeine. Seine pietistische Gemeinschaft verband Gebet, Mission und internationale Zusammenarbeit."],
  ["August Hermann Francke", "1663–1727", "August Hermann Francke war lutherischer Theologe und Pädagoge. In Halle gründete er Schulen, ein Waisenhaus und Einrichtungen für soziale Bildung."],
  ["William Wilberforce", "1759–1833", "William Wilberforce war ein evangelischer anglikanischer Abgeordneter. Aus christlicher Überzeugung kämpfte er jahrzehntelang gegen den Sklavenhandel."],
  ["Charles Spurgeon", "1834–1892", "Charles Spurgeon war ein baptistischer Prediger und Gründer eines Predigerseminars. Er verband starke Predigten mit umfangreicher Armen- und Bildungsarbeit."],
  ["Dietrich Bonhoeffer", "1906–1945", "Dietrich Bonhoeffer war ein lutherischer Theologe und Widerstandskämpfer. Er dachte über verantwortliches Handeln und christlichen Mut in einer Diktatur nach."],
  ["Karl Barth", "1886–1968", "Karl Barth war ein reformierter Schweizer Theologe. Seine Kirchliche Dogmatik und die Barmer Theologische Erklärung prägten die evangelische Theologie."],
  ["Martin Niemöller", "1892–1984", "Martin Niemöller war ein lutherischer Pfarrer und Gegner des Nationalsozialismus. Nach dem Krieg setzte er sich für Frieden und kirchliche Erneuerung ein."],
  ["Martin Luther King Jr.", "1929–1968", "Martin Luther King Jr. war baptistischer Pastor und Bürgerrechtler. Sein gewaltfreier Einsatz wurzelte in christlicher Nächstenliebe und Menschenwürde."],
  ["Desmond Tutu", "1931–2021", "Desmond Tutu war ein anglikanischer Erzbischof und Menschenrechtsaktivist aus Südafrika. Er setzte sich gegen Apartheid und für Versöhnung ein."],
  ["Jonathan Edwards", "1703–1758", "Jonathan Edwards war ein reformierter Theologe und Prediger der Great Awakening. Er schrieb über Glauben, Gewissen und die Verantwortung der Gemeinschaft."],
].map((entry, index) => ({ id: `hm${String(index + 1).padStart(2, "0")}`, type: "male", index, historical: true, name: entry[0], period: entry[1], role: "Historische evangelische Persönlichkeit", bio: entry[2] }));

AVATARS.push(...HISTORICAL_FEMALE, ...HISTORICAL_MALE);

const ACCESSORIES = {
  none: { label: "Ohne", symbol: "" },
  glasses: { label: "Brille", symbol: "👓" },
  book: { label: "Buch", symbol: "📖" },
  mug: { label: "Tasse", symbol: "☕" },
  headphones: { label: "Kopfhörer", symbol: "🎧" },
  plant: { label: "Pflanze", symbol: "🌿" },
  star: { label: "Stern", symbol: "⭐" },
};

const PSEUDONYM_FIRST_NAMES = {
  female: ["Amina", "Amara", "Anouk", "Asha", "Aya", "Camila", "Elif", "Hana", "Mei", "Priya"],
  male: ["Bao", "Diego", "Idris", "Jae", "Kaleb", "Malik", "Omar", "Ravi", "Zain", "Kwame"],
  nonbinary: ["Alex", "Ari", "Eden", "Jona", "Kai", "Mika", "Noor", "Remy", "River", "Sol"],
};
const PSEUDONYM_SUFFIXES = ["Morgen", "Nordstern", "Fluss", "Feder", "Lichtblick"];
const PSEUDONYMS = Object.entries(PSEUDONYM_FIRST_NAMES).flatMap(([type, firstNames]) => firstNames.flatMap((firstName, firstIndex) => PSEUDONYM_SUFFIXES.map((suffix, suffixIndex) => ({ alias: `${firstName} ${suffix}`, type, profileIndex: firstIndex * PSEUDONYM_SUFFIXES.length + suffixIndex }))));

const YOUTH_BIOS = [
  "Anna ist 17 und interessiert sich dafür, wie Menschen Hoffnung finden. Sie zeichnet gern, spielt Volleyball und hilft bei der Schülerzeitung.",
  "Bettina ist 18 und liebt faire Diskussionen. Sie liest gern Graphic Novels und organisiert mit Freund:innen den nächsten Projekttag.",
  "Christina ist 16 und macht Musik in einer Band. Im Religionsunterricht fragt sie besonders gern nach Musik, Ritualen und Gemeinschaft.",
  "Dorothee ist 19 und engagiert sich für Nachhaltigkeit. Sie sammelt Argumente, hört aufmerksam zu und fährt am liebsten mit dem Rad.",
  "Elisabeth ist 17 und kocht gern mit ihrer Familie. Sie interessiert sich für Religionen und dafür, wie Traditionen im Alltag weiterleben.",
  "Friederike ist 18 und zeichnet Comics. Sie findet, dass schwierige Fragen leichter werden, wenn man sie aus mehreren Perspektiven betrachtet.",
  "Gisela ist 16 und hört gern Biografien älterer Menschen. Sie fotografiert, schreibt kurze Texte und entdeckt gern Geschichte im eigenen Ort.",
  "Hanna ist 17 und liebt Pflanzen. Sie interessiert sich für Schöpfungsverantwortung und macht aus fast jeder Stunde eine kreative Challenge.",
  "Ingrid ist 19 und diskutiert gern über Freiheit und Verantwortung. Sie liest Philosophie und arbeitet neben der Schule in einem Jugendtreff.",
  "Johanna ist 18 und spielt Theater. Sie kann sich gut in andere Rollen hineinversetzen und setzt sich für ein respektvolles Miteinander ein.",
  "Katharina ist 16 und baut gern Lernspiele. Sie mag ruhige Momente genauso wie laute Pausen und hat immer bunte Karteikarten dabei.",
  "Lea ist 17 und betreibt einen kleinen Podcast über Schule und Werte. Sie fragt nach, wenn etwas ungerecht wirkt, und sucht gern Lösungen.",
  "Maria ist 18 und töpfert in ihrer Freizeit. Sie interessiert sich für Neuanfänge, Hoffnung und die Frage, was Menschen Halt gibt.",
  "Nora ist 19 und liebt Krimis. Sie vergleicht gern religiöse Geschichten und fragt, wie unterschiedliche Stimmen miteinander ins Gespräch kommen.",
  "Susanne ist 16 und gern draußen. Sie sammelt Naturmaterialien, engagiert sich im Schulgarten und mag Symbole, die man anfassen kann.",
  "Andreas ist 17 und spielt Tischtennis. Er erklärt gern komplizierte Dinge, interessiert sich für Gerechtigkeit und kocht am Wochenende für Freunde.",
  "Benjamin ist 18 und sammelt historische Postkarten. Er verbindet gern Bilder mit Geschichten und macht aus Unterrichtsthemen kleine Ausstellungen.",
  "Christian ist 19 und interessiert sich für alte Kirchenräume. Er fotografiert Details und fragt, welche Geschichten Gebäude erzählen.",
  "David ist 16 und probiert gern neue Medien aus. Er organisiert Videoprojekte und findet, dass Lernen auch Bewegung und Humor braucht.",
  "Elias ist 17 und spielt Bass. Er interessiert sich für Zugehörigkeit und Vielfalt und kennt für fast jede Stimmung einen passenden Song.",
  "Friedrich ist 18 und liebt historische Rätsel. Er prüft Quellen gern genau und erklärt geduldig, warum verschiedene Sichtweisen wichtig sind.",
  "Georg ist 16 und verbringt viel Zeit draußen. Er interessiert sich für Natur, Verantwortung und die Geschichten hinter alten Bräuchen.",
  "Henrik ist 19 und liest gern Philosophie im Zug. Er mag Gespräche, die nicht sofort zu einer einfachen Antwort führen.",
  "Jan ist 17 und fotografiert das Meer. Er hört aufmerksam zu, sammelt Muscheln und interessiert sich für Hoffnung in schwierigen Situationen.",
  "Jonas ist 18 und klettert gern. Er weiß, wie wichtig Vertrauen ist, und beschäftigt sich mit Mut, Risiko und Verantwortung.",
  "Lukas ist 16 und erfindet Fantasygeschichten. Er baut daraus Rollenspiele, in denen die Klasse gemeinsam Entscheidungen treffen kann.",
  "Matthias ist 17 und gärtnert gern. Er interessiert sich für Geduld, Wachstum und die Frage, wie Menschen füreinander sorgen.",
  "Niklas ist 19 und fährt Skateboard. Er setzt sich für faire Regeln ein und diskutiert gern darüber, wer in einer Gruppe gehört wird.",
  "Paul ist 18 und zeichnet. Er verbindet Kunst mit religiösen Symbolen und besucht gern Museen, in denen Bilder Geschichten erzählen.",
  "Samuel ist 16 und kocht gern vegetarisch. Er sammelt gute Fragen und findet, dass ein gemeinsames Essen viele Gespräche möglich macht.",
  "Alex ist 17 und gestaltet gern Poster für Schulprojekte. Alex interessiert sich für Zugehörigkeit, Mut und Räume, in denen alle sie selbst sein können.",
  "Jona ist 18 und macht Musik. Jona beschäftigt sich mit Gerechtigkeit und den vielen Formen, in denen Menschen füreinander da sind.",
  "Robin ist 19 und baut gern Dinge. Robin sucht in jeder Stadt einen Lieblingsort und fragt, wie Gemeinschaft entstehen kann.",
];

AVATARS.forEach((avatar, index) => {
  avatar.portraitIndex = avatar.portraitIndex ?? avatar.index;
  if (avatar.historical) return;
  avatar.role = avatar.type === "female" ? "Schülerin" : avatar.type === "male" ? "Schüler" : "Schüler:in";
  avatar.bio = YOUTH_BIOS[index];
  avatar.age = Number(avatar.bio.match(/\b(16|17|18|19)\b/)[1]);
});

const avatarScript = document.currentScript;
const AVATAR_ASSET_ROOT = avatarScript && avatarScript.src ? new URL("./assets/", avatarScript.src).href : "./assets/";
const AVATAR_ASSET_VERSION = "crop-2026-08-01";
window.AVATARS = AVATARS;
window.ACCESSORIES = ACCESSORIES;
window.PSEUDONYMS = PSEUDONYMS;

class LernAvatar extends HTMLElement {
  static observedAttributes = ["type", "index", "name", "accessory", "background", "historical"];

  connectedCallback() { this.setAttribute("role", "img"); this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const type = this.getAttribute("type") || "female";
    const index = Number(this.getAttribute("index") || 0);
    const historical = this.getAttribute("historical") === "true";
    const profile = AVATARS.find((avatar) => avatar.type === type && avatar.portraitIndex === index && Boolean(avatar.historical) === historical) || AVATARS[0];
    const accessory = ACCESSORIES[this.getAttribute("accessory") || "none"] || ACCESSORIES.none;
    const name = this.getAttribute("name") || profile.name;
    const sheet = historical ? `historical-${type}` : type === "female" ? "female-teen" : type === "male" ? "male-teen" : "nonbinary-teen";
    const columns = historical ? 5 : type === "nonbinary" ? 3 : 5;
    const rows = historical ? 4 : type === "nonbinary" ? 1 : 3;
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = columns === 1 ? 0 : (col / (columns - 1)) * 100;
    const y = rows === 1 ? 0 : (row / (rows - 1)) * 100;
    const background = this.getAttribute("background") || "#f4eadb";
    this.style.setProperty("--avatar-frame", background);
    this.setAttribute("aria-label", `${name}, ${profile.role}`);
    this.innerHTML = `<span class="lern-avatar__portrait" style="--sheet:url('${AVATAR_ASSET_ROOT}avatars-${sheet}.png?v=${AVATAR_ASSET_VERSION}');--x:${x}%;--y:${y}%;--cols:${columns};--rows:${rows};--avatar-bg:${background}"></span><span class="lern-avatar__accessory" aria-hidden="true">${accessory.symbol}</span>`;
  }
}

if (!customElements.get("lern-avatar")) customElements.define("lern-avatar", LernAvatar);
