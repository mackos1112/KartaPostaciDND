// ============================================================================
// Pełne dane mechaniczne Podklas D&D 5e (Wikidot):
// - Automatyczne bonusy pasywne (Inicjatywa, KP, PW, Szybkość, Biegłości, Zaklęcia Domenowe/Podklasowe)
// - Przełączalne stany bojowe podklas (np. Pieśń Ostrza / Bladesong +INT do KP,
//   Szał Berserkera/Totemu/Bestii, Gwiezdna Forma, Forma Grozy, Przebudzona Księga)
// - Klikalne akcje i kości podklas na Karcie Postaci (Manewry k8-k12, Boskie Uderzenie,
//   Psioniczne Ostrza, Działko Artylerzysty, Uzdrawiające Światło, Cięte Słowa itd.)
// ============================================================================

(function () {
  window.DND_SUBCLASS_MECHANICS = {
    // ======================== ARTIFICER ========================
    "alchemist": {
      spells_by_level: { 3: ["healing-word", "ray-of-frost"], 5: ["scorching-ray"], 9: ["dispel-magic"], 13: ["death-ward"], 17: ["raise-dead"] },
      features: [
        { level: 3, name_pl: "Eksperymentalny Eliksir", name_en: "Experimental Elixir", action_type: "Akcja", roll: "2d4+4", roll_label: "Eliksir Leczenia", desc_pl: "Tworzysz magiczny eliksir (Leczenie 2k4+INT, Szybkość +10 ft, Odporność +1 KP, Śmiałość +1k4 do ataków/rzutów obronnych, Lot 10 ft lub Transformacja).", desc_en: "Produce an Experimental Elixir granting healing, speed, +1 AC, +1d4 bless effect, flight, or transformation." },
        { level: 5, name_pl: "Alchemiczny Uczony (+INT do leczenia i obrażeń)", name_en: "Alchemical Savant", action_type: "Pasywne / Rzut", roll: "1d8+4", roll_label: "Bonus Alchemika", desc_pl: "Dodajesz modyfikator z Inteligencji do jednego rzutu leczenia lub obrażeń od kwasu, ognia, nekrotycznych lub trucizny.", desc_en: "Add your Intelligence modifier to one roll of a spell that restores HP or deals acid, fire, necrotic, or poison damage." },
        { level: 9, name_pl: "Odżywcze Odczynniki (+2k6 Temp PW)", name_en: "Restorative Reagents", action_type: "Eliksir", roll: "2d6+4", roll_label: "Tymczasowe PW z Eliksiru", desc_pl: "Każdy wypity eliksir daje dodatkowo 2k6 + INT tymczasowych PW, a Ty możesz rzucać Pomniejsze Przywrócenie (Lesser Restoration) INT razy dziennie za darmo.", desc_en: "Elixirs grant 2d6 + INT temporary HP, and cast Lesser Restoration INT times per day free." }
      ]
    },
    "armorer": {
      ac_bonus_passive: 0,
      toggle_buff: { id: "guardian_field", name_pl: "Pole Obronne Strażnika (Tymczasowe PW = Poziom)", bonus_ac: 0 },
      spells_by_level: { 3: ["magic-missile", "thunderwave"], 5: ["mirror-image", "shatter"], 9: ["hypnotic-pattern", "lightning-bolt"], 13: ["greater-invisibility"], 17: ["wall-of-force"] },
      features: [
        { level: 3, name_pl: "Rękawice Gromu (Model Strażnika)", name_en: "Thunder Gauntlets (Guardian)", action_type: "Atak (INT)", roll: "1d8", roll_label: "Rękawice Gromu (Grzmot)", desc_pl: "Atak wręcz oparty na Inteligencji (1k8 obrażeń od grzmotu). Trafiony cel ma Utrudnienie w rzutach ataku przeciw każdemu poza Tobą!", desc_en: "INT-based melee attack dealing 1d8 thunder damage and imposing disadvantage on attacks against targets other than you." },
        { level: 3, name_pl: "Wyrzutnia Błyskawic (Model Infiltratora)", name_en: "Lightning Launcher (Infiltrator)", action_type: "Atak (INT)", roll: "2d6", roll_label: "Wyrzutnia Błyskawic (1k6 + 1k6 raz/turę)", desc_pl: "Zasięg 90/300 stóp, 1k6 obrażeń od błyskawic (+1k6 raz na turę), +5 stóp szybkości ruchu i Ułatwienie w Skradaniu się!", desc_en: "Ranged attack (90/300 ft) dealing 1d6 lightning damage (+1d6 once per turn), +5 ft speed, and Stealth advantage." }
      ]
    },
    "artillerist": {
      spells_by_level: { 3: ["shield", "thunderwave"], 5: ["scorching-ray", "shatter"], 9: ["fireball"], 17: ["cone-of-cold"] },
      features: [
        { level: 3, name_pl: "Arkaniczne Działko: Miotacz Ognia / Balista Mocy", name_en: "Eldritch Cannon: Flamethrower / Force Ballista", action_type: "Akcja dodatkowa", roll: "2d8", roll_label: "Strzał Arkanicznego Działka (2k8)", desc_pl: "W akcji dodatkowej działko strzela: Balista Mocy (120 ft, 2k8 obrażeń od mocy i odepchnięcie o 5 ft) lub Miotacz Ognia (stożek 15 ft, 2k8 ognia).", desc_en: "Bonus action to activate Eldritch Cannon: Force Ballista (2d8 force + 5 ft push) or Flamethrower (2d8 fire cone)." },
        { level: 3, name_pl: "Arkaniczne Działko: Protektor (Tarcza Temp PW)", name_en: "Eldritch Cannon: Protector", action_type: "Akcja dodatkowa", roll: "1d8+4", roll_label: "Tarcza Protektora (Temp PW)", desc_pl: "W akcji dodatkowej działko daje Tobie i wszystkim sojusznikom w promieniu 10 stóp tymczasowe PW równe 1k8 + modyfikator z Inteligencji!", desc_en: "Bonus action to grant you and all creatures of your choice within 10 feet 1d8 + INT temporary hit points!" },
        { level: 5, name_pl: "Arkaniczna Broń Palna (+1k8 do zaklęć)", name_en: "Arcane Firearm", action_type: "Bonus do Czaru", roll: "1d8", roll_label: "Arkaniczna Broń Palna (+1k8)", desc_pl: "Dodajesz +1k8 do jednego rzutu obrażeń każdego zaklęcia Artefaktora rzucanego przez swoją różdżkę/kostur.", desc_en: "Add 1d8 to one damage roll of any Artificer spell cast through your Arcane Firearm." }
      ]
    },
    "battle-smith": {
      spells_by_level: { 3: ["shield", "heroism"], 5: ["aid"], 9: ["aura-of-vitality"], 13: ["banishment"], 17: ["mass-heal"] },
      features: [
        { level: 3, name_pl: "Gotowość Bojowa (Ataki bronią z INT)", name_en: "Battle Ready", action_type: "Atak (INT)", roll: "1d20", use_ability_mod: "INT", use_prof: true, roll_label: "Atak Magiczną Bronią (INT)", desc_pl: "Używasz modyfikatora z Inteligencji (zamiast Siły lub Zręczności) do rzutów ataku i obrażeń magiczną bronią!", desc_en: "Use your Intelligence modifier instead of STR or DEX for attack and damage rolls with magic weapons." },
        { level: 3, name_pl: "Stalowy Obrońca: Rozdzierające Uderzenie", name_en: "Steel Defender: Force-Empowered Rend", action_type: "Akcja dodatkowa", roll: "1d8+3", roll_label: "Atak Stalowego Obrońcy (Mocy)", desc_pl: "Twój wierny konstrukt (PW = 2 + INT + 5 × poziom) atakuje w akcji dodatkowej za 1k8 + biegłość obrażeń od mocy oraz w reakcji narzuca Utrudnienie atakującemu!", desc_en: "Command your Steel Defender as a bonus action to deal 1d8 + PB force damage, and Deflect Attack reaction imposes disadvantage." },
        { level: 9, name_pl: "Arkaniczny Impuls (Arcane Jolt)", name_en: "Arcane Jolt", action_type: "Przy trafieniu", roll: "2d6", roll_label: "Arkaniczny Impuls (2k6 obr. / leczenia)", desc_pl: "Przy trafieniu bronią lub atakiem Stalowego Obrońcy zadajesz dodatkowe 2k6 obrażeń od mocy LUB leczysz wybranego sojusznika w 30 ft za 2k6 PW (4k6 od 15 poz.)!", desc_en: "When you or your Steel Defender hits, deal extra 2d6 force damage or restore 2d6 HP to an ally within 30 ft." }
      ]
    },

    // ======================== BARBARIAN ========================
    "berserker": {
      features: [
        { level: 3, name_pl: "Szał Bojowy (Frenzy — Atak w akcji dodatkowej)", name_en: "Frenzy", action_type: "Akcja dodatkowa", roll: "1d12+5", roll_label: "Atak w Szale (Frenzy)", desc_pl: "Podczas szału możesz w każdej turze wykonać pojedynczy atak bronią wręcz jako akcję dodatkową.", desc_en: "Make a single melee weapon attack as a bonus action on each of your turns while raging." },
        { level: 6, name_pl: "Bezmyślny Szał (Odporność na Zauroczenie i Przerażenie)", name_en: "Mindless Rage", action_type: "Pasywne w Szale", desc_pl: "Podczas szału nie możesz zostać Zauroczony ani Przerażony (a aktywne efekty zostają zawieszone).", desc_en: "You can't be charmed or frightened while raging." }
      ]
    },
    "totem-warrior": {
      features: [
        { level: 3, name_pl: "Duch Totemu: Niedźwiedź / Orzeł / Wilk", name_en: "Totem Spirit (Bear / Eagle / Wolf)", action_type: "W Szale", desc_pl: "Niedźwiedź: w szale masz Odporność na WSZYSTKIE obrażenia poza psychicznymi! Wilk: sojusznicy mają Ułatwienie w atakach wręcz przeciw wrogom obok Ciebie.", desc_en: "Bear: Resistance to all damage except psychic while raging! Wolf: Allies have advantage on melee attacks against enemies within 5 ft of you." }
      ]
    },
    "ancestral-guardian": {
      features: [
        { level: 3, name_pl: "Obrońcy Przodków (Utrudnienie dla wroga)", name_en: "Ancestral Protectors", action_type: "Przy trafieniu", desc_pl: "Pierwszy wróg trafiony w Twojej turze podczas szału ma Utrudnienie w atakach przeciw każdemu poza Tobą, a sojusznicy mają Odporność na zadawane przez niego obrażenia!", desc_en: "First creature you hit while raging has disadvantage on attacks against others, and allies have resistance to its damage." },
        { level: 6, name_pl: "Tarcza Duchów (Redukcja Obrażeń Sojusznika)", name_en: "Spirit Shield", action_type: "Reakcja", roll: "2d6", roll_label: "Tarcza Duchów (Redukcja obrażeń)", desc_pl: "Jako reakcja zmniejszasz obrażenia otrzymywane przez sojusznika w 30 stóp o 2k6 (3k6 od 10 poz., 4k6 od 14 poz.).", desc_en: "Reaction to reduce damage an ally within 30 ft takes by 2d6 (3d6 at 10th, 4d6 at 14th)." }
      ]
    },
    "zealot": {
      features: [
        { level: 3, name_pl: "Boska Furia (+1k6 + połowa poziomu)", name_en: "Divine Fury", action_type: "Raz na turę", roll: "1d6+3", roll_label: "Boska Furia (Światłość/Nekrotyczne)", desc_pl: "Podczas szału pierwszy trafiony wróg w każdej Twojej turze otrzymuje dodatkowe obrażenia od światłości lub nekrotyczne równe 1k6 + połowa Twojego poziomu Barbarzyńcy!", desc_en: "While raging, the first creature you hit on each of your turns takes extra radiant or necrotic damage equal to 1d6 + half your barbarian level." },
        { level: 6, name_pl: "Fanatyczne Skupienie (Przerzut rzutu obronnego)", name_en: "Fanatical Focus", action_type: "1/Szał", desc_pl: "Gdy nie zdasz rzutu obronnego podczas szału, możesz go natychmiast przerzucić!", desc_en: "Reroll a failed saving throw once per rage." }
      ]
    },
    "beast": {
      features: [
        { level: 3, name_pl: "Forma Bestii: Paszcza / Pazury / Ogon", name_en: "Form of the Beast", action_type: "Atak / Reakcja", roll: "1d8", roll_label: "Broń Bestii / Ogon (+1k8 KP)", desc_pl: "Pazury: dodatkowy atak 1k6 bez użycia akcji dodatkowej! Paszcza: 1k8 i leczysz PW równe premii z biegłości. Ogon: jako reakcja dodajesz +1k8 do swojej Klasy Pancerza!", desc_en: "Claws: extra 1d6 attack as part of Attack action; Bite: 1d8 + heal PB; Tail: reaction to add +1d8 to AC!" }
      ]
    },
    "wild-magic-barb": {
      features: [
        { level: 3, name_pl: "Dziki Przypływ (Tabela k8 efektów szału)", name_en: "Wild Surge (d8 Table)", action_type: "Start Szału", roll: "1d8", roll_label: "Tabela Dzikiej Magii Barbarzyńcy (k8)", desc_pl: "Rzuć k8 przy wejściu w szał (1: macki 1k12 nekrotyczne + Temp PW, 2: teleportacja 30 ft co turę, 3: eksplozja pixie, 4: broń staje się lekka/rzucana i zadaje obrażenia mocy, 5: odwet 1k6 mocy, 6: aura +1 KP dla całej drużyny, 7: trudny teren wokół Ciebie, 8: promień światła 1k6 i oślepienie).", desc_en: "Roll d8 when entering rage to trigger a powerful magical surge." },
        { level: 6, name_pl: "Wzmacniająca Magia (+1k3 do ataków / odnowa komórki)", name_en: "Bolstering Magic", action_type: "Akcja", roll: "1d3", roll_label: "Wzmacniająca Magia (+1k3)", desc_pl: "Dotykasz siebie lub sojusznika: cel dodaje +1k3 do wszystkich rzutów ataku i testów cech przez 10 minut LUB odzyskuje komórkę czaru kręgu 1k3!", desc_en: "Grant +1d3 to attack rolls and ability checks for 10 minutes or restore a d3-level spell slot." }
      ]
    },
    "giant": {
      features: [
        { level: 3, name_pl: "Chaos Giganta i Miażdżący Rzut", name_en: "Giant's Havoc", action_type: "W Szale", roll: "1d6", roll_label: "Żywiołowy Tasak (+1k6)", desc_pl: "Rośniesz do rozmiaru Dużego (Large), Twój zasięg wręcz rośnie o +5 stóp, a od 6. poziomu nasycasz broń żywiołem (+1k6 kwasu, zimna, ognia, grzmotu lub błyskawic, która wraca do dłoni po rzucie!).", desc_en: "Grow to Large size, gain +5 ft reach, and at level 6 infuse your weapon with +1d6 elemental damage and returning property." }
      ]
    },

    // ======================== BARD ========================
    "lore": {
      features: [
        { level: 3, name_pl: "Cięte Słowa (Cutting Words — odejmij kość wrogowi)", name_en: "Cutting Words", action_type: "Reakcja", roll: "1d8", roll_label: "Cięte Słowa (Odejmij od rzutu wroga)", desc_pl: "Gdy wróg w 60 ft wykonuje rzut ataku, test cechy lub rzut obrażeń, w reakcji rzucasz kością Inspiracji Barda i odejmujesz wynik od jego rzutu!", desc_en: "Reaction to roll a Bardic Inspiration die and subtract it from an enemy's attack roll, ability check, or damage roll." }
      ]
    },
    "valor": {
      features: [
        { level: 3, name_pl: "Inspiracja Bojowa (+Kość do Obrażeń lub KP)", name_en: "Combat Inspiration", action_type: "Kość Inspiracji", roll: "1d8", roll_label: "Inspiracja Bojowa (+Obrażenia / +KP)", desc_pl: "Zainspirowany sojusznik może dodać kość Inspiracji Barda do obrażeń bronią LUB w reakcji dodać ją do swojej Klasy Pancerza przeciw atakowi!", desc_en: "Inspired allies can add the Bardic Inspiration die to a weapon damage roll or as a reaction to their AC." }
      ]
    },
    "swords": {
      features: [
        { level: 3, name_pl: "Popis Ostrza: Obronny (+Kość do KP i Obrażeń)", name_en: "Blade Flourish (Defensive / Slashing / Mobile)", action_type: "Przy trafieniu", roll: "1d8", roll_label: "Popis Ostrza (+Obrażenia i +KP)", desc_pl: "Gdy trafisz atakiem, twoja szybkość rośnie o +10 ft i możesz wydać kość Inspiracji na Popis Obronny: zadajesz dodatkowe obrażenia równe wynikowi kości ORAZ dodajesz ten sam wynik do swojej Klasy Pancerza do następnej tury!", desc_en: "Add Bardic Inspiration die to weapon damage AND add the number rolled to your AC until the start of your next turn!" }
      ]
    },
    "eloquence": {
      features: [
        { level: 3, name_pl: "Srebrny Język (Min. 10 na k20 w Perswazji i Oszustwie)", name_en: "Silver Tongue", action_type: "Rzut gwarantowany", roll: "1d20", min_roll: 10, roll_label: "Srebrny Język (Min. 10 na k20)", desc_pl: "Każdy rzut 1–9 na kości k20 przy testach Perswazji i Oszustwa jest automatycznie traktowany jako 10!", desc_en: "Treat any d20 roll of 9 or lower on Persuasion or Deception checks as a 10!" },
        { level: 3, name_pl: "Niepokojące Słowa (Odejmij kość od rzutu obronnego wroga!)", name_en: "Unsettling Words", action_type: "Akcja dodatkowa", roll: "1d8", roll_label: "Niepokojące Słowa (-Kość do Rzutu Obronnego)", desc_pl: "Jako akcja dodatkowa rzucasz kością Inspiracji Barda — wybrany wróg musi odjąć ten wynik od następnego rzutu obronnego przed Twoją kolejną turą!", desc_en: "Bonus action to roll Bardic Inspiration and subtract the result from the target's next saving throw." }
      ]
    },
    "glamour": {
      features: [
        { level: 3, name_pl: "Płaszcz Inspiracji (Tymczasowe PW + Darmowy Ruch dla Drużyny)", name_en: "Mantle of Inspiration", action_type: "Akcja dodatkowa", desc_pl: "Wydajesz 1 Inspirację Barda: do CHA sojuszników zyskuje tymczasowe PW (5 -> 8 -> 11 -> 14) i może natychmiast w reakcji przemieścić się o pełną szybkość BEZ prowokowania ataków okazyjnych!", desc_en: "Spend Bardic Inspiration to grant CHA allies temporary HP and immediate reaction movement without opportunity attacks." }
      ]
    },
    "whispers": {
      features: [
        { level: 3, name_pl: "Psychiczne Ostrza (+2k6 do +8k6 obrażeń psychicznych)", name_en: "Psychic Blades", action_type: "Przy trafieniu", roll: "3d6", roll_label: "Psychiczne Ostrza (Obrażenia Psychiczne)", desc_pl: "Gdy trafisz bronią, możesz wydać Inspirację Barda, aby zadać dodatkowe obrażenia psychiczne: 2k6 (od 3 poz.), 3k6 (od 5 poz.), 5k6 (od 10 poz.), 8k6 (od 15 poz.)!", desc_en: "Expend Bardic Inspiration on a weapon hit to deal extra 2d6 to 8d6 psychic damage." }
      ]
    },

    // ======================== CLERIC ========================
    "life": {
      spells_by_level: { 1: ["bless", "cure-wounds"], 3: ["lesser-restoration", "spiritual-weapon"], 5: ["revivify"], 7: ["death-ward"], 9: ["raise-dead"] },
      features: [
        { level: 1, name_pl: "Uczeń Życia (+2 + Krąg Czaru do każdego leczenia)", name_en: "Disciple of Life", action_type: "Pasywne Leczenie", desc_pl: "Każde Twoje zaklęcie leczące (1. kręgu lub wyższego) przywraca dodatkowe PW równe 2 + krąg zaklęcia!", desc_en: "Your healing spells restore additional hit points equal to 2 + the spell's level." },
        { level: 2, name_pl: "Kanalizowanie Boskości: Zachowanie Życia (5 × Poz. PW)", name_en: "Channel Divinity: Preserve Life", action_type: "Akcja", desc_pl: "Przywracasz łącznie 5 × poziom Kleryka Punktów Wytrzymałości rozdzielonych pomiędzy sojuszników w promieniu 30 stóp (do połowy ich maks. PW).", desc_en: "Restore 5 x cleric level HP divided among creatures within 30 feet (up to half their max HP)." }
      ]
    },
    "light": {
      spells_by_level: { 1: ["faerie-fire"], 3: ["scorching-ray"], 5: ["fireball"], 7: ["wall-of-force"] },
      features: [
        { level: 1, name_pl: "Rozbłysk Ochronny (Warding Flare — Utrudnienie dla wroga)", name_en: "Warding Flare", action_type: "Reakcja", desc_pl: "Gdy jesteś atakowany, używasz reakcji (MĄD razy dziennie), aby rozbłysnąć światłem i narzucić atakującemu Utrudnienie!", desc_en: "Reaction when attacked to impose disadvantage on the attack roll (WIS times per long rest)." },
        { level: 2, name_pl: "Kanalizowanie Boskości: Blask Świtu (2k10 + Poziom)", name_en: "Radiance of the Dawn", action_type: "Akcja", roll: "2d10+5", roll_label: "Blask Świtu (Światłość w 30 ft)", desc_pl: "Rozprasza magiczną ciemność i zadaje każdemu wybranemu wrogowi w promieniu 30 stóp 2k10 + poziom Kleryka obrażeń od światłości (rzut na KON o połowę)!", desc_en: "Dispel magical darkness and deal 2d10 + cleric level radiant damage to hostile creatures within 30 feet." }
      ]
    },
    "tempest": {
      spells_by_level: { 1: ["thunderwave"], 3: ["shatter"], 5: ["call-lightning"], 9: ["destructive-wave"] },
      features: [
        { level: 1, name_pl: "Gniew Burzy (2k8 obrażeń w reakcji)", name_en: "Wrath of the Storm", action_type: "Reakcja", roll: "2d8", roll_label: "Gniew Burzy (2k8 Błyskawice/Grzmot)", desc_pl: "Gdy wróg w 5 ft trafi Cię atakiem, w reakcji zadajesz mu 2k8 obrażeń od błyskawic lub grzmotu (rzut na ZRĘ o połowę).", desc_en: "Reaction when hit by an attacker within 5 ft to deal 2d8 lightning or thunder damage." },
        { level: 2, name_pl: "Kanalizowanie Boskości: Niszczycielski Gniew (Maksymalne obrażenia!)", name_en: "Destructive Wrath", action_type: "Przy rzucie obrażeń", desc_pl: "Gdy zadajesz obrażenia od błyskawic lub grzmotu, możesz użyć Kanalizowania Boskości, aby zadać MAKSYMALNE możliwe obrażenia zamiast rzucać kośćmi!", desc_en: "When you roll lightning or thunder damage, use Channel Divinity to deal maximum damage instead of rolling!" }
      ]
    },
    "twilight": {
      spells_by_level: { 1: ["faerie-fire", "sleep"], 5: ["aura-of-vitality", "leomunds-tiny-hut"], 7: ["greater-invisibility"] },
      features: [
        { level: 1, name_pl: "Błogosławieństwo Czujności (Ułatwienie do Inicjatywy)", name_en: "Vigilant Blessing", action_type: "Pasywne / Buff", desc_pl: "Dajesz sobie lub wybranemu sojusznikowi stałe Ułatwienie w następnym rzucie na Inicjatywę + Widzenie w ciemności na 300 stóp dla całej drużyny!", desc_en: "Grant yourself or an ally advantage on the next Initiative roll, plus 300 ft Darkvision shared with allies." },
        { level: 2, name_pl: "Sanktuarium Zmierzchu (1k6 + Poziom Temp PW co turę!)", name_en: "Twilight Sanctuary", action_type: "Akcja (Aura 30 ft)", roll: "1d6+5", roll_label: "Sanktuarium Zmierzchu (Tymczasowe PW)", desc_pl: "Przez 1 minutę roztaczasz aurę 30 stóp. Na końcu tury każdego sojusznika (i Twojej!) dajesz mu 1k6 + poziom Kleryka tymczasowych PW LUB zdejmujesz z niego Zauroczenie/Przerażenie (bez koncentracji!)!", desc_en: "30-ft aura granting 1d6 + cleric level temporary HP OR ending charmed/frightened at the end of each ally's turn!" }
      ]
    },
    "peace": {
      spells_by_level: { 1: ["heroism"], 3: ["aid"], 7: ["greater-invisibility"] },
      features: [
        { level: 1, name_pl: "Więź Pokrzepienia (Emboldening Bond: +1k4 co turę)", name_en: "Emboldening Bond", action_type: "Rzut +1k4", roll: "1d4", roll_label: "Więź Pokrzepienia (+1k4)", desc_pl: "Łączysz drużynę na 10 minut (bez koncentracji!): każdy związany sojusznik może raz w każdej turze dodać +1k4 do rzutu ataku, testu cechy lub rzutu obronnego!", desc_en: "Bonded allies within 30 ft can roll 1d4 and add it to an attack roll, ability check, or saving throw once per turn." },
        { level: 2, name_pl: "Balsam Pokoju (Leczenie 2k6 + MĄD w ruchu)", name_en: "Balm of Peace", action_type: "Akcja", roll: "2d6+4", roll_label: "Balsam Pokoju (Leczenie)", desc_pl: "Przemieszczasz się o pełną szybkość bez ataków okazyjnych i leczysz każdego mijanego sojusznika za 2k6 + MĄD PW!", desc_en: "Move up to your speed without opportunity attacks and heal each ally you pass within 5 ft for 2d6 + WIS HP." }
      ]
    },
    "forge": {
      ac_bonus_passive: 1,
      spells_by_level: { 1: ["shield-of-faith"], 3: ["heat-metal"], 5: ["spirit-guardians"], 9: ["animate-objects"] },
      features: [
        { level: 1, name_pl: "Błogosławieństwo Kuźni (+1 KP lub +1 Broń Magiczna)", name_en: "Blessing of the Forge", action_type: "Pasywne (+1 KP)", desc_pl: "Po długim odpoczynku nasycasz 1 pancerz (+1 do KP — automatycznie doliczone!) lub 1 broń (+1 do trafienia i obrażeń).", desc_en: "Imbue one suit of armor (+1 AC) or one weapon (+1 attack/damage) after each long rest." }
      ]
    },
    "war": {
      features: [
        { level: 1, name_pl: "Kapłan Wojny (Dodatkowy atak w akcji dodatkowej)", name_en: "War Priest", action_type: "Akcja dodatkowa", desc_pl: "Gdy wykonujesz akcję Ataku, możesz wykonać 1 dodatkowy atak bronią w akcji dodatkowej (MĄD razy dziennie).", desc_en: "Make one weapon attack as a bonus action when you take the Attack action (WIS times/long rest)." },
        { level: 2, name_pl: "Prowadzone Uderzenie (+10 do trafienia!)", name_en: "Guided Strike", action_type: "Kanalizowanie Boskości", desc_pl: "Po wykonaniu rzutu ataku możesz użyć Kanalizowania Boskości, aby dodać +10 do wyniku rzutu!", desc_en: "Add a +10 bonus to an attack roll after seeing the roll." }
      ]
    },
    "grave": {
      features: [
        { level: 1, name_pl: "Krąg Śmiertelności (Maksymalne leczenie na 0 PW)", name_en: "Circle of Mortality", action_type: "Pasywne + Sztuczka", desc_pl: "Zaklęcia leczące rzucane na sojusznika mającego 0 PW automatycznie przywracają MAKSYMALNĄ liczbę PW na kościach! Ponadto znasz Spare the Dying jako akcję dodatkową na 30 stóp.", desc_en: "Spells restoring HP to a creature at 0 HP automatically use the highest number possible for each die." },
        { level: 2, name_pl: "Ścieżka do Grobu (Podwójne obrażenia dla wroga!)", name_en: "Path to the Grave", action_type: "Akcja", desc_pl: "Wskazana istota w 30 stóp ma Wrażliwość (Vulnerability — podwójne obrażenia!) na wszystkie obrażenia z następnego trafionego ataku Twojego lub sojusznika!", desc_en: "Curse a creature within 30 ft to have Vulnerability (2x damage!) to all of the next attack's damage." }
      ]
    },

    // ======================== DRUID ========================
    "moon": {
      features: [
        { level: 2, name_pl: "Bojowy Dziki Kształt (Leczenie w formie Bestii)", name_en: "Combat Wild Shape", action_type: "Akcja dodatkowa", roll: "1d8", roll_label: "Leczenie w Dzikim Kształcie (1k8/krąg)", desc_pl: "Przemieniasz się w bestię o SW = Poziom/3 (SW 1 od 2 poz., np. Niedźwiedź Brunatny 34 PW) jako akcję dodatkową i możesz wydawać komórki czarów na leczenie 1k8 PW za krąg.", desc_en: "Wild Shape as a bonus action into beasts up to CR 1 (later level/3), and expend spell slots to heal 1d8 HP per slot level." }
      ]
    },
    "stars": {
      spells_by_level: { 2: ["guidance", "guiding-bolt"] },
      features: [
        { level: 2, name_pl: "Gwiezdna Forma: Łucznik (Atak w akcji dodatkowej)", name_en: "Starry Form: Archer", action_type: "Akcja dodatkowa", roll: "1d8+4", roll_label: "Świetlisty Strzał Łucznika (1k8+MĄD)", desc_pl: "W Gwiezdnej Formie Łucznika w każdej turze jako akcję dodatkową wykonujesz dystansowy atak czarem (60 stóp) zadający 1k8 + MĄD obrażeń od światłości!", desc_en: "Bonus action ranged spell attack (60 ft) dealing 1d8 + WIS radiant damage each turn." },
        { level: 2, name_pl: "Gwiezdna Forma: Kielich (+1k8+MĄD dodatkowego leczenia)", name_en: "Starry Form: Chalice", action_type: "Przy leczeniu", roll: "1d8+4", roll_label: "Kielich Gwiazd (Dodatkowe Leczenie)", desc_pl: "Za każdym razem, gdy rzucasz zaklęcie leczące używające komórki, Ty lub inna istota w 30 ft odzyskuje dodatkowo 1k8 + MĄD PW!", desc_en: "Whenever you cast a healing spell using a slot, restore an additional 1d8 + WIS HP to a creature within 30 ft." },
        { level: 2, name_pl: "Gwiezdna Forma: Smok (Min. 10 na Koncentrację!)", name_en: "Starry Form: Dragon", action_type: "Pasywne w Formie", desc_pl: "Każdy wynik 1–9 na kości k20 przy rzutach obronnych na Kondycję w celu utrzymania Koncentracji (oraz testach INT i MĄD) jest traktowany jako 10!", desc_en: "Treat any d20 roll of 9 or lower on CON saves to maintain Concentration (and INT/WIS checks) as a 10!" }
      ]
    },
    "wildfire": {
      features: [
        { level: 2, name_pl: "Duch Dzikiego Ognia: Płomienne Nasienie & Ognista Teleportacja", name_en: "Summon Wildfire Spirit", action_type: "Akcja dodatkowa", roll: "1d6+3", roll_label: "Atak / Teleportacja Ducha Ognia", desc_pl: "W akcji dodatkowej Duch Ognia strzela (1k6+biegłość ognia) LUB teleportuje Ciebie i wszystkich sojuszników obok siebie na 15 stóp bez ataków okazyjnych (zadając wrogom 1k6+biegłość ognia)!", desc_en: "Bonus action for your Wildfire Spirit to attack or teleport you and nearby allies 15 ft every turn!" }
      ]
    },
    "spores": {
      features: [
        { level: 2, name_pl: "Symbiotyczna Istota (+4 Temp PW za każdy poziom Druida!)", name_en: "Symbiotic Entity", action_type: "Akcja", roll: "1d6", roll_label: "Obrażenia Zarodników (+1k6 Nekrotyczne)", desc_pl: "Wydajesz Dziki Kształt, aby zyskać aż 4 × poziom Druida Tymczasowych PW, podwójne obrażenia Aury Zarodników oraz +1k6 obrażeń nekrotycznych do każdego trafienia wręcz!", desc_en: "Gain 4 temporary HP per druid level, double Halo of Spores damage, and +1d6 necrotic damage on melee hits." }
      ]
    },

    // ======================== FIGHTER ========================
    "battle-master": {
      features: [
        { level: 3, name_pl: "Manewry Bojowe (Kość Górowania k8 / k10 / k12)", name_en: "Combat Superiority Maneuvers", action_type: "Kość Górowania", roll: "1d8", roll_label: "Kość Górowania (Manewr Bitewny)", desc_pl: "4 kości k8 (5 na 7 poz., k10 na 10 poz., k12 na 18 poz.) odnawiane po Krótkim Odpoczynku: Precyzyjny Atak (+k8 do trafienia), Powalający Atak (+k8 obrażeń i powalenie), Riposta (atak w reakcji), Groźny Atak (+k8 i przerażenie).", desc_en: "Spend Superiority Dice (d8/d10/d12) on Precision Attack, Trip Attack, Riposte, Menacing Attack, and Ambush." }
      ]
    },
    "eldritch-knight": {
      spells_by_level: { 3: ["booming-blade", "green-flame-blade", "shield", "absorb-elements", "find-familiar"], 7: ["misty-step", "shadow-blade"], 13: ["haste", "counterspell"] },
      features: [
        { level: 3, name_pl: "Więź z Bronią (Przywołanie broni w akcji dodatkowej)", name_en: "Weapon Bond", action_type: "Akcja dodatkowa", desc_pl: "Nie możesz zostać rozbrojony ze swojej związanej broni i możesz teleportować ją do swojej dłoni jako akcję dodatkową.", desc_en: "Cannot be disarmed of your bonded weapon and can summon it to your hand as a bonus action." },
        { level: 7, name_pl: "Magia Wojenna (Sztuczka + Atak bronią w akcji dodatkowej)", name_en: "War Magic", action_type: "Akcja + Bonus", desc_pl: "Gdy użyjesz akcji na rzucenie Sztuczki (np. Booming Blade), możesz wykonać 1 atak bronią jako akcję dodatkową!", desc_en: "When you use your action to cast a cantrip, you can make one weapon attack as a bonus action." }
      ]
    },
    "champion": {
      features: [
        { level: 3, name_pl: "Ulepszony Krytyk (Trafienie krytyczne na 19–20!)", name_en: "Improved Critical", action_type: "Atak k20 (Kryt 19-20)", roll: "1d20", roll_label: "Atak Czempiona (Krytyk na 19-20)", desc_pl: "Twoje ataki bronią trafiają krytycznie przy wyrzuceniu 19 lub 20 na kości k20 (a od 15. poziomu przy 18, 19 lub 20)!", desc_en: "Your weapon attacks score a critical hit on a roll of 19 or 20 (18–20 at 15th level)." }
      ]
    },
    "echo-knight": {
      features: [
        { level: 3, name_pl: "Manifestacja Echa & Wyzwolenie Inkarnacji", name_en: "Manifest Echo & Unleash Incarnation", action_type: "Dodatkowy Atak", desc_pl: "W akcji dodatkowej tworzysz Echo (lub zamieniasz się z nim miejscami za 15 ft ruchu). Podczas akcji Ataku możesz wyprowadzić dodatkowy atak wręcz z pozycji Echa (KON razy dziennie)!", desc_en: "Summon or swap places with your Echo as a bonus action, and make an additional melee attack from the Echo's position (CON times/long rest)." }
      ]
    },
    "rune-knight": {
      features: [
        { level: 3, name_pl: "Potęga Giganta (Rozmiar Duży + 1k6 obrażeń)", name_en: "Giant's Might", action_type: "Akcja dodatkowa", roll: "1d6", roll_label: "Potęga Giganta (+1k6 obrażeń)", desc_pl: "W akcji dodatkowej na 1 minutę rośniesz do rozmiaru Dużego (Large), masz Ułatwienie w testach i rzutach obronnych na Siłę oraz zadajesz +1k6 obrażeń raz na turę!", desc_en: "Bonus action to become Large, gain advantage on STR checks/saves, and deal +1d6 damage once per turn." },
        { level: 3, name_pl: "Runy Gigantów: Runa Chmur (Przekierowanie ataku!) & Ognia (2k6)", name_en: "Rune Carver (Cloud & Fire Rune)", action_type: "Reakcja / Atak", roll: "2d6", roll_label: "Ogniste Kajdany Runy Ognia (2k6)", desc_pl: "Runa Chmur: w reakcji przekierowujesz trafiony atak wroga (nawet krytyczny!) w innego wroga w 30 ft! Runa Ognia: unieruchamia cel w ognistych kajdanach zadających 2k6 ognia co turę.", desc_en: "Cloud Rune redirects a hit to another creature within 30 ft; Fire Rune restrains a target and deals 2d6 fire damage per turn." }
      ]
    },
    "samurai": {
      features: [
        { level: 3, name_pl: "Duch Walki (Ułatwienie we WSZYSTKICH atakach + Temp PW)", name_en: "Fighting Spirit", action_type: "Akcja dodatkowa", desc_pl: "Jako akcja dodatkowa dajesz sobie Ułatwienie we wszystkich rzutach ataku bronią w tej turze (doskonałe z Action Surge!) oraz zyskujesz 5 -> 10 -> 15 tymczasowych PW.", desc_en: "Bonus action to give yourself advantage on all weapon attack rolls until the end of the current turn plus temporary HP." }
      ]
    },
    "psi-warrior": {
      features: [
        { level: 3, name_pl: "Psioniczne Uderzenie & Pole Ochronne (Kość + INT)", name_en: "Psionic Strike & Protective Field", action_type: "Atak / Reakcja", roll: "1d8+3", roll_label: "Psioniczne Uderzenie / Tarcza (k8+INT)", desc_pl: "Zadajesz dodatkowe 1k6/1k8/1k10 + INT obrażeń od mocy przy trafieniu LUB jako reakcja redukujesz obrażenia otrzymane przez siebie lub sojusznika w 30 ft o kość + INT!", desc_en: "Spend a Psionic Energy die to deal extra force damage on a hit or reduce damage taken by an ally within 30 ft." }
      ]
    },

    // ======================== MONK ========================
    "open-hand": {
      features: [
        { level: 3, name_pl: "Technika Otwartej Dłoni (Powalenie, Odepchnięcie 15 ft, Brak reakcji)", name_en: "Open Hand Technique", action_type: "Przy Gradzie Ciosów", desc_pl: "Każde trafienie z Gradu Ciosów (Flurry of Blows) może powalić cel (rzut na ZRĘ), odepchnąć go na 15 stóp (rzut na SIŁ) lub odebrać mu reakcje bez rzutu obronnego!", desc_en: "Hits with Flurry of Blows knock prone, push 15 ft, or prevent reactions." },
        { level: 6, name_pl: "Pełnia Ciała (Leczenie 3 × Poziom PW)", name_en: "Wholeness of Body", action_type: "Akcja", desc_pl: "Raz dziennie jako akcja leczysz się za 3 × Twój poziom Mnicha Punktów Wytrzymałości.", desc_en: "As an action, regain hit points equal to three times your monk level (1/long rest)." }
      ]
    },
    "mercy": {
      features: [
        { level: 3, name_pl: "Dłoń Leczenia (Kość Sztuk Walki + MĄD)", name_en: "Hand of Healing", action_type: "1 Ki / Grad Ciosów", roll: "1d6+4", roll_label: "Dłoń Leczenia (Kość + MĄD)", desc_pl: "Wydajesz 1 Ki (lub zastępujesz 1 atak z Gradu Ciosów bez dodatkowego kosztu!), aby uleczyć istotę za kość Sztuk Walki + MĄD (od 6 poz. zdejmuje też zatrucie, paraliż i ogłuszenie!).", desc_en: "Spend 1 Ki or replace a Flurry of Blows strike to heal for Martial Arts die + WIS modifier." },
        { level: 3, name_pl: "Dłoń Krzywdy (+Kość + MĄD nekrotyczne + Zatrucie bez rzutu!)", name_en: "Hand of Harm", action_type: "1 Ki przy trafieniu", roll: "1d6+4", roll_label: "Dłoń Krzywdy (Obrażenia Nekrotyczne)", desc_pl: "Raz na turę przy trafieniu bez broni zadajesz dodatkowe obrażenia nekrotyczne równe kości Sztuk Walki + MĄD (od 6. poziomu automatycznie nakłada stan Zatruty bez żadnego rzutu obronnego!).", desc_en: "Deal extra necrotic damage equal to Martial Arts die + WIS (and automatically Poison the target starting at level 6 with no save!)." }
      ]
    },
    "shadow": {
      spells_by_level: { 3: ["minor-illusion", "pass-without-trace", "silence"] },
      features: [
        { level: 6, name_pl: "Krok w Cieniu (Teleportacja 60 stóp + Ułatwienie)", name_en: "Shadow Step", action_type: "Akcja dodatkowa", desc_pl: "W akcji dodatkowej teleportujesz się za darmo na 60 stóp z jednego cienia/ciemności do drugiego i zyskujesz Ułatwienie w pierwszym ataku wręcz w tej turze!", desc_en: "Bonus action to teleport 60 ft between dim light/darkness and gain advantage on your next melee attack." }
      ]
    },
    "kensei": {
      toggle_buff: { id: "agile_parry", name_pl: "Zwinne Parowanie Kensei (+2 do KP)", bonus_ac: 2 },
      features: [
        { level: 3, name_pl: "Zwinne Parowanie (+2 KP) & Strzał Kensei (+1k4)", name_en: "Agile Parry & Kensei's Shot", action_type: "Pasywne / Bonus", roll: "1d4", roll_label: "Strzał Kensei (+1k4)", desc_pl: "Wykonując uderzenie bez broni podczas trzymania broni Kensei, zyskujesz +2 do Klasy Pancerza do następnej tury! W akcji dodatkowej dodajesz +1k4 do wszystkich strzałów z łuku.", desc_en: "Gain +2 AC when making an unarmed strike while holding a melee Kensei weapon, or bonus action for +1d4 ranged weapon damage." }
      ]
    },

    // ======================== PALADIN ========================
    "vengeance": {
      spells_by_level: { 3: ["hunters-mark"], 5: ["hold-person", "misty-step"], 9: ["haste"], 13: ["banishment", "dimension-door"] },
      features: [
        { level: 3, name_pl: "Ślub Wrogości (Vow of Enmity — Ułatwienie przez 1 min)", name_en: "Channel Divinity: Vow of Enmity", action_type: "Akcja dodatkowa", desc_pl: "Jako akcja dodatkowa składasz ślub przeciw istocie w 10 stóp: masz UŁATWIENIE we wszystkich rzutach ataku przeciw niej przez 1 minutę (odnawia się po Krótkim Odpoczynku)!", desc_en: "Bonus action to gain Advantage on attack rolls against a creature within 10 feet for 1 minute." }
      ]
    },
    "devotion": {
      spells_by_level: { 3: ["shield-of-faith"], 5: ["lesser-restoration"], 9: ["dispel-magic"], 13: ["death-ward"] },
      features: [
        { level: 3, name_pl: "Święta Broń (+CHA do trafienia bronią przez 1 min)", name_en: "Sacred Weapon", action_type: "Kanalizowanie Boskości", desc_pl: "Dodajesz swój modyfikator z Charyzmy do wszystkich rzutów ataku tą bronią (łączy się ze zwykłym modyfikatorem z Siły!), a broń świeci i staje się magiczna.", desc_en: "Add your Charisma modifier to attack rolls made with your weapon for 1 minute." }
      ]
    },
    "ancients": {
      spells_by_level: { 3: ["entangle"], 5: ["misty-step"] },
      features: [
        { level: 7, name_pl: "Aura Strażnika (Odporność na WSZYSTKIE obrażenia od zaklęć!)", name_en: "Aura of Warding", action_type: "Aura Pasywna (10 ft)", desc_pl: "Ty oraz wszyscy sojusznicy w promieniu 10 stóp posiadacie Odporność (połowa obrażeń!) na wszelkie obrażenia zadawane przez zaklęcia!", desc_en: "You and friendly creatures within 10 feet have resistance to damage from spells!" }
      ]
    },
    "conquest": {
      spells_by_level: { 3: ["armor-of-agathys", "command"], 5: ["hold-person", "spiritual-weapon"] },
      features: [
        { level: 3, name_pl: "Zdobywcza Obecność (Masowe Przerażenie w 30 ft)", name_en: "Conquering Presence", action_type: "Kanalizowanie Boskości", desc_pl: "Każdy wybrany wróg w promieniu 30 stóp wykonuje rzut obronny na Mądrość albo zostaje Przerażony na 1 minutę (od 7. poziomu jego szybkość w Twojej aurze spada do 0!).", desc_en: "Force chosen creatures within 30 feet to make a WIS save or become Frightened for 1 minute (speed reduced to 0 at level 7)." }
      ]
    },
    "watchers": {
      init_prof_at_level: 7,
      spells_by_level: { 5: ["pass-without-trace"], 9: ["counterspell"], 13: ["banishment"] },
      features: [
        { level: 7, name_pl: "Aura Czujnego Strażnika (+Biegłość do Inicjatywy dla drużyny!)", name_en: "Aura of the Sentinel", action_type: "Aura Pasywna (+PB Init)", desc_pl: "Ty i sojusznicy w promieniu 10 stóp dodajecie Twoją premię z biegłości (+3 do +6) do rzutów na Inicjatywę (automatycznie doliczone na karcie!).", desc_en: "You and allies within 10 feet gain a bonus to Initiative rolls equal to your proficiency bonus." }
      ]
    },

    // ======================== RANGER ========================
    "gloom-stalker": {
      init_ability: "WIS",
      spells_by_level: { 3: ["disguise-self"], 9: ["fear"], 13: ["greater-invisibility"] },
      features: [
        { level: 3, name_pl: "Czatownik Grozy (+MĄD do Inicjatywy, +1 Atak i +1k8 w 1. turze)", name_en: "Dread Ambusher", action_type: "1. Tura Walki", roll: "1d8", roll_label: "Czatownik Grozy (+1k8 obrażeń w 1. turze)", desc_pl: "Dodajesz Mądrość do Inicjatywy (automatycznie doliczone!). W 1. turze każdej walki masz +10 ft szybkości i wykonujesz dodatkowy atak bronią zadający +1k8 obrażeń!", desc_en: "Add WIS to Initiative; on turn 1, gain +10 ft speed and make an extra weapon attack dealing +1d8 damage." },
        { level: 3, name_pl: "Wzrok Mroku (Niewidzialność w ciemności!)", name_en: "Umbral Sight", action_type: "Pasywne", desc_pl: "Zyskujesz Widzenie w ciemności (+30 ft), a przebywając w ciemności jesteś całkowicie NIEWIDZIALNY dla każdej istoty polegającej na widzeniu w ciemności!", desc_en: "While in darkness, you are Invisible to any creature that relies on darkvision to see you in that darkness!" }
      ]
    },
    "hunter": {
      features: [
        { level: 3, name_pl: "Pogromca Kolosów (+1k8 obrażeń raz na turę)", name_en: "Colossus Slayer", action_type: "Raz na turę", roll: "1d8", roll_label: "Pogromca Kolosów (+1k8)", desc_pl: "Raz w każdej swojej turze, gdy trafisz bronią istotę mającą mniej niż maksymalne PW, zadajesz jej dodatkowe 1k8 obrażeń!", desc_en: "Once per turn, deal an extra 1d8 weapon damage to a target that is below its hit point maximum." }
      ]
    },
    "fey-wanderer": {
      spells_by_level: { 5: ["misty-step"], 9: ["dispel-magic"], 13: ["dimension-door"] },
      features: [
        { level: 3, name_pl: "Upiorne Uderzenia (+1k4 obrażeń psychicznych na cel)", name_en: "Dreadful Strikes", action_type: "Przy trafieniu", roll: "1d4", roll_label: "Upiorne Uderzenia (Obrażenia Psychiczne)", desc_pl: "Każdy trafiony cel może otrzymać raz na turę dodatkowe 1k4 obrażeń psychicznych (1k6 od 11 poz.). Ponadto dodajesz swój modyfikator z Mądrości do WSZYSTKICH testów Charyzmy!", desc_en: "Deal extra 1d4 psychic damage once per turn per target, and add your Wisdom modifier to all Charisma checks!" }
      ]
    },
    "swarmkeeper": {
      spells_by_level: { 3: ["mage-hand", "faerie-fire"], 5: ["web"], 9: ["fly"] },
      features: [
        { level: 3, name_pl: "Zebrany Rój (+1k6 kłute lub Przesunięcie o 15 stóp)", name_en: "Gathered Swarm", action_type: "Raz na turę", roll: "1d6", roll_label: "Atak Roju (+1k6 kłute)", desc_pl: "Raz na turę po trafieniu atakiem rój zadaje celowi +1k6 obrażeń kłutych, przesuwa go o 15 stóp (rzut na SIŁ) lub przesuwa Ciebie o 5 stóp.", desc_en: "Once per turn on a hit, deal 1d6 piercing damage, move the target 15 ft, or move yourself 5 ft." }
      ]
    },

    // ======================== ROGUE ========================
    "arcane-trickster": {
      spells_by_level: { 3: ["mage-hand", "minor-illusion", "booming-blade", "silvery-barbs", "find-familiar"], 7: ["shadow-blade", "invisibility", "mirror-image"] },
      features: [
        { level: 3, name_pl: "Sztuczki Dłonią Maga (Niewidzialna Dłoń w akcji dodatkowej)", name_en: "Mage Hand Legerdemain", action_type: "Akcja dodatkowa", desc_pl: "Twoja Dłoń Maga jest niewidzialna i w akcji dodatkowej pozwala otwierać zamki wytrychami oraz okradać kieszenie na dystans 30 stóp.", desc_en: "Make your Mage Hand invisible and control it as a bonus action to pick locks and pockets." }
      ]
    },
    "swashbuckler": {
      init_ability: "CHA",
      features: [
        { level: 3, name_pl: "Zuchwała Śmiałość (+CHA do Inicjatywy i Pojedynkowy Ukradkowy Atak)", name_en: "Rakish Audacity & Fancy Footwork", action_type: "Atak Ukradkowy", roll: "3d6", roll_label: "Pojedynkowy Ukradkowy Atak", desc_pl: "Dodajesz Charyzmę do Inicjatywy (automatycznie doliczone!), nie potrzebujesz sojusznika obok celu, aby odpalić Ukradkowy Atak w walce 1-na-1, a zaatakowany wróg nie może wykonać przeciw Tobie ataku okazyjnego!", desc_en: "Add CHA to Initiative, trigger Sneak Attack in 1v1 duels, and targets you attack can't make opportunity attacks against you." }
      ]
    },
    "assassin": {
      features: [
        { level: 3, name_pl: "Zamach (Assassinate — Automatyczny Krytyk z Zaskoczenia!)", name_en: "Assassinate", action_type: "1. Tura Walki", roll: "6d6", roll_label: "Krytyczny Zamach (Podwójny Ukradkowy Atak)", desc_pl: "Masz Ułatwienie w rzutach ataku przeciw każdej istocie, która jeszcze nie miała tury w walce, a każde trafienie przeciw zaskoczonej istocie jest automatycznym TRAFIENIEM KRYTYCZNYM!", desc_en: "Advantage against creatures that haven't taken a turn yet, and any hit against a surprised creature is a critical hit!" }
      ]
    },
    "soulknife": {
      features: [
        { level: 3, name_pl: "Psioniczne Ostrza (1k6 wręcz + 1k4 w akcji dodatkowej)", name_en: "Psychic Blades", action_type: "Atak + Bonus", roll: "1d6+1d4", roll_label: "Psioniczne Ostrza (1k6 + 1k4 Psychiczne)", desc_pl: "Atakujesz ostrzem czystej energii psychicznej (finezyjne, rzucane 60 ft, 1k6 + ZRĘ) i natychmiast rzucasz drugim ostrzem 1k4 + ZRĘ w akcji dodatkowej (oba odpalają Ukradkowy Atak!).", desc_en: "Attack with a 1d6 psychic blade (60 ft range) and make a 1d4 bonus action psychic blade attack." },
        { level: 3, name_pl: "Wsparcie Psioniczne (Psi-Bolstered Knack: +Kość do nieudanego testu)", name_en: "Psi-Bolstered Knack", action_type: "Przy porażce testu", roll: "1d6", roll_label: "Wsparcie Psioniczne (+k6/k8/k10 do umiejętności)", desc_pl: "Gdy nie zdasz testu umiejętności, w której masz biegłość, dodajesz kość Psioniczną (k6/k8/k10) — i zużywasz ją TYLKO wtedy, gdy zamieni porażkę w sukces!", desc_en: "Add a Psionic Energy die to a failed proficient ability check; the die is only expended if the check then succeeds!" }
      ]
    },
    "phantom": {
      features: [
        { level: 3, name_pl: "Jęki z Grobu (Połowa Ukradkowego Ataku w 2. cel!)", name_en: "Wails from the Grave", action_type: "Przy Ukradkowym Ataku", roll: "2d6", roll_label: "Jęki z Grobu (Nekrotyczne w 2. cel)", desc_pl: "Zaraz po trafieniu Ukradkowym Atakiem zadajesz drugiemu wrogowi w zasięgu 30 stóp obrażenia nekrotyczne równe połowie kości swojego Ukradkowego Ataku!", desc_en: "Immediately after dealing Sneak Attack damage, deal necrotic damage equal to half your Sneak Attack dice to a second creature within 30 ft." }
      ]
    },

    // ======================== SORCERER ========================
    "aberrant-mind": {
      spells_by_level: { 1: ["mind-sliver"], 3: ["suggestion"], 5: ["hunger-of-hadar"], 7: ["raulothims-psychic-lance"], 9: ["synaptic-static"] },
      features: [
        { level: 1, name_pl: "Telepatyczna Mowa & Psioniczne Zaklęcia (10 darmowych czarów!)", name_en: "Telepathic Speech & Psionic Spells", action_type: "Pasywne / Psionika", desc_pl: "Zyskujesz 10 dodatkowych zaklęć psionicznych oraz od 6. poziomu możesz rzucać je bezpośrednio za Punkty Zaklinania (= krąg czaru) i całkowicie bez komponentów V/S/M (wbudowany Subtle Spell)!", desc_en: "Gain 10 bonus Psionic Spells and cast them with Sorcery Points equal to their level with no components starting at level 6." }
      ]
    },
    "clockwork-soul": {
      spells_by_level: { 1: ["shield", "absorb-elements"], 3: ["aid", "lesser-restoration"], 5: ["dispel-magic", "haste"], 7: ["banishment"], 9: ["wall-of-force", "greater-restoration"] },
      features: [
        { level: 1, name_pl: "Przywrócenie Równowagi (Anuluj Ułatwienie lub Utrudnienie!)", name_en: "Restore Balance", action_type: "Reakcja (60 ft)", desc_pl: "Jako reakcja anulujesz Ułatwienie wroga lub Utrudnienie sojusznika przy dowolnym rzucie k20 w zasięgu 60 stóp (biegłość razy dziennie).", desc_en: "Reaction to cancel advantage or disadvantage on any d20 roll made by a creature within 60 ft." },
        { level: 6, name_pl: "Bastion Prawa (Tarcza 1k8 do 5k8 redukcji obrażeń)", name_en: "Bastion of Law", action_type: "Akcja (1–5 Pkt Zaklinania)", roll: "5d8", roll_label: "Tarcza Bastionu Prawa (do 5k8 redukcji)", desc_pl: "Otaczasz siebie lub sojusznika magiczną osłoną z kości k8 (od 1k8 do 5k8), które redukują otrzymywane obrażenia.", desc_en: "Spend 1 to 5 Sorcery Points to create a magical ward of d8s that reduce damage taken." }
      ]
    },
    "draconic": {
      features: [
        { level: 1, name_pl: "Smocza Odporność (+1 PW/poziom oraz KP = 13 + ZRĘ)", name_en: "Draconic Resilience", action_type: "Pasywne (Doliczone!)", desc_pl: "Twoje maksymalne PW rosną o +1 na każdy poziom Zaklinacza (automatycznie doliczone!), a bez pancerza Twoja Klasa Pancerza wynosi 13 + ZRĘ.", desc_en: "+1 HP per sorcerer level and base AC of 13 + DEX when unarmored." },
        { level: 6, name_pl: "Powinowactwo Żywiołów (+CHA do obrażeń żywiołu)", name_en: "Elemental Affinity", action_type: "Pasywne (+CHA)", desc_pl: "Dodajesz swój modyfikator z Charyzmy do jednego rzutu obrażeń każdego zaklęcia Twojego smoczego żywiołu (np. Kuli Ognia!).", desc_en: "Add your Charisma modifier to one damage roll of any spell that deals damage of your draconic element." }
      ]
    },
    "divine-soul": {
      spells_by_level: { 1: ["bless", "healing-word", "guiding-bolt"], 3: ["spiritual-weapon"], 5: ["spirit-guardians", "revivify"] },
      features: [
        { level: 1, name_pl: "Przychylność Bogów (+2k4 do nieudanego rzutu obronnego lub ataku!)", name_en: "Favored by the Gods", action_type: "1/Krótki Odpoczynek", roll: "2d4", roll_label: "Przychylność Bogów (+2k4)", desc_pl: "Gdy nie zdasz rzutu obronnego lub chybisz atakiem, możesz rzucić 2k4 i dodać wynik, zamieniając porażkę w sukces (odnawia się po Krótkim Odpoczynku)!", desc_en: "If you fail a saving throw or miss with an attack roll, roll 2d4 and add it to the total (1/short rest)." }
      ]
    },

    // ======================== WARLOCK ========================
    "hexblade": {
      spells_by_level: { 1: ["shield", "WRATHFUL-SMITE"] },
      features: [
        { level: 1, name_pl: "Wojownik Hex (Pancerze średnie, Tarcze i Ataki z CHA!)", name_en: "Hex Warrior", action_type: "Atak z CHA", roll: "1d20", use_ability_mod: "CHA", use_prof: true, roll_label: "Atak Bronią Hexblade (CHA)", desc_pl: "Zyskujesz biegłość w średnich pancerzach, tarczach i broni żołnierskiej, oraz używasz Charyzmy zamiast Siły/Zręczności do rzutów ataku i obrażeń bronią!", desc_en: "Gain medium armor, shields, martial weapons, and use Charisma for weapon attack and damage rolls!" },
        { level: 1, name_pl: "Klątwa Hexblade'a (+Biegłość do obrażeń, Krytyk 19–20 i Leczenie)", name_en: "Hexblade's Curse", action_type: "Akcja dodatkowa", desc_pl: "Przez 1 minutę przeciw przeklętemu celowi: dodajesz premię z biegłości (+2 do +6) do KAŻDEGO rzutu obrażeń, trafiasz krytycznie na 19–20, a po jego śmierci leczysz się za poziom + CHA!", desc_en: "Bonus action curse: +PB to all damage rolls against target, crit on 19-20, and heal Warlock level + CHA when it dies." }
      ]
    },
    "fiend": {
      spells_by_level: { 1: ["command"], 3: ["scorching-ray"], 5: ["fireball"] },
      features: [
        { level: 1, name_pl: "Błogosławieństwo Mrocznego Pana (CHA + Poziom Temp PW po zabójstwie)", name_en: "Dark One's Blessing", action_type: "Przy zabiciu wroga", desc_pl: "Za każdym razem, gdy obniżysz PW wrogiej istoty do 0, natychmiast zyskujesz Tymczasowe PW równe Twojemu modyfikatorowi z Charyzmy + poziom Czarnoksiężnika!", desc_en: "When you reduce a hostile creature to 0 HP, gain temporary HP equal to your CHA modifier + your warlock level." },
        { level: 6, name_pl: "Własne Szczęście Mrocznego Pana (+1k10 do testu lub rzutu obronnego)", name_en: "Dark One's Own Luck", action_type: "1/Krótki Odpoczynek", roll: "1d10", roll_label: "Szczęście Mrocznego Pana (+1k10)", desc_pl: "Dodaj +1k10 do dowolnego testu cechy lub rzutu obronnego po zobaczeniu wyniku kości!", desc_en: "Add 1d10 to an ability check or saving throw after seeing the initial roll (1/short rest)." }
      ]
    },
    "genie": {
      features: [
        { level: 1, name_pl: "Gniew Dżina (+Biegłość obrażeń żywiołu w każdej turze!)", name_en: "Genie's Wrath & Vessel", action_type: "Raz na turę", desc_pl: "Raz w każdej swojej turze, gdy trafisz atakiem, zadajesz dodatkowe obrażenia równe Twojej premii z biegłości (+2 do +6: Obuchowe dla Dao, Grzmot dla Dżinni, Ogień dla Ifrita, Zimno dla Marida) oraz na 6. poziomie zyskujesz lot!", desc_en: "Once per turn when you hit with an attack, deal extra elemental damage equal to your proficiency bonus, plus flight at level 6." }
      ]
    },
    "undead": {
      features: [
        { level: 1, name_pl: "Forma Grozy (1k10 + Poziom Temp PW i Przerażanie co turę!)", name_en: "Form of Dread", action_type: "Akcja dodatkowa", roll: "1d10+5", roll_label: "Forma Grozy (Tymczasowe PW)", desc_pl: "W akcji dodatkowej na 1 minutę zyskujesz 1k10 + poziom Czarnoksiężnika tymczasowych PW, niewrażliwość na przerażenie oraz raz w każdej turze przy trafieniu atakiem zmuszasz cel do rzutu na MĄD, inaczej zostaje Przerażony!", desc_en: "Bonus action to gain 1d10 + warlock level temporary HP, immunity to fear, and frighten one hit target each turn." }
      ]
    },
    "celestial": {
      spells_by_level: { 1: ["light", "sacred-flame", "cure-wounds", "guiding-bolt"], 3: ["lesser-restoration"], 5: ["revivify"] },
      features: [
        { level: 1, name_pl: "Uzdrawiające Światło (Pula kości k6 leczenia w akcji dodatkowej)", name_en: "Healing Light", action_type: "Akcja dodatkowa", roll: "2d6", roll_label: "Uzdrawiające Światło (Leczenie w 60 ft)", desc_pl: "Posiadasz pulę 1 + poziom Czarnoksiężnika kości k6. Jako akcja dodatkowa leczysz istotę w zasięgu 60 stóp, wydając do CHA kości k6 naraz!", desc_en: "Pool of d6s equal to 1 + warlock level; heal a creature within 60 ft as a bonus action." }
      ]
    },

    // ======================== WIZARD ========================
    "divination": {
      features: [
        { level: 2, name_pl: "Wróżba (Portent — Rzuć 2k20 Przeznaczenia na cały dzień!)", name_en: "Portent (2d20)", action_type: "Po Długim Odpoczynku", roll: "1d20", roll_label: "Kość Wróżby (Portent k20)", desc_pl: "Po zakończeniu długiego odpoczynku rzucasz 2k20 i zapisujesz wyniki. Możesz podmienić dowolny rzut ataku, rzut obronny lub test cechy wykonany przez Ciebie lub istotę, którą widzisz, na jedną ze swoich kości Wróżby!", desc_en: "Roll two d20s after a long rest and replace any attack roll, saving throw, or ability check made by you or a creature you can see with one of these foretelling rolls!" }
      ]
    },
    "evocation": {
      features: [
        { level: 2, name_pl: "Kształtowanie Zaklęć (Sojusznicy otrzymują 0 obrażeń od Twoich czarów AoE!)", name_en: "Sculpt Spells", action_type: "Pasywne", desc_pl: "Gdy rzucasz zaklęcie Ewokacji (np. Kula Ognia, Piorun), wybrani przez Ciebie sojusznicy automatycznie zdają rzut obronny i otrzymują 0 obrażeń!", desc_en: "Chosen allies in your Evocation spells automatically succeed on their saving throws and take 0 damage!" },
        { level: 10, name_pl: "Wzmocniona Ewokacja (+INT do obrażeń zaklęć Ewokacji)", name_en: "Empowered Evocation", action_type: "Pasywne (+INT)", desc_pl: "Dodajesz swój modyfikator z Inteligencji do jednego rzutu obrażeń każdego zaklęcia Ewokacji Maga (w tym do każdego pocisku Magic Missile!).", desc_en: "Add your Intelligence modifier to one damage roll of any wizard evocation spell you cast." }
      ]
    },
    "bladesinging": {
      toggle_buff: { id: "bladesong", name_pl: "Pieśń Ostrza Aktywna (+INT do KP, +10 ft ruchu, +INT do Koncentracji!)", dynamic_ac_ability: "INT", bonus_speed: 10 },
      features: [
        { level: 2, name_pl: "Pieśń Ostrza (Bladesong: +INT do KP, +INT do Koncentracji, +10 ft)", name_en: "Bladesong", action_type: "Akcja dodatkowa (Przełącznik)", desc_pl: "W akcji dodatkowej aktywujesz Pieśń Ostrza na 1 minutę: dodajesz swój modyfikator z Inteligencji do Klasy Pancerza, +10 stóp do szybkości ruchu, Ułatwienie w Akrobatyce oraz +INT do rzutów obronnych na Koncentrację!", desc_en: "Bonus action for 1 minute: add INT modifier to AC, +10 ft walking speed, Advantage on Acrobatics, and add INT modifier to CON saves for Concentration!" },
        { level: 6, name_pl: "Dodatkowy Atak Pieśniarza Ostrza (Atak bronią + Sztuczka w 1 akcji!)", name_en: "Bladesinger Extra Attack", action_type: "Akcja Ataku", desc_pl: "Atakujesz dwa razy, a zamiast jednego z ataków możesz rzucić dowolną Sztuczkę (np. Booming Blade lub Green-Flame Blade)!", desc_en: "Attack twice, and you can cast one of your cantrips in place of one of those attacks!" }
      ]
    },
    "abjuration": {
      features: [
        { level: 2, name_pl: "Arkaniczna Osłona (Arcane Ward: 2 × Poziom + INT PW tarczy)", name_en: "Arcane Ward", action_type: "Tarcza Ochronna", desc_pl: "Gdy rzucisz zaklęcie Abjuracji (np. Tarcza / Shield lub Zbroja Maga), tworzysz magiczną osłonę o wytrzymałości 2 × poziom Maga + INT, która przyjmuje obrażenia za Ciebie (i odnawia się o 2 × krąg przy każdym kolejnym czarze Abjuracji)!", desc_en: "Create a magical ward with HP equal to twice your wizard level + INT modifier that absorbs damage for you." }
      ]
    },
    "chronurgy": {
      init_ability: "INT",
      features: [
        { level: 2, name_pl: "Chronalne Przesunięcie (Wymuś przerzut k20) & +INT do Inicjatywy", name_en: "Chronal Shift & Temporal Awareness", action_type: "Reakcja (2/dzień)", desc_pl: "Dodajesz modyfikator z Inteligencji do Inicjatywy (automatycznie doliczone!). Dwa razy dziennie jako reakcję możesz zmusić siebie, sojusznika lub wroga w 30 ft do przerzucenia dowolnego rzutu ataku, testu lub rzutu obronnego!", desc_en: "Add INT to Initiative, and use reaction twice per day to force a creature within 30 ft to reroll an attack, ability check, or saving throw." }
      ]
    },
    "war-magic": {
      init_ability: "INT",
      features: [
        { level: 2, name_pl: "Arkaniczne Odbicie (+2 do KP lub +4 do rzutu obronnego w reakcji!)", name_en: "Arcane Deflection & Tactical Wit", action_type: "Reakcja (Bez limitu!)", desc_pl: "Dodajesz Inteligencję do Inicjatywy (doliczone!). Gdy zostaniesz trafiony atakiem lub nie zdasz rzutu obronnego, możesz w reakcji dodać +2 do KP lub +4 do tego rzutu obronnego bez zużywania komórek!", desc_en: "Add INT to Initiative, and use reaction at will to gain +2 AC against a hit or +4 to a failed saving throw!" }
      ]
    },
    "scribes": {
      features: [
        { level: 2, name_pl: "Przebudzona Księga Zaklęć (Zmiana typu obrażeń czarów i Manifestacja Umysłu)", name_en: "Awakened Spellbook & Manifest Mind", action_type: "Pasywne / Akcja dodatkowa", desc_pl: "Możesz dowolnie zmieniać typ obrażeń każdego rzucanego zaklęcia na inny typ z Twojej Księgi Zaklęć (np. Kula Ognia zadająca obrażenia od Mocy lub Grzmotu!), a od 6. poziomu rzucać czary z pozycji niezniszczalnego widmowego umysłu księgi.", desc_en: "Replace a spell's damage type with another damage type found in your spellbook, and cast spells from your Manifest Mind." }
      ]
    }
  };
})();
