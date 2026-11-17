// ============================================================================
// Pełne rozszerzenie wszystkich oficjalnych Atutów (Feats) z dnd5e.wikidot.com:
// - Player's Handbook (PHB)
// - Tasha's Cauldron of Everything (TCE)
// - Xanathar's Guide to Everything (XGE — Racial Feats)
// - Fizban's Treasury of Dragons (FTD — Dragon Gifts)
// - Bigby Presents: Glory of the Giants (BGG — Giant Feats)
// - Book of Many Things (BMT), Strixhaven (SCC), Eberron (ERLW), Dragonlance (DSotDQ), Planescape (PS)
// ============================================================================

(function () {
  const extraFeats = [
    // ======================== PLAYER'S HANDBOOK (PHB) ========================
    {
      id: "actor",
      name_pl: "Aktor",
      name_en: "Actor",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 CHA",
      desc_pl: "+1 do Charyzmy. Masz Ułatwienie w testach Oszustwa i Występów, gdy udajesz inną osobę, oraz potrafisz perfekcyjnie naśladować mowę i głosy innych istot.",
      desc_en: "+1 CHA. Advantage on Deception and Performance checks when trying to pass yourself off as a different person, plus mimic speech and sounds of others."
    },
    {
      id: "athlete",
      name_pl: "Atleta",
      name_en: "Athlete",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności. Wstawanie z pozycji Powalonej (Prone) kosztuje Cię tylko 5 stóp ruchu, wspinaczka nie zmniejsza szybkości, a skok z rozbiegu wymaga tylko 5 stóp ruchu.",
      desc_en: "+1 STR or DEX. Standing up from prone uses only 5 feet of movement, climbing doesn't cost extra movement, and running jumps require only 5 ft."
    },
    {
      id: "charger",
      name_pl: "Szarżujący",
      name_en: "Charger",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Gdy użyjesz akcji Sprintu (Dash), możesz w akcji dodatkowej wykonać 1 atak bronią wręcz (+5 do obrażeń po ruchu min. 10 stóp) lub odepchnąć cel na 10 stóp.",
      desc_en: "When you Dash, you can use a bonus action to make one melee weapon attack (+5 damage if moved 10 ft) or shove a creature 10 feet."
    },
    {
      id: "defensive-duelist",
      name_pl: "Defensywny Szermierz",
      name_en: "Defensive Duelist",
      category: "PHB",
      source: "PHB",
      prereq: "Zręczność 13+",
      asi: null,
      desc_pl: "Gdy dzierżysz broń finezyjną i zostaniesz trafiony atakiem wręcz, możesz użyć reakcji, aby dodać swoją premię z biegłości (+2 do +6) do Klasy Pancerza przeciw temu atakowi!",
      desc_en: "When wielding a finesse weapon and hit by a melee attack, use your reaction to add your proficiency bonus to your AC for that attack."
    },
    {
      id: "dual-wielder",
      name_pl: "Walczący Dwiema Broniami",
      name_en: "Dual Wielder",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "+1 do Klasy Pancerza, gdy trzymasz broń wręcz w każdej dłoni. Możesz walczyć dwiema broniami jednoręcznymi, nawet jeśli nie są lekkie (np. dwa rapiery lub dwa długie miecze!), i dobywać obu naraz.",
      desc_en: "+1 AC while wielding a separate melee weapon in each hand, use two-weapon fighting with non-light one-handed melee weapons, and draw/stow two weapons at once."
    },
    {
      id: "dungeon-delver",
      name_pl: "Badacz Podziemi",
      name_en: "Dungeon Delver",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Ułatwienie w wykrywaniu tajnych drzwi, Ułatwienie w rzutach obronnych przeciw pułapkom, odporność na obrażenia zadawane przez pułapki oraz przeszukiwanie w normalnym tempie podróży.",
      desc_en: "Advantage to detect secret doors, advantage on saves vs traps, resistance to damage dealt by traps, and search at normal pace."
    },
    {
      id: "durable",
      name_pl: "Wytrzymały",
      name_en: "Durable",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 CON",
      desc_pl: "+1 do Kondycji. Gdy wydajesz Kości Wytrzymałości na leczenie podczas krótkiego odpoczynku, minimalna liczba PW odzyskanych z każdej kości wynosi dwukrotność Twojego modyfikatora z Kondycji.",
      desc_en: "+1 CON. When you roll a Hit Die to regain hit points, the minimum number of HP you regain from the roll equals twice your Constitution modifier."
    },
    {
      id: "elemental-adept",
      name_pl: "Adept Żywiołów",
      name_en: "Elemental Adept",
      category: "PHB",
      source: "PHB",
      prereq: "Rzucanie zaklęć",
      asi: null,
      desc_pl: "Wybierz żywioł (Kwas, Zimno, Ogień, Błyskawice lub Grzmot). Zaklęcia, które rzucasz, ignorują Odporność wrogów na ten typ obrażeń, a każdą jedynkę '1' na kościach obrażeń traktujesz jako '2'!",
      desc_en: "Choose Acid, Cold, Fire, Lightning, or Thunder. Spells you cast ignore resistance to damage of the chosen type, and any 1 on a damage die is treated as a 2."
    },
    {
      id: "grappler",
      name_pl: "Zapaśnik",
      name_en: "Grappler",
      category: "PHB",
      source: "PHB",
      prereq: "Siła 13+",
      asi: null,
      desc_pl: "Masz Ułatwienie w rzutach ataku przeciw istocie, którą trzymasz w chwycie (Grappled), i możesz poświęcić akcję na unieruchomienie (Restrained) pochwyconego celu.",
      desc_en: "Advantage on attack rolls against a creature you are grappling, and you can use your action to try to pin a creature grappled by you."
    },
    {
      id: "healer",
      name_pl: "Uzdrowiciel (Medyk)",
      name_en: "Healer",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Używając zestawu uzdrowiciela (Healer's Kit): stabilizujesz umierającego sojusznika z 0 PW i natychmiast przywracasz mu 1 PW, lub leczysz istotę za 1k6 + 4 + jej poziom PW (raz na krótki odpoczynek na osobę!).",
      desc_en: "Stabilize a dying creature with a healer's kit to also restore 1 HP, or use an action to restore 1d6 + 4 + target's max Hit Dice HP (1/short rest per creature)."
    },
    {
      id: "heavily-armored",
      name_pl: "Ciężkozbrojny",
      name_en: "Heavily Armored",
      category: "PHB",
      source: "PHB",
      prereq: "Biegłość w średnich pancerzach",
      asi: "+1 STR",
      desc_pl: "+1 do Siły oraz zyskujesz biegłość w ciężkich pancerzach (np. zbroi płytowej).",
      desc_en: "+1 STR and gain proficiency with heavy armor."
    },
    {
      id: "heavy-armor-master",
      name_pl: "Mistrz Ciężkiego Pancerza",
      name_en: "Heavy Armor Master",
      category: "PHB",
      source: "PHB",
      prereq: "Biegłość w ciężkich pancerzach",
      asi: "+1 STR",
      desc_pl: "+1 do Siły. Gdy nosisz ciężki pancerz, wszelkie obrażenia obuchowe, kłute i cięte z niemagicznych ataków są zmniejszane o 3 przy każdym trafieniu!",
      desc_en: "+1 STR. While wearing heavy armor, bludgeoning, piercing, and slashing damage from nonmagical attacks is reduced by 3."
    },
    {
      id: "inspiring-leader",
      name_pl: "Inspirujący Przywódca",
      name_en: "Inspiring Leader",
      category: "PHB",
      source: "PHB",
      prereq: "Charyzma 13+",
      asi: null,
      desc_pl: "Poświęcając 10 minut na przemowę (np. podczas każdego krótkiego lub długiego odpoczynku), dajesz sobie oraz do 5 sojusznikom Tymczasowe PW równe Twojemu poziomowi + modyfikator z Charyzmy!",
      desc_en: "Spend 10 minutes inspiring up to six friendly creatures (including yourself) to grant each temporary HP equal to your level + your Charisma modifier per short rest."
    },
    {
      id: "keen-mind",
      name_pl: "Bystry Umysł",
      name_en: "Keen Mind",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 INT",
      desc_pl: "+1 do Inteligencji. Zawsze wiesz, gdzie jest północ, ile godzin zostało do wschodu/zachodu słońca, oraz dokładnie pamiętasz wszystko, co widziałeś lub słyszałeś w ciągu ostatniego miesiąca.",
      desc_en: "+1 INT. Always know which way is north, hours left before sunrise/sunset, and accurately recall anything seen or heard within the past month."
    },
    {
      id: "lightly-armored",
      name_pl: "Lekkozbrojny",
      name_en: "Lightly Armored",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności oraz zyskujesz biegłość w lekkich pancerzach.",
      desc_en: "+1 STR or DEX and gain proficiency with light armor."
    },
    {
      id: "linguist",
      name_pl: "Lingwista",
      name_en: "Linguist",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 INT",
      desc_pl: "+1 do Inteligencji, poznajesz 3 dowolne języki oraz potrafisz tworzyć pisemne szyfry.",
      desc_en: "+1 INT, learn three languages of your choice, and create written ciphers."
    },
    {
      id: "mage-slayer",
      name_pl: "Pogromca Magów",
      name_en: "Mage Slayer",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Gdy istota w zasięgu 5 stóp rzuca zaklęcie, możesz wykonać przeciw niej atak wręcz jako reakcję. Wrogowie, których zranisz, mają Utrudnienie w testach Koncentracji, a Ty masz Ułatwienie w rzutach obronnych przeciw czarom rzucanym w 5 stóp od Ciebie.",
      desc_en: "Reaction melee attack when a creature within 5 ft casts a spell, foes you damage have disadvantage on Concentration saves, and you have advantage on saves vs spells cast within 5 ft."
    },
    {
      id: "magic-initiate",
      name_pl: "Wtajemniczony w Magię",
      name_en: "Magic Initiate",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Wybierz klasę (Bard, Kleryk, Druid, Zaklinacz, Czarnoksiężnik lub Mag): poznajesz 2 Sztuczki z jej listy oraz 1 zaklęcie 1. kręgu (np. Znalezienie Chowańca, Tarcza, Błogosławieństwo), które rzucasz raz dziennie za darmo.",
      desc_en: "Learn two cantrips and one 1st-level spell of your choice from Bard, Cleric, Druid, Sorcerer, Warlock, or Wizard (cast 1/long rest without a slot)."
    },
    {
      id: "martial-adept",
      name_pl: "Adept Sztuk Walki",
      name_en: "Martial Adept",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Poznajesz 2 Manewry z podklasy Mistrza Bitewnego (Battle Master) oraz zyskujesz 1 Kość Górowania k6 (odnawia się po krótkim odpoczynku).",
      desc_en: "Learn two maneuvers from the Battle Master archetype and gain one d6 superiority die (recharges on short or long rest)."
    },
    {
      id: "medium-armor-master",
      name_pl: "Mistrz Średniego Pancerza",
      name_en: "Medium Armor Master",
      category: "PHB",
      source: "PHB",
      prereq: "Biegłość w średnich pancerzach",
      asi: null,
      desc_pl: "Noszenie średniego pancerza nie nakłada Utrudnienia do Skradania się, a przy Zręczności 16+ możesz dodać +3 (zamiast +2) do Klasy Pancerza!",
      desc_en: "Wearing medium armor doesn't impose disadvantage on Stealth, and you can add up to +3 (instead of +2) DEX modifier to AC."
    },
    {
      id: "moderately-armored",
      name_pl: "Średniozbrojny",
      name_en: "Moderately Armored",
      category: "PHB",
      source: "PHB",
      prereq: "Biegłość w lekkich pancerzach",
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności oraz zyskujesz biegłość w średnich pancerzach i TARCZACH (ulubiony atut Bardów i Czarnoksiężników dający skok KP do 19!).",
      desc_en: "+1 STR or DEX and gain proficiency with medium armor and shields!"
    },
    {
      id: "mounted-combatant",
      name_pl: "Jeździec Bojowy",
      name_en: "Mounted Combatant",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Walcząc wierzchem: masz Ułatwienie w atakach wręcz przeciw pieszym wrogom mniejszym od Twojego wierzchowca, możesz przekierowywać ataki wymierzone w rumaka na siebie, a Twój rumak zyskuje Unik (Evasion)!",
      desc_en: "While mounted: Advantage on melee attacks against unmounted creatures smaller than your mount, redirect attacks targeting your mount to yourself, and grant your mount Evasion."
    },
    {
      id: "observant",
      name_pl: "Spostrzegawczy",
      name_en: "Observant",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 INT/WIS",
      desc_pl: "+1 do Inteligencji lub Mądrości, potrafisz czytać z ruchu warg oraz otrzymujesz potężną premię +5 do Pasywnej Percepcji i Pasywnego Śledztwa!",
      desc_en: "+1 INT or WIS, read lips, and gain a +5 bonus to your passive Perception and passive Investigation scores."
    },
    {
      id: "ritual-caster",
      name_pl: "Rytualista",
      name_en: "Ritual Caster",
      category: "PHB",
      source: "PHB",
      prereq: "Inteligencja lub Mądrość 13+",
      asi: null,
      desc_pl: "Otrzymujesz Księgę Rytuałów z dwoma zaklęciami 1. kręgu z cechą Rytuał i możesz dopisywać do niej kolejne znalezione rytuały aż do połowy swojego poziomu.",
      desc_en: "Acquire a ritual book holding two 1st-level ritual spells of a chosen class, and copy additional ritual spells you find into it."
    },
    {
      id: "savage-attacker",
      name_pl: "Dziki Napastnik",
      name_en: "Savage Attacker",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Raz na turę przy trafieniu atakiem bronią wręcz możesz przerzucić kości obrażeń broni i wybrać wyższy wynik.",
      desc_en: "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total."
    },
    {
      id: "shield-master",
      name_pl: "Mistrz Tarczy",
      name_en: "Shield Master",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Gdy atakujesz w swojej turze, możesz w akcji dodatkowej pchnąć wroga tarczą (powalenie lub odepchnięcie). Ponadto dodajesz premię KP tarczy do rzutów obronnych na Zręczność i możesz w reakcji zredukować obrażenia obszarowe do 0!",
      desc_en: "Bonus action shove with your shield when you take the Attack action, add shield's AC bonus to single-target DEX saves, and use reaction to take 0 damage on a successful DEX save."
    },
    {
      id: "skilled",
      name_pl: "Wyszkolony",
      name_en: "Skilled",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: null,
      desc_pl: "Zyskujesz biegłość w dowolnej kombinacji 3 umiejętności lub narzędzi.",
      desc_en: "Gain proficiency in any combination of three skills or tools of your choice."
    },
    {
      id: "skulker",
      name_pl: "Czający się",
      name_en: "Skulker",
      category: "PHB",
      source: "PHB",
      prereq: "Zręczność 13+",
      asi: null,
      desc_pl: "Możesz ukrywać się w lekkim przesłonięciu (np. półmrok, mgła), chybienie atakiem dystansowym z ukrycia nie zdradza Twojej pozycji, a słabe światło nie nakłada Utrudnienia na Percepcję.",
      desc_en: "Hide when lightly obscured, missing a ranged weapon attack while hidden doesn't reveal your position, and dim light doesn't impose disadvantage on Perception."
    },
    {
      id: "spell-sniper",
      name_pl: "Snajper Zaklęć",
      name_en: "Spell Sniper",
      category: "PHB",
      source: "PHB",
      prereq: "Rzucanie zaklęć",
      asi: null,
      desc_pl: "Podwajasz zasięg wszystkich zaklęć wymagających rzutu ataku, Twoje ataki czarami ignorują częściową i trzy-czwarte osłony, oraz poznajesz 1 Sztuczkę bojową (np. Eldritch Blast lub Fire Bolt).",
      desc_en: "Double the range of spells that require an attack roll, ranged spell attacks ignore half and three-quarters cover, and learn one attack roll cantrip."
    },
    {
      id: "tavern-brawler",
      name_pl: "Karczemny Zabijaka",
      name_en: "Tavern Brawler",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 STR/CON",
      desc_pl: "+1 do Siły lub Kondycji, biegłość w broniach improwizowanych, kość k4 do uderzeń bez broni oraz możliwość Chwytania (Grapple) w akcji dodatkowej po trafieniu bez broni!",
      desc_en: "+1 STR or CON, proficiency with improvised weapons, d4 unarmed strike, and bonus action grapple after hitting with an unarmed strike or improvised weapon."
    },
    {
      id: "weapon-master",
      name_pl: "Mistrz Broni",
      name_en: "Weapon Master",
      category: "PHB",
      source: "PHB",
      prereq: null,
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności oraz biegłość w 4 wybranych broniach prostych lub żołnierskich.",
      desc_en: "+1 STR or DEX and gain proficiency with four weapons of your choice."
    },

    // ======================== TASHA'S CAULDRON OF EVERYTHING (TCE) ========================
    {
      id: "artificer-initiate",
      name_pl: "Wtajemniczony Artefaktor",
      name_en: "Artificer Initiate",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: null,
      desc_pl: "Poznajesz 1 sztuczkę i 1 zaklęcie 1. kręgu z listy Artefaktora (INT, możesz też rzucać je z komórek) oraz biegłość w 1 narzędziach rzemieślniczych służących jako fokus.",
      desc_en: "Learn one Artificer cantrip and one 1st-level Artificer spell, plus proficiency with one type of artisan's tools."
    },
    {
      id: "chef",
      name_pl: "Kucharz (Szef Kuchni)",
      name_en: "Chef",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 CON/WIS",
      desc_pl: "+1 do Kondycji lub Mądrości, biegłość w przyborach kucharskich, dodatkowe +1k8 leczenia dla całej drużyny podczas krótkiego odpoczynku oraz pieczenie smakołyków dających tymczasowe PW!",
      desc_en: "+1 CON or WIS, cook's utensils proficiency, allies regain extra 1d8 HP on short rest, and bake treats that grant temporary HP as a bonus action."
    },
    {
      id: "crusher",
      name_pl: "Miażdżyciel (Crusher)",
      name_en: "Crusher",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 STR/CON",
      desc_pl: "+1 do Siły lub Kondycji. Raz na turę przy trafieniu obrażeniami obuchowymi przesuwasz cel o 5 stóp. Po trafieniu krytycznym obuchowym wszystkie ataki drużyny przeciw temu celowi mają Ułatwienie do Twojej następnej tury!",
      desc_en: "+1 STR or CON. Once per turn, move a creature 5 ft when you hit it with bludgeoning damage; critical hits with bludgeoning grant advantage on all attacks against the target until your next turn."
    },
    {
      id: "eldritch-adept",
      name_pl: "Mistyczny Adept",
      name_en: "Eldritch Adept",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: "Rzucanie zaklęć lub Magia Paktu",
      asi: null,
      desc_pl: "Poznajesz jedną Mistyczną Inwokację (Eldritch Invocation) z klasy Czarnoksiężnika (np. Diabelski Wzrok / Devil's Sight, Mgliste Wizje, Maski Wielu Twarzy)!",
      desc_en: "Learn one Eldritch Invocation option of your choice from the Warlock class (such as Devil's Sight, Eldritch Mind, or Misty Visions)."
    },
    {
      id: "fighting-initiate",
      name_pl: "Wtajemniczony Wojownik",
      name_en: "Fighting Initiate",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: "Biegłość w broni żołnierskiej",
      asi: null,
      desc_pl: "Poznajesz jeden wybrany Styl Walki z klasy Wojownika (np. Strzelectwo +2 do trafienia, Obrona +1 KP, Walka w Ciemności / Blind Fighting 10 ft lub Szermierka +2 obr.).",
      desc_en: "Learn one Fighting Style option of your choice from the Fighter class (Archery, Defense, Dueling, Blind Fighting, Superior Technique, etc.)."
    },
    {
      id: "gunner",
      name_pl: "Strzelec Palny (Gunner)",
      name_en: "Gunner",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 DEX",
      desc_pl: "+1 do Zręczności, biegłość w broni palnej, ignorujesz cechę Ładowania broni palnej oraz brak Utrudnienia przy wykonywaniu jakichkolwiek ataków dystansowych (w tym zaklęciami!) w zwarciu (5 stóp)!",
      desc_en: "+1 DEX, proficiency with firearms, ignore loading property of firearms, and being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls."
    },
    {
      id: "piercer",
      name_pl: "Przebijacz (Piercer)",
      name_en: "Piercer",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności. Raz na turę możesz przerzucić jedną kość obrażeń kłutych, a przy trafieniu krytycznym obrażeniami kłutymi dorzucasz jedną dodatkową kość obrażeń!",
      desc_en: "+1 STR or DEX. Reroll one piercing damage die once per turn, and roll one additional damage die on a critical hit with piercing damage."
    },
    {
      id: "poisoner",
      name_pl: "Truciciel",
      name_en: "Poisoner",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: null,
      desc_pl: "Twoje obrażenia od trucizn ignorują Odporność wrogów na trucizny! Możesz nakładać truciznę na broń jako akcję dodatkową i warzyć dawki Silnej Trucizny (2k8 + stan Zatruty).",
      desc_en: "Ignore resistance to poison damage, apply poison to a weapon as a bonus action, and brew doses of potent poison (2d8 poison damage + poisoned condition)."
    },
    {
      id: "slasher",
      name_pl: "Rębacz (Slasher)",
      name_en: "Slasher",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności. Raz na turę trafienie obrażeniami ciętymi obniża szybkość celu o 10 stóp, a trafienie krytyczne nakłada na cel Utrudnienie we wszystkich atakach do Twojej następnej tury!",
      desc_en: "+1 STR or DEX. Reduce target's speed by 10 ft once per turn on a slashing hit; critical hits impose disadvantage on all attack rolls the target makes until your next turn."
    },
    {
      id: "telepathic",
      name_pl: "Telepata",
      name_en: "Telepathic",
      category: "Tasha's (TCE)",
      source: "TCE",
      prereq: null,
      asi: "+1 INT/WIS/CHA",
      desc_pl: "+1 do INT, MĄD lub CHA, telepatyczna mowa do istot w zasięgu 60 stóp oraz zaklęcie Wykrycie Myśli (Detect Thoughts) 1/dzień bez komponentów i z komórek czarów.",
      desc_en: "+1 INT, WIS, or CHA, speak telepathically within 60 feet, and cast Detect Thoughts once per long rest without components (and with spell slots)."
    },

    // ======================== XANATHAR'S RACIAL FEATS (XGE) ========================
    {
      id: "bountiful-luck",
      name_pl: "Hojne Szczęście",
      name_en: "Bountiful Luck",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Niziołek (Halfling)",
      asi: null,
      desc_pl: "Gdy sojusznik w zasięgu 30 stóp wyrzuci '1' na kości k20 przy ataku, teście lub rzucie obronnym, możesz użyć swojej reakcji, aby pozwolić mu przerzucić tę kość!",
      desc_en: "(Halfling) When an ally you can see within 30 feet rolls a 1 on the d20 for an attack roll, ability check, or saving throw, use your reaction to let the ally reroll the die."
    },
    {
      id: "dragon-fear",
      name_pl: "Smocza Groza",
      name_en: "Dragon Fear",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Drakon (Dragonborn)",
      asi: "+1 STR/CON/CHA",
      desc_pl: "+1 do SIŁ, KON lub CHA. Zamiast zadawać obrażenia Zionięciem, możesz zaryczeć i zmusić wybranych wrogów w promieniu 30 stóp do rzutu obronnego na Mądrość — przy porażce są Przerażeni na 1 minutę!",
      desc_en: "(Dragonborn) +1 STR, CON, or CHA. Expend a Breath Weapon use to roar and force chosen creatures within 30 ft to make a WIS save or become Frightened for 1 minute."
    },
    {
      id: "drow-high-magic",
      name_pl: "Wysoka Magia Drowów",
      name_en: "Drow High Magic",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Elf (Drow)",
      asi: null,
      desc_pl: "Możesz rzucać Wykrycie Magii (Detect Magic) w nieskończoność na życzenie (at will) bez komórek, oraz poznajesz Lewitację i Rozproszenie Magii (Dispel Magic) 1/dzień za darmo.",
      desc_en: "(Drow) Cast Detect Magic at will without expending a spell slot, and learn Levitate and Dispel Magic (1/long rest each free)."
    },
    {
      id: "dwarven-fortitude",
      name_pl: "Krasnoludzki Hart",
      name_en: "Dwarven Fortitude",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Krasnolud (Dwarf)",
      asi: "+1 CON",
      desc_pl: "+1 do Kondycji. Za każdym razem, gdy wykonujesz w walce akcję Uniku (Dodge), możesz natychmiast wydać jedną Kość Wytrzymałości, aby się uleczyć!",
      desc_en: "(Dwarf) +1 CON. Whenever you take the Dodge action in combat, you can spend one Hit Die to heal yourself."
    },
    {
      id: "fey-teleportation",
      name_pl: "Teleportacja Fey",
      name_en: "Fey Teleportation",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Elf Wysoki (High Elf)",
      asi: "+1 INT/CHA",
      desc_pl: "+1 do Inteligencji lub Charyzmy, poznajesz język Sylwan oraz zaklęcie Krok przez Mgłę (Misty Step), które odnawia się po każdym Krótkim lub Długim Odpoczynku!",
      desc_en: "(High Elf) +1 INT or CHA, learn Sylvan, and cast Misty Step once per short or long rest without a slot."
    },
    {
      id: "flames-of-phlegethos",
      name_pl: "Płomienie Flegetonu",
      name_en: "Flames of Phlegethos",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Diabelstwo (Tiefling)",
      asi: "+1 INT/CHA",
      desc_pl: "+1 do INT lub CHA. Przerzucasz każdą jedynkę '1' na kościach obrażeń zaklęć ognia, a po rzuceniu czaru ognia otaczają Cię płomienie zadające 1k4 ognia każdemu, kto trafi Cię wręcz.",
      desc_en: "(Tiefling) +1 INT or CHA. Reroll any 1 on fire spell damage dice, and wreath yourself in flames dealing 1d4 fire damage to melee attackers."
    },
    {
      id: "infernal-constitution",
      name_pl: "Piekielna Kondycja",
      name_en: "Infernal Constitution",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Diabelstwo (Tiefling)",
      asi: "+1 CON",
      desc_pl: "+1 do Kondycji oraz zyskujesz Odporność na obrażenia od Zimna oraz Trucizn (w połączeniu z Piekielną Odpornością masz odporność na Ogień, Zimno i Trucizny!) oraz Ułatwienie przeciw zatruciu.",
      desc_en: "(Tiefling) +1 CON, gain resistance to cold damage and poison damage, and have advantage on saving throws against being poisoned."
    },
    {
      id: "orcish-fury",
      name_pl: "Orcza Furia",
      name_en: "Orcish Fury",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Półork (Half-Orc)",
      asi: "+1 STR/CON",
      desc_pl: "+1 do Siły lub Kondycji. Raz na krótki odpoczynek dodajesz dodatkową kość obrażeń broni, oraz możesz wykonać natychmiastowy atak w reakcji, gdy odpali się Twoja Nieustępliwa Wytrzymałość (spadek do 1 PW).",
      desc_en: "(Half-Orc) +1 STR or CON. Roll an extra weapon damage die 1/short rest, and make a reaction attack when you use Relentless Endurance."
    },
    {
      id: "prodigy",
      name_pl: "Cudowne Dziecko (Talent)",
      name_en: "Prodigy",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Człowiek, Półelf lub Półork",
      asi: null,
      desc_pl: "Zyskujesz biegłość w 1 umiejętności, 1 narzędziu, 1 języku oraz Ekspertyzę (podwójną biegłość) w jednej wybranej umiejętności!",
      desc_en: "(Human, Half-Elf, Half-Orc) Gain one skill proficiency, one tool proficiency, one language, and Expertise in one skill."
    },
    {
      id: "second-chance",
      name_pl: "Druga Szansa",
      name_en: "Second Chance",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Niziołek (Halfling)",
      asi: "+1 DEX/CON/CHA",
      desc_pl: "+1 do ZRĘ, KON lub CHA. Gdy wróg trafi Cię atakiem, możesz w reakcji zmusić go do przerzucenia kości k20 (odnawia się po inicjatywie lub krótkim odpoczynku)!",
      desc_en: "(Halfling) +1 DEX, CON, or CHA. When a creature you can see hits you with an attack roll, use your reaction to force that creature to reroll."
    },
    {
      id: "wood-elf-magic",
      name_pl: "Magia Leśnych Elfów",
      name_en: "Wood Elf Magic",
      category: "Xanathar's Racial (XGE)",
      source: "XGE",
      prereq: "Elf Leśny (Wood Elf)",
      asi: null,
      desc_pl: "Poznajesz 1 sztuczkę Druida oraz zaklęcia Długi Krok (Longstrider) i Przejście bez Śladu (Pass without Trace) 1/dzień za darmo!",
      desc_en: "(Wood Elf) Learn one Druid cantrip, plus Longstrider and Pass without Trace (each 1/long rest without a slot)."
    },

    // ======================== FIZBAN, BIGBY, STRIXHAVEN, BOOK OF MANY THINGS ========================
    {
      id: "gift-of-the-chromatic-dragon",
      name_pl: "Dar Chromatycznego Smoka",
      name_en: "Gift of the Chromatic Dragon",
      category: "Fizban, Bigby & Setting",
      source: "FTD",
      prereq: null,
      asi: null,
      desc_pl: "W akcji dodatkowej nasycasz broń na 1 minutę dodatkowymi +1k4 obrażeń od kwasu, zimna, ognia, błyskawic lub trucizny, oraz jako reakcję zyskujesz Odporność na obrażenia żywiołów (biegłość razy dziennie — jak darmowe Absorb Elements dla każdego!).",
      desc_en: "Bonus action to infuse a weapon with +1d4 elemental damage for 1 minute, and use reaction to gain resistance to acid, cold, fire, lightning, or poison damage (PB/long rest)."
    },
    {
      id: "gift-of-the-gem-dragon",
      name_pl: "Dar Klejnotowego Smoka",
      name_en: "Gift of the Gem Dragon",
      category: "Fizban, Bigby & Setting",
      source: "FTD",
      prereq: null,
      asi: "+1 INT/WIS/CHA",
      desc_pl: "+1 do INT, MĄD lub CHA. Gdy otrzymasz obrażenia od istoty w odległości 10 stóp, możesz w reakcji zadać jej 2k8 obrażeń od mocy (Force) i odepchnąć ją o 10 stóp!",
      desc_en: "+1 INT, WIS, or CHA. Reaction when damaged by a creature within 10 ft to deal 2d8 force damage and push it 10 feet away."
    },
    {
      id: "gift-of-the-metallic-dragon",
      name_pl: "Dar Metalicznego Smoka",
      name_en: "Gift of the Metallic Dragon",
      category: "Fizban, Bigby & Setting",
      source: "FTD",
      prereq: null,
      asi: null,
      desc_pl: "Poznajesz Leczenie Ran (Cure Wounds), a jako reakcję możesz otoczyć siebie lub sojusznika w 5 ft widmowymi skrzydłami, dodając swoją premię z biegłości (+2 do +6) do Klasy Pancerza przeciw atakowi!",
      desc_en: "Learn Cure Wounds (1/day free + spell slots), and use reaction to grant Protective Wings (+PB bonus to AC) to yourself or an ally within 5 feet."
    },
    {
      id: "strike-of-the-giants",
      name_pl: "Uderzenie Gigantów",
      name_en: "Strike of the Giants",
      category: "Fizban, Bigby & Setting",
      source: "BGG",
      prereq: null,
      asi: null,
      desc_pl: "Twoje ataki bronią zostają nasycone magią wybranego rodzaju giganta (Chmur: niewidzialność; Ognia: +1k10 ognia; Mrozu: +1k6 zimna i szybkość 0; Wzgórz: +1k6 i powalenie; Kamienia: +1k6 i odepchnięcie; Burzy: +1k6 błyskawic i Utrudnienie).",
      desc_en: "Imbue weapon attacks with giant magic (Cloud, Fire, Frost, Hill, Stone, or Storm Strike) dealing bonus damage and applying powerful control effects."
    },
    {
      id: "cartomancer",
      name_pl: "Kartomanta (Magia Kart)",
      name_en: "Cartomancer",
      category: "Fizban, Bigby & Setting",
      source: "BMT",
      prereq: "Poz. 4+, Rzucanie zaklęć",
      asi: null,
      desc_pl: "Poznajesz Prestidigitację, a po długim odpoczynku możesz ukryć w karcie dowolne zaklęcie ze swojej klasy (na kręgu, do którego masz komórki) i rzucić je w walce jako AKCJĘ DODATKOWĄ bez zużywania komórki!",
      desc_en: "Imbue a card with any action-cast spell from your class list of a level you have slots for, and flourish the card to cast it as a Bonus Action once per long rest!"
    },
    {
      id: "strixhaven-initiate",
      name_pl: "Wtajemniczony ze Strixhaven",
      name_en: "Strixhaven Initiate",
      category: "Fizban, Bigby & Setting",
      source: "SCC",
      prereq: null,
      asi: null,
      desc_pl: "Wybierz kolegium Strixhaven (Lorehold, Prismari, Quandrix, Silverquill lub Witherbloom): poznajesz 2 sztuczki oraz 1 zaklęcie 1. kręgu (np. Tarcza, Srebrzyste Drwiny, Leczenie Ran), które możesz rzucać za darmo 1/dzień ORAZ z własnych komórek czarów!",
      desc_en: "Choose a Strixhaven college to learn 2 cantrips and one 1st-level spell (cast 1/long rest free AND using any spell slots you have)."
    },
    {
      id: "revenant-blade",
      name_pl: "Ostrze Upiór (Podwójny Sejmitar)",
      name_en: "Revenant Blade",
      category: "Fizban, Bigby & Setting",
      source: "ERLW",
      prereq: "Elf",
      asi: "+1 STR/DEX",
      desc_pl: "+1 do Siły lub Zręczności, +1 do Klasy Pancerza podczas dzierżenia podwójnego sejmitara (Double-Bladed Scimitar) oraz traktujesz tę broń dwuręczną jako broń finezyjną!",
      desc_en: "(Elf) +1 STR or DEX, +1 AC while wielding a double-bladed scimitar, and the double-bladed scimitar has the finesse property for you."
    },
    {
      id: "squire-of-solamnia",
      name_pl: "Giermek Solamnii",
      name_en: "Squire of Solamnia",
      category: "Fizban, Bigby & Setting",
      source: "DSotDQ",
      prereq: null,
      asi: null,
      desc_pl: "Wsiadanie na wierzchowca kosztuje tylko 5 stóp, oraz bierzemy Precyzyjne Uderzenie (Precise Strike): w akcji dodatkowej zyskujesz Ułatwienie w następnym ataku bronią, który przy trafieniu zadaje dodatkowe +1k8 obrażeń (zużycie ładunku dzieje się tylko, jeśli trafisz!).",
      desc_en: "Mount/dismount costs 5 ft, and Precise Strike grants advantage on a weapon attack as a bonus action (+1d8 damage on hit; use is only expended if the attack hits!)."
    }
  ];

  // Uzupełnienie kategorii dla podstawowych 17 atutów
  (window.DND_FEATS || []).forEach(f => {
    if (!f.category) {
      if (f.source === "TCE") f.category = "Tasha's (TCE)";
      else if (f.source === "XGE") f.category = "Xanathar's Racial (XGE)";
      else f.category = "PHB";
    }
  });

  window.DND_FEATS = (window.DND_FEATS || []).concat(extraFeats);
})();
