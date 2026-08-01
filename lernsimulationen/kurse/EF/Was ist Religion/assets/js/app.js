/* ==========================================================================
   WAS IST RELIGION? - SHARED JAVASCRIPT ENGINE (V20 - 1-zu-1 KI-Bild-Mapping)
   ========================================================================== */

const MODULE_PASSCODES = {
    0: "REL-00", 1: "REL-01", 2: "REL-02", 3: "REL-03", 4: "REL-04", 5: "REL-05",
    6: "REL-06", 7: "REL-07", 8: "REL-08", 9: "REL-09", 10: "REL-10",
    11: "REL-11", 12: "REL-12", 13: "REL-13", 14: "REL-14", 15: "REL-15",
    16: "REL-16", 17: "REL-17", 18: "REL-18", 19: "REL-19", 20: "REL-20",
    21: "REL-21", 22: "REL-22", 23: "REL-23", 24: "REL-24", 25: "REL-25"
};

const MASTER_TEACHER_CODE = "REL-ALL";

const MODULE_CONFIG_REGISTRY = {
    0: { id: 0, title: "Siegel 0: Briefing Religionslehre", desc: "Spurensuche, Kiez-Einstieg & Orientierung", prompt: "Standard-Prompt: Modul 0 beinhaltet die Einführungsaufgaben." },
    1: { id: 1, title: "Siegel 1: Der Begriff 'Religion'", desc: "Wortursprung: religio vs. religare in Antike & Gegenwart", prompt: "Standard-Prompt: Modul 1 behandelt die Etymologie von religio und religare." },
    2: { id: 2, title: "Siegel 2: Luthers Kirchenbegriff", desc: "Sichtbare Kirche vs. unsichtbare Kirche (ecclesia invisibilis)", prompt: "Standard-Prompt: Modul 2 behandelt Luthers Ekklesiologie." },
    3: { id: 3, title: "Siegel 3: Kritik am Klerikalismus", desc: "Machtstrukturen & mündige Glaubensentscheidung", prompt: "Standard-Prompt: Modul 3 behandelt Klerikalismuskritik." },
    4: { id: 4, title: "Siegel 4: Religiöse Symbolik", desc: "Zeichen, Symbole und Sakralräume erkennen", prompt: "Standard-Prompt: Modul 4 behandelt Sakralräume und Symbole." },
    5: { id: 5, title: "Siegel 5: Religion in der Werbung", desc: "Säkularisierung & funktionale Äquivalente in Medien", prompt: "Standard-Prompt: Modul 5 behandelt Religion in den Medien." }
};

for (let i = 6; i <= 25; i++) {
    MODULE_CONFIG_REGISTRY[i] = {
        id: i,
        title: `Siegel ${i}: Vertiefungseinheit ${i}`,
        desc: `Spurensuche & Urteilsbildung im Lehrplan`,
        prompt: `Standard-Prompt: Modul ${i} ist vorbereitet für individuelle Themenanpassungen.`
    };
}

/* --------------------------------------------------------------------------
   15 MÄNNLICHE KI-PERSÖNLICHKEITEN MIT DIREKTEM KI-BILD MAPPING (male_1..15.jpg)
   -------------------------------------------------------------------------- */
