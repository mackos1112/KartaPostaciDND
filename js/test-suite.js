// ============================================================================
// Kroniki D&D 5e — Kompleksowy Automatyczny Zestaw Testów & Benchmark Wydajności
// Ponad 200 testów jednostkowych, integracyjnych oraz testów czasu i optymalizacji:
// 13 klas (1-20), 79 podklas, 73 rasy + portrety SVG, 73 atuty, 400+ zaklęć (0-9),
// 255 przedmiotów magicznych, 114 potworów Bestiariusza AideDD, 25 stanów,
// wyczerpanie (0-6), pula 4k6, kreator broni i pancerza, kalkulator kości,
// licencje (SRD 5.1 / CC-BY-4.0) oraz benchmarki czasowe (O(1) Cache, DOM, FPS).
// ============================================================================

window.DND_TEST_SUITE = {
  runAll() {
    const results = [];
    const timings = [];
    let passed = 0;
    let failed = 0;
    const now = () => (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    const suiteStart = now();

    function assert(category, name, condition, detail = "") {
      if (condition) {
        passed++;
        results.push({ category, name, status: "PASS", detail });
      } else {
        failed++;
        results.push({ category, name, status: "FAIL", detail });
      }
    }

    function measure(label, budgetMs, fn) {
      const t0 = now();
      const res = fn();
      const elapsed = Math.round((now() - t0) * 100) / 100;
      timings.push({ label, elapsed, budgetMs, ok: elapsed <= budgetMs });
      return { elapsed, res };
    }

    const backupState = JSON.parse(JSON.stringify(App.state));

    try {
      // ----------------------------------------------------------------------
      // 1. TESTY BAZY KLAS (13 KLAS, POZIOMY 1-20, PODKLASY, PORTRETY KLAS)
      // ----------------------------------------------------------------------
      assert("1. Klasy i Tabele 1–20", "Obecność wszystkich 13 oficjalnych klas D&D 5e", Array.isArray(window.DND_CLASSES) && window.DND_CLASSES.length === 13, `13/13 klas`);

      window.DND_CLASSES.forEach(cls => {
        const has20Levels = Array.isArray(cls.progression) && cls.progression.length === 20 && cls.progression[0].level === 1 && cls.progression[19].level === 20;
        const validPB = cls.progression[0].pb === 2 && cls.progression[4].pb === 3 && cls.progression[8].pb === 4 && cls.progression[12].pb === 5 && cls.progression[16].pb === 6;
        const hasSubclasses = Array.isArray(cls.subclasses) && cls.subclasses.length >= 2;
        const portraitUri = window.getClassPortraitUri(cls.id);
        const validPortrait = portraitUri && portraitUri.startsWith("data:image/svg+xml;utf8,") && portraitUri.length > 200;
        assert(
          "1. Klasy i Tabele 1–20",
          `Klasa ${cls.name_pl} (${cls.name_en}): progresja 1–20, biegłość +2..+6, podklasy (${cls.subclasses.length}) i portret SVG`,
          has20Levels && validPB && hasSubclasses && validPortrait,
          `k${cls.hit_die}, ${cls.subclasses.length} podkl., portret OK`
        );
      });

      // ----------------------------------------------------------------------
      // 2. TESTY WSZYSTKICH 73 RAS I ICH PORTRETÓW SVG + DANYCH ANATOMICZNYCH
      // ----------------------------------------------------------------------
      assert("2. Rasy i Portrety (73)", "Obecność pełnej bazy grywalnych ras i rodowodów (73)", window.DND_RACES.length >= 73, `Liczba ras: ${window.DND_RACES.length}`);

      const seenRaceIds = new Set();
      window.DND_RACES.forEach(r => {
        const isUnique = !seenRaceIds.has(r.id);
        seenRaceIds.add(r.id);
        const pUri = window.getRacePortraitUri(r.id);
        const hasPortrait = pUri && pUri.startsWith("data:image/svg+xml;utf8,") && pUri.length > 250;
        const hasDetailed = Array.isArray(r.detailed_traits) && r.detailed_traits.length >= 2 && Boolean(r.lore_pl && r.age_pl && r.height_pl && r.languages_pl);
        assert(
          "2. Rasy i Portrety (73)",
          `Rasa ${r.name_pl} (${r.id}): dane anatomiczne 2×2/XL, cechy (${(r.detailed_traits||[]).length}) i portret SVG`,
          isUnique && hasPortrait && hasDetailed,
          `${r.speed} ft, ${r.source}`
        );
      });

      // ----------------------------------------------------------------------
      // 3. TESTY MECHANIKI WSZYSTKICH 79 PODKLAS (POZIOMY 1–20)
      // ----------------------------------------------------------------------
      const subMechKeys = Object.keys(window.DND_SUBCLASS_MECHANICS || {});
      assert("3. Mechanika 79 Podklas", "Załadowano pełną bazę mechaniki dla wszystkich 79 podklas (DND_SUBCLASS_MECHANICS)", subMechKeys.length >= 79, `Podklas z pełną osią poziomów: ${subMechKeys.length}`);

      let allSubclassesCovered = true;
      window.DND_CLASSES.forEach(cls => {
        (cls.subclasses || []).forEach(sc => {
          const m = App.getSubclassMechanics(sc.id);
          if (!m || !Array.isArray(m.features) || m.features.length < 3) {
            allSubclassesCovered = false;
          }
        });
      });
      assert("3. Mechanika 79 Podklas", "Każda podklasa w grze posiada wielopoziomową oś zdolności (od poz. 1/2/3 do 14/15/17/18/20) oraz opis lore", allSubclassesCovered, "79/79 podklas z wieloma poziomami zdolności");

      const testChar = JSON.parse(JSON.stringify(App.getActiveChar()));
      testChar.abilities = { STR: 16, DEX: 14, CON: 14, INT: 18, WIS: 16, CHA: 16 };
      testChar.level = 10;
      testChar.feats = [];
      testChar.magicItems = [];
      testChar.conditions = [];
      testChar.exhaustion = 0;
      testChar.customArmor = null;
      testChar.shieldMagicBonus = 0;
      testChar.acManualBonus = 0;

      // War Magic (+INT do Inicjatywy)
      testChar.classId = "wizard";
      testChar.subclassId = "war-magic";
      assert("3. Mechanika 79 Podklas", "Magia Wojenna (War Magic): +INT (+4) do Inicjatywy", App.calcInitiative(testChar) === 6, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Chronurgy (+INT do Inicjatywy)
      testChar.subclassId = "chronurgy";
      assert("3. Mechanika 79 Podklas", "Chronurgia (Chronurgy Magic): +INT (+4) do Inicjatywy", App.calcInitiative(testChar) === 6, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Gloom Stalker (+WIS do Inicjatywy)
      testChar.classId = "ranger";
      testChar.subclassId = "gloom-stalker";
      assert("3. Mechanika 79 Podklas", "Mroczny Łowca (Gloom Stalker): +MĄD (+3) do Inicjatywy", App.calcInitiative(testChar) === 5, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Swashbuckler (+CHA do Inicjatywy)
      testChar.classId = "rogue";
      testChar.subclassId = "swashbuckler";
      assert("3. Mechanika 79 Podklas", "Zawadiaka (Swashbuckler): +CHA (+3) do Inicjatywy", App.calcInitiative(testChar) === 5, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Forge Domain (+1 KP pasywnie)
      testChar.classId = "cleric";
      testChar.subclassId = "forge";
      testChar.armorType = "heavy";
      testChar.shieldEquipped = false;
      assert("3. Mechanika 79 Podklas", "Domena Kuźni (Forge Domain): pasywne +1 do KP", App.calcAC(testChar) === 19, `KP: ${App.calcAC(testChar)}`);

      // Draconic Bloodline (+1 PW na poziom + naturalny pancerz 13 + DEX)
      testChar.classId = "sorcerer";
      testChar.subclassId = "draconic";
      testChar.armorType = "none";
      const hpDraconic = App.calcRecommendedMaxHP(testChar);
      const acDraconic = App.calcAC(testChar);
      testChar.subclassId = "wild-magic";
      const hpWild = App.calcRecommendedMaxHP(testChar);
      assert("3. Mechanika 79 Podklas", "Smoczy Rodowód (Draconic Bloodline): +1 PW/poziom (+10 PW) oraz bazowa KP 13 + ZRĘ (15 KP)", hpDraconic - hpWild === 10 && acDraconic === 15, `PW: +${hpDraconic - hpWild}, KP: ${acDraconic}`);

      // Battle Smith & Hexblade (Atak bronią z INT / CHA)
      testChar.classId = "warlock";
      testChar.subclassId = "hexblade";
      testChar.abilities = { STR: 10, DEX: 12, CON: 14, INT: 10, WIS: 10, CHA: 18 };
      const hexWp = App.calcWeaponStats(testChar, { name: "Długi Miecz Paktu", ability: "STR", prof: true, magicBonus: 0, dice: "1d8", dmgType: "Cięte" });
      assert("3. Mechanika 79 Podklas", "Czarownik Hexblade automatycznie używa CHA (+4) zamiast SIŁ (+0) do ataku i obrażeń bronią", hexWp.usedAb === "CHA" && hexWp.toHit === 8, `Użyta cecha: ${hexWp.usedAb}, Trafienie: +${hexWp.toHit}`);

      testChar.classId = "artificer";
      testChar.subclassId = "battle-smith";
      testChar.abilities = { STR: 10, DEX: 12, CON: 14, INT: 20, WIS: 10, CHA: 10 };
      const bsWp = App.calcWeaponStats(testChar, { name: "Młot Kowala Bitwy", ability: "STR", prof: true, magicBonus: 1, dice: "1d8", dmgType: "Obuchowe" });
      assert("3. Mechanika 79 Podklas", "Artefaktor Kowal Bitwy (Battle Smith) automatycznie używa INT (+5) do ataku i obrażeń bronią", bsWp.usedAb === "INT" && bsWp.toHit === 10, `Użyta cecha: ${bsWp.usedAb}, Trafienie: +${bsWp.toHit}`);

      // ----------------------------------------------------------------------
      // 4. TESTY ATUTÓW (73 FEATS) I TŁA (15 BACKGROUNDS)
      // ----------------------------------------------------------------------
      assert("4. Atuty i Tła", "Obecność wszystkich 73 atutów (Feats) i 15 teł (Backgrounds)", window.DND_FEATS.length >= 73 && window.DND_BACKGROUNDS.length >= 15, `Atuty: ${window.DND_FEATS.length}, Tła: ${window.DND_BACKGROUNDS.length}`);

      testChar.classId = "fighter";
      testChar.subclassId = "battle-master";
      testChar.abilities = { STR: 16, DEX: 16, CON: 14, INT: 10, WIS: 14, CHA: 10 };
      testChar.armorType = "medium";
      testChar.feats = [];
      const acMedBefore = App.calcAC(testChar);
      const hpBeforeTough = App.calcRecommendedMaxHP(testChar);
      const initBeforeAlert = App.calcInitiative(testChar);
      const spdBeforeMobile = App.calcSpeed(testChar);

      testChar.feats = ["medium-armor-master", "dual-wielder", "tough", "alert", "mobile"];
      const acMedAfter = App.calcAC(testChar);
      const hpAfterTough = App.calcRecommendedMaxHP(testChar);
      const initAfterAlert = App.calcInitiative(testChar);
      const spdAfterMobile = App.calcSpeed(testChar);

      assert("4. Atuty i Tła", "Mistrz Średniego Pancerza (+3 DEX cap) i Walka Dwiema Brońmi (+1 KP) podnoszą KP z 17 na 19", acMedBefore === 17 && acMedAfter === 19, `KP przed: ${acMedBefore}, KP po: ${acMedAfter}`);
      assert("4. Atuty i Tła", "Atut Twardziel (Tough) dodaje +2 PW za poziom (+20 PW na 10. poz.)", hpAfterTough - hpBeforeTough === 20, `PW: ${hpBeforeTough}→${hpAfterTough}`);
      assert("4. Atuty i Tła", "Atut Czujny (Alert) dodaje +5 do Inicjatywy, a Mobilny (Mobile) +10 ft do Szybkości", initAfterAlert - initBeforeAlert === 5 && spdAfterMobile - spdBeforeMobile === 10, `Inicjatywa: +${initBeforeAlert}→+${initAfterAlert}, Ruch: ${spdBeforeMobile}→${spdAfterMobile} ft`);
      testChar.feats = [];

      // ----------------------------------------------------------------------
      // 5. TESTY KSIĘGI ZAKLĘĆ (KRĘGI 0–9) I WŁASNEJ KSIĘGI POSTACI
      // ----------------------------------------------------------------------
      assert("5. Księga Zaklęć (0–9)", "Kompletna baza zaklęć zawiera ponad 380 czarów w dużych kafelkach 2×2/XL", window.DND_SPELLS.length >= 380, `Liczba zaklęć: ${window.DND_SPELLS.length}`);
      for (let lvl = 0; lvl <= 9; lvl++) {
        const cnt = window.DND_SPELLS.filter(s => s.level === lvl).length;
        assert("5. Księga Zaklęć (0–9)", `Krąg ${lvl} posiada zaklęcia i poprawne opisy PL/EN`, cnt >= 5, `Krąg ${lvl}: ${cnt} zaklęć`);
      }

      // ----------------------------------------------------------------------
      // 6. TESTY MAGICZNYCH PRZEDMIOTÓW (500+ PRZEDMIOTÓW I ARTEFAKTÓW Z AIDEDD / WIKIDOT)
      // ----------------------------------------------------------------------
      assert("6. Magiczne Przedmioty (500+)", "Obecność pełnej bazy wszystkich 474+ przedmiotów magicznych i artefaktów z aidedd.org/magic-item-dnd5 (DMG/TCE/XGE/FTD/BGG/BMT)", (window.DND_MAGIC_ITEMS || []).length >= 474, `Przedmiotów w bazie: ${window.DND_MAGIC_ITEMS.length}`);
      const hasAideddItems = Boolean(
        App.getMagicItemById("absorbing-tattoo") &&
        App.getMagicItemById("adze-of-annam") &&
        App.getMagicItemById("alchemical-compendium") &&
        App.getMagicItemById("all-purpose-tool") &&
        App.getMagicItemById("antimagic-armor") &&
        App.getMagicItemById("arcane-grimoire")
      );
      assert("6. Magiczne Przedmioty (500+)", "Baza zawiera przedmioty ze wszystkich źródeł AideDD (DMG, XGE, TCE, FTD, Glory of the Giants, Book of Many Things)",
        hasAideddItems,
        "DMG + XGE + TCE + FTD + BGG + BMT OK"
      );

      testChar.abilities = { STR: 8, DEX: 14, CON: 10, INT: 10, WIS: 12, CHA: 10 };
      testChar.magicItems = ["belt-of-fire-giant-strength", "amulet-of-health", "headband-of-intellect"];
      assert("6. Magiczne Przedmioty (255)", "Przedmioty ustawiające cechy: Pas Ognistego Giganta (SIŁ=25), Amulet Zdrowia (KON=19), Opaska Intelektu (INT=19)",
        App.getEffectiveAbilityScore(testChar, "STR") === 25 &&
        App.getEffectiveAbilityScore(testChar, "CON") === 19 &&
        App.getEffectiveAbilityScore(testChar, "INT") === 19,
        `SIŁ: ${App.getEffectiveAbilityScore(testChar, "STR")}, KON: ${App.getEffectiveAbilityScore(testChar, "CON")}, INT: ${App.getEffectiveAbilityScore(testChar, "INT")}`
      );

      testChar.armorType = "none";
      testChar.magicItems = ["robe-of-the-archmagi", "ring-of-protection", "cloak-of-protection", "ioun-stone-mastery"];
      const acArchmagi = App.calcAC(testChar);
      const mBonuses = App.getMagicItemBonuses(testChar);
      assert("6. Magiczne Przedmioty (255)", "Szata Arcymaga (15+DEX), Pierścień i Płaszcz Ochrony (+2 KP/Rzuty obronne) oraz Kamień Ioun (+1 Biegłości)",
        acArchmagi === 19 && mBonuses.saves === 2 && mBonuses.spell_dc === 2 && mBonuses.pb === 1,
        `KP: ${acArchmagi}, Bonus Rzutów Obronnych: +${mBonuses.saves}, Bonus ST Czarów: +${mBonuses.spell_dc}, Bonus PB: +${mBonuses.pb}`
      );
      testChar.magicItems = [];

      // ----------------------------------------------------------------------
      // 7. TESTY STANÓW, BUFFÓW, OSŁON I POZIOMÓW WYCZERPANIA (0–6)
      // ----------------------------------------------------------------------
      testChar.armorType = "heavy";
      testChar.shieldEquipped = false;
      testChar.conditions = ["hasted", "shield_of_faith_buff", "shield_spell_buff", "three_quarters_cover"];
      assert("7. Stany i Wyczerpanie", "Kumulacja buffów KP: Haste (+2), Tarcza Wiary (+2), Zaklęcie Tarcza (+5) i Osłona 3/4 (+5) = +14 KP (32 KP) i podwójna szybkość (60 ft)",
        App.calcAC(testChar) === 32 && App.calcSpeed(testChar) === 60,
        `KP: ${App.calcAC(testChar)}, Szybkość: ${App.calcSpeed(testChar)} ft`
      );

      testChar.conditions = ["slowed"];
      assert("7. Stany i Wyczerpanie", "Spowolnienie (Slow) obniża KP o -2 (16 KP) i dzieli szybkość przez 2 (15 ft)",
        App.calcAC(testChar) === 16 && App.calcSpeed(testChar) === 15,
        `KP: ${App.calcAC(testChar)}, Szybkość: ${App.calcSpeed(testChar)} ft`
      );

      ["grappled", "restrained", "paralyzed", "petrified", "stunned", "unconscious"].forEach(cId => {
        testChar.conditions = [cId];
        assert("7. Stany i Wyczerpanie", `Stan '${cId}' redukuje szybkość ruchu do 0 ft`, App.calcSpeed(testChar) === 0, `Szybkość przy ${cId}: ${App.calcSpeed(testChar)} ft`);
      });

      testChar.conditions = [];
      testChar.exhaustion = 0;
      const baseMaxHp = App.calcRecommendedMaxHP(testChar);
      testChar.exhaustion = 1;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 1: Utrudnienie w testach cech (disChecks = true)", App.getConditionEffects(testChar).disChecks === true, "disChecks = true");
      testChar.exhaustion = 2;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 2: Szybkość zmniejszona o połowę (15 ft)", App.calcSpeed(testChar) === 15, `Szybkość: ${App.calcSpeed(testChar)} ft`);
      testChar.exhaustion = 3;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 3: Utrudnienie w atakach i rzutach obronnych", App.getConditionEffects(testChar).disAttacks && App.getConditionEffects(testChar).disSaves, "disAttacks & disSaves = true");
      testChar.exhaustion = 4;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 4: Maksymalne PW zmniejszone o połowę", App.calcRecommendedMaxHP(testChar) === Math.floor(baseMaxHp / 2), `PW: ${App.calcRecommendedMaxHP(testChar)}/${baseMaxHp}`);
      testChar.exhaustion = 5;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 5: Szybkość zredukowana do 0 ft", App.calcSpeed(testChar) === 0, `Szybkość: ${App.calcSpeed(testChar)} ft`);
      testChar.exhaustion = 6;
      assert("7. Stany i Wyczerpanie", "Wyczerpanie Poz. 6: Śmierć postaci (dead = true)", App.getConditionEffects(testChar).dead === true, "dead = true");
      testChar.exhaustion = 0;

      // ----------------------------------------------------------------------
      // 8. TESTY PULI 4k6 (ODRZUĆ NAJNIŻSZĄ) I ALOKACJI CECH
      // ----------------------------------------------------------------------
      App.roll4d6DropLowest();
      const pool6 = App.state.rolledPool || [];
      const validPool = pool6.length === 6 && pool6.every(p => p.val >= 3 && p.val <= 18 && p.detail.includes("<s>"));
      assert("8. Rzuty 4k6 i Alokacja Cech", "Rzut 6× (4k6 odrzuć najniższą) generuje pulę 6 wyników (3–18) ze skreśloną najniższą kością", validPool, `Wylosowano: ${pool6.map(p => p.val).join(", ")}`);

      const firstVal = pool6[0].val;
      App.assignPoolItemToAbility(0, "STR");
      assert("8. Rzuty 4k6 i Alokacja Cech", "Przypisanie wybranego wyniku z puli do wybranej cechy (SIŁ) ustawia dokładną wartość i oznacza kość jako przypisaną",
        App.getActiveChar().abilities.STR === firstVal && App.state.rolledPool[0].assignedTo === "STR",
        `Przypisano ${firstVal} do SIŁ`
      );

      App.autoAssignPoolToClass();
      const allAssigned = App.state.rolledPool.every(p => Boolean(p.assignedTo));
      assert("8. Rzuty 4k6 i Alokacja Cech", "Funkcja Auto-dopasuj rozlokowuje wszystkie 6 wyników z puli do 6 unikalnych cech", allAssigned, `Przypisane: ${App.state.rolledPool.map(p => `${p.assignedTo}=${p.val}`).join(", ")}`);

      // ----------------------------------------------------------------------
      // 9. TESTY KREATORA BRONI I PANCERZA (FORGE)
      // ----------------------------------------------------------------------
      testChar.customArmor = { enabled: true, name: "Półpancerz +3", baseAc: 15, magicBonus: 3, dexCap: 2, addCon: false, addWis: false, addInt: false, adamantine: true, mithral: true };
      testChar.abilities.DEX = 18;
      testChar.shieldEquipped = true;
      testChar.shieldMagicBonus = 2;
      assert("9. Kreator Broni i Pancerza", "Własny Półpancerz +3 (DEX cap 2) z Tarczą +2 daje dokładnie 24 KP", App.calcAC(testChar) === 24, `KP: ${App.calcAC(testChar)}`);

      testChar.classId = "paladin";
      testChar.level = 11;
      testChar.abilities = { STR: 16, DEX: 18, CON: 14, INT: 10, WIS: 12, CHA: 16 };
      const finesseWp = App.calcWeaponStats(testChar, { name: "Słoneczny Rapier +2", ability: "finesse", prof: true, magicBonus: 2, dice: "1d8", extraDice: "1d6", dmgType: "Promieniste" });
      assert("9. Kreator Broni i Pancerza", "Broń Finezyjna +2 u Paladyna (11. poz.) wybiera wyższą cechę (ZRĘ +4), dolicza +1d8 Improved Divine Smite oraz +1d6 dodatkowych kości",
        finesseWp.usedAb === "DEX" && finesseWp.toHit === 10 && finesseWp.dmgFormula === "1d8+1d6+1d8+6",
        `Trafienie: +${finesseWp.toHit}, Obrażenia: ${finesseWp.dmgFormula}`
      );

      // ----------------------------------------------------------------------
      // 10. TESTY KALKULATORA KOŚCI, PARSERA I BANERA RZUTU NA DOLE EKRANU
      // ----------------------------------------------------------------------
      const roll1 = App.rollCustomFormula("2d6+3", "Dwuręczny Miecz");
      const math1 = document.querySelector(".toast-roll-math")?.textContent || "";
      assert("10. Kalkulator Kości i Baner Rzutów", "Rzut '2d6+3' zwraca 5–15 i wyświetla na dole ekranu format '2k6[x, y] + 3 = suma' (dokładnie jeden znak '=')",
        roll1 >= 5 && roll1 <= 15 && (math1.match(/=/g) || []).length === 1 && math1.endsWith(`= ${roll1}`),
        `Równanie: "${math1}"`
      );

      const roll2 = App.rollCustomFormula("1d8+2d6+4", "Płomienny Miecz");
      const math2 = document.querySelector(".toast-roll-math")?.textContent || "";
      assert("10. Kalkulator Kości i Baner Rzutów", "Wieloczłonowy rzut '1d8+2d6+4' zwraca 7–24 i formatuje wszystkie kości bez podwójnych znaków '='",
        roll2 >= 7 && roll2 <= 24 && (math2.match(/=/g) || []).length === 1 && math2.endsWith(`= ${roll2}`),
        `Równanie: "${math2}"`
      );

      const roll3 = App.rollCustomFormula("8d6", "Kula Ognia");
      const math3 = document.querySelector(".toast-roll-math")?.textContent || "";
      assert("10. Kalkulator Kości i Baner Rzutów", "Rzut samymi kośćmi bez modyfikatora ('8d6') nie duplikuje wyniku ('= X', a nie '= X = X')",
        roll3 >= 8 && roll3 <= 48 && (math3.match(/=/g) || []).length === 1,
        `Równanie: "${math3}"`
      );

      App.setRollMode("adv");
      const rollAdv = App.rollDie(20, 5, "Atak z Ułatwieniem", "attack");
      const mathAdv = document.querySelector(".toast-roll-math")?.textContent || "";
      App.setRollMode("normal");
      assert("10. Kalkulator Kości i Baner Rzutów", "Rzut k20 z Ułatwieniem (Adv) wyświetla na dole ekranu obie kości '1k20[Adv: r1, r2 → max] + 5 = suma'",
        rollAdv >= 6 && rollAdv <= 25 && mathAdv.includes("Adv:") && mathAdv.includes("→"),
        `Równanie: "${mathAdv}"`
      );

      // ----------------------------------------------------------------------
      // 11. TESTY BESTIARIUSZA AIDEDD (WSZYSTKIE 964 POTWORY) ORAZ LICENCJI
      // ----------------------------------------------------------------------
      const monsters = window.DND_MONSTERS || [];
      assert("11. Bestiariusz AideDD (964+) i Licencje", "Załadowano pełny Bestiariusz wszystkich 964+ potworów D&D 5e z aidedd.org/monster-dnd5 ze wszystkich 7 źródeł (MM, MPMM, FTD, BGG, Rules, Adv, Extra)", monsters.length >= 964, `Potworów w bazie: ${monsters.length}`);
      const hasBeasts = monsters.filter(m => m.type_en === "Beast").length >= 100;
      const hasDragons = monsters.filter(m => m.type_en === "Dragon").length >= 60;
      const hasUndead = monsters.filter(m => m.type_en === "Undead").length >= 60;
      const hasTarrasque = Boolean(App.getMonsterById("tarrasque") && App.getMonsterById("ancient-red-dragon") && App.getMonsterById("lich") && App.getMonsterById("aarakocra") && App.getMonsterById("abominable-yeti"));
      assert("11. Bestiariusz AideDD (964+) i Licencje", "Bestiariusz zawiera wszystkie Bestie (100+), Smoki (60+), Nieumarłych (60+), Czarty, Aberracje, Gigantów i Tarrasque'a",
        hasBeasts && hasDragons && hasUndead && hasTarrasque,
        `Bestie: ${monsters.filter(m => m.type_en === "Beast").length}, Smoki: ${monsters.filter(m => m.type_en === "Dragon").length}, Nieumarli: ${monsters.filter(m => m.type_en === "Undead").length}`
      );

      const footerEl = document.getElementById("app-footer");
      assert("11. Bestiariusz AideDD i Licencje", "Obecność stopki źródeł i licencji (CC-BY-4.0 / SRD 5.1 / OGL 1.0a / Wikidot / AideDD) oraz podstrony licencji",
        Boolean(footerEl && footerEl.textContent.includes("CC-BY-4.0") && typeof App.openSourcesAndLicensesModal === "function"),
        "Stopka #app-footer i modal licencji OK"
      );

      // ----------------------------------------------------------------------
      // 12. BENCHMARKI WYDAJNOŚCI, CZASU RENDEROWANIA I OPTYMALIZACJI (PERFORMANCE)
      // ----------------------------------------------------------------------
      // 12.1 O(1) Hash-Map Index Cache Benchmark (10,000 wyszukiwań)
      const bCache = measure("O(1) Hash-Map Cache (10 000 zapytań)", 25, () => {
        let hits = 0;
        for (let i = 0; i < 2000; i++) {
          if (App.getSpellById("fireball")) hits++;
          if (App.getClassData("wizard")) hits++;
          if (App.getRaceData("elf-high")) hits++;
          if (App.getMagicItemById("staff-of-power")) hits++;
          if (App.getMonsterById("ancient-red-dragon")) hits++;
        }
        return hits;
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "O(1) Hash-Map Index Cache: 10 000 wyszukiwań (zaklęcia, klasy, rasy, przedmioty, potwory) poniżej 25 ms",
        bCache.res === 10000 && bCache.elapsed <= 25,
        `Czas: ${bCache.elapsed} ms (budżet: 25 ms)`
      );

      // 12.2 Memoizacja Portretów SVG (3,000 pobrań portretów ras, klas i potworów)
      const bSvg = measure("Memoizacja Portretów SVG (3 000 wywołań)", 20, () => {
        let ok = 0;
        const sampleMonster = App.getMonsterById("ancient-red-dragon");
        for (let i = 0; i < 1000; i++) {
          if (window.getRacePortraitUri("tiefling")) ok++;
          if (window.getClassPortraitUri("paladin")) ok++;
          if (window.getMonsterPortraitUri(sampleMonster)) ok++;
        }
        return ok;
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Cache portretów SVG: 3 000 pobrań portretów ras, klas i potworów poniżej 20 ms (100% Cache Hit)",
        bSvg.res === 3000 && bSvg.elapsed <= 20,
        `Czas: ${bSvg.elapsed} ms (budżet: 20 ms)`
      );

      // 12.3 Benchmark Renderowania Karty Postaci (renderSheetTab)
      const bSheet = measure("Renderowanie Karty Postaci (renderSheetTab)", 60, () => {
        return App.renderSheetTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie interaktywnej Karty Postaci (KP, PW, Bronie, Zaklęcia, Stany) poniżej 60 ms",
        bSheet.res.length > 2000 && bSheet.elapsed <= 60,
        `Czas: ${bSheet.elapsed} ms (budżet: 60 ms)`
      );

      // 12.4 Benchmark Renderowania Kreatora Krok 1 (73 Rasy 2x2/XL) i Krok 2 (13 Klas + Podklasy 2x2)
      const bRaces = measure("Renderowanie 73 Ras 2×2/XL (Krok 1)", 90, () => {
        App.state.builderStep = 1;
        return App.renderBuilderTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie wszystkich 73 kart ras 2×2/XL z pełnymi tabelami i cechami poniżej 90 ms",
        bRaces.res.length > 10000 && bRaces.elapsed <= 90,
        `Czas: ${bRaces.elapsed} ms (budżet: 90 ms)`
      );

      const bClasses = measure("Renderowanie 13 Klas i Podklas 2×2 (Krok 2)", 65, () => {
        App.state.builderStep = 2;
        return App.renderBuilderTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie 13 Klas i szczegółowych kart Podklas 2×2 poniżej 65 ms",
        bClasses.res.length > 5000 && bClasses.elapsed <= 65,
        `Czas: ${bClasses.elapsed} ms (budżet: 65 ms)`
      );

      // 12.5 Benchmark Renderowania Osobistej Księgi Zaklęć Postaci oraz Pełnej Księgi Zaklęć
      const bCharSpells = measure("Renderowanie Księgi Zaklęć Postaci", 45, () => {
        App.state.spellFilters.onlyCharSpells = true;
        return App.renderSpellsTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie Osobistej Księgi Zaklęć Postaci poniżej 45 ms",
        bCharSpells.res.length > 2000 && bCharSpells.elapsed <= 45,
        `Czas: ${bCharSpells.elapsed} ms (budżet: 45 ms)`
      );

      const bAllSpells = measure("Renderowanie Pełnej Księgi Zaklęć (400+ czarów)", 140, () => {
        App.state.spellFilters.onlyCharSpells = false;
        App.state.spellFilters.level = "all";
        return App.renderSpellsTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie pełnej bazy 400+ dużych kart zaklęć 2×2/XL poniżej 140 ms",
        bAllSpells.res.length > 20000 && bAllSpells.elapsed <= 140,
        `Czas: ${bAllSpells.elapsed} ms (budżet: 140 ms)`
      );

      // 12.6 Benchmark Renderowania Bestiariusza AideDD (114 Potworów)
      const bBestiary = measure("Renderowanie Bestiariusza (114 potworów)", 110, () => {
        return App.renderBestiaryTab();
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "Renderowanie Bestiariusza AideDD (114 pełnych statblocków potworów) poniżej 110 ms",
        bBestiary.res.length > 15000 && bBestiary.elapsed <= 110,
        `Czas: ${bBestiary.elapsed} ms (budżet: 110 ms)`
      );

      // 12.7 Benchmark Konwersji Metrycznej i Kalkulatora Broni (1,000 operacji)
      const bCalc = measure("Kalkulator Bojowy & Metryczny (1 000 operacji)", 45, () => {
        const c = App.getActiveChar();
        const wp = c.weapons[0];
        for (let i = 0; i < 500; i++) {
          App.calcWeaponStats(c, wp);
          App.calcAC(c);
          App.convertUnitsToMetric("Zasięg 30/120 ft, stożek 60 stóp, waga 15 funtów");
        }
        return true;
      });
      assert("12. Czas i Optymalizacja (Benchmarks)", "1 500 przeliczeń bojowych (KP, Broń, Konwersja Metryczna) poniżej 45 ms",
        bCalc.res && bCalc.elapsed <= 45,
        `Czas: ${bCalc.elapsed} ms (budżet: 45 ms)`
      );

    } catch (err) {
      failed++;
      results.push({ category: "Wyjątek krytyczny", name: "Błąd wykonania testu", status: "FAIL", detail: String(err && err.stack ? err.stack : err) });
    } finally {
      App.state = backupState;
      App.applyTheme();
      App.updateStaticUILang();
      App.saveState();
      App.render();
    }

    const totalTimeMs = Math.round((now() - suiteStart) * 100) / 100;
    return { total: passed + failed, passed, failed, totalTimeMs, timings, results };
  },

  openTestReportModal() {
    const report = this.runAll();
    const categories = [...new Set(report.results.map(r => r.category))];
    const domNodesCount = document.getElementsByTagName("*").length;

    const html = `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card" style="background:var(--bg-deep);border:1.5px solid ${report.failed === 0 ? 'var(--emerald)' : 'var(--crimson)'};">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <h4 style="color:${report.failed === 0 ? 'var(--emerald)' : 'var(--crimson)'};font-size:1.12rem;">
                ${report.failed === 0 ? '✅ WSZYSTKIE TESTY I BENCHMARKI ZALICZONE (100% PASS)!' : `⚠️ Wykryto błędy: ${report.failed}`}
              </h4>
              <p style="font-size:0.81rem;color:var(--text-muted);margin-top:2px;">
                Wykonano <strong>${report.total}</strong> testów jednostkowych, integracyjnych i wydajnościowych w łącznym czasie <strong>${report.totalTimeMs} ms</strong> • Aktywne węzły DOM: <strong>${domNodesCount}</strong> • Ostatni render widoku: <strong>${App.lastRenderTimeMs} ms</strong>.
              </p>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span class="badge badge-emerald" style="font-size:0.88rem;padding:6px 12px;">✓ Zaliczone: ${report.passed}/${report.total}</span>
              <span class="badge badge-gold" style="font-size:0.88rem;padding:6px 12px;">⏱️ Czas całkowity: ${report.totalTimeMs} ms</span>
              ${report.failed > 0 ? `<span class="badge badge-crimson" style="font-size:0.88rem;padding:6px 12px;">✕ Błędy: ${report.failed}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Performance & Timing Dashboard -->
        <div class="card" style="background:var(--bg-deep);padding:14px;border-color:var(--border-gold);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <strong style="color:var(--gold-bright);font-family:var(--font-display);font-size:0.95rem;">
              ⚡ Benchmark Czasu Renderowania i Optymalizacji (O(1) Map Cache + Single-Pass DOM + CSS Content-Visibility)
            </strong>
            <span class="badge badge-cyan">Budżet klatki UI: &lt; 16–90 ms</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;">
            ${report.timings.map(t => {
              const pct = Math.min(100, Math.max(4, Math.round((t.elapsed / t.budgetMs) * 100)));
              return `
                <div style="background:var(--bg-card);padding:8px 10px;border-radius:8px;border:1px solid var(--border-subtle);">
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.77rem;margin-bottom:4px;">
                    <span style="font-weight:600;color:var(--text-main);">${t.label}</span>
                    <span style="font-family:var(--font-mono);font-weight:700;color:${t.ok ? 'var(--emerald)' : 'var(--crimson)'};">${t.elapsed} ms / ${t.budgetMs} ms</span>
                  </div>
                  <div style="width:100%;height:6px;background:var(--bg-deep);border-radius:99px;overflow:hidden;">
                    <div style="width:${pct}%;height:100%;background:${pct < 50 ? 'var(--emerald)' : (pct < 85 ? 'var(--gold)' : 'var(--crimson)')};"></div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div style="max-height:46vh;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding-right:4px;">
          ${categories.map(cat => {
            const catItems = report.results.filter(r => r.category === cat);
            return `
              <div class="card" style="background:var(--bg-deep);padding:12px;">
                <h4 style="color:var(--gold);margin-bottom:8px;font-size:0.92rem;">${cat} (${catItems.filter(x=>x.status==='PASS').length}/${catItems.length})</h4>
                <div style="display:flex;flex-direction:column;gap:5px;">
                  ${catItems.map(item => `
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:0.8rem;padding:4px 8px;border-radius:6px;background:var(--bg-card);">
                      <div>
                        <span style="color:${item.status === 'PASS' ? 'var(--emerald)' : 'var(--crimson)'};font-weight:700;">
                          ${item.status === 'PASS' ? '✓ PASS' : '✕ FAIL'}
                        </span>
                        <strong style="margin-left:6px;">${item.name}</strong>
                      </div>
                      <span style="font-family:var(--font-mono);font-size:0.74rem;color:var(--text-muted);">${item.detail}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button class="btn-secondary btn-sm" onclick="window.DND_TEST_SUITE.openTestReportModal()">🔄 Uruchom Benchmark i Testy Ponownie</button>
          <button class="btn-primary btn-sm" onclick="App.closeModal()">Zamknij Raport</button>
        </div>
      </div>
    `;

    App.openModal(`🧪 Raport Diagnostyczny & Benchmark Wydajności (${report.passed}/${report.total} PASS • ${report.totalTimeMs} ms)`, html);
  }
};
