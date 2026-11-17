// ============================================================================
// Kroniki D&D 5e — Generator Ilustrowanych Portretów Ras (61) i Klas (13)
// Tworzy szczegółowe, wielowarstwowe portrety fantasy SVG (data URI)
// dla każdej grywalnej rasy oraz klasy postaci.
// ============================================================================

(function () {
  const cacheRace = {};
  const cacheClass = {};

  function svgToDataUri(svgString) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(svgString.trim());
  }

  // Konfiguracja anatomii i palety barw dla wszystkich 61 ras
  const RACE_VISUALS = {
    "human-variant":   { archetype: "human", bg1: "#2b1d3d", bg2: "#130d1f", skin: "#e2b494", hair: "#4a2e1b", eyes: "#60a5fa", accent: "#e5c158", extra: "scar" },
    "human-standard":  { archetype: "human", bg1: "#1e293b", bg2: "#0f172a", skin: "#d9a583", hair: "#2b1d14", eyes: "#38bdf8", accent: "#f59e0b", extra: "circlet" },
    "custom-lineage":  { archetype: "human", bg1: "#311b47", bg2: "#140b24", skin: "#d4b5d8", hair: "#e2e8f0", eyes: "#c084fc", accent: "#a855f7", extra: "halo" },

    "elf-high":        { archetype: "elf", bg1: "#1e2a4a", bg2: "#0d1326", skin: "#f3d8c4", hair: "#fde047", eyes: "#38bdf8", accent: "#e5c158", extra: "circlet" },
    "elf-wood":        { archetype: "elf", bg1: "#143326", bg2: "#091912", skin: "#d2a27f", hair: "#3f2314", eyes: "#4ade80", accent: "#22c55e", extra: "leaves" },
    "elf-drow":        { archetype: "elf", bg1: "#251438", bg2: "#0e0717", skin: "#47435e", hair: "#f8fafc", eyes: "#f43f5e", accent: "#c084fc", extra: "web" },
    "elf-shadar-kai":  { archetype: "elf", bg1: "#1e1b29", bg2: "#09080d", skin: "#cbd5e1", hair: "#0f172a", eyes: "#a855f7", accent: "#94a3b8", extra: "raven" },
    "elf-eladrin":     { archetype: "elf", bg1: "#3b1d36", bg2: "#190a17", skin: "#f5d0b5", hair: "#fb923c", eyes: "#fde047", accent: "#f472b6", extra: "leaves" },
    "elf-sea":         { archetype: "elf", bg1: "#0c3547", bg2: "#061a24", skin: "#5ea4b8", hair: "#0284c7", eyes: "#2dd4bf", accent: "#38bdf8", extra: "fins" },
    "elf-pallid":      { archetype: "elf", bg1: "#26283b", bg2: "#11121c", skin: "#f1f5f9", hair: "#cbd5e1", eyes: "#e2e8f0", accent: "#93c5fd", extra: "moon" },
    "astral-elf":      { archetype: "elf", bg1: "#2a1642", bg2: "#0d0617", skin: "#e2c8b5", hair: "#e2e8f0", eyes: "#fef08a", accent: "#f59e0b", extra: "stars" },
    "half-elf":        { archetype: "elf", bg1: "#24213b", bg2: "#12101f", skin: "#e5b899", hair: "#6b3410", eyes: "#34d399", accent: "#e5c158", extra: "circlet" },

    "dwarf-mountain":  { archetype: "dwarf", bg1: "#3b2316", bg2: "#1a0f0a", skin: "#d99b78", hair: "#b45309", eyes: "#f59e0b", accent: "#e5c158", extra: "helm" },
    "dwarf-hill":      { archetype: "dwarf", bg1: "#2e2618", bg2: "#17130b", skin: "#c98b68", hair: "#451a03", eyes: "#fbbf24", accent: "#d97706", extra: "circlet" },
    "dwarf-duergar":   { archetype: "dwarf", bg1: "#2d1a24", bg2: "#140b10", skin: "#645f6e", hair: "#e2e8f0", eyes: "#ef4444", accent: "#f87171", extra: "helm" },

    "halfling-lightfoot": { archetype: "smallfolk", bg1: "#23331d", bg2: "#10170d", skin: "#eab996", hair: "#92400e", eyes: "#4ade80", accent: "#facc15", extra: "leaves" },
    "halfling-stout":     { archetype: "smallfolk", bg1: "#33271a", bg2: "#17120b", skin: "#dfad89", hair: "#78350f", eyes: "#fbbf24", accent: "#f59e0b", extra: "circlet" },
    "halfling-ghostwise": { archetype: "smallfolk", bg1: "#1f2438", bg2: "#0e101a", skin: "#e5bfa1", hair: "#312e81", eyes: "#c084fc", accent: "#818cf8", extra: "moon" },
    "kender":             { archetype: "smallfolk", bg1: "#362618", bg2: "#1a110a", skin: "#e8b896", hair: "#b45309", eyes: "#38bdf8", accent: "#fb923c", extra: "topknot" },

    "gnome":           { archetype: "gnome", bg1: "#291c42", bg2: "#120c1f", skin: "#eab898", hair: "#a855f7", eyes: "#38bdf8", accent: "#facc15", extra: "goggles" },
    "gnome-deep":      { archetype: "gnome", bg1: "#1e222e", bg2: "#0d0f14", skin: "#787587", hair: "#cbd5e1", eyes: "#a78bfa", accent: "#60a5fa", extra: "gem" },
    "autognome":       { archetype: "construct", bg1: "#332514", bg2: "#171008", skin: "#d49a45", hair: "#92400e", eyes: "#38bdf8", accent: "#fbbf24", extra: "goggles" },

    "tiefling":        { archetype: "tiefling", bg1: "#45121b", bg2: "#1c060a", skin: "#b93848", hair: "#1e1b2e", eyes: "#fde047", accent: "#f97316", extra: "fire" },
    "tiefling-winged": { archetype: "tiefling", bg1: "#3b122f", bg2: "#170612", skin: "#8b3d88", hair: "#0f172a", eyes: "#38bdf8", accent: "#ec4899", extra: "wings" },

    "dragonborn":           { archetype: "dragon", bg1: "#421e14", bg2: "#1c0b07", skin: "#b45309", hair: "#78350f", eyes: "#fef08a", accent: "#f59e0b", extra: "fire" },
    "dragonborn-chromatic": { archetype: "dragon", bg1: "#451212", bg2: "#1c0707", skin: "#dc2626", hair: "#7f1d1d", eyes: "#fde047", accent: "#ef4444", extra: "fire" },
    "dragonborn-metallic":  { archetype: "dragon", bg1: "#3b2f14", bg2: "#1a1407", skin: "#eab308", hair: "#a16207", eyes: "#38bdf8", accent: "#fde047", extra: "halo" },
    "dragonborn-gem":       { archetype: "dragon", bg1: "#2e1445", bg2: "#13071f", skin: "#9333ea", hair: "#581c87", eyes: "#67e8f9", accent: "#e879f9", extra: "gem" },
    "kobold":               { archetype: "dragon", bg1: "#3d2214", bg2: "#1a0e08", skin: "#c2410c", hair: "#7c2d12", eyes: "#facc15", accent: "#fb923c", extra: "gem" },
    "lizardfolk":           { archetype: "dragon", bg1: "#133321", bg2: "#07170e", skin: "#15803d", hair: "#166534", eyes: "#facc15", accent: "#4ade80", extra: "fins" },

    "half-orc":  { archetype: "orc", bg1: "#1f3022", bg2: "#0d170f", skin: "#658a66", hair: "#1c1917", eyes: "#fbbf24", accent: "#ef4444", extra: "scar" },
    "orc":       { archetype: "orc", bg1: "#2d1e1b", bg2: "#140d0b", skin: "#577557", hair: "#0f172a", eyes: "#ef4444", accent: "#f97316", extra: "scar" },
    "goblin":    { archetype: "goblin", bg1: "#243018", bg2: "#101709", skin: "#749c3d", hair: "#1e293b", eyes: "#facc15", accent: "#eab308", extra: "earring" },
    "hobgoblin": { archetype: "goblin", bg1: "#421814", bg2: "#1f0a08", skin: "#c2410c", hair: "#0f172a", eyes: "#facc15", accent: "#ef4444", extra: "helm" },
    "bugbear":   { archetype: "goblin", bg1: "#332214", bg2: "#170f08", skin: "#854d27", hair: "#451a03", eyes: "#fbbf24", accent: "#d97706", extra: "fur" },
    "verdan":    { archetype: "goblin", bg1: "#173329", bg2: "#091712", skin: "#34d399", hair: "#065f46", eyes: "#a855f7", accent: "#2dd4bf", extra: "gem" },

    "aasimar":   { archetype: "human", bg1: "#382f18", bg2: "#171308", skin: "#f5dcc8", hair: "#fef08a", eyes: "#ffffff", accent: "#fde047", extra: "halo" },
    "goliath":   { archetype: "goliath", bg1: "#1e2938", bg2: "#0d131a", skin: "#94a3b8", hair: "#334155", eyes: "#38bdf8", accent: "#60a5fa", extra: "tattoos" },
    "firbolg":   { archetype: "fey", bg1: "#163024", bg2: "#091710", skin: "#7c90a0", hair: "#b45309", eyes: "#4ade80", accent: "#34d399", extra: "leaves" },
    "fairy":     { archetype: "fey", bg1: "#3b173d", bg2: "#19081a", skin: "#fbcfe8", hair: "#f472b6", eyes: "#67e8f9", accent: "#e879f9", extra: "wings" },
    "satyr":     { archetype: "tiefling", bg1: "#283318", bg2: "#111709", skin: "#d9a37c", hair: "#78350f", eyes: "#4ade80", accent: "#a3e635", extra: "leaves" },
    "centaur":   { archetype: "human", bg1: "#2e2416", bg2: "#141009", skin: "#c88d68", hair: "#5c2d16", eyes: "#fbbf24", accent: "#84cc16", extra: "leaves" },

    "warforged": { archetype: "construct", bg1: "#292524", bg2: "#0c0a09", skin: "#78716c", hair: "#44403c", eyes: "#38bdf8", accent: "#f59e0b", extra: "rune" },
    "yuan-ti":   { archetype: "serpent", bg1: "#123322", bg2: "#06170e", skin: "#86efac", hair: "#064e3b", eyes: "#facc15", accent: "#10b981", extra: "scales" },
    "harengon":  { archetype: "harengon", bg1: "#2b2538", bg2: "#13101a", skin: "#cbd5e1", hair: "#94a3b8", eyes: "#f59e0b", accent: "#38bdf8", extra: "leaves" },
    "tabaxi":    { archetype: "feline", bg1: "#382614", bg2: "#1a1108", skin: "#eab308", hair: "#92400e", eyes: "#4ade80", accent: "#f59e0b", extra: "spots" },
    "leonin":    { archetype: "feline", bg1: "#3d2712", bg2: "#1c1107", skin: "#d97706", hair: "#78350f", eyes: "#fef08a", accent: "#fbbf24", extra: "mane" },

    "dhampir":   { archetype: "elf", bg1: "#3b0f18", bg2: "#170509", skin: "#e2e8f0", hair: "#0f172a", eyes: "#ef4444", accent: "#e11d48", extra: "fangs" },
    "hexblood":  { archetype: "fey", bg1: "#2e1438", bg2: "#130717", skin: "#c084fc", hair: "#3b0764", eyes: "#fde047", accent: "#a855f7", extra: "crown" },
    "reborn":    { archetype: "human", bg1: "#192b29", bg2: "#0a1211", skin: "#94a3b8", hair: "#1e293b", eyes: "#2dd4bf", accent: "#14b8a6", extra: "stitches" },

    "aarakocra": { archetype: "avian", bg1: "#162e42", bg2: "#09141f", skin: "#f8fafc", hair: "#cbd5e1", eyes: "#facc15", accent: "#38bdf8", extra: "beak_gold" },
    "kenku":     { archetype: "avian", bg1: "#1e1b2e", bg2: "#0c0a14", skin: "#1e293b", hair: "#0f172a", eyes: "#a855f7", accent: "#6366f1", extra: "beak_dark" },
    "owlin":     { archetype: "avian", bg1: "#2b2138", bg2: "#120d17", skin: "#d6b499", hair: "#78350f", eyes: "#fde047", accent: "#c084fc", extra: "owl" },

    "genasi-air":   { archetype: "elemental", bg1: "#163247", bg2: "#081621", skin: "#bae6fd", hair: "#f8fafc", eyes: "#ffffff", accent: "#38bdf8", extra: "wind" },
    "genasi-earth": { archetype: "elemental", bg1: "#2e251a", bg2: "#14100b", skin: "#78716c", hair: "#44403c", eyes: "#fbbf24", accent: "#d97706", extra: "gem" },
    "genasi-fire":  { archetype: "elemental", bg1: "#471612", bg2: "#1f0806", skin: "#dc2626", hair: "#fb923c", eyes: "#fef08a", accent: "#f97316", extra: "fire" },
    "genasi-water": { archetype: "elemental", bg1: "#0e3342", bg2: "#05161f", skin: "#2dd4bf", hair: "#0284c7", eyes: "#67e8f9", accent: "#06b6d4", extra: "fins" },
    "triton":       { archetype: "elemental", bg1: "#0c2e40", bg2: "#05141c", skin: "#38bdf8", hair: "#065f46", eyes: "#2dd4bf", accent: "#eab308", extra: "fins" },

    "githyanki": { archetype: "elf", bg1: "#332b16", bg2: "#171308", skin: "#ca8a04", hair: "#7f1d1d", eyes: "#facc15", accent: "#94a3b8", extra: "tattoos" },
    "githzerai": { archetype: "elf", bg1: "#292338", bg2: "#110e17", skin: "#d4a338", hair: "#334155", eyes: "#c084fc", accent: "#a855f7", extra: "halo" },

    "minotaur":     { archetype: "minotaur", bg1: "#3b1c14", bg2: "#1a0b08", skin: "#7c2d12", hair: "#451a03", eyes: "#ef4444", accent: "#f59e0b", extra: "horns" },
    "loxodon":      { archetype: "loxodon", bg1: "#292833", bg2: "#121117", skin: "#94a3b8", hair: "#64748b", eyes: "#fbbf24", accent: "#e5c158", extra: "tusks" },
    "tortle":       { archetype: "tortle", bg1: "#163322", bg2: "#08170e", skin: "#4d7c0f", hair: "#365314", eyes: "#facc15", accent: "#84cc16", extra: "shell" },
    "shifter":      { archetype: "feline", bg1: "#292118", bg2: "#120e09", skin: "#b48360", hair: "#451a03", eyes: "#f59e0b", accent: "#ea580c", extra: "fangs" },
    "changeling":   { archetype: "changeling", bg1: "#262633", bg2: "#101017", skin: "#f1f5f9", hair: "#e2e8f0", eyes: "#cbd5e1", accent: "#94a3b8", extra: "halo" },
    "kalashtar":    { archetype: "human", bg1: "#271b42", bg2: "#100a1f", skin: "#e5b899", hair: "#1e1b4b", eyes: "#c084fc", accent: "#e879f9", extra: "halo" },
    "simic-hybrid": { archetype: "elemental", bg1: "#0f332f", bg2: "#061715", skin: "#34d399", hair: "#0f766e", eyes: "#fde047", accent: "#2dd4bf", extra: "fins" },
    "vedalken":     { archetype: "human", bg1: "#162942", bg2: "#08121f", skin: "#60a5fa", hair: "#1e3a8a", eyes: "#bae6fd", accent: "#38bdf8", extra: "goggles" },
    "locathah":     { archetype: "tortle", bg1: "#0d3142", bg2: "#05151f", skin: "#fb923c", hair: "#0284c7", eyes: "#fde047", accent: "#38bdf8", extra: "fins" },
    "grung":        { archetype: "tortle", bg1: "#1b3618", bg2: "#0b1709", skin: "#84cc16", hair: "#dc2626", eyes: "#ef4444", accent: "#facc15", extra: "spots" },
    "hadozee":      { archetype: "feline", bg1: "#302418", bg2: "#140f09", skin: "#a16207", hair: "#78350f", eyes: "#38bdf8", accent: "#f59e0b", extra: "wings" },
    "plasmoid":     { archetype: "plasmoid", bg1: "#12383b", bg2: "#06181a", skin: "#22d3ee", hair: "#06b6d4", eyes: "#a855f7", accent: "#67e8f9", extra: "bubbles" },
    "thri-kreen":   { archetype: "insect", bg1: "#382914", bg2: "#171007", skin: "#d97706", hair: "#92400e", eyes: "#4ade80", accent: "#facc15", extra: "mandibles" }
  };

  function buildRaceSvg(raceId) {
    const v = RACE_VISUALS[raceId] || RACE_VISUALS["human-variant"];
    const arch = v.archetype;

    let headLayers = "";

    if (arch === "plasmoid") {
      headLayers = `
        <path d="M26 88 C22 65, 28 32, 50 24 C72 32, 78 65, 74 88 Z" fill="${v.skin}" fill-opacity="0.78" stroke="${v.accent}" stroke-width="2"/>
        <circle cx="50" cy="52" r="10" fill="${v.eyes}" fill-opacity="0.85"/>
        <circle cx="38" cy="40" r="3.5" fill="#fff" fill-opacity="0.7"/>
        <circle cx="62" cy="64" r="4.5" fill="#fff" fill-opacity="0.5"/>
        <circle cx="35" cy="68" r="2.5" fill="${v.accent}"/>
      `;
    } else if (arch === "insect") {
      headLayers = `
        <path d="M24 90 C26 70, 36 66, 50 66 C64 66, 74 70, 76 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M36 26 L24 10 M64 26 L76 10" stroke="${v.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="50,22 70,38 62,64 50,70 38,64 30,38" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.8"/>
        <ellipse cx="40" cy="44" rx="5.5" ry="4" fill="${v.eyes}"/>
        <ellipse cx="60" cy="44" rx="5.5" ry="4" fill="${v.eyes}"/>
        <circle cx="35" cy="36" r="2.2" fill="${v.eyes}"/>
        <circle cx="65" cy="36" r="2.2" fill="${v.eyes}"/>
        <path d="M42 62 L36 72 M58 62 L64 72" stroke="${v.accent}" stroke-width="3" stroke-linecap="round"/>
      `;
    } else if (arch === "dragon") {
      headLayers = `
        <path d="M22 90 C25 70, 35 65, 50 65 C65 65, 75 70, 78 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M35 30 L18 12 L28 38 Z" fill="${v.accent}"/>
        <path d="M65 30 L82 12 L72 38 Z" fill="${v.accent}"/>
        <path d="M50 16 L46 28 L54 28 Z" fill="${v.accent}"/>
        <polygon points="50,24 68,36 64,58 56,70 44,70 36,58 32,36" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <polygon points="38,44 46,46 40,49" fill="${v.eyes}"/>
        <polygon points="62,44 54,46 60,49" fill="${v.eyes}"/>
        <path d="M44 60 L50 63 L56 60" stroke="#111" stroke-width="2" fill="none"/>
      `;
    } else if (arch === "avian") {
      headLayers = `
        <path d="M22 90 C26 70, 36 66, 50 66 C64 66, 74 70, 78 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="50" cy="46" r="20" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="41" cy="43" r="4.5" fill="${v.eyes}"/>
        <circle cx="59" cy="43" r="4.5" fill="${v.eyes}"/>
        <circle cx="41" cy="43" r="2" fill="#111"/>
        <circle cx="59" cy="43" r="2" fill="#111"/>
        <polygon points="45,48 55,48 50,63" fill="${v.extra === 'beak_dark' ? '#334155' : '#f59e0b'}" stroke="#111" stroke-width="1.2"/>
      `;
    } else if (arch === "feline") {
      headLayers = `
        <path d="M22 90 C26 70, 36 66, 50 66 C64 66, 74 70, 78 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        ${v.extra === "mane" ? `<circle cx="50" cy="46" r="26" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>` : ""}
        <polygon points="30,34 26,15 42,26" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <polygon points="70,34 74,15 58,26" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="50" cy="47" rx="18" ry="19" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="42" cy="44" rx="3.8" ry="2.6" fill="${v.eyes}"/>
        <ellipse cx="58" cy="44" rx="3.8" ry="2.6" fill="${v.eyes}"/>
        <polygon points="47,51 53,51 50,55" fill="#1e1b2e"/>
        <path d="M44 58 Q50 62 56 58" stroke="#1e1b2e" stroke-width="1.8" fill="none"/>
      `;
    } else if (arch === "harengon") {
      headLayers = `
        <path d="M24 90 C28 70, 37 66, 50 66 C63 66, 72 70, 76 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="40" cy="20" rx="5" ry="16" transform="rotate(-10 40 20)" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="60" cy="20" rx="5" ry="16" transform="rotate(10 60 20)" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="50" cy="49" r="17" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="43" cy="46" r="3" fill="${v.eyes}"/>
        <circle cx="57" cy="46" r="3" fill="${v.eyes}"/>
        <polygon points="48,52 52,52 50,55" fill="#f472b6"/>
      `;
    } else if (arch === "minotaur") {
      headLayers = `
        <path d="M20 90 C24 68, 35 64, 50 64 C65 64, 76 68, 80 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M32 32 C14 26, 12 12, 24 8 C22 18, 28 24, 36 26 Z" fill="#e5e7eb" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M68 32 C86 26, 88 12, 76 8 C78 18, 72 24, 64 26 Z" fill="#e5e7eb" stroke="${v.accent}" stroke-width="1.5"/>
        <rect x="33" y="26" width="34" height="38" rx="12" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="42" cy="42" r="3" fill="${v.eyes}"/>
        <circle cx="58" cy="42" r="3" fill="${v.eyes}"/>
        <circle cx="50" cy="58" r="5" fill="none" stroke="#fbbf24" stroke-width="2.2"/>
      `;
    } else if (arch === "loxodon") {
      headLayers = `
        <path d="M20 90 C25 68, 36 64, 50 64 C64 64, 75 68, 80 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="24" cy="46" rx="10" ry="16" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="76" cy="46" rx="10" ry="16" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="50" cy="44" r="18" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <rect x="45" y="46" width="10" height="24" rx="5" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M38 56 L30 68 M62 56 L70 68" stroke="#fef3c7" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="41" cy="41" r="2.6" fill="${v.eyes}"/>
        <circle cx="59" cy="41" r="2.6" fill="${v.eyes}"/>
      `;
    } else if (arch === "tortle") {
      headLayers = `
        <path d="M18 90 C20 62, 34 56, 50 56 C66 56, 80 62, 82 90 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="2"/>
        <ellipse cx="50" cy="46" rx="17" ry="15" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <circle cx="42" cy="43" r="3.5" fill="${v.eyes}"/>
        <circle cx="58" cy="43" r="3.5" fill="${v.eyes}"/>
        <path d="M42 53 L50 57 L58 53" stroke="#111" stroke-width="2" fill="none"/>
      `;
    } else if (arch === "construct") {
      headLayers = `
        <path d="M22 90 C25 68, 36 64, 50 64 C64 64, 75 68, 78 90 Z" fill="#334155" stroke="${v.accent}" stroke-width="1.8"/>
        <polygon points="36,24 64,24 68,48 58,64 42,64 32,48" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.8"/>
        <path d="M46 28 L50 35 L54 28" stroke="${v.eyes}" stroke-width="2" fill="none"/>
        <rect x="38" y="41" width="9" height="4" rx="2" fill="${v.eyes}"/>
        <rect x="53" y="41" width="9" height="4" rx="2" fill="${v.eyes}"/>
        <line x1="42" y1="55" x2="58" y2="55" stroke="#1e293b" stroke-width="2.5"/>
      `;
    } else if (arch === "dwarf") {
      headLayers = `
        <path d="M20 90 C24 68, 35 64, 50 64 C65 64, 76 68, 80 90 Z" fill="#334155" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="50" cy="44" rx="18" ry="18" fill="${v.skin}"/>
        <path d="M30 38 C30 22, 70 22, 70 38 Z" fill="#64748b" stroke="${v.accent}" stroke-width="1.8"/>
        <path d="M32 48 C30 68, 40 82, 50 84 C60 82, 70 68, 68 48 Z" fill="${v.hair}" stroke="${v.accent}" stroke-width="1.2"/>
        <circle cx="43" cy="43" r="2.6" fill="${v.eyes}"/>
        <circle cx="57" cy="43" r="2.6" fill="${v.eyes}"/>
      `;
    } else if (arch === "orc" || arch === "goblin") {
      const earLen = arch === "goblin" ? 16 : 9;
      headLayers = `
        <path d="M22 90 C26 68, 36 64, 50 64 C64 64, 74 68, 78 90 Z" fill="#292524" stroke="${v.accent}" stroke-width="1.5"/>
        <polygon points="32,42 ${32 - earLen},34 33,50" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.2"/>
        <polygon points="68,42 ${68 + earLen},34 67,50" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.2"/>
        <ellipse cx="50" cy="45" rx="18" ry="20" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M32 36 C34 20, 66 20, 68 36 Z" fill="${v.hair}"/>
        <circle cx="42" cy="43" r="2.8" fill="${v.eyes}"/>
        <circle cx="58" cy="43" r="2.8" fill="${v.eyes}"/>
        <polygon points="41,58 44,51 46,58" fill="#fef3c7"/>
        <polygon points="59,58 56,51 54,58" fill="#fef3c7"/>
        <line x1="41" y1="58" x2="59" y2="58" stroke="#111" stroke-width="2"/>
      `;
    } else if (arch === "tiefling") {
      headLayers = `
        <path d="M22 90 C26 68, 36 64, 50 64 C64 64, 74 68, 78 90 Z" fill="#1e1b2e" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M36 30 C22 22, 18 10, 28 6 C28 16, 34 22, 42 26 Z" fill="#1e1b2e" stroke="${v.accent}" stroke-width="1.5"/>
        <path d="M64 30 C78 22, 82 10, 72 6 C72 16, 66 22, 58 26 Z" fill="#1e1b2e" stroke="${v.accent}" stroke-width="1.5"/>
        <polygon points="32,43 21,37 33,49" fill="${v.skin}"/>
        <polygon points="68,43 79,37 67,49" fill="${v.skin}"/>
        <ellipse cx="50" cy="45" rx="17" ry="20" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.4"/>
        <path d="M32 38 C35 22, 65 22, 68 38" fill="${v.hair}"/>
        <ellipse cx="43" cy="44" rx="3.2" ry="2.2" fill="${v.eyes}"/>
        <ellipse cx="57" cy="44" rx="3.2" ry="2.2" fill="${v.eyes}"/>
        <path d="M45 56 Q50 59 55 56" stroke="#111" stroke-width="1.6" fill="none"/>
      `;
    } else if (arch === "elf" || arch === "fey") {
      headLayers = `
        <path d="M22 90 C26 68, 36 64, 50 64 C64 64, 74 68, 78 90 Z" fill="#1e293b" stroke="${v.accent}" stroke-width="1.5"/>
        <polygon points="33,44 17,35 34,51" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.2"/>
        <polygon points="67,44 83,35 66,51" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.2"/>
        <ellipse cx="50" cy="45" rx="16.5" ry="20" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.4"/>
        <path d="M32 40 C32 20, 68 20, 68 40 C72 55, 70 72, 65 78 C64 62, 64 46, 64 38 L36 38 C36 46, 36 62, 35 78 C30 72, 28 55, 32 40 Z" fill="${v.hair}"/>
        <ellipse cx="43" cy="44" rx="3" ry="2.1" fill="${v.eyes}"/>
        <ellipse cx="57" cy="44" rx="3" ry="2.1" fill="${v.eyes}"/>
        <path d="M46 56 Q50 58 54 56" stroke="#475569" stroke-width="1.5" fill="none"/>
      `;
    } else {
      // human, goliath, elemental, smallfolk, gnome, changeling, serpent
      headLayers = `
        <path d="M22 90 C26 68, 36 64, 50 64 C64 64, 74 68, 78 90 Z" fill="#1e293b" stroke="${v.accent}" stroke-width="1.5"/>
        <ellipse cx="50" cy="45" rx="17" ry="20" fill="${v.skin}" stroke="${v.accent}" stroke-width="1.4"/>
        <path d="M32 39 C33 21, 67 21, 68 39 C64 31, 36 31, 32 39 Z" fill="${v.hair}"/>
        <circle cx="43" cy="44" r="2.7" fill="${v.eyes}"/>
        <circle cx="57" cy="44" r="2.7" fill="${v.eyes}"/>
        <path d="M45 56 Q50 59 55 56" stroke="#334155" stroke-width="1.6" fill="none"/>
      `;
    }

    let extraLayer = "";
    if (v.extra === "circlet" || v.extra === "crown") {
      extraLayer = `<path d="M34 33 L50 28 L66 33" stroke="${v.accent}" stroke-width="2.2" fill="none"/><circle cx="50" cy="29" r="2.8" fill="${v.eyes}"/>`;
    } else if (v.extra === "halo") {
      extraLayer = `<ellipse cx="50" cy="18" rx="18" ry="4.5" fill="none" stroke="${v.accent}" stroke-width="2.2"/>`;
    } else if (v.extra === "goggles") {
      extraLayer = `<circle cx="42" cy="34" r="5" fill="#38bdf8" fill-opacity="0.5" stroke="${v.accent}" stroke-width="2"/><circle cx="58" cy="34" r="5" fill="#38bdf8" fill-opacity="0.5" stroke="${v.accent}" stroke-width="2"/><line x1="47" y1="34" x2="53" y2="34" stroke="${v.accent}" stroke-width="2"/>`;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="rg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="${v.bg1}"/>
            <stop offset="100%" stop-color="${v.bg2}"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" rx="18" fill="url(#rg)"/>
        <circle cx="50" cy="46" r="34" fill="${v.accent}" fill-opacity="0.1"/>
        ${headLayers}
        ${extraLayer}
        <rect x="3" y="3" width="94" height="94" rx="15" fill="none" stroke="${v.accent}" stroke-width="2" stroke-opacity="0.65"/>
      </svg>
    `;
    return svgToDataUri(svg);
  }

  // Konfiguracja portretów i insygniów dla wszystkich 13 klas
  const CLASS_VISUALS = {
    "artificer": { bg1: "#3b2814", bg2: "#170f07", accent: "#f59e0b", glow: "#38bdf8", symbol: "gear" },
    "barbarian": { bg1: "#471414", bg2: "#1c0606", accent: "#ef4444", glow: "#f97316", symbol: "axe" },
    "bard":      { bg1: "#3b1736", bg2: "#170715", accent: "#f472b6", glow: "#fde047", symbol: "lute" },
    "cleric":    { bg1: "#3d3114", bg2: "#191406", accent: "#fde047", glow: "#ffffff", symbol: "sun" },
    "druid":     { bg1: "#143822", bg2: "#06170c", accent: "#4ade80", glow: "#a3e635", symbol: "antlers" },
    "fighter":   { bg1: "#2b241c", bg2: "#120f0b", accent: "#e5c158", glow: "#94a3b8", symbol: "swords" },
    "monk":      { bg1: "#143042", bg2: "#07131c", accent: "#38bdf8", glow: "#67e8f9", symbol: "lotus" },
    "paladin":   { bg1: "#3b2f12", bg2: "#171205", accent: "#fde047", glow: "#fbbf24", symbol: "shield_sword" },
    "ranger":    { bg1: "#19331e", bg2: "#09140b", accent: "#22c55e", glow: "#86efac", symbol: "bow" },
    "rogue":     { bg1: "#1f1d2e", bg2: "#0b0a12", accent: "#94a3b8", glow: "#f43f5e", symbol: "daggers" },
    "sorcerer":  { bg1: "#421429", bg2: "#1a060f", accent: "#ec4899", glow: "#a855f7", symbol: "flame" },
    "warlock":   { bg1: "#291242", bg2: "#0f051c", accent: "#a855f7", glow: "#c084fc", symbol: "eye" },
    "wizard":    { bg1: "#172347", bg2: "#080d1f", accent: "#60a5fa", glow: "#e5c158", symbol: "staff" }
  };

  function buildClassSvg(classId) {
    const c = CLASS_VISUALS[classId] || CLASS_VISUALS["fighter"];
    let emblem = "";

    switch (c.symbol) {
      case "gear":
        emblem = `
          <circle cx="50" cy="50" r="22" fill="none" stroke="${c.accent}" stroke-width="5" stroke-dasharray="7 5"/>
          <circle cx="50" cy="50" r="12" fill="${c.glow}" fill-opacity="0.3" stroke="${c.glow}" stroke-width="2.5"/>
          <polygon points="50,32 55,46 68,50 55,54 50,68 45,54 32,50 45,46" fill="${c.glow}"/>
        `;
        break;
      case "axe":
        emblem = `
          <line x1="50" y1="18" x2="50" y2="84" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
          <path d="M50 26 C24 16, 18 48, 50 50 Z" fill="#e2e8f0" stroke="${c.accent}" stroke-width="2"/>
          <path d="M50 26 C76 16, 82 48, 50 50 Z" fill="#e2e8f0" stroke="${c.accent}" stroke-width="2"/>
        `;
        break;
      case "lute":
        emblem = `
          <path d="M34 26 C28 48, 36 72, 50 78 C64 72, 72 48, 66 26" fill="none" stroke="${c.accent}" stroke-width="3.5"/>
          <line x1="44" y1="30" x2="44" y2="72" stroke="${c.glow}" stroke-width="1.5"/>
          <line x1="50" y1="28" x2="50" y2="75" stroke="${c.glow}" stroke-width="1.5"/>
          <line x1="56" y1="30" x2="56" y2="72" stroke="${c.glow}" stroke-width="1.5"/>
          <path d="M30 26 L70 26" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
        `;
        break;
      case "sun":
        emblem = `
          <circle cx="50" cy="50" r="16" fill="${c.accent}" stroke="#fff" stroke-width="2"/>
          <path d="M50 16 L50 28 M50 72 L50 84 M16 50 L28 50 M72 50 L84 50 M26 26 L35 35 M65 65 L74 74 M74 26 L65 35 M35 65 L26 74" stroke="${c.accent}" stroke-width="3.5" stroke-linecap="round"/>
        `;
        break;
      case "antlers":
        emblem = `
          <path d="M50 74 C36 62, 24 44, 26 22 M26 38 L16 30 M28 48 L38 38" fill="none" stroke="${c.accent}" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M50 74 C64 62, 76 44, 74 22 M74 38 L84 30 M72 48 L62 38" fill="none" stroke="${c.accent}" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="50" cy="48" r="9" fill="${c.glow}"/>
        `;
        break;
      case "swords":
        emblem = `
          <line x1="24" y1="76" x2="76" y2="24" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>
          <line x1="76" y1="76" x2="24" y2="24" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>
          <polygon points="50,24 68,34 64,62 50,76 36,62 32,34" fill="${c.bg1}" stroke="${c.accent}" stroke-width="3"/>
          <polygon points="50,34 56,50 50,66 44,50" fill="${c.accent}"/>
        `;
        break;
      case "lotus":
        emblem = `
          <circle cx="50" cy="50" r="24" fill="none" stroke="${c.glow}" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M50 22 C60 36, 60 54, 50 68 C40 54, 40 36, 50 22 Z" fill="${c.accent}" fill-opacity="0.85"/>
          <path d="M50 68 C66 60, 74 46, 70 32 C58 38, 52 52, 50 68 Z" fill="${c.glow}" fill-opacity="0.7"/>
          <path d="M50 68 C34 60, 26 46, 30 32 C42 38, 48 52, 50 68 Z" fill="${c.glow}" fill-opacity="0.7"/>
        `;
        break;
      case "shield_sword":
        emblem = `
          <polygon points="50,20 74,30 68,62 50,80 32,62 26,30" fill="#1e293b" stroke="${c.accent}" stroke-width="3"/>
          <line x1="50" y1="12" x2="50" y2="86" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
          <line x1="36" y1="36" x2="64" y2="36" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
          <circle cx="50" cy="36" r="5" fill="${c.glow}"/>
        `;
        break;
      case "bow":
        emblem = `
          <path d="M34 20 C68 32, 68 68, 34 80" fill="none" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
          <line x1="34" y1="20" x2="34" y2="80" stroke="#e2e8f0" stroke-width="1.5"/>
          <line x1="22" y1="50" x2="76" y2="50" stroke="${c.glow}" stroke-width="3" stroke-linecap="round"/>
          <polygon points="78,50 68,44 70,50 68,56" fill="${c.glow}"/>
        `;
        break;
      case "daggers":
        emblem = `
          <path d="M26 24 L50 14 L74 24 L68 58 L50 46 L32 58 Z" fill="#0f172a" stroke="${c.accent}" stroke-width="2"/>
          <line x1="28" y1="78" x2="70" y2="36" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="72" y1="78" x2="30" y2="36" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="43" cy="36" r="2.5" fill="${c.glow}"/>
          <circle cx="57" cy="36" r="2.5" fill="${c.glow}"/>
        `;
        break;
      case "flame":
        emblem = `
          <path d="M50 16 C68 34, 76 52, 64 72 C56 82, 44 82, 36 72 C24 52, 32 34, 50 16 Z" fill="${c.accent}" fill-opacity="0.85"/>
          <path d="M50 34 C60 46, 62 58, 56 68 C52 74, 48 74, 44 68 C38 58, 40 46, 50 34 Z" fill="${c.glow}"/>
        `;
        break;
      case "eye":
        emblem = `
          <polygon points="50,16 80,68 20,68" fill="none" stroke="${c.accent}" stroke-width="2.5"/>
          <path d="M24 50 Q50 30 76 50 Q50 70 24 50 Z" fill="#1e1033" stroke="${c.glow}" stroke-width="2.5"/>
          <circle cx="50" cy="50" r="8" fill="${c.accent}"/>
          <ellipse cx="50" cy="50" rx="2.5" ry="6.5" fill="#090514"/>
        `;
        break;
      default: // wizard staff & hat
        emblem = `
          <polygon points="50,14 68,46 32,46" fill="#1e3a8a" stroke="${c.glow}" stroke-width="2"/>
          <ellipse cx="50" cy="46" rx="26" ry="6" fill="#1e3a8a" stroke="${c.glow}" stroke-width="2"/>
          <circle cx="50" cy="66" r="12" fill="${c.accent}" fill-opacity="0.35" stroke="${c.accent}" stroke-width="2.5"/>
          <polygon points="50,56 53,63 60,66 53,69 50,76 47,69 40,66 47,63" fill="#fff"/>
        `;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="cg" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="${c.bg1}"/>
            <stop offset="100%" stop-color="${c.bg2}"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" rx="18" fill="url(#cg)"/>
        <circle cx="50" cy="50" r="36" fill="${c.glow}" fill-opacity="0.1"/>
        ${emblem}
        <rect x="3" y="3" width="94" height="94" rx="15" fill="none" stroke="${c.accent}" stroke-width="2.2" stroke-opacity="0.75"/>
      </svg>
    `;
    return svgToDataUri(svg);
  }

  window.getRacePortraitUri = function (raceId) {
    if (!cacheRace[raceId]) {
      cacheRace[raceId] = buildRaceSvg(raceId);
    }
    return cacheRace[raceId];
  };

  window.getClassPortraitUri = function (classId) {
    if (!cacheClass[classId]) {
      cacheClass[classId] = buildClassSvg(classId);
    }
    return cacheClass[classId];
  };
})();