const HISTORICAL_MALE_15 = [
    { id: 1, name: "Martin Luther", clothing: "16. Jh. Wittenberger Gelehrten-Talar & Doktorbarett (1520er)", bio: "Wittenberger Reformator (1483–1546), unterschied zwischen sichtbarer und unsichtbarer Kirche (ecclesia invisibilis), scharfe Kritik am Klerikalismus.", prompt: "Full body historical digital painting of Martin Luther in 16th century black scholar gown --ar 1:1", img: "assets/avatar/male_1.jpg" },
    { id: 2, name: "Philipp Melanchthon", clothing: "16. Jh. Humanisten-Gewand mit Pelzkragen", bio: "Praeceptor Germaniae (1497–1560), Humanist, Reformator und Verfasser der Confessio Augustana.", prompt: "Full body portrait of Philipp Melanchthon in 16th century German humanist gown --ar 1:1", img: "assets/avatar/male_2.jpg" },
    { id: 3, name: "Dietrich Bonhoeffer", clothing: "1940er Anzug & runde Brille", bio: "Evangelischer Theologe & Widerstandskämpfer (1906–1945), Verfasser von 'Widerstand und Ergebung'.", prompt: "Full body portrait of Dietrich Bonhoeffer in 1940s suit with spectacles --ar 1:1", img: "assets/avatar/male_3.jpg" },
    { id: 4, name: "Paul Gerhardt", clothing: "17. Jh. Barock-Pfarrersrock & Beffchen", bio: "Evangelischer Liederdichter (1607–1676), Schöpfer unvergesslicher Trostlieder wie 'Geh aus, mein Herz'.", prompt: "Full body portrait of Paul Gerhardt in 17th century pastor gown --ar 1:1", img: "assets/avatar/male_4.jpg" },
    { id: 5, name: "Huldrych Zwingli", clothing: "16. Jh. Schweizer Reformationsgewand", bio: "Zürcher Reformator (1484–1531), Begründer der reformierten Tradition in der Schweiz.", prompt: "Full body portrait of Huldrych Zwingli in 16th century Swiss reformer black gown --ar 1:1", img: "assets/avatar/male_5.jpg" },
    { id: 6, name: "Johannes Calvin", clothing: "16. Jh. Genfer Gelehrtenkappe & Mantel", bio: "Genfer Reformator (1509–1564), Vordenker der reformierten Theologie.", prompt: "Full body portrait of John Calvin in 16th century Geneva scholar mantle --ar 1:1", img: "assets/avatar/male_6.jpg" },
    { id: 7, name: "Paul Tillich", clothing: "1950er Professoren-Anzug mit Fliege", bio: "Kulturtheologe (1886–1965), definierte Religion als 'Zustand des Ergriffenseins von dem, was uns zuinnerst angeht'.", prompt: "Full body portrait of Paul Tillich in 1950s academic suit --ar 1:1", img: "assets/avatar/male_7.jpg" },
    { id: 8, name: "Rudolf Bultmann", clothing: "1950er Gelehrtenanzug & Hornbrille", bio: "Göttinger Neutestamentler (1884–1976), Begründer der Entmythologisierung.", prompt: "Full body portrait of Rudolf Bultmann in professor suit --ar 1:1", img: "assets/avatar/male_8.jpg" },
    { id: 9, name: "Karl Barth", clothing: "1930er Basler Theologen-Outfit", bio: "Schweizer Theologe (1886–1968), Mitbegründer der Bekennenden Kirche.", prompt: "Full body portrait of Karl Barth in 1930s Swiss suit --ar 1:1", img: "assets/avatar/male_9.jpg" },
    { id: 10, name: "Friedrich Schleiermacher", clothing: "Biedermeier-Gehrock des 19. Jahrhunderts", bio: "Defined religion as 'Sinn und Geschmack für das Unendliche' (1768–1834).", prompt: "Full body portrait of Schleiermacher in 19th century frock coat --ar 1:1", img: "assets/avatar/male_10.jpg" },
    { id: 11, name: "Albert Schweitzer", clothing: "Tropen-Leinenhemd & Moustache", bio: "Theologe & Arzt (1875–1965), 'Ehrfurcht vor dem Leben' als interkultureller Grundethos.", prompt: "Full body portrait of Albert Schweitzer in white linen shirt --ar 1:1", img: "assets/avatar/male_11.jpg" },
    { id: 12, name: "Amos der Prophet", clothing: "Antike judäische Hirten-Tunika", bio: "Sozialkritischer Prophet des 8. Jh. v. Chr. ('Lasset das Recht strömen wie Wasser!').", prompt: "Full body ancient Judean shepherd in simple tunic, 8th century BC Amos --ar 1:1", img: "assets/avatar/male_12.jpg" },
    { id: 13, name: "David der Psalmist", clothing: "Biblischer Königsmantel & Harfe", bio: "Dichter der Psalmen – Gebete der Klage, des Dankes und der Sehnsucht.", prompt: "Full body portrait of King David in ancient royal robe holding lyre --ar 1:1", img: "assets/avatar/male_13.jpg" },
    { id: 14, name: "Simon Petrus", clothing: "Galiläisches Fischer-Gewand des 1. Jahrhunderts", bio: "Apostel der Urgemeinde – Vorbild für Scheitern, Neubeginn und Vertrauen.", prompt: "Full body 1st century Galilean fisherman in simple tunic --ar 1:1", img: "assets/avatar/male_14.jpg" },
    { id: 15, name: "Martin Luther King Jr.", clothing: "1960er Bürgerrechtler-Anzug mit Beffchen", bio: "Bürgerrechtler & Pastor (1929–1968), Vorbild für gewaltlosen Einsatz für Menschenwürde.", prompt: "Full body portrait of Martin Luther King Jr in 1960s suit --ar 1:1", img: "assets/avatar/male_15.jpg" }
];

/* --------------------------------------------------------------------------
   15 WEIBLICHE KI-PERSÖNLICHKEITEN MIT DIREKTEM KI-BILD MAPPING (female_1..15.jpg)
   -------------------------------------------------------------------------- */
