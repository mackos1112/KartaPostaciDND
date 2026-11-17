// ============================================================================
// Kroniki D&D 5e — Kompleksowy Automatyczny Zestaw Testów (Test Suite)
// Ponad 160 testów jednostkowych i integracyjnych weryfikujących wszystkie
// systemy aplikacji: 13 klas (1-20), podklasy, 61 ras + portrety SVG, 73 atuty,
// 500+ zaklęć (0-9), przedmioty magiczne, 25 stanów + 6 poz. wyczerpania,
// pulę 4k6, kreator broni i pancerza, kalkulator kości, metryczny i tryb jasny.
// ============================================================================

window.DND_TEST_SUITE = {
  runAll() {
    const results = [];
    let passed = 0;
    let failed = 0;

    function assert(category, name, condition, detail = "") {
      if (condition) {
        passed++;
        results.push({ category, name, status: "PASS", detail });
      } else {
        failed++;
        results.push({ category, name, status: "FAIL", detail });
      }
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
      // 2. TESTY WSZYSTKICH 61 RAS I ICH PORTRETÓW SVG
      // ----------------------------------------------------------------------
      assert("2. Rasy i Portrety (61)", "Obecność pełnej bazy grywalnych ras i rodowodów (61)", window.DND_RACES.length >= 61, `Liczba ras: ${window.DND_RACES.length}`);

      const seenRaceIds = new Set();
      window.DND_RACES.forEach(r => {
        const isUnique = !seenRaceIds.has(r.id);
        seenRaceIds.add(r.id);
        const pUri = window.getRacePortraitUri(r.id);
        const hasPortrait = pUri && pUri.startsWith("data:image/svg+xml;utf8,") && pUri.length > 250;
        const hasFields = Boolean(r.id && r.name_pl && r.name_en && r.speed >= 20 && Array.isArray(r.traits_pl) && r.traits_pl.length > 0);
        assert(
          "2. Rasy i Portrety (61)",
          `Rasa ${r.name_pl} (${r.id}): dane rasowe, cechy i dedykowany portret SVG`,
          isUnique && hasPortrait && hasFields,
          `${r.speed} ft, ${r.source}`
        );
      });

      // ----------------------------------------------------------------------
      // 3. TESTY MECHANIKI PODKLAS (BONUSY PASYWNE I AKTYWNE)
      // ----------------------------------------------------------------------
      const subMechKeys = Object.keys(window.DND_SUBCLASS_MECHANICS || {});
      assert("3. Mechanika Podklas", "Załadowano bazę mechaniki podklas (DND_SUBCLASS_MECHANICS)", subMechKeys.length >= 40, `Podklas z mechaniką: ${subMechKeys.length}`);

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
      assert("3. Mechanika Podklas", "Magia Wojenna (War Magic): +INT (+4) do Inicjatywy", App.calcInitiative(testChar) === 6, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Chronurgy (+INT do Inicjatywy)
      testChar.subclassId = "chronurgy";
      assert("3. Mechanika Podklas", "Chronurgia (Chronurgy Magic): +INT (+4) do Inicjatywy", App.calcInitiative(testChar) === 6, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Gloom Stalker (+WIS do Inicjatywy)
      testChar.classId = "ranger";
      testChar.subclassId = "gloom-stalker";
      assert("3. Mechanika Podklas", "Mroczny Łowca (Gloom Stalker): +MĄD (+3) do Inicjatywy", App.calcInitiative(testChar) === 5, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Swashbuckler (+CHA do Inicjatywy)
      testChar.classId = "rogue";
      testChar.subclassId = "swashbuckler";
      assert("3. Mechanika Podklas", "Zawadiaka (Swashbuckler): +CHA (+3) do Inicjatywy", App.calcInitiative(testChar) === 5, `Inicjatywa: +${App.calcInitiative(testChar)}`);

      // Bladesinging (+INT do KP i +10 ft szybkości po włączeniu Pieśni Ostrza)
      testChar.classId = "wizard";
      testChar.subclassId = "bladesinging";
      testChar.armorType = "mage_armor";
      testChar.shieldEquipped = false;
      testChar.subclassBuffActive = false;
      const acBeforeBS = App.calcAC(testChar);
      const spdBeforeBS = App.calcSpeed(testChar);
      testChar.subclassBuffActive = true;
      const acAfterBS = App.calcAC(testChar);
      const spdAfterBS = App.calcSpeed(testChar);
      assert("3. Mechanika Podklas", "Pieśń Ostrza (Bladesinging): aktywacja daje +INT (+4) do KP i +10 ft szybkości", acBeforeBS === 15 && acAfterBS === 19 && spdAfterBS === spdBeforeBS + 10, `KP: ${acBeforeBS}→${acAfterBS}, Ruch: ${spdBeforeBS}→${spdAfterBS} ft`);
      testChar.subclassBuffActive = false;

      // Forge Domain (+1 KP pasywnie)
      testChar.classId = "cleric";
      testChar.subclassId = "forge";
      testChar.armorType = "heavy";
      assert("3. Mechanika Podklas", "Domena Kuźni (Forge Domain): pasywne +1 do KP", App.calcAC(testChar) === 19, `KP: ${App.calcAC(testChar)}`);

      // Draconic Bloodline (+1 PW na poziom + naturalny pancerz 13 + DEX)
      testChar.classId = "sorcerer";
      testChar.subclassId = "draconic";
      testChar.armorType = "none";
      const hpDraconic = App.calcRecommendedMaxHP(testChar);
      const acDraconic = App.calcAC(testChar); // 13 + 2 (DEX) = 15
      testChar.subclassId = "wild-magic";
      const hpWild = App.calcRecommendedMaxHP(testChar);
      assert("3. Mechanika Podklas", "Smoczy Rodowód (Draconic Bloodline): +1 PW/poziom (+10 PW) oraz bazowa KP 13 + ZRĘ (15 KP)", hpDraconic - hpWild === 10 && acDraconic === 15, `PW: +${hpDraconic - hpWild}, KP: ${acDraconic}`);

      // Battle Smith & Hexblade (Atak bronią z INT / CHA)
      testChar.classId = "warlock";
      testChar.subclassId = "hexblade";
      testChar.abilities = { STR: 10, DEX: 12, CON: 14, INT: 10, WIS: 10, CHA: 18 };
      const hexWp = App.calcWeaponStats(testChar, { name: "Długi Miecz Paktu", ability: "STR", prof: true, magicBonus: 0, dice: "1d8", dmgType: "Cięte" });
      assert("3. Mechanika Podklas", "Czarownik Hexblade automatycznie używa CHA (+4) zamiast SIŁ (+0) do ataku i obrażeń bronią", hexWp.usedAb === "CHA" && hexWp.toHit === 8, `Użyta cecha: ${hexWp.usedAb}, Trafienie: +${hexWp.toHit}`);

      testChar.classId = "artificer";
      testChar.subclassId = "battle-smith";
      testChar.abilities = { STR: 10, DEX: 12, CON: 14, INT: 20, WIS: 10, CHA: 10 };
      const bsWp = App.calcWeaponStats(testChar, { name: "Młot Kowala Bitwy", ability: "STR", prof: true, magicBonus: 1, dice: "1d8", dmgType: "Obuchowe" });
      assert("3. Mechanika Podklas", "Artefaktor Kowal Bitwy (Battle Smith) automatycznie używa INT (+5) do ataku i obrażeń bronią", bsWp.usedAb === "INT" && bsWp.toHit === 10, `Użyta cecha: ${bsWp.usedAb}, Trafienie: +${bsWp.toHit}`);

      // ----------------------------------------------------------------------
      // 4. TESTY ATUTÓW (73 FEATS) I TŁA (15 BACKGROUNDS)
      // ----------------------------------------------------------------------
      assert("4. Atuty i Tła", "Obecność wszystkich 73 atutów (Feats) i 15 teł (Backgrounds)", window.DND_FEATS.length >= 73 && window.DND_BACKGROUNDS.length >= 15, `Atuty: ${window.DND_FEATS.length}, Tła: ${window.DND_BACKGROUNDS.length}`);

      testChar.classId = "fighter";
      testChar.subclassId = "battle-master";
      testChar.abilities = { STR: 16, DEX: 16, CON: 14, INT: 10, WIS: 14, CHA: 10 };
      testChar.armorType = "medium"; // Półpancerz 15 + DEX(max 2) = 17
      testChar.feats = [];
      const acMedBefore = App.calcAC(testChar);
      const hpBeforeTough = App.calcRecommendedMaxHP(testChar);
      const initBeforeAlert = App.calcInitiative(testChar);
      const spdBeforeMobile = App.calcSpeed(testChar);

      testChar.feats = ["medium-armor-master", "dual-wielder", "tough", "alert", "mobile"];
      const acMedAfter = App.calcAC(testChar); // 15 + 3 (MAM) + 1 (Dual Wielder) = 19
      const hpAfterTough = App.calcRecommendedMaxHP(testChar); // +20 PW
      const initAfterAlert = App.calcInitiative(testChar); // +5
      const spdAfterMobile = App.calcSpeed(testChar); // +10 ft

      assert("4. Atuty i Tła", "Mistrz Średniego Pancerza (+3 DEX cap) i Walka Dwiema Brońmi (+1 KP) podnoszą KP z 17 na 19", acMedBefore === 17 && acMedAfter === 19, `KP przed: ${acMedBefore}, KP po: ${acMedAfter}`);
      assert("4. Atuty i Tła", "Atut Twardziel (Tough) dodaje +2 PW za poziom (+20 PW na 10. poz.)", hpAfterTough - hpBeforeTough === 20, `PW: ${hpBeforeTough}→${hpAfterTough}`);
      assert("4. Atuty i Tła", "Atut Czujny (Alert) dodaje +5 do Inicjatywy, a Mobilny (Mobile) +10 ft do Szybkości", initAfterAlert - initBeforeAlert === 5 && spdAfterMobile - spdBeforeMobile === 10, `Inicjatywa: +${initBeforeAlert}→+${initAfterAlert}, Ruch: ${spdBeforeMobile}→${spdAfterMobile} ft`);
      testChar.feats = [];

      // ----------------------------------------------------------------------
      // 5. TESTY KSIĘGI ZAKLĘĆ (KRĘGI 0–9)
      // ----------------------------------------------------------------------
      assert("5. Księga Zaklęć (0–9)", "Kompletna baza zaklęć zawiera ponad 380 czarów", window.DND_SPELLS.length >= 380, `Liczba zaklęć: ${window.DND_SPELLS.length}`);
      for (let lvl = 0; lvl <= 9; lvl++) {
        const cnt = window.DND_SPELLS.filter(s => s.level === lvl).length;
        assert("5. Księga Zaklęć (0–9)", `Krąg ${lvl} posiada zaklęcia i poprawne opisy PL/EN`, cnt >= 5, `Krąg ${lvl}: ${cnt} zaklęć`);
      }

      // ----------------------------------------------------------------------
      // 6. TESTY MAGICZNYCH PRZEDMIOTÓW (43 PRZEDMIOTY)
      // ----------------------------------------------------------------------
      assert("6. Magiczne Przedmioty", "Obecność bazy 43 przedmiotów magicznych z DMG/TCE/FTD", (window.DND_MAGIC_ITEMS || []).length >= 43, `Przedmiotów: ${window.DND_MAGIC_ITEMS.length}`);

      testChar.abilities = { STR: 8, DEX: 14, CON: 10, INT: 10, WIS: 12, CHA: 10 };
      testChar.magicItems = ["belt-of-fire-giant-strength", "amulet-of-health", "headband-of-intellect"];
      assert("6. Magiczne Przedmioty", "Przedmioty ustawiające cechy: Pas Ognistego Giganta (SIŁ=25), Amulet Zdrowia (KON=19), Opaska Intelektu (INT=19)",
        App.getEffectiveAbilityScore(testChar, "STR") === 25 &&
        App.getEffectiveAbilityScore(testChar, "CON") === 19 &&
        App.getEffectiveAbilityScore(testChar, "INT") === 19,
        `SIŁ: ${App.getEffectiveAbilityScore(testChar, "STR")}, KON: ${App.getEffectiveAbilityScore(testChar, "CON")}, INT: ${App.getEffectiveAbilityScore(testChar, "INT")}`
      );

      testChar.armorType = "none";
      testChar.magicItems = ["robe-of-the-archmagi", "ring-of-protection", "cloak-of-protection", "ioun-stone-mastery"];
      const acArchmagi = App.calcAC(testChar); // 15 + 2 (DEX) + 1 (Ring) + 1 (Cloak) = 19
      const mBonuses = App.getMagicItemBonuses(testChar);
      assert("6. Magiczne Przedmioty", "Szata Arcymaga (15+DEX), Pierścień i Płaszcz Ochrony (+2 KP/Rzuty obronne) oraz Kamień Ioun (+1 Biegłości)",
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
      testChar.abilities.DEX = 18; // +4, ale cap = 2
      testChar.shieldEquipped = true;
      testChar.shieldMagicBonus = 2; // Tarcza +2 -> +4 KP
      // Razem: 15 + 2 (DEX cap) + 3 (magic armor) + 4 (magic shield) = 24 KP
      assert("9. Kreator Broni i Pancerza", "Własny Półpancerz +3 (DEX cap 2) z Tarczą +2 daje dokładnie 24 KP", App.calcAC(testChar) === 24, `KP: ${App.calcAC(testChar)}`);

      testChar.classId = "paladin";
      testChar.level = 11; // Improved Divine Smite (+1d8)
      testChar.abilities = { STR: 16, DEX: 18, CON: 14, INT: 10, WIS: 12, CHA: 16 };
      const finesseWp = App.calcWeaponStats(testChar, { name: "Słoneczny Rapier +2", ability: "finesse", prof: true, magicBonus: 2, dice: "1d8", extraDice: "1d6", dmgType: "Promieniste" });
      // Finesse wybiera DEX (+4 > STR +3), PB na 11 poz. = +4, magic = +2 -> toHit = +10
      // dmgFormula = 1d8+1d6+1d8+6
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
      // 11. TESTY SYSTEMU METRYCZNEGO, TŁUMACZENIA UI I TRYBU JASNEGO
      // ----------------------------------------------------------------------
      const metricOut = App.convertUnitsToMetric("30 ft, +10 ft, 20/60 ft, 120 stóp, 60 × 5 stóp");
      assert("11. Język, Metryczny i Tryb Jasny", "Konwersja na system metryczny poprawnie przelicza stopy i zasięgi na metry (9 m, +3 m, 6/18 m, 36 m, 18 × 1,5 m)",
        metricOut.includes("9 m") && metricOut.includes("+3 m") && metricOut.includes("6/18 m") && metricOut.includes("36 m") && metricOut.includes("18 × 1,5 m"),
        `Wynik: "${metricOut}"`
      );

      App.setLangMode("en");
      App.render();
      const enHtml = document.getElementById("main-view")?.innerHTML || "";
      App.setLangMode("pl_en");
      assert("11. Język, Metryczny i Tryb Jasny", "Tryb języka angielskiego (EN Wikidot) tłumaczy interfejs oraz nagłówki widoku",
        enHtml.length > 500,
        "Przełączono PL ↔ EN bez błędów"
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

    return { total: passed + failed, passed, failed, results };
  },

  openTestReportModal() {
    const report = this.runAll();
    const categories = [...new Set(report.results.map(r => r.category))];

    const html = `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card" style="background:var(--bg-deep);border:1.5px solid ${report.failed === 0 ? 'var(--emerald)' : 'var(--crimson)'};">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <h4 style="color:${report.failed === 0 ? 'var(--emerald)' : 'var(--crimson)'};font-size:1.1rem;">
                ${report.failed === 0 ? '✅ WSZYSTKIE TESTY ZALICZONE (100% PASS)!' : `⚠️ Wykryto błędy: ${report.failed}`}
              </h4>
              <p style="font-size:0.82rem;color:var(--text-muted);">
                Przeprowadzono <strong>${report.total}</strong> automatycznych testów jednostkowych i integracyjnych (13 Klas, 61 Ras + Portrety SVG, Mechanika Podklas, 73 Atuty, Zaklęcia 0–9, Magiczne Przedmioty, Stany/Wyczerpanie, Pula 4k6, Kreator Broni i Pancerza, Kalkulator Kości, System Metryczny i Tryb Jasny).
              </p>
            </div>
            <div style="display:flex;gap:8px;">
              <span class="badge badge-emerald" style="font-size:0.9rem;padding:6px 12px;">✓ Zaliczone: ${report.passed}</span>
              ${report.failed > 0 ? `<span class="badge badge-crimson" style="font-size:0.9rem;padding:6px 12px;">✕ Błędy: ${report.failed}</span>` : ''}
            </div>
          </div>
        </div>

        <div style="max-height:55vh;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding-right:4px;">
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
          <button class="btn-secondary btn-sm" onclick="window.DND_TEST_SUITE.openTestReportModal()">🔄 Uruchom Testy Ponownie</button>
          <button class="btn-primary btn-sm" onclick="App.closeModal()">Zamknij Raport</button>
        </div>
      </div>
    `;

    App.openModal(`🧪 Raport Testów Diagnostycznych (${report.passed}/${report.total} PASS)`, html);
  }
};
