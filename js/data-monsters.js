// ============================================================================
// Bestiariusz D&D 5e (AideDD / Monster Manual / MP:MM)
// Źródło referencyjne: https://www.aidedd.org/monster-dnd5/
// Pełne bloki statystyk (KP, PW z formułą kości, Szybkości, 6 Cech, Rzuty obronne,
// Zmysły, Odporności, Cechy pasywne, Klikalne Akcje z rzutami na Trafienie i Obrażenia
// oraz Akcje Legendarne) + Generator Portretów SVG Potworów
// ============================================================================

(function () {
  const TYPE_THEMES = {
    "Beast":       { bg1: "#14291b", bg2: "#0a160e", accent: "#34d399", icon: "🐾" },
    "Dragon":      { bg1: "#3b1014", bg2: "#1b0608", accent: "#f87171", icon: "🐉" },
    "Undead":      { bg1: "#1f1833", bg2: "#0e0a1a", accent: "#c084fc", icon: "💀" },
    "Fiend":       { bg1: "#36120c", bg2: "#180604", accent: "#fb923c", icon: "😈" },
    "Aberration":  { bg1: "#281136", bg2: "#12061a", accent: "#e879f9", icon: "👁️" },
    "Monstrosity": { bg1: "#2c1e12", bg2: "#160e07", accent: "#fbbf24", icon: "🦂" },
    "Humanoid":    { bg1: "#192436", bg2: "#0b111c", accent: "#60a5fa", icon: "⚔️" },
    "Giant":       { bg1: "#242834", bg2: "#10131a", accent: "#93c5fd", icon: "🗿" },
    "Elemental":   { bg1: "#102c38", bg2: "#07151c", accent: "#38bdf8", icon: "🌪️" },
    "Construct":   { bg1: "#292524", bg2: "#141210", accent: "#d6d3d1", icon: "⚙️" },
    "Fey":         { bg1: "#132e29", bg2: "#071714", accent: "#2dd4bf", icon: "🦋" },
    "Celestial":   { bg1: "#332b12", bg2: "#191506", accent: "#fde047", icon: "🪽" },
    "Ooze":        { bg1: "#1a2e12", bg2: "#0c1707", accent: "#a3e635", icon: "🟢" },
    "Plant":       { bg1: "#182b14", bg2: "#0b1609", accent: "#4ade80", icon: "🌿" }
  };

  const portraitCache = {};

  window.getMonsterPortraitUri = function (monster) {
    if (!monster) return "";
    const key = monster.id || monster.name_en;
    if (portraitCache[key]) return portraitCache[key];

    const t = TYPE_THEMES[monster.type_en] || TYPE_THEMES["Monstrosity"];
    const crLabel = `CR ${monster.cr}`;
    const initStr = (monster.name_pl || monster.name_en || "?").slice(0, 2).toUpperCase();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <radialGradient id="mg_${key}" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${t.bg1}"/>
          <stop offset="100%" stop-color="${t.bg2}"/>
        </radialGradient>
      </defs>
      <rect width="120" height="120" rx="20" fill="url(#mg_${key})" stroke="${t.accent}" stroke-width="3"/>
      <circle cx="60" cy="52" r="34" fill="none" stroke="${t.accent}" stroke-opacity="0.32" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="60" y="64" text-anchor="middle" font-size="36" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${monster.icon || t.icon}</text>
      <rect x="16" y="90" width="88" height="20" rx="10" fill="#090710" fill-opacity="0.82" stroke="${t.accent}" stroke-width="1.2"/>
      <text x="60" y="104" text-anchor="middle" fill="${t.accent}" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="11">${crLabel} • ${initStr}</text>
    </svg>`;

    const uri = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    portraitCache[key] = uri;
    return uri;
  };

  window.DND_MONSTERS = [
    // =========================================================================
    // 1. BESTIE (BEASTS — Chowańce, Wild Shape Druida i Polimorfia)
    // =========================================================================
    {
      id: "owl",
      name_pl: "Sowa (Chowaniec)",
      name_en: "Owl",
      icon: "🦉",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Tiny (Malutki)",
      alignment_pl: "Bez charakteru",
      cr: "0",
      cr_num: 0,
      xp: 10,
      ac: 11,
      ac_desc: "naturalny",
      hp: 1,
      hp_formula: "1d4-1",
      speed: "5 ft, lot 60 ft",
      abilities: { STR: 3, DEX: 13, CON: 8, INT: 2, WIS: 12, CHA: 7 },
      skills_pl: "Percepcja +3, Skradanie się +3",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Przelot (Flyby)", desc_pl: "Sowa nie prowokuje ataków okazyjnych, gdy wylatuje poza zasięg wroga (idealna do akcji Pomocy / Help jako chowaniec!)." },
        { name_pl: "Wyostrzony Wzrok i Słuch (Keen Hearing and Sight)", desc_pl: "Sowa ma ułatwienie (Advantage) w testach Mądrości (Percepcja) opartych na wzroku lub słuchu." }
      ],
      actions: [
        { name_pl: "Szpony (Talons)", atk_bonus: 3, dmg_dice: "1d1", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +3 do trafienia, zasięg 5 ft, jeden cel. Trafienie: 1 obrażenie cięte." }
      ]
    },
    {
      id: "wolf",
      name_pl: "Wilk",
      name_en: "Wolf",
      icon: "🐺",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Medium (Średni)",
      alignment_pl: "Bez charakteru",
      cr: "1/4",
      cr_num: 0.25,
      xp: 50,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 11,
      hp_formula: "2d8+2",
      speed: "40 ft",
      abilities: { STR: 12, DEX: 15, CON: 12, INT: 3, WIS: 12, CHA: 6 },
      skills_pl: "Percepcja +3, Skradanie się +4",
      senses_pl: "Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Wilk ma ułatwienie (Advantage) w rzucie ataku przeciwko stworzeniu, jeśli w odległości 5 ft od tego stworzenia znajduje się przynajmniej jeden nieobezwładniony sojusznik wilka." },
        { name_pl: "Wyostrzony Słuch i Węch", desc_pl: "Ułatwienie w testach Percepcji opartych na słuchu lub węchu." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 4, dmg_dice: "2d4+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 7 (2k4+2) obrażeń kłutych. Jeśli cel jest stworzeniem, musi zdać rzut obronny SIŁ ST 11 albo zostaje powalony (Prone)." }
      ]
    },
    {
      id: "giant-wolf-spider",
      name_pl: "Olbrzymi Pająk Wilczy",
      name_en: "Giant Wolf Spider",
      icon: "🕷️",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Medium (Średni)",
      alignment_pl: "Bez charakteru",
      cr: "1/4",
      cr_num: 0.25,
      xp: 50,
      ac: 13,
      ac_desc: "naturalny",
      hp: 11,
      hp_formula: "2d8+2",
      speed: "40 ft, wspinaczka 40 ft",
      abilities: { STR: 12, DEX: 16, CON: 13, INT: 3, WIS: 12, CHA: 4 },
      skills_pl: "Percepcja +3, Skradanie się +7",
      senses_pl: "Ślepowidzenie 10 ft, Widzenie w ciemności 60 ft, Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Pajęcza Wspinaczka (Spider Climb)", desc_pl: "Pająk może wspinać się po trudnych powierzchniach, w tym chodzić do góry nogami po sufitach, bez wykonywania testów cech." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 3, dmg_dice: "1d6+1", dmg_type_pl: "kłute + 2k6 trucizny", desc_pl: "Atak bronią wręcz: +3 do trafienia. Trafienie: 4 (1k6+1) kłutych, a cel wykonuje rzut obronny KON ST 11, otrzymując 7 (2k6) obrażeń od trucizny przy porażce (połowę przy sukcesie)." }
      ]
    },
    {
      id: "black-bear",
      name_pl: "Niedźwiedź Czarny",
      name_en: "Black Bear",
      icon: "🐻",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Medium (Średni)",
      alignment_pl: "Bez charakteru",
      cr: "1/2",
      cr_num: 0.5,
      xp: 100,
      ac: 11,
      ac_desc: "naturalny pancerz",
      hp: 19,
      hp_formula: "3d8+6",
      speed: "40 ft, wspinaczka 30 ft",
      abilities: { STR: 15, DEX: 10, CON: 14, INT: 2, WIS: 12, CHA: 7 },
      skills_pl: "Percepcja +3",
      senses_pl: "Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Wyostrzony Węch (Keen Smell)", desc_pl: "Niedźwiedź ma ułatwienie w testach Mądrości (Percepcja) opartych na węchu." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Niedźwiedź wykonuje dwa ataki: jeden ugryzieniem i jeden pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 5 (1k6+2) obrażeń kłutych." },
        { name_pl: "Pazury (Claws)", atk_bonus: 4, dmg_dice: "2d4+2", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 7 (2k4+2) obrażeń ciętych." }
      ]
    },
    {
      id: "brown-bear",
      name_pl: "Niedźwiedź Brunatny (Wild Shape Poz. 2 Kręgu Księżyca)",
      name_en: "Brown Bear",
      icon: "🐻",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 11,
      ac_desc: "naturalny pancerz",
      hp: 34,
      hp_formula: "4d10+12",
      speed: "40 ft, wspinaczka 30 ft",
      abilities: { STR: 19, DEX: 10, CON: 16, INT: 2, WIS: 13, CHA: 7 },
      skills_pl: "Percepcja +3",
      senses_pl: "Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Wyostrzony Węch (Keen Smell)", desc_pl: "Ułatwienie w testach Percepcji opartych na węchu." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Niedźwiedź wykonuje dwa ataki: jeden ugryzieniem i jeden pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 6, dmg_dice: "1d8+4", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +6 do trafienia, zasięg 5 ft. Trafienie: 8 (1k8+4) obrażeń kłutych." },
        { name_pl: "Pazury (Claws)", atk_bonus: 6, dmg_dice: "2d6+4", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +6 do trafienia, zasięg 5 ft. Trafienie: 11 (2k6+4) obrażeń ciętych." }
      ]
    },
    {
      id: "dire-wolf",
      name_pl: "Straszliwy Wilk (Dire Wolf — Wild Shape Poz. 2)",
      name_en: "Dire Wolf",
      icon: "🐺",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 14,
      ac_desc: "naturalny pancerz",
      hp: 37,
      hp_formula: "5d10+10",
      speed: "50 ft",
      abilities: { STR: 17, DEX: 15, CON: 15, INT: 3, WIS: 12, CHA: 7 },
      skills_pl: "Percepcja +3, Skradanie się +4",
      senses_pl: "Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Ułatwienie w rzutach ataku, gdy sojusznik stoi w odległości 5 ft od celu." },
        { name_pl: "Wyostrzony Słuch i Węch", desc_pl: "Ułatwienie w testach Percepcji opartych na słuchu lub węchu." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +5 do trafienia, zasięg 5 ft. Trafienie: 10 (2k6+3) obrażeń kłutych. Jeśli cel jest stworzeniem, musi zdać rzut obronny SIŁ ST 13 albo zostaje powalony na ziemię (Prone)." }
      ]
    },
    {
      id: "giant-spider",
      name_pl: "Olbrzymi Pająk (Wild Shape)",
      name_en: "Giant Spider",
      icon: "🕷️",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 14,
      ac_desc: "naturalny pancerz",
      hp: 26,
      hp_formula: "4d10+4",
      speed: "30 ft, wspinaczka 30 ft",
      abilities: { STR: 14, DEX: 16, CON: 12, INT: 2, WIS: 11, CHA: 4 },
      skills_pl: "Skradanie się +7",
      senses_pl: "Ślepowidzenie 10 ft, Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "—",
      traits: [
        { name_pl: "Pajęcza Wspinaczka i Wyczucie Sieci", desc_pl: "Chodzi po ścianach i suficie bez testów oraz zna dokładną pozycję każdego stworzenia dotykającego tej samej pajęczyny." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "kłute + 2k8 trucizny", desc_pl: "Atak bronią wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) kłutych, a cel wykonuje rzut obronny KON ST 11, otrzymując 9 (2k8) obrażeń od trucizny (połowa przy sukcesie; przy spadku do 0 PW cel jest stabilny, ale Zatruty i Sparaliżowany na 1h)." },
        { name_pl: "Sieć (Web — Odnowienie 5–6)", atk_bonus: 5, desc_pl: "Atak bronią dystansową: +5 do trafienia, zasięg 30/60 ft. Trafienie: Cel zostaje Unieruchomiony (Restrained) przez pajęczynę (w akcji test SIŁ ST 12 by się wyrwać; sieć ma KP 10 i 5 PW)." }
      ]
    },
    {
      id: "giant-constrictor-snake",
      name_pl: "Olbrzymi Wąż Dusiciel (Wild Shape Poz. 6 Kręgu Księżyca)",
      name_en: "Giant Constrictor Snake",
      icon: "🐍",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Huge (Ogromny)",
      alignment_pl: "Bez charakteru",
      cr: "2",
      cr_num: 2,
      xp: 450,
      ac: 12,
      ac_desc: "naturalny",
      hp: 60,
      hp_formula: "8d12+8",
      speed: "30 ft, pływanie 30 ft",
      abilities: { STR: 19, DEX: 14, CON: 12, INT: 1, WIS: 10, CHA: 3 },
      skills_pl: "Percepcja +2",
      senses_pl: "Ślepowidzenie 10 ft, Pasywna Percepcja 12",
      languages_pl: "—",
      traits: [],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 6, dmg_dice: "2d6+4", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +6 do trafienia, zasięg 10 ft. Trafienie: 11 (2k6+4) obrażeń kłutych." },
        { name_pl: "Duszenie (Constrict)", atk_bonus: 6, dmg_dice: "2d8+4", dmg_type_pl: "obuchowe + Unieruchomienie", desc_pl: "Atak bronią wręcz: +6 do trafienia, zasięg 5 ft. Trafienie: 13 (2k8+4) obrażeń obuchowych, a cel zostaje automatycznie Pochwycony (Grappled, ST ucieczki 16) i Unieruchomiony (Restrained)!" }
      ]
    },
    {
      id: "giant-scorpion",
      name_pl: "Olbrzymi Skorpion (Wild Shape Poz. 9 Kręgu Księżyca)",
      name_en: "Giant Scorpion",
      icon: "🦂",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 15,
      ac_desc: "naturalny pancerz",
      hp: 52,
      hp_formula: "7d10+14",
      speed: "40 ft",
      abilities: { STR: 15, DEX: 13, CON: 15, INT: 1, WIS: 9, CHA: 3 },
      senses_pl: "Ślepowidzenie 60 ft, Pasywna Percepcja 9",
      languages_pl: "—",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Skorpion wykonuje trzy ataki: dwa szczypcami i jeden żądłem." },
        { name_pl: "Szczypce (Claw)", atk_bonus: 4, dmg_dice: "1d8+2", dmg_type_pl: "obuchowe + Pochwycenie", desc_pl: "Atak wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 6 (1k8+2) obuchowych i cel zostaje Pochwycony (ST ucieczki 12)." },
        { name_pl: "Żądło (Sting)", atk_bonus: 4, dmg_dice: "1d10+2", dmg_type_pl: "kłute + 4k10 trucizny", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 7 (1k10+2) kłutych oraz rzut obronny KON ST 12 na 22 (4k10) obrażeń od trucizny (połowa przy sukcesie)." }
      ]
    },
    {
      id: "mammoth",
      name_pl: "Mamut (Wild Shape Poz. 18 / Polimorfia)",
      name_en: "Mammoth",
      icon: "🦣",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Huge (Ogromny)",
      alignment_pl: "Bez charakteru",
      cr: "6",
      cr_num: 6,
      xp: 2300,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 126,
      hp_formula: "11d12+55",
      speed: "40 ft",
      abilities: { STR: 24, DEX: 9, CON: 21, INT: 3, WIS: 11, CHA: 6 },
      senses_pl: "Pasywna Percepcja 10",
      languages_pl: "—",
      traits: [
        { name_pl: "Stratowanie w Szarży (Trampling Charge)", desc_pl: "Jeśli mamut poruszy się o co najmniej 20 ft prosto w stronę stworzenia i trafi je Ciosami Kłów w tej samej turze, cel musi zdać rzut obronny SIŁ ST 18 albo zostaje powalony (Prone), a mamut może wykonać przeciwko niemu dodatkowy atak Stratowaniem w akcji dodatkowej!" }
      ],
      actions: [
        { name_pl: "Kły (Gore)", atk_bonus: 10, dmg_dice: "4d8+7", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +10 do trafienia, zasięg 10 ft. Trafienie: 25 (4k8+7) obrażeń kłutych." },
        { name_pl: "Stratowanie (Stomp)", atk_bonus: 10, dmg_dice: "4d10+7", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią wręcz przeciwko powalonemu celowi: +10 do trafienia, zasięg 5 ft. Trafienie: 29 (4k10+7) obrażeń obuchowych." }
      ]
    },
    {
      id: "giant-ape",
      name_pl: "Wielka Małpa — King Kong (Najlepsza Polimorfia Poz. 7!)",
      name_en: "Giant Ape",
      icon: "🦍",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Huge (Ogromny)",
      alignment_pl: "Bez charakteru",
      cr: "7",
      cr_num: 7,
      xp: 2900,
      ac: 12,
      ac_desc: "naturalny",
      hp: 157,
      hp_formula: "15d12+60",
      speed: "40 ft, wspinaczka 40 ft",
      abilities: { STR: 23, DEX: 14, CON: 18, INT: 7, WIS: 12, CHA: 7 },
      skills_pl: "Atletyka +9, Percepcja +4",
      senses_pl: "Pasywna Percepcja 14",
      languages_pl: "—",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Wielka małpa wykonuje dwa ataki pięściami." },
        { name_pl: "Pięść (Fist)", atk_bonus: 9, dmg_dice: "3d10+6", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią wręcz: +9 do trafienia, zasięg 10 ft. Trafienie: 22 (3k10+6) obrażeń obuchowych." },
        { name_pl: "Głaz (Rock)", atk_bonus: 9, dmg_dice: "7d6+6", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią dystansową: +9 do trafienia, zasięg 50/100 ft. Trafienie: 30 (7k6+6) obrażeń obuchowych." }
      ]
    },
    {
      id: "tyrannosaurus-rex",
      name_pl: "Tyranozaur (T-Rex — Polimorfia Poz. 8)",
      name_en: "Tyrannosaurus Rex",
      icon: "🦖",
      type_pl: "Bestia",
      type_en: "Beast",
      size: "Huge (Ogromny)",
      alignment_pl: "Bez charakteru",
      cr: "8",
      cr_num: 8,
      xp: 3900,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 136,
      hp_formula: "13d12+52",
      speed: "50 ft",
      abilities: { STR: 25, DEX: 10, CON: 19, INT: 2, WIS: 12, CHA: 9 },
      skills_pl: "Percepcja +4",
      senses_pl: "Pasywna Percepcja 14",
      languages_pl: "—",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Tyranozaur wykonuje dwa ataki: jeden ugryzieniem i jeden ogonem (w dwa różne cele)." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 10, dmg_dice: "4d12+7", dmg_type_pl: "kłute + Unieruchomienie", desc_pl: "Atak bronią wręcz: +10 do trafienia, zasięg 10 ft. Trafienie: 33 (4k12+7) obrażeń kłutych. Średni lub mniejszy cel zostaje automatycznie Pochwycony (ST 17) i Unieruchomiony (Restrained) w paszczy!" },
        { name_pl: "Ogon (Tail)", atk_bonus: 10, dmg_dice: "3d8+7", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią wręcz: +10 do trafienia, zasięg 10 ft. Trafienie: 20 (3k8+7) obrażeń obuchowych." }
      ]
    },

    // =========================================================================
    // 2. HUMANOIDY, GOBLINOIDY I NPC (HUMANOIDS)
    // =========================================================================
    {
      id: "kobold",
      name_pl: "Kobold",
      name_en: "Kobold",
      icon: "🦎",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Small (Mały)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "1/8",
      cr_num: 0.125,
      xp: 25,
      ac: 12,
      ac_desc: "naturalny",
      hp: 5,
      hp_formula: "2d6-2",
      speed: "30 ft",
      abilities: { STR: 7, DEX: 15, CON: 9, INT: 8, WIS: 7, CHA: 8 },
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 8",
      languages_pl: "Wspólny, Smoczy",
      traits: [
        { name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Ułatwienie w rzutach ataku, gdy sojusznik stoi w odległości 5 ft od celu." },
        { name_pl: "Wrażliwość na Światło Słoneczne", desc_pl: "Utrudnienie w rzutach ataku i testach Percepcji w świetle słonecznym." }
      ],
      actions: [
        { name_pl: "Sztylet (Dagger)", atk_bonus: 4, dmg_dice: "1d4+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 4 (1k4+2) obrażeń kłutych." },
        { name_pl: "Proca (Sling)", atk_bonus: 4, dmg_dice: "1d4+2", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią dystansową: +4 do trafienia, zasięg 30/120 ft. Trafienie: 4 (1k4+2) obrażeń obuchowych." }
      ]
    },
    {
      id: "goblin",
      name_pl: "Goblin",
      name_en: "Goblin",
      icon: "👺",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Small (Mały)",
      alignment_pl: "Neutralny Zły (NE)",
      cr: "1/4",
      cr_num: 0.25,
      xp: 50,
      ac: 15,
      ac_desc: "skórzana zbroja, tarcza",
      hp: 7,
      hp_formula: "2d6",
      speed: "30 ft",
      abilities: { STR: 8, DEX: 14, CON: 10, INT: 10, WIS: 8, CHA: 8 },
      skills_pl: "Skradanie się +6",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 9",
      languages_pl: "Wspólny, Gobliński",
      traits: [
        { name_pl: "Zwinna Ucieczka (Nimble Escape)", desc_pl: "Goblin może wykonać akcję Odstąpienia (Disengage) lub Ukrycia się (Hide) jako akcję dodatkową w każdej swojej turze." }
      ],
      actions: [
        { name_pl: "Bułat (Scimitar)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 5 (1k6+2) obrażeń ciętych." },
        { name_pl: "Krótki Łuk (Shortbow)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią dystansową: +4 do trafienia, zasięg 80/320 ft. Trafienie: 5 (1k6+2) obrażeń kłutych." }
      ]
    },
    {
      id: "orc",
      name_pl: "Ork",
      name_en: "Orc",
      icon: "👹",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "1/2",
      cr_num: 0.5,
      xp: 100,
      ac: 13,
      ac_desc: "zbroja ze skór",
      hp: 15,
      hp_formula: "2d8+6",
      speed: "30 ft",
      abilities: { STR: 16, DEX: 12, CON: 16, INT: 7, WIS: 11, CHA: 10 },
      skills_pl: "Zastraszanie +2",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Wspólny, Orczy",
      traits: [
        { name_pl: "Agresywny (Aggressive)", desc_pl: "W ramach akcji dodatkowej ork może przemieścić się o swoją pełną szybkość (30 ft) w stronę wrogiego stworzenia, które widzi." }
      ],
      actions: [
        { name_pl: "Wielki Topór (Greataxe)", atk_bonus: 5, dmg_dice: "1d12+3", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +5 do trafienia, zasięg 5 ft. Trafienie: 9 (1k12+3) obrażeń ciętych." },
        { name_pl: "Oszczep (Javelin)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz lub dystansowy: +5 do trafienia, zasięg 30/120 ft. Trafienie: 6 (1k6+3) obrażeń kłutych." }
      ]
    },
    {
      id: "hobgoblin",
      name_pl: "Hobgoblin",
      name_en: "Hobgoblin",
      icon: "⚔️",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "1/2",
      cr_num: 0.5,
      xp: 100,
      ac: 18,
      ac_desc: "kolczuga, tarcza",
      hp: 11,
      hp_formula: "2d8+2",
      speed: "30 ft",
      abilities: { STR: 13, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 9 },
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Wspólny, Gobliński",
      traits: [
        { name_pl: "Przewaga Bojowa (Martial Advantage — +2k6)", desc_pl: "Raz na turę hobgoblin może zadać dodatkowe 7 (2k6) obrażeń stworzeniu, które trafi atakiem bronią, jeśli w odległości 5 ft od celu znajduje się nieobezwładniony sojusznik hobgoblina." }
      ],
      actions: [
        { name_pl: "Długi Miecz (Longsword)", atk_bonus: 3, dmg_dice: "1d8+1", dmg_type_pl: "cięte (+2k6 z Przewagą Bojową)", desc_pl: "Atak bronią wręcz: +3 do trafienia, zasięg 5 ft. Trafienie: 5 (1k8+1) ciętych (lub 12 z Przewagą Bojową)." },
        { name_pl: "Długi Łuk (Longbow)", atk_bonus: 3, dmg_dice: "1d8+1", dmg_type_pl: "kłute (+2k6 z Przewagą Bojową)", desc_pl: "Atak dystansowy: +3 do trafienia, zasięg 150/600 ft. Trafienie: 5 (1k8+1) kłutych." }
      ]
    },
    {
      id: "bugbear",
      name_pl: "Bugbear (Niedźwiedziuk)",
      name_en: "Bugbear",
      icon: "👹",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 16,
      ac_desc: "zbroja ze skór, tarcza",
      hp: 27,
      hp_formula: "5d8+5",
      speed: "30 ft",
      abilities: { STR: 15, DEX: 14, CON: 13, INT: 8, WIS: 11, CHA: 9 },
      skills_pl: "Skradanie się +6, Sztuka Przetrwania +2",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Wspólny, Gobliński",
      traits: [
        { name_pl: "Brutalny (Brute)", desc_pl: "Broń do walki wręcz zadaje jedną dodatkową kość swoich obrażeń, gdy bugbear nią trafia (wliczone w atak poniżej)." },
        { name_pl: "Atak z Zaskoczenia (Surprise Attack)", desc_pl: "Jeśli bugbear zaskoczy stworzenie i trafi je atakiem podczas pierwszej rundy walki, cel otrzymuje dodatkowe 7 (2k6) obrażeń." }
      ],
      actions: [
        { name_pl: "Morgensztern (Morningstar)", atk_bonus: 4, dmg_dice: "2d8+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 11 (2k8+2) obrażeń kłutych." },
        { name_pl: "Oszczep (Javelin)", atk_bonus: 4, dmg_dice: "2d6+2", dmg_type_pl: "kłute", desc_pl: "Atak wręcz (2k6+2) lub dystansowy 30/120 ft (1k6+2)." }
      ]
    },
    {
      id: "knight",
      name_pl: "Rycerz (Knight)",
      name_en: "Knight",
      icon: "🛡️",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 18,
      ac_desc: "zbroja płytowa",
      hp: 52,
      hp_formula: "8d8+16",
      speed: "30 ft",
      abilities: { STR: 16, DEX: 11, CON: 14, INT: 11, WIS: 11, CHA: 15 },
      saves_pl: "KON +4, MĄD +2",
      senses_pl: "Pasywna Percepcja 10",
      languages_pl: "Dowolny język (zwykle Wspólny)",
      traits: [
        { name_pl: "Odważny (Brave)", desc_pl: "Rycerz ma ułatwienie w rzutach obronnych przeciwko Przerażeniu." },
        { name_pl: "Parowanie (Parry — Reakcja)", desc_pl: "Rycerz dodaje +2 do swojej KP przeciwko jednemu atakowi wręcz, który by go trafił." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Rycerz wykonuje dwa ataki wręcz." },
        { name_pl: "Miecz Dwuręczny (Greatsword)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "cięte", desc_pl: "Atak bronią wręcz: +5 do trafienia, zasięg 5 ft. Trafienie: 10 (2k6+3) obrażeń ciętych." },
        { name_pl: "Przywództwo (Leadership — Odnowienie po odpoczynku)", desc_pl: "Przez 1 minutę rycerz wydaje rozkazy: wybrany sojusznik w promieniu 30 ft dodaje kość +1k4 do swoich rzutów ataku i rzutów obronnych!" }
      ]
    },
    {
      id: "mage",
      name_pl: "Mag (NPC Mage)",
      name_en: "Mage",
      icon: "🧙‍♂️",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny",
      cr: "6",
      cr_num: 6,
      xp: 2300,
      ac: 12,
      ac_desc: "15 z Zbroją Maga",
      hp: 40,
      hp_formula: "9d8",
      speed: "30 ft",
      abilities: { STR: 9, DEX: 14, CON: 11, INT: 17, WIS: 12, CHA: 11 },
      saves_pl: "INT +6, MĄD +4",
      skills_pl: "Historia +6, Wiedza Tajemna +6",
      senses_pl: "Pasywna Percepcja 11",
      languages_pl: "Dowolne cztery języki",
      traits: [
        { name_pl: "Rzucanie Zaklęć (9. poziom Maga, ST 14, +6 do ataku)", desc_pl: "Sztuczki: Ognisty Pocisk, Światło, Dłoń Maga. 1. krąg (4): Zbroja Maga, Magiczny Pocisk, Tarcza. 2. krąg (3): Krok przez Mgłę, Sugestia. 3. krąg (3): Kontrzaklęcie, Kula Ognia, Lot. 4. krąg (3): Większa Niewidzialność, Burza Lodu. 5. krąg (1): Stożek Zimna." }
      ],
      actions: [
        { name_pl: "Kula Ognia (Fireball — 3. krąg)", dmg_dice: "8d6", dmg_type_pl: "ognia", desc_pl: "Eksplozja w kuli o promieniu 20 ft (zasięg 150 ft): rzut obronny ZRĘ ST 14 albo 28 (8k6) obrażeń od ognia (połowa przy sukcesie)." },
        { name_pl: "Stożek Zimna (Cone of Cold — 5. krąg)", dmg_dice: "8d8", dmg_type_pl: "zimna", desc_pl: "Stożek 60 ft: rzut obronny KON ST 14 albo 36 (8k8) obrażeń od zimna." }
      ]
    },
    {
      id: "assassin",
      name_pl: "Skrytobójca (Assassin)",
      name_en: "Assassin",
      icon: "🗡️",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny niedobry",
      cr: "8",
      cr_num: 8,
      xp: 3900,
      ac: 15,
      ac_desc: "ćwiekowana skóra",
      hp: 78,
      hp_formula: "12d8+24",
      speed: "30 ft",
      abilities: { STR: 11, DEX: 16, CON: 14, INT: 13, WIS: 11, CHA: 10 },
      saves_pl: "ZRĘ +6, INT +4",
      skills_pl: "Akrobatyka +6, Oszustwo +3, Percepcja +3, Skradanie się +9",
      resistances_pl: "obrażenia od trucizny",
      senses_pl: "Pasywna Percepcja 13",
      languages_pl: "Grypsera Złodziejska + dwa języki",
      traits: [
        { name_pl: "Skrytobójstwo (Assassinate)", desc_pl: "Podczas swojej pierwszej tury skrytobójca ma ułatwienie w rzutach ataku przeciwko każdemu stworzeniu, które jeszcze nie wykonało tury. Każde trafienie w zaskoczony cel jest trafieniem krytycznym!" },
        { name_pl: "Ukradkowy Atak (Sneak Attack — 4k6)", desc_pl: "Raz na turę zadaje dodatkowe 14 (4k6) obrażeń przy ułatwieniu lub sojuszniku obok celu." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Skrytobójca wykonuje dwa ataki krótkim mieczem." },
        { name_pl: "Krótki Miecz z Trucizną (Shortsword)", atk_bonus: 6, dmg_dice: "1d6+3", dmg_type_pl: "kłute + 7k6 trucizny", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 6 (1k6+3) kłutych + rzut obronny KON ST 15 na 24 (7k6) obrażeń od trucizny (połowa przy sukcesie)." }
      ]
    },
    {
      id: "archmage",
      name_pl: "Arcymag (Archmage)",
      name_en: "Archmage",
      icon: "🧙‍♂️",
      type_pl: "Humanoid",
      type_en: "Humanoid",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny",
      cr: "12",
      cr_num: 12,
      xp: 8400,
      ac: 12,
      ac_desc: "15 z Zbroją Maga",
      hp: 99,
      hp_formula: "18d8+18",
      speed: "30 ft",
      abilities: { STR: 10, DEX: 14, CON: 12, INT: 20, WIS: 15, CHA: 16 },
      saves_pl: "INT +9, MĄD +6",
      skills_pl: "Historia +13, Wiedza Tajemna +13",
      resistances_pl: "obrażenia od zaklęć; niemagiczne obuchowe, kłute i cięte (z Kamiennej Skóry)",
      senses_pl: "Pasywna Percepcja 12",
      languages_pl: "Dowolne sześć języków",
      traits: [
        { name_pl: "Odporność na Magię (Magic Resistance)", desc_pl: "Arcymag ma ułatwienie we wszystkich rzutach obronnych przeciwko zaklęciom i innym efektom magicznym." },
        { name_pl: "Rzucanie Zaklęć (18. poziom Maga, ST 17, +9 do ataku)", desc_pl: "Na zawołanie: Przebranie, Niewidzialność. Posiada komórki kręgów 1–9, w tym: Piorun, Kontrzaklęcie, wygnanie, Ściana Mocy, Stożek Zimna, Kula Niewrażliwości, Teleportacja, KontrolaUmysłu oraz Zatrzymanie Czasu (Time Stop 9. kręgu)!" }
      ],
      actions: [
        { name_pl: "Stożek Zimna (Cone of Cold — 5. krąg)", dmg_dice: "8d8", dmg_type_pl: "zimna", desc_pl: "Stożek 60 ft: rzut obronny KON ST 17 albo 36 (8k8) obrażeń od zimna." },
        { name_pl: "Piorun (Lightning Bolt — 3. krąg)", dmg_dice: "8d6", dmg_type_pl: "błyskawic", desc_pl: "Linia 100×5 ft: rzut obronny ZRĘ ST 17 albo 28 (8k6) obrażeń od błyskawic." }
      ]
    },

    // =========================================================================
    // 3. NIEUMARLI (UNDEAD)
    // =========================================================================
    {
      id: "skeleton",
      name_pl: "Szkielet",
      name_en: "Skeleton",
      icon: "💀",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "1/4",
      cr_num: 0.25,
      xp: 50,
      ac: 13,
      ac_desc: "resztki zbroi",
      hp: 13,
      hp_formula: "2d8+4",
      speed: "30 ft",
      abilities: { STR: 10, DEX: 14, CON: 15, INT: 6, WIS: 8, CHA: 5 },
      immunities_pl: "obrażenia od trucizny; stany: Wyczerpanie, Zatruty (Wrażliwość: obrażenia obuchowe ×2!)",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 9",
      languages_pl: "Rozumie języki znane za życia, ale nie mówi",
      traits: [
        { name_pl: "Podatność na Obrażenia Obuchowe (Vulnerability)", desc_pl: "Szkielet otrzymuje podwójne obrażenia od ataków obuchowych (Bludgeoning)." }
      ],
      actions: [
        { name_pl: "Krótki Miecz (Shortsword)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "kłute", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 5 (1k6+2) obrażeń kłutych." },
        { name_pl: "Krótki Łuk (Shortbow)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "kłute", desc_pl: "Atak dystansowy: +4 do trafienia, zasięg 80/320 ft. Trafienie: 5 (1k6+2) obrażeń kłutych." }
      ]
    },
    {
      id: "zombie",
      name_pl: "Zombie",
      name_en: "Zombie",
      icon: "🧟",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Neutralny Zły (NE)",
      cr: "1/4",
      cr_num: 0.25,
      xp: 50,
      ac: 8,
      ac_desc: "brak",
      hp: 22,
      hp_formula: "3d8+9",
      speed: "20 ft",
      abilities: { STR: 13, DEX: 6, CON: 16, INT: 3, WIS: 6, CHA: 5 },
      saves_pl: "MĄD +0",
      immunities_pl: "obrażenia od trucizny; stan Zatruty",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 8",
      languages_pl: "Rozumie języki za życia, ale nie mówi",
      traits: [
        { name_pl: "Nieumarła Wytrwałość (Undead Fortitude)", desc_pl: "Jeśli obrażenia (inne niż od światłości i z trafienia krytycznego) obniżą PW zombie do 0, wykonuje on rzut obronny KON (ST 5 + otrzymane obrażenia). Przy sukcesie zombie zostaje na 1 PW!" }
      ],
      actions: [
        { name_pl: "Uderzenie (Slam)", atk_bonus: 3, dmg_dice: "1d6+1", dmg_type_pl: "obuchowe", desc_pl: "Atak bronią wręcz: +3 do trafienia, zasięg 5 ft. Trafienie: 4 (1k6+1) obrażeń obuchowych." }
      ]
    },
    {
      id: "shadow",
      name_pl: "Cień (Shadow)",
      name_en: "Shadow",
      icon: "👤",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "1/2",
      cr_num: 0.5,
      xp: 100,
      ac: 12,
      ac_desc: "naturalny",
      hp: 16,
      hp_formula: "3d8+3",
      speed: "40 ft",
      abilities: { STR: 6, DEX: 14, CON: 13, INT: 6, WIS: 10, CHA: 8 },
      skills_pl: "Skradanie się +4 (+6 w cieniu)",
      resistances_pl: "kwas, zimno, ogień, błyskawice, grzmot; niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "nekrotyczne, trucizna (Podatność: Światłość ×2)",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "—",
      traits: [
        { name_pl: "Skradanie w Cieniu (Shadow Stealth)", desc_pl: "Będąc w słabym świetle lub ciemności, cień może ukrywać się w ramach akcji dodatkowej." }
      ],
      actions: [
        { name_pl: "Wyssanie Siły (Strength Drain)", atk_bonus: 4, dmg_dice: "2d6+2", dmg_type_pl: "nekrotyczne + -1k4 SIŁ!", desc_pl: "Atak bronią wręcz: +4 do trafienia, zasięg 5 ft. Trafienie: 9 (2k6+2) obrażeń nekrotycznych, a wartość Siły celu spada o 1k4! Jeśli Siła spadnie do 0, cel natychmiast umiera!" }
      ]
    },
    {
      id: "ghoul",
      name_pl: "Ghul (Ghoul)",
      name_en: "Ghoul",
      icon: "🧟",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 12,
      ac_desc: "naturalny",
      hp: 22,
      hp_formula: "5d8",
      speed: "30 ft",
      abilities: { STR: 13, DEX: 15, CON: 10, INT: 7, WIS: 10, CHA: 6 },
      immunities_pl: "trucizna; Zauroczony, Wyczerpanie, Zatruty",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Wspólny",
      traits: [],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 2, dmg_dice: "2d6+2", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +2 do trafienia. Trafienie: 9 (2k6+2) obrażeń kłutych." },
        { name_pl: "Pazury (Claws — Paraliż!)", atk_bonus: 4, dmg_dice: "2d4+2", dmg_type_pl: "cięte + Paraliż", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 7 (2k4+2) ciętych. Jeśli cel nie jest elfem ani nieumarłym, musi zdać rzut obronny KON ST 10 albo zostaje Sparaliżowany na 1 minutę!" }
      ]
    },
    {
      id: "wight",
      name_pl: "Upiór Kurhanowy (Wight)",
      name_en: "Wight",
      icon: "💀",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Neutralny Zły (NE)",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 14,
      ac_desc: "ćwiekowana skóra",
      hp: 45,
      hp_formula: "6d8+18",
      speed: "30 ft",
      abilities: { STR: 15, DEX: 14, CON: 16, INT: 10, WIS: 13, CHA: 15 },
      skills_pl: "Percepcja +3, Skradanie się +4",
      resistances_pl: "nekrotyczne; niemagiczne i nieposrebrzane obuchowe, kłute i cięte",
      immunities_pl: "trucizna; Wyczerpanie, Zatruty",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 13",
      languages_pl: "Języki znane za życia",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Upiór wykonuje dwa ataki długim mieczem lub długim łukiem. Może zastąpić jeden atak Wyssaniem Życia." },
        { name_pl: "Wyssanie Życia (Life Drain)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "nekrotyczne", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 5 (1k6+2) nekrotycznych, a cel musi zdać rzut obronny KON ST 13 albo jego maksimum PW zostaje zmniejszone o otrzymane obrażenia (humanoid zabity tym atakiem wstaje jako zombie!)." },
        { name_pl: "Długi Miecz (Longsword)", atk_bonus: 4, dmg_dice: "1d8+2", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 6 (1k8+2) obrażeń ciętych." }
      ]
    },
    {
      id: "ghost",
      name_pl: "Duch (Ghost)",
      name_en: "Ghost",
      icon: "👻",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny",
      cr: "4",
      cr_num: 4,
      xp: 1100,
      ac: 11,
      ac_desc: "naturalny",
      hp: 45,
      hp_formula: "10d8",
      speed: "0 ft, lot 40 ft (Hover)",
      abilities: { STR: 7, DEX: 13, CON: 10, INT: 10, WIS: 12, CHA: 17 },
      resistances_pl: "kwas, ogień, błyskawice, grzmot; niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "zimno, nekrotyczne, trucizna",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 11",
      languages_pl: "Języki znane za życia",
      traits: [
        { name_pl: "Niecielesny Ruch i Widzenie Eteryczne", desc_pl: "Duch przenika przez ściany i stworzenia oraz widzi na 60 ft w Plan Eteryczny." }
      ],
      actions: [
        { name_pl: "Wysuszający Dotyk (Withering Touch)", atk_bonus: 5, dmg_dice: "4d6+3", dmg_type_pl: "nekrotyczne", desc_pl: "Atak bronią wręcz: +5 do trafienia, zasięg 5 ft. Trafienie: 17 (4k6+3) obrażeń nekrotycznych." },
        { name_pl: "Opętanie (Possession — Odnowienie 6)", desc_pl: "Jeden humanoid w promieniu 5 ft musi zdać rzut obronny CHA ST 13 albo duch wnika w jego ciało i przejmuje nad nim pełną kontrolę!" },
        { name_pl: "Przerażające Oblicze (Horrifying Visage)", desc_pl: "Każde stworzenie w promieniu 60 ft musi zdać rzut obronny MĄD ST 13 albo jest Przerażone (przy porażce o 5+ starzeje się o 1k4×10 lat!)." }
      ]
    },
    {
      id: "banshee",
      name_pl: "Banshee (Zjawa Zawodząca)",
      name_en: "Banshee",
      icon: "👻",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "4",
      cr_num: 4,
      xp: 1100,
      ac: 12,
      ac_desc: "naturalny",
      hp: 58,
      hp_formula: "13d8",
      speed: "0 ft, lot 40 ft (Hover)",
      abilities: { STR: 1, DEX: 14, CON: 10, INT: 12, WIS: 11, CHA: 17 },
      saves_pl: "MĄD +2, CHA +5",
      resistances_pl: "kwas, ogień, błyskawice, grzmot; niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "zimno, nekrotyczne, trucizna",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Wspólny, Elfi",
      traits: [
        { name_pl: "Wykrywanie Życia i Niecielesny Ruch", desc_pl: "Wyczuwa wszystkie żywe istoty w promieniu 5 mil i przenika przez ściany." }
      ],
      actions: [
        { name_pl: "Skażony Dotyk (Corrupting Touch)", atk_bonus: 4, dmg_dice: "3d6+2", dmg_type_pl: "nekrotyczne", desc_pl: "Atak czarem wręcz: +4 do trafienia. Trafienie: 12 (3k6+2) obrażeń nekrotycznych." },
        { name_pl: "Zawodzenie Śmierci (Wail — 1/dzień)", dmg_dice: "3d6", dmg_type_pl: "psychiczne (lub spadek do 0 PW!)", desc_pl: "Każde żywe stworzenie w promieniu 30 ft, które słyszy zawodzenie, wykonuje rzut obronny KON ST 13. Przy porażce jego PW natychmiast spadają do 0! Przy sukcesie otrzymuje 10 (3k6) obrażeń psychicznych." }
      ]
    },
    {
      id: "vampire",
      name_pl: "Wampir (Vampire)",
      name_en: "Vampire",
      icon: "🧛",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "13",
      cr_num: 13,
      xp: 10000,
      ac: 16,
      ac_desc: "naturalny pancerz",
      hp: 144,
      hp_formula: "17d8+68",
      speed: "30 ft",
      abilities: { STR: 18, DEX: 18, CON: 18, INT: 17, WIS: 15, CHA: 18 },
      saves_pl: "ZRĘ +9, MĄD +7, CHA +9",
      skills_pl: "Percepcja +7, Skradanie się +9",
      resistances_pl: "nekrotyczne; niemagiczne obuchowe, kłute i cięte",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 17",
      languages_pl: "Języki znane za życia",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień)", desc_pl: "Gdy wampir nie zda rzutu obronnego, może zdecydować, że jednak go zdał." },
        { name_pl: "Regeneracja (20 PW co turę)", desc_pl: "Wampir odzyskuje 20 PW na początku swojej tury, jeśli ma co najmniej 1 PW i nie stoi w świetle słonecznym ani bieżącej wodzie (wyłączana przez obrażenia od światłości)." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Wampir wykonuje dwa ataki, z których tylko jeden może być ugryzieniem." },
        { name_pl: "Uderzenie bez Broni (Unarmed Strike)", atk_bonus: 9, dmg_dice: "1d8+4", dmg_type_pl: "obuchowe (lub Pochwycenie ST 18)", desc_pl: "Atak wręcz: +9 do trafienia. Trafienie: 8 (1k8+4) obuchowych albo natychmiastowe Pochwycenie celu." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 9, dmg_dice: "1d6+4", dmg_type_pl: "kłute + 3k6 nekrotycznych (leczy wampira!)", desc_pl: "Atak przeciw pochwyconemu/chętnemu celowi: +9 do trafienia. Trafienie: 7 (1k6+4) kłutych + 10 (3k6) nekrotycznych; maksimum PW celu spada o obrażenia nekrotyczne, a wampir leczy się o tyle samo!" },
        { name_pl: "Urok (Charm)", desc_pl: "Widoczny humanoid w promieniu 30 ft wykonuje rzut obronny MĄD ST 17 albo zostaje Zauroczony na 24 godziny." }
      ],
      legendary_actions: [
        { name_pl: "Ruch / Uderzenie / Ugryzienie (2 akcje)", desc_pl: "Wampir posiada 3 akcje legendarne na rundę: może poruszyć się bez ataków okazyjnych, uderzyć bez broni lub ugryźć." }
      ]
    },
    {
      id: "lich",
      name_pl: "Licz (Lich)",
      name_en: "Lich",
      icon: "💀",
      type_pl: "Nieumarły",
      type_en: "Undead",
      size: "Medium (Średni)",
      alignment_pl: "Dowolny zły",
      cr: "21",
      cr_num: 21,
      xp: 33000,
      ac: 17,
      ac_desc: "naturalny pancerz",
      hp: 135,
      hp_formula: "18d8+54",
      speed: "30 ft",
      abilities: { STR: 11, DEX: 16, CON: 16, INT: 20, WIS: 14, CHA: 16 },
      saves_pl: "KON +10, INT +12, MĄD +9",
      skills_pl: "Historia +12, Wnikliwość +9, Percepcja +9, Wiedza Tajemna +19",
      resistances_pl: "zimno, błyskawice, nekrotyczne",
      immunities_pl: "trucizna; niemagiczne obuchowe, kłute i cięte; stany: Zauroczony, Wyczerpanie, Przerażony, Sparaliżowany, Zatruty",
      senses_pl: "Prawdziwe Widzenie (Truesight) 120 ft, Pasywna Percepcja 19",
      languages_pl: "Wspólny + do pięciu innych języków",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień) i Odmłodzenie Filakterium", desc_pl: "Dopóki filakterium licza istnieje, zniszczony licz odradza się w nowym ciele po 1k10 dniach." },
        { name_pl: "Rzucanie Zaklęć (18. poziom Maga, ST 20, +12 do ataku)", desc_pl: "Posiada komórki kręgów 1–9, w tym: Tarcza, Magiczny Pocisk, Kontrzaklęcie, Kula Ognia, Dezintegracja (10k6+40), Palec Śmierci (7k8+30), Dominacja nad Potworem oraz Słowo Mocy: Śmierć (Power Word Kill)!" }
      ],
      actions: [
        { name_pl: "Paraliżujący Dotyk (Paralyzing Touch)", atk_bonus: 12, dmg_dice: "3d6", dmg_type_pl: "zimna + Paraliż", desc_pl: "Atak czarem wręcz: +12 do trafienia, zasięg 5 ft. Trafienie: 10 (3k6) obrażeń od zimna, a cel musi zdać rzut obronny KON ST 18 albo zostaje Sparaliżowany na 1 minutę!" },
        { name_pl: "Dezintegracja (Disintegrate — 6. krąg)", dmg_dice: "10d6+40", dmg_type_pl: "mocy", desc_pl: "Zasięg 60 ft, rzut obronny ZRĘ ST 20 albo 75 (10k6+40) obrażeń od mocy (obraca cel w pył przy 0 PW!)." }
      ],
      legendary_actions: [
        { name_pl: "Sztuczka / Paraliżujący Dotyk (2) / Przerażające Spojrzenie (2) / Zakłócenie Życia (3)", desc_pl: "Zakłócenie Życia (Disrupt Life): każde żywe stworzenie w promieniu 20 ft wykonuje rzut obronny KON ST 18 albo otrzymuje 21 (6k6) obrażeń nekrotycznych." }
      ]
    },

    // =========================================================================
    // 4. SMOKI (DRAGONS — Młode, Dorosłe i Starożytne)
    // =========================================================================
    {
      id: "wyvern",
      name_pl: "Wiwerna (Wyvern)",
      name_en: "Wyvern",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "6",
      cr_num: 6,
      xp: 2300,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 110,
      hp_formula: "13d10+39",
      speed: "20 ft, lot 80 ft",
      abilities: { STR: 19, DEX: 10, CON: 16, INT: 5, WIS: 12, CHA: 6 },
      skills_pl: "Percepcja +4",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 14",
      languages_pl: "—",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Wiwerna wykonuje dwa ataki: jeden ugryzieniem i jeden żądłem ogona." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +7 do trafienia, zasięg 10 ft. Trafienie: 11 (2k6+4) obrażeń kłutych." },
        { name_pl: "Żądło (Stinger)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "kłute + 7k6 trucizny", desc_pl: "Atak wręcz: +7 do trafienia, zasięg 10 ft. Trafienie: 11 (2k6+4) kłutych oraz rzut obronny KON ST 15 na 24 (7k6) obrażeń od trucizny (połowa przy sukcesie)." }
      ]
    },
    {
      id: "young-green-dragon",
      name_pl: "Młody Zielony Smok (Young Green Dragon)",
      name_en: "Young Green Dragon",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "8",
      cr_num: 8,
      xp: 3900,
      ac: 18,
      ac_desc: "naturalny pancerz",
      hp: 136,
      hp_formula: "16d10+48",
      speed: "40 ft, lot 80 ft, pływanie 40 ft",
      abilities: { STR: 19, DEX: 12, CON: 17, INT: 16, WIS: 13, CHA: 15 },
      saves_pl: "ZRĘ +4, KON +6, MĄD +4, CHA +5",
      skills_pl: "Oszustwo +5, Percepcja +7, Skradanie się +4",
      immunities_pl: "trucizna; stan Zatruty",
      senses_pl: "Ślepowidzenie 30 ft, Widzenie w ciemności 120 ft, Pasywna Percepcja 17",
      languages_pl: "Wspólny, Smoczy",
      traits: [
        { name_pl: "Wodolądowy (Amphibious)", desc_pl: "Smok może oddychać zarówno powietrzem, jak i pod wodą." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Smok wykonuje trzy ataki: jeden ugryzieniem i dwa pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "2d10+4", dmg_type_pl: "kłute + 2k6 trucizny", desc_pl: "Atak wręcz: +7 do trafienia, zasięg 10 ft. Trafienie: 15 (2k10+4) kłutych + 7 (2k6) od trucizny." },
        { name_pl: "Pazur (Claw)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +7 do trafienia, zasięg 5 ft. Trafienie: 11 (2k6+4) obrażeń ciętych." },
        { name_pl: "Trujący Oddech (Poison Breath — Odnowienie 5–6)", dmg_dice: "12d6", dmg_type_pl: "trucizny", desc_pl: "Stożek 30 ft: każde stworzenie wykonuje rzut obronny KON ST 14, otrzymując 42 (12k6) obrażeń od trucizny przy porażce (połowę przy sukcesie)." }
      ]
    },
    {
      id: "young-red-dragon",
      name_pl: "Młody Czerwony Smok (Young Red Dragon)",
      name_en: "Young Red Dragon",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Large (Duży)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "10",
      cr_num: 10,
      xp: 5900,
      ac: 18,
      ac_desc: "naturalny pancerz",
      hp: 178,
      hp_formula: "17d10+85",
      speed: "40 ft, wspinaczka 40 ft, lot 80 ft",
      abilities: { STR: 23, DEX: 10, CON: 21, INT: 14, WIS: 11, CHA: 19 },
      saves_pl: "ZRĘ +4, KON +9, MĄD +4, CHA +8",
      skills_pl: "Percepcja +8, Skradanie się +4",
      immunities_pl: "ogień",
      senses_pl: "Ślepowidzenie 30 ft, Widzenie w ciemności 120 ft, Pasywna Percepcja 18",
      languages_pl: "Wspólny, Smoczy",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Smok wykonuje trzy ataki: jeden ugryzieniem i dwa pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 10, dmg_dice: "2d10+6", dmg_type_pl: "kłute + 1k6 ognia", desc_pl: "Atak wręcz: +10 do trafienia, zasięg 10 ft. Trafienie: 17 (2k10+6) kłutych + 3 (1k6) ognia." },
        { name_pl: "Pazur (Claw)", atk_bonus: 10, dmg_dice: "2d6+6", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +10 do trafienia, zasięg 5 ft. Trafienie: 13 (2k6+6) obrażeń ciętych." },
        { name_pl: "Ognisty Oddech (Fire Breath — Odnowienie 5–6)", dmg_dice: "16d6", dmg_type_pl: "ognia", desc_pl: "Stożek 30 ft: każde stworzenie wykonuje rzut obronny ZRĘ ST 17, otrzymując 56 (16k6) obrażeń od ognia przy porażce (połowę przy sukcesie)." }
      ]
    },
    {
      id: "adult-red-dragon",
      name_pl: "Dorosły Czerwony Smok (Adult Red Dragon)",
      name_en: "Adult Red Dragon",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Huge (Ogromny)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "17",
      cr_num: 17,
      xp: 18000,
      ac: 19,
      ac_desc: "naturalny pancerz",
      hp: 256,
      hp_formula: "19d12+133",
      speed: "40 ft, wspinaczka 40 ft, lot 80 ft",
      abilities: { STR: 27, DEX: 10, CON: 25, INT: 16, WIS: 13, CHA: 21 },
      saves_pl: "ZRĘ +6, KON +13, MĄD +7, CHA +11",
      skills_pl: "Percepcja +13, Skradanie się +6",
      immunities_pl: "ogień",
      senses_pl: "Ślepowidzenie 60 ft, Widzenie w ciemności 120 ft, Pasywna Percepcja 23",
      languages_pl: "Wspólny, Smoczy",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień)", desc_pl: "Gdy smok nie zda rzutu obronnego, może zdecydować, że go zdał." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Smok używa Przerażającej Obecności (ST 19 MĄD), a następnie wykonuje trzy ataki: jeden ugryzieniem i dwa pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 14, dmg_dice: "2d10+8", dmg_type_pl: "kłute + 2k6 ognia", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 10 ft. Trafienie: 19 (2k10+8) kłutych + 7 (2k6) ognia." },
        { name_pl: "Pazur (Claw)", atk_bonus: 14, dmg_dice: "2d6+8", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 5 ft. Trafienie: 15 (2k6+8) obrażeń ciętych." },
        { name_pl: "Ogon (Tail)", atk_bonus: 14, dmg_dice: "2d8+8", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 15 ft. Trafienie: 17 (2d8+8) obrażeń obuchowych." },
        { name_pl: "Ognisty Oddech (Fire Breath — Odnowienie 5–6)", dmg_dice: "18d6", dmg_type_pl: "ognia", desc_pl: "Stożek 60 ft: rzut obronny ZRĘ ST 21 albo 63 (18k6) obrażeń od ognia (połowa przy sukcesie)." }
      ],
      legendary_actions: [
        { name_pl: "Wykrycie / Atak Ogonem / Atak Skrzydłami (2 akcje)", desc_pl: "Atak Skrzydłami: każde stworzenie w promieniu 10 ft musi zdać rzut obronny ZRĘ ST 22 albo otrzymuje 15 (2k6+8) obrażeń obuchowych i zostaje powalone, a smok odlatuje na 40 ft." }
      ]
    },
    {
      id: "ancient-red-dragon",
      name_pl: "Starożytny Czerwony Smok (Ancient Red Dragon)",
      name_en: "Ancient Red Dragon",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Gargantuan (Gargantuiczny)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "24",
      cr_num: 24,
      xp: 62000,
      ac: 22,
      ac_desc: "naturalny pancerz",
      hp: 546,
      hp_formula: "28d20+252",
      speed: "40 ft, wspinaczka 40 ft, lot 80 ft",
      abilities: { STR: 30, DEX: 10, CON: 29, INT: 18, WIS: 15, CHA: 23 },
      saves_pl: "ZRĘ +7, KON +16, MĄD +9, CHA +13",
      skills_pl: "Percepcja +16, Skradanie się +7",
      immunities_pl: "ogień",
      senses_pl: "Ślepowidzenie 60 ft, Widzenie w ciemności 120 ft, Pasywna Percepcja 26",
      languages_pl: "Wspólny, Smoczy",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień)", desc_pl: "Gdy smok nie zda rzutu obronnego, może zdecydować, że go zdał." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Używa Przerażającej Obecności (ST 21 MĄD w promieniu 120 ft) oraz wykonuje 1 ugryzienie i 2 ataki pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 17, dmg_dice: "2d10+10", dmg_type_pl: "kłute + 4k6 ognia", desc_pl: "Atak wręcz: +17 do trafienia, zasięg 15 ft. Trafienie: 21 (2k10+10) kłutych + 14 (4k6) ognia." },
        { name_pl: "Pazur (Claw)", atk_bonus: 17, dmg_dice: "2d6+10", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +17 do trafienia, zasięg 10 ft. Trafienie: 17 (2k6+10) obrażeń ciętych." },
        { name_pl: "Ogon (Tail)", atk_bonus: 17, dmg_dice: "2d8+10", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +17 do trafienia, zasięg 20 ft. Trafienie: 19 (2k8+10) obrażeń obuchowych." },
        { name_pl: "Kataklizmiczny Ognisty Oddech (Fire Breath — Odnowienie 5–6)", dmg_dice: "26d6", dmg_type_pl: "ognia", desc_pl: "Stożek 90 ft: rzut obronny ZRĘ ST 24 albo 91 (26k6) obrażeń od ognia (połowa przy sukcesie)!" }
      ],
      legendary_actions: [
        { name_pl: "Wykrycie / Atak Ogonem / Atak Skrzydłami (2 akcje — ST 25 ZRĘ, 2k6+10 i Powalenie)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    },
    {
      id: "ancient-gold-dragon",
      name_pl: "Starożytny Złoty Smok (Ancient Gold Dragon)",
      name_en: "Ancient Gold Dragon",
      icon: "🐉",
      type_pl: "Smok",
      type_en: "Dragon",
      size: "Gargantuan (Gargantuiczny)",
      alignment_pl: "Praworządny Dobry (LG)",
      cr: "24",
      cr_num: 24,
      xp: 62000,
      ac: 22,
      ac_desc: "naturalny pancerz",
      hp: 546,
      hp_formula: "28d20+252",
      speed: "40 ft, lot 80 ft, pływanie 40 ft",
      abilities: { STR: 30, DEX: 14, CON: 29, INT: 18, WIS: 17, CHA: 28 },
      saves_pl: "ZRĘ +9, KON +16, MĄD +10, CHA +16",
      skills_pl: "Wnikliwość +10, Percepcja +17, Perswazja +16, Skradanie się +9",
      immunities_pl: "ogień",
      senses_pl: "Ślepowidzenie 60 ft, Widzenie w ciemności 120 ft, Pasywna Percepcja 27",
      languages_pl: "Wspólny, Smoczy",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień) i Zmiana Kształtu (Change Shape)", desc_pl: "Smok może w ramach akcji magicznie polimorfować w dowolnego humanoida lub bestię o SW do 24." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Przerażająca Obecność (ST 24 MĄD) + 1 ugryzienie i 2 pazury." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 17, dmg_dice: "2d10+10", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +17 do trafienia, zasięg 15 ft. Trafienie: 21 (2k10+10) kłutych." },
        { name_pl: "Ognisty Oddech lub Osłabiający Oddech (Odnowienie 5–6)", dmg_dice: "13d10", dmg_type_pl: "ognia", desc_pl: "Stożek 90 ft: 1) Ognisty Oddech: ST 24 ZRĘ albo 71 (13k10) obrażeń od ognia; 2) Osłabiający Oddech: ST 24 SIŁ albo cel ma utrudnienie we wszystkich atakach, testach i rzutach obronnych opartych na Sile przez 1 minutę!" }
      ],
      legendary_actions: [
        { name_pl: "Wykrycie / Atak Ogonem / Atak Skrzydłami (2 akcje)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    },

    // =========================================================================
    // 5. CZARTY — DIABŁY I DEMONY (FIENDS)
    // =========================================================================
    {
      id: "imp",
      name_pl: "Chochlik (Imp — Chowaniec Paktu Łańcucha)",
      name_en: "Imp",
      icon: "😈",
      type_pl: "Czart",
      type_en: "Fiend",
      size: "Tiny (Malutki)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "1",
      cr_num: 1,
      xp: 200,
      ac: 13,
      ac_desc: "naturalny",
      hp: 10,
      hp_formula: "3d4+3",
      speed: "20 ft, lot 40 ft",
      abilities: { STR: 6, DEX: 17, CON: 13, INT: 11, WIS: 12, CHA: 14 },
      skills_pl: "Oszustwo +4, Wnikliwość +3, Perswazja +4, Skradanie się +5",
      resistances_pl: "zimno; niemagiczne i nieposrebrzane obuchowe, kłute i cięte",
      immunities_pl: "ogień, trucizna; stan Zatruty",
      senses_pl: "Diabelski Wzrok (widzi w magicznej ciemności!) 120 ft, Pasywna Percepcja 11",
      languages_pl: "Piekielny, Wspólny",
      traits: [
        { name_pl: "Diabelski Wzrok i Odporność na Magię", desc_pl: "Magiczna ciemność nie utrudnia wzroku chochlika, a on sam ma ułatwienie w rzutach obronnych przeciwko zaklęciom." },
        { name_pl: "Zmiennokształtny i Niewidzialność", desc_pl: "W ramach akcji może zmienić się w kruka, szczura lub pająka albo stać się Niewidzialny na zawołanie!" }
      ],
      actions: [
        { name_pl: "Żądło (Sting)", atk_bonus: 5, dmg_dice: "1d4+3", dmg_type_pl: "kłute + 3k6 trucizny", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 5 (1k4+3) kłutych + rzut obronny KON ST 11 na 10 (3k6) obrażeń od trucizny (połowa przy sukcesie)." }
      ]
    },
    {
      id: "hell-hound",
      name_pl: "Piekielny Ogar (Hell Hound)",
      name_en: "Hell Hound",
      icon: "🐕‍🦺",
      type_pl: "Czart",
      type_en: "Fiend",
      size: "Medium (Średni)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 15,
      ac_desc: "naturalny pancerz",
      hp: 45,
      hp_formula: "7d8+14",
      speed: "50 ft",
      abilities: { STR: 17, DEX: 12, CON: 14, INT: 6, WIS: 13, CHA: 6 },
      skills_pl: "Percepcja +5",
      immunities_pl: "ogień",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 15",
      languages_pl: "Rozumie Piekielny",
      traits: [
        { name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Ułatwienie w atakach, gdy sojusznik stoi w odległości 5 ft od celu." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "kłute + 2k6 ognia", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) kłutych + 7 (2k6) ognia." },
        { name_pl: "Ognisty Oddech (Fire Breath — Odnowienie 5–6)", dmg_dice: "6d6", dmg_type_pl: "ognia", desc_pl: "Stożek 15 ft: rzut obronny ZRĘ ST 12 albo 21 (6k6) obrażeń od ognia (połowa przy sukcesie)." }
      ]
    },
    {
      id: "succubus",
      name_pl: "Sukkub / Inkub (Succubus / Incubus)",
      name_en: "Succubus/Incubus",
      icon: "😈",
      type_pl: "Czart",
      type_en: "Fiend",
      size: "Medium (Średni)",
      alignment_pl: "Neutralny Zły (NE)",
      cr: "4",
      cr_num: 4,
      xp: 1100,
      ac: 15,
      ac_desc: "naturalny pancerz",
      hp: 66,
      hp_formula: "12d8+12",
      speed: "30 ft, lot 60 ft",
      abilities: { STR: 8, DEX: 17, CON: 13, INT: 15, WIS: 12, CHA: 20 },
      skills_pl: "Oszustwo +9, Wnikliwość +5, Percepcja +5, Perswazja +9, Skradanie się +7",
      resistances_pl: "zimno, ogień, błyskawice, trucizna; niemagiczne obuchowe, kłute i cięte",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 15",
      languages_pl: "Otchłanny, Wspólny, Piekielny, Telepatia 60 ft",
      traits: [
        { name_pl: "Telepatyczna Więź i Zmiennokształtny", desc_pl: "Przyjmuje postać dowolnego humanoida i utrzymuje telepatyczną więź z zauroczoną ofiarą na dowolną odległość." }
      ],
      actions: [
        { name_pl: "Pazur (Claw)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) obrażeń ciętych." },
        { name_pl: "Urok (Charm)", desc_pl: "Jeden humanoid w promieniu 30 ft wykonuje rzut obronny MĄD ST 15 albo zostaje Zauroczony na 24 godziny i wykonuje telepatyczne rozkazy sukkuba." },
        { name_pl: "Wysysający Pocałunek (Draining Kiss)", dmg_dice: "5d10+5", dmg_type_pl: "psychiczne", desc_pl: "Zauroczona lub chętna istota wykonuje rzut obronny KON ST 15, otrzymując 32 (5k10+5) obrażeń psychicznych przy porażce (połowę przy sukcesie), a jej maksimum PW spada o tę samą wartość!" }
      ]
    },
    {
      id: "balor",
      name_pl: "Balor (Władca Demonów)",
      name_en: "Balor",
      icon: "🔥",
      type_pl: "Czart",
      type_en: "Fiend",
      size: "Huge (Ogromny)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "19",
      cr_num: 19,
      xp: 22000,
      ac: 19,
      ac_desc: "naturalny pancerz",
      hp: 262,
      hp_formula: "21d12+126",
      speed: "40 ft, lot 80 ft",
      abilities: { STR: 26, DEX: 15, CON: 22, INT: 20, WIS: 16, CHA: 22 },
      saves_pl: "SIŁ +14, KON +12, MĄD +9, CHA +12",
      resistances_pl: "zimno, błyskawice; niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "ogień, trucizna; stan Zatruty",
      senses_pl: "Prawdziwe Widzenie 120 ft, Pasywna Percepcja 13",
      languages_pl: "Otchłanny, Telepatia 120 ft",
      traits: [
        { name_pl: "Ognista Aura (3k6 ognia) i Śmiertelna Eksplozja (20k6 ognia)", desc_pl: "Każdy wróg w odległości 5 ft lub trafiający Balora wręcz otrzymuje 10 (3k6) obrażeń od ognia. Gdy Balor umiera, wybucha w promieniu 30 ft za 70 (20k6) obrażeń od ognia (ST 20 ZRĘ)!" },
        { name_pl: "Odporność na Magię", desc_pl: "Ułatwienie w rzutach obronnych przeciwko zaklęciom." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Balor wykonuje dwa ataki: jeden mieczem błyskawic i jeden ognistym biczem." },
        { name_pl: "Długi Miecz Błyskawic (Longsword)", atk_bonus: 14, dmg_dice: "3d8+8", dmg_type_pl: "cięte + 3k8 błyskawic", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 10 ft. Trafienie: 21 (3k8+8) ciętych + 13 (3k8) błyskawic (przy krytyku potraja kości!)." },
        { name_pl: "Ognisty Bicz (Whip)", atk_bonus: 14, dmg_dice: "2d6+8", dmg_type_pl: "cięte + 3k6 ognia + Przyciągnięcie", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 30 ft. Trafienie: 15 (2k6+8) ciętych + 10 (3k6) ognia, a cel musi zdać rzut obronny SIŁ ST 20 albo zostaje przyciągnięty na odległość 5 ft od Balora (w Ognistą Aurę!)." },
        { name_pl: "Teleportacja (Teleport)", desc_pl: "Balor teleportuje się na odległość do 120 ft." }
      ]
    },
    {
      id: "pit-fiend",
      name_pl: "Diabeł Czeluści (Pit Fiend)",
      name_en: "Pit Fiend",
      icon: "😈",
      type_pl: "Czart",
      type_en: "Fiend",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "20",
      cr_num: 20,
      xp: 25000,
      ac: 19,
      ac_desc: "naturalny pancerz",
      hp: 300,
      hp_formula: "24d10+168",
      speed: "30 ft, lot 60 ft",
      abilities: { STR: 26, DEX: 14, CON: 24, INT: 22, WIS: 18, CHA: 24 },
      saves_pl: "ZRĘ +8, KON +13, MĄD +10",
      resistances_pl: "zimno; niemagiczne i nieposrebrzane obuchowe, kłute i cięte",
      immunities_pl: "ogień, trucizna; stan Zatruty",
      senses_pl: "Prawdziwe Widzenie 120 ft, Pasywna Percepcja 14",
      languages_pl: "Piekielny, Telepatia 120 ft",
      traits: [
        { name_pl: "Aura Strachu (20 ft, ST 21 MĄD) i Odporność na Magię", desc_pl: "Wrogowie zaczynający turę w promieniu 20 ft muszą zdać rzut obronny MĄD ST 21 albo są Przerażeni. Ponadto Diabeł Czeluści rzuca Kulę Ognia (Fireball ST 21) NA ZAWOŁANIE bez ograniczeń!" }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (4 Ataki!)", desc_pl: "Diabeł Czeluści wykonuje aż cztery ataki: ugryzienie, pazur, buławę oraz ogon!" },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 14, dmg_dice: "4d6+8", dmg_type_pl: "kłute + 6k6 trucizny co turę", desc_pl: "Atak wręcz: +14 do trafienia. Trafienie: 22 (4k6+8) kłutych + rzut obronny KON ST 21 albo Zatruty (brak możliwości leczenia i 21 [6k6] trucizny na początku każdej tury!)." },
        { name_pl: "Buława (Mace)", atk_bonus: 14, dmg_dice: "2d6+8", dmg_type_pl: "obuchowe + 6k6 ognia", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 10 ft. Trafienie: 15 (2k6+8) obuchowych + 21 (6k6) ognia." },
        { name_pl: "Ogon (Tail)", atk_bonus: 14, dmg_dice: "3d10+8", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 10 ft. Trafienie: 24 (3k10+8) obrażeń obuchowych." }
      ]
    },

    // =========================================================================
    // 6. ABERRACJE (ABERRATIONS)
    // =========================================================================
    {
      id: "mind-flayer",
      name_pl: "Łupieżca Umysłów — Illithid (Mind Flayer)",
      name_en: "Mind Flayer",
      icon: "🦑",
      type_pl: "Aberracja",
      type_en: "Aberration",
      size: "Medium (Średni)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "7",
      cr_num: 7,
      xp: 2900,
      ac: 15,
      ac_desc: "napierśnik",
      hp: 71,
      hp_formula: "13d8+13",
      speed: "30 ft",
      abilities: { STR: 11, DEX: 12, CON: 12, INT: 19, WIS: 17, CHA: 17 },
      saves_pl: "INT +7, MĄD +6, CHA +6",
      skills_pl: "Oszustwo +6, Wnikliwość +6, Percepcja +6, Perswazja +6, Skradanie się +4, Wiedza Tajemna +7",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 16",
      languages_pl: "Głęboka Mowa, Podwspólny, Telepatia 120 ft",
      traits: [
        { name_pl: "Odporność na Magię (Magic Resistance)", desc_pl: "Ułatwienie we wszystkich rzutach obronnych przeciwko zaklęciom i efektom magicznym." },
        { name_pl: "Wrodzone Czarostwo Psioniczne (ST 15)", desc_pl: "Na zawołanie: Wykrycie Myśli, Lewitacja. 1/dzień: Dominacja nad Potworem, Zmiana Planu." }
      ],
      actions: [
        { name_pl: "Macki (Tentacles)", atk_bonus: 7, dmg_dice: "2d10+4", dmg_type_pl: "psychiczne + Ogłuszenie", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 15 (2k10+4) psychicznych, cel zostaje Pochwycony (ST 15) i musi zdać rzut obronny INT ST 15 albo zostaje Ogłuszony (Stunned) dopóki trwa pochwycenie!" },
        { name_pl: "Wyrwanie Mózgu (Extract Brain)", atk_bonus: 7, dmg_dice: "10d10", dmg_type_pl: "kłute (Śmierć przy 0 PW!)", desc_pl: "Atak wręcz przeciwko obezwładnionemu i pochwyconemu humanoidowi: +7 do trafienia. Trafienie: 55 (10k10) obrażeń kłutych. Jeśli ten atak obniży PW celu do 0, illithid wyrywa i pożera jego mózg!" },
        { name_pl: "Uderzenie Umysłu (Mind Blast — Odnowienie 5–6)", dmg_dice: "4d8+4", dmg_type_pl: "psychiczne + Ogłuszenie", desc_pl: "Stożek 60 ft: każde stworzenie musi zdać rzut obronny INT ST 15 albo otrzymuje 22 (4k8+4) obrażeń psychicznych i zostaje Ogłuszone (Stunned) na 1 minutę!" }
      ]
    },
    {
      id: "aboleth",
      name_pl: "Aboleth",
      name_en: "Aboleth",
      icon: "👁️",
      type_pl: "Aberracja",
      type_en: "Aberration",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "10",
      cr_num: 10,
      xp: 5900,
      ac: 17,
      ac_desc: "naturalny pancerz",
      hp: 135,
      hp_formula: "18d10+36",
      speed: "10 ft, pływanie 40 ft",
      abilities: { STR: 21, DEX: 9, CON: 15, INT: 18, WIS: 15, CHA: 18 },
      saves_pl: "KON +6, INT +8, MĄD +6",
      skills_pl: "Historia +12, Percepcja +10",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 20",
      languages_pl: "Głęboka Mowa, Telepatia 120 ft",
      traits: [
        { name_pl: "Śluzowa Chmura i Sondowanie Telepatyczne", desc_pl: "Pod wodą otacza go śluz (ST 14 KON albo cel może oddychać tylko pod wodą przez 1k4h). Gdy ktoś rozmawia z nim telepatycznie, aboleth poznaje jego największe pragnienia." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (3 Macki)", desc_pl: "Aboleth wykonuje trzy ataki mackami." },
        { name_pl: "Macka (Tentacle)", atk_bonus: 9, dmg_dice: "2d6+5", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +9 do trafienia, zasięg 10 ft. Trafienie: 12 (2k6+5) obuchowych + rzut obronny KON ST 14 albo choroba zmieniająca skórę w przezroczysty śluz." },
        { name_pl: "Zniewolenie (Enslave — 3/dzień)", desc_pl: "Stworzenie w promieniu 30 ft wykonuje rzut obronny MĄD ST 14 albo zostaje magicznie zauroczone i poddane telepatycznej kontroli aboletha." }
      ],
      legendary_actions: [
        { name_pl: "Wykrycie / Atak Ogonem / Psychiczne Wyssanie (2 akcje — 3k6 psychicznych i leczenie)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    },
    {
      id: "beholder",
      name_pl: "Beholder (Obserwator — Tyran Oka)",
      name_en: "Beholder",
      icon: "👁️",
      type_pl: "Aberracja",
      type_en: "Aberration",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "13",
      cr_num: 13,
      xp: 10000,
      ac: 18,
      ac_desc: "naturalny pancerz",
      hp: 180,
      hp_formula: "19d10+76",
      speed: "0 ft, lot 20 ft (Hover)",
      abilities: { STR: 10, DEX: 14, CON: 18, INT: 17, WIS: 15, CHA: 17 },
      saves_pl: "INT +8, MĄD +7, CHA +8",
      skills_pl: "Percepcja +12",
      immunities_pl: "stan Powalony (Prone)",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 22",
      languages_pl: "Głęboka Mowa, Podwspólny",
      traits: [
        { name_pl: "Stożek Antymagii (Antimagic Cone — 150 ft!)", desc_pl: "Centralne oko Beholdera tworzy 150-stopowy stożek pola antymagicznego (jak zaklęcie 8. kręgu Antimagic Field!). Na początku każdej tury Beholder decyduje, w którą stronę skierowany jest stożek." }
      ],
      actions: [
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "4d6", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 14 (4k6) obrażeń kłutych." },
        { name_pl: "Promienie Oczu (Eye Rays — 3 losowe promienie k10 w turze, zasięg 120 ft, ST 16)", dmg_dice: "10d8", dmg_type_pl: "mocy / nekrotyczne", desc_pl: "1) Promień Uroku; 2) Promień Paraliżu (ST 16 KON); 3) Promień Strachu; 4) Promień Spowolnienia; 5) Promień Osłabienia (8k8 nekrotycznych); 6) Promień Telekinezy; 7) Promień Snu; 8) Promień Petryfikacji; 9) Promień Dezintegracji (10k8 mocy); 10) Promień Śmierci (10k10 nekrotycznych)!" }
      ],
      legendary_actions: [
        { name_pl: "Promień Oka (Eye Ray)", desc_pl: "Beholder wystrzeliwuje 1 losowy Promień Oka (3 akcje legendarne na rundę)." }
      ]
    },

    // =========================================================================
    // 7. MONSTRUALNOŚCI, SZLAMY, GIGANTY, ŻYWIOŁAKI, KONSTRUKTY I NIEBIANIE
    // =========================================================================
    {
      id: "mimic",
      name_pl: "Mimik (Mimic)",
      name_en: "Mimic",
      icon: "📦",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Medium (Średni)",
      alignment_pl: "Neutralny (N)",
      cr: "2",
      cr_num: 2,
      xp: 450,
      ac: 12,
      ac_desc: "naturalny pancerz",
      hp: 58,
      hp_formula: "9d8+18",
      speed: "15 ft",
      abilities: { STR: 17, DEX: 12, CON: 15, INT: 5, WIS: 13, CHA: 8 },
      skills_pl: "Skradanie się +5",
      immunities_pl: "kwas; stan Powalony",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 11",
      languages_pl: "—",
      traits: [
        { name_pl: "Klej (Adhesive) i Fałszywy Wygląd", desc_pl: "Nieodróżnialny od zwykłej skrzyni/drzwi. Każdy, kto dotknie mimika, zostaje automatycznie przyklejony i Pochwycony (ST 13, z utrudnieniem na wyrwanie się!)." }
      ],
      actions: [
        { name_pl: "Pseudopodia (Pseudopod)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "obuchowe + Przyklejenie", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) obuchowych i automatyczne Pochwycenie." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "kłute + 1k8 kwasu", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) kłutych + 4 (1k8) kwasu." }
      ]
    },
    {
      id: "gelatinous-cube",
      name_pl: "Galaretowaty Sześcian (Gelatinous Cube)",
      name_en: "Gelatinous Cube",
      icon: "🟢",
      type_pl: "Szlam",
      type_en: "Ooze",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "2",
      cr_num: 2,
      xp: 450,
      ac: 6,
      ac_desc: "brak",
      hp: 84,
      hp_formula: "8d10+40",
      speed: "15 ft",
      abilities: { STR: 14, DEX: 3, CON: 20, INT: 1, WIS: 6, CHA: 1 },
      immunities_pl: "stany: Oślepiony, Zauroczony, Ogłuchły, Wyczerpanie, Przerażony, Powalony",
      senses_pl: "Ślepowidzenie 60 ft, Pasywna Percepcja 8",
      languages_pl: "—",
      traits: [
        { name_pl: "Przezroczysty (Transparent — ST 15 Percepcji)", desc_pl: "Nawet stojąc na widoku, nieruchomy sześcian wymaga testu Percepcji ST 15, aby go zauważyć, zanim się w niego wejdzie!" }
      ],
      actions: [
        { name_pl: "Pochłonięcie (Engulf)", dmg_dice: "6d6", dmg_type_pl: "kwasu", desc_pl: "Sześcian wchodzi w przestrzeń stworzeń: muszą zdać rzut obronny ZRĘ ST 12 albo zostają wchłonięte do wnętrza (Unieruchomione, duszą się i otrzymują 3k6 kwasu przy wejściu oraz 6k6 kwasu na początku każdej tury sześcianu!)." }
      ]
    },
    {
      id: "owlbear",
      name_pl: "Sowoniedźwiedź (Owlbear)",
      name_en: "Owlbear",
      icon: "🦉",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 59,
      hp_formula: "7d10+21",
      speed: "40 ft",
      abilities: { STR: 20, DEX: 12, CON: 17, INT: 3, WIS: 12, CHA: 7 },
      skills_pl: "Percepcja +3",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 13",
      languages_pl: "—",
      traits: [
        { name_pl: "Wyostrzony Wzrok i Węch", desc_pl: "Ułatwienie w testach Percepcji opartych na wzroku lub węchu." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Multiattack)", desc_pl: "Sowoniedźwiedź wykonuje dwa ataki: jeden dziobem i jeden pazurami." },
        { name_pl: "Dziób (Beak)", atk_bonus: 7, dmg_dice: "1d10+5", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 10 (1k10+5) obrażeń kłutych." },
        { name_pl: "Pazury (Claws)", atk_bonus: 7, dmg_dice: "2d8+5", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 14 (2k8+5) obrażeń ciętych." }
      ]
    },
    {
      id: "displacer-beast",
      name_pl: "Złudna Bestia (Displacer Beast)",
      name_en: "Displacer Beast",
      icon: "🐈‍⬛",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "3",
      cr_num: 3,
      xp: 700,
      ac: 13,
      ac_desc: "naturalny pancerz",
      hp: 85,
      hp_formula: "10d10+30",
      speed: "40 ft",
      abilities: { STR: 18, DEX: 15, CON: 16, INT: 6, WIS: 12, CHA: 8 },
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 11",
      languages_pl: "—",
      traits: [
        { name_pl: "Unikanie (Avoidance) i Przemieszczenie (Displacement)", desc_pl: "Wszystkie rzuty ataku przeciwko bestii mają Utrudnienie (dopóki nie zostanie trafiona w danej rundzie). Ponadto przy rzutach obronnych o połowę obrażeń nie otrzymuje żadnych przy sukcesie i tylko połowę przy porażce!" }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Macki)", desc_pl: "Bestia wykonuje dwa ataki mackami." },
        { name_pl: "Macka (Tentacle)", atk_bonus: 6, dmg_dice: "1d6+4", dmg_type_pl: "obuchowe + 1k6 kłutych", desc_pl: "Atak wręcz: +6 do trafienia, zasięg 10 ft. Trafienie: 7 (1k6+4) obuchowych + 3 (1k6) kłutych." }
      ]
    },
    {
      id: "troll",
      name_pl: "Troll",
      name_en: "Troll",
      icon: "👹",
      type_pl: "Gigant",
      type_en: "Giant",
      size: "Large (Duży)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "5",
      cr_num: 5,
      xp: 1800,
      ac: 15,
      ac_desc: "naturalny pancerz",
      hp: 84,
      hp_formula: "8d10+40",
      speed: "30 ft",
      abilities: { STR: 18, DEX: 13, CON: 20, INT: 7, WIS: 9, CHA: 7 },
      skills_pl: "Percepcja +2",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 12",
      languages_pl: "Giganci",
      traits: [
        { name_pl: "Regeneracja (10 PW co turę!)", desc_pl: "Troll odzyskuje 10 PW na początku swojej tury. Jeśli otrzyma obrażenia od kwasu lub ognia, regeneracja nie działa na początku jego następnej tury. Troll umiera tylko wtedy, gdy zaczyna turę z 0 PW i nie regeneruje się!" }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (3 Ataki)", desc_pl: "Troll wykonuje trzy ataki: jeden ugryzieniem i dwa pazurami." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "1d6+4", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 7 (1k6+4) obrażeń kłutych." },
        { name_pl: "Pazur (Claw)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 11 (2k6+4) obrażeń ciętych." }
      ]
    },
    {
      id: "fire-elemental",
      name_pl: "Żywiołak Ognia (Fire Elemental — Wild Shape Poz. 10 Kręgu Księżyca)",
      name_en: "Fire Elemental",
      icon: "🔥",
      type_pl: "Żywiołak",
      type_en: "Elemental",
      size: "Large (Duży)",
      alignment_pl: "Neutralny (N)",
      cr: "5",
      cr_num: 5,
      xp: 1800,
      ac: 13,
      ac_desc: "naturalny",
      hp: 102,
      hp_formula: "12d10+36",
      speed: "50 ft",
      abilities: { STR: 10, DEX: 17, CON: 16, INT: 6, WIS: 10, CHA: 7 },
      resistances_pl: "niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "ogień, trucizna; stany: Wyczerpanie, Pochwycony, Sparaliżowany, Spetryfikowany, Zatruty, Powalony, Unieruchomiony, Nieprzytomny",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 10",
      languages_pl: "Ignan",
      traits: [
        { name_pl: "Postać Ognia (Fire Form — 1k10 ognia)", desc_pl: "Przeciska się przez szczeliny 1 cala. Każde stworzenie, które dotknie żywiołaka, trafi go wręcz z 5 ft lub przez które żywiołak przejdzie, otrzymuje 5 (1k10) obrażeń od ognia i zaczyna płonąć (1k10 ognia na początku każdej tury dopóki nie ugasi płomieni w akcji!)." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Dotyki)", desc_pl: "Żywiołak wykonuje dwa ataki dotykiem." },
        { name_pl: "Dotyk (Touch)", atk_bonus: 6, dmg_dice: "2d6+3", dmg_type_pl: "ognia + Podpalenie 1k10", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 10 (2k6+3) obrażeń od ognia oraz podpalenie celu (1k10 ognia co turę)." }
      ]
    },
    {
      id: "earth-elemental",
      name_pl: "Żywiołak Ziemi (Earth Elemental — Wild Shape Poz. 10 Kręgu Księżyca)",
      name_en: "Earth Elemental",
      icon: "🪨",
      type_pl: "Żywiołak",
      type_en: "Elemental",
      size: "Large (Duży)",
      alignment_pl: "Neutralny (N)",
      cr: "5",
      cr_num: 5,
      xp: 1800,
      ac: 17,
      ac_desc: "naturalny pancerz",
      hp: 126,
      hp_formula: "12d10+60",
      speed: "30 ft, kopanie 30 ft",
      abilities: { STR: 20, DEX: 8, CON: 20, INT: 5, WIS: 10, CHA: 5 },
      resistances_pl: "niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "trucizna; Wyczerpanie, Sparaliżowany, Spetryfikowany, Zatruty, Nieprzytomny (Podatność: Grzmot ×2)",
      senses_pl: "Widzenie w ciemności 60 ft, Wyczucie Drgań (Tremorsense) 60 ft, Pasywna Percepcja 10",
      languages_pl: "Terran",
      traits: [
        { name_pl: "Ślizg przez Ziemię (Earth Glide) i Oblężniczy Potwór", desc_pl: "Przenika przez nienaruszony kamień i ziemię bez zostawiania śladów oraz zadaje podwójne obrażenia budynkom i przedmiotom." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Uderzenia)", desc_pl: "Żywiołak wykonuje dwa ataki uderzeniem." },
        { name_pl: "Uderzenie (Slam)", atk_bonus: 8, dmg_dice: "2d8+5", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +8 do trafienia, zasięg 10 ft. Trafienie: 14 (2k8+5) obrażeń obuchowych." }
      ]
    },
    {
      id: "hydra",
      name_pl: "Hydra",
      name_en: "Hydra",
      icon: "🐍",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Huge (Ogromny)",
      alignment_pl: "Bez charakteru",
      cr: "8",
      cr_num: 8,
      xp: 3900,
      ac: 15,
      ac_desc: "naturalny pancerz",
      hp: 172,
      hp_formula: "15d12+75",
      speed: "30 ft, pływanie 30 ft",
      abilities: { STR: 20, DEX: 12, CON: 20, INT: 2, WIS: 10, CHA: 7 },
      skills_pl: "Percepcja +6",
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 16",
      languages_pl: "—",
      traits: [
        { name_pl: "Wiele Głów (Multiple Heads — 5 głów na start!)", desc_pl: "Hydra ma 5 głów, ułatwienie przeciwko Oślepieniu/Zauroczeniu/Ogłuszeniu i dostaje 1 dodatkową reakcję na każdą głowę ponad pierwszą! Gdy otrzyma 25+ obrażeń w jednej turze, traci 1 głowę — a na koniec jej tury w miejsce każdej ściętej głowy wyrastają DWIE nowe (i leczą ją o 10 PW każda), chyba że hydra otrzymała w tej rundzie obrażenia od ognia!" }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (Tyle Ugryzień, ile ma Głów!)", desc_pl: "Hydra wykonuje tyle ataków ugryzieniem, ile posiada aktualnie głów (startowo 5 ataków!)." },
        { name_pl: "Ugryzienie (Bite)", atk_bonus: 8, dmg_dice: "1d10+5", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +8 do trafienia, zasięg 10 ft. Trafienie: 10 (1k10+5) obrażeń kłutych." }
      ]
    },
    {
      id: "fire-giant",
      name_pl: "Ognisty Gigant (Fire Giant)",
      name_en: "Fire Giant",
      icon: "🗿",
      type_pl: "Gigant",
      type_en: "Giant",
      size: "Huge (Ogromny)",
      alignment_pl: "Praworządny Zły (LE)",
      cr: "9",
      cr_num: 9,
      xp: 5000,
      ac: 18,
      ac_desc: "zbroja płytowa",
      hp: 162,
      hp_formula: "13d12+78",
      speed: "30 ft",
      abilities: { STR: 25, DEX: 9, CON: 23, INT: 10, WIS: 14, CHA: 13 },
      saves_pl: "ZRĘ +3, KON +10, CHA +5",
      skills_pl: "Atletyka +11, Percepcja +6",
      immunities_pl: "ogień",
      senses_pl: "Pasywna Percepcja 16",
      languages_pl: "Giganci",
      traits: [],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Ciosy Mieczem)", desc_pl: "Gigant wykonuje dwa ataki mieczem dwuręcznym." },
        { name_pl: "Miecz Dwuręczny (Greatsword)", atk_bonus: 11, dmg_dice: "6d6+7", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +11 do trafienia, zasięg 10 ft. Trafienie: 28 (6k6+7) obrażeń ciętych." },
        { name_pl: "Głaz (Rock)", atk_bonus: 11, dmg_dice: "4d10+7", dmg_type_pl: "obuchowe", desc_pl: "Atak dystansowy: +11 do trafienia, zasięg 60/240 ft. Trafienie: 29 (4k10+7) obrażeń obuchowych." }
      ]
    },
    {
      id: "storm-giant",
      name_pl: "Burzowy Gigant (Storm Giant)",
      name_en: "Storm Giant",
      icon: "⚡",
      type_pl: "Gigant",
      type_en: "Giant",
      size: "Huge (Ogromny)",
      alignment_pl: "Chaotyczny Dobry (CG)",
      cr: "13",
      cr_num: 13,
      xp: 10000,
      ac: 16,
      ac_desc: "zbroja łuskowa",
      hp: 230,
      hp_formula: "20d12+100",
      speed: "50 ft, pływanie 50 ft",
      abilities: { STR: 29, DEX: 14, CON: 20, INT: 16, WIS: 18, CHA: 18 },
      saves_pl: "SIŁ +14, KON +10, MĄD +9, CHA +9",
      skills_pl: "Atletyka +14, Historia +8, Percepcja +9, Wiedza Tajemna +8",
      resistances_pl: "zimno",
      immunities_pl: "błyskawice, grzmot",
      senses_pl: "Pasywna Percepcja 19",
      languages_pl: "Wspólny, Giganci",
      traits: [
        { name_pl: "Wodolądowy i Wrodzone Czarostwo (ST 17)", desc_pl: "Na zawołanie: Wykrycie Magii, Piórkowe Opadanie, Lewitacja, Światło. 3/dzień: Kontrola Pogody, Oddychanie pod Wodą." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Ciosy Mieczem)", desc_pl: "Gigant wykonuje dwa ataki mieczem dwuręcznym." },
        { name_pl: "Miecz Dwuręczny (Greatsword)", atk_bonus: 14, dmg_dice: "6d6+9", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +14 do trafienia, zasięg 10 ft. Trafienie: 30 (6k6+9) obrażeń ciętych." },
        { name_pl: "Uderzenie Pioruna (Lightning Strike — Odnowienie 5–6)", dmg_dice: "12d8", dmg_type_pl: "błyskawic", desc_pl: "Piorun uderza w punkt w odległości do 500 ft: każde stworzenie w promieniu 10 ft wykonuje rzut obronny ZRĘ ST 17, otrzymując 54 (12k8) obrażeń od błyskawic (połowa przy sukcesie)." }
      ]
    },
    {
      id: "iron-golem",
      name_pl: "Żelazny Golem (Iron Golem)",
      name_en: "Iron Golem",
      icon: "🤖",
      type_pl: "Konstrukt",
      type_en: "Construct",
      size: "Large (Duży)",
      alignment_pl: "Bez charakteru",
      cr: "16",
      cr_num: 16,
      xp: 15000,
      ac: 20,
      ac_desc: "naturalny pancerz",
      hp: 210,
      hp_formula: "20d10+100",
      speed: "30 ft",
      abilities: { STR: 24, DEX: 9, CON: 20, INT: 3, WIS: 11, CHA: 1 },
      immunities_pl: "ogień, trucizna, psychiczne; niemagiczne i nieadamantytowe obuchowe, kłute i cięte; stany: Zauroczony, Wyczerpanie, Przerażony, Sparaliżowany, Spetryfikowany, Zatruty",
      senses_pl: "Widzenie w ciemności 120 ft, Pasywna Percepcja 10",
      languages_pl: "Rozumie języki swojego twórcy",
      traits: [
        { name_pl: "Absorpcja Ognia (Fire Absorption — ogień go LECZY!)", desc_pl: "Za każdym razem, gdy żelazny golem miałby otrzymać obrażenia od ognia, nie otrzymuje żadnych obrażeń i zamiast tego ODZYSKUJE liczbę PW równą tym obrażeniom od ognia!" },
        { name_pl: "Odporność na Magię i Niezmienna Postać", desc_pl: "Ułatwienie w rzutach obronnych przeciwko zaklęciom i niepodatność na zmianę kształtu." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Ataki)", desc_pl: "Golem wykonuje dwa ataki wręcz." },
        { name_pl: "Miecz (Sword)", atk_bonus: 13, dmg_dice: "3d10+7", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +13 do trafienia, zasięg 10 ft. Trafienie: 23 (3k10+7) obrażeń ciętych." },
        { name_pl: "Trujący Oddech (Poison Breath — Odnowienie 6)", dmg_dice: "10d8", dmg_type_pl: "trucizny", desc_pl: "Stożek 15 ft: rzut obronny KON ST 19 albo 45 (10k8) obrażeń od trucizny." }
      ]
    },
    {
      id: "solar",
      name_pl: "Solar (Najwyższy Anioł)",
      name_en: "Solar",
      icon: "🪽",
      type_pl: "Niebianin",
      type_en: "Celestial",
      size: "Large (Duży)",
      alignment_pl: "Praworządny Dobry (LG)",
      cr: "21",
      cr_num: 21,
      xp: 33000,
      ac: 21,
      ac_desc: "naturalny pancerz",
      hp: 243,
      hp_formula: "18d10+144",
      speed: "50 ft, lot 150 ft",
      abilities: { STR: 26, DEX: 22, CON: 26, INT: 25, WIS: 25, CHA: 30 },
      saves_pl: "INT +14, MĄD +14, CHA +17",
      skills_pl: "Percepcja +14",
      resistances_pl: "światłość; niemagiczne obuchowe, kłute i cięte",
      immunities_pl: "nekrotyczne, trucizna; Zauroczony, Wyczerpanie, Przerażony, Zatruty",
      senses_pl: "Prawdziwe Widzenie 120 ft, Pasywna Percepcja 24",
      languages_pl: "Wszystkie, Telepatia 120 ft",
      traits: [
        { name_pl: "Anielska Broń (+6k8 światłości) i Odporność na Magię", desc_pl: "Każdy atak bronią Solara zadaje dodatkowe 27 (6k8) obrażeń od światłości (wliczone poniżej). Solar automatycznie rozpoznaje każde kłamstwo." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (2 Ciosy + Latający Miecz w akcji dodatkowej!)", desc_pl: "Solar wykonuje dwa ataki mieczem dwuręcznym, a w akcji dodatkowej rozkazuje swojemu latającemu mieczowi wykonać trzeci atak!" },
        { name_pl: "Anielski Miecz Dwuręczny (Greatsword)", atk_bonus: 15, dmg_dice: "4d6+8", dmg_type_pl: "cięte + 6k8 światłości", desc_pl: "Atak wręcz: +15 do trafienia. Trafienie: 22 (4k6+8) ciętych + 27 (6k8) światłości (łącznie śr. 49 obrażeń z jednego ciosu!)." },
        { name_pl: "Łuk Zabójstwa (Slaying Longbow)", atk_bonus: 13, dmg_dice: "2d8+6", dmg_type_pl: "kłute + 6k8 światłości (Śmierć poniżej 100 PW!)", desc_pl: "Atak dystansowy: +13 do trafienia, zasięg 150/600 ft. Trafienie: 15 (2k8+6) kłutych + 27 (6k8) światłości. Jeśli cel ma 100 PW lub mniej, musi zdać rzut obronny KON ST 15 albo natychmiast GINIE!" }
      ],
      legendary_actions: [
        { name_pl: "Teleportacja (120 ft) / Palący Wybuch (2 akcje — 4k6 ognia + 4k6 światłości) / Oślepiające Spojrzenie (3)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    },
    {
      id: "kraken",
      name_pl: "Kraken (Tytan Głębin)",
      name_en: "Kraken",
      icon: "🐙",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Gargantuan (Gargantuiczny)",
      alignment_pl: "Chaotyczny Zły (CE)",
      cr: "23",
      cr_num: 23,
      xp: 50000,
      ac: 18,
      ac_desc: "naturalny pancerz",
      hp: 472,
      hp_formula: "27d20+189",
      speed: "20 ft, pływanie 60 ft",
      abilities: { STR: 30, DEX: 11, CON: 25, INT: 22, WIS: 18, CHA: 20 },
      saves_pl: "SIŁ +17, ZRĘ +7, KON +14, INT +13, MĄD +11",
      immunities_pl: "błyskawice; niemagiczne obuchowe, kłute i cięte; Przerażony, Sparaliżowany",
      senses_pl: "Prawdziwe Widzenie 120 ft, Pasywna Percepcja 14",
      languages_pl: "Rozumie Otchłanny, Niebiański, Piekielny i Pierwotny, Telepatia 120 ft",
      traits: [
        { name_pl: "Swoboda Ruchu i Oblężniczy Potwór", desc_pl: "Kraken ignoruje trudny teren, nie może zostać spowolniony ani sparaliżowany i zadaje podwójne obrażenia statkom i budowlom." }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (3 Macki lub Ciśnięcie)", desc_pl: "Kraken wykonuje trzy ataki mackami." },
        { name_pl: "Macka (Tentacle)", atk_bonus: 17, dmg_dice: "3d6+10", dmg_type_pl: "obuchowe + Unieruchomienie", desc_pl: "Atak wręcz: +17 do trafienia, zasięg 30 ft. Trafienie: 20 (3k6+10) obuchowych, a cel jest automatycznie Pochwycony (ST 18) i Unieruchomiony!" },
        { name_pl: "Burza Błyskawic (Lightning Storm)", dmg_dice: "4d10", dmg_type_pl: "błyskawic (×3 pioruny)", desc_pl: "Kraken tworzy trzy pioruny w zasięgu 120 ft: cel każdego pioruna wykonuje rzut obronny ZRĘ ST 23 albo otrzymuje 22 (4k10) obrażeń od błyskawic." }
      ],
      legendary_actions: [
        { name_pl: "Atak Macką / Burza Błyskawic (2) / Chmura Atramentu (3)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    },
    {
      id: "tarrasque",
      name_pl: "Tarrasque (Niszczyciel Światów — CR 30)",
      name_en: "Tarrasque",
      icon: "🦖",
      type_pl: "Monstrualność",
      type_en: "Monstrosity",
      size: "Gargantuan (Gargantuiczny)",
      alignment_pl: "Bez charakteru",
      cr: "30",
      cr_num: 30,
      xp: 155000,
      ac: 25,
      ac_desc: "naturalny pancerz",
      hp: 676,
      hp_formula: "33d20+330",
      speed: "40 ft",
      abilities: { STR: 30, DEX: 11, CON: 30, INT: 3, WIS: 11, CHA: 11 },
      saves_pl: "INT +5, MĄD +9, CHA +9",
      immunities_pl: "ogień, trucizna; niemagiczne obuchowe, kłute i cięte; stany: Zauroczony, Przerażony, Sparaliżowany, Zatruty",
      senses_pl: "Ślepowidzenie 120 ft, Pasywna Percepcja 10",
      languages_pl: "—",
      traits: [
        { name_pl: "Legendarna Odporność (3/dzień) i Odporność na Magię", desc_pl: "Ułatwienie we wszystkich rzutach obronnych przeciwko zaklęciom oraz 3 automatyczne sukcesy dziennie." },
        { name_pl: "Odbijający Pancerz (Reflective Carapace!)", desc_pl: "Za każdym razem, gdy Tarrasque jest celem zaklęcia Magiczny Pocisk, zaklęcia o obszarze linii lub zaklęcia wymagającego rzutu ataku dystansowego, rzuć k6: przy 1–5 zaklęcie nie wywołuje żadnego efektu, a przy 6 odbija się z powrotem w rzucającego!" }
      ],
      actions: [
        { name_pl: "Wielokrotny Atak (5 Ataków!)", desc_pl: "Tarrasque używa Przerażającej Obecności (ST 17 MĄD), a następnie wykonuje PIĘĆ ataków: ugryzienie, dwa pazury, rogi oraz ogon (lub Połknięcie)!" },
        { name_pl: "Ugryzienie i Połknięcie (Bite & Swallow)", atk_bonus: 19, dmg_dice: "4d12+10", dmg_type_pl: "kłute + Unieruchomienie", desc_pl: "Atak wręcz: +19 do trafienia, zasięg 10 ft. Trafienie: 36 (4k12+10) kłutych, cel zostaje Pochwycony (ST 20) i Unieruchomiony (a przy kolejnym ataku połknięty do żołądka za 16k6 kwasu co turę!)." },
        { name_pl: "Pazur (Claw)", atk_bonus: 19, dmg_dice: "4d8+10", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +19 do trafienia, zasięg 15 ft. Trafienie: 28 (4k8+10) obrażeń ciętych." },
        { name_pl: "Rogi (Horns)", atk_bonus: 19, dmg_dice: "4d10+10", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +19 do trafienia, zasięg 10 ft. Trafienie: 32 (4k10+10) obrażeń kłutych." },
        { name_pl: "Ogon (Tail)", atk_bonus: 19, dmg_dice: "4d6+10", dmg_type_pl: "obuchowe + Powalenie ST 20", desc_pl: "Atak wręcz: +19 do trafienia, zasięg 20 ft. Trafienie: 24 (4k6+10) obuchowych i rzut obronny SIŁ ST 20 albo Powalenie." }
      ],
      legendary_actions: [
        { name_pl: "Atak / Ruch / Miażdżący Chomp (2 akcje — Ugryzienie lub Połknięcie)", desc_pl: "3 akcje legendarne na rundę." }
      ]
    }
  ];
})();