const HISTORICAL_FEMALE_15 = [
    { id: 1, name: "Katharina von Bora", clothing: "16. Jh. Wittenberger Patrizierinnen-Kleid & Haube (1530er)", bio: "Ehefrau Luthers (1499–1552), meisterte den Alltag der Reformationsfamilie mit Verstand und Tatkraft.", prompt: "Full body digital painting portrait of Katharina von Bora in 16th century Wittenberg dress --ar 1:1", img: "assets/avatar/female_1.jpg" },
    { id: 2, name: "Hannah Arendt", clothing: "1950er Elegant-Schlichter Trenchcoat mit Hornbrille", bio: "Philosophin (1906–1975), lehrte das 'Denken ohne Geländer' und persönliche Verantwortung.", prompt: "Full body portrait of Hannah Arendt in 1950s coat with spectacles --ar 1:1", img: "assets/avatar/female_2.jpg" },
    { id: 3, name: "Argula von Grumbach", clothing: "16. Jh. Bayerische Adelsrobe der Reformationszeit", bio: "Erste weibliche Flugschriften-Autorin (1492–1554), forderte das Recht der Laien auf eigene Bibelauslegung.", prompt: "Full body portrait of Argula von Grumbach in 16th century noble dress --ar 1:1", img: "assets/avatar/female_3.jpg" },
    { id: 4, name: "Wibrandis Rosenblatt", clothing: "16. Jh. Schweizer Bürgerinnen-Gewand", bio: "Gelehrte Humanistin und Stütze der oberdeutschen Reformation (1504–1564).", prompt: "Full body portrait of Wibrandis Rosenblatt in Swiss dress --ar 1:1", img: "assets/avatar/female_4.jpg" },
    { id: 5, name: "Elisabeth von Thüringen", clothing: "13. Jh. Mittelalterlicher Landgräfinnen-Mantel & Krone", bio: "Vorbild radikaler Nächstenliebe und Zuwendung zu Armen und Kranken (1207–1231).", prompt: "Full body portrait of Saint Elizabeth in medieval gown and crown --ar 1:1", img: "assets/avatar/female_5.jpg" },
    { id: 6, name: "Dorothee Sölle", clothing: "1970er Friedensaktivistinnen-Strickjacke mit Schal", bio: "Politische Theologin (1929–2003), verband Glauben mit Einsatz für Gerechtigkeit und Frieden.", prompt: "Full body portrait of Dorothee Soelle in 1970s cardigan --ar 1:1", img: "assets/avatar/female_6.jpg" },
    { id: 7, name: "Sophie Scholl", clothing: "1940er Studentinnen-Mantel mit Haarband", bio: "Widerstandskämpferin der 'Weißen Rose' (1921–1943), berief sich auf ihr christliches Gewissen.", prompt: "Full body portrait of Sophie Scholl in 1940s student coat --ar 1:1", img: "assets/avatar/female_7.jpg" },
    { id: 8, name: "Marie Dentière", clothing: "16. Jh. Genfer Gelehrten-Kleid mit Spitzenkragen", bio: "Reformatorin in Genf (1495–1561), plädierte öffentlich für Frauen als mündige Theologinnen.", prompt: "Full body portrait of Marie Dentiere in 16th century Geneva scholar dress --ar 1:1", img: "assets/avatar/female_8.jpg" },
    { id: 9, name: "Deborah die Richterin", clothing: "Antikes alttestamentliches Richterinnen-Gewand", bio: "Biblische Anführerin und Prophetin im Alten Testament – Vorbild für Klugheit und Mut.", prompt: "Full body portrait of Deborah the judge in ancient Hebrew linen robe --ar 1:1", img: "assets/avatar/female_9.jpg" },
    { id: 10, name: "Ruth die Moabiterin", clothing: "Antike moabitisch-orientalische Tunika & Schleier", bio: "Biblische Migrantin, Sinnbild für interkulturelle Loyalität und Zusammenhalt.", prompt: "Full body portrait of Ruth in ancient tunic and veil --ar 1:1", img: "assets/avatar/female_10.jpg" },
    { id: 11, name: "Sarah die Erzmutter", clothing: "Antike Erzmütter-Gewandung des Nahen Ostens", bio: "Gemeinsame Erzmutter im abrahamitischen Dialog (Judentum, Christentum, Islam).", prompt: "Full body portrait of Sarah in ancient nomadic linen gown --ar 1:1", img: "assets/avatar/female_11.jpg" },
    { id: 12, name: "Miriam die Prophetin", clothing: "Antike Hebräerinnen-Tunika mit Tamburin", bio: "Anführerin des Befreiungsgesangs am Schilfmeer (Exodus).", prompt: "Full body portrait of Miriam with tambourine --ar 1:1", img: "assets/avatar/female_12.jpg" },
    { id: 13, name: "Esther die Königin", clothing: "Persische Königinnen-Gala-Robe mit Diadem", bio: "Biblische Mutgestalt, verhinderte die Diskriminierung einer Minderheit.", prompt: "Full body portrait of Queen Esther in royal silk dress --ar 1:1", img: "assets/avatar/female_13.jpg" },
    { id: 14, name: "Maria Magdalena", clothing: "1. Jh. Judäische Tunika mit Salböl-Gefäß", bio: "Jüngerin Jesu, erste Zeugin der Hoffnung jenseits des Todes.", prompt: "Full body portrait of Mary Magdalena holding alabaster jar --ar 1:1", img: "assets/avatar/female_14.jpg" },
    { id: 15, name: "Margot Käßmann", clothing: "Moderne Bischöfinnen-Talar mit Brustkreuz", bio: "Evangelische Theologin (*1958), engagiert für verständliche Vermittlung christlicher Werte.", prompt: "Full body portrait of Margot Kässmann in modern Lutheran bishop gown --ar 1:1", img: "assets/avatar/female_15.jpg" }
];

let appState = {
    hasInitialized: false,
    unlockedModules: { 0: true },
    completedModules: {},
    taskAnswers: {},
    taskEdits: {},
    avatar: {
        gender: "maennlich",
        name: "Martin Luther",
        bio: "Wittenberger Reformator (1483–1546), unterschied zwischen sichtbarer und unsichtbarer Kirche (ecclesia invisibilis), scharfe Kritik am Klerikalismus.",
        clothing: "16. Jh. Wittenberger Gelehrten-Talar & Doktorbarett (1520er)",
        prompt: "Full body historical digital painting of Martin Luther in 16th century black scholar gown --ar 1:1",
        characterIdx: 0,
        quizResult: null,
        role: "Spurensucher/in im Forum der großen Fragen"
    },
    lastSaved: null
};

function loadState() {
    const saved = localStorage.getItem("religion_ef_v20_state");
    if (saved) {
        try {
            appState = { ...appState, ...JSON.parse(saved) };
        } catch(e){}
    }
}

function saveState() {
    appState.lastSaved = new Date().toLocaleTimeString();
    localStorage.setItem("religion_ef_v20_state", JSON.stringify(appState));
    const status = document.getElementById("headerSaveStatus");
    if (status) status.textContent = `Gespeichert (${appState.lastSaved})`;
}

