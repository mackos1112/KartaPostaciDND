// ============================================================================
// Rozszerzony Bestiariusz AideDD D&D 5e (https://www.aidedd.org/monster-dnd5/)
// Ponad 80 dodatkowych potworów ze wszystkich kategorii SW (0–24) i typów istot
// Automatycznie dołączanych do window.DND_MONSTERS
// ============================================================================

(function () {
  function m(id, name_pl, name_en, icon, type_pl, type_en, size, alignment_pl, cr, cr_num, xp, ac, ac_desc, hp, hp_formula, speed, abilities, meta, traits, actions, legendary_actions) {
    return {
      id, name_pl, name_en, icon, type_pl, type_en, size, alignment_pl,
      cr: String(cr), cr_num, xp, ac, ac_desc, hp, hp_formula, speed,
      abilities,
      saves_pl: meta.saves_pl || null,
      skills_pl: meta.skills_pl || null,
      resistances_pl: meta.resistances_pl || null,
      immunities_pl: meta.immunities_pl || null,
      senses_pl: meta.senses_pl || "Pasywna Percepcja 10",
      languages_pl: meta.languages_pl || "—",
      traits: traits || [],
      actions: actions || [],
      legendary_actions: legendary_actions || null
    };
  }

  const EXTRA_MONSTERS = [
    // ======================== DODATKOWE BESTIE (CHOWAŃCE, WILD SHAPE, POLIMORFIA) ========================
    m("bat", "Nietoperz (Chowaniec)", "Bat", "🦇", "Bestia", "Beast", "Tiny (Malutki)", "Bez charakteru", "0", 0, 10, 12, "naturalny", 1, "1d4-1", "5 ft, lot 30 ft",
      { STR: 2, DEX: 15, CON: 8, INT: 2, WIS: 12, CHA: 4 }, { senses_pl: "Ślepowidzenie 60 ft, Pasywna Percepcja 11" },
      [{ name_pl: "Echolokacja i Wyostrzony Słuch", desc_pl: "Ślepowidzenie 60 ft (nie działa przy ogłuszeniu) oraz ułatwienie w Percepcji słuchowej." }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 0, dmg_dice: "1d1", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +0 do trafienia. Trafienie: 1 obrażenie kłute." }]),

    m("cat", "Kot (Chowaniec)", "Cat", "🐈", "Bestia", "Beast", "Tiny (Malutki)", "Bez charakteru", "0", 0, 10, 12, "naturalny", 2, "1d4", "40 ft, wspinaczka 30 ft",
      { STR: 3, DEX: 15, CON: 10, INT: 3, WIS: 12, CHA: 7 }, { skills_pl: "Percepcja +3, Skradanie się +4", senses_pl: "Pasywna Percepcja 13" },
      [{ name_pl: "Wyostrzony Węch", desc_pl: "Ułatwienie w testach Percepcji opartych na węchu." }],
      [{ name_pl: "Pazury (Claws)", atk_bonus: 0, dmg_dice: "1d1", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +0 do trafienia. Trafienie: 1 obrażenie cięte." }]),

    m("raven", "Kruk (Chowaniec)", "Raven", "🐦‍⬛", "Bestia", "Beast", "Tiny (Malutki)", "Bez charakteru", "0", 0, 10, 12, "naturalny", 1, "1d4-1", "10 ft, lot 50 ft",
      { STR: 2, DEX: 14, CON: 8, INT: 2, WIS: 12, CHA: 6 }, { skills_pl: "Percepcja +3", senses_pl: "Pasywna Percepcja 13" },
      [{ name_pl: "Mimikra (Mimicry)", desc_pl: "Kruk potrafi naśladować proste dźwięki i głosy (ST 10 Wnikliwości by rozpoznać podstęp)." }],
      [{ name_pl: "Dziób (Beak)", atk_bonus: 4, dmg_dice: "1d1", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 1 obrażenie kłute." }]),

    m("poisonous-snake", "Jadowity Wąż (Chowaniec)", "Poisonous Snake", "🐍", "Bestia", "Beast", "Tiny (Malutki)", "Bez charakteru", "1/8", 0.125, 25, 13, "naturalny", 2, "1d4", "30 ft, pływanie 30 ft",
      { STR: 2, DEX: 16, CON: 11, INT: 1, WIS: 10, CHA: 3 }, { senses_pl: "Ślepowidzenie 10 ft, Pasywna Percepcja 10" }, [],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d1", dmg_type_pl: "kłute + 2k4 trucizny", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 1 kłute + rzut obronny KON ST 10 na 5 (2k4) obrażeń od trucizny (połowa przy sukcesie)." }]),

    m("warhorse", "Koń Bojowy (Find Steed Paladyna)", "Warhorse", "🐎", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "1/2", 0.5, 100, 11, "naturalny", 19, "3d10+3", "60 ft",
      { STR: 18, DEX: 12, CON: 13, INT: 2, WIS: 12, CHA: 7 }, { senses_pl: "Pasywna Percepcja 11" },
      [{ name_pl: "Stratowanie w Szarży (Trampling Charge)", desc_pl: "Po ruchu o 20 ft i trafieniu kopytami cel zdaje rzut obronny SIŁ ST 14 albo zostaje powalony, a koń uderza go jeszcze raz w akcji dodatkowej!" }],
      [{ name_pl: "Kopyta (Hooves)", atk_bonus: 6, dmg_dice: "2d6+4", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 11 (2k6+4) obrażeń obuchowych." }]),

    m("reef-shark", "Rekin Rafowy (Wild Shape Pływanie)", "Reef Shark", "🦈", "Bestia", "Beast", "Medium (Średni)", "Bez charakteru", "1/2", 0.5, 100, 12, "naturalny pancerz", 22, "4d8+4", "0 ft, pływanie 40 ft",
      { STR: 14, DEX: 13, CON: 13, INT: 1, WIS: 10, CHA: 4 }, { skills_pl: "Percepcja +2", senses_pl: "Ślepowidzenie 30 ft, Pasywna Percepcja 12" },
      [{ name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Ułatwienie w atakach, gdy sojusznik jest w odległości 5 ft od celu." }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 4, dmg_dice: "1d8+2", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 6 (1k8+2) obrażeń kłutych." }]),

    m("ape", "Małpa (Ape)", "Ape", "🐒", "Bestia", "Beast", "Medium (Średni)", "Bez charakteru", "1/2", 0.5, 100, 12, "naturalny", 19, "3d8+6", "30 ft, wspinaczka 30 ft",
      { STR: 16, DEX: 14, CON: 14, INT: 6, WIS: 12, CHA: 7 }, { skills_pl: "Atletyka +5, Percepcja +3", senses_pl: "Pasywna Percepcja 13" }, [],
      [{ name_pl: "Wielokrotny Atak (2 Pięści)", desc_pl: "Małpa wykonuje dwa ataki pięściami." },
       { name_pl: "Pięść (Fist)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) obrażeń obuchowych." },
       { name_pl: "Kamień (Rock)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "obuchowe", desc_pl: "Atak dystansowy (25/50 ft): +5 do trafienia. Trafienie: 6 (1k6+3) обuchowych." }]),

    m("giant-eagle", "Olbrzymi Orzeł (Wild Shape Poz. 8 Lot)", "Giant Eagle", "🦅", "Bestia", "Beast", "Large (Duży)", "Neutralny Dobry (NG)", "1", 1, 200, 13, "naturalny", 26, "4d10+4", "10 ft, lot 80 ft",
      { STR: 16, DEX: 17, CON: 13, INT: 8, WIS: 14, CHA: 10 }, { skills_pl: "Percepcja +4", senses_pl: "Pasywna Percepcja 14", languages_pl: "Olbrzymich Orłów, rozumie Wspólny i Auran" },
      [{ name_pl: "Wyostrzony Wzrok", desc_pl: "Ułatwienie w testach Percepcji opartych na wzroku." }],
      [{ name_pl: "Wielokrotny Atak (Dziób i Szpony)", desc_pl: "Orzeł wykonuje dwa ataki: jeden dziobem i jeden szponami." },
       { name_pl: "Dziób (Beak)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) kłutych." },
       { name_pl: "Szpony (Talons)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 10 (2k6+3) ciętych." }]),

    m("giant-toad", "Olbrzymia Ropucha (Połyka wrogów!)", "Giant Toad", "🐸", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "1", 1, 200, 11, "naturalny", 39, "6d10+6", "20 ft, pływanie 40 ft",
      { STR: 15, DEX: 13, CON: 13, INT: 2, WIS: 10, CHA: 3 }, { senses_pl: "Widzenie w ciemności 30 ft, Pasywna Percepcja 10" },
      [{ name_pl: "Wodolądowa i Skok z Miejsca (20 ft w dal, 10 ft wzwyż)", desc_pl: "Oddycha w powietrzu i pod wodą." }],
      [{ name_pl: "Ugryzienie i Połknięcie (Bite & Swallow)", atk_bonus: 4, dmg_dice: "1d10+2", dmg_type_pl: "kłute + 1k10 trucizny + Unieruchomienie", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 7 (1k10+2) kłutych + 5 (1k10) trucizny, a Średni lub mniejszy cel jest automatycznie Pochwycony i Unieruchomiony (a przy kolejnym ataku połknięty za 3k6 kwasu co turę!)." }]),

    m("giant-octopus", "Olbrzymia Ośmiornica (Wild Shape)", "Giant Octopus", "🐙", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "1", 1, 200, 11, "naturalny", 52, "8d10+8", "10 ft, pływanie 60 ft",
      { STR: 17, DEX: 13, CON: 13, INT: 4, WIS: 10, CHA: 4 }, { skills_pl: "Percepcja +4, Skradanie się +5", senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 14" },
      [{ name_pl: "Wstrzymanie Oddechu (1h na lądzie) i Kamuflaż Podwodny", desc_pl: "Ułatwienie w Skradaniu się pod wodą." }],
      [{ name_pl: "Macki (Tentacles — Zasięg 15 ft!)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "obuchowe + Unieruchomienie", desc_pl: "Atak wręcz: +5 do trafienia, zasięg 15 ft. Trafienie: 10 (2k6+3) obuchowych oraz automatyczne Pochwycenie (ST 16) i Unieruchomienie celu!" }]),

    m("lion", "Lew (Lion)", "Lion", "🦁", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "1", 1, 200, 12, "naturalny", 26, "4d10+4", "50 ft",
      { STR: 17, DEX: 15, CON: 13, INT: 3, WIS: 12, CHA: 8 }, { skills_pl: "Percepcja +3, Skradanie się +6", senses_pl: "Pasywna Percepcja 13" },
      [{ name_pl: "Taktyka Stada i Rzucenie się (Pounce)", desc_pl: "Ułatwienie przy sojuszniku obok celu. Po ruchu o 20 ft i trafieniu pazurami cel zdaje rzut obronny SIŁ ST 13 albo upada (Prone), a lew gryzie go w akcji dodatkowej!" }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) kłutych." },
       { name_pl: "Pazur (Claw)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) ciętych." }]),

    m("tiger", "Tygrys (Tiger)", "Tiger", "🐅", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "1", 1, 200, 12, "naturalny", 37, "5d10+10", "40 ft",
      { STR: 17, DEX: 15, CON: 14, INT: 3, WIS: 12, CHA: 8 }, { skills_pl: "Percepcja +3, Skradanie się +6", senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 13" },
      [{ name_pl: "Rzucenie się (Pounce — ST 13 SIŁ)", desc_pl: "Po ruchu o 20 ft i trafieniu pazurami cel zdaje rzut obronny SIŁ ST 13 albo upada, a tygrys wykonuje ugryzienie w akcji dodatkowej." }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "1d10+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 8 (1k10+3) kłutych." },
       { name_pl: "Pazur (Claw)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) ciętych." }]),

    m("polar-bear", "Niedźwiedź Polarny (Wild Shape Poz. 6)", "Polar Bear", "🐻‍❄️", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "2", 2, 450, 12, "naturalny pancerz", 42, "5d10+15", "40 ft, pływanie 30 ft",
      { STR: 20, DEX: 10, CON: 16, INT: 2, WIS: 13, CHA: 7 }, { skills_pl: "Percepcja +3", senses_pl: "Pasywna Percepcja 13" },
      [{ name_pl: "Wyostrzony Węch", desc_pl: "Ułatwienie w Percepcji opartej na węchu." }],
      [{ name_pl: "Wielokrotny Atak (Ugryzienie i Pazury)", desc_pl: "Niedźwiedź wykonuje dwa ataki: ugryzieniem i pazurami." },
       { name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "1d8+5", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 9 (1k8+5) kłutych." },
       { name_pl: "Pazury (Claws)", atk_bonus: 7, dmg_dice: "2d6+5", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 12 (2k6+5) ciętych." }]),

    m("sabre-toothed-tiger", "Tygrys Szablozębny (Wild Shape Poz. 6)", "Sabre-Toothed Tiger", "🐅", "Bestia", "Beast", "Large (Duży)", "Bez charakteru", "2", 2, 450, 12, "naturalny", 52, "7d10+14", "40 ft",
      { STR: 18, DEX: 14, CON: 15, INT: 3, WIS: 12, CHA: 8 }, { skills_pl: "Percepcja +3, Skradanie się +6", senses_pl: "Pasywna Percepcja 13" },
      [{ name_pl: "Rzucenie się (Pounce — ST 14 SIŁ)", desc_pl: "Po ruchu o 20 ft i trafieniu pazurami powala cel (ST 14 SIŁ) i gryzie w akcji dodatkowej." }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 6, dmg_dice: "1d10+5", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 10 (1k10+5) kłutych." },
       { name_pl: "Pazur (Claw)", atk_bonus: 6, dmg_dice: "2d6+5", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 12 (2k6+5) ciętych." }]),

    m("giant-elk", "Olbrzymi Łoś (Wild Shape Poz. 6)", "Giant Elk", "🦌", "Bestia", "Beast", "Huge (Ogromny)", "Bez charakteru", "2", 2, 450, 14, "naturalny pancerz", 42, "5d12+10", "60 ft",
      { STR: 19, DEX: 16, CON: 14, INT: 7, WIS: 14, CHA: 10 }, { skills_pl: "Percepcja +4", senses_pl: "Pasywna Percepcja 14", languages_pl: "Olbrzymich Łosi, rozumie Wspólny, Elfi i Leśny" },
      [{ name_pl: "Szarża (+2k6 i Powalenie ST 14 SIŁ)", desc_pl: "Po ruchu o 20 ft uderzenie porożem zadaje dodatkowe +2k6 obrażeń i powala cel." }],
      [{ name_pl: "Poroże (Ram)", atk_bonus: 6, dmg_dice: "2d6+4", dmg_type_pl: "obuchowe (+2k6 w szarży)", desc_pl: "Atak wręcz: +6 do trafienia, zasięg 10 ft. Trafienie: 11 (2k6+4) obuchowych." },
       { name_pl: "Kopyta (Hooves — w powalony cel)", atk_bonus: 6, dmg_dice: "4d8+4", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz w powalony cel: +6 do trafienia. Trafienie: 22 (4k8+4) obuchowych!" }]),

    m("killer-whale", "Orka (Killer Whale — Wild Shape Pływanie)", "Killer Whale", "🐋", "Bestia", "Beast", "Huge (Ogromny)", "Bez charakteru", "3", 3, 700, 12, "naturalny pancerz", 90, "12d12+12", "0 ft, pływanie 60 ft",
      { STR: 19, DEX: 10, CON: 13, INT: 3, WIS: 12, CHA: 7 }, { skills_pl: "Percepcja +3", senses_pl: "Ślepowidzenie 120 ft, Pasywna Percepcja 13" },
      [{ name_pl: "Echolokacja i Wstrzymanie Oddechu (30 min)", desc_pl: "Ślepowidzenie 120 ft oraz ułatwienie w Percepcji słuchowej." }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 6, dmg_dice: "5d6+4", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 21 (5k6+4) obrażeń kłutych." }]),

    m("elephant", "Słoń (Elephant — Wild Shape Poz. 12 / Polimorfia)", "Elephant", "🐘", "Bestia", "Beast", "Huge (Ogromny)", "Bez charakteru", "4", 4, 1100, 12, "naturalny pancerz", 76, "8d12+24", "40 ft",
      { STR: 22, DEX: 9, CON: 17, INT: 3, WIS: 11, CHA: 6 }, { senses_pl: "Pasywna Percepcja 10" },
      [{ name_pl: "Stratowanie w Szarży (ST 16 SIŁ)", desc_pl: "Po ruchu o 20 ft i trafieniu kłami powala cel i tratuje go w akcji dodatkowej." }],
      [{ name_pl: "Kły (Gore)", atk_bonus: 8, dmg_dice: "3d8+6", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +8 do trafienia. Trafienie: 19 (3k8+6) kłutych." },
       { name_pl: "Stratowanie (Stomp)", atk_bonus: 8, dmg_dice: "3d10+6", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz w powalony cel: +8 do trafienia. Trafienie: 22 (3k10+6) obuchowych." }]),

    // ======================== DODATKOWE HUMANOIDY I NPC ========================
    m("bandit", "Bandyta (Bandit)", "Bandit", "🗡️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny niepraworządny", "1/8", 0.125, 25, 12, "skórzana zbroja", 11, "2d8+2", "30 ft",
      { STR: 11, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 }, { languages_pl: "Dowolny język" }, [],
      [{ name_pl: "Bułat (Scimitar)", atk_bonus: 3, dmg_dice: "1d6+1", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +3 do trafienia. Trafienie: 4 (1k6+1) ciętych." },
       { name_pl: "Lekka Kusza (Light Crossbow)", atk_bonus: 3, dmg_dice: "1d8+1", dmg_type_pl: "kłute", desc_pl: "Atak dystansowy (80/320 ft): +3 do trafienia. Trafienie: 5 (1k8+1) kłutych." }]),

    m("guard", "Strażnik (Guard)", "Guard", "🛡️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny", "1/8", 0.125, 25, 16, "koszulka kolcza, tarcza", 11, "2d8+2", "30 ft",
      { STR: 13, DEX: 12, CON: 12, INT: 10, WIS: 11, CHA: 10 }, { skills_pl: "Percepcja +2", senses_pl: "Pasywna Percepcja 12", languages_pl: "Wspólny" }, [],
      [{ name_pl: "Włócznia (Spear)", atk_bonus: 3, dmg_dice: "1d6+1", dmg_type_pl: "kłute", desc_pl: "Atak wręcz lub dystansowy (20/60 ft): +3 do trafienia. Trafienie: 4 (1k6+1) kłutych." }]),

    m("cultist", "Kultysta (Cultist)", "Cultist", "🕯️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny niedobry", "1/8", 0.125, 25, 12, "skórzana zbroja", 9, "2d8", "30 ft",
      { STR: 11, DEX: 12, CON: 10, INT: 10, WIS: 11, CHA: 10 }, { skills_pl: "Oszustwo +2, Religia +2", languages_pl: "Wspólny" },
      [{ name_pl: "Mroczne Oddanie (Dark Devotion)", desc_pl: "Kultysta ma ułatwienie w rzutach obronnych przeciwko Zauroczeniu i Przerażeniu." }],
      [{ name_pl: "Bułat (Scimitar)", atk_bonus: 3, dmg_dice: "1d6+1", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +3 do trafienia. Trafienie: 4 (1k6+1) ciętych." }]),

    m("thug", "Zbir (Thug)", "Thug", "🪓", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny niedobry", "1/2", 0.5, 100, 11, "skórzana zbroja", 32, "5d8+10", "30 ft",
      { STR: 15, DEX: 11, CON: 14, INT: 10, WIS: 10, CHA: 11 }, { skills_pl: "Zastraszanie +2", languages_pl: "Wspólny" },
      [{ name_pl: "Taktyka Stada (Pack Tactics)", desc_pl: "Ułatwienie w rzutach ataku, gdy sojusznik stoi w odległości 5 ft od celu." }],
      [{ name_pl: "Wielokrotny Atak (2 Maczugi)", desc_pl: "Zbir wykonuje dwa ataki wręcz." },
       { name_pl: "Maczuga (Mace)", atk_bonus: 4, dmg_dice: "1d6+2", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 5 (1k6+2) obuchowych." }]),

    m("scout", "Zwiadowca (Scout)", "Scout", "🏹", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny", "1/2", 0.5, 100, 13, "skórzana zbroja", 16, "3d8+3", "30 ft",
      { STR: 11, DEX: 14, CON: 12, INT: 11, WIS: 13, CHA: 11 }, { skills_pl: "Percepcja +5, Przyroda +4, Skradanie się +6, Sztuka Przetrwania +5", senses_pl: "Pasywna Percepcja 15", languages_pl: "Wspólny" }, [],
      [{ name_pl: "Wielokrotny Atak (2 Strzały z Łuku!)", desc_pl: "Zwiadowca wykonuje dwa ataki wręcz lub dwa ataki dystansowe długim łukiem." },
       { name_pl: "Długi Łuk (Longbow)", atk_bonus: 4, dmg_dice: "1d8+2", dmg_type_pl: "kłute", desc_pl: "Atak dystansowy (150/600 ft): +4 do trafienia. Trafienie: 6 (1k8+2) kłutych." }]),

    m("bandit-captain", "Kapitan Bandytów (Bandit Captain)", "Bandit Captain", "🏴‍☠️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny niepraworządny", "2", 2, 450, 15, "ćwiekowana skóra", 65, "10d8+20", "30 ft",
      { STR: 15, DEX: 16, CON: 14, INT: 14, WIS: 11, CHA: 14 }, { saves_pl: "SIŁ +4, ZRĘ +5, MĄD +2", skills_pl: "Atletyka +4, Oszustwo +4", languages_pl: "Dwa języki" },
      [{ name_pl: "Parowanie (Reakcja: +2 do KP)", desc_pl: "Dodaje +2 do KP przeciwko jednemu atakowi wręcz." }],
      [{ name_pl: "Wielokrotny Atak (3 Ataki: 2 Bułatem i 1 Sztyletem)", desc_pl: "Kapitan wykonuje trzy ataki wręcz." },
       { name_pl: "Bułat (Scimitar)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) ciętych." },
       { name_pl: "Sztylet (Dagger)", atk_bonus: 5, dmg_dice: "1d4+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz lub rzut (20/60 ft): +5 do trafienia. Trafienie: 5 (1k4+3) kłutych." }]),

    m("berserker", "Berserker", "Berserker", "🪓", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny chaotyczny", "2", 2, 450, 13, "zbroja ze skór", 67, "9d8+27", "30 ft",
      { STR: 16, DEX: 12, CON: 17, INT: 9, WIS: 11, CHA: 9 }, { languages_pl: "Dowolny język" },
      [{ name_pl: "Brawurowy Atak (Reckless)", desc_pl: "Na początku tury może zyskać ułatwienie we wszystkich atakach wręcz, ale ataki przeciwko niemu też mają ułatwienie." }],
      [{ name_pl: "Wielki Topór (Greataxe)", atk_bonus: 5, dmg_dice: "1d12+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 9 (1k12+3) obrażeń ciętych." }]),

    m("cult-fanatic", "Fanatyk Kultu (Cult Fanatic)", "Cult Fanatic", "🕯️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny niedobry", "2", 2, 450, 13, "skórzana zbroja", 33, "6d8+6", "30 ft",
      { STR: 11, DEX: 14, CON: 12, INT: 10, WIS: 13, CHA: 14 }, { skills_pl: "Oszustwo +4, Perswazja +4, Religia +2", languages_pl: "Wspólny" },
      [{ name_pl: "Mroczne Oddanie i Rzucanie Zaklęć (4. poz. Kleryka, ST 11, +3 do ataku)", desc_pl: "Zaklęcia: Rozkaz, Zadawanie Ran (3k10), Tarcza Wiary, Unieruchomienie Osoby (Hold Person), Duchowa Broń." }],
      [{ name_pl: "Wielokrotny Atak (2 Sztylety)", desc_pl: "Wykonuje dwa ataki sztyletem." },
       { name_pl: "Zadawanie Ran (Inflict Wounds — 1. krąg)", atk_bonus: 3, dmg_dice: "3d10", dmg_type_pl: "nekrotyczne", desc_pl: "Atak czarem wręcz: +3 do trafienia. Trafienie: 16 (3k10) nekrotycznych." }]),

    m("veteran", "Weteran (Veteran)", "Veteran", "⚔️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny", "3", 3, 700, 17, "zbroja lamelkowa", 58, "9d8+18", "30 ft",
      { STR: 16, DEX: 13, CON: 14, INT: 10, WIS: 11, CHA: 10 }, { skills_pl: "Atletyka +5, Percepcja +2", languages_pl: "Wspólny" }, [],
      [{ name_pl: "Wielokrotny Atak (2 Długie Miecze + 1 Krótki Miecz)", desc_pl: "Weteran wykonuje dwa ataki długim mieczem i jeden krótkim mieczem." },
       { name_pl: "Długi Miecz (Longsword)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 7 (1k8+3) ciętych." },
       { name_pl: "Krótki Miecz (Shortsword)", atk_bonus: 5, dmg_dice: "1d6+3", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 6 (1k6+3) kłutych." }]),

    m("gladiator", "Gladiator", "Gladiator", "🛡️", "Humanoid", "Humanoid", "Medium (Średni)", "Dowolny", "5", 5, 1800, 16, "ćwiekowana skóra, tarcza", 112, "15d8+45", "30 ft",
      { STR: 18, DEX: 15, CON: 16, INT: 10, WIS: 12, CHA: 15 }, { saves_pl: "SIŁ +7, ZRĘ +5, KON +6", skills_pl: "Atletyka +10, Zastraszanie +5", languages_pl: "Wspólny" },
      [{ name_pl: "Brutalny (Podwójne kości broni!) i Parowanie (+3 do KP w reakcji)", desc_pl: "Broń wręcz gladiatora zadaje dodatkową kość obrażeń (2k6+4 włócznią!)." }],
      [{ name_pl: "Wielokrotny Atak (3 Włócznie lub Uderzenie Tarczą)", desc_pl: "Gladiator wykonuje trzy ataki wręcz." },
       { name_pl: "Włócznia (Spear)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "kłute", desc_pl: "Atak wręcz lub rzut: +7 do trafienia. Trafienie: 11 (2k6+4) kłutych." },
       { name_pl: "Uderzenie Tarczą (Shield Bash)", atk_bonus: 7, dmg_dice: "2d4+4", dmg_type_pl: "obuchowe + Powalenie ST 15", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 9 (2k4+4) obuchowych i rzut obronny SIŁ ST 15 albo Powalenie." }]),

    // ======================== DODATKOWI NIEUMARLI ========================
    m("specter", "Widmo (Specter — Przywoływane przez Hexblade'a)", "Specter", "👻", "Nieumarły", "Undead", "Medium (Średni)", "Chaotyczny Zły (CE)", "1", 1, 200, 12, "naturalny", 22, "5d8", "0 ft, lot 50 ft (Hover)",
      { STR: 1, DEX: 14, CON: 11, INT: 10, WIS: 10, CHA: 11 }, { resistances_pl: "kwas, zimno, ogień, błyskawice, grzmot; niemagiczne obuchowe, kłute i cięte", immunities_pl: "nekrotyczne, trucizna", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Niecielesny Ruch", desc_pl: "Przenika przez ściany i stworzenia." }],
      [{ name_pl: "Wyssanie Życia (Life Drain)", atk_bonus: 4, dmg_dice: "3d6", dmg_type_pl: "nekrotyczne", desc_pl: "Atak czarem wręcz: +4 do trafienia. Trafienie: 10 (3k6) nekrotycznych, a cel musi zdać rzut obronny KON ST 10 albo jego maksimum PW spada o otrzymane obrażenia." }]),

    m("ghast", "Ghast (Arcyghul)", "Ghast", "🧟", "Nieumarły", "Undead", "Medium (Średni)", "Chaotyczny Zły (CE)", "2", 2, 450, 13, "naturalny", 36, "8d8", "30 ft",
      { STR: 16, DEX: 17, CON: 10, INT: 11, WIS: 10, CHA: 8 }, { resistances_pl: "nekrotyczne", immunities_pl: "trucizna; Zauroczony, Wyczerpanie, Zatruty", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Smród (Stench — 5 ft, ST 10 KON)", desc_pl: "Każde stworzenie zaczynające turę w odległości 5 ft od ghasta musi zdać rzut obronny KON ST 10 albo jest Zatrute do początku następnej tury." }],
      [{ name_pl: "Pazury (Claws — Paraliż również na Elfy!)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "cięte + Paraliż ST 10", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 10 (2k6+3) ciętych oraz rzut obronny KON ST 10 albo Paraliż na 1 minutę!" }]),

    m("will-o-wisp", "Błędny Ognik (Will-o'-Wisp)", "Will-o'-Wisp", "✨", "Nieumarły", "Undead", "Tiny (Malutki)", "Chaotyczny Zły (CE)", "2", 2, 450, 19, "naturalny", 22, "9d4", "0 ft, lot 50 ft (Hover)",
      { STR: 1, DEX: 28, CON: 10, INT: 13, WIS: 14, CHA: 11 }, { resistances_pl: "kwas, zimno, ogień, nekrotyczne, grzmot; niemagiczne obuchowe, kłute i cięte", immunities_pl: "błyskawice, trucizna", senses_pl: "Widzenie w ciemności 120 ft" },
      [{ name_pl: "Pochłonięcie Życia (Consume Life — Akcja Dodatkowa!)", desc_pl: "W akcji dodatkowej wysysa życie z umierającego (0 PW) stworzenia w promieniu 5 ft: cel musi zdać rzut obronny KON ST 10 albo GINIE na miejscu, a ognik odzyskuje 3k6 PW!" }],
      [{ name_pl: "Porażenie (Shock)", atk_bonus: 4, dmg_dice: "2d8", dmg_type_pl: "błyskawic", desc_pl: "Atak czarem wręcz: +4 do trafienia. Trafienie: 9 (2k8) obrażeń od błyskawic." }]),

    m("mummy", "Mumia (Mummy)", "Mummy", "🤕", "Nieumarły", "Undead", "Medium (Średni)", "Praworządny Zły (LE)", "3", 3, 700, 11, "naturalny pancerz", 58, "9d8+18", "20 ft",
      { STR: 16, DEX: 8, CON: 15, INT: 6, WIS: 10, CHA: 12 }, { saves_pl: "MĄD +2", resistances_pl: "niemagiczne obuchowe, kłute i cięte", immunities_pl: "nekrotyczne, trucizna (Podatność: Ogień ×2!)", senses_pl: "Widzenie w ciemności 60 ft" }, [],
      [{ name_pl: "Wielokrotny Atak (Przerażające Spojrzenie + Gnijąca Pięść)", desc_pl: "Używa Przerażającego Spojrzenia (ST 11 MĄD albo Przerażony/Sparaliżowany!) oraz uderza pięścią." },
       { name_pl: "Gnijąca Pięść (Rotting Fist)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "obuchowe + 3k6 nekrotycznych + Klątwa Mumii!", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 10 (2k6+3) obuchowych + 10 (3k6) nekrotycznych oraz rzut obronny KON ST 12 albo Klątwa Zgnilizny Mumii (brak możliwości leczenia!)." }]),

    m("vampire-spawn", "Pomiot Wampira (Vampire Spawn)", "Vampire Spawn", "🧛", "Nieumarły", "Undead", "Medium (Średni)", "Neutralny Zły (NE)", "5", 5, 1800, 15, "naturalny pancerz", 82, "11d8+33", "30 ft",
      { STR: 16, DEX: 16, CON: 16, INT: 11, WIS: 10, CHA: 12 }, { saves_pl: "ZRĘ +6, MĄD +3", skills_pl: "Percepcja +3, Skradanie się +6", resistances_pl: "nekrotyczne; niemagiczne obuchowe, kłute i cięte", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Regeneracja (10 PW co turę) i Pajęcza Wspinaczka", desc_pl: "Odzyskuje 10 PW na początku tury (wyłączana przez światłość i światło słoneczne)." }],
      [{ name_pl: "Wielokrotny Atak (2 Ataki)", desc_pl: "Wykonuje dwa ataki, z czego najwyżej jedno ugryzienie." },
       { name_pl: "Pazury (Claws)", atk_bonus: 6, dmg_dice: "2d4+3", dmg_type_pl: "cięte (lub Pochwycenie ST 13)", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 8 (2k4+3) ciętych albo Pochwycenie." },
       { name_pl: "Ugryzienie (Bite)", atk_bonus: 6, dmg_dice: "1d6+3", dmg_type_pl: "kłute + 2k6 nekrotycznych", desc_pl: "Atak wręcz w pochwycony cel: 6 (1k6+3) kłutych + 7 (2k6) nekrotycznych (leczy wampira)." }]),

    m("wraith", "Upiór (Wraith)", "Wraith", "👻", "Nieumarły", "Undead", "Medium (Średni)", "Neutralny Zły (NE)", "5", 5, 1800, 13, "naturalny", 67, "9d8+27", "0 ft, lot 60 ft (Hover)",
      { STR: 6, DEX: 16, CON: 16, INT: 12, WIS: 14, CHA: 15 }, { resistances_pl: "kwas, zimno, ogień, błyskawice, grzmot; niemagiczne i nieposrebrzane obuchowe, kłute i cięte", immunities_pl: "nekrotyczne, trucizna", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Niecielesny Ruch i Stworzenie Widma", desc_pl: "Przenika ściany, a z zabitego humanoida tworzy posłuszne Widmo (Specter)." }],
      [{ name_pl: "Wyssanie Życia (Life Drain)", atk_bonus: 6, dmg_dice: "4d8+3", dmg_type_pl: "nekrotyczne", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 21 (4k8+3) nekrotycznych i rzut obronny KON ST 14 albo spadek maksimum PW o otrzymane obrażenia!" }]),

    m("death-knight", "Rycerz Śmierci (Death Knight)", "Death Knight", "💀", "Nieumarły", "Undead", "Medium (Średni)", "Chaotyczny Zły (CE)", "17", 17, 18000, 20, "zbroja płytowa, tarcza", 180, "19d8+95", "30 ft",
      { STR: 20, DEX: 11, CON: 20, INT: 12, WIS: 16, CHA: 18 }, { saves_pl: "ZRĘ +6, MĄD +9, CHA +10", immunities_pl: "nekrotyczne, trucizna; Wyczerpanie, Przerażony, Zatruty", senses_pl: "Widzenie w ciemności 120 ft", languages_pl: "Otchłanny, Wspólny" },
      [{ name_pl: "Odporność na Magię, Parowanie (+6 do KP!) i Rzucanie Zaklęć Paladyna (ST 18)", desc_pl: "Ułatwienie przeciwko zaklęciom dla siebie i nieumarłych wokół. Zaklęcia: Rozkaz, Unieruchomienie Osoby, Rozproszenie Magii, Wygnanie, Niszczycielska Fala (Destructive Wave)." }],
      [{ name_pl: "Wielokrotny Atak (3 Ciosy Długim Mieczem)", desc_pl: "Wykonuje trzy ataki długim mieczem." },
       { name_pl: "Przeklęty Długi Miecz (Longsword)", atk_bonus: 11, dmg_dice: "1d8+5", dmg_type_pl: "cięte + 4k8 nekrotycznych", desc_pl: "Atak wręcz: +11 do trafienia. Trafienie: 9 (1k8+5) ciętych + 18 (4k8) nekrotycznych (łącznie śr. 27 z każdego z 3 ciosów!)." },
       { name_pl: "Kula Piekielnego Ognia (Hellfire Orb — 1/dzień)", dmg_dice: "10d6+10d6", dmg_type_pl: "10k6 ognia + 10k6 nekrotycznych!", desc_pl: "Wybuch o promieniu 20 ft (zasięg 120 ft): rzut obronny ZRĘ ST 18 albo 35 (10k6) obrażeń od ognia ORAZ 35 (10k6) obrażeń nekrotycznych (łącznie 20k6, połowa przy sukcesie)!" }]),

    // ======================== DODATKOWE SMOKI, CZARTY, ABERRACJE I MONSTRUALNOŚCI ========================
    m("pseudodragon", "Pseudosmok (Chowaniec Paktu Łańcucha)", "Pseudodragon", "🐉", "Smok", "Dragon", "Tiny (Malutki)", "Neutralny Dobry (NG)", "1/4", 0.25, 50, 13, "naturalny pancerz", 7, "2d4+2", "15 ft, lot 60 ft",
      { STR: 6, DEX: 15, CON: 13, INT: 10, WIS: 12, CHA: 10 }, { skills_pl: "Percepcja +3, Skradanie się +4", senses_pl: "Ślepowidzenie 10 ft, Widzenie w ciemności 60 ft" },
      [{ name_pl: "Odporność na Magię i Wyostrzone Zmysły", desc_pl: "Ułatwienie w rzutach obronnych przeciwko zaklęciom oraz w Percepcji." }],
      [{ name_pl: "Żądło (Sting — Usypiająca Trucizna!)", atk_bonus: 4, dmg_dice: "1d4+2", dmg_type_pl: "kłute + Zatruty/Nieprzytomny", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 4 (1k4+2) kłutych oraz rzut obronny KON ST 11 albo stan Zatruty na 1h (przy porażce o 5+ cel traci przytomność!)." }]),

    m("young-white-dragon", "Młody Biały Smok (Young White Dragon)", "Young White Dragon", "🐉", "Smok", "Dragon", "Large (Duży)", "Chaotyczny Zły (CE)", "6", 6, 2300, 17, "naturalny pancerz", 133, "14d10+56", "40 ft, kopanie 20 ft, lot 80 ft, pływanie 40 ft",
      { STR: 18, DEX: 10, CON: 18, INT: 6, WIS: 11, CHA: 12 }, { saves_pl: "ZRĘ +3, KON +7, MĄD +3, CHA +4", skills_pl: "Percepcja +6, Skradanie się +3", immunities_pl: "zimno", senses_pl: "Ślepowidzenie 30 ft, Widzenie w ciemności 120 ft" },
      [{ name_pl: "Chód po Lodzie (Ice Walk)", desc_pl: "Porusza się po lodzie i śniegu bez kar i bez testów." }],
      [{ name_pl: "Wielokrotny Atak (Ugryzienie i 2 Pazury)", desc_pl: "Wykonuje trzy ataki wręcz." },
       { name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "2d10+4", dmg_type_pl: "kłute + 1k8 zimna", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 15 (2k10+4) kłutych + 4 (1k8) zimna." },
       { name_pl: "Mroźny Oddech (Cold Breath — Odnowienie 5–6)", dmg_dice: "10d8", dmg_type_pl: "zimna", desc_pl: "Stożek 30 ft: rzut obronny KON ST 15 albo 45 (10k8) obrażeń od zimna." }]),

    m("adult-blue-dragon", "Dorosły Niebieski Smok (Adult Blue Dragon)", "Adult Blue Dragon", "🐉", "Smok", "Dragon", "Huge (Ogromny)", "Praworządny Zły (LE)", "16", 16, 15000, 19, "naturalny pancerz", 225, "18d12+108", "40 ft, kopanie 30 ft, lot 80 ft",
      { STR: 25, DEX: 10, CON: 23, INT: 16, WIS: 15, CHA: 19 }, { saves_pl: "ZRĘ +5, KON +11, MĄD +7, CHA +9", skills_pl: "Percepcja +12, Skradanie się +5", immunities_pl: "błyskawice", senses_pl: "Ślepowidzenie 60 ft, Widzenie w ciemności 120 ft" },
      [{ name_pl: "Legendarna Odporność (3/dzień)", desc_pl: "3 automatyczne sukcesy w rzutach obronnych dziennie." }],
      [{ name_pl: "Wielokrotny Atak (Przerażająca Obecność ST 17 + Ugryzienie i 2 Pazury)", desc_pl: "Wykonuje 3 ataki wręcz." },
       { name_pl: "Ugryzienie (Bite)", atk_bonus: 12, dmg_dice: "2d10+7", dmg_type_pl: "kłute + 1k10 błyskawic", desc_pl: "Atak wręcz: +12 do trafienia. Trafienie: 18 (2k10+7) kłutych + 5 (1k10) błyskawic." },
       { name_pl: "Oddech Błyskawic (Lightning Breath — Odnowienie 5–6)", dmg_dice: "12d10", dmg_type_pl: "błyskawic", desc_pl: "Linia 90×5 ft: rzut obronny ZRĘ ST 19 albo 66 (12k10) obrażeń od błyskawic." }],
      [{ name_pl: "Wykrycie / Atak Ogonem / Atak Skrzydłami (2 akcje)", desc_pl: "3 akcje legendarne na rundę." }]),

    m("quasit", "Quasit (Chowaniec Demona Paktu Łańcucha)", "Quasit", "😈", "Czart", "Fiend", "Tiny (Malutki)", "Chaotyczny Zły (CE)", "1", 1, 200, 13, "naturalny", 7, "3d4", "40 ft",
      { STR: 5, DEX: 17, CON: 10, INT: 7, WIS: 10, CHA: 10 }, { skills_pl: "Skradanie się +5", resistances_pl: "zimno, ogień, błyskawice; niemagiczne obuchowe, kłute i cięte", immunities_pl: "trucizna", senses_pl: "Widzenie w ciemności 120 ft" },
      [{ name_pl: "Odporność na Magię i Niewidzialność", desc_pl: "Ułatwienie w rzutach obronnych przeciwko zaklęciom, zmiana w nietoperza/stonogę/ropuchę oraz Niewidzialność na zawołanie." }],
      [{ name_pl: "Pazury (Claws)", atk_bonus: 4, dmg_dice: "1d4+3", dmg_type_pl: "kłute + 2k4 trucizny i Zatruty", desc_pl: "Atak wręcz: +4 do trafienia. Trafienie: 5 (1k4+3) kłutych oraz rzut obronny KON ST 10 na 5 (2k4) trucizny i stan Zatruty." }]),

    m("chain-devil", "Łańcuchowy Diabeł (Chain Devil / Kyton)", "Chain Devil", "⛓️", "Czart", "Fiend", "Medium (Średni)", "Praworządny Zły (LE)", "8", 8, 3900, 16, "naturalny pancerz", 85, "10d8+40", "30 ft",
      { STR: 18, DEX: 15, CON: 18, INT: 11, WIS: 12, CHA: 14 }, { saves_pl: "KON +7, MĄD +4, CHA +5", resistances_pl: "zimno; niemagiczne i nieposrebrzane obuchowe, kłute i cięte", immunities_pl: "ogień, trucizna", senses_pl: "Diabelski Wzrok 120 ft" },
      [{ name_pl: "Diabelski Wzrok, Odporność na Magię i Ożywienie Łańcuchów", desc_pl: "Ożywia do 4 łańcuchów na polu walki, wykonując nimi dodatkowe ataki!" }],
      [{ name_pl: "Wielokrotny Atak (2–6 Łańcuchów!)", desc_pl: "Wykonuje dwa ataki swoimi łańcuchami oraz po jednym ataku każdym ożywionym łańcuchem." },
       { name_pl: "Łańcuch (Chain)", atk_bonus: 8, dmg_dice: "2d6+4", dmg_type_pl: "cięte + Unieruchomienie i +2k6 co turę", desc_pl: "Atak wręcz: +8 do trafienia, zasięg 10 ft. Trafienie: 11 (2k6+4) ciętych oraz automatyczne Pochwycenie (ST 14) i Unieruchomienie (2k6 kłutych na początku każdej tury celu!)." }]),

    m("marilith", "Marilith (Sześcioręki Generał Demonów)", "Marilith", "🐍", "Czart", "Fiend", "Large (Duży)", "Chaotyczny Zły (CE)", "16", 16, 15000, 18, "naturalny pancerz", 189, "18d10+90", "40 ft",
      { STR: 18, DEX: 20, CON: 20, INT: 18, WIS: 16, CHA: 20 }, { saves_pl: "SIŁ +9, KON +10, MĄD +8, CHA +10", resistances_pl: "zimno, ogień, błyskawice; niemagiczne obuchowe, kłute i cięte", immunities_pl: "trucizna", senses_pl: "Prawdziwe Widzenie 120 ft" },
      [{ name_pl: "Reaktywna (Reakcja w KAŻDEJ turze walki!) i Parowanie (+5 do KP)", desc_pl: "Marilith może wykonać jedną reakcję w każdej turze dowolnego stworzenia w walce (dodając +5 do KP lub wykonując ataki okazyjne)!" }],
      [{ name_pl: "Wielokrotny Atak (7 Ataków: 6 Mieczy + 1 Ogon!)", desc_pl: "Marilith wykonuje aż siedem ataków w każdej swojej turze!" },
       { name_pl: "Długi Miecz (Longsword ×6)", atk_bonus: 9, dmg_dice: "2d8+4", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +9 do trafienia. Trafienie: 13 (2k8+4) ciętych." },
       { name_pl: "Ogon (Tail)", atk_bonus: 9, dmg_dice: "2d10+4", dmg_type_pl: "obuchowe + Unieruchomienie!", desc_pl: "Atak wręcz: +9 do trafienia, zasięg 10 ft. Trafienie: 15 (2k10+4) obuchowych, cel jest automatycznie Pochwycony (ST 19) i Unieruchomiony (przez co wszystkie 6 ataków mieczem ma przeciw niemu UŁATWIENIE!)." }]),

    m("intellect-devourer", "Pożeracz Intelektu (Intellect Devourer)", "Intellect Devourer", "🧠", "Aberracja", "Aberration", "Tiny (Malutki)", "Praworządny Zły (LE)", "2", 2, 450, 12, "naturalny", 21, "6d4+6", "40 ft",
      { STR: 6, DEX: 14, CON: 13, INT: 12, WIS: 11, CHA: 10 }, { skills_pl: "Percepcja +2, Skradanie się +4", resistances_pl: "niemagiczne obuchowe, kłute i cięte", senses_pl: "Ślepowidzenie 60 ft" },
      [{ name_pl: "Wykrywanie Świadomości (300 ft)", desc_pl: "Wyczuwa obecność każdego stworzenia o Inteligencji 3 lub wyższej w promieniu 300 ft." }],
      [{ name_pl: "Pożarcie Intelektu (Devour Intellect)", dmg_dice: "2d10", dmg_type_pl: "psychiczne + Wyzerowanie INT!", desc_pl: "Cel w zasięgu 10 ft wykonuje rzut obronny INT ST 12: przy porażce otrzymuje 11 (2k10) obrażeń psychicznych, a pożeracz rzuca 3k6 — jeśli wynik jest równy lub wyższy niż Inteligencja celu, jego INT spada do 0 i zostaje Ogłuszony (a w następnej turze pożeracz przejmuje jego ciało!)!" }]),

    m("gibbering-mouther", "Bełkoczący Paszczak (Gibbering Mouther)", "Gibbering Mouther", "👁️", "Aberracja", "Aberration", "Medium (Średni)", "Neutralny (N)", "2", 2, 450, 9, "brak", 67, "9d8+27", "10 ft, pływanie 10 ft",
      { STR: 10, DEX: 8, CON: 16, INT: 3, WIS: 10, CHA: 6 }, { immunities_pl: "stan Powalony", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Bełkot (Gibbering — 20 ft, ST 10 MĄD) i Aberracyjny Grunt", desc_pl: "Ziemia w promieniu 10 ft jest trudnym terenem (ST 10 SIŁ albo Powalenie), a stworzenia w promieniu 20 ft zdają rzut obronny MĄD ST 10 albo tracą reakcje i działają losowo." }],
      [{ name_pl: "Ugryzienia (Bites)", atk_bonus: 2, dmg_dice: "5d6", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +2 do trafienia. Trafienie: 17 (5k6) obrażeń kłutych." }]),

    m("pixie", "Wróżka (Pixie — Conjure Woodland Beings!)", "Pixie", "🧚", "Fey", "Fey", "Tiny (Malutki)", "Neutralny Dobry (NG)", "1/4", 0.25, 50, 15, "naturalny", 1, "1d4-1", "10 ft, lot 30 ft",
      { STR: 2, DEX: 20, CON: 8, INT: 10, WIS: 14, CHA: 15 }, { skills_pl: "Percepcja +4, Skradanie się +7" },
      [{ name_pl: "Wyższa Niewidzialność, Odporność na Magię i Wrodzone Czarostwo (ST 12)", desc_pl: "Może być stale Niewidzialna nawet podczas rzucania zaklęć! Raz dziennie rzuca: Polimorfię (Polymorph!), Lot (Fly), Zamęt (Confusion), Oplątanie, Rozproszenie Magii, Sen oraz Wykrycie Myśli!" }],
      [{ name_pl: "Polimorfia / Lot (1/dzień)", desc_pl: "Wróżka zmienia sojusznika w Wielką Małpę lub T-Rexa albo daje mu lot." }]),

    m("green-hag", "Zielona Wiedźma (Green Hag)", "Green Hag", "🧙‍♀️", "Fey", "Fey", "Medium (Średni)", "Neutralny Zły (NE)", "3", 3, 700, 17, "naturalny pancerz", 82, "11d8+33", "30 ft",
      { STR: 18, DEX: 12, CON: 16, INT: 13, WIS: 14, CHA: 14 }, { skills_pl: "Oszustwo +4, Percepcja +4, Skradanie się +3, Wiedza Tajemna +3", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Niewidzialne Przejście i Iluzoryczny Wygląd", desc_pl: "W akcji staje się Niewidzialna, nie zostawiając żadnych śladów." }],
      [{ name_pl: "Pazury (Claws)", atk_bonus: 6, dmg_dice: "2d8+4", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 13 (2k8+4) obrażeń ciętych." }]),

    m("basilisk", "Bazyliszek (Basilisk)", "Basilisk", "🦎", "Monstrualność", "Monstrosity", "Medium (Średni)", "Bez charakteru", "3", 3, 700, 15, "naturalny pancerz", 52, "8d8+16", "20 ft",
      { STR: 16, DEX: 8, CON: 15, INT: 2, WIS: 8, CHA: 7 }, { senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Petryfikujące Spojrzenie (Petrifying Gaze — ST 12 KON)", desc_pl: "Każdy, kto spojrzy w oczy bazyliszka w promieniu 30 ft, musi zdać dwa rzuty obronne KON ST 12 albo zamienia się w kamień (Petrified)!" }],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 5, dmg_dice: "2d6+3", dmg_type_pl: "kłute + 2k6 trucizny", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 10 (2k6+3) kłutych + 7 (2k6) trucizny." }]),

    m("minotaur", "Minotaur", "Minotaur", "🐂", "Monstrualność", "Monstrosity", "Large (Duży)", "Chaotyczny Zły (CE)", "3", 3, 700, 14, "naturalny pancerz", 76, "9d10+27", "40 ft",
      { STR: 18, DEX: 11, CON: 16, INT: 6, WIS: 16, CHA: 9 }, { skills_pl: "Percepcja +7", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Szarża (+2k8 i Odepchnięcie), Brawurowy i Pamięć Labiryntu", desc_pl: "Po ruchu o 10 ft atak rogami zadaje +2k8 obrażeń i odpycha o 10 ft z powaleniem (ST 14 SIŁ)." }],
      [{ name_pl: "Wielki Topór (Greataxe)", atk_bonus: 6, dmg_dice: "2d12+4", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 17 (2k12+4) ciętych." },
       { name_pl: "Rogi (Gore)", atk_bonus: 6, dmg_dice: "2d8+4", dmg_type_pl: "kłute (+2k8 w szarży)", desc_pl: "Atak wręcz: +6 do trafienia. Trafienie: 13 (2k8+4) kłutych." }]),

    m("manticore", "Mantykora (Manticore)", "Manticore", "🦁", "Monstrualność", "Monstrosity", "Large (Duży)", "Praworządny Zły (LE)", "3", 3, 700, 14, "naturalny pancerz", 68, "8d10+24", "30 ft, lot 50 ft",
      { STR: 17, DEX: 16, CON: 17, CON: 17, INT: 7, WIS: 12, CHA: 8 }, { senses_pl: "Widzenie w ciemności 60 ft" }, [],
      [{ name_pl: "Wielokrotny Atak (3 Kolce z Ogona lub Ugryzienie i 2 Pazury)", desc_pl: "Wykonuje trzy ataki w turze." },
       { name_pl: "Kolec z Ogona (Tail Spike ×3)", atk_bonus: 5, dmg_dice: "1d8+3", dmg_type_pl: "kłute", desc_pl: "Atak dystansowy (100/200 ft): +5 do trafienia. Trafienie: 7 (1k8+3) kłutych." }]),

    m("bulette", "Bulette (Lądowy Rekin)", "Bulette", "🦈", "Monstrualność", "Monstrosity", "Large (Duży)", "Bez charakteru", "5", 5, 1800, 17, "naturalny pancerz", 94, "9d10+45", "40 ft, kopanie 40 ft",
      { STR: 19, DEX: 11, CON: 21, INT: 2, WIS: 10, CHA: 5 }, { skills_pl: "Percepcja +6", senses_pl: "Widzenie w ciemności 60 ft, Wyczucie Drgań 60 ft" }, [],
      [{ name_pl: "Ugryzienie (Bite)", atk_bonus: 7, dmg_dice: "4d12+4", dmg_type_pl: "kłute", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 30 (4k12+4) obrażeń kłutych!" },
       { name_pl: "Śmiertelny Skok (Deadly Leap)", dmg_dice: "3d6+4+3d6+4", dmg_type_pl: "obuchowe i cięte", desc_pl: "Skok na 15 ft w przestrzeń do 4 stworzeń: rzut obronny SIŁ lub ZRĘ ST 16 albo 14 (3k6+4) obuchowych + 14 (3k6+4) ciętych i stan Powalony!" }]),

    m("medusa", "Meduza (Medusa)", "Medusa", "🐍", "Monstrualność", "Monstrosity", "Medium (Średni)", "Praworządny Zły (LE)", "6", 6, 2300, 15, "naturalny pancerz", 127, "17d8+51", "30 ft",
      { STR: 10, DEX: 15, CON: 16, INT: 12, WIS: 13, CHA: 15 }, { skills_pl: "Oszustwo +5, Wnikliwość +4, Percepcja +4, Skradanie się +5", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Petryfikujące Spojrzenie (ST 14 KON — przy porażce o 5+ natychmiastowa zamiana w kamień!)", desc_pl: "Każdy patrzący na meduzę w promieniu 30 ft zdaje rzut obronny KON ST 14 albo zamienia się w kamień." }],
      [{ name_pl: "Wielokrotny Atak (Wężowe Włosy + 2 Mieczem lub 2 Łukiem)", desc_pl: "Wykonuje trzy ataki w turze." },
       { name_pl: "Wężowe Włosy (Snake Hair)", atk_bonus: 5, dmg_dice: "1d4+2", dmg_type_pl: "kłute + 4k6 trucizny", desc_pl: "Atak wręcz: +5 do trafienia. Trafienie: 4 (1k4+2) kłutych + 14 (4k6) trucizny." }]),

    m("chimera", "Chimera", "Chimera", "🦁", "Monstrualność", "Monstrosity", "Large (Duży)", "Chaotyczny Zły (CE)", "6", 6, 2300, 14, "naturalny pancerz", 114, "12d10+48", "30 ft, lot 60 ft",
      { STR: 19, DEX: 11, CON: 19, INT: 3, WIS: 14, CHA: 10 }, { skills_pl: "Percepcja +8", senses_pl: "Widzenie w ciemności 60 ft" }, [],
      [{ name_pl: "Wielokrotny Atak (Ugryzienie, Rogi i Pazury lub Ognisty Oddech)", desc_pl: "Wykonuje trzy ataki wręcz." },
       { name_pl: "Ognisty Oddech (Fire Breath — Odnowienie 5–6)", dmg_dice: "7d8", dmg_type_pl: "ognia", desc_pl: "Stożek 15 ft: rzut obronny ZRĘ ST 15 albo 31 (7k8) obrażeń od ognia." }]),

    m("water-elemental", "Żywiołak Wody (Water Elemental — Wild Shape Poz. 10)", "Water Elemental", "🌊", "Żywiołak", "Elemental", "Large (Duży)", "Neutralny (N)", "5", 5, 1800, 14, "naturalny pancerz", 114, "12d10+48", "30 ft, pływanie 90 ft",
      { STR: 18, DEX: 14, CON: 18, INT: 5, WIS: 10, CHA: 8 }, { resistances_pl: "kwas; niemagiczne obuchowe, kłute i cięte", immunities_pl: "trucizna; Wyczerpanie, Pochwycony, Sparaliżowany, Spetryfikowany, Zatruty, Powalony, Unieruchomiony", senses_pl: "Widzenie w ciemności 60 ft" },
      [{ name_pl: "Postać Wody i Zamrożenie", desc_pl: "Przeciska się przez szczeliny 1 cala." }],
      [{ name_pl: "Wielokrotny Atak (2 Uderzenia)", desc_pl: "Wykonuje dwa ataki uderzeniem." },
       { name_pl: "Uderzenie (Slam)", atk_bonus: 7, dmg_dice: "2d8+4", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 13 (2k8+4) obuchowych." },
       { name_pl: "Wir Wodny (Whelm — Odnowienie 4–6)", dmg_dice: "2d8+4", dmg_type_pl: "obuchowe + Topienie i Unieruchomienie", desc_pl: "Pochłania do dwóch Średnich stworzeń w swojej przestrzeni (ST 15 SIŁ albo Unieruchomienie, brak oddechu i 2k8+4 obuchowych co turę)." }]),

    m("air-elemental", "Żywiołak Powietrza (Air Elemental — Wild Shape Poz. 10)", "Air Elemental", "🌪️", "Żywiołak", "Elemental", "Large (Duży)", "Neutralny (N)", "5", 5, 1800, 15, "naturalny", 90, "12d10+24", "0 ft, lot 90 ft (Hover)",
      { STR: 14, DEX: 20, CON: 14, INT: 6, WIS: 10, CHA: 6 }, { resistances_pl: "błyskawice, grzmot; niemagiczne obuchowe, kłute i cięte", immunities_pl: "trucizna", senses_pl: "Widzenie w ciemności 60 ft" }, [],
      [{ name_pl: "Wielokrotny Atak (2 Uderzenia)", desc_pl: "Wykonuje dwa ataki uderzeniem." },
       { name_pl: "Uderzenie (Slam)", atk_bonus: 8, dmg_dice: "2d8+5", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +8 do trafienia. Trafienie: 14 (2k8+5) obuchowych." },
       { name_pl: "Trąba Powietrzna (Whirlwind — Odnowienie 4–6)", dmg_dice: "3d8+2", dmg_type_pl: "obuchowe + Odrzucenie 20 ft", desc_pl: "Stworzenia w przestrzeni żywiołaka wykonują rzut obronny SIŁ ST 13 albo otrzymują 15 (3k8+2) obuchowych i są odrzucane na 20 ft z powaleniem." }]),

    m("frost-giant", "Lodowy Gigant (Frost Giant)", "Frost Giant", "❄️", "Gigant", "Giant", "Huge (Ogromny)", "Neutralny Zły (NE)", "8", 8, 3900, 15, "zbroja łatana", 138, "12d12+60", "40 ft",
      { STR: 23, DEX: 9, CON: 21, INT: 9, WIS: 10, CHA: 12 }, { saves_pl: "KON +8, MĄD +3, CHA +4", skills_pl: "Atletyka +9, Percepcja +3", immunities_pl: "zimno" }, [],
      [{ name_pl: "Wielokrotny Atak (2 Ciosy Wielkim Toporem)", desc_pl: "Wykonuje dwa ataki wielkim toporem." },
       { name_pl: "Wielki Topór (Greataxe)", atk_bonus: 9, dmg_dice: "3d12+6", dmg_type_pl: "cięte", desc_pl: "Atak wręcz: +9 do trafienia, zasięg 10 ft. Trafienie: 25 (3k12+6) obrażeń ciętych." },
       { name_pl: "Głaz (Rock)", atk_bonus: 9, dmg_dice: "4d10+6", dmg_type_pl: "obuchowe", desc_pl: "Atak dystansowy (60/240 ft): +9 do trafienia. Trafienie: 28 (4k10+6) obuchowych." }]),

    m("treant", "Drzewiec (Treant)", "Treant", "🌳", "Roślina", "Plant", "Huge (Ogromny)", "Chaotyczny Dobry (CG)", "9", 9, 5000, 16, "naturalny pancerz", 138, "12d12+60", "30 ft",
      { STR: 23, DEX: 8, CON: 21, INT: 12, WIS: 16, CHA: 12 }, { resistances_pl: "obuchowe, kłute (Podatność: Ogień ×2!)", languages_pl: "Wspólny, Druidzki, Elfi, Leśny" },
      [{ name_pl: "Ożywienie Drzew (Animate Trees — 1/dzień)", desc_pl: "Ożywia dwa drzewa w promieniu 60 ft, które walczą jako dodatkowe Drzewce (po 138 PW każde!) przez 1 dzień." }],
      [{ name_pl: "Wielokrotny Atak (2 Uderzenia)", desc_pl: "Wykonuje dwa ataki uderzeniem." },
       { name_pl: "Uderzenie (Slam)", atk_bonus: 10, dmg_dice: "3d6+6", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +10 do trafienia. Trafienie: 16 (3k6+6) obuchowych." },
       { name_pl: "Głaz (Rock)", atk_bonus: 10, dmg_dice: "4d10+6", dmg_type_pl: "obuchowe", desc_pl: "Atak dystansowy (60/180 ft): +10 do trafienia. Trafienie: 28 (4k10+6) obuchowych." }]),

    m("shield-guardian", "Strażnik Tarczy (Shield Guardian)", "Shield Guardian", "🛡️", "Konstrukt", "Construct", "Large (Duży)", "Bez charakteru", "7", 7, 2900, 17, "naturalny pancerz", 142, "15d10+60", "30 ft",
      { STR: 18, DEX: 8, CON: 18, INT: 7, WIS: 10, CHA: 3 }, { immunities_pl: "trucizna; Zauroczony, Wyczerpanie, Przerażony, Sparaliżowany, Zatruty", senses_pl: "Ślepowidzenie 10 ft, Widzenie w ciemności 60 ft" },
      [{ name_pl: "Więź z Amuletem (Połowa Obrażeń Pana idzie w Golema!), Regeneracja (10 PW) i Przechowywanie Zaklęcia (do 4. kręgu)", desc_pl: "Połowę wszystkich obrażeń otrzymywanych przez właściciela amuletu przyjmuje na siebie Strażnik Tarczy, a w reakcji daje swojemu panu +2 do KP!" }],
      [{ name_pl: "Wielokrotny Atak (2 Pięści)", desc_pl: "Wykonuje dwa ataki pięściami." },
       { name_pl: "Pięść (Fist)", atk_bonus: 7, dmg_dice: "2d6+4", dmg_type_pl: "obuchowe", desc_pl: "Atak wręcz: +7 do trafienia. Trafienie: 11 (2k6+4) obuchowych." }]),

    m("planetar", "Planetar (Anielski Generał)", "Planetar", "🪽", "Niebianin", "Celestial", "Large (Duży)", "Praworządny Dobry (LG)", "16", 16, 15000, 19, "naturalny pancerz", 200, "16d10+112", "40 ft, lot 120 ft",
      { STR: 24, DEX: 20, CON: 24, INT: 19, WIS: 22, CHA: 25 }, { saves_pl: "KON +12, MĄD +11, CHA +12", skills_pl: "Percepcja +11", resistances_pl: "światłość; niemagiczne obuchowe, kłute i cięte", immunities_pl: "Zauroczony, Wyczerpanie, Przerażony", senses_pl: "Prawdziwe Widzenie 120 ft" },
      [{ name_pl: "Anielska Broń (+5k8 światłości) i Uzdrawiający Dotyk (4× dziennie 6k8+3 PW)", desc_pl: "Każdy cios mieczem zadaje dodatkowe 22 (5k8) obrażeń od światłości." }],
      [{ name_pl: "Wielokrotny Atak (2 Ciosy Mieczem)", desc_pl: "Wykonuje dwa ataki mieczem dwuręcznym." },
       { name_pl: "Anielski Miecz Dwuręczny (Greatsword)", atk_bonus: 12, dmg_dice: "4d6+7", dmg_type_pl: "cięte + 5k8 światłości", desc_pl: "Atak wręcz: +12 do trafienia. Trafienie: 21 (4k6+7) ciętych + 22 (5k8) światłości." },
       { name_pl: "Uzdrawiający Dotyk (Healing Touch — 4/dzień)", dmg_dice: "6d8+3", dmg_type_pl: "leczenia", desc_pl: "Przywraca dotkniętemu stworzeniu 30 (6k8+3) PW i usuwa klątwy, choroby, ślepotę i trucizny." }])
  ];

  window.DND_MONSTERS = (window.DND_MONSTERS || []).concat(EXTRA_MONSTERS);
})();
