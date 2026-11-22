// ============================================================================
// Kroniki D&D 5e — Pełne Kompendium Danych Rasowych i Rodowodów (Wikidot 5e)
// Rozszerza wszystkie 61 grywalnych ras o pełne statystyki anatomiczne, wiek,
// wzrost, języki, typy istot, specjalne prędkości ruchu, opis fabularny,
// szczegółowe mechaniki każdej cechy rasowej oraz tabele podtypów/wariantów.
// ============================================================================

(function () {
  const RACE_DETAILS = {
    "human-variant": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku ok. 18 lat; żyją średnio niespełna 100 lat.",
      age_en: "Reach adulthood in their late teens and live less than a century.",
      height_pl: "Średni (ok. 155–190 cm wzrostu, 55–110 kg wagi)",
      height_en: "Medium (from barely 5 feet to well over 6 feet tall)",
      languages_pl: "Wspólny (Common) + 1 dowolny język do wyboru",
      languages_en: "Common + one extra language of your choice",
      lore_pl: "Najbardziej elastyczny i najczęściej wybierany wariant bohatera w D&D 5e. Zamiast drobnego bonusu do każdej cechy, Człowiek Wariant skupia się na specjalizacji: już na 1. poziomie otrzymuje pełny Atut (Feat), co pozwala od pierwszej sesji zdefiniować unikalny styl walki lub rzucania zaklęć.",
      lore_en: "The most versatile character option in D&D 5e, trading the standard human's broad ability bonuses for a 1st-level Feat and an extra skill proficiency.",
      detailed_traits: [
        { name_pl: "Zwiększenie Wartości Cech (ASI)", name_en: "Ability Score Increase", tag_pl: "+1 / +1", desc_pl: "Dwie różne wybrane przez Ciebie wartości cech zwiększają się o +1.", desc_en: "Two different ability scores of your choice increase by 1." },
        { name_pl: "Biegłość w Umiejętności", name_en: "Skills", tag_pl: "1 Umiejętność", desc_pl: "Zyskujesz biegłość w jednej dowolnie wybranej umiejętności z pełnej listy 18 umiejętności D&D 5e.", desc_en: "You gain proficiency in one skill of your choice." },
        { name_pl: "Darmowy Atut na 1. Poziomie", name_en: "Feat", tag_pl: "1 Atut (Feat)", desc_pl: "Zdobywasz jeden wybrany Atut (Feat), którego wymagania spełniasz (np. Czujny, Mistrz Wielkiej Broni, Mag Bitewny, Strzelec Wyborowy, Szczęściarz lub Ekspert Kuszy).", desc_en: "You gain one Feat of your choice for which you qualify at 1st level." }
      ]
    },

    "human-standard": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku ok. 18 lat; żyją do ok. 90–100 lat.",
      age_en: "Reach adulthood in their late teens and live less than a century.",
      height_pl: "Średni (ok. 155–190 cm, 55–110 kg)",
      height_en: "Medium (5 to 6+ feet tall)",
      languages_pl: "Wspólny (Common) + 1 dowolny język (w tym rzadkie dialekty)",
      languages_en: "Common + one extra language of your choice",
      lore_pl: "Ludzie są najmłodszą z powszechnych ras, lecz dzięki swojej ambicji, zdolności adaptacji i determinacji budują największe imperia. Standardowy wariant człowieka wzmacnia równomiernie każdy z sześciu atrybutów postaci.",
      lore_en: "Humans are the most adaptable and ambitious people among the common races, gaining a balanced boost across every ability score.",
      detailed_traits: [
        { name_pl: "Wszechstronne Zwiększenie Cech", name_en: "Ability Score Increase", tag_pl: "6 × +1 (Łącznie +6)", desc_pl: "Każda z Twoich sześciu wartości cech (Siła, Zręczność, Kondycja, Inteligencja, Mądrość oraz Charyzma) wzrasta o +1. Idealne przy wielu nieparzystych wynikach w Point Buy lub rzutach 4k6.", desc_en: "Your ability scores each increase by 1 (STR, DEX, CON, INT, WIS, CHA)." },
        { name_pl: "Dar Języków", name_en: "Languages", tag_pl: "2 Języki", desc_pl: "Potrafisz mówić, czytać i pisać we Wspólnym oraz jednym dodatkowym języku wybranym przez Ciebie (ludzie chętnie uczą się języków elfów, krasnoludów czy smoków).", desc_en: "You can speak, read, and write Common and one extra language of your choice." }
      ]
    },

    "custom-lineage": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Zależny od wybranego pochodzenia (zwykle od kilkudziesięciu do kilkuset lat).",
      age_en: "Varies depending on your unique origin.",
      height_pl: "Średni lub Mały (wybierasz przy tworzeniu postaci)",
      height_en: "Small or Medium (your choice at character creation)",
      languages_pl: "Wspólny (Common) + 1 dowolny język za zgodą MG",
      languages_en: "Common + one other language",
      lore_pl: "Wprowadzony w podręczniku Tasha's Cauldron of Everything szablon dla postaci o unikalnym dziedzictwie (np. pół-krasnolud, człowiek wychowany przez Fey, dotknięty magią planu astralnego). Pozwala połączyć premię +2 do jednej cechy z darmowym Atutem na 1. poziomie (co przy atucie pół-cechowym pozwala zacząć z wartością 18 w głównej cesze już na 1. poziomie!).",
      lore_en: "Instead of choosing one of the game's existing races, you can craft a unique heritage that grants +2 to one ability score and a 1st-level Feat.",
      detailed_traits: [
        { name_pl: "Skupione Zwiększenie Cechy", name_en: "Ability Score Increase", tag_pl: "+2 do 1 cechy", desc_pl: "Jedna wybrana przez Ciebie wartość cechy wzrasta o +2.", desc_en: "One ability score of your choice increases by 2." },
        { name_pl: "Darmowy Atut (Feat)", name_en: "Feat", tag_pl: "1 Atut na 1. poz.", desc_pl: "Zdobywasz 1 wybrany Atut, którego wymagania spełniasz. Jeśli wybierzesz tzw. 'Half-Feat' (+1 do tej samej cechy co Twoje +2), możesz uzyskać 18 w głównej cesze przy użyciu Point Buy (15 + 2 + 1 = 18)!", desc_en: "You gain one feat of your choice for which you qualify." },
        { name_pl: "Zmienna Cecha (Widzenie lub Umiejętność)", name_en: "Variable Trait", tag_pl: "Darkvision 60 ft LUB Skill", desc_pl: "Wybierasz jedną z dwóch opcji: Widzenie w ciemności na odległość 60 stóp (18 m) ALBO biegłość w jednej wybranej umiejętności.", desc_en: "You gain either Darkvision out to 60 feet OR proficiency in one skill of your choice." }
      ]
    },

    "elf-high": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Dojrzałość fizyczna ok. 20 lat, dorosłość kulturowa ok. 100 lat; żyją do 750 lat.",
      age_en: "Claim adulthood around age 100 and can live to be 750 years old.",
      height_pl: "Średni (ok. 150–185 cm, smukła sylwetka 45–68 kg)",
      height_en: "Medium (under 5 to over 6 feet tall, slender build)",
      languages_pl: "Wspólny, Elficki + 1 dodatkowy dowolny język",
      languages_en: "Common, Elvish + 1 extra language of your choice",
      lore_pl: "Elfy Wysokie (w Zapomnianych Krainach znane jako Elfy Słoneczne i Księżycowe) cechują się bystrym umysłem i wrodzonym opanowaniem podstaw sztuki tajemnej. Nawet wojownicy tej rasy znają przynajmniej jedną sztuczkę magiczną.",
      lore_en: "As a high elf, you have a keen mind and a mastery of at least the basics of magic.",
      detailed_traits: [
        { name_pl: "Widzenie w Ciemności (60 stóp)", name_en: "Darkvision", tag_pl: "Zmysły 60 ft", desc_pl: "Przy słabym świetle widzisz na 60 stóp (18 m) jak w pełnym świetle, a w całkowitej ciemności jak w słabym świetle (w odcieniach szarości).", desc_en: "See in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light." },
        { name_pl: "Wyostrzone Zmysły i Rodowód Fey", name_en: "Keen Senses & Fey Ancestry", tag_pl: "Percepcja + Obrona", desc_pl: "Posiadasz biegłość w umiejętności Percepcja. Ponadto masz Ułatwienie (Advantage) w rzutach obronnych przeciw zauroczeniu (Charmed), a magia nie może Cię uśpić.", desc_en: "Proficiency in Perception. Advantage on saving throws against being charmed, and magic can't put you to sleep." },
        { name_pl: "Trans (Trance)", name_en: "Trance", tag_pl: "4h Odpoczynku", desc_pl: "Elfy nie potrzebują snu. Zamiast tego medytują głęboko przez 4 godziny dziennie, zachowując półświadomość i zyskując pełne korzyści długiego odpoczynku w 4 godziny zamiast 8.", desc_en: "Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day to gain the benefit of a long rest." },
        { name_pl: "Sztuczka Maga i Trening Broni Elfów", name_en: "Cantrip & Elf Weapon Training", tag_pl: "1 Sztuczka + Bronie", desc_pl: "Znasz 1 dowolną sztuczkę (Cantrip) z listy Maga (np. Booming Blade, Fire Bolt, Prestidigitation, Minor Illusion — cecha magiczna: Inteligencja). Masz też biegłość w długim mieczu, krótkim mieczu, długim łuku i krótkim łuku.", desc_en: "You know one cantrip of your choice from the Wizard spell list (INT). Proficient with longsword, shortsword, shortbow, and longbow." }
      ]
    },

    "elf-wood": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Dojrzałość kulturowa ok. 100 lat; żyją do 750 lat.",
      age_en: "Adulthood around 100; live up to 750 years.",
      height_pl: "Średni (ok. 150–180 cm, miedziana skóra z zielonkawym odcieniem)",
      height_en: "Medium (slender build, copperish skin)",
      languages_pl: "Wspólny (Common), Elficki (Elvish)",
      languages_en: "Common, Elvish",
      lore_pl: "Elfy Leśne posiadają wyostrzoną intuicję i zmysły, a ich chyże stopy oraz umiejętność stapiania się z naturalnym otoczeniem czynią z nich niezrównanych zwiadowców, łowców, mnichów i łotrzyków.",
      lore_en: "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests.",
      detailed_traits: [
        { name_pl: "Chyże Stopy (Fleet of Foot)", name_en: "Fleet of Foot", tag_pl: "Szybkość 35 ft (10,5 m)", desc_pl: "Twoja bazowa szybkość chodzenia wzrasta z 30 do 35 stóp (10,5 m) na turę.", desc_en: "Your base walking speed increases to 35 feet." },
        { name_pl: "Maska Dziczy (Mask of the Wild)", name_en: "Mask of the Wild", tag_pl: "Ukrywanie w naturze", desc_pl: "Możesz podejmować próbę Ukrycia się (Hide) nawet wtedy, gdy jesteś tylko lekko przesłonięty (lightly obscured) przez zjawiska naturalne: liście, ulewny deszcz, padający śnieg lub mgłę.", desc_en: "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena." },
        { name_pl: "Rodowód Fey, Trans, Percepcja i Bronie", name_en: "Fey Ancestry, Trance & Weapons", tag_pl: "Pakiet Elficki", desc_pl: "Widzenie w ciemności 60 ft, biegłość w Percepcji, Ułatwienie przeciw zauroczeniu, odporność na magiczny sen, 4-godzinny Trans oraz biegłość w długim/krótkim mieczu i długim/krótkim łuku.", desc_en: "Darkvision 60 ft, Perception proficiency, Advantage vs Charmed, immune to magic sleep, 4-hour Trance, and Elf Weapon Training." }
      ]
    },

    "elf-drow": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Dojrzałość ok. 100 lat; żyją do 750 lat.",
      age_en: "Adulthood around 100; live up to 750 years.",
      height_pl: "Średni (ok. 145–170 cm, obsydianowa skóra i białe lub srebrne włosy)",
      height_en: "Medium (4'5\" to 5'5\", obsidian skin and stark white hair)",
      languages_pl: "Wspólny (Common), Elficki (Elvish)",
      languages_en: "Common, Elvish",
      lore_pl: "Wygnane przed tysiącleciami w bezsłoneczne czeluście Podmroku (Underdark) mroczne elfy wykształciły nadzwyczajny wzrok w ciemnościach oraz wrodzoną magię cienia i blasku.",
      lore_en: "Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world into the Underdark.",
      detailed_traits: [
        { name_pl: "Wyższe Widzenie w Ciemności (120 stóp)", name_en: "Superior Darkvision", tag_pl: "Zasięg 120 ft (36 m)", desc_pl: "Twoje widzenie w ciemności ma podwójny zasięg: aż 120 stóp (36 m).", desc_en: "Your darkvision has a radius of 120 feet." },
        { name_pl: "Magia Drowów (Drow Magic)", name_en: "Drow Magic", tag_pl: "3 Zaklęcia (CHA)", desc_pl: "Znasz sztuczkę Tańczące Światła (Dancing Lights). Od 3. poziomu możesz raz dziennie rzucić Ogień Fey (Faerie Fire), a od 5. poziomu — Ciemność (Darkness). Cecha magiczna: Charyzma.", desc_en: "You know Dancing Lights. At 3rd level cast Faerie Fire 1/day; at 5th level cast Darkness 1/day (Charisma)." },
        { name_pl: "Wrażliwość na Światło Słoneczne i Bronie Drowów", name_en: "Sunlight Sensitivity & Drow Weapons", tag_pl: "Światło + Bronie", desc_pl: "Masz Utrudnienie w rzutach ataku oraz testach Percepcji opartych na wzroku, gdy Ty lub Twój cel znajdujecie się w bezpośrednim świetle słonecznym. Biegłość w rapierach, krótkich mieczach i kuszach ręcznych.", desc_en: "Disadvantage on attack rolls and sight-based Perception checks in direct sunlight. Proficient with rapiers, shortswords, and hand crossbows." }
      ]
    },

    "elf-shadar-kai": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Dojrzałość ok. 100 lat; żyją do 750 lat.",
      age_en: "Adulthood around 100; live up to 750 years.",
      height_pl: "Średni (ok. 155–180 cm)",
      height_en: "Medium",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Zaprzysiężeni służbie Kruczej Królowej w ponurej Krainy Cienia (Shadowfell). Shadar-kai potrafią rozpływać się w cieniu i po każdej teleportacji stają się widmowi oraz odporni na wszelkie obrażenia.",
      lore_en: "Sworn to the Raven Queen's service in the Shadowfell, shadar-kai can slip between shadows and become ghostly resistant to all harm.",
      detailed_traits: [
        { name_pl: "Błogosławieństwo Kruczej Królowej", name_en: "Blessing of the Raven Queen", tag_pl: "Akcja dodatkowa • Teleport + Odporność na WSZYSTKO", desc_pl: "Jako akcję dodatkową teleportujesz się na odległość do 30 stóp (9 m) w widoczne wolne miejsce. Od 3. poziomu po tej teleportacji stajesz się półprzezroczysty i zyskujesz ODPORNOŚĆ NA WSZYSTKIE OBRAŻENIA (Resistance to all damage!) aż do początku swojej następnej tury! Liczba użyć: Premia z Biegłości / długi odpoczynek.", desc_en: "As a bonus action, magically teleport up to 30 feet. Starting at 3rd level, you also gain resistance to ALL damage until the start of your next turn! Uses: PB/long rest." },
        { name_pl: "Nekrotyczna Odporność", name_en: "Necrotic Resistance", tag_pl: "Odporność: Nekrotyczne", desc_pl: "Posiadasz stałą odporność na obrażenia nekrotyczne.", desc_en: "You have resistance to necrotic damage." },
        { name_pl: "Trans z Wymiennymi Biegłościami", name_en: "Trance Proficiencies", tag_pl: "2 Wymienne Biegłości", desc_pl: "Po każdym 4-godzinnym Transie wybierasz 2 dowolne biegłości w broniach lub narzędziach z podręcznika gracza, które czerpiesz ze wspólnej pamięci elfów aż do następnego odpoczynku.", desc_en: "Whenever you finish a 4-hour Trance, you gain two proficiencies of your choice with weapons or tools." }
      ]
    },

    "elf-eladrin": {
      xl: true,
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Dojrzałość ok. 100 lat; żyją do 750 lat.",
      age_en: "Adulthood around 100; live up to 750 years.",
      height_pl: "Średni (ok. 155–185 cm, wygląd zmienia się wraz z porą roku)",
      height_en: "Medium",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Elfy pochodzące bezpośrednio z baśniowego Feywildu. Są istotami o gorących emocjach, a ich wygląd oraz magiczna moc teleportacji zmieniają się w zależności od jednej z czterech Pór Roku, którą mogą przybrać po każdym odpoczynku.",
      lore_en: "Elves native to the Feywild whose physical appearance and magical Fey Step shift with the four seasons.",
      detailed_traits: [
        { name_pl: "Krok Fey (Fey Step)", name_en: "Fey Step", tag_pl: "Akcja dodatkowa • Teleport 30 ft + Efekt Pory Roku", desc_pl: "Jako akcję dodatkową teleportujesz się na odległość do 30 stóp (9 m). Liczba użyć: Premia z Biegłości / długi odpoczynek. Od 3. poziomu Krok Fey wywołuje dodatkowy efekt zależny od Twojej aktualnej Pory Roku (ST = 8 + Premia Biegłości + modyfikator z INT, MĄD lub CHA). Porę roku możesz zmienić po każdym długim odpoczynku.", desc_en: "Bonus action teleport up to 30 feet (PB/long rest). At 3rd level, your Fey Step triggers an additional effect based on your current season." },
        { name_pl: "Rodowód Fey, Percepcja i Wymienny Trans", name_en: "Fey Ancestry, Keen Senses & Trance", tag_pl: "Pakiet Elficki", desc_pl: "Widzenie w ciemności 60 ft, biegłość w Percepcji, Ułatwienie przeciw zauroczeniu, odporność na magiczny sen oraz 4-godzinny Trans dający 2 wymienne biegłości w broniach lub narzędziach.", desc_en: "Darkvision 60 ft, Perception proficiency, Advantage vs Charmed, and 4-hour Trance with 2 changeable weapon/tool proficiencies." }
      ],
      suboptions_title_pl: "Cztery Pory Roku Eladrina (efekty Kroku Fey od 3. poziomu)",
      suboptions_headers_pl: ["Pora Roku", "Nastrój i Wygląd", "Magiczny Efekt przy Teleportacji (Krok Fey)"],
      suboptions_table: [
        ["🍂 Jesień (Autumn)", "Pokój, życzliwość, barwy złota i miedzi", "Natychmiast po teleportacji do 2 widocznych istot w promieniu 10 stóp od Ciebie musi wykonać rzut obronny na MĄD albo zostaje Zauroczone (Charmed) przez Ciebie na 1 minutę (lub do otrzymania obrażeń)."],
        ["❄️ Zima (Winter)", "Zaduma, ostrożność, mroźna aura", "Tuż przed teleportacją 1 widoczna istota w zasięgu 5 stóp od Ciebie wykonuje rzut obronny na MĄD albo zostaje Przerażona (Frightened) przez Ciebie do końca Twojej następnej tury."],
        ["🌸 Wiosna (Spring)", "Radość, entuzjazm, kwiaty we włosach", "Zamiast teleportować siebie, możesz dotknąć jednej chętnej istoty w zasięgu 5 stóp i przeteleportować JĄ na odległość do 30 stóp w widoczne wolne miejsce!"],
        ["☀️ Lato (Summer)", "Śmiałość, gniew, płomienne włosy", "Natychmiast po teleportacji każda wybrana przez Ciebie istota w promieniu 5 stóp od miejsca, w którym się pojawiłeś, otrzymuje obrażenia od ognia równe Twojej Premii z Biegłości (bez rzutu obronnego!)."]
      ]
    },

    "dwarf-mountain": {
      creature_type_pl: "Humanoid (Krasnolud)",
      creature_type_en: "Humanoid (Dwarf)",
      age_pl: "Dojrzałość w wieku ok. 50 lat; żyją średnio 350 lat.",
      age_en: "Mature at the same rate as humans, considered young until 50; live about 350 years.",
      height_pl: "Średni (ok. 120–150 cm, bardzo krępa budowa: ok. 70–85 kg)",
      height_en: "Medium (4 to 5 feet tall, averaging 150 pounds)",
      languages_pl: "Wspólny (Common), Krasnoludzki (Dwarvish)",
      languages_en: "Common, Dwarvish",
      lore_pl: "Silni i zahartowani mieszkańcy wysokich szczytów oraz podziemnych cytadel. Krasnoludy Górskie wyróżniają się niespotykaną sumą premii do cech (+2/+2) oraz wrodzoną biegłością w pancerzach średnich, co czyni je znakomitym wyborem również dla magów i zaklinaczy pragnących wysokiej Klasy Pancerza.",
      lore_en: "Strong and hardy, mountain dwarves are accustomed to a difficult life in rugged terrain and gain natural proficiency with light and medium armor.",
      detailed_traits: [
        { name_pl: "Potężne Zwiększenie Cech (+2 / +2)", name_en: "Ability Score Increase", tag_pl: "Łącznie +4 do cech!", desc_pl: "Twoja Siła wzrasta o +2 oraz Twoja Kondycja wzrasta o +2 (lub przy użyciu zasad Tasha's możesz rozdzielić +2 i +2 na dowolne dwie cechy, np. +2 INT i +2 KON).", desc_en: "Your Strength and Constitution scores each increase by 2." },
        { name_pl: "Krasnoludzki Trening Pancerza", name_en: "Dwarven Armor Training", tag_pl: "Lekkie i Średnie Pancerze", desc_pl: "Zyskujesz biegłość w pancerzach lekkich oraz średnich (pozwala np. Magowi lub Czarownikowi nosić Półpancerz o KP 15 + ZRĘ bez kar do rzucania zaklęć!).", desc_en: "You have proficiency with light and medium armor." },
        { name_pl: "Krasnoludzka Odporność i Chód w Zbroi", name_en: "Dwarven Resilience & Speed", tag_pl: "Odporność na Trucizny", desc_pl: "Masz Ułatwienie w rzutach obronnych przeciw truciznom i odporność na obrażenia od trucizn. Ponadto Twoja szybkość (25 ft) NIE jest obniżana przez noszenie ciężkiego pancerza nawet przy niskiej Sile!", desc_en: "Advantage on saves vs poison and resistance to poison damage. Your speed is not reduced by wearing heavy armor." },
        { name_pl: "Wiedza o Kamieniu i Trening Bojowy", name_en: "Stonecunning & Combat Training", tag_pl: "Bronie + Narzędzia", desc_pl: "Biegłość w toporze bojowym, toporku, lekkim młocie i młocie bojowym oraz 1 narzędziach rzemieślniczych (kowalskich, piwowarskich lub murarskich). Podwójna biegłość w testach Historii dotyczących kamiennych budowli.", desc_en: "Proficiency with battleaxe, handaxe, light hammer, warhammer, 1 artisan's tools, and double proficiency on stonework History checks." }
      ]
    },

    "dwarf-hill": {
      creature_type_pl: "Humanoid (Krasnolud)",
      creature_type_en: "Humanoid (Dwarf)",
      age_pl: "Dojrzałość ok. 50 lat; żyją ok. 350 lat.",
      age_en: "Considered young until 50; live about 350 years.",
      height_pl: "Średni (ok. 115–140 cm, ok. 65–75 kg)",
      height_en: "Medium (around 4 feet tall, 150 lb)",
      languages_pl: "Wspólny (Common), Krasnoludzki (Dwarvish)",
      languages_en: "Common, Dwarvish",
      lore_pl: "Krasnoludy Wzgórzowe słyną z niezwykłej przenikliwości, niezłomnej żywotności oraz głębokiej więzi z tradycją. Ich wrodzona wytrzymałość automatycznie zwiększa pulę maksymalnych Punktów Wytrzymałości na każdym poziomie postaci.",
      lore_en: "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
      detailed_traits: [
        { name_pl: "Krasnoludzka Wytrwałość (Dwarven Toughness)", name_en: "Dwarven Toughness", tag_pl: "+1 Maks. PW / Poziom (Auto)", desc_pl: "Twoje maksimum Punktów Wytrzymałości wzrasta o 1 i zwiększa się o kolejny 1 punkt za każdym razem, gdy zdobywasz poziom postaci (automatycznie doliczane na Karcie Postaci!).", desc_en: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level." },
        { name_pl: "Krasnoludzka Odporność", name_en: "Dwarven Resilience", tag_pl: "Odporność na Trucizny", desc_pl: "Ułatwienie w rzutach obronnych przeciw zatruciu (Poisoned) oraz odporność na obrażenia od trucizn.", desc_en: "Advantage on saving throws against poison, and resistance against poison damage." },
        { name_pl: "Trening Bojowy, Narzędzia i Wiedza o Kamieniu", name_en: "Combat Training & Stonecunning", tag_pl: "Pakiet Krasnoluda", desc_pl: "Widzenie w ciemności 60 ft, brak kary do szybkości za ciężki pancerz, biegłość w toporach i młotach, 1 narzędziach rzemieślniczych oraz ekspertyza w historii kamieniarstwa.", desc_en: "Darkvision 60 ft, no heavy armor speed penalty, weapon & tool proficiencies, and Stonecunning." }
      ]
    },

    "halfling-lightfoot": {
      creature_type_pl: "Humanoid (Niziołek)",
      creature_type_en: "Humanoid (Halfling)",
      age_pl: "Dojrzałość w wieku 20 lat; żyją do ok. 150 lat.",
      age_en: "Reach adulthood at age 20 and live into the middle of their second century.",
      height_pl: "Mały (ok. 90 cm wzrostu, ok. 18–20 kg wagi)",
      height_en: "Small (average about 3 feet tall and weigh about 40 pounds)",
      languages_pl: "Wspólny (Common), Niziołczy (Halfling)",
      languages_en: "Common, Halfling",
      lore_pl: "Niziołki Lekkostope są mistrzami unikania kłopotów i prześlizgiwania się niezauważenie w cieniu większych towarzyszy. Ich legendarne szczęście chroni ich przed krytycznymi porażkami.",
      lore_en: "Lightfoot halflings can easily hide from notice, even using other people as cover, and are blessed with extraordinary luck.",
      detailed_traits: [
        { name_pl: "Szczęściarz (Lucky)", name_en: "Lucky", tag_pl: "Przerzut '1' na k20!", desc_pl: "Ilekroć wyrzucisz naturalną '1' na kości k20 w rzucie ataku, teście cechy lub rzucie obronnym, możesz przerzucić tę kość (musisz użyć nowego wyniku). Zmniejsza szansę na naturalną jedynkę z 5% do 0,25%!", desc_en: "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll." },
        { name_pl: "Naturalna Skrytość (Naturally Stealthy)", name_en: "Naturally Stealthy", tag_pl: "Ukrywanie za sojusznikiem", desc_pl: "Możesz wykonać akcję Ukrycia się (Hide) nawet wtedy, gdy zasłania Cię wyłącznie istota o co najmniej jeden rozmiar większa od Ciebie (np. Twój towarzysz z drużyny o rozmiarze Średnim).", desc_en: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you." },
        { name_pl: "Odważny i Zwinność Niziołków", name_en: "Brave & Halfling Nimbleness", tag_pl: "Przeciw Przerażeniu + Ruch", desc_pl: "Masz Ułatwienie w rzutach obronnych przeciw Przerażeniu (Frightened) oraz możesz przechodzić przez przestrzeń zajmowaną przez każdą istotę większą od Ciebie.", desc_en: "Advantage on saving throws against being frightened. You can move through the space of any creature that is of a size larger than yours." }
      ]
    },

    "tiefling": {
      xl: true,
      creature_type_pl: "Humanoid (Diabelstwo)",
      creature_type_en: "Humanoid (Tiefling)",
      age_pl: "Dojrzałość w wieku ok. 18 lat; żyją kilka lat dłużej niż ludzie (ok. 100–110 lat).",
      age_en: "Mature at the same rate as humans but live a few years longer.",
      height_pl: "Średni (ok. 155–185 cm, rogi, długi chwytny ogon i oczy bez źrenic)",
      height_en: "Medium (same size and build as humans, with horns and tails)",
      languages_pl: "Wspólny (Common), Piekielny (Infernal)",
      languages_en: "Common, Infernal",
      lore_pl: "Nosiciele prastarego paktu zawartego z władcami Dziewięciu Piekieł. Diabelstwa posiadają rogi, ogony i wrodzoną odporność na ogień oraz piekielne zaklęcia, których lista zależy od arcybiesa będącego źródłem ich rodowodu.",
      lore_en: "To be greeted with stares and whispers, tieflings carry the infernal heritage of the Nine Hells in their bloodline.",
      detailed_traits: [
        { name_pl: "Piekielna Odporność (Hellish Resistance)", name_en: "Hellish Resistance", tag_pl: "Odporność: Ogień", desc_pl: "Posiadasz stałą odporność na obrażenia od ognia (otrzymujesz połowę obrażeń od każdego źródła ognia).", desc_en: "You have resistance to fire damage." },
        { name_pl: "Piekielne Dziedzictwo (Infernal Legacy)", name_en: "Infernal Legacy", tag_pl: "3 Zaklęcia (CHA)", desc_pl: "W klasycznym rodowodzie Asmodeusza znasz sztuczkę Taumaturgia. Od 3. poziomu możesz raz dziennie rzucić Piekielną Naganę (Hellish Rebuke) jako zaklęcie 2. kręgu (2k10 ognia jako reakcja!), a od 5. poziomu — Ciemność (Darkness). Cecha magiczna: Charyzma.", desc_en: "You know Thaumaturgy. At 3rd level cast Hellish Rebuke as a 2nd-level spell 1/day; at 5th level cast Darkness 1/day (Charisma)." },
        { name_pl: "Widzenie w Ciemności (60 stóp)", name_en: "Darkvision", tag_pl: "Zmysły 60 ft", desc_pl: "Dzięki piekielnemu dziedzictwu widzisz w słabym świetle i ciemności na odległość 60 stóp (18 m).", desc_en: "You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light." }
      ],
      suboptions_title_pl: "Rodowody Arcybiesów z Dziewięciu Piekieł (MToF / PHB)",
      suboptions_headers_pl: ["Arcybies (Rodowód)", "Premie do Cech (Tradycyjne)", "Zaklęcia Rodowodu (Krąg 0 / Poz. 3 / Poz. 5)"],
      suboptions_table: [
        ["🔥 Asmodeusz (PHB)", "+2 CHA, +1 INT", "Taumaturgia (0) • Piekielna Nagana 2.kr (3 poz.) • Ciemność (5 poz.)"],
        ["⚔️ Zariel (Avernus)", "+2 CHA, +1 SIŁ", "Taumaturgia (0) • Piętnujące Ugodzenie / Searing Smite (3 poz.) • Piętnujące Ugodzenie / Branding Smite (5 poz.)"],
        ["🗡️ Glasya (Malbolge)", "+2 CHA, +1 ZRĘ", "Pomniejsza Iluzja (0) • Przebranie Siebie / Disguise Self (3 poz.) • Niewidzialność / Invisibility (5 poz.)"],
        ["❄️ Levistus (Stygia)", "+2 CHA, +1 KON", "Promień Mrozu / Ray of Frost (0) • Zbroja Agathysa 2.kr (3 poz.) • Ciemność (5 poz.)"],
        ["🕵️ Dispater (Dis)", "+2 CHA, +1 ZRĘ", "Taumaturgia (0) • Przebranie Siebie (3 poz.) • Wykrycie Myśli / Detect Thoughts (5 poz.)"],
        ["🔮 Mefistofeles (Cania)", "+2 CHA, +1 INT", "Dłoń Maga (0) • Płonące Dłonie 2.kr (3 poz.) • Płomienne Ostrze / Flame Blade (5 poz.)"],
        ["💋 Fierna (Phlegethos)", "+2 CHA, +1 MĄD", "Przyjaciele / Friends (0) • Zauroczenie Osoby (3 poz.) • Sugestia / Suggestion (5 poz.)"]
      ]
    },

    "dragonborn": {
      xl: true,
      creature_type_pl: "Humanoid (Drakon)",
      creature_type_en: "Humanoid (Dragonborn)",
      age_pl: "Szybki rozwój: chodzą kilka godzin po wykluciu, dorosłość w wieku 15 lat; żyją do ok. 80 lat.",
      age_en: "Walk hours after hatching, reach adulthood by 15, and live to be around 80.",
      height_pl: "Średni (bardzo wysocy i masywni: ponad 185–205 cm wzrostu, 100–130 kg wagi)",
      height_en: "Medium (well over 6 feet tall and averaging almost 250 pounds)",
      languages_pl: "Wspólny (Common), Smoczy (Draconic)",
      languages_en: "Common, Draconic",
      lore_pl: "Zrodzeni ze smoczych jaj, łączący dumę i potęgę prawdziwych smoków z sylwetką humanoidalnych wojowników. Każdy Drakon wybiera swój Smoczy Rodowód, który określa kolor jego łusek, odporność na obrażenia oraz niszczycielską Broń Oddechową (Zionięcie).",
      lore_en: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension.",
      detailed_traits: [
        { name_pl: "Smoczy Rodowód (Draconic Ancestry)", name_en: "Draconic Ancestry", tag_pl: "Wybór Smoka i Żywiołu", desc_pl: "Wybierasz jeden z dziesięciu rodzajów smoków z tabeli poniżej. Twój wybór determinuje typ obrażeń Twojego Zionięcia oraz Twoją odporność na obrażenia.", desc_en: "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table." },
        { name_pl: "Zionięcie (Breath Weapon)", name_en: "Breath Weapon", tag_pl: "ST = 8 + KON + Biegłość", desc_pl: "Wydychasz niszczycielską energię w kształcie Stożka 15 ft lub Linii 5×30 ft. ST rzutu obronnego = 8 + modyfikator z KON + Premia z Biegłości. Obrażenia (PHB: 2k6 → 3k6 na 6. poz. → 4k6 na 11. poz. → 5k6 na 16. poz. | Fizban: zastępuje tylko 1 atak z akcji Ataku i zadaje 1k10 → 2k10 na 5. poz. → 3k10 na 11. poz. → 4k10 na 17. poz.!).", desc_en: "Exhale destructive energy (DC = 8 + CON mod + PB). Scales with character level." },
        { name_pl: "Smocza Odporność na Obrażenia", name_en: "Damage Resistance", tag_pl: "Stała Odporność", desc_pl: "Posiadasz stałą odporność (połowa obrażeń) na typ żywiołu powiązany z Twoim Smoczym Rodowodem.", desc_en: "You have resistance to the damage type associated with your draconic ancestry." }
      ],
      suboptions_title_pl: "Tabela Smoczego Rodowodu (Kolor Smoka, Żywioł i Kształt Zionięcia)",
      suboptions_headers_pl: ["Smok", "Typ Obrażeń i Odporności", "Kształt Zionięcia i Rzut Obronny"],
      suboptions_table: [
        ["🔴 Czerwony / 🟡 Złoty / 🟠 Mosiężny", "Ogień (Fire)", "Stożek 15 stóp (ZRĘ) — lub Linia 5×30 stóp (ZRĘ) dla Mosiężnego"],
        ["🔵 Niebieski / 🥉 Brązowy", "Błyskawice (Lightning)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["⚫ Czarny / 🟤 Miedziany", "Kwas (Acid)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["🟢 Zielony", "Trucizna (Poison)", "Stożek 15 stóp (Rzut obronny na Kondycję)"],
        ["⚪ Biały / 🥈 Srebrny", "Zimno (Cold)", "Stożek 15 stóp (Rzut obronny na Kondycję)"]
      ]
    },

    "half-elf": {
      creature_type_pl: "Humanoid (Elf, Człowiek)",
      creature_type_en: "Humanoid (Elf, Human)",
      age_pl: "Dojrzałość w wieku ok. 20 lat; żyją często ponad 180 lat.",
      age_en: "Mature at the same rate humans do and reach adulthood around 20; live over 180 years.",
      height_pl: "Średni (ok. 155–185 cm, 50–85 kg)",
      height_en: "Medium (5 to 6 feet tall)",
      languages_pl: "Wspólny, Elficki + 1 dowolny dodatkowy język",
      languages_en: "Common, Elvish, and one extra language of your choice",
      lore_pl: "Krocząc pomiędzy dwoma światami, półelfy łączą ludzką ciekawość, pomysłowość i ambicję z wyostrzonymi zmysłami, miłością do natury i artystycznym gustem elfów. Są niezrównanymi dyplomatami, bardami, paladynami i czarownikami.",
      lore_en: "Walking in two worlds but truly belonging to neither, half-elves combine the best qualities of their elf and human parents.",
      detailed_traits: [
        { name_pl: "Wyjątkowa Suma Premii do Cech (+2 / +1 / +1)", name_en: "Ability Score Increase", tag_pl: "Łącznie +4 do cech!", desc_pl: "Twoja Charyzma wzrasta o +2, a dwie inne wybrane przez Ciebie cechy wzrastają o +1 każda (łącznie aż +4 punkty cech na 1. poziomie!).", desc_en: "Your Charisma score increases by 2, and two other ability scores of your choice increase by 1." },
        { name_pl: "Wszechstronność Umiejętności", name_en: "Skill Versatility", tag_pl: "2 Dowolne Umiejętności", desc_pl: "Zyskujesz biegłość w dwóch dowolnie wybranych przez siebie umiejętnościach.", desc_en: "You gain proficiency in two skills of your choice." },
        { name_pl: "Rodowód Fey i Widzenie w Ciemności (60 ft)", name_en: "Fey Ancestry & Darkvision", tag_pl: "Darkvision 60 ft + Obrona", desc_pl: "Widzisz w ciemności na 60 stóp (18 m). Masz Ułatwienie w rzutach obronnych przeciw zauroczeniu (Charmed), a magia nie może Cię uśpić.", desc_en: "Darkvision 60 ft. Advantage on saving throws against being charmed, and magic can't put you to sleep." }
      ]
    },

    "half-orc": {
      creature_type_pl: "Humanoid (Ork, Człowiek)",
      creature_type_en: "Humanoid (Orc, Human)",
      age_pl: "Dojrzałość w wieku 14 lat; rzadko żyją dłużej niż 75 lat.",
      age_en: "Mature a little faster than humans, reaching adulthood around age 14; rarely live longer than 75 years.",
      height_pl: "Średni (ok. 170–200 cm, potężna muskulatura 80–120 kg)",
      height_en: "Medium (from 5 to well over 6 feet tall)",
      languages_pl: "Wspólny (Common), Orczy (Orc)",
      languages_en: "Common, Orc",
      lore_pl: "Półorkowie łączą fizyczną potęgę i nieustępliwość orków z ludzką taktyką i zwinnością. Na polu bitwy słyną z tego, że potrafią ustać na nogach po śmiertelnym ciosie oraz zadawać druzgocące trafienia krytyczne.",
      lore_en: "Half-orcs combine the physical power and endurance of their orcish heritage with human adaptability.",
      detailed_traits: [
        { name_pl: "Nieustępliwa Wytrzymałość (Relentless Endurance)", name_en: "Relentless Endurance", tag_pl: "1 PW zamiast 0 PW (1/dzień)", desc_pl: "Kiedy zostajesz sprowadzony do 0 Punktów Wytrzymałości, ale nie giniesz natychmiast, możesz zdecydować, że zamiast tego spadasz do 1 PW! Odnawia się po długim odpoczynku.", desc_en: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead (1/long rest)." },
        { name_pl: "Dzikie Ataki (Savage Attacks)", name_en: "Savage Attacks", tag_pl: "+1 Kość przy Krytyku!", desc_pl: "Kiedy uzyskasz trafienie krytyczne (NAT 20) w ataku bronią wręcz, możesz rzucić jedną z kości obrażeń broni dodatkowy raz i dodać ją do obrażeń krytycznych (np. Wielki Topór k12 zadaje 3k12 zamiast 2k12!).", desc_en: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage." },
        { name_pl: "Groźny i Widzenie w Ciemności (60 ft)", name_en: "Menacing & Darkvision", tag_pl: "Zastraszanie + 60 ft", desc_pl: "Posiadasz biegłość w umiejętności Zastraszanie (Intimidation) oraz Widzenie w ciemności na odległość 60 stóp.", desc_en: "Proficiency in Intimidation and Darkvision out to 60 feet." }
      ]
    },

    "gnome": {
      xl: true,
      creature_type_pl: "Humanoid (Gnom)",
      creature_type_en: "Humanoid (Gnome)",
      age_pl: "Dojrzałość w wieku ok. 40 lat; żyją od 350 do niemal 500 lat.",
      age_en: "Settle into adult life around age 40 and can live 350 to almost 500 years.",
      height_pl: "Mały (ok. 90–120 cm wzrostu, ok. 18–22 kg wagi)",
      height_en: "Small (slightly over 3 feet tall and weigh 40 to 45 pounds)",
      languages_pl: "Wspólny (Common), Gnomi (Gnomish)",
      languages_en: "Common, Gnomish",
      lore_pl: "Gnomy to pełni entuzjazmu wynalazcy, alchemicy, iluzjoniści i badacze. Ich największym atutem obronnym jest Gnomi Spryt, który chroni ich umysł przed niemal wszystkimi wrogimi zaklęciami kontrolującymi.",
      lore_en: "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities.",
      detailed_traits: [
        { name_pl: "Gnomi Spryt (Gnome Cunning)", name_en: "Gnome Cunning", tag_pl: "Stałe Adv. na INT / MĄD / CHA vs Magia!", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we wszystkich rzutach obronnych na Inteligencję, Mądrość oraz Charyzmę przeciwko magii!", desc_en: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic." },
        { name_pl: "Widzenie w Ciemności (60 stóp)", name_en: "Darkvision", tag_pl: "Zmysły 60 ft", desc_pl: "Przyzwyczajony do życia pod ziemią, widzisz w ciemności i słabym świetle na odległość 60 stóp (18 m).", desc_en: "Accustomed to life underground, you have darkvision out to 60 feet." }
      ],
      suboptions_title_pl: "Podrasy Gnomów (Wybór specjalizacji)",
      suboptions_headers_pl: ["Podrasa Gnoma", "Dodatkowa Cecha", "Unikalne Zdolności Podrasy"],
      suboptions_table: [
        ["⚙️ Gnom Skalny (Rock Gnome)", "+1 Kondycja", "Wiedza Rzemieślnika (podwójna biegłość w Historii dot. przedmiotów magicznych, alchemicznych i technologicznych) oraz Majsterkowicz (Tinker: biegłość w narzędziach majsterkowicza, tworzenie nakręcanych zabawek, zapalniczek i pozytywek)."],
        ["🌿 Gnom Leśny (Forest Gnome)", "+1 Zręczność", "Naturalny Iluzjonista (znasz sztuczkę Pomniejsza Iluzja / Minor Illusion z INT) oraz Rozmowa z Małymi Zwierzętami (komunikacja z bestiami o rozmiarze Małym lub mniejszym)."]
      ]
    },

    "aasimar": {
      xl: true,
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość jak u ludzi (ok. 18 lat), ale mogą żyć aż do 160 lat.",
      age_en: "Mature at the same rate as humans, but they can live up to 160 years.",
      height_pl: "Średni lub Mały (MPMM pozwala wybrać rozmiar Średni lub Mały)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny (Common), Niebiański (Celestial)",
      languages_en: "Common, Celestial",
      lore_pl: "Śmiertelnicy noszący w duszy iskrę Wyższych Planów (Elysium, Góry Celestii lub Arbory). Aasimarowie posiadają wrodzoną odporność zarówno na światłość, jak i nekrozę, potrafią leczyć dotykiem, a od 3. poziomu uwalniają swoją anielską lub upadłą formę bojową.",
      lore_en: "Aasimar bear within their souls the light of the heavens, descending from mortals touched by a deity or celestial being.",
      detailed_traits: [
        { name_pl: "Niebiańska Odporność (Celestial Resistance)", name_en: "Celestial Resistance", tag_pl: "2 Odporności: Nekrotyczne i Światłość!", desc_pl: "Posiadasz stałą odporność na obrażenia nekrotyczne (Necrotic) ORAZ obrażenia od światłości (Radiant).", desc_en: "You have resistance to necrotic damage and radiant damage." },
        { name_pl: "Uzdrawiające Dłonie (Healing Hands)", name_en: "Healing Hands", tag_pl: "Akcja • Leczenie k4", desc_pl: "Jako akcję dotykasz istoty i rzucasz liczbą kości k4 równą Twojej Premii z Biegłości. Istota odzyskuje tyle Punktów Wytrzymałości (1/długi odpoczynek). Ponadto znasz sztuczkę Światło (Light).", desc_en: "As an action, touch a creature and roll a number of d4s equal to your Proficiency Bonus to heal it (1/long rest). You also know the Light cantrip." },
        { name_pl: "Niebiańskie Objawienie (Celestial Revelation — od 3. poz.)", name_en: "Celestial Revelation", tag_pl: "Akcja dodatkowa • 1 min • +PB obrażeń", desc_pl: "Od 3. poziomu jako akcję dodatkową przechodzisz transformację na 1 minutę (1/długi odpoczynek). Wybierasz jedną z 3 form poniżej. Raz w każdej swojej turze możesz dodać dodatkowe obrażenia (światłość lub nekrotyczne) równe Twojej Premii z Biegłości do jednego celu trafionego atakiem lub zaklęciem!", desc_en: "At 3rd level, transform as a bonus action for 1 minute (1/long rest), dealing extra damage equal to your PB once per turn." }
      ],
      suboptions_title_pl: "Trzy Formy Niebiańskiego Objawienia Aasimara (wybierane przy aktywacji od 3. poziomu)",
      suboptions_headers_pl: ["Forma Objawienia", "Typ Dodatkowych Obrażeń (+PB/turę)", "Efekt Specjalny Transformacji (1 minuta)"],
      suboptions_table: [
        ["🪽 Świetlista Dusza (Radiant Soul)", "+Premia Biegłości (Światłość)", "Z Twoich pleców wyrastają dwie świetliste, bezcielesne skrzydła — zyskujesz szybkość latania równą Twojej szybkości chodzenia (30 stóp)!"],
        ["☀️ Niebiańska Konsumpcja (Radiant Consumption)", "+Premia Biegłości (Światłość)", "Bije od Ciebie oślepiające światło (promień 10 stóp). Na koniec każdej Twojej tury każda istota w promieniu 10 stóp od Ciebie automatycznie otrzymuje obrażenia od światłości równe Twojej Premii z Biegłości!"],
        ["💀 Nekrotyczny Całun (Necrotic Shroud)", "+Premia Biegłości (Nekrotyczne)", "Twoje oczy zmieniają się w czarne studnie, a z pleców wyrastają nielotne skrzydła cienia. W momencie aktywacji wybrane istoty w promieniu 10 stóp muszą wykonać rzut obronny na CHA (ST = 8 + PB + CHA) albo zostają Przerażone (Frightened) do końca Twojej następnej tury!"]
      ]
    },

    "goliath": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Długość życia zbliżona do ludzi (dojrzałość ok. 18 lat, żyją do 80–90 lat).",
      age_en: "Goliaths have lifespans comparable to humans.",
      height_pl: "Średni — Potężna Budowa (ok. 215–245 cm wzrostu, 130–160 kg wagi)",
      height_en: "Medium — Powerful Build (between 7 and 8 feet tall and weigh between 280 and 340 pounds)",
      languages_pl: "Wspólny (Common), Olbrzymi (Giant)",
      languages_en: "Common, Giant",
      lore_pl: "Potomkowie olbrzymów zamieszkujący najwyższe, skute lodem granie górskie. Goliaci traktują całe życie jako wielkie wyzwanie i rywalizację, a ich kamienna skóra potrafi zatrzymać ciosy, które powaliłyby zwykłego śmiertelnika.",
      lore_en: "At home on the highest mountain peaks, goliaths boast stone-hard endurance and giant-born athleticism.",
      detailed_traits: [
        { name_pl: "Kamienna Wytrzymałość (Stone's Endurance)", name_en: "Stone's Endurance", tag_pl: "Reakcja • Redukcja 1k12 + KON", desc_pl: "Kiedy otrzymujesz obrażenia, możesz użyć swojej Reakcji, aby rzucić kością 1k12, dodać swój modyfikator z Kondycji i zmniejszyć otrzymane obrażenia o uzyskaną sumę! Liczba użyć: Premia z Biegłości / długi odpoczynek.", desc_en: "When you take damage, use your reaction to roll a d12 + CON modifier and reduce the damage by that total (PB/long rest)." },
        { name_pl: "Urodzony w Górach (Mountain Born)", name_en: "Mountain Born", tag_pl: "Odporność: Zimno", desc_pl: "Posiadasz stałą odporność na obrażenia od zimna i jesteś naturalnie przystosowany do przebywania na ogromnych wysokościach.", desc_en: "You have resistance to cold damage and are naturally acclimated to high altitudes." },
        { name_pl: "Mały Olbrzym (Little Giant)", name_en: "Little Giant", tag_pl: "Atletyka + Podwójny Udźwig", desc_pl: "Posiadasz biegłość w umiejętności Atletyka (Athletics) oraz liczysz się jako istota o 1 rozmiar większa (Duża / Large) przy określaniu udźwigu oraz ciężaru, który możesz pchać, ciągnąć i podnosić.", desc_en: "Proficiency in Athletics, and you count as one size larger when determining carrying capacity and push/drag/lift weight." }
      ]
    },

    "warforged": {
      xl: true,
      creature_type_pl: "Humanoid (Żywy Konstrukt)",
      creature_type_en: "Humanoid (Living Construct)",
      age_pl: "Brak naturalnego starzenia; maksymalny wiek pozostaje nieznany.",
      age_en: "Immune to magical aging effects; maximum lifespan remains a mystery.",
      height_pl: "Średni (ok. 180–210 cm wzrostu, 120–150 kg z drewna, kamienia i stali)",
      height_en: "Medium (6 to 7 feet tall, 270 to 300 pounds)",
      languages_pl: "Wspólny + 1 dowolny dodatkowy język",
      languages_en: "Common + one other language of your choice",
      lore_pl: "Stworzeni w kuźniach Domu Cannith jako bezwzględni żołnierze Ostatniej Wojny w Eberronie, obdarzeni świadomością i wolną wolą. Ich ciała z alchemicznego drewna i metalowych płyt zapewniają im niezrównaną przeżywalność i wbudowany pancerz.",
      lore_en: "Built as weapons during the Last War in Eberron, warforged are sentient beings of root-like fibers and armored plates seeking their purpose.",
      detailed_traits: [
        { name_pl: "Zintegrowana Ochrona (Integrated Protection)", name_en: "Integrated Protection", tag_pl: "Stałe +1 do KP (Auto)", desc_pl: "Twoje ciało ma wbudowane warstwy ochronne: otrzymujesz stałą premię +1 do Klasy Pancerza (automatycznie wliczaną na Karcie Postaci!). Ponadto założony pancerz integruje się z Twoim ciałem (1 godzina) i nie może zostać zdjęty wbrew Twojej woli.", desc_en: "You gain a +1 bonus to Armor Class. Your armor is integrated directly into your body and cannot be removed against your will." },
        { name_pl: "Konstrukcyjna Odporność (Constructed Resilience)", name_en: "Constructed Resilience", tag_pl: "Trucizny, Choroby, Brak Oddechu/Snu", desc_pl: "1) Ułatwienie w rzutach obronnych przeciw zatruciu i odporność na obrażenia od trucizn. 2) Nie musisz jeść, pić ani oddychać. 3) Jesteś całkowicie niewrażliwy na choroby. 4) Nie musisz spać, a magia nie może Cię uśpić.", desc_en: "Advantage vs poison and poison resistance; no need to eat, drink, breathe, or sleep; immune to disease and magical sleep." },
        { name_pl: "Warta Spoczynku i Wyspecjalizowany Projekt", name_en: "Sentry's Rest & Specialized Design", tag_pl: "6h Warty + Umiejętność i Narzędzie", desc_pl: "Podczas długiego odpoczynku spędzasz 6 godzin w nieruchomym stanie wartownika, ale zachowujesz PEŁNĄ świadomość (widzisz i słyszysz wszystko normalnie!). Dodatkowo zyskujesz biegłość w 1 dowolnej umiejętności i 1 dowolnym narzędziu.", desc_en: "6-hour conscious motionless state for long rest (you see and hear normally). Gain 1 skill proficiency and 1 tool proficiency." }
      ]
    },

    "yuan-ti": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość i długość życia zbliżona do ludzi (do ok. 90–100 lat).",
      age_en: "Mature at the same rate as humans and have lifespans similar in length to theirs.",
      height_pl: "Średni lub Mały (węże oczy, rozwidlony język, łuski na skórze)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Smoczy lub Otchłanny",
      languages_en: "Common + 1 other language",
      lore_pl: "Obdarzeni wężową krwią, chłodnym intelektem i magiczną odpornością. Yuan-ti Czystej Krwi przypominają ludzi z subtelnymi gadziimi cechami, ale są całkowicie odporni na jad i niezwykle trudni do trafienia wrogimi zaklęciami.",
      lore_en: "Blessed with serpentine blood and cold calculation, yuan-ti shrug off poison and hostile spells alike.",
      detailed_traits: [
        { name_pl: "Odporność na Magię (Magic Resistance)", name_en: "Magic Resistance", tag_pl: "Stałe Adv. przeciw Zaklęciom!", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we wszystkich rzutach obronnych przeciwko zaklęciom!", desc_en: "You have advantage on saving throws against spells." },
        { name_pl: "Odporność na Trucizny (Poison Resilience)", name_en: "Poison Resilience", tag_pl: "Odporność: Trucizna", desc_pl: "Masz Ułatwienie w rzutach obronnych przeciwko zatruciu i odporność na obrażenia od trucizn.", desc_en: "Advantage on saving throws you make to avoid or end the poisoned condition on yourself, and resistance to poison damage." },
        { name_pl: "Wężowe Zaklęcia (Serpentine Spellcasting)", name_en: "Serpentine Spellcasting", tag_pl: "Sugestia + Rozmowa z Wężami", desc_pl: "Znasz sztuczkę Trujący Rozpylacz (Poison Spray). Możesz rzucać bez ograniczeń Przyjaźń ze Zwierzętami (Animal Friendship) na węże, a od 3. poziomu możesz raz dziennie rzucić Sugestię (Suggestion) bez komponentów materialnych!", desc_en: "You know Poison Spray, can cast Animal Friendship on snakes at will, and cast Suggestion 1/long rest starting at 3rd level." }
      ]
    },

    "harengon": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Żyją około 100 lat.",
      age_en: "Harengons have a lifespan of about a century.",
      height_pl: "Średni lub Mały (wybierasz przy tworzeniu postaci)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Sylwan",
      languages_en: "Common + 1 other language",
      lore_pl: "Pochodzący z Feywildu królikoludzie przepełnieni energią i szczęściem. Dzięki Zajęczemu Refleksowi niemal zawsze działają pierwsi w walce, a ich Króliczy Skok pozwala błyskawicznie uciec z zasięgu wrogów bez wywoływania ataków okazyjnych.",
      lore_en: "Harengons originated in the Feywild, blessed with leporine reflexes, keen ears, and supernatural luck.",
      detailed_traits: [
        { name_pl: "Zajęczy Refleks (Hare-Trigger)", name_en: "Hare-Trigger", tag_pl: "+Biegłość do Inicjatywy (Auto)", desc_pl: "Dodajesz swoją Premię z Biegłości (+2 do +6) do każdego rzutu na Inicjatywę (automatycznie wliczane na Karcie Postaci!).", desc_en: "You can add your proficiency bonus to your initiative rolls." },
        { name_pl: "Szczęśliwa Praca Nóg (Lucky Footwork)", name_en: "Lucky Footwork", tag_pl: "Reakcja • +1k4 do Rzutu na ZRĘ", desc_pl: "Gdy nie powiedzie Ci się rzut obronny na Zręczność, możesz użyć Reakcji, aby rzucić 1k4 i dodać wynik do rzutu obronnego, potencjalnie zmieniając porażkę w sukces!", desc_en: "When you fail a Dexterity saving throw, use your reaction to roll a d4 and add it to the save." },
        { name_pl: "Króliczy Skok (Rabbit Hop) i Zajęcze Zmysły", name_en: "Rabbit Hop & Leporine Senses", tag_pl: "Akcja dodatkowa • Skok bez AoO", desc_pl: "Jako akcję dodatkową skaczesz na odległość równą 5 × Twoja Premia z Biegłości stóp (od 10 do 30 stóp), nie wywołując przy tym ataków okazyjnych! (Liczba użyć: PB/długi odpoczynek). Posiadasz także biegłość w Percepcji.", desc_en: "Bonus action jump a number of feet equal to 5 × PB without provoking opportunity attacks. Proficiency in Perception." }
      ]
    },

    "fairy": {
      creature_type_pl: "Fey (Wróżka — NIE Humanoid!)",
      creature_type_en: "Fey",
      age_pl: "Żyją około 100 lat (lub znacznie dłużej w Feywildzie).",
      age_en: "Fairies have a life span of about a century.",
      height_pl: "Mały (ok. 75–105 cm wzrostu, owadzie lub motyle skrzydła)",
      height_en: "Small",
      languages_pl: "Wspólny, Sylwan",
      languages_en: "Common, Sylvan",
      lore_pl: "Rodowite istoty z Feywildu nasycone czystą magią natury. Jako istoty typu Fey są odporne na zaklęcia celujące wyłącznie w Humanoidy (jak Hold Person czy Charm Person) oraz potrafią swobodnie latać już od 1. poziomu!",
      lore_en: "Native to the Feywild, fairies are wee folk infused with magic, sporting insectoid or avian wings.",
      detailed_traits: [
        { name_pl: "Lot (Flight)", name_en: "Flight", tag_pl: "Stały Lot 30 ft (9 m)!", desc_pl: "Dzięki swoim skrzydłom posiadasz stałą szybkość latania równą Twojej szybkości chodzenia (30 stóp / 9 m), dopóki nie nosisz średniego ani ciężkiego pancerza.", desc_en: "Because of your wings, you have a flying speed equal to your walking speed while not wearing medium or heavy armor." },
        { name_pl: "Magia Wróżek (Fairy Magic)", name_en: "Fairy Magic", tag_pl: "3 Zaklęcia Fey", desc_pl: "Znasz sztuczkę Sztuka Druidyczna (Druidcraft). Od 3. poziomu możesz rzucać Ogień Fey (Faerie Fire), a od 5. poziomu — Powiększenie/Pomniejszenie (Enlarge/Reduce). Raz dziennie za darmo + możliwość rzucania z komórek czarów!", desc_en: "You know Druidcraft. Cast Faerie Fire at 3rd level and Enlarge/Reduce at 5th level (1/day free + castable with spell slots)." },
        { name_pl: "Typ Istoty: Fey", name_en: "Creature Type: Fey", tag_pl: "Odporność na zaklęcia vs Humanoidy", desc_pl: "Twój typ istoty to Fey, a nie Humanoid (zaklęcia takie jak Unieruchomienie Osoby / Hold Person czy Zauroczenie Osoby na Ciebie nie działają!).", desc_en: "Your creature type is Fey, rather than Humanoid." }
      ]
    },

    "tabaxi": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Długość życia zbliżona do ludzi (ok. 80–90 lat).",
      age_en: "Lifespans equivalent to humans.",
      height_pl: "Średni lub Mały (smukła, kocia sylwetka)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Wędrowni kocioludzie kierowani nienasyconą ciekawością świata, artefaktów i opowieści. Tabaxi potrafią w ułamku sekundy podwoić swoją prędkość, co w połączeniu ze Sprintem pozwala im pokonać ponad 120 stóp w jednej turze.",
      lore_en: "Created by the Cat Lord, tabaxi are agile feline wanderers driven by curiosity.",
      detailed_traits: [
        { name_pl: "Kocia Zwinność (Feline Agility)", name_en: "Feline Agility", tag_pl: "2× Szybkość Ruchu (0 akcji!)", desc_pl: "Kiedy poruszasz się w swojej turze w walce, możesz podwoić swoją szybkość do końca tej tury (bez zużywania żadnej akcji!). Po użyciu tej zdolności odnawia się ona natychmiast, gdy spędzisz jedną turę, poruszając się o 0 stóp.", desc_en: "When you move on your turn in combat, you can double your speed until the end of the turn. Recharges when you move 0 feet on a turn." },
        { name_pl: "Kocie Pazury (Cat's Claws)", name_en: "Cat's Claws", tag_pl: "Wspinaczka 30 ft + 1k6 cięte", desc_pl: "Posiadasz stałą szybkość wspinaczki 30 stóp (9 m), a Twoje pazury są naturalną bronią zadającą 1k6 + modyfikator z Siły obrażeń ciętych.", desc_en: "You have a climbing speed equal to your walking speed (30 ft) and claws dealing 1d6 + STR slashing damage." },
        { name_pl: "Kocie Talenty i Widzenie w Ciemności (60 ft)", name_en: "Cat's Talent & Darkvision", tag_pl: "Percepcja + Skradanie się", desc_pl: "Zyskujesz biegłość w dwóch kluczowych umiejętnościach: Percepcji (Perception) oraz Skradaniu się (Stealth), a także Widzenie w ciemności na 60 stóp.", desc_en: "Proficiency in Perception and Stealth, plus Darkvision out to 60 feet." }
      ]
    },

    "dhampir": {
      xl: true,
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Starzeją się niezwykle wolno lub wcale; mogą żyć setki lat.",
      age_en: "Suspended between life and death, dhampirs can live for centuries.",
      height_pl: "Średni lub Mały (blada cera, drapieżne kły)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      special_speeds_pl: "Chodzenie 35 ft + Pajęcza Wspinaczka 35 ft (ściany i sufit bez użycia rąk!)",
      lore_pl: "Zawieszeni między życiem a nieśmiercią potomkowie lub ocalali z wampirzego uścisku z domen grozy Ravenloftu. Dhampir nie musi oddychać, porusza się z prędkością 35 stóp, biega pionowo po ścianach i sufitach z wolnymi rękami oraz wysysa siły życiowe swoim Wampirzym Ugryzieniem.",
      lore_en: "Poised between the worlds of the living and the dead, dhampirs retain their grip on life while being endlessly tested by vicious hungers.",
      detailed_traits: [
        { name_pl: "Pajęcza Wspinaczka (Spider Climb)", name_en: "Spider Climb", tag_pl: "Chodzenie po ścianach i suficie!", desc_pl: "Twoja szybkość chodzenia wynosi 35 stóp (10,5 m) i masz szybkość wspinaczki 35 stóp. Od 3. poziomu możesz chodzić w górę, w dół i w poprzek pionowych ścian oraz DO GÓRY NOGAMI PO SUFITACH, mając obie ręce całkowicie wolne (np. do strzelania z łuku lub rzucania zaklęć spod sufitu!).", desc_en: "35 ft walking and climbing speed. At 3rd level, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free!" },
        { name_pl: "Wampirze Ugryzienie (Vampiric Bite)", name_en: "Vampiric Bite", tag_pl: "Atak z KONDYCJI (1k4 + KON) + Leczenie/Buff", desc_pl: "Twoje kły są prostą bronią wręcz, do której ataku i obrażeń dodajesz modyfikator z KONDYCJI (zamiast Siły!). Zadaje 1k4 + KON obrażeń kłutych. Gdy masz połowę lub mniej PW, masz Ułatwienie w ataku kłami! Ponadto (PB razy/dzień) możesz wzmocnić ugryzienie, aby: 1) Odzyskać PW równe zadanym obrażeniom, LUB 2) Dodać bonus równy zadanym obrażeniom do swojego następnego rzutu ataku lub testu cechy!", desc_en: "Simple melee weapon using CON for attack and damage (1d4 + CON piercing). Advantage when at or below half HP. Empower PB/day to heal or add damage dealt as a bonus to your next check or attack!" },
        { name_pl: "Bezśmiertna Natura i Dziedzictwo", name_en: "Deathless Nature & Ancestral Legacy", tag_pl: "Brak oddechu + 2 Umiejętności", desc_pl: "Nie musisz oddychać (nie można Cię udusić ani utopić), widzisz w ciemności na 60 stóp oraz zyskujesz biegłość w 2 dowolnie wybranych umiejętnościach.", desc_en: "You don't need to breathe, have Darkvision 60 ft, and gain proficiency in two skills of your choice." }
      ]
    },

    "dwarf-duergar": {
      creature_type_pl: "Humanoid (Krasnolud)",
      creature_type_en: "Humanoid (Dwarf)",
      age_pl: "Żyją do ok. 350 lat.",
      age_en: "Live about 350 years.",
      height_pl: "Średni (ok. 125–145 cm, popielatoszara skóra)",
      height_en: "Medium",
      languages_pl: "Wspólny, Krasnoludzki, Podwspólny",
      languages_en: "Common, Dwarvish",
      lore_pl: "Szare krasnoludy z najgłębszych warstw Podmroku, których przodkowie przetrwali niewolę u Łupieżców Umysłu, wykształcając potężne zdolności psioniczne: powiększanie się do rozmiarów olbrzyma oraz stawanie się niewidzialnym.",
      lore_en: "Duergar are dwarves of the deep Underdark whose ancestors developed psionic powers after escaping mind flayer captivity.",
      detailed_traits: [
        { name_pl: "Magia Duergarów (Duergar Magic)", name_en: "Duergar Magic", tag_pl: "Powiększenie + Niewidzialność", desc_pl: "Od 3. poziomu możesz rzucać na siebie Powiększenie/Pomniejszenie (Enlarge/Reduce), a od 5. poziomu — Niewidzialność (Invisibility), bez żadnych komponentów materialnych! (1/dzień za darmo + z komórek czarów).", desc_en: "At 3rd level cast Enlarge/Reduce; at 5th level cast Invisibility without material components (1/day free + with spell slots)." },
        { name_pl: "Psioniczna Forteca i Krasnoludzka Odporność", name_en: "Psionic Fortitude & Dwarven Resilience", tag_pl: "Adv. vs Zauroczenie, Ogłuszenie i Trucizny", desc_pl: "Masz stałe Ułatwienie w rzutach obronnych przeciw zauroczeniu (Charmed), ogłuszeniu (Stunned) oraz zatruciu (Poisoned), a także odporność na obrażenia od trucizn i Widzenie w ciemności na 120 stóp!", desc_en: "Advantage on saves vs being charmed, stunned, or poisoned; poison resistance; Superior Darkvision 120 ft." }
      ]
    },

    "elf-sea": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Żyją do 750 lat.",
      age_en: "Live up to 750 years.",
      height_pl: "Średni (błony pławne między palcami, skrzela na szyi)",
      height_en: "Medium",
      languages_pl: "Wspólny, Elficki, Pierwotny (Aquan)",
      languages_en: "Common, Elvish",
      special_speeds_pl: "Pływanie 30 ft (oddychanie powietrzem i wodą)",
      lore_pl: "Morskie elfy zakochały się w dzikim pięknie oceanów w pierwszych dniach wieloświata. Są zwinne pod wodą niczym delfiny i odporne na lodowaty chłód głębin.",
      lore_en: "Sea elves fell in love with the wild beauty of the ocean in the earliest days of the multiverse.",
      detailed_traits: [
        { name_pl: "Dziecko Morza i Odporność na Zimno", name_en: "Child of the Sea", tag_pl: "Pływanie 30 ft + Odporność na Zimno", desc_pl: "Oddychasz powietrzem i wodą, masz szybkość pływania 30 stóp oraz stałą odporność na obrażenia od zimna (Cold).", desc_en: "Breathe air and water, 30 ft swim speed, and resistance to cold damage." },
        { name_pl: "Przyjaciel Morza i Trans", name_en: "Friend of the Sea & Trance", tag_pl: "Rozmowa z bestiami wodnymi + Trans", desc_pl: "Komunikujesz się ze wszystkimi zwierzętami posiadającymi szybkość pływania. Posiadasz też Percepcję, Rodowód Fey i 4-godzinny Trans z 2 wymiennymi biegłościami.", desc_en: "Communicate with water-swimming beasts, Keen Senses, Fey Ancestry, and 4-hour Trance." }
      ]
    },

    "elf-pallid": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Żyją do 750 lat.",
      age_en: "Live up to 750 years.",
      height_pl: "Średni (księżycowo blada skóra, ciemne oczy)",
      height_en: "Medium",
      languages_pl: "Wspólny, Elficki",
      languages_en: "Common, Elvish",
      lore_pl: "Mistyczny i pełen duchowej pogody lud z Wildemountu, pobłogosławiony przez Księżycową Tkaczkę (Sehanine). Ich przenikliwy wzrok i intuicja nie mają sobie równych wśród detektywów i inkwizytorów.",
      lore_en: "The pallid elves are a mystical and insightful people blessed by the Moon Weaver.",
      detailed_traits: [
        { name_pl: "Przenikliwe Zmysły (Incisive Sense)", name_en: "Incisive Sense", tag_pl: "Stałe Adv. w Śledztwie i Intuicji!", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we wszystkich testach Inteligencji (Śledztwo / Investigation) oraz Mądrości (Intuicja / Insight)!", desc_en: "You have advantage on Intelligence (Investigation) and Wisdom (Insight) checks." },
        { name_pl: "Błogosławieństwo Księżycowej Tkaczki", name_en: "Blessing of the Moon Weaver", tag_pl: "Światło • Sen • Niewidzialność", desc_pl: "Znasz sztuczkę Światło (Light). Od 3. poziomu możesz raz dziennie rzucić Sen (Sleep), a od 5. poziomu — Niewidzialność (Invisibility) bez komponentów materialnych.", desc_en: "You know Light. Cast Sleep at 3rd level and Invisibility at 5th level (1/long rest)." }
      ]
    },

    "halfling-stout": {
      creature_type_pl: "Humanoid (Niziołek)",
      creature_type_en: "Humanoid (Halfling)",
      age_pl: "Dojrzałość w wieku 20 lat; żyją ok. 150 lat.",
      age_en: "Live about 150 years.",
      height_pl: "Mały (ok. 90–100 cm, krzepka budowa ok. 20–22 kg)",
      height_en: "Small (3 feet tall, 40–45 lb)",
      languages_pl: "Wspólny, Niziołczy",
      languages_en: "Common, Halfling",
      lore_pl: "Niziołki Krzepkie (Waleczne) mają według legend w swoich żyłach domieszkę krasnoludzkiej krwi, dzięki czemu łączą niziołcze szczęście z krasnoludzką odpornością na trucizny.",
      lore_en: "Stout halflings are hardier than average and have some resistance to poison. Some say they have dwarven blood.",
      detailed_traits: [
        { name_pl: "Szczęściarz (Lucky)", name_en: "Lucky", tag_pl: "Przerzut '1' na k20", desc_pl: "Przerzucasz każdą naturalną jedynkę '1' wyrzuconą na kości k20 w teście, ataku lub rzucie obronnym.", desc_en: "Reroll 1s on d20 for attacks, checks, and saves." },
        { name_pl: "Odporność Krzepkich (Stout Resilience)", name_en: "Stout Resilience", tag_pl: "Odporność na Trucizny", desc_pl: "Posiadasz Ułatwienie w rzutach obronnych przeciwko truciznom oraz odporność na obrażenia od trucizn, a także cechę Odważny (Ułatwienie przeciw przerażeniu).", desc_en: "Advantage on saving throws against poison and resistance against poison damage." }
      ]
    },

    "halfling-ghostwise": {
      creature_type_pl: "Humanoid (Niziołek)",
      creature_type_en: "Humanoid (Halfling)",
      age_pl: "Dojrzałość w wieku 20 lat; żyją ok. 150 lat.",
      age_en: "Live about 150 years.",
      height_pl: "Mały (ok. 90 cm, ok. 18 kg)",
      height_en: "Small",
      languages_pl: "Wspólny, Niziołczy + Telepatia 30 ft",
      languages_en: "Common, Halfling + Telepathy 30 ft",
      lore_pl: "Rzadkie, klanowe niziołki zamieszkujące głębokie lasy Chondalwood, obdarzone darem bezgłośnej telepatii, która działa nawet podczas przemiany w zwierzę (Wild Shape Druida).",
      lore_en: "Ghostwise halflings trace their ancestry back to a war among halfling tribes and possess the gift of silent telepathy.",
      detailed_traits: [
        { name_pl: "Cicha Mowa (Silent Speech)", name_en: "Silent Speech", tag_pl: "Telepatia 30 ft", desc_pl: "Możesz komunikować się telepatycznie z dowolną istotą w promieniu 30 stóp (9 m), która rozumie przynajmniej jeden wspólny z Tobą język.", desc_en: "You can speak telepathically to any creature within 30 feet of you that shares a language with you." },
        { name_pl: "Szczęściarz, Odważny i Zwinność", name_en: "Lucky, Brave & Nimbleness", tag_pl: "Przerzut '1' na k20", desc_pl: "Przerzucasz jedynki na k20, masz Ułatwienie przeciw przerażeniu i przechodzisz przez pola większych istot.", desc_en: "Reroll 1s on d20, advantage vs frightened, and move through larger creatures' spaces." }
      ]
    },

    "gnome-deep": {
      creature_type_pl: "Humanoid (Gnom)",
      creature_type_en: "Humanoid (Gnome)",
      age_pl: "Żyją do 250–500 lat.",
      age_en: "Live up to 500 years.",
      height_pl: "Mały (ok. 90–105 cm, skalistoszara skóra)",
      height_en: "Small",
      languages_pl: "Wspólny, Gnomi, Podwspólny",
      languages_en: "Common, Gnomish, Undercommon",
      lore_pl: "Svirfnebliny to strażnicy klejnotów z głębin Podmroku. Dzięki naturalnemu kamuflażowi i wrodzonej magii iluzji oraz anty-dywinacji potrafią ukryć się przed każdym drapieżnikiem i magicznym okiem.",
      lore_en: "Deep gnomes, or svirfneblin, are natives of the Underdark blessed with stealth and protective illusions.",
      detailed_traits: [
        { name_pl: "Dar Svirfneblinów i Kamuflaż", name_en: "Gift & Camouflage of the Svirfneblin", tag_pl: "Nondetection + Adv. Skradanie", desc_pl: "Od 3. poziomu rzucasz Przebranie Siebie (Disguise Self), a od 5. poziomu — Niedostrzeżenie (Nondetection) bez komponentów materialnych! Dodatkowo (PB/dzień) możesz nadać sobie Ułatwienie w teście Skradania się.", desc_en: "Cast Disguise Self at 3rd and Nondetection at 5th level without material components. Gain Stealth advantage PB/long rest." },
        { name_pl: "Gnomia Odporność na Magię i Darkvision 120 ft", name_en: "Gnomish Magic Resistance", tag_pl: "Adv. vs Zaklęcia + 120 ft", desc_pl: "Stałe Ułatwienie w rzutach obronnych na INT, MĄD i CHA przeciw zaklęciom oraz Wyższe Widzenie w Ciemności (120 stóp).", desc_en: "Advantage on INT, WIS, and CHA saves against spells, plus Superior Darkvision 120 ft." }
      ]
    },

    "dragonborn-chromatic": {
      xl: true,
      creature_type_pl: "Humanoid (Drakon)",
      creature_type_en: "Humanoid (Dragonborn)",
      age_pl: "Dojrzałość w wieku 15 lat; żyją ok. 80 lat.",
      age_en: "Reach adulthood by 15 and live around 80 years.",
      height_pl: "Średni (ok. 185–205 cm, łuski w kolorach smoków chromatycznych)",
      height_en: "Medium (over 6 feet tall)",
      languages_pl: "Wspólny, Smoczy",
      languages_en: "Common, Draconic",
      lore_pl: "Zaktualizowany w Fizban's Treasury of Dragons wariant Drakonów o surowej potędze żywiołów smoków chromatycznych (Czarnego, Niebieskiego, Zielonego, Czerwonego lub Białego). Ich Zionięcie zastępuje tylko 1 atak z akcji Ataku, a od 5. poziomu potrafią otoczyć się całkowitą niewrażliwością na swój żywioł!",
      lore_en: "Dragonborn with chromatic ancestry claim the raw elemental power of chromatic dragons.",
      detailed_traits: [
        { name_pl: "Zionięcie Chromatyczne (Linia 5×30 ft)", name_en: "Breath Weapon", tag_pl: "Zastępuje 1 Atak • 1k10–4k10", desc_pl: "Jako część akcji Ataku możesz zastąpić jeden ze swoich ataków Zionięciem w linii 5 × 30 stóp (rzut na ZRĘ, ST = 8 + KON + PB). Zadaje 1k10 (2k10 od 5. poz., 3k10 od 11. poz., 4k10 od 17. poz.) obrażeń Twojego żywiołu. Liczba użyć: PB / długi odpoczynek.", desc_en: "Replace one attack with a 30-ft line breath weapon dealing 1d10 to 4d10 damage (PB/long rest)." },
        { name_pl: "Chromatyczna Osłona (Chromatic Warding — od 5. poz.)", name_en: "Chromatic Warding", tag_pl: "1 min • Całkowita Niewrażliwość (Immunity)!", desc_pl: "Posiadasz stałą odporność na wybrany żywioł, a od 5. poziomu możesz jako akcję otoczyć się smoczą energią na 1 minutę, zyskując CAŁKOWITĄ NIEWRAŻLIWOŚĆ (0 obrażeń!) na swój żywioł! (1/długi odpoczynek).", desc_en: "Permanent resistance to your element. At 5th level, use an action to become completely IMMUNE to your element for 1 minute (1/long rest)." }
      ],
      suboptions_title_pl: "Rodowody Drakonów Chromatycznych (Fizban's Treasury of Dragons)",
      suboptions_headers_pl: ["Smoczy Przodek", "Żywioł (Zionięcie, Odporność i Niewrażliwość)", "Kształt i Rzut Obronny"],
      suboptions_table: [
        ["⚫ Czarny Smok (Black)", "Kwas (Acid)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["🔵 Niebieski Smok (Blue)", "Błyskawice (Lightning)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["🟢 Zielony Smok (Green)", "Trucizna (Poison)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["🔴 Czerwony Smok (Red)", "Ogień (Fire)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"],
        ["⚪ Biały Smok (White)", "Zimno (Cold)", "Linia 5 × 30 stóp (Rzut obronny na Zręczność)"]
      ]
    },

    "dragonborn-metallic": {
      xl: true,
      creature_type_pl: "Humanoid (Drakon)",
      creature_type_en: "Humanoid (Dragonborn)",
      age_pl: "Dojrzałość w wieku 15 lat; żyją ok. 80 lat.",
      age_en: "Reach adulthood by 15 and live around 80 years.",
      height_pl: "Średni (ok. 185–205 cm, lśniące metaliczne łuski)",
      height_en: "Medium",
      languages_pl: "Wspólny, Smoczy",
      languages_en: "Common, Draconic",
      lore_pl: "Drakony z podręcznika Fizbana wywodzące się od szlachetnych smoków metalicznych (Złotego, Srebrnego, Brązowego, Miedzianego lub Mosiężnego). Podobnie jak prawdziwe smoki metaliczne, posiadają DRUGI rodzaj zionięcia służący do kontroli pola bitwy!",
      lore_en: "Dragonborn with metallic ancestry lay claim to the tenacity and two distinct breath weapons of metallic dragons.",
      detailed_traits: [
        { name_pl: "Zionięcie Żywiołu (Stożek 15 ft)", name_en: "Breath Weapon", tag_pl: "Zastępuje 1 Atak • 1k10–4k10", desc_pl: "Zastępuje 1 atak z akcji Ataku: stożek 15 stóp zadający 1k10–4k10 obrażeń Twojego żywiołu (Ogień dla Złotego/Mosiężnego, Zimno dla Srebrnego, Błyskawice dla Brązowego, Kwas dla Miedzianego) oraz stała odporność na ten żywioł.", desc_en: "Replace one attack with a 15-ft cone elemental breath weapon (PB/long rest) + permanent elemental resistance." },
        { name_pl: "Metaliczne Zionięcie (Metallic Breath Weapon — od 5. poz.)", name_en: "Metallic Breath Weapon", tag_pl: "Obezwładnienie LUB Odepchnięcie 20 ft + Powalenie!", desc_pl: "Od 5. poziomu zyskujesz drugie zionięcie (stożek 15 ft, 1/długi odpoczynek) z wyborem efektu: 1) Zionięcie Obezwładniające (rzut na KON albo wrogowie stają się Obezwładnieni / Incapacitated do początku Twojej następnej tury!), LUB 2) Zionięcie Odpychające (rzut na SIŁ albo wrogowie zostają odepchnięci o 20 stóp i Powaleni / Prone!).", desc_en: "At 5th level, gain a second breath weapon (15-ft cone): Enervating Breath (CON save or Incapacitated) OR Repulsion Breath (STR save or pushed 20 ft and knocked Prone)." }
      ]
    },

    "dragonborn-gem": {
      xl: true,
      creature_type_pl: "Humanoid (Drakon)",
      creature_type_en: "Humanoid (Dragonborn)",
      age_pl: "Dojrzałość w wieku 15 lat; żyją ok. 80 lat.",
      age_en: "Reach adulthood by 15 and live around 80 years.",
      height_pl: "Średni (krystaliczne łuski lewitujące wokół rogów i ramion)",
      height_en: "Medium",
      languages_pl: "Wspólny, Smoczy + Telepatia 30 ft",
      languages_en: "Common, Draconic + Telepathy 30 ft",
      lore_pl: "Dziedzice psionicznych smoków klejnotowych (Ametystowego, Kryształowego, Szmaragdowego, Szafirowego i Topazowego). Władają najrzadszymi rodzajami obrażeń w grze (Moc, Światłość, Psychiczne, Grzmot, Nekrotyczne), porozumiewają się telepatycznie i potrafią latać na skrzydłach czystej psioniki.",
      lore_en: "Gem dragonborn partake of the heritage of Sardior and psionic gem dragons, wielding telepathy, flight, and rare energy types.",
      detailed_traits: [
        { name_pl: "Klejnotowe Zionięcie i Rzadka Odporność", name_en: "Breath Weapon & Gem Resistance", tag_pl: "Stożek 15 ft • Moc / Psychiczne / Światłość / Grzmot / Nekrotyczne", desc_pl: "Stała odporność oraz Zionięcie (stożek 15 ft, zastępuje 1 atak, 1k10–4k10) w wybranym rzadkim typie obrażeń (np. Szmaragdowy = Psychiczne, co w połączeniu z Szarżą Niedźwiedzia Barbarzyńcy daje odporność na absolutnie KAŻDY typ obrażeń w D&D 5e!).", desc_en: "15-ft cone breath weapon and resistance to Force, Radiant, Psychic, Thunder, or Necrotic damage." },
        { name_pl: "Klejnotowy Lot (Gem Flight — od 5. poz.) i Telepatia", name_en: "Gem Flight & Psionic Mind", tag_pl: "Akcja dodatkowa • Lot 1 min + Telepatia 30 ft", desc_pl: "Posiadasz stałą telepatię na 30 stóp. Od 5. poziomu jako akcję dodatkową manifestujesz widmowe skrzydła z klejnotów na 1 minutę, zyskując szybkość latania 30 stóp i możliwość zawisania w powietrzu (Hover)!", desc_en: "30-ft telepathy. At 5th level, bonus action to manifest spectral gem wings granting 30-ft flying speed and hover for 1 minute." }
      ],
      suboptions_title_pl: "Rodowody Drakonów Klejnotowych (Fizban's Treasury of Dragons)",
      suboptions_headers_pl: ["Klejnotowy Smok", "Typ Obrażeń i Odporności", "Kształt Zionięcia"],
      suboptions_table: [
        ["💜 Ametystowy (Amethyst)", "Moc (Force)", "Stożek 15 stóp (Rzut obronny na Zręczność)"],
        ["💎 Kryształowy (Crystal)", "Światłość (Radiant)", "Stożek 15 stóp (Rzut obronny na Zręczność)"],
        ["💚 Szmaragdowy (Emerald)", "Psychiczne (Psychic)", "Stożek 15 stóp (Rzut obronny na Zręczność)"],
        ["💙 Szafirowy (Sapphire)", "Grzmot (Thunder)", "Stożek 15 stóp (Rzut obronny na Zręczność)"],
        ["💛 Topazowy (Topaz)", "Nekrotyczne (Necrotic)", "Stożek 15 stóp (Rzut obronny na Zręczność)"]
      ]
    },

    "tiefling-winged": {
      creature_type_pl: "Humanoid (Diabelstwo)",
      creature_type_en: "Humanoid (Tiefling)",
      age_pl: "Żyją ok. 100–110 lat.",
      age_en: "Live around 100 years.",
      height_pl: "Średni (duże, skórzaste skrzydła nietoperza)",
      height_en: "Medium",
      languages_pl: "Wspólny, Piekielny",
      languages_en: "Common, Infernal",
      special_speeds_pl: "Stały Lot 30 ft (działa w lekkim i ŚREDNIM pancerzu!)",
      lore_pl: "Wariant Diabelstwa ze Sword Coast Adventurer's Guide, który zamiast wrodzonych zaklęć Piekielnego Dziedzictwa posiada potężne, skórzaste skrzydła nietoperza pozwalające latać nawet w pancerzu średnim!",
      lore_en: "A variant tiefling from SCAG that trades Infernal Legacy spellcasting for bat-like wings that work even in medium armor.",
      detailed_traits: [
        { name_pl: "Skrzydła Nietoperza (Winged)", name_en: "Winged", tag_pl: "Stały Lot 30 ft (nawet w Średnim Pancerzu!)", desc_pl: "Posiadasz skórzaste skrzydła wyrastające z łopatek. Masz stałą szybkość latania 30 stóp (9 m), dopóki nie nosisz ciężkiego pancerza (jako jedna z niewielu latających ras możesz latać w Półpancerzu + Tarczy!).", desc_en: "You have bat-like wings sprouting from your shoulder blades. You have a flying speed of 30 feet while you aren't wearing heavy armor." },
        { name_pl: "Piekielna Odporność i Darkvision 60 ft", name_en: "Hellish Resistance & Darkvision", tag_pl: "Odporność na Ogień + 60 ft", desc_pl: "Posiadasz stałą odporność na obrażenia od ognia oraz Widzenie w ciemności na odległość 60 stóp.", desc_en: "Resistance to fire damage and Darkvision out to 60 feet." }
      ]
    },

    "aarakocra": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 3 lat; żyją zazwyczaj ok. 30 lat.",
      age_en: "Reach maturity by age 3 and usually live no longer than 30 years.",
      height_pl: "Średni (ok. 150 cm wzrostu, rozpiętość skrzydeł do 6 metrów, waga ok. 36–45 kg)",
      height_en: "Medium (about 5 feet tall, 80–100 pounds, 20-foot wingspan)",
      languages_pl: "Wspólny, Aarakocra, Auran",
      languages_en: "Common, Aarakocra, Auran",
      special_speeds_pl: "Stały Lot 30 ft (w lekkim pancerzu lub bez pancerza)",
      lore_pl: "Ptakoludzie pochodzący z Planu Żywiołu Powietrza, strzegący niebios i wysokich szczytów. W walce pikują z chmur, ciskając zaklęcia wiatru i rozszarpując wrogów szponami.",
      lore_en: "Sequestered in high mountains atop tall trees, the aarakocra evoke fear and wonder as guardians of the sky.",
      detailed_traits: [
        { name_pl: "Lot (Flight) i Szpony (Talons)", name_en: "Flight & Talons", tag_pl: "Lot 30 ft + Szpony 1k6", desc_pl: "Posiadasz szybkość latania równą szybkości chodzenia (30 ft) w lekkim lub braku pancerza. Twoje szpony zadają 1k6 + modyfikator z Siły obrażeń ciętych.", desc_en: "Flying speed equal to walking speed (in light/no armor) and talons dealing 1d6 + STR slashing damage." },
        { name_pl: "Wzywający Wiatr (Wind Caller)", name_en: "Wind Caller", tag_pl: "Podmuch Wiatru (Gust of Wind)", desc_pl: "Od 3. poziomu możesz rzucać zaklęcie Podmuch Wiatru (Gust of Wind) bez komponentów materialnych (1/dzień za darmo + z komórek czarów).", desc_en: "Starting at 3rd level, cast Gust of Wind without material components (1/day free + with spell slots)." }
      ]
    },

    "bugbear": {
      xl: true,
      creature_type_pl: "Humanoid (Goblinoid)",
      creature_type_en: "Humanoid (Goblinoid)",
      age_pl: "Dojrzałość w wieku 16 lat; żyją do 80 lat.",
      age_en: "Reach adulthood at age 16 and live up to 80 years.",
      height_pl: "Średni — Potężna Budowa (ok. 185–240 cm wzrostu, 115–160 kg, zaskakująco bezszelestni)",
      height_en: "Medium (between 6 and 8 feet tall and weigh between 250 and 350 pounds)",
      languages_pl: "Wspólny, Gobliński",
      languages_en: "Common, Goblin",
      lore_pl: "Mimo ogromnej, futrzastej sylwetki Bugbeary poruszają się z nadnaturalną ciszą i potrafią przecisnąć się przez zaskakująco wąskie szczeliny. W pierwszej rundzie walki są jednymi z najgroźniejszych zabójców w całym D&D 5e.",
      lore_en: "Despite their formidable build, bugbears are quiet skulkers who strike with devastating ambushes and uncanny reach.",
      detailed_traits: [
        { name_pl: "Atak z Zaskoczenia (Surprise Attack)", name_en: "Surprise Attack", tag_pl: "+2k6 Obrażeń do KAŻDEGO trafienia w 1. rundzie!", desc_pl: "Jeśli trafisz istotę rzutem ataku (bronią wręcz, dystansową lub atakiem czarem jak Scorching Ray / Eldritch Blast!), a istota ta nie wykonała jeszcze swojej pierwszej tury w tym starciu, zadajesz jej dodatkowe +2k6 obrażeń przy KAŻDYM takim trafieniu (bez limitu raz na turę!).", desc_en: "If you hit a creature with an attack roll, the creature takes an extra 2d6 damage if it hasn't taken a turn yet in the current combat (applies to every attack hit!)." },
        { name_pl: "Długie Kończyny (Long-Limbed)", name_en: "Long-Limbed", tag_pl: "+5 ft Zasięgu Wręcz!", desc_pl: "Kiedy wykonujesz atak wręcz w swojej turze, Twój zasięg dla tego ataku jest o 5 stóp (1,5 m) większy niż normalnie (z bronią drzewcową sięgasz aż na 15 stóp!).", desc_en: "When you make a melee attack on your turn, your reach for it is 5 feet greater than normal." },
        { name_pl: "Skryty (Sneaky), Rodowód Fey i Potężna Budowa", name_en: "Sneaky, Fey Ancestry & Powerful Build", tag_pl: "Skradanie się + Przeciskanie + Udźwig", desc_pl: "Masz biegłość w Skradaniu się i możesz poruszać się bez kar przez przestrzenie wystarczające dla istot Małych (Small). Masz też Ułatwienie przeciw zauroczeniu, podwójny udźwig i Widzenie w ciemności 60 ft.", desc_en: "Stealth proficiency, move through Small spaces without squeezing, Advantage vs Charmed, Powerful Build, and Darkvision 60 ft." }
      ]
    },

    "centaur": {
      creature_type_pl: "Fey (NIE Humanoid!)",
      creature_type_en: "Fey",
      age_pl: "Dojrzałość i długość życia zbliżona do ludzi.",
      age_en: "Mature and age at about the same rate as humans.",
      height_pl: "Średni — Końska Budowa (ok. 195–215 cm wzrostu, 270–320 kg wagi)",
      height_en: "Medium (6 to 7 feet tall, Equine Build)",
      languages_pl: "Wspólny, Sylwan",
      languages_en: "Common, Sylvan",
      lore_pl: "Galopujący wojownicy i wędrowcy natury o ciele rumaka i torsie człowieka. Dzięki szybkości 40 stóp i typowi istoty Fey błyskawicznie szarżują na linie wroga.",
      lore_en: "Roamers at heart, centaurs love open spaces and the freedom to travel.",
      detailed_traits: [
        { name_pl: "Szybkość 40 stóp, Typ Fey i Szarża (Charge)", name_en: "Charge & Fey Type", tag_pl: "40 ft + Kopyta w akcji dodatkowej", desc_pl: "Twoja szybkość bazowa wynosi aż 40 stóp (12 m), a Twój typ istoty to Fey. Jeśli przemieścisz się o co najmniej 30 stóp w linii prostej w stronę celu i trafisz go atakiem bronią wręcz, możesz natychmiast wykonać dodatkowy atak Kopytami (1k6 + SIŁ obuchowych) jako akcję dodatkową!", desc_en: "40 ft walking speed, Fey creature type. Move 30 ft straight toward a target and hit with a melee weapon attack to make a bonus action Hooves attack (1d6 + STR)." },
        { name_pl: "Powinowactwo z Naturą i Końska Budowa", name_en: "Natural Affinity & Equine Build", tag_pl: "Podwójny Udźwig + 1 Umiejętność", desc_pl: "Zyskujesz biegłość w 1 umiejętności z listy: Opieka nad Zwierzętami, Medycyna, Natura lub Sztuka Przetrwania. Liczysz się też jako rozmiar Duży (Large) przy obliczaniu udźwigu.", desc_en: "Proficiency in Animal Handling, Medicine, Nature, or Survival; count as one size larger for carrying capacity." }
      ]
    },

    "changeling": {
      creature_type_pl: "Fey (NIE Humanoid!)",
      creature_type_en: "Fey",
      age_pl: "Żyją około 100 lat.",
      age_en: "Live about a century.",
      height_pl: "Średni lub Mały (może zmieniać swój rozmiar w dowolnej chwili jako akcja!)",
      height_en: "Medium or Small (changeable at will!)",
      languages_pl: "Wspólny + 2 dowolne języki",
      languages_en: "Common + 2 other languages",
      lore_pl: "Mistrzowie infiltracji i tożsamości. W przeciwieństwie do iluzji zaklęcia Przebranie Siebie, przemiana Odmieńca jest w 100% fizyczna — dotyk nie zdradza kamuflażu, a zmiana utrzymuje się aż do śmierci lub kolejnej przemiany.",
      lore_en: "With ever-changing appearances, changelings reside in many societies undetected.",
      detailed_traits: [
        { name_pl: "Zmiennokształtny (Shapechanger)", name_en: "Shapechanger", tag_pl: "Akcja • Fizyczna zmiana wyglądu, głosu i rozmiaru!", desc_pl: "Jako akcję fizycznie zmieniasz swój wygląd oraz głos. Sam określasz swój wzrost, wagę, rysy twarzy, brzmienie głosu, długość włosów, kolor skóry oraz ROZMIAR (możesz swobodnie przełączać się między rozmiarem Średnim a Małym!). Przemiana nie jest iluzją i trwa bez ograniczeń czasowych.", desc_en: "As an action, change your appearance and your voice, including switching your size between Medium and Small." },
        { name_pl: "Instynkty Odmieńca i Typ Fey", name_en: "Changeling Instincts & Fey Type", tag_pl: "2 Umiejętności Społeczne + Typ Fey", desc_pl: "Zyskujesz biegłość w 2 umiejętnościach z listy: Oszustwo, Intuicja, Zastraszanie, Występy lub Perswazja. Twój typ istoty to Fey.", desc_en: "Proficiency in two of: Deception, Insight, Intimidation, Performance, or Persuasion. Creature type: Fey." }
      ]
    },

    "firbolg": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość ok. 30 lat; żyją do 500 lat!",
      age_en: "Adulthood around 30; can live up to 500 years.",
      height_pl: "Średni — Potężna Budowa (ok. 210–245 cm wzrostu, 110–140 kg wagi)",
      height_en: "Medium (between 7 and 8 feet tall and weigh between 240 and 300 pounds)",
      languages_pl: "Wspólny, Elficki, Olbrzymi",
      languages_en: "Common, Elvish, Giant",
      lore_pl: "Łagodni leśni strażnicy o olbrzymiej posturze, którzy wolą pozostawać niewidoczni dla intruzów. Ich wrodzona zdolność Ukrytego Kroku daje im natychmiastową niewidzialność w akcji dodatkowej.",
      lore_en: "Firbolg tribes cloister in remote forest strongholds, preferring to spend their days in quiet harmony with the woods.",
      detailed_traits: [
        { name_pl: "Ukryty Krok (Hidden Step)", name_en: "Hidden Step", tag_pl: "Akcja dodatkowa • Niewidzialność!", desc_pl: "Jako akcję dodatkową magicznie stajesz się NIEWIDZIALNY (Invisible) aż do początku swojej następnej tury (lub do wykonania ataku/wymuszenia rzutu obronnego)! Liczba użyć: Premia z Biegłości / długi odpoczynek.", desc_en: "As a bonus action, magically turn invisible until the start of your next turn (PB/long rest)." },
        { name_pl: "Magia Firbolgów, Mowa Liści i Potężna Budowa", name_en: "Firbolg Magic & Speech of Beast and Leaf", tag_pl: "Wykrycie Magii + Przebranie + Udźwig", desc_pl: "Rzucasz Wykrycie Magii (Detect Magic) oraz Przebranie Siebie (Disguise Self — możesz zmniejszyć swój pozorny wzrost o 3 stopy!). Ponadto zwierzęta i rośliny rozumieją Twoje słowa (masz Ułatwienie w testach CHA wobec nich), a Twój udźwig jest podwojony.", desc_en: "Cast Detect Magic and Disguise Self. Communicate with beasts and plants (Advantage on CHA checks to influence them). Powerful Build." }
      ]
    },

    "genasi-air": {
      creature_type_pl: "Humanoid (Genasi)",
      creature_type_en: "Humanoid (Genasi)",
      age_pl: "Żyją do ok. 120 lat.",
      age_en: "Live up to 120 years.",
      height_pl: "Średni lub Mały",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Pierwotny (Auran)",
      languages_en: "Common, Primordial",
      lore_pl: "Potomkowie dżinów z Planu Żywiołu Powietrza. Poruszają się z lekkością wichru (35 stóp), nie potrzebują powietrza do oddychania i władają piorunami oraz lewitacją.",
      lore_en: "Air genasi are descended from djinn, embodying the freedom and speed of the wind.",
      detailed_traits: [
        { name_pl: "Chyży jak Wiatr i Odporność na Błyskawice", name_en: "Lightning Resistance & Speed", tag_pl: "35 ft + Odporność: Błyskawice + Brak Oddechu", desc_pl: "Twoja szybkość chodzenia wynosi 35 stóp (10,5 m), możesz wstrzymywać oddech w nieskończoność i masz stałą odporność na obrażenia od błyskawic (Lightning).", desc_en: "35 ft walking speed, hold breath indefinitely, and resistance to lightning damage." },
        { name_pl: "Zjednoczenie z Wiatrem (Mingle with the Wind)", name_en: "Mingle with the Wind", tag_pl: "Shocking Grasp • Feather Fall • Levitate", desc_pl: "Znasz sztuczkę Porażający Uścisk (Shocking Grasp). Od 3. poziomu rzucasz Piórkowe Opadanie (Feather Fall), a od 5. poziomu — Lewitację (Levitate) bez komponentów materialnych (1/dzień za darmo + z komórek czarów).", desc_en: "Know Shocking Grasp; cast Feather Fall at 3rd and Levitate at 5th level without material components." }
      ]
    },

    "genasi-earth": {
      creature_type_pl: "Humanoid (Genasi)",
      creature_type_en: "Humanoid (Genasi)",
      age_pl: "Żyją do ok. 120 lat.",
      age_en: "Live up to 120 years.",
      height_pl: "Średni lub Mały",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Pierwotny (Terran)",
      languages_en: "Common, Primordial",
      lore_pl: "Obdarzeni mocą dao z Planu Żywiołu Ziemi. Potrafią utwardzać skórę zaklęciem Blade Ward w akcji dodatkowej, nie zwalniają na trudnym terenie i zapewniają drużynie legendarne Przejście bez Śladu.",
      lore_en: "Tracing their ancestry to dao, earth genasi inherit the steadfast strength of bedrock.",
      detailed_traits: [
        { name_pl: "Zjednoczenie z Kamieniem (Merge with Stone)", name_en: "Merge with Stone", tag_pl: "Blade Ward w Akcji Dodatkowej + Pass without Trace!", desc_pl: "Znasz sztuczkę Osłona przed Ostrzami (Blade Ward) i możesz rzucać ją również jako AKCJĘ DODATKOWĄ (PB razy/długi odpoczynek), zyskując odporność na obrażenia cięte, kłute i obuchowe bez tracenia akcji głównej! Od 5. poziomu rzucasz też Przejście bez Śladu (Pass without Trace — +10 do Skradania dla całej drużyny!).", desc_en: "Know Blade Ward and cast it as a BONUS ACTION (PB/long rest). At 5th level, cast Pass without Trace without material components." },
        { name_pl: "Krok po Ziemi i Widzenie w Ciemności (60 ft)", name_en: "Earth Walk & Darkvision", tag_pl: "Ignorowanie trudnego terenu + 60 ft", desc_pl: "Poruszysz się po trudnym terenie na ziemi lub podłodze bez zużywania dodatkowego ruchu oraz masz Widzenie w ciemności na 60 stóp.", desc_en: "Move across difficult terrain on ground or floor without spending extra movement; Darkvision 60 ft." }
      ]
    },

    "genasi-fire": {
      creature_type_pl: "Humanoid (Genasi)",
      creature_type_en: "Humanoid (Genasi)",
      age_pl: "Żyją do ok. 120 lat.",
      age_en: "Live up to 120 years.",
      height_pl: "Średni lub Mały",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Pierwotny (Ignan)",
      languages_en: "Common, Primordial",
      lore_pl: "Spadkobiercy ifrytów z Miasta Mosiężnego na Planie Ognia. Ich włosy falują jak żywe płomienie, a w dłoniach przywołują ogniste ostrza.",
      lore_en: "Descended from efreet, fire genasi flicker with the volatile passion of elemental flame.",
      detailed_traits: [
        { name_pl: "Odporność na Ogień i Widzenie w Ciemności", name_en: "Fire Resistance & Darkvision", tag_pl: "Odporność: Ogień + 60 ft", desc_pl: "Posiadasz stałą odporność na obrażenia od ognia oraz Widzenie w ciemności na 60 stóp.", desc_en: "Resistance to fire damage and Darkvision out to 60 feet." },
        { name_pl: "Sięgając do Płomienia (Reach to the Blaze)", name_en: "Reach to the Blaze", tag_pl: "Produce Flame • Burning Hands • Flame Blade", desc_pl: "Znasz sztuczkę Tworzenie Płomienia (Produce Flame). Od 3. poziomu rzucasz Płonące Dłonie (Burning Hands), a od 5. poziomu — Płomienne Ostrze (Flame Blade — 3k6 obrażeń od ognia!) bez komponentów materialnych.", desc_en: "Know Produce Flame; cast Burning Hands at 3rd and Flame Blade at 5th level." }
      ]
    },

    "genasi-water": {
      creature_type_pl: "Humanoid (Genasi)",
      creature_type_en: "Humanoid (Genasi)",
      age_pl: "Żyją do ok. 120 lat.",
      age_en: "Live up to 120 years.",
      height_pl: "Średni lub Mały",
      height_en: "Medium or Small",
      languages_pl: "Wspólny, Pierwotny (Aquan)",
      languages_en: "Common, Primordial",
      special_speeds_pl: "Pływanie 30 ft (Amfibia)",
      lore_pl: "Potomkowie maridów z bezkresnych oceanów Planu Wody. Swobodnie oddychają pod wodą, są odporni na kwas i potrafią kroczyć po falach.",
      lore_en: "Water genasi descend from marids, completely at home in the ocean depths.",
      detailed_traits: [
        { name_pl: "Amfibia, Pływanie 30 ft i Odporność na Kwas", name_en: "Amphibious & Acid Resistance", tag_pl: "Pływanie 30 ft + Odporność: Kwas", desc_pl: "Oddychasz powietrzem i wodą, masz szybkość pływania 30 stóp oraz stałą odporność na obrażenia od kwasu (Acid).", desc_en: "Breathe air and water, 30 ft swim speed, and resistance to acid damage." },
        { name_pl: "Wezwanie Fali (Call to the Wave)", name_en: "Call to the Wave", tag_pl: "Acid Splash • Create Water • Water Walk", desc_pl: "Znasz sztuczkę Rozbryzg Kwasu (Acid Splash). Od 3. poziomu rzucasz Tworzenie lub Niszczenie Wody, a od 5. poziomu — Chodzenie po Wodzie (Water Walk).", desc_en: "Know Acid Splash; cast Create or Destroy Water at 3rd and Water Walk at 5th level." }
      ]
    },

    "githyanki": {
      creature_type_pl: "Humanoid (Gith)",
      creature_type_en: "Humanoid (Gith)",
      age_pl: "W Planie Astralnym nie starzeją się wcale; w Planie Materialnym żyją ok. 100 lat.",
      age_en: "Do not age on the Astral Plane; live around a century on the Material Plane.",
      height_pl: "Średni (wysocy i smukli, ok. 180–195 cm)",
      height_en: "Medium (taller and leaner than humans, around 6 feet)",
      languages_pl: "Wspólny, Gith",
      languages_en: "Common, Gith",
      lore_pl: "Wojowniczy zdobywcy z Planu Astralnego dosiadający czerwonych smoków i dzierżący srebrne miecze. Dzięki Astralnej Wiedzy oraz wrodzonej teleportacji Misty Step są wybitnymi wojownikami-magami.",
      lore_en: "Astral warriors and raiders who overthrew the mind flayer empire with psionics and silver swords.",
      detailed_traits: [
        { name_pl: "Astralna Wiedza i Psychiczna Odporność", name_en: "Astral Knowledge & Psychic Resilience", tag_pl: "Odporność: Psychiczne + 2 Wymienne Biegłości", desc_pl: "Posiadasz stałą odporność na obrażenia psychiczne! Ponadto po każdym długim odpoczynku wybierasz 1 dowolną umiejętność oraz 1 dowolną broń lub narzędzie, w których zyskujesz biegłość aż do kolejnego odpoczynku.", desc_en: "Resistance to psychic damage. Gain 1 changeable skill proficiency and 1 weapon/tool proficiency every long rest." },
        { name_pl: "Psionika Githyanki", name_en: "Githyanki Psionics", tag_pl: "Niewidzialna Dłoń Maga • Skok • Krok przez Mgłę!", desc_pl: "Znasz sztuczkę Dłoń Maga (jest całkowicie NIEWIDZIALNA i nie wymaga komponentów!). Od 3. poziomu rzucasz Skok (Jump), a od 5. poziomu — Krok przez Mgłę (Misty Step) bez komponentów (1/dzień za darmo + z komórek czarów!).", desc_en: "Know invisible Mage Hand; cast Jump at 3rd and Misty Step at 5th level without components." }
      ]
    },

    "githzerai": {
      creature_type_pl: "Humanoid (Gith)",
      creature_type_en: "Humanoid (Gith)",
      age_pl: "Żyją ok. 100 lat w Planie Materialnym (wiecznie w klasztorach Limbo).",
      age_en: "Live about a century on the Material Plane.",
      height_pl: "Średni (ok. 180–190 cm)",
      height_en: "Medium",
      languages_pl: "Wspólny, Gith",
      languages_en: "Common, Gith",
      lore_pl: "Filozofowie, mnisi i mistrzowie psioniki kształtujący materię czystą siłą woli w wirującym chaosie planu Limbo. Jako jedyna rasa w grze otrzymują rasowe zaklęcie Tarcza (Shield), które mogą też rzucać ze swoich komórek czarów!",
      lore_en: "Ascetic philosophers and psionic masters who carve monasteries out of the chaos of Limbo.",
      detailed_traits: [
        { name_pl: "Psionika Githzerai (Darmowe Zaklęcie Tarcza / Shield!)", name_en: "Githzerai Psionics", tag_pl: "Niewidzialna Dłoń Maga • Tarcza (+5 KP) • Wykrycie Myśli", desc_pl: "Znasz niewidzialną Dłoń Maga. Od 3. poziomu znasz zaklęcie Tarcza (Shield — +5 do KP w reakcji!) i możesz rzucić je raz dziennie za darmo ORAZ rzucać ze swoich komórek czarów (daje dostęp do Shield klerykom, druidom i bardom!). Od 5. poziomu rzucasz też Wykrycie Myśli (Detect Thoughts).", desc_en: "Know invisible Mage Hand. At 3rd level cast Shield (+5 AC reaction) 1/day free AND with your spell slots! At 5th level cast Detect Thoughts." },
        { name_pl: "Mentalna Dyscyplina i Psychiczna Odporność", name_en: "Mental Discipline & Psychic Resilience", tag_pl: "Odporność: Psychiczne + Adv. vs Zauroczenie/Strach", desc_pl: "Masz stałą odporność na obrażenia psychiczne oraz Ułatwienie w rzutach obronnych przeciw zauroczeniu (Charmed) i przerażeniu (Frightened).", desc_en: "Resistance to psychic damage and Advantage on saving throws against being charmed or frightened." }
      ]
    },

    "goblin": {
      creature_type_pl: "Humanoid (Goblinoid)",
      creature_type_en: "Humanoid (Goblinoid)",
      age_pl: "Dojrzałość w wieku 8 lat; żyją do ok. 60 lat.",
      age_en: "Reach adulthood at age 8 and live up to 60 years.",
      height_pl: "Mały (ok. 90–105 cm wzrostu, 18–20 kg wagi)",
      height_en: "Small (between 3 and 3.5 feet tall, 40–45 pounds)",
      languages_pl: "Wspólny, Gobliński",
      languages_en: "Common, Goblin",
      lore_pl: "Mali, przebiegli i niesamowicie ruchliwi awanturnicy. Dzięki Zwinnej Ucieczce każdy Goblin — nawet będący Magiem, Klerykiem czy Wojownikiem — może wykonywać Odskok lub Ukrycie się jako akcję dodatkową w każdej turze, jakby był Łotrzykiem!",
      lore_en: "Small, black-hearted, and endlessly resourceful, goblins dart in and out of danger with Nimble Escape.",
      detailed_traits: [
        { name_pl: "Zwinna Ucieczka (Nimble Escape)", name_en: "Nimble Escape", tag_pl: "Akcja dodatkowa w KAŻDEJ turze: Odskok lub Ukrycie!", desc_pl: "W każdej swojej turze możesz wykonać akcję Odskoku (Disengage — ruch bez ataków okazyjnych) LUB Ukrycia się (Hide) jako akcję dodatkową (bez limitu użyć!).", desc_en: "You can take the Disengage or Hide action as a bonus action on each of your turns." },
        { name_pl: "Furia Małego (Fury of the Small) i Rodowód Fey", name_en: "Fury of the Small & Fey Ancestry", tag_pl: "+PB Obrażeń vs Większe Istoty", desc_pl: "Gdy zadasz obrażenia atakiem lub zaklęciem istocie o rozmiarze większym od Twojego (Średniej, Dużej, Wielkiej...), możesz dodać dodatkowe obrażenia równe Twojej Premii z Biegłości (PB razy/długi odpoczynek). Posiadasz też Ułatwienie przeciw zauroczeniu i Widzenie w ciemności 60 ft.", desc_en: "Deal extra damage equal to your PB to a creature larger than you (PB/long rest). Advantage vs Charmed and Darkvision 60 ft." }
      ]
    },

    "hobgoblin": {
      xl: true,
      creature_type_pl: "Humanoid (Goblinoid)",
      creature_type_en: "Humanoid (Goblinoid)",
      age_pl: "Dojrzałość i długość życia zbliżona do ludzi.",
      age_en: "Mature at the same rate as humans and have lifespans similar in length to theirs.",
      height_pl: "Średni (ok. 165–190 cm)",
      height_en: "Medium",
      languages_pl: "Wspólny, Gobliński",
      languages_en: "Common, Goblin",
      lore_pl: "Zdyscyplinowani taktycy i dowódcy wojskowi o feywildowym rodowodzie. Hobgobliny wzmacniają całą drużynę, zamieniając zwykłą akcję Pomocy w potężny manewr taktyczny wykonywany w akcji dodatkowej.",
      lore_en: "Tactical commanders who channel the ancient bond of reciprocity from the Feywild through Fey Gift.",
      detailed_traits: [
        { name_pl: "Dar Fey (Fey Gift — Pomoc w Akcji Dodatkowej!)", name_en: "Fey Gift", tag_pl: "Akcja dodatkowa • Pomoc (Help) + Bonus Taktyczny", desc_pl: "Możesz używać akcji Pomocy (Help — dającej sojusznikowi Ułatwienie w ataku lub teście!) jako AKCJI DODATKOWEJ (PB razy/długi odpoczynek). Od 3. poziomu każde użycie Daru Fey wywołuje też jeden z trzech efektów: 1) Gościnność (Ty i wspierany sojusznik zyskujecie 1k6 + PB Tymczasowych PW!), 2) Przejście (Ty i sojusznik zyskujecie +10 stóp szybkości ruchu), lub 3) Złośliwość (pierwszy raz, gdy sojusznik trafi cel, cel ten ma Utrudnienie przy swoim następnym ataku!).", desc_en: "Take the Help action as a bonus action (PB/long rest). At 3rd level add Hospitality (1d6+PB temp HP to both), Passage (+10 ft speed), or Spite (impose disadvantage on target's next attack)." },
        { name_pl: "Fortuna Wielu (Fortune from the Many)", name_en: "Fortune from the Many", tag_pl: "Do +3 do nieudanego rzutu!", desc_pl: "Gdy spudłujesz w ataku lub nie powiedzie Ci się test cechy bądź rzut obronny, możesz dodać do wyniku premię równą liczbie widocznych sojuszników w promieniu 30 stóp od Ciebie (maksymalnie +3)!", desc_en: "When you miss an attack or fail a check/save, gain a bonus equal to the number of allies you can see within 30 feet (max +3, PB/long rest)." }
      ]
    },

    "kenku": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Żyją do ok. 60 lat.",
      age_en: "Live up to 60 years.",
      height_pl: "Średni lub Mały (kruczy dziób i czarne upierzenie)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język (w MPMM mogą mówić normalnie!)",
      languages_en: "Common + 1 other language",
      lore_pl: "Krukopodobni mistrzowie naśladownictwa, pamięci fotograficznej i fałszerstwa. W zaktualizowanej wersji z Monsters of the Multiverse nie są już ograniczeni klątwą niemoty i mogą gwarantować sobie Ułatwienie w wybranych umiejętnościach.",
      lore_en: "Feathered folk resembling ravens, blessed with keen observation and supernaturally accurate memories.",
      detailed_traits: [
        { name_pl: "Wspomnienie Kenku (Kenku Recall)", name_en: "Kenku Recall", tag_pl: "2 Dowolne Umiejętności + Adv. na żądanie!", desc_pl: "Zyskujesz biegłość w 2 dowolnie wybranych umiejętnościach. Ponadto, gdy wykonujesz test cechy używający dowolnej umiejętności, w której masz biegłość, możesz nadać sobie Ułatwienie (Advantage) w tym rzucie! (Liczba użyć: PB/długi odpoczynek).", desc_en: "Proficiency in 2 skills of your choice, and you can give yourself Advantage on checks using any skill you are proficient in (PB/long rest)." },
        { name_pl: "Ekspert Duplikacji i Mimikra", name_en: "Expert Duplication & Mimicry", tag_pl: "Adv. przy kopiowaniu + Naśladowanie głosów", desc_pl: "Masz stałe Ułatwienie przy kopiowaniu pisma i rzemiosła oraz potrafisz perfekcyjnie naśladować dowolne usłyszane głosy i dźwięki (ST rozpoznania = 8 + PB + CHA).", desc_en: "Advantage on checks to produce duplicates of writing/craftwork, and accurately mimic sounds and voices." }
      ]
    },

    "kobold": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 6 lat; mogą żyć aż do 120 lat!",
      age_en: "Reach adulthood at age 6 and can live up to 120 years.",
      height_pl: "Mały (ok. 60–90 cm wzrostu, 11–16 kg wagi)",
      height_en: "Small (2 to 3 feet tall, 25–35 pounds)",
      languages_pl: "Wspólny, Smoczy",
      languages_en: "Common, Draconic",
      lore_pl: "Mali, ale niezwykle odważni kuzynowie smoków. W wersji z Monsters of the Multiverse nie cierpią już na Wrażliwość na Światło Słoneczne, a ich Smoczy Ryk zapewnia Ułatwienie we wszystkich atakach dla całej drużyny!",
      lore_en: "Some of the smallest draconic creatures in the multiverse, kobolds display an iconic draconic roar and tenacity.",
      detailed_traits: [
        { name_pl: "Smoczy Ryk (Draconic Cry)", name_en: "Draconic Cry", tag_pl: "Akcja dodatkowa • Ułatwienie w atakach dla CAŁEJ drużyny!", desc_pl: "Jako akcję dodatkową wydajesz okrzyk bojowy: aż do początku Twojej następnej tury Ty ORAZ wszyscy Twoi sojusznicy macie Ułatwienie (Advantage) w rzutach ataku przeciwko każdemu wrogowi w promieniu 10 stóp od Ciebie, który Cię słyszy! (PB razy/długi odpoczynek).", desc_en: "As a bonus action, let out a cry: until the start of your next turn, you and your allies have Advantage on attack rolls against any enemy within 10 feet of you (PB/long rest)." },
        { name_pl: "Dziedzictwo Koboldów (Kobold Legacy)", name_en: "Kobold Legacy", tag_pl: "Sztuczka Zaklinacza LUB Odwaga LUB Umiejętność", desc_pl: "Wybierasz jeden dar: 1) Smocza Magia (1 dowolna sztuczka z listy Zaklinacza, np. Booming Blade, Fire Bolt, Mind Sliver), 2) Niezłomność (stałe Ułatwienie przeciw przerażeniu), lub 3) Spryt (biegłość w Arkanach, Śledztwie, Medycynie, Zwinnych Dłoniach lub Przetrwaniu).", desc_en: "Choose one: Draconic Sorcery (1 Sorcerer cantrip), Defiance (Advantage vs frightened), or Craftiness (1 skill proficiency)." }
      ]
    },

    "lizardfolk": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 14 lat; żyją do ok. 60 lat.",
      age_en: "Reach maturity around age 14 and rarely live longer than 60 years.",
      height_pl: "Średni (ok. 180–200 cm, gruby ogon i twarde łuski)",
      height_en: "Medium",
      languages_pl: "Wspólny, Smoczy",
      languages_en: "Common, Draconic",
      special_speeds_pl: "Pływanie 30 ft (wstrzymywanie oddechu na 15 minut)",
      lore_pl: "Pragmatyczni łowcy z bagien i dżungli, obdarzeni twardą, łuskowatą skórą, która chroni ich lepiej niż skórzana zbroja, oraz potężnymi szczękami.",
      lore_en: "Endowed with scaled hide and predatory instincts, lizardfolk are pragmatic survivors of swamps and marshes.",
      detailed_traits: [
        { name_pl: "Naturalny Pancerz (KP 13 + ZRĘ) i Ugryzienie", name_en: "Natural Armor & Bite", tag_pl: "Bazowa KP 13 + ZRĘ (Auto)", desc_pl: "Bez pancerza Twoja Klasa Pancerza wynosi 13 + modyfikator ze Zręczności (możesz używać tarczy!). Twoja paszcza zadaje 1k6 + SIŁ obrażeń kłutych, a jako akcję dodatkową (PB/dzień) możesz wykonać Żarłoczną Paszczę (Hungry Jaws), zyskując Tymczasowe PW równe Premii z Biegłości.", desc_en: "Unarmored AC = 13 + DEX. Bite deals 1d6 + STR piercing; Hungry Jaws bonus action bite grants temp HP equal to PB." },
        { name_pl: "Pływanie 30 ft, Wstrzymanie Oddechu i 2 Umiejętności", name_en: "Swim, Hold Breath & Nature's Intuition", tag_pl: "2 Umiejętności Natury", desc_pl: "Pływasz z szybkością 30 stóp, wstrzymujesz oddech na 15 minut i zyskujesz biegłość w 2 umiejętnościach z listy: Opieka nad Zwierzętami, Medycyna, Natura, Percepcja, Skradanie się lub Przetrwanie.", desc_en: "30 ft swim speed, hold breath 15 minutes, and proficiency in 2 nature/survival skills." }
      ]
    },

    "minotaur": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Długość życia zbliżona do ludzi.",
      age_en: "Lifespans comparable to humans.",
      height_pl: "Średni (ponad 185–205 cm wzrostu, potężne rogi)",
      height_en: "Medium (over 6 feet tall)",
      languages_pl: "Wspólny, Minotaurzy",
      languages_en: "Common, Minotaur",
      lore_pl: "Potężni wojownicy o głowie byka, którzy rozbijają wrogie szyki szarżą i odrzucają przeciwników uderzeniem rogów. Dzięki Pamięci Labiryntu nigdy nie gubią drogi.",
      lore_en: "Barrel-chested warriors with bull horns who charge into battle and possess an unerring sense of direction.",
      detailed_traits: [
        { name_pl: "Rozpęd (Goring Rush) i Uderzenie Rogami (Hammering Horns)", name_en: "Goring Rush & Hammering Horns", tag_pl: "Rogi 1k6 + Pchnięcie 10 ft w Akcji Dodatkowej", desc_pl: "Twoje rogi zadają 1k6 + SIŁ obrażeń kłutych. 1) Po wykonaniu Sprintu (Dash) i ruchu o 20 ft możesz zaatakować rogami jako akcję dodatkową. 2) Po trafieniu atakiem wręcz w akcji Ataku możesz jako akcję dodatkową popchnąć cel o 10 stóp (rzut na SIŁ, ST = 8 + PB + SIŁ)!", desc_en: "Horns deal 1d6 + STR piercing. Bonus action horn attack after Dashing 20 ft, OR bonus action to push a foe 10 feet after hitting with a melee attack." },
        { name_pl: "Pamięć Labiryntu (Labyrinthine Recall)", name_en: "Labyrinthine Recall", tag_pl: "Perfekcyjna Nawigacja", desc_pl: "Zawsze wiesz, w którą stronę jest północ, oraz masz stałe Ułatwienie we wszystkich testach Mądrości (Sztuka Przetrwania) wykonywanych w celu nawigacji lub tropienia!", desc_en: "You always know which way is north, and you have advantage on Survival checks made to navigate or track." }
      ]
    },

    "orc": {
      creature_type_pl: "Humanoid (Ork)",
      creature_type_en: "Humanoid (Orc)",
      age_pl: "Dojrzałość w wieku 12 lat; żyją do ok. 50–60 lat.",
      age_en: "Reach adulthood at age 12 and live up to 50 years.",
      height_pl: "Średni — Potężna Budowa (ponad 185–205 cm, 105–135 kg)",
      height_en: "Medium (usually over 6 feet tall and weigh between 230 and 280 pounds)",
      languages_pl: "Wspólny, Orczy",
      languages_en: "Common, Orc",
      lore_pl: "Niezłomni wojownicy obdarzeni ogromną mobilnością bojową. Dzięki Przypływowi Adrenaliny mogą w jednej chwili doskoczyć do dowolnego wroga na polu bitwy, jednocześnie zyskując tarczę z Tymczasowych PW.",
      lore_en: "Equipped with Adrenaline Rush and Relentless Endurance, orcs charge fearlessly into the thick of battle.",
      detailed_traits: [
        { name_pl: "Przypływ Adrenaliny (Adrenaline Rush)", name_en: "Adrenaline Rush", tag_pl: "Akcja dodatkowa • Sprint + Tymczasowe PW!", desc_pl: "Możesz wykonać akcję Sprintu (Dash) jako akcję dodatkową! Za każdym razem, gdy to robisz, natychmiast otrzymujesz też liczbę Tymczasowych Punktów Wytrzymałości równą Twojej Premii z Biegłości! (Liczba użyć: PB/długi odpoczynek).", desc_en: "Take the Dash action as a bonus action and gain temporary hit points equal to your proficiency bonus (PB/long rest)." },
        { name_pl: "Nieustępliwa Wytrzymałość, Darkvision 120 ft i Potężna Budowa", name_en: "Relentless Endurance & Powerful Build", tag_pl: "1 PW zamiast 0 PW + 120 ft", desc_pl: "Raz na długi odpoczynek zamiast spaść do 0 PW zostajesz na 1 PW. Posiadasz też Wyższe Widzenie w Ciemności (120 stóp!) oraz podwójny udźwig.", desc_en: "Drop to 1 HP instead of 0 (1/long rest), Superior Darkvision 120 ft, and Powerful Build." }
      ]
    },

    "satyr": {
      creature_type_pl: "Fey (NIE Humanoid!)",
      creature_type_en: "Fey",
      age_pl: "Dojrzałość i długość życia zbliżona do ludzi (ok. 100 lat).",
      age_en: "Mature and age at about the same rate as humans.",
      height_pl: "Średni (kozie kopyta, zakręcone rogi)",
      height_en: "Medium",
      languages_pl: "Wspólny, Sylwan",
      languages_en: "Common, Sylvan",
      lore_pl: "Rozmiłowani w muzyce, biesiadach i wolności mieszkańcy Feywildu oraz Therosu. Łączą szybkość 35 stóp, typ istoty Fey oraz pełną Odporność na Magię, co czyni z nich jedną z najpotężniejszych ras w całym systemie D&D 5e.",
      lore_en: "Satyrs hail from the Feywild, thriving on the energy of merriment, music, and innate magic resistance.",
      detailed_traits: [
        { name_pl: "Odporność na Magię (Magic Resistance) i Typ Fey", name_en: "Magic Resistance & Fey Type", tag_pl: "Stałe Adv. przeciw Zaklęciom + Typ Fey!", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we wszystkich rzutach obronnych przeciwko zaklęciom! Ponadto Twój typ istoty to Fey (nie działają na Ciebie czary celujące w Humanoidy).", desc_en: "Advantage on saving throws against spells, and your creature type is Fey." },
        { name_pl: "Szybkość 35 ft, Radosne Skoki i Hulaka", name_en: "Mirthful Leaps & Reveler", tag_pl: "35 ft + Skoki +1k8 + 2 Umiejętności i Instrument", desc_pl: "Twoja szybkość wynosi 35 stóp, do każdego skoku w dal lub wzwyż dodajesz +1k8 stóp, masz rogi (1k6+SIŁ) oraz biegłość w Występach (Performance), Perswazji (Persuasion) i 1 instrumencie muzycznym.", desc_en: "35 ft speed, +1d8 feet to jumps, Ram (1d6+STR), and proficiency in Performance, Persuasion, and one musical instrument." }
      ]
    },

    "shifter": {
      xl: true,
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 10 lat; żyją ok. 70 lat.",
      age_en: "Reach young adulthood at age 10 and rarely live over 70.",
      height_pl: "Średni (zwinna, drapieżna budowa)",
      height_en: "Medium",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Zwani czasem 'dziećmi likantropów', Zmienni potrafią wyzwolić drzemiącą w nich zwierzęcą naturę w ułamku sekundy. Podczas Przemiany zyskują tymczasowe punkty wytrzymałości oraz potężny efekt wybranego aspektu bestii.",
      lore_en: "Shifters are humanoids with a bestial aspect who can temporarily enhance their physical features through Shifting.",
      detailed_traits: [
        { name_pl: "Przemiana (Shifting)", name_en: "Shifting", tag_pl: "Akcja dodatkowa • 1 min • Temp PW + Aspekt Bestii", desc_pl: "Jako akcję dodatkową przybierasz bardziej zwierzęcy wygląd na 1 minutę (PB razy/długi odpoczynek). W momencie Przemiany zyskujesz Tymczasowe PW równe 2 × Twoja Premia z Biegłości oraz wybrany efekt z tabeli poniżej!", desc_en: "As a bonus action, shift for 1 minute (PB/long rest), gaining 2 × PB temporary HP plus your chosen bestial benefit." },
        { name_pl: "Zwierzęce Instynkty i Widzenie w Ciemności (60 ft)", name_en: "Bestial Instincts & Darkvision", tag_pl: "1 Umiejętność + 60 ft", desc_pl: "Biegłość w wybranej umiejętności: Akrobatyka, Atletyka, Zastraszanie lub Sztuka Przetrwania, oraz Widzenie w ciemności na 60 stóp.", desc_en: "Proficiency in Acrobatics, Athletics, Intimidation, or Survival, plus Darkvision 60 ft." }
      ],
      suboptions_title_pl: "Cztery Aspekty Bestii Zmiennego (Shifter)",
      suboptions_headers_pl: ["Aspekt Bestii", "Styl Walki", "Efekt podczas Przemiany (Shifting)"],
      suboptions_table: [
        ["🐻 Skóra Bestii (Beasthide)", "Pancerz i Wytrzymałość", "Zyskujesz dodatkowe +1k6 Tymczasowych PW oraz stałą premię +1 do Klasy Pancerza na czas Przemiany!"],
        ["🐺 Długi Kieł (Longtooth)", "Agresja Wręcz", "W momencie aktywacji Przemiany oraz jako akcję dodatkową w każdej kolejnej turze możesz wykonać atak kłami zadający 1k6 + modyfikator z Siły obrażeń kłutych!"],
        ["🐆 Chyży Krok (Swiftstride)", "Mobilność i Harcownik", "Twoja szybkość chodzenia wzrasta o +10 stóp. Gdy wróg kończy ruch w odległości 5 stóp od Ciebie, możesz jako Reakcję odskoczyć o 10 stóp bez wywoływania ataków okazyjnych!"],
        ["🦊 Dzikie Łowy (Wildhunt)", "Zwiad i Obrona przed Krytykami", "Masz Ułatwienie we wszystkich testach Mądrości, a ŻADNA istota w promieniu 30 stóp od Ciebie nie może mieć Ułatwienia (Advantage) w rzutach ataku przeciw Tobie (całkowicie kontruje Lekkomyślny Atak Barbarzyńcy, Zasadzkę czy Sforę!)."]
      ]
    },

    "tortle": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 15 lat; żyją średnio 50 lat.",
      age_en: "Reach adulthood by age 15 and live an average of 50 years.",
      height_pl: "Średni lub Mały (ciężka skorupa: waga ok. 180–225 kg)",
      height_en: "Medium or Small (450 pounds with heavy shell)",
      languages_pl: "Wspólny, Aquan",
      languages_en: "Common, Aquan",
      lore_pl: "Wędrowni żółwioludzie noszący swój dom i pancerz na własnych plecach. Dzięki stałej Klasie Pancerza 17 są wymarzoną rasą dla Magów, Druidów i Zaklinaczy, którzy nie chcą inwestować punktów w Zręczność.",
      lore_en: "Carrying their homes on their backs, tortles enjoy a natural armor class equal to splint armor from level 1.",
      detailed_traits: [
        { name_pl: "Naturalny Pancerz Skorupy (Stałe KP = 17!)", name_en: "Natural Armor", tag_pl: "Bazowa KP 17 (19 z Tarczą!) — Auto", desc_pl: "Twoja skorupa zapewnia Ci stałą bazową Klasę Pancerza równą 17 (Twój modyfikator ze Zręczności nie wpływa na tę liczbę — nawet przy 8 ZRĘ masz 17 KP!). Możesz normalnie używać Tarczy, zyskując 19 KP już na 1. poziomie (automatycznie wyliczane na Karcie Postaci!).", desc_en: "Your shell provides a base AC of 17 (your DEX modifier doesn't affect this number). You can still use a shield for 19 AC!" },
        { name_pl: "Obrona w Skorupie (Shell Defense) i Pazury", name_en: "Shell Defense & Claws", tag_pl: "+4 do KP (21–23 KP)!", desc_pl: "Jako akcję możesz schować się w skorupie: zyskujesz dodatkowe +4 do KP oraz Ułatwienie w rzutach obronnych na SIŁ i KON! Posiadasz też pazury (1k6+SIŁ), wstrzymujesz oddech na 1 godzinę i masz biegłość w 1 umiejętności natury.", desc_en: "Withdraw into your shell as an action for +4 AC and advantage on STR and CON saves. Claws (1d6+STR) and hold breath for 1 hour." }
      ]
    },

    "triton": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 15 lat; żyją do 200 lat.",
      age_en: "Reach maturity around age 15 and can live up to 200 years.",
      height_pl: "Średni (ok. 150–175 cm)",
      height_en: "Medium",
      languages_pl: "Wspólny, Pierwotny (Aquan)",
      languages_en: "Common, Primordial",
      special_speeds_pl: "Pływanie 30 ft (Amfibia)",
      lore_pl: "Szlachetni strażnicy oceanicznych rowów przybyli z Planu Żywiołu Wody, by polować na krakeny i morskie potwory zagrażające światu powierzchni.",
      lore_en: "Guardians of the deepest ocean trenches, tritons wield elemental magic of air, water, and frost.",
      detailed_traits: [
        { name_pl: "Amfibia, Odporność na Zimno i Emisariusz Morza", name_en: "Guardians of the Depths", tag_pl: "Pływanie 30 ft + Odporność: Zimno", desc_pl: "Oddychasz pod wodą, pływasz z prędkością 30 stóp, masz stałą odporność na obrażenia od zimna, Widzenie w ciemności 60 ft i rozmawiasz ze zwierzętami wodnymi.", desc_en: "Amphibious, 30 ft swim speed, cold resistance, Darkvision 60 ft, and communicate with water beasts." },
        { name_pl: "Kontrola Powietrza i Wody", name_en: "Control Air and Water", tag_pl: "Fog Cloud • Gust of Wind • Water Walk", desc_pl: "Rzucasz Chmurę Mgły (Fog Cloud), od 3. poziomu Podmuch Wiatru (Gust of Wind), a od 5. poziomu — Chodzenie po Wodzie (Water Walk) (1/dzień za darmo + z komórek czarów).", desc_en: "Cast Fog Cloud at 1st, Gust of Wind at 3rd, and Water Walk at 5th level." }
      ]
    },

    "hexblood": {
      xl: true,
      creature_type_pl: "Fey (NIE Humanoid!)",
      creature_type_en: "Fey",
      age_pl: "Mogą żyć setki lat.",
      age_en: "Can live for centuries.",
      height_pl: "Średni lub Mały (żywa korona 'eldercross' wokół skroni)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Istoty naznaczone mrocznym paktem z wiedźmami (Hags) z Ravenloftu lub Feywildu. Posiadają typ istoty Fey, wrodzone zaklęcie Klątwa (Hex) oraz potrafią odrywać fragmenty własnego ciała (ząb, paznokieć, pukiel włosów) jako magiczne talizmany szpiegowskie.",
      lore_en: "Infused with eldritch hag magic, hexbloods bear a living crown and wield curses and eerie tokens.",
      detailed_traits: [
        { name_pl: "Magia Hex (Darmowa Klątwa / Hex i Przebranie Siebie)", name_en: "Hex Magic", tag_pl: "Hex (+1k6 nekrotycznych) + Disguise Self", desc_pl: "Znasz zaklęcia Klątwa (Hex — +1k6 obrażeń nekrotycznych do każdego trafienia!) oraz Przebranie Siebie (Disguise Self). Możesz rzucić każde z nich raz dziennie za darmo ORAZ rzucać z dowolnych komórek czarów!", desc_en: "Cast Hex and Disguise Self 1/long rest each without a slot, and cast them using any spell slots you have." },
        { name_pl: "Upiorny Token (Eerie Token) i Typ Fey", name_en: "Eerie Token & Fey Type", tag_pl: "Zdalna Telepatia i Podglądanie (10 mil!)", desc_pl: "Jako akcję dodatkową odrywasz pukiel włosów, ząb lub paznokieć, tworząc magiczny Token. Dopóki ktoś go nosi (w promieniu 10 mil!), możesz przesyłać mu wiadomości telepatyczne lub wejść w trans i przez 1 minutę WIDZIEĆ ORAZ SŁYSZEĆ wszystko z miejsca, gdzie znajduje się Token! Posiadasz też typ istoty Fey, Widzenie w ciemności 60 ft i 2 wybrane umiejętności.", desc_en: "Create a token from a lock of hair or tooth to send telepathic messages or remotely see and hear from its location up to 10 miles away! Creature type: Fey." }
      ]
    },

    "reborn": {
      xl: true,
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Nie starzeją się w naturalny sposób.",
      age_en: "Suspended beyond natural aging.",
      height_pl: "Średni lub Mały (blizny, szwy alchemiczne lub mechaniczne protezy)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Ci, którzy powrócili zza grobu, zostali zszyci z kawałków jak potwór Frankensteina lub przebudzili się jako ożywione konstrukty w mrocznych domenach Ravenloftu. Odrodzeni czerpią przebłyski umiejętności z poprzedniego życia i niemal nie sposób ich zabić.",
      lore_en: "Death isn't always the end. The reborn have died yet somehow still live, bearing stitched flesh or clockwork limbs.",
      detailed_traits: [
        { name_pl: "Wiedza z Przeszłego Życia", name_en: "Knowledge from a Past Life", tag_pl: "+1k6 do Testów Umiejętności (PB/dzień)", desc_pl: "Kiedy wykonujesz test cechy używający umiejętności, możesz rzucić kością 1k6 i dodać wynik do testu (decydujesz już PO zobaczeniu wyniku na kości k20!). Liczba użyć: Premia z Biegłości / długi odpoczynek.", desc_en: "When you make an ability check that uses a skill, roll a d6 and add it to the check after seeing the d20 roll (PB/long rest)." },
        { name_pl: "Bezśmiertna Natura (Deathless Nature)", name_en: "Deathless Nature", tag_pl: "Adv. w Rzutach przeciw Śmierci + Brak Oddechu/Snu", desc_pl: "1) Masz Ułatwienie w Rzutach Obronnych przeciw Śmierci (Death Saving Throws)! 2) Masz Ułatwienie przeciw chorobom i zatruciu oraz odporność na obrażenia od trucizn. 3) Nie musisz jeść, pić, oddychać ani spać (odpoczywasz w 4 godziny w pełnej świadomości!). 4) Zyskujesz biegłość w 2 dowolnych umiejętnościach.", desc_en: "Advantage on Death Saving Throws, Advantage vs disease and poison, poison resistance, no need to eat, drink, breathe, or sleep (4-hour conscious rest), plus 2 skill proficiencies." }
      ]
    },

    "kalashtar": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość i długość życia zbliżona do ludzi (ok. 80–100 lat).",
      age_en: "Lifespans comparable to humans.",
      height_pl: "Średni (smukli, o hipnotyzującym, spokojnym spojrzeniu)",
      height_en: "Medium",
      languages_pl: "Wspólny, Quori + 1 dowolny język",
      languages_en: "Common, Quori + 1 other language",
      lore_pl: "Związek ludzkich mnichów i zbuntowanych duchów snu (Quori) ze świata Eberronu. Kalashtarowie mają dwie połączone dusze, co daje im niezachwianą obronę umysłu i dalekosiężną, dwukierunkową telepatię.",
      lore_en: "A compound people created from the union of humanity and renegade spirits from the plane of dreams.",
      detailed_traits: [
        { name_pl: "Podwójny Umysł i Mentalna Dyscyplina", name_en: "Dual Mind & Mental Discipline", tag_pl: "Stałe Adv. na MĄD + Odporność: Psychiczne", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we WSZYSTKICH rzutach obronnych na Mądrość oraz stałą odporność na obrażenia psychiczne!", desc_en: "You have advantage on all Wisdom saving throws and resistance to psychic damage." },
        { name_pl: "Łącze Umysłu (Mind Link) i Odcięty od Snów", name_en: "Mind Link & Severed from Dreams", tag_pl: "Dwukierunkowa Telepatia (10 × Poziom ft)", desc_pl: "Możesz rozmawiać telepatycznie z dowolną widoczną istotą w promieniu 10 × Twój poziom stóp (nawet do 200 stóp!) i jako akcję pozwolić jej odpowiadać telepatycznie przez 1 godzinę. Jesteś też całkowicie odporny na zaklęcie Koszmar (Dream).", desc_en: "Two-way telepathy within 10 × level feet, and immune to spells and effects that require you to dream." }
      ]
    },

    "leonin": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Długość życia zbliżona do ludzi.",
      age_en: "Mature and age at about the same rate as humans.",
      height_pl: "Średni (ponad 185–210 cm wzrostu, bujna lwia grzywa)",
      height_en: "Medium (typically over 6 feet tall, with some standing over 7 feet)",
      languages_pl: "Wspólny, Leoniński",
      languages_en: "Common, Leonin",
      lore_pl: "Dumni, lwi wojownicy ze słonecznych równin Oreskosu w świecie Theros. Ich potężny ryk mrozi krew w żyłach okolicznych wrogów, a szybkość 35 stóp pozwala błyskawicznie dopaść zdobycz.",
      lore_en: "Nomadic lion-folk of Theros who rely on their own pride, claws, and terrifying roar.",
      detailed_traits: [
        { name_pl: "Zastraszający Ryk (Daunting Roar)", name_en: "Daunting Roar", tag_pl: "Akcja dodatkowa • Obszarowy Strach (ST z KON)", desc_pl: "Jako akcję dodatkową wydajesz potężny ryk: wybrane przez Ciebie istoty w promieniu 10 stóp muszą wykonać rzut obronny na Mądrość (ST = 8 + Premia Biegłości + Twój modyfikator z KONDYCJI!) albo zostają Przerażone (Frightened) do końca Twojej następnej tury! (1/krótki lub długi odpoczynek).", desc_en: "Bonus action roar: creatures of your choice within 10 feet must succeed on a WIS save (DC 8 + PB + CON mod) or become Frightened until the end of your next turn (1/short or long rest)." },
        { name_pl: "Szybkość 35 ft, Pazury i Instynkt Łowcy", name_en: "Claws & Hunter's Instincts", tag_pl: "35 ft + Darkvision 60 ft + 1 Umiejętność", desc_pl: "Szybkość chodzenia 35 stóp, Widzenie w ciemności 60 ft, pazury (1k4+SIŁ) oraz biegłość w Atletyce, Zastraszaniu, Percepcji lub Przetrwaniu.", desc_en: "35 ft walking speed, Darkvision 60 ft, Claws (1d4+STR), and proficiency in Athletics, Intimidation, Perception, or Survival." }
      ]
    },

    "loxodon": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Fizyczna dojrzałość jak u ludzi, ale żyją aż do 450 lat!",
      age_en: "Physically mature at the same rate as humans, but live about 450 years.",
      height_pl: "Średni — Potężna Budowa (ok. 215–245 cm wzrostu, 140–180 kg wagi)",
      height_en: "Medium — Powerful Build (between 7 and 8 feet tall, 300–400 pounds)",
      languages_pl: "Wspólny, Loxodoński",
      languages_en: "Common, Loxodon",
      lore_pl: "Słonioludzie z Ravniki będący oazami spokoju, mądrości i niezłomnej lojalności. Ich gruba skóra pozwala obliczać Klasę Pancerza bezpośrednio z Kondycji zamiast Zręczności!",
      lore_en: "Humanoid elephants of Ravnica, renowned for their calm wisdom, stoneworking, and thick hide.",
      detailed_traits: [
        { name_pl: "Naturalny Pancerz z KONDYCJI (KP = 12 + KON!)", name_en: "Natural Armor (CON-based)", tag_pl: "KP = 12 + modyfikator z KON (Auto)", desc_pl: "Masz grubą, skórzastą skórę: bez pancerza Twoja Klasa Pancerza wynosi 12 + Twój modyfikator z KONDYCJI (i możesz używać Tarczy, zyskując nawet 19 KP przy 20 KON i tarczy, bez inwestowania w Zręczność!). Automatycznie wyliczane na Karcie Postaci.", desc_en: "When you aren't wearing armor, your AC is 12 + your Constitution modifier (shield bonus still applies!)." },
        { name_pl: "Trąba (Trunk), Spokój Loxodona i Potężna Budowa", name_en: "Trunk & Loxodon Serenity", tag_pl: "Chwytanie Trąbą + Adv. vs Zauroczenie/Strach", desc_pl: "Twoja trąba ma zasięg 5 stóp, może dźwigać 5 × SIŁ funtów, otwierać drzwi, służyć jako fajka do oddychania pod wodą oraz wykonywać Chwyt (Grapple) i Pchnięcie bez użycia rąk! Masz też Ułatwienie przeciw zauroczeniu i przerażeniu, podwójny udźwig oraz Ułatwienie w testach Percepcji i Przetrwania opartych na węchu.", desc_en: "Trunk can grapple, shove, manipulate objects, and act as a snorkel. Advantage vs charmed/frightened, Powerful Build, and Keen Smell." }
      ]
    },

    "simic-hybrid": {
      xl: true,
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Przemiana odbywa się w wieku dorosłym; żyją nieco krócej niż bazowa rasa.",
      age_en: "Slightly reduced lifespan compared to base human/elf/vedalken race.",
      height_pl: "Średni (ludzkie, elfie lub vedalkeńskie ciało z biomagicznymi mutacjami)",
      height_en: "Medium",
      languages_pl: "Wspólny, Elficki lub Vedalkeński",
      languages_en: "Common + Elvish or Vedalken",
      lore_pl: "Strażnicy Kombinatu Simiców z Ravniki, których ciała zostały poddane biomagicznej ewolucji łączącej cechy morskich drapieżników, płazów i skorupiaków. Na 1. oraz 5. poziomie wybierają własne mutacje bojowe.",
      lore_en: "Fused with the characteristics of aquatic, reptilian, and amphibian creatures by the Simic Combine.",
      detailed_traits: [
        { name_pl: "Zwierzęce Ulepszenia (Animal Enhancement — Poz. 1 i Poz. 5)", name_en: "Animal Enhancement", tag_pl: "2 Mutacje Biomagiczne", desc_pl: "Twoje ciało ewoluuje dwukrotnie: wybierasz jedną adaptację na 1. poziomie oraz jedną potężną mutację bojową na 5. poziomie z tabeli poniżej. Posiadasz też Widzenie w ciemności na 60 stóp.", desc_en: "Choose one animal enhancement at 1st level and another at 5th level, plus Darkvision 60 ft." }
      ],
      suboptions_title_pl: "Tabela Biomagicznych Mutacji Hybrydy Simiców (Poziom 1 i Poziom 5)",
      suboptions_headers_pl: ["Poziom Mutacji", "Nazwa Ulepszenia", "Działanie Mechaniczne"],
      suboptions_table: [
        ["Poz. 1", "🪽 Szybowanie Manty (Manta Glide)", "Płetwy pod ramionami: odejmujesz 100 stóp przy obliczaniu obrażeń od upadku i możesz szybować poziomo 2 stopy na każdą 1 stopę opadania."],
        ["Poz. 1", "🐙 Zwinny Wspinacz (Nimble Climber)", "Przyssawki i pazury: zyskujesz stałą szybkość wspinaczki równą Twojej szybkości chodzenia (30 stóp)."],
        ["Poz. 1", "🌊 Podwodna Adaptacja (Underwater Adaptation)", "Skrzela i błony pławne: możesz oddychać powietrzem i wodą oraz masz szybkość pływania 30 stóp."],
        ["Poz. 5", "🛡️ Pancerz Karapaksu (Carapace)", "Chitynowe płyty na skórze: zyskujesz stałą premię +1 do Klasy Pancerza, dopóki nie nosisz ciężkiego pancerza!"],
        ["Poz. 5", "🦀 Chwytne Macki / Szczypce (Grappling Appendages)", "Dwie dodatkowe macki/szczypce (1k6+SIŁ obuchowych). Zaraz po trafieniu nimi możesz jako akcję dodatkową spróbować Pochwycić (Grapple) cel, mając obie ręce wolne!"],
        ["Poz. 5", "🧪 Plucie Kwasem (Acid Spit)", "Jako akcję plujesz kwasem w cel w zasięgu 30 stóp (rzut na ZRĘ, ST = 8 + KON + PB), zadając 2k10 obrażeń od kwasu (3k10 na 11. poz., 4k10 na 17. poz.; KON razy/dzień)."]
      ]
    },

    "vedalken": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość ok. 40 lat; żyją do 350–500 lat.",
      age_en: "Mature around 40 and can live up to 500 years.",
      height_pl: "Średni (wysocy i smukli: ok. 185–200 cm, niebieskawa skóra)",
      height_en: "Medium (6 to 6.5 feet tall, blue skin)",
      languages_pl: "Wspólny, Vedalkeński + 1 dowolny język",
      languages_en: "Common, Vedalken + 1 other language",
      lore_pl: "Chłodni, perfekcyjni analitycy i naukowcy z Ravniki wierzący, że drogą do ideału jest racjonalny umysł. Ich Beznamiętność zapewnia Ułatwienie we WSZYSTKICH rzutach obronnych na INT, MĄD i CHA — nie tylko przeciw magii, ale także przeciw smoczemu strachowi czy psionice!",
      lore_en: "Blue-skinned scholars and inventors of Ravnica whose rational minds grant unmatched mental saving throws.",
      detailed_traits: [
        { name_pl: "Beznamiętność Vedalkenów (Vedalken Dispassion)", name_en: "Vedalken Dispassion", tag_pl: "Stałe Adv. na INT / MĄD / CHA (na WSZYSTKO!)", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we WSZYSTKICH rzutach obronnych na Inteligencję, Mądrość oraz Charyzmę (działa na zaklęcia, zdolności potworów, smoczy strach, pułapki i psionikę!).", desc_en: "You have advantage on ALL Intelligence, Wisdom, and Charisma saving throws (not just against magic!)." },
        { name_pl: "Niestrudzona Precyzja (Tireless Precision)", name_en: "Tireless Precision", tag_pl: "Biegłość + Stałe +1k4 do Umiejętności i Narzędzia!", desc_pl: "Wybierasz 1 umiejętność (Arkana, Historia, Śledztwo, Medycyna, Występy lub Zwinne Dłonie) oraz 1 narzędzie: zyskujesz w nich biegłość ORAZ za każdym razem, gdy wykonujesz nimi test, dorzucasz darmowe +1k4 do wyniku! Możesz też oddychać pod wodą przez 1 godzinę dziennie.", desc_en: "Gain proficiency in 1 chosen skill and 1 tool, and roll an extra +1d4 whenever you make a check with them!" }
      ]
    },

    "owlin": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Żyją do ok. 100 lat.",
      age_en: "Live about a century.",
      height_pl: "Średni lub Mały (wybierasz przy tworzeniu postaci)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      special_speeds_pl: "Stały Lot 30 ft (w lekkim pancerzu lub bez pancerza)",
      lore_pl: "Dalecy krewni gigantycznych sów z Feywildu, studiujący na uniwersytecie Strixhaven. Łączą bezszelestny lot o prędkości 30 stóp z najpotężniejszym widzeniem w ciemności (120 stóp).",
      lore_en: "Distant kin of giant owls from the Feywild, owlins fly on completely silent feathers and see deep into the night.",
      detailed_traits: [
        { name_pl: "Lot (Flight) i Ciche Pióra (Silent Feathers)", name_en: "Flight & Silent Feathers", tag_pl: "Stały Lot 30 ft + Biegłość w Skradaniu się", desc_pl: "Dzięki skrzydłom masz stałą szybkość latania równą szybkości chodzenia (30 stóp) w lekkim/braku pancerza oraz wrodzoną biegłość w umiejętności Skradanie się (Stealth).", desc_en: "Flying speed equal to walking speed (in light/no armor) and proficiency in Stealth." },
        { name_pl: "Wyższe Widzenie w Ciemności (120 stóp)", name_en: "Superior Darkvision", tag_pl: "Darkvision 120 ft (36 m)", desc_pl: "Widzisz w słabym świetle i ciemności na odległość aż 120 stóp (bez żadnej wrażliwości na światło słoneczne!).", desc_en: "You can see in dim light and darkness within 120 feet (with no sunlight sensitivity)." }
      ]
    },

    "verdan": {
      creature_type_pl: "Humanoid (Goblinoid)",
      creature_type_en: "Humanoid (Goblinoid)",
      age_pl: "Żyją do ok. 200 lat.",
      age_en: "Live up to 200 years.",
      height_pl: "Mały (Poz. 1–4) → Średni (na 5. poziomie przechodzą gwałtowny skok wzrostu!)",
      height_en: "Small (becomes Medium at 5th level)",
      languages_pl: "Wspólny, Gobliński + 1 dowolny język",
      languages_en: "Common, Goblin + 1 other language",
      lore_pl: "Goblinoidy przemienione przez chaotyczną energię entropicznej istoty That-Which-Endures. Są niezwykle empatyczni, charyzmatyczni i posiadają telepatię oraz potężną ochronę umysłu.",
      lore_en: "Mutated goblinoids touched by chaotic energy, growing from Small to Medium at 5th level and blessed with telepathic empathy.",
      detailed_traits: [
        { name_pl: "Telepatyczna Wnikliwość i Ograniczona Telepatia", name_en: "Telepathic Insight & Telepathy", tag_pl: "Stałe Adv. na MĄD i CHA + Telepatia 30 ft", desc_pl: "Posiadasz stałe Ułatwienie (Advantage) we WSZYSTKICH rzutach obronnych na Mądrość i Charyzmę! Możesz też komunikować się telepatycznie w promieniu 30 stóp i masz biegłość w Perswazji.", desc_en: "Advantage on all Wisdom and Charisma saving throws, 30 ft telepathy, and Persuasion proficiency." },
        { name_pl: "Uzdrowienie Czarnej Krwi i Skok Wzrostu", name_en: "Black Blood Healing", tag_pl: "Przerzut 1 i 2 na Kościach Wytrzymałości", desc_pl: "Gdy wydajesz Kości Wytrzymałości podczas krótkiego odpoczynku, przerzucasz każdą 1 i 2. Na 5. poziomie Twój rozmiar zmienia się z Małego na Średni.", desc_en: "Reroll 1s and 2s on Hit Dice during short rests; grow from Small to Medium at 5th level." }
      ]
    },

    "locathah": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość w wieku 10 lat; żyją do 80 lat.",
      age_en: "Mature at age 10 and live up to 80 years.",
      height_pl: "Średni (ok. 150–175 cm)",
      height_en: "Medium",
      languages_pl: "Wspólny, Aquan",
      languages_en: "Common, Aquan",
      special_speeds_pl: "Pływanie 30 ft",
      lore_pl: "Odporni ryboludzie o niezłomnej woli, którzy przetrwali niezliczone próby zniewolenia przez podwodne imperia. Ich Wola Lewiatana daje im Ułatwienie przeciw aż sześciu najgroźniejszym stanom w grze!",
      lore_en: "Resilient fish-folk blessed with Leviathan Will, granting advantage against six major debilitating conditions.",
      detailed_traits: [
        { name_pl: "Wola Lewiatana (Leviathan Will)", name_en: "Leviathan Will", tag_pl: "Adv. przeciw 6 Stanom!", desc_pl: "Posiadasz stałe Ułatwienie w rzutach obronnych przeciwko: Zauroczeniu (Charmed), Przerażeniu (Frightened), Paraliżowi (Paralyzed), Zatruciu (Poisoned), Ogłuszeniu (Stunned) oraz magicznemu Uśpieniu!", desc_en: "Advantage on saving throws against being charmed, frightened, paralyzed, poisoned, stunned, or put to sleep!" },
        { name_pl: "Naturalny Pancerz (12 + ZRĘ) i Biegłości", name_en: "Natural Armor & Observant", tag_pl: "KP 12 + ZRĘ + Atletyka i Percepcja", desc_pl: "Naturalny pancerz KP = 12 + ZRĘ, biegłość w Atletyce i Percepcji oraz szybkość pływania 30 stóp (wymaga zanurzenia w wodzie co 4 godziny).", desc_en: "Base AC 12 + DEX, proficiency in Athletics and Perception, 30 ft swim speed." }
      ]
    },

    "grung": {
      creature_type_pl: "Humanoid (Grung)",
      creature_type_en: "Humanoid (Grung)",
      age_pl: "Dojrzałość w ciągu 1 roku; żyją ok. 50 lat.",
      age_en: "Mature in a single year and live up to 50 years.",
      height_pl: "Mały (ok. 75–100 cm wzrostu, jaskrawo ubarwiona, śliska skóra)",
      height_en: "Small (2.5 to 3.5 feet tall)",
      languages_pl: "Wspólny, Grung",
      languages_en: "Common, Grung",
      special_speeds_pl: "Wspinaczka 25 ft + Skok z miejsca na 25 ft",
      lore_pl: "Jaskrawo ubarwione, nadrzewne żaboludzie z dżungli. Całe ich ciało pokrywa zabójcza neurotoksyna, którą mogą pokrywać każde swoje ostrze i strzałę przed atakiem.",
      lore_en: "Brightly colored arboreal amphibian folk whose skin secretes a potent toxin.",
      detailed_traits: [
        { name_pl: "Trująca Skóra (+2k4 obrażeń do każdej broni kłutej!)", name_en: "Poisonous Skin", tag_pl: "+2k4 Trucizny do Ataków + Zatrucie przy dotyku", desc_pl: "Każda istota, która Cię dotknie lub chwyci, musi wykonać rzut na KON (ST 12) albo zostaje Zatruta (Poisoned) na 1 minutę! Ponadto jako część każdego ataku bronią kłutą (sztylet, rapier, strzała, bełt) możesz potrzeć broń o swoją skórę, dodając +2k4 obrażeń od trucizny (ST 12 na KON)!", desc_en: "Foes touching you must pass a DC 12 CON save or be Poisoned for 1 minute; apply poison to any piercing weapon attack for +2d4 poison damage!" },
        { name_pl: "Całkowita Niewrażliwość na Trucizny i Skok Żaby", name_en: "Poison Immunity & Standing Leap", tag_pl: "Immunity: Trucizna + Skok 25 ft", desc_pl: "Jesteś całkowicie NIEWRAŻLIWY (Immune) na obrażenia od trucizn i stan Zatruty! Masz też wspinaczkę 25 ft, skok w dal na 25 stóp (wzwyż na 15 stóp) bez rozbiegu oraz biegłość w Percepcji.", desc_en: "Total Immunity to poison damage and the poisoned condition; 25 ft climb speed, 25 ft standing long jump, and Perception proficiency." }
      ]
    },

    "astral-elf": {
      creature_type_pl: "Humanoid (Elf)",
      creature_type_en: "Humanoid (Elf)",
      age_pl: "Ponieważ żyli w Planie Astralnym, mogą mieć tysiące lat!",
      age_en: "Having lived in the Astral Plane, they can be thousands of years old.",
      height_pl: "Średni (gwiaździste refleksy w ciemnych oczach)",
      height_en: "Medium",
      languages_pl: "Wspólny, Elficki, Niebiański lub Głęboka Mowa",
      languages_en: "Common + 1 other language",
      lore_pl: "Elfy, które przed wiekami opuściły Feywild i zamieszkały w Srebrzystej Pustce Planu Astralnego (Spelljammer), gdzie czas nie płynie. Władają gwiezdnym ogniem i teleportacją.",
      lore_en: "Elves who ventured into the Silver Void of the Astral Plane ages ago, infused with starlight and radiant power.",
      detailed_traits: [
        { name_pl: "Gwiezdny Krok (Starlight Step)", name_en: "Starlight Step", tag_pl: "Akcja dodatkowa • Teleport 30 ft", desc_pl: "Jako akcję dodatkową magicznie teleportujesz się na odległość do 30 stóp (9 m) w widoczne wolne miejsce (liczba użyć: Premia z Biegłości / długi odpoczynek).", desc_en: "As a bonus action, magically teleport up to 30 feet to an unoccupied space you can see (PB/long rest)." },
        { name_pl: "Astralny Ogień i Astralny Trans", name_en: "Astral Fire & Astral Trance", tag_pl: "Sacred Flame + 2 Wymienne Biegłości", desc_pl: "Znasz 1 wybraną sztuczkę: Święty Płomień (Sacred Flame), Światło (Light) lub Tańczące Światła. Po 4-godzinnym Transie wybierasz 1 dowolną umiejętność i 1 broń lub narzędzie na cały dzień! Masz też Percepcję, Rodowód Fey i Darkvision 60 ft.", desc_en: "Know Sacred Flame, Light, or Dancing Lights. 4-hour Trance grants 1 changeable skill proficiency and 1 weapon/tool proficiency." }
      ]
    },

    "autognome": {
      creature_type_pl: "Konstrukt (Construct — NIE Humanoid!)",
      creature_type_en: "Construct",
      age_pl: "Mogą funkcjonować przez stulecia jak ich twórcy (do 500 lat).",
      age_en: "Can live for centuries, up to 500 years.",
      height_pl: "Mały (ok. 90–105 cm, mechaniczny pancerz z mosiądzu i stali)",
      height_en: "Small",
      languages_pl: "Wspólny, Gnomi",
      languages_en: "Common, Gnomish",
      lore_pl: "Mechaniczne gnomy ze świata Spelljammer obdarzone własną duszą i wolną wolą. Jako pełnoprawne Konstrukty posiadają pancerz 13 + ZRĘ, leczą się zaklęciem Mending i mogą dodawać +1k4 do swoich rzutów już po zobaczeniu wyniku na kości k20!",
      lore_en: "Mechanical gnomes built by rock gnomes in Spelljammer who developed their own autonomous consciousness.",
      detailed_traits: [
        { name_pl: "Pancerna Obudowa (KP = 13 + ZRĘ) i Stworzony do Sukcesu", name_en: "Armored Casing & Built for Success", tag_pl: "KP 13 + ZRĘ (Auto) • +1k4 do rzutów!", desc_pl: "Bez zbroi Twoja Klasa Pancerza wynosi 13 + modyfikator ze Zręczności (automatycznie na Karcie Postaci!). Ponadto możesz dodać +1k4 do rzutu ataku, testu cechy lub rzutu obronnego — a decyzję podejmujesz już PO zobaczeniu wyniku na kości k20! (PB razy/długi odpoczynek).", desc_en: "Base AC 13 + DEX. Add +1d4 to an attack roll, ability check, or saving throw after seeing the d20 roll (PB/long rest)." },
        { name_pl: "Mechaniczna Natura Konstruktu i Maszyna Lecząca", name_en: "Mechanical Nature & Healing Machine", tag_pl: "Typ: Konstrukt + Leczenie przez Mending!", desc_pl: "Twój typ istoty to Konstrukt! Masz odporność na trucizny, Ułatwienie przeciw paraliżowi i zatruciu, niewrażliwość na choroby, brak potrzeby jedzenia, picia, oddychania i snu (6h warta), 2 biegłości w narzędziach, a gdy ktoś rzuci na Ciebie sztuczkę Naprawa (Mending), możesz wydać Kość Wytrzymałości i uleczyć się w środku dnia!", desc_en: "Creature type: Construct. Poison resistance, advantage vs paralyzed/poisoned, immune to disease, and casting the Mending cantrip on you lets you spend a Hit Die to heal!" }
      ]
    },

    "hadozee": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Długość życia zbliżona do ludzi.",
      age_en: "Lifespans comparable to humans.",
      height_pl: "Średni lub Mały (fałdy skóry tworzące błony do szybowania)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      special_speeds_pl: "Wspinaczka 30 ft + Szybowanie (Glide)",
      lore_pl: "Nieustraszeni żeglarze kosmosu (Wildspace) przypominający skrzydlate małpoludy. Posiadają chwytne stopy pozwalające używać przedmiotów w akcji dodatkowej, błony do szybowania oraz reakcję redukującą obrażenia.",
      lore_en: "Simian-like spacefarers of Wildspace equipped with patagia gliding membranes and prehensile feet.",
      detailed_traits: [
        { name_pl: "Unik Hadozee (Hadozee Dodge) i Zwinne Stopy", name_en: "Hadozee Dodge & Dexterous Feet", tag_pl: "Reakcja: Redukcja 1k6 + PB • Przedmiot w Akcji Dodatkowej", desc_pl: "Gdy otrzymujesz obrażenia, możesz jako Reakcję zmniejszyć je o 1k6 + Twoja Premia z Biegłości (PB/długi odpoczynek). Ponadto dzięki chwytnym stopom możesz wykonywać akcję Użycia Przedmiotu (Use an Object) jako AKCJĘ DODATKOWĄ!", desc_en: "Reaction to reduce damage taken by 1d6 + PB (PB/long rest). Use your feet to take the Use an Object action as a bonus action." },
        { name_pl: "Szybowanie (Glide) i Wspinaczka 30 ft", name_en: "Glide", tag_pl: "0 obrażeń od upadku + Lot ślizgowy", desc_pl: "Masz szybkość wspinaczki 30 stóp, szybujesz 5 stóp poziomo na każdą 1 stopę opadania i jako reakcję możesz zredukować obrażenia od dowolnego upadku do 0!", desc_en: "30 ft climb speed, glide 5 feet horizontally per 1 foot of descent, and reaction to take 0 damage from falling." }
      ]
    },

    "plasmoid": {
      xl: true,
      creature_type_pl: "Szlam (Ooze — NIE Humanoid!)",
      creature_type_en: "Ooze",
      age_pl: "Żyją około 100 lat.",
      age_en: "Live about a century.",
      height_pl: "Średni lub Mały (półprzezroczysty, zmiennokształtny żel)",
      height_en: "Medium or Small",
      languages_pl: "Wspólny + 1 dowolny język",
      languages_en: "Common + 1 other language",
      lore_pl: "Świadome istoty ze szlamu przemierzające kosmos Spelljammera. Jako jedyna grywalna rasa posiadają typ istoty Szlam (Ooze), są odporne zarówno na kwas, jak i trucizny, oraz potrafią przecisnąć się przez dziurkę od klucza!",
      lore_en: "Amorphous ooze beings from Wildspace that can reshape their bodies into humanoid limbs or slip through 1-inch cracks.",
      detailed_traits: [
        { name_pl: "Amorficzny (Amorphous) i Kształtowanie Siebie", name_en: "Amorphous & Shape Self", tag_pl: "Szczeliny 2,5 cm + Stałe Adv. w Chwytach + Pseudopod 10 ft!", desc_pl: "Możesz przecisnąć się przez szczelinę o szerokości zaledwie 1 cala (2,5 cm) oraz masz stałe Ułatwienie (Advantage) w testach inicjowania Chwytu (Grapple) oraz uwalniania się z niego! Możesz też dowolnie formować dłonie i stopy lub wypuścić 10-stopową mackę (pseudopod) jako akcję dodatkową.", desc_en: "Squeeze through a 1-inch-wide space and have Advantage on ability checks to initiate or escape a grapple. Extrude a 10-foot pseudopod as a bonus action." },
        { name_pl: "Podwójna Odporność (Kwas i Trucizny) oraz Typ Szlamu", name_en: "Natural Resilience & Ooze Type", tag_pl: "Odporność: Kwas i Trucizna + Typ: Ooze", desc_pl: "Twój typ istoty to Szlam (Ooze — nie działają na Ciebie czary vs Humanoidy!). Posiadasz stałą odporność na obrażenia od kwasu ORAZ od trucizn, Ułatwienie przeciw zatruciu, Widzenie w ciemności 60 ft i wstrzymujesz oddech na 1 godzinę.", desc_en: "Creature type: Ooze. Resistance to BOTH acid and poison damage, advantage vs poisoned, Darkvision 60 ft, and hold breath for 1 hour." }
      ]
    },

    "thri-kreen": {
      xl: true,
      creature_type_pl: "Monstruozum (Monstrosity — NIE Humanoid!)",
      creature_type_en: "Monstrosity",
      age_pl: "Żyją ok. 30–50 lat, ale nie tracą ani godziny na sen!",
      age_en: "Live around 30 to 50 years and never sleep.",
      height_pl: "Średni lub Mały (cztery ręce, chitynowy pancerz i czułki)",
      height_en: "Medium or Small",
      languages_pl: "Thri-kreen + Telepatia 120 ft (do dowolnej liczby istot!)",
      languages_en: "Thri-kreen + 120 ft Telepathy",
      lore_pl: "Czteroręcy modliszkoludzie z pustyń Athasu i przestrzeni Spelljammera. Posiadają aż dwie pary rąk, pancerz kameleona zmieniający barwę, grupową telepatię na 120 stóp oraz typ istoty Monstruozum.",
      lore_en: "Four-armed mantid hunters with chameleon carapaces, sleepless vigilance, and 120-foot group telepathy.",
      detailed_traits: [
        { name_pl: "Dodatkowe Ramiona (Secondary Arms — 4 Ręce!)", name_en: "Secondary Arms", tag_pl: "Tarcza + Fokus + 2 Bronie Lekkie jednocześnie!", desc_pl: "Posiadasz dwie dodatkowe, mniejsze ręce poniżej głównej pary ramion! Dodatkowe dłonie mogą manipulować przedmiotami, wykonywać komponenty somatyczne czarów oraz dzierżyć broń o właściwości Lekka (Light). Oznacza to, że możesz jednocześnie trzymać w głównych dłoniach Tarczę (+2 KP) i Fokus/Rapier, a w dolnych dłoniach dwie lekkie bronie (np. krótkie miecze lub kusze ręczne)!", desc_en: "You have two slightly smaller secondary arms below your primary pair of arms that can manipulate objects and wield light weapons while your main hands hold a shield or two-handed weapon!" },
        { name_pl: "Pancerz Kameleona (KP = 13 + ZRĘ i Adv. w Skradaniu!)", name_en: "Chameleon Carapace", tag_pl: "KP 13 + ZRĘ (Auto) + Stałe Adv. w Skradaniu się!", desc_pl: "Bez pancerza Twoja Klasa Pancerza wynosi 13 + modyfikator ze Zręczności (automatycznie na Karcie Postaci!). Ponadto jako akcję możesz zmienić kolor swojego pancerza, zyskując stałe Ułatwienie (Advantage) w testach Skradania się (Stealth)!", desc_en: "Unarmored AC = 13 + DEX. As an action, change the color of your carapace to gain Advantage on Dexterity (Stealth) checks." },
        { name_pl: "Telepatia 120 stóp, Bezsenność i Typ Monstruozum", name_en: "Thri-kreen Telepathy & Sleepless", tag_pl: "Telepatia 120 ft + Brak Snu + Typ: Monstrosity", desc_pl: "Twój typ istoty to Monstruozum (Monstrosity). Masz Widzenie w ciemności 60 ft, nie potrzebujesz snu (zachowujesz pełną świadomość podczas odpoczynku) oraz możesz komunikować się telepatycznie z dowolną liczbą chętnych istot w promieniu 120 stóp!", desc_en: "Creature type: Monstrosity. Darkvision 60 ft, do not require sleep, and telepathic communication with any number of willing creatures within 120 feet." }
      ]
    },

    "kender": {
      creature_type_pl: "Humanoid",
      creature_type_en: "Humanoid",
      age_pl: "Dojrzałość ok. 20 lat; żyją ponad 100 lat.",
      age_en: "Reach adulthood around 20 and live over a century.",
      height_pl: "Mały (ok. 90–120 cm wzrostu)",
      height_en: "Small (3 to 4 feet tall)",
      languages_pl: "Wspólny, Kenderski",
      languages_en: "Common, Kenderspeak",
      lore_pl: "Słynący z absolutnego braku strachu i ciętego języka mali wędrowcy ze świata Dragonlance (Krynn). Ich Prowokacja zmusza bossów i potwory do skupienia ataków na Kenderze lub cierpienia na Utrudnienie.",
      lore_en: "Originating on the world of Krynn, kender are renowned for their supernatural fearlessness and infuriating taunts.",
      detailed_traits: [
        { name_pl: "Nieustraszony (Fearless)", name_en: "Fearless", tag_pl: "Adv. + Automatyczny Sukces przeciw Strachowi!", desc_pl: "Masz stałe Ułatwienie w rzutach obronnych przeciw Przerażeniu (Frightened). Ponadto, jeśli mimo to nie powiedzie Ci się rzut obronny przeciw przerażeniu, możesz zdecydować, że zamiast tego ODNOSISZ AUTOMATYCZNY SUKCES! (1/długi odpoczynek).", desc_en: "Advantage on saving throws against being frightened. When you fail a save against being frightened, you can choose to succeed instead (1/long rest)." },
        { name_pl: "Prowokacja (Taunt) i Talent Kendera", name_en: "Taunt & Kender Aptitude", tag_pl: "Akcja dodatkowa • Utrudnienie w atakach wroga + 1 Umiejętność", desc_pl: "Jako akcję dodatkową szydzisz z widocznej istoty w promieniu 60 stóp: cel musi wykonać rzut obronny na MĄD (ST = 8 + PB + INT/MĄD/CHA) albo ma Utrudnienie we wszystkich rzutach ataku przeciw każdemu celowi poza Tobą do początku Twojej następnej tury! Zyskujesz też biegłość w Intuicji, Śledztwie, Zwinnych Dłoniach, Skradaniu się lub Przetrwaniu.", desc_en: "Bonus action to taunt a creature within 60 feet (WIS save or Disadvantage on attack rolls against targets other than you). Proficiency in 1 skill." }
      ]
    }
  };

  // Automatyczne wzbogacenie każdego obiektu w window.DND_RACES
  window.DND_RACES_DETAILS = RACE_DETAILS;

  if (Array.isArray(window.DND_RACES)) {
    window.DND_RACES.forEach(race => {
      const det = RACE_DETAILS[race.id];
      if (det) {
        Object.assign(race, det);
      }
      // Jeśli rasa nie miała jawnie przypisanego detailed_traits, zbuduj je z traits_pl / traits_en
      if (!race.detailed_traits || race.detailed_traits.length === 0) {
        race.detailed_traits = (race.traits_pl || []).map((tPl, idx) => {
          const tEn = (race.traits_en && race.traits_en[idx]) || tPl;
          const parenIdx = tPl.indexOf("(");
          const namePl = parenIdx > 2 ? tPl.slice(0, parenIdx).trim() : `Cecha Rasowa #${idx + 1}`;
          return {
            name_pl: namePl,
            name_en: namePl,
            tag_pl: "Cecha Rasowa",
            desc_pl: tPl,
            desc_en: tEn
          };
        });
      }
    });
  }
})();