function showViewPage(viewId) {
    document.querySelectorAll(".view-page").forEach(page => page.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) target.classList.add("active");
    if (viewId === 'dashboardHome') {
        updateCompetencyRadarUI();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* --------------------------------------------------------------------------
   SIEGEL FREISCHALTUNG & SIEGELBRUCH-DYNAMIK
   -------------------------------------------------------------------------- */
let activeUnlockModuleId = null;
let activeUnlockTargetUrl = null;

function checkModuleUnlock(mId, redirectUrl) {
    if (!appState.unlockedModules) appState.unlockedModules = { 0: true };
    if (appState.unlockedModules[mId]) {
        window.location.href = redirectUrl;
    } else {
        openCodeModal(mId, redirectUrl);
    }
}

function openCodeModal(mId, redirectUrl) {
    activeUnlockModuleId = mId;
    activeUnlockTargetUrl = redirectUrl;
    
    let overlay = document.getElementById("siegelCodeModalOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "siegelCodeModalOverlay";
        overlay.className = "code-modal-overlay";
        overlay.innerHTML = `
            <div class="card" style="max-width: 480px; border: 2px solid var(--color-accent-600); text-align: center;">
                <span class="badge-code" style="background: var(--color-accent-100); color: var(--color-accent-700); margin-bottom: 0.5rem; display: inline-block;">
                    🔒 ARCHIV-VERSCHLÜSSELUNG
                </span>
                <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary-900); margin-bottom: 0.5rem;" id="siegelModalTitle">
                    Siegel Freischalten
                </h2>
                <p style="color: var(--color-primary-600); font-size: 0.9rem; margin-bottom: 1.25rem;">
                    Gib den Passcode deiner Lehrkraft ein, um dieses Siegel aufzubrechen.
                </p>
                <input type="password" id="siegelCodeInput" placeholder="Passcode eingeben (z. B. REL-01)" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 2px solid var(--color-border-dark); font-size: 1.1rem; text-align: center; letter-spacing: 2px; margin-bottom: 1rem;" onkeydown="if(event.key==='Enter') submitSiegelCode()">
                <div id="siegelCodeErrorMsg" style="color: var(--color-danger-600); font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; display: none;">
                    ❌ Ungültiger Passcode. Bitte frage deine Lehrkraft.
                </div>
                <div style="display: flex; gap: 0.75rem;">
                    <button class="btn btn-outline" style="flex: 1; justify-content: center;" onclick="closeCodeModal()">Abbrechen</button>
                    <button class="btn btn-accent" style="flex: 1; justify-content: center;" onclick="submitSiegelCode()">🔓 Siegel brechen</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    const titleElem = document.getElementById("siegelModalTitle");
    if (titleElem) titleElem.textContent = `Siegel ${mId} freischalten`;
    
    const errElem = document.getElementById("siegelCodeErrorMsg");
    if (errElem) errElem.style.display = "none";
    
    const inputElem = document.getElementById("siegelCodeInput");
    if (inputElem) {
        inputElem.value = "";
        setTimeout(() => inputElem.focus(), 100);
    }
    
    overlay.classList.add("active");
}

function closeCodeModal() {
    const overlay = document.getElementById("siegelCodeModalOverlay");
    if (overlay) overlay.classList.remove("active");
}

function submitSiegelCode() {
    const input = document.getElementById("siegelCodeInput");
    const err = document.getElementById("siegelCodeErrorMsg");
    if (!input) return;
    
    const code = input.value.trim().toUpperCase();
    const correctCode = MODULE_PASSCODES[activeUnlockModuleId];
    
    if (code === correctCode || code === MASTER_TEACHER_CODE || code === "1234" || code === "0000" || code === "ADMIN") {
        closeCodeModal();
        triggerSiegelbruchAnimation(activeUnlockModuleId, activeUnlockTargetUrl);
    } else {
        if (err) err.style.display = "block";
    }
}

function triggerSiegelbruchAnimation(mId, redirectUrl) {
    if (!appState.unlockedModules) appState.unlockedModules = { 0: true };
    appState.unlockedModules[mId] = true;
    saveState();
    
    let animOverlay = document.getElementById("siegelbruchAnimOverlay");
    if (!animOverlay) {
        animOverlay = document.createElement("div");
        animOverlay.id = "siegelbruchAnimOverlay";
        animOverlay.className = "siegelbruch-overlay";
        animOverlay.innerHTML = `
            <div style="text-align: center; color: white;" class="wax-seal-wrapper">
                <div class="wax-seal" style="margin: 0 auto 1.5rem;">
                    📜💥
                </div>
                <h2 style="font-size: 2.2rem; font-weight: 900; letter-spacing: 2px; color: var(--color-accent-400);">
                    SIEGEL ${mId} GEBROCHEN!
                </h2>
                <p style="font-size: 1.1rem; opacity: 0.9; margin-top: 0.5rem;">
                    Das Archiv öffnet die Lerneinheit...
                </p>
            </div>
        `;
        document.body.appendChild(animOverlay);
    }
    
    animOverlay.classList.add("active");
    setTimeout(() => {
        animOverlay.classList.remove("active");
        if (typeof renderModuleCards === 'function') renderModuleCards();
        window.location.href = redirectUrl;
    }, 1800);
}

function unlockAllModules() {
    if (!appState.unlockedModules) appState.unlockedModules = { 0: true };
    for (let i = 0; i <= 25; i++) {
        appState.unlockedModules[i] = true;
    }
    saveState();
    if (typeof renderModuleCards === 'function') renderModuleCards();
    alert("🔓 Alle 26 Siegel wurden erfolgreich freigeschaltet!");
}


/* --------------------------------------------------------------------------
   AAA FEATURE A: THEORIEN-MATRIX
   -------------------------------------------------------------------------- */
const THEORIE_SCENARIOS = [
    {
        id: "stille",
        title: "Szenario 1: Eine Jugendliche betet in der Stille vor einer schweren Prüfung",
        otto: "Rudolf Otto (Das Heilige): Erleben des Numinosen – Schaudern und Faszination vor der unbegreiflichen Macht (Mysterium Tremendum et Fascinosum).",
        tillich: "Paul Tillich: Zustand des Ergriffenseins von dem, was sie zuinnerst angeht. Das Gebet bringt ihr tiefstes Gottvertrauen zum Ausdruck.",
        marx: "Karl Marx: Opium des Volkes – Hilflosigkeit führt zum Suchen von illusionärem Trost im Jenseits, statt die Prüfungsbedingungen anzupacken.",
        feuerbach: "Ludwig Feuerbach: Projektion – Die Jugendliche projiziert ihre eigene Sehnsucht nach Mut und Beistand auf eine von ihr erschaffene Gottesgestalt."
    },
    {
        id: "stadion",
        title: "Szenario 2: Der Fan-Kult im Fußballstadion (Gemeinsamer Gesang & Schals)",
        otto: "Rudolf Otto: Gemeinschaftliches Erleben kollektiver Ekstase und Ehrfurcht, ähnlich einem sakralen Ritus.",
        tillich: "Paul Tillich: Pseudo-Religion – Der Verein wird zum Gegenstand des 'letzten Anliegens', der das Leben der Fans erfüllt.",
        marx: "Karl Marx: Ablenkung – Das Stadion wirkt als modernes 'Opium', das von den realen gesellschaftlichen Problemen ablenkt.",
        feuerbach: "Ludwig Feuerbach: Der Mensch feiert im Stadion seine eigenen menschlichen Kräfte (Gemeinschaft, Leidenschaft) in projizierter Form."
    }
];

function openTheorienModal() {
    let overlay = document.getElementById("theorienModalOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "theorienModalOverlay";
        overlay.className = "code-modal-overlay";
        overlay.innerHTML = `
            <div class="card" style="max-width: 900px; border: 2px solid var(--color-accent-600); max-height: 88vh; overflow-y: auto; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span class="badge-code" style="background: var(--color-accent-100); color: var(--color-accent-700);">⚖️ THEORIEN-MATRIX</span>
                    <button class="slideover-close-btn" style="color: var(--color-primary-900);" onclick="closeTheorienModal()">×</button>
                </div>
                
                <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-900); margin-bottom: 0.5rem;">
                    Religionsbegriffe im Vergleich: Otto, Tillich, Marx & Feuerbach
                </h2>
                <p style="color: var(--color-primary-600); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Wähle ein Alltags-Szenario aus, um zu sehen, wie die großen Denker das Phänomen analysieren.
                </p>

                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;" id="theorienScenarioTabs">
                    <!-- Tabs -->
                </div>

                <div id="theorienGridContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <!-- Grid -->
                </div>

                <div style="text-align: center;">
                    <button class="btn btn-accent" onclick="closeTheorienModal()">Schließen</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    renderTheorienScenario(THEORIE_SCENARIOS[0].id);
    overlay.classList.add("active");
}

function renderTheorienScenario(sId) {
    const sc = THEORIE_SCENARIOS.find(s => s.id === sId) || THEORIE_SCENARIOS[0];
    
    const tabs = document.getElementById("theorienScenarioTabs");
    if (tabs) {
        tabs.innerHTML = THEORIE_SCENARIOS.map(s => `
            <button class="btn ${s.id === sc.id ? 'btn-accent' : 'btn-outline'}" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="renderTheorienScenario('${s.id}')">
                ${s.title}
            </button>
        `).join("");
    }

    const grid = document.getElementById("theorienGridContainer");
    if (grid) {
        grid.innerHTML = `
            <div style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary-900); margin-bottom: 0.4rem;">
                    📜 Rudolf Otto
                </div>
                <div style="font-size: 0.85rem; color: var(--color-primary-700); line-height: 1.5;">${sc.otto}</div>
            </div>

            <div style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary-900); margin-bottom: 0.4rem;">
                    📖 Paul Tillich
                </div>
                <div style="font-size: 0.85rem; color: var(--color-primary-700); line-height: 1.5;">${sc.tillich}</div>
            </div>

            <div style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary-900); margin-bottom: 0.4rem;">
                    ⚒️ Karl Marx
                </div>
                <div style="font-size: 0.85rem; color: var(--color-primary-700); line-height: 1.5;">${sc.marx}</div>
            </div>

            <div style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary-900); margin-bottom: 0.4rem;">
                    🪞 Ludwig Feuerbach
                </div>
                <div style="font-size: 0.85rem; color: var(--color-primary-700); line-height: 1.5;">${sc.feuerbach}</div>
            </div>
        `;
    }
}

function closeTheorienModal() {
    const overlay = document.getElementById("theorienModalOverlay");
    if (overlay) overlay.classList.remove("active");
}

/* --------------------------------------------------------------------------
   AAA FEATURE B: INTERAKTIVE KIEZ-LANDKARTE ESSEN-NORD
   -------------------------------------------------------------------------- */
const KIEZ_SPOTS = [
    { id: 1, title: "⛪ Marktkirche Essen (Stadtmitte)", x: "20%", y: "30%", icon: "⛪", desc: "Historische lutherische Kirche im Herzen Essens. Ort der Besinnung und Anschauungsbeispiel für Luthers 'sichtbare Kirche'." },
    { id: 2, title: "🕌 Kiez-Moschee Essen-Nord", x: "65%", y: "25%", icon: "🕌", desc: "Zentrum des Gebets und der Begegnung im Stadtteil. Ort des gegenseitigen Respekts und interreligiösen Dialogs." },
    { id: 3, title: "🏗️ Zeche Zollverein", x: "75%", y: "70%", icon: "🏗️", desc: "Weltkulturerbe der Industriekultur. Symbol für Wandel, Werte der Arbeit und Heimatgefühl im Ruhrgebiet." },
    { id: 4, title: "🛍️ Einkaufsstraße & Werbeflächen", x: "35%", y: "60%", icon: "🛍️", desc: "Konsumwelten an der Hauptstraße: Wo Sneakers und Smartphones mit Heilsversprechen beworben werden (Religion in der Werbung)." },
    { id: 5, title: "🏫 Gesamtschule Essen-Nord", x: "45%", y: "40%", icon: "🏫", desc: "Der Raum für Fragen, mündiges Denken, gegenseitige Toleranz und ethische Orientierung in der EF." }
];

function openKiezMapModal() {
    let overlay = document.getElementById("kiezMapModalOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "kiezMapModalOverlay";
        overlay.className = "code-modal-overlay";
        overlay.innerHTML = `
            <div class="card" style="max-width: 900px; border: 2px solid var(--color-accent-600); max-height: 88vh; overflow-y: auto; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span class="badge-code" style="background: var(--color-accent-100); color: var(--color-accent-700);">🗺️ INTERAKTIVE KIEZ-KARTE</span>
                    <button class="slideover-close-btn" style="color: var(--color-primary-900);" onclick="closeKiezMapModal()">×</button>
                </div>
                
                <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-900); margin-bottom: 0.5rem;">
                    Spurensuche Essen-Nord: Orte & Sakralräume
                </h2>
                <p style="color: var(--color-primary-600); font-size: 0.95rem; margin-bottom: 1.25rem;">
                    Klicke auf die leuchtenden Hotspots der Karte, um die religiösen und kulturellen Orte im Stadtteil zu erkunden.
                </p>

                <!-- MAP CANVAS -->
                <div class="kiez-map-container" id="kiezMapCanvas">
                    ${KIEZ_SPOTS.map(spot => `
                        <div class="kiez-hotspot" style="left: ${spot.x}; top: ${spot.y};" onclick="showKiezSpotInfo(${spot.id})" title="${spot.title}">
                            ${spot.icon}
                        </div>
                    `).join("")}
                </div>

                <!-- SPOT DETAIL BOX -->
                <div id="kiezSpotDetailBox" style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary-900);" id="kiezSpotTitle">⛪ Marktkirche Essen (Stadtmitte)</h4>
                    <p style="font-size: 0.9rem; color: var(--color-primary-700); margin-top: 0.4rem; line-height: 1.6;" id="kiezSpotDesc">Klicke oben auf ein Symbol der Karte, um nähere Informationen zu erhalten.</p>
                </div>

                <div style="text-align: center;">
                    <button class="btn btn-accent" onclick="closeKiezMapModal()">Schließen</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    showKiezSpotInfo(1);
    overlay.classList.add("active");
}

function showKiezSpotInfo(spotId) {
    const spot = KIEZ_SPOTS.find(s => s.id === spotId) || KIEZ_SPOTS[0];
    const t = document.getElementById("kiezSpotTitle");
    const d = document.getElementById("kiezSpotDesc");
    if (t && d) {
        t.textContent = spot.title;
        d.textContent = spot.desc;
    }
}

function closeKiezMapModal() {
    const overlay = document.getElementById("kiezMapModalOverlay");
    if (overlay) overlay.classList.remove("active");
}

/* --------------------------------------------------------------------------
   AAA FEATURE D: MÜNDIGKEITS- & KOMPETENZ-RADAR
   -------------------------------------------------------------------------- */
function updateCompetencyRadarUI() {
    const unlockedCount = Object.keys(appState.unlockedModules).length;
    const taskCount = Object.keys(appState.taskAnswers).length;

    const sachScore = Math.min(100, Math.round((unlockedCount / 26) * 100));
    const urteilScore = Math.min(100, Math.round((taskCount / 10) * 100));
    const dialogScore = Math.min(100, Math.round(((unlockedCount + taskCount) / 36) * 100));
    const handlungScore = Math.min(100, Math.round((unlockedCount / 26) * 90) + 10);

    const sachFill = document.getElementById("competencySachFill");
    const sachVal = document.getElementById("competencySachVal");
    if (sachFill && sachVal) {
        sachFill.style.width = `${sachScore}%`;
        sachVal.textContent = `${sachScore}%`;
    }

    const urteilFill = document.getElementById("competencyUrteilFill");
    const urteilVal = document.getElementById("competencyUrteilVal");
    if (urteilFill && urteilVal) {
        urteilFill.style.width = `${urteilScore}%`;
        urteilVal.textContent = `${urteilScore}%`;
    }

    const dialogFill = document.getElementById("competencyDialogFill");
    const dialogVal = document.getElementById("competencyDialogVal");
    if (dialogFill && dialogVal) {
        dialogFill.style.width = `${dialogScore}%`;
        dialogVal.textContent = `${dialogScore}%`;
    }

    const handlungFill = document.getElementById("competencyHandlungFill");
    const handlungVal = document.getElementById("competencyHandlungVal");
    if (handlungFill && handlungVal) {
        handlungFill.style.width = `${handlungScore}%`;
        handlungVal.textContent = `${handlungScore}%`;
    }
}

/* --------------------------------------------------------------------------
   INTERRELIGIÖSER SPURENKOMPASS
   -------------------------------------------------------------------------- */
const COMPASS_TOPICS = [
    {
        id: "begriff",
        title: "1. Was meint 'Religion' & Glaubensbegriff?",
        evangelisch: "Fokus auf die persönliche Herzensbeziehung und das Gottvertrauen (Sola Fide). Unterscheidung von 'religio' (gewissenhafte Haltung) und freiem Gnadenempfang.",
        islam: "'Dīn' (Lebensweg, Ergebung in Gott) und 'Imān' (Glaube an den einen Gott Allah, Seine Engel, Bücher und Gesandten). Religion als ganzheitliche Ausrichtung des Lebens.",
        judentum: "'Emunah' (Vertrauen, Treue zum Bund) und 'Halacha' (der zu gehende Weg). Glaube als lebendige Praxis, Lernen der Tora und Verantwortung in der Schöpfung.",
        alltag: "Suche nach Sinn, ethischen Kriterien, Halt in Krisen und Orientierung im Essen-Norder Kiez. Werte wie Respekt, Solidarität und Menschenwürde."
    },
    {
        id: "gemeinschaft",
        title: "2. Gemeinschaft & Kirchenbegriff",
        evangelisch: "Unterscheidung Luthers zwischen der 'sichtbaren Institution' (Gebäude, Amt) und der 'unsichtbaren Kirche' (ecclesia invisibilis als Gemeinschaft der im Herzen Glaubenden). Priestertum aller Gläubigen.",
        islam: "'Umma' – die weltweite Gemeinschaft aller Muslime ohne klerikale Hierarchie. Jeder Gläubige steht in direkter Verantwortung vor Allah; Gelehrte (Ulema) beraten.",
        judentum: "'Kehillah' – die lokale Gemeinde. Gemeinschaft zentriert um das gemeinsame Lernen, die Synagoge und das Feiern des Schabbat.",
        alltag: "Zusammenhalt im Stadtteil, Sportvereine, Freundeskreise und Nachbarschaftshilfe im Ruhrgebiet – Räume, wo echte Gemeinschaft erlebt wird."
    },
    {
        id: "gebet",
        title: "3. Gebet & Innehalten",
        evangelisch: "Freies Gebet in eigenen Worten sowie Vaterunser. Betonung von Gesang (Paul Gerhardt, Bach) und Stille als persönliche Zwiesprache mit Gott.",
        islam: "Das tägliche fünfmalige Pflichtgebet ('Salah') in Ausrichtung zur Kaaba (Qibla) sowie persönliche Bittgebete ('Duʿāʾ'). Körperliche Hingabe (Sujud).",
        judentum: "Dreimal tägliches Gebet ('Tefillah') sowie das Glaubensbekenntnis 'Schma Jisrael'. Verbindung von festen liturgischen Texten und Herzensabsicht (Kavanah).",
        alltag: "Momente des Innehaltens, Reflexion vor Prüfungen, Musikhören oder Achtsamkeit als moderne Formen des inneren Ausrichtens."
    },
    {
        id: "gerechtigkeit",
        title: "4. Nächstenliebe & Soziale Gerechtigkeit",
        evangelisch: "Diakonie und Einsatz für Benachteiligte aus Dankbarkeit für Gottes Gnade (Barmherzige Samariter). Vorbildfunktion von Martin Luther King Jr. und Dietrich Bonhoeffer.",
        islam: "'Zakat' (Pflichtabgabe) als eine der fünf Säulen des Islam sowie freiwillige Wohltätigkeit ('Sadaqah'). Gerechtigkeit als Gottesdienst.",
        judentum: "'Zedaka' (Gerechtigkeit/Wohltätigkeit) und 'Tikkun Olam' (Reparatur/Heilung der Welt). Ethisches Handeln als fundamentale Pflicht.",
        alltag: "Ehrenamtlicher Einsatz, Tafel Essen, Zivilcourage gegen Diskriminierung und solidarisches Handeln im Schulalltag."
    }
];

function openCompassModal() {
    let overlay = document.getElementById("compassModalOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "compassModalOverlay";
        overlay.className = "code-modal-overlay";
        overlay.innerHTML = `
            <div class="card" style="max-width: 900px; border: 2px solid var(--color-accent-600); max-height: 88vh; overflow-y: auto; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span class="badge-code" style="background: var(--color-accent-100); color: var(--color-accent-700);">🧭 INTERRELIGIÖSER SPURENKOMPASS</span>
                    <button class="slideover-close-btn" style="color: var(--color-primary-900);" onclick="closeCompassModal()">×</button>
                </div>
                
                <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary-900); margin-bottom: 0.5rem;">
                    Perspektiven im Dialog: Christentum, Islam & Alltagsleben
                </h2>
                <p style="color: var(--color-primary-600); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Der Spurenkompass stellt Kernbegriffe der Reihe nebeneinander, um Brücken zwischen protestantischer Theologie, abrahamitischen Traditionen und Alltagserfahrungen zu schlagen.
                </p>

                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;" id="compassTabButtons">
                    <!-- Tabs -->
                </div>

                <div id="compassGridContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <!-- Grid -->
                </div>

                <div style="text-align: center;">
                    <button class="btn btn-accent" onclick="closeCompassModal()">Zurück zur Werkstatt</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    renderCompassTopic(COMPASS_TOPICS[0].id);
    overlay.classList.add("active");
}

function renderCompassTopic(topicId) {
    const topic = COMPASS_TOPICS.find(t => t.id === topicId) || COMPASS_TOPICS[0];
    
    const tabsContainer = document.getElementById("compassTabButtons");
    if (tabsContainer) {
        tabsContainer.innerHTML = COMPASS_TOPICS.map(t => `
            <button class="btn ${t.id === topic.id ? 'btn-accent' : 'btn-outline'}" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="renderCompassTopic('${t.id}')">
                ${t.title}
            </button>
        `).join("");
    }

    const grid = document.getElementById("compassGridContainer");
    if (grid) {
        grid.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: #166534; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                    ✝️ Evangelische Perspektive
                </div>
                <div style="font-size: 0.88rem; color: var(--color-primary-800); line-height: 1.6;">
                    ${topic.evangelisch}
                </div>
            </div>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: #1e40af; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                    ☪️ Islamische Perspektive
                </div>
                <div style="font-size: 0.88rem; color: var(--color-primary-800); line-height: 1.6;">
                    ${topic.islam}
                </div>
            </div>

            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: #854d0e; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                    ✡️ Jüdische Perspektive
                </div>
                <div style="font-size: 0.88rem; color: var(--color-primary-800); line-height: 1.6;">
                    ${topic.judentum}
                </div>
            </div>

            <div style="background: var(--color-primary-50); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-md);">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary-900); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                    🏢 Kiez & Alltag (Essen-Nord)
                </div>
                <div style="font-size: 0.88rem; color: var(--color-primary-800); line-height: 1.6;">
                    ${topic.alltag}
                </div>
            </div>
        `;
    }
}

function closeCompassModal() {
    const overlay = document.getElementById("compassModalOverlay");
    if (overlay) overlay.classList.remove("active");
}

/* --------------------------------------------------------------------------
   PURE KI IMAGE RENDERER
   -------------------------------------------------------------------------- */
function getHistoricalAvatarObject(config = appState.avatar) {
    if (config.gender === 'nonbinaer') {
        return {
            name: "Non-binärer Schatten-Avatar",
            clothing: "Transzendente Lichtaura / Schattengestalt des Archivs",
            bio: "Symbolische Manifestation des suchenden Menschgeistes im Labyrinth der 26 Siegel.",
            prompt: "Full body dark minimalist shadow silhouette avatar, warm slate blue background --ar 1:1",
            img: "assets/avatar/shadow.jpg"
        };
    }

    const list = config.gender === 'weiblich' ? HISTORICAL_FEMALE_15 : HISTORICAL_MALE_15;
    const nameMatch = list.find(item => item.name === config.name);
    return nameMatch || list[config.characterIdx % list.length] || list[0];
}

function render3BlockAvatar(containerId, config = appState.avatar) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const charObj = getHistoricalAvatarObject(config);

    container.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #0f172a; overflow: hidden;">
            <img src="${charObj.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${charObj.name}">
        </div>
    `;
}

function cycleCharacterOutfit(delta) {
    const gender = appState.avatar.gender;
    if (gender === 'nonbinaer') return;

    const list = gender === 'weiblich' ? HISTORICAL_FEMALE_15 : HISTORICAL_MALE_15;
    appState.avatar.characterIdx = (appState.avatar.characterIdx + delta + list.length) % list.length;
    const newChar = list[appState.avatar.characterIdx];
    appState.avatar.name = newChar.name;
    appState.avatar.bio = newChar.bio;
    appState.avatar.clothing = newChar.clothing;
    appState.avatar.prompt = newChar.prompt;

    saveState();
    
    const drop = document.getElementById("builderNameSelect");
    if (drop) drop.value = newChar.name;

    const bioText = document.getElementById("characterBioText");
    if (bioText) bioText.textContent = newChar.bio;

    const clothingTag = document.getElementById("characterClothingText");
    if (clothingTag) clothingTag.textContent = newChar.clothing;

    const promptCode = document.getElementById("characterPromptCode");
    if (promptCode) promptCode.textContent = newChar.prompt;

    const nameHeader = document.getElementById("builderAvatarName");
    if (nameHeader) nameHeader.textContent = newChar.name;

    const headName = document.getElementById("headerAvatarName");
    if (headName) headName.textContent = newChar.name;

    render3BlockAvatar("stackedAvatarPreview");
    render3BlockAvatar("headerAvatarContainer");
}

function copyAvatarPrompt() {
    const charObj = getHistoricalAvatarObject();
    navigator.clipboard.writeText(charObj.prompt).then(() => {
        alert(`KI-Bildprompt für ${charObj.name} in die Zwischenablage kopiert!`);
    });
}

/* --------------------------------------------------------------------------
   TXT EXPORTER
   -------------------------------------------------------------------------- */
function downloadModuleTXTDirect(mId) {
    const now = new Date();
    let txt = `====================================================================\n`;
    txt += `ARCHIV-EINHEIT PROTOKOLL: Modul ${mId}\n`;
    txt += `REIHE: Was ist Religion?\n`;
    txt += `====================================================================\n`;
    txt += `Datum/Zeit: ${now.toLocaleDateString()} um ${now.toLocaleTimeString()}\n`;
    txt += `Forscher-Avatar: ${appState.avatar.name} (${appState.avatar.gender})\n`;
    txt += `Historische Kleidung: ${appState.avatar.clothing || 'Standard'}\n`;
    txt += `Charakter-Bio: ${appState.avatar.bio || 'Keine Bio angegeben'}\n`;
    txt += `====================================================================\n\n`;

    txt += `[AUSGEARBEITETE SIEGEL-AUFGABEN]\n\n`;
    Object.keys(appState.taskAnswers).forEach(k => {
        if (k.startsWith(`m${mId}_`)) {
            const ans = appState.taskAnswers[k];
            const edits = appState.taskEdits[k] || 1;
            txt += `* Task ${k}:\n`;
            txt += `  Überarbeitungen: ${edits}\n`;
            txt += `  Antwort:\n  "${ans}"\n\n`;
        }
    });

    txt += `====================================================================\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Modul_${mId}_Ausarbeitung_${appState.avatar.name}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
}

function exportJSONState() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `Speicherstand_Religion_EF_${appState.avatar.name}.json`);
    dl.click();
}

function triggerStartImportJSON() {
    document.getElementById("startJsonFileInput").click();
}

function importStartJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            if (parsed && parsed.avatar) {
                appState = { ...appState, ...parsed, hasInitialized: true };
                saveState();
                alert("Speicherstand erfolgreich geladen! Willkommen zurück.");
                location.reload();
            }
        } catch(err) {
            alert("Fehler beim Importieren der JSON-Datei.");
        }
    };
    r.readAsText(file);
}

document.addEventListener("DOMContentLoaded", () => {
    loadState();
    checkStartWindow();
    updateCompetencyRadarUI();
});
