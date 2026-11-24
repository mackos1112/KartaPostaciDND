// ============================================================================
// Kroniki D&D 5e — Główny Silnik Aplikacji (Kreator, Rozwój 1–20, Karta Postaci,
// Księga Zaklęć z podziałem na Kręgi i Klasy, Bestiariusz AideDD, Kompendium Wikidot)
// ----------------------------------------------------------------------------
// ŹRÓDŁA DANYCH (SOURCES):
// - System Reference Document 5.1 (SRD 5.1) — Wizards of the Coast LLC
// - D&D 5e Wikidot Compendium — http://dnd5e.wikidot.com/
// - AideDD D&D 5e Monster Database — https://www.aidedd.org/monster-dnd5/
// - Podręczniki D&D 5e: PHB, DMG, MM, XGE, TCE, FTD, MPMM, VRGR, ERLW, EGW, BGG, BMT
//
// LICENCJE (LICENSES):
// - SRD 5.1: Creative Commons Attribution 4.0 International (CC-BY-4.0)
//   https://creativecommons.org/licenses/by/4.0/legalcode
// - Open Game License v1.0a (OGL 1.0a) — © 2000 Wizards of the Coast, Inc.
// - Wizards of the Coast Fan Content Policy (niekomercyjne narzędzie fanowskie)
// - Kod źródłowy aplikacji oraz proceduralne grafiki SVG: MIT License
// ============================================================================

const App = {
  state: {
    tab: "characters", // characters | builder | sheet | spells | compendium
    lang: "pl_en",     // pl_en | pl | en
    unitSystem: "imperial", // imperial | metric
    theme: "dark",     // dark | light
    rollMode: "normal",// normal | adv | dis
    builderStep: 1,    // 1..6
    characters: [],
    activeCharId: null,
    spellFilters: {
      search: "",
      level: "all",     // all | 0..9
      classId: "all",
      school: "all",
      ritualOnly: false,
      concOnly: false,
      onlyCharSpells: false
    },
    compendiumSubtab: "classes", // classes | races | backgrounds | feats
    compendiumSearch: "",
    raceFilterSearch: "",
    raceFilterCat: "all",
    featFilterSearch: "",
    featFilterCat: "all",
    itemFilterSearch: "",
    itemFilterRarity: "all",
    rolledPool: [],
    selectedPoolIdx: null,
    selectedClassView: "wizard",
    layoutMode: "auto", // auto | mobile | desktop
    mobileFiltersOpen: false,
    mobileSheetSection: "combat", // combat | stats | magic | gear | all
    pageLimits: {
      races: 24,
      feats: 24,
      items: 24,
      spells: 36,
      monsters: 24
    }
  },

  isMobileLayout() {
    if (this.state.layoutMode === "mobile") return true;
    if (this.state.layoutMode === "desktop") return false;
    return typeof window !== "undefined" && window.innerWidth <= 820;
  },

  setLayoutMode(mode) {
    this.state.layoutMode = mode;
    document.documentElement.classList.toggle("force-mobile-ui", mode === "mobile");
    document.documentElement.classList.toggle("force-desktop-ui", mode === "desktop");
    this.saveState();
    this.render();
  },

  openMobileMenuModal() {
    const isLight = this.state.theme === "light";
    const lMode = this.state.layoutMode || "auto";
    this.openModal(
      "☰ Menu i Ustawienia Aplikacji",
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="card" style="background:var(--bg-deep);padding:12px;">
            <div style="font-size:0.78rem;font-weight:700;color:var(--gold);margin-bottom:8px;text-transform:uppercase;">🌍 Język Interfejsu i Opisów</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
              <button class="${this.state.lang==='pl_en'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLangMode('pl_en');App.openMobileMenuModal();">PL + EN</button>
              <button class="${this.state.lang==='pl'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLangMode('pl');App.openMobileMenuModal();">Polski (PL)</button>
              <button class="${this.state.lang==='en'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLangMode('en');App.openMobileMenuModal();">EN (Wikidot)</button>
            </div>
          </div>

          <div class="card" style="background:var(--bg-deep);padding:12px;">
            <div style="font-size:0.78rem;font-weight:700;color:var(--gold);margin-bottom:8px;text-transform:uppercase;">📏 Jednostki Odległości &amp; Motyw</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
              <button class="${this.state.unitSystem==='imperial'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setUnitSystem('imperial');App.openMobileMenuModal();">Stopy (5 ft)</button>
              <button class="${this.state.unitSystem==='metric'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setUnitSystem('metric');App.openMobileMenuModal();">Metry (1,5 m)</button>
              <button class="btn-secondary btn-sm" onclick="App.toggleTheme();App.openMobileMenuModal();">${isLight ? '🌙 Tryb Ciemny' : '☀️ Tryb Jasny'}</button>
            </div>
          </div>

          <div class="card" style="background:var(--bg-deep);padding:12px;">
            <div style="font-size:0.78rem;font-weight:700;color:var(--gold);margin-bottom:8px;text-transform:uppercase;">📱 Układ Kart i Interfejsu (Mobile vs PC)</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
              <button class="${lMode==='auto'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLayoutMode('auto');App.openMobileMenuModal();">⚡ Auto (${this.isMobileLayout() ? 'Mobilny' : 'PC'})</button>
              <button class="${lMode==='mobile'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLayoutMode('mobile');App.openMobileMenuModal();">📱 Kompaktowy Mobilny</button>
              <button class="${lMode==='desktop'?'btn-primary':'btn-ghost'} btn-sm" onclick="App.setLayoutMode('desktop');App.openMobileMenuModal();">🖥️ Pełne Karty PC</button>
            </div>
          </div>

          <div class="card" style="background:var(--bg-deep);padding:12px;">
            <div style="font-size:0.78rem;font-weight:700;color:var(--gold);margin-bottom:8px;text-transform:uppercase;">🛠️ Narzędzia, Synchronizacja i Informacje</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
              <button class="btn-secondary btn-sm" onclick="App.closeModal();App.openSyncModal();">📥 Eksport / Import JSON</button>
              <button class="btn-secondary btn-sm" onclick="App.closeModal();window.print();">🖨️ Drukuj / PDF</button>
              <button class="btn-ghost btn-sm" onclick="App.closeModal();window.DND_TEST_SUITE && window.DND_TEST_SUITE.openTestReportModal();">🧪 Testy i Benchmarki</button>
              <button class="btn-ghost btn-sm" onclick="App.closeModal();App.openSourcesAndLicensesModal();">⚖️ Źródła, RODO i Licencje</button>
            </div>
          </div>

          <button class="btn-primary" onclick="App.closeModal()">Zamknij Menu</button>
        </div>
      `
    );
  },

  // ---------------- INITIALIZATION & STORAGE ----------------
  init() {
    this.normalizeAllData();
    this.loadState();
    this.applyTheme();
    if (this.state.characters.length === 0) {
      this.seedDemoCharacters();
    }
    if (!this.state.activeCharId && this.state.characters.length > 0) {
      this.state.activeCharId = this.state.characters[0].id;
    }
    if (typeof window !== "undefined") {
      let lastIsMob = this.isMobileLayout();
      window.addEventListener("resize", () => {
        const nowMob = this.isMobileLayout();
        if (nowMob !== lastIsMob) {
          lastIsMob = nowMob;
          this.render();
        }
      });
    }
    this.updateStaticUILang();
    this.updateHeaderPill();
    this.render();
  },

  // Ujednolicenie i standaryzacja schematu wszystkich kolekcji danych
  normalizeAllData() {
    (window.DND_RACES || []).forEach(r => {
      r.source = r.source || "PHB";
      r.category = r.category || "Core";
      r.wikidot_url = r.wikidot_url || `http://dnd5e.wikidot.com/lineage:${r.id}`;
      r.detailed_traits = r.detailed_traits || (r.traits_pl || []).map((t, idx) => ({
        name_pl: t.split(":")[0] || `Cecha ${idx + 1}`,
        name_en: ((r.traits_en && r.traits_en[idx]) || t).split(":")[0],
        desc_pl: t,
        desc_en: (r.traits_en && r.traits_en[idx]) || t
      }));
    });
    (window.DND_FEATS || []).forEach(f => {
      f.source = f.source || "PHB";
      f.category = f.category || f.source;
      f.wikidot_url = f.wikidot_url || `http://dnd5e.wikidot.com/feat:${f.id}`;
    });
    (window.DND_MAGIC_ITEMS || []).forEach(it => {
      it.category = it.category || "Wondrous Item";
      it.rarity = it.rarity || "Rare";
      it.wikidot_url = it.wikidot_url || `http://dnd5e.wikidot.com/wondrous-items:${it.id}`;
    });
    (window.DND_MONSTERS || []).forEach(m => {
      m.type_en = m.type_en || "Monstrosity";
      m.type_pl = m.type_pl || m.type_en;
      m.cr_num = typeof m.cr_num === "number" ? m.cr_num : (parseFloat(m.cr) || 0);
      m.aidedd_url = `https://www.aidedd.org/dnd/monstres.php?vo=${encodeURIComponent(m.aidedd_slug || m.id)}`;
    });
  },

  setPageLimit(listKey, newLimit) {
    this.state.pageLimits = this.state.pageLimits || { races: 24, feats: 24, items: 24, spells: 36, monsters: 24 };
    this.state.pageLimits[listKey] = newLimit;
    this.render();
  },

  renderPaginationBar(listKey, totalCount, shownCount, step = 24) {
    if (totalCount <= step && shownCount >= totalCount) return "";
    return `
      <div class="std-pagination-bar no-print">
        <div style="font-size:0.84rem;color:var(--text-main);">
          📊 Ustandaryzowany widok listy: wyświetlono <strong style="color:var(--gold-bright);">${shownCount}</strong> z <strong>${totalCount}</strong> pozycji
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${shownCount < totalCount ? `
            <button class="btn-secondary btn-sm" onclick="App.setPageLimit('${listKey}', ${shownCount + step})">
              ➕ Pokaż kolejne ${Math.min(step, totalCount - shownCount)}
            </button>
            <button class="btn-primary btn-sm" onclick="App.setPageLimit('${listKey}', 9999)">
              📚 Pokaż wszystkie (${totalCount})
            </button>
          ` : `
            <button class="btn-ghost btn-sm" onclick="App.setPageLimit('${listKey}', ${step})">
              🔼 Zwiń listę do pierwszych ${step}
            </button>
          `}
        </div>
      </div>
    `;
  },

  ui(pl, en) {
    return this.state.lang === "en" ? en : pl;
  },

  applyTheme() {
    const isLight = this.state.theme === "light";
    document.documentElement.classList.toggle("light", isLight);
    document.documentElement.classList.toggle("dark", !isLight);
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      const isEn = this.state.lang === "en";
      btn.textContent = isLight
        ? (isEn ? "🌙 Dark" : "🌙 Ciemny")
        : (isEn ? "☀️ Light" : "☀️ Jasny");
    }
  },

  toggleTheme() {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    this.applyTheme();
    this.saveState();
    this.toast(this.state.theme === "light"
      ? this.ui("☀️ Włączono Tryb Jasny (Królewski Pergamin)", "☀️ Switched to Light Mode (Royal Parchment)")
      : this.ui("🌙 Włączono Tryb Ciemny (Mroczne Kroniki)", "🌙 Switched to Dark Mode (Arcane Dark)")
    );
  },

  getRacePortrait(raceId) {
    return window.getRacePortraitUri ? window.getRacePortraitUri(raceId) : "";
  },

  getClassPortrait(classId) {
    return window.getClassPortraitUri ? window.getClassPortraitUri(classId) : "";
  },

  renderCharacterPortrait(char, size = 56) {
    const mode = char.portraitMode || "race"; // race | class | custom | emoji
    const raceUri = this.getRacePortrait(char.raceId);
    const clsUri = this.getClassPortrait(char.classId);
    const cls = this.getClassData(char.classId);

    if (mode === "emoji") {
      return `
        <div style="font-size:${Math.round(size * 0.55)}px;background:var(--bg-deep);width:${size}px;height:${size}px;border-radius:12px;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--border-gold);flex-shrink:0;">
          ${char.avatar || cls.icon}
        </div>
      `;
    }

    const mainSrc = (mode === "custom" && char.customPortraitUrl)
      ? char.customPortraitUrl
      : (mode === "class" ? clsUri : raceUri);
    const badgeSrc = mode === "class" ? raceUri : clsUri;
    const badgeSize = Math.max(20, Math.round(size * 0.42));

    return `
      <div class="portrait-badge-wrap" style="width:${size}px;height:${size}px;">
        <img src="${mainSrc}" alt="${char.name}" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.22)}px;object-fit:cover;border:1.5px solid var(--gold);box-shadow:var(--shadow-gold);background:var(--bg-deep);">
        <img src="${badgeSrc}" alt="Crest" class="portrait-sub-crest" style="width:${badgeSize}px;height:${badgeSize}px;">
      </div>
    `;
  },

  uploadCustomPortrait(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const char = this.getActiveChar();
    if (!char) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      char.customPortraitUrl = e.target.result;
      char.portraitMode = "custom";
      this.saveState();
      this.render();
      this.toast("🖼️ Wgrano własny portret bohatera!");
    };
    reader.readAsDataURL(file);
  },

  renderDetailedRaceCard(r, isSelected = false, selectable = false, fullExpanded = false) {
    const isEn = this.state.lang === "en";
    const isMobCompact = this.isMobileLayout() && !fullExpanded;
    const isXL = Boolean(fullExpanded || (!isMobCompact && this.state.raceForceXL));
    const cType = isEn ? (r.creature_type_en || "Humanoid") : (r.creature_type_pl || "Humanoid");
    const ageStr = isEn ? (r.age_en || "Standard lifespan (~80–100 years)") : (r.age_pl || "Standardowa długość życia (ok. 80–100 lat)");
    const heightStr = isEn ? (r.height_en || r.size) : (r.height_pl || r.size);
    const langStr = isEn ? (r.languages_en || "Common + 1 language") : (r.languages_pl || "Wspólny + 1 język");
    const spdExtra = r.special_speeds_pl ? ` • ${r.special_speeds_pl}` : "";
    const loreText = isEn ? (r.lore_en || "") : (r.lore_pl || "");
    const dTraits = r.detailed_traits || [];
    const primaryTraits = isXL ? dTraits : dTraits.slice(0, 2);
    const extraTraits = isXL ? [] : dTraits.slice(2);
    const hasSubTable = Boolean(r.suboptions_table && r.suboptions_table.length > 0);

    if (isMobCompact) {
      return `
        <div class="card mobile-compact-card ${isSelected ? 'selected' : ''}" ${selectable ? `onclick="App.setCharRace('${r.id}')" style="cursor:pointer;"` : ''}>
          <div style="display:flex;align-items:center;gap:11px;">
            <img src="${this.getRacePortrait(r.id)}" alt="${r.name_pl}" class="portrait-thumb" style="width:48px;height:48px;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                <div class="card-title" style="font-size:0.98rem;">${this.t(r.name_pl, r.name_en)}</div>
                <span class="badge ${isSelected ? 'badge-emerald' : 'badge-gold'}" style="font-size:0.7rem;padding:2px 8px;">${isSelected ? '✓ Wybrana' : r.source}</span>
              </div>
              <div style="font-size:0.74rem;color:var(--text-muted);margin-top:2px;">
                🧬 ${cType} • 📏 ${r.size} • 🏃 ${r.speed} ft${r.darkvision ? ` • 👁️ ${r.darkvision} ft` : ''}
              </div>
            </div>
          </div>
          <div class="badge-row" style="margin:6px 0;">
            <span class="badge badge-arcane">⚡ ${r.asi_desc_pl}</span>
            ${dTraits.slice(0, 4).map(dt => `<span class="badge">✨ ${this.tPlain(dt.name_pl, dt.name_en)}</span>`).join("")}
            ${dTraits.length > 4 ? `<span class="badge badge-gold">+${dTraits.length - 4} więcej</span>` : ''}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--border-subtle);padding-top:8px;">
            <button class="btn-secondary btn-sm" style="flex:1;" onclick="event.stopPropagation(); App.openRaceDetailModal('${r.id}')">
              📖 Pełny Opis &amp; Cechy (${dTraits.length})
            </button>
            ${selectable ? `
              <button class="${isSelected ? 'btn-secondary' : 'btn-primary'} btn-sm" style="flex:1;" onclick="event.stopPropagation(); App.setCharRace('${r.id}')">
                ${isSelected ? '✓ Wybrana Rasa' : '✨ Wybierz Rasę'}
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }

    return `
      <div class="card race-card-2x2 ${isXL ? 'race-card-xl' : ''} ${isSelected ? 'selected' : ''}" ${selectable ? `onclick="App.setCharRace('${r.id}')" style="cursor:pointer;"` : ''}>
        <div class="card-header" style="margin-bottom:4px;align-items:center;">
          <div style="display:flex;align-items:center;gap:14px;">
            <img src="${this.getRacePortrait(r.id)}" alt="${r.name_pl}" class="portrait-lg" style="width:72px;height:72px;">
            <div>
              <div class="card-title" style="font-size:1.18rem;">${this.t(r.name_pl, r.name_en)}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;">
                📚 <strong>${r.source}</strong> • Kategoria: ${r.category || 'Core'} •
                <a href="${r.wikidot_url}" target="_blank" onclick="event.stopPropagation()" style="color:var(--gold);font-weight:600;">Wikidot ↗</a>
              </div>
              <div class="badge-row" style="margin:6px 0 0;">
                <span class="badge badge-arcane">⚡ ASI: ${r.asi_desc_pl}</span>
                ${r.extra_hp_per_level ? `<span class="badge badge-emerald">❤️ +${r.extra_hp_per_level} PW/Poz.</span>` : ''}
                ${r.ac_bonus ? `<span class="badge badge-gold">🛡️ +${r.ac_bonus} KP</span>` : ''}
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
              <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openRaceDetailModal('${r.id}')" title="Otwórz dedykowaną podstronę rasy z pełnym opisem">
                📖 Podstrona
              </button>
              ${selectable ? `
                <span class="badge ${isSelected ? 'badge-emerald' : 'badge-gold'}" style="font-size:0.8rem;padding:5px 11px;">
                  ${isSelected ? '✓ Wybrana' : 'Wybierz'}
                </span>
              ` : `<span class="badge badge-gold">${r.size}</span>`}
            </div>
          </div>
        </div>

        <!-- Standardized 6-Box Anatomical & Mechanical Vitals Strip -->
        <div class="race-vitals-grid">
          <div class="race-vital-item">
            <span class="race-vital-lbl">🧬 Typ Istoty</span>
            <span class="race-vital-val" style="color:${cType.includes('Humanoid') ? 'var(--gold-bright)' : 'var(--arcane-bright)'};">${cType}</span>
          </div>
          <div class="race-vital-item">
            <span class="race-vital-lbl">📏 Rozmiar i Budowa</span>
            <span class="race-vital-val">${heightStr}</span>
          </div>
          <div class="race-vital-item">
            <span class="race-vital-lbl">🏃 Szybkość i Ruch</span>
            <span class="race-vital-val">${r.speed} ft${spdExtra}</span>
          </div>
          <div class="race-vital-item">
            <span class="race-vital-lbl">👁️ Zmysły / Darkvision</span>
            <span class="race-vital-val" style="color:${r.darkvision >= 120 ? 'var(--cyan)' : 'var(--gold-bright)'};">${r.darkvision ? `Darkvision ${r.darkvision} ft` : 'Standardowy'}</span>
          </div>
          <div class="race-vital-item">
            <span class="race-vital-lbl">⏳ Wiek</span>
            <span class="race-vital-val" style="font-weight:500;color:var(--text-main);font-size:0.77rem;">${ageStr}</span>
          </div>
          <div class="race-vital-item">
            <span class="race-vital-lbl">🗣️ Języki</span>
            <span class="race-vital-val" style="font-weight:600;color:var(--text-main);font-size:0.78rem;">${langStr}</span>
          </div>
        </div>

        ${loreText ? `
          <div class="race-lore-box">
            <strong>📖 Charakterystyka:</strong> ${loreText}
          </div>
        ` : ''}

        <!-- Standardized Racial Traits (Core visible + Accordion for extra traits/tables) -->
        <div>
          <div style="font-family:var(--font-display);font-size:0.88rem;font-weight:700;color:var(--gold);margin-bottom:6px;">
            ⚔️ Zdolności i Mechanika Rasowa (${dTraits.length}):
          </div>
          <div class="race-traits-grid">
            ${primaryTraits.map(dt => `
              <div class="race-trait-box">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="color:var(--gold-bright);font-size:0.9rem;">⚡ ${this.t(dt.name_pl, dt.name_en)}</strong>
                  ${dt.tag_pl ? `<span class="badge badge-arcane" style="font-size:0.68rem;">${dt.tag_pl}</span>` : ''}
                </div>
                <div style="font-size:0.82rem;color:var(--text-main);line-height:1.52;">
                  ${this.tDesc(dt)}
                </div>
              </div>
            `).join("")}
          </div>

          ${(!isXL && (extraTraits.length > 0 || hasSubTable)) ? `
            <details class="std-accordion" onclick="event.stopPropagation()">
              <summary>
                <span>📜 Dodatkowe cechy rasowe (${extraTraits.length})${hasSubTable ? ` + Tabela: ${r.suboptions_title_pl || 'Warianty'}` : ''}</span>
              </summary>
              <div class="std-accordion-body">
                ${extraTraits.map(dt => `
                  <div class="race-trait-box">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <strong style="color:var(--gold-bright);font-size:0.88rem;">⚡ ${this.t(dt.name_pl, dt.name_en)}</strong>
                      ${dt.tag_pl ? `<span class="badge badge-arcane" style="font-size:0.68rem;">${dt.tag_pl}</span>` : ''}
                    </div>
                    <div style="font-size:0.81rem;color:var(--text-main);line-height:1.5;">
                      ${this.tDesc(dt)}
                    </div>
                  </div>
                `).join("")}
                ${hasSubTable ? `
                  <div class="wikidot-table-wrap" style="margin:4px 0 0;">
                    <table class="wikidot-table">
                      <thead>
                        <tr>
                          ${(r.suboptions_headers_pl || ["Wariant", "Cecha / Żywioł", "Działanie Mechaniczne"]).map(h => `<th>${h}</th>`).join("")}
                        </tr>
                      </thead>
                      <tbody>
                        ${r.suboptions_table.map(row => `
                          <tr>
                            ${row.map((cell, cIdx) => `<td style="${cIdx === 0 ? 'font-weight:700;color:var(--gold-bright);white-space:nowrap;' : ''}">${cell}</td>`).join("")}
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>
                ` : ''}
              </div>
            </details>
          ` : ''}

          ${(isXL && hasSubTable) ? `
            <div style="margin-top:8px;">
              <div style="font-family:var(--font-display);font-size:0.88rem;font-weight:700;color:var(--arcane-bright);margin-bottom:6px;">
                📊 ${r.suboptions_title_pl || 'Warianty i Podtypy Rasowe'}:
              </div>
              <div class="wikidot-table-wrap" style="margin:0;">
                <table class="wikidot-table">
                  <thead>
                    <tr>
                      ${(r.suboptions_headers_pl || ["Wariant", "Cecha / Żywioł", "Działanie Mechaniczne"]).map(h => `<th>${h}</th>`).join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${r.suboptions_table.map(row => `
                      <tr>
                        ${row.map((cell, cIdx) => `<td style="${cIdx === 0 ? 'font-weight:700;color:var(--gold-bright);white-space:nowrap;' : ''}">${cell}</td>`).join("")}
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  updateStaticUILang() {
    const isEn = this.state.lang === "en";
    const setTxt = (id, pl, en) => {
      const el = document.getElementById(id);
      if (el) el.textContent = isEn ? en : pl;
    };
    setTxt("brand-main-title", "KRONIKI D&D 5E", "D&D 5E CHRONICLES");
    setTxt("header-subtitle", "Kompendium & Karta Postaci (Wikidot 5e)", "Character Builder, Sheet & Spellbook (Wikidot 5e)");
    setTxt("top-dice-btn-label", "🎲 k20", "🎲 d20");
    setTxt("nav-lbl-characters", "Bohaterowie", "Characters");
    setTxt("nav-lbl-builder", "Kreator & Rozwój", "Builder & Level Up");
    setTxt("nav-lbl-sheet", "Karta Postaci", "Character Sheet");
    setTxt("nav-lbl-spells", "Księga Zaklęć", "Spellbook");
    setTxt("nav-lbl-bestiary", "Bestiariusz", "Bestiary");
    setTxt("nav-lbl-compendium", "Wikidot 5e", "Wikidot 5e");
    setTxt("dice-drawer-title", "🎲 Komnata Kości", "🎲 Dice Tray");
    setTxt("roll-mode-norm", "Normalny", "Normal");
    setTxt("roll-mode-adv", "Ułatwienie (Adv)", "Advantage (Adv)");
    setTxt("roll-mode-dis", "Utrudnienie (Dis)", "Disadvantage (Dis)");
    setTxt("dice-mod-label", "Modyfikator do przycisków k4–k20:", "Modifier for d4–d20 buttons:");
    setTxt("dice-roll-btn", "Rzuć", "Roll");
    setTxt("dice-clear-btn", "Wyczyść", "Clear");
    document.querySelectorAll(".die-lbl").forEach(el => {
      const s = el.dataset.sides;
      el.textContent = isEn ? `d${s}` : `k${s}`;
    });
    this.applyTheme();
  },

  loadState() {
    try {
      const savedChars = localStorage.getItem("dnd5e_characters_v1");
      if (savedChars) {
        this.state.characters = JSON.parse(savedChars);
      }
      const savedActive = localStorage.getItem("dnd5e_active_char_v1");
      if (savedActive) {
        this.state.activeCharId = savedActive;
      }
      const savedLang = localStorage.getItem("dnd5e_lang_v1");
      if (savedLang) {
        this.state.lang = savedLang;
        document.querySelectorAll(".lang-btn:not(.unit-btn)").forEach(b => {
          b.classList.toggle("active", b.dataset.lang === savedLang);
        });
      }
      const savedUnit = localStorage.getItem("dnd5e_unit_v1");
      if (savedUnit) {
        this.state.unitSystem = savedUnit;
        document.querySelectorAll(".unit-btn").forEach(b => {
          b.classList.toggle("active", b.dataset.unit === savedUnit);
        });
      }
      const savedTheme = localStorage.getItem("dnd5e_theme_v1");
      if (savedTheme) {
        this.state.theme = savedTheme;
      }
      const customSpells = localStorage.getItem("dnd5e_custom_spells_v1");
      if (customSpells) {
        const parsed = JSON.parse(customSpells);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(window.DND_SPELLS.map(s => s.id));
          parsed.forEach(sp => {
            if (!existingIds.has(sp.id)) window.DND_SPELLS.push(sp);
          });
        }
      }
    } catch (e) {
      console.error("Błąd odczytu stanu:", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem("dnd5e_characters_v1", JSON.stringify(this.state.characters));
      if (this.state.activeCharId) {
        localStorage.setItem("dnd5e_active_char_v1", this.state.activeCharId);
      }
      localStorage.setItem("dnd5e_lang_v1", this.state.lang);
      localStorage.setItem("dnd5e_unit_v1", this.state.unitSystem);
      localStorage.setItem("dnd5e_theme_v1", this.state.theme);
      this.updateHeaderPill();
    } catch (e) {
      console.error("Błąd zapisu stanu:", e);
    }
  },

  seedDemoCharacters() {
    const demo1 = {
      id: "char-demo-1",
      name: "Vaelen Gwiazdozrodzony",
      avatar: "🧙‍♂️",
      raceId: "elf-high",
      classId: "wizard",
      subclassId: "bladesinging",
      backgroundId: "sage",
      level: 5,
      alignment: "Neutralny Dobry (NG)",
      xp: 6500,
      abilities: { STR: 8, DEX: 16, CON: 14, INT: 18, WIS: 12, CHA: 10 },
      hpMax: 32,
      hpCurrent: 32,
      hpTemp: 0,
      armorType: "mage_armor", // none | light | medium | heavy | mage_armor | unarmored
      shieldEquipped: false,
      acManualBonus: 0,
      inspiration: true,
      skillProficiencies: ["Arcana", "History", "Perception", "Investigation", "Acrobatics"],
      skillExpertises: ["Arcana"],
      feats: ["war-caster"],
      conditions: [],
      knownSpells: ["fire-bolt", "booming-blade", "mage-hand", "minor-illusion", "shield", "silvery-barbs", "absorb-elements", "magic-missile", "mage-armor", "find-familiar", "misty-step", "shadow-blade", "mirror-image", "vortex-warp", "fireball", "counterspell", "hypnotic-pattern", "haste"],
      preparedSpells: ["fire-bolt", "booming-blade", "mage-hand", "minor-illusion", "shield", "silvery-barbs", "absorb-elements", "mage-armor", "misty-step", "shadow-blade", "fireball", "counterspell", "hypnotic-pattern"],
      usedSlots: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      hitDiceUsed: 0,
      inventory: ["Rapier Pieśni Ostrza (1k8+3 kłute)", "Księga Zaklęć w oprawie ze smoczej skóry", "Fokus arkaniczny (kula)", "Mikstura Leczenia (2k4+2) x2", "Sakiewka (145 sz)"],
      notes: "Pieśń Ostrza (Bladesong): +4 do KP (łącznie 19 KP z Zbroją Maga, 24 KP z Tarczą!), +4 do testów Koncentracji, +10 stóp szybkości ruchu. Chowaniec: Sowa 'Nyx'."
    };

    const demo2 = {
      id: "char-demo-2",
      name: "Kaelen Żelazna Przysięga",
      avatar: "🛡️",
      raceId: "aasimar",
      classId: "paladin",
      subclassId: "vengeance",
      backgroundId: "soldier",
      level: 6,
      alignment: "Praworządny Neutralny (LN)",
      xp: 14000,
      abilities: { STR: 18, DEX: 10, CON: 14, INT: 8, WIS: 12, CHA: 16 },
      hpMax: 52,
      hpCurrent: 52,
      hpTemp: 0,
      armorType: "heavy",
      shieldEquipped: true,
      acManualBonus: 0,
      inspiration: false,
      skillProficiencies: ["Athletics", "Intimidation", "Persuasion", "Insight"],
      skillExpertises: [],
      feats: ["sentinel"],
      conditions: [],
      knownSpells: ["light", "bless", "cure-wounds", "shield-of-faith", "command", "wrathful-smite", "misty-step", "hold-person", "find-steed", "aid"],
      preparedSpells: ["bless", "cure-wounds", "shield-of-faith", "command", "wrathful-smite", "misty-step", "hold-person", "find-steed", "aid"],
      usedSlots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      hitDiceUsed: 0,
      inventory: ["Długi Miecz +1 (1k8+5 cięte)", "Zbroja Płytowa (KP 18)", "Ciężka Tarcza ze Świętym Symbolem (+2 KP)", "5x Oszczep (Javelin)", "Sakiewka (210 sz)"],
      notes: "Aura Ochrony (6 poz.): Ja i wszyscy sojusznicy w promieniu 10 stóp mamy +3 do WSZYSTKICH rzutów obronnych! Nakładanie Rąk: 30 PW."
    };

    this.state.characters = [demo1, demo2];
    this.state.activeCharId = demo1.id;
    this.saveState();
  },

  // ---------------- HELPERS & TRANSLATION FORMATTERS ----------------
  cleanPolishLabel(pl, en) {
    if (!pl) return en || "";
    if (!en) return pl;
    const esc = String(en).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const stripped = String(pl).replace(new RegExp(`\\s*\\(${esc}\\)\\s*$`, "i"), "").trim();
    return stripped || pl;
  },

  t(pl, en) {
    const cPl = this.cleanPolishLabel(pl, en);
    if (this.state.lang === "pl") return cPl || en;
    if (this.state.lang === "en") return en || cPl;
    if (!en || cPl.toLowerCase() === String(en).toLowerCase()) return cPl;
    return `${cPl} <span class="card-en-sub" style="display:inline;opacity:0.75;">(${en})</span>`;
  },

  tPlain(pl, en) {
    const cPl = this.cleanPolishLabel(pl, en);
    if (this.state.lang === "pl") return cPl || en;
    if (this.state.lang === "en") return en || cPl;
    if (!en || cPl.toLowerCase() === String(en).toLowerCase()) return cPl;
    return `${cPl} (${en})`;
  },

  tDesc(obj) {
    if (!obj) return "";
    if (this.state.lang === "en") return obj.desc_en || obj.desc_pl || "";
    if (this.state.lang === "pl") return obj.desc_pl || obj.desc_en || "";
    if (obj.desc_pl && obj.desc_en && obj.desc_pl !== obj.desc_en) {
      return `<div>${obj.desc_pl}</div><div style="margin-top:6px;font-size:0.8rem;color:var(--text-muted);border-left:2px solid var(--border-subtle);padding-left:8px;"><em>EN (Wikidot):</em> ${obj.desc_en}</div>`;
    }
    return obj.desc_pl || obj.desc_en || "";
  },

  getActiveChar() {
    const c = this.state.characters.find(c => c.id === this.state.activeCharId) || this.state.characters[0] || null;
    if (c && !c.weapons) {
      if (c.classId === "wizard" || c.subclassId === "bladesinging") {
        c.weapons = [
          { name: "Rapier Pieśni Ostrza", ability: "finesse", prof: true, magicBonus: 0, dice: "1d8", extraDice: "", dmgType: "Kłute (Piercing)", range: "5 ft" },
          { name: "Ostrze Cienia (Shadow Blade)", ability: "finesse", prof: true, magicBonus: 0, dice: "2d8", extraDice: "", dmgType: "Psychiczne (Psychic)", range: "5 ft (rzut 20/60 ft)" }
        ];
      } else {
        c.weapons = [
          { name: "Długi Miecz +1", ability: "STR", prof: true, magicBonus: 1, dice: "1d8", extraDice: "", dmgType: "Cięte (Slashing)", range: "5 ft" },
          { name: "Oszczep (Javelin)", ability: "STR", prof: true, magicBonus: 0, dice: "1d6", extraDice: "", dmgType: "Kłute (Piercing)", range: "30/120 ft" }
        ];
      }
    }
    return c;
  },

  calcWeaponStats(char, wp) {
    const strMod = this.getMod(this.getEffectiveAbilityScore(char, "STR"));
    const dexMod = this.getMod(this.getEffectiveAbilityScore(char, "DEX"));
    const intMod = this.getMod(this.getEffectiveAbilityScore(char, "INT"));
    const wisMod = this.getMod(this.getEffectiveAbilityScore(char, "WIS"));
    const chaMod = this.getMod(this.getEffectiveAbilityScore(char, "CHA"));
    const pb = this.getProfBonus(char.level) + this.getMagicItemBonuses(char).pb;

    let abMod = strMod;
    let usedAb = "STR";
    if (wp.ability === "finesse") {
      if (dexMod >= strMod) { abMod = dexMod; usedAb = "DEX"; }
      else { abMod = strMod; usedAb = "STR"; }
    } else if (wp.ability === "DEX") { abMod = dexMod; usedAb = "DEX"; }
    else if (wp.ability === "INT") { abMod = intMod; usedAb = "INT"; }
    else if (wp.ability === "WIS") { abMod = wisMod; usedAb = "WIS"; }
    else if (wp.ability === "CHA") { abMod = chaMod; usedAb = "CHA"; }

    // Automatyczne uwzględnienie Hexblade (CHA) oraz Battle Smith / Armorer (INT)
    if (char.subclassId === "hexblade" && chaMod > abMod) {
      abMod = chaMod;
      usedAb = "CHA";
    } else if ((char.subclassId === "battle-smith" || char.subclassId === "armorer") && intMod > abMod) {
      abMod = intMod;
      usedAb = "INT";
    }

    const magic = Number(wp.magicBonus) || 0;
    const toHit = abMod + (wp.prof !== false ? pb : 0) + magic;

    // Bonus z Szału Barbarzyńcy (Rage)
    let rageBonus = 0;
    if ((char.conditions || []).includes("raging") && (usedAb === "STR" || wp.ability === "STR")) {
      rageBonus = char.level >= 16 ? 4 : (char.level >= 9 ? 3 : 2);
    }

    // Ulepszone Boskie Ugodzenie Paladyna na 11+ poziomie (+1k8 światłości do każdego ataku)
    const paladinImpSmite = (char.classId === "paladin" && char.level >= 11) ? "+1d8" : "";

    const totalDmgMod = abMod + magic + rageBonus;
    const modSign = totalDmgMod >= 0 ? `+${totalDmgMod}` : `${totalDmgMod}`;
    const extraPart = wp.extraDice ? `+${wp.extraDice.replace(/^\+/, "")}` : "";
    const dmgFormula = `${wp.dice}${extraPart}${paladinImpSmite}${totalDmgMod !== 0 ? modSign : ""}`;

    return { toHit, totalDmgMod, dmgFormula, usedAb, rageBonus };
  },

  rollWeaponAttack(wpIdx) {
    const char = this.getActiveChar();
    if (!char || !char.weapons || !char.weapons[wpIdx]) return;
    const wp = char.weapons[wpIdx];
    const st = this.calcWeaponStats(char, wp);
    this.rollDie(20, st.toHit, `Atak: ${wp.name} (${st.usedAb})`, "attack");
  },

  rollWeaponDamage(wpIdx, isCrit = false) {
    const char = this.getActiveChar();
    if (!char || !char.weapons || !char.weapons[wpIdx]) return;
    const wp = char.weapons[wpIdx];
    const st = this.calcWeaponStats(char, wp);
    let formula = st.dmgFormula;
    if (isCrit) {
      // Podwojenie kości przy trafieniu krytycznym
      formula = formula.replace(/(\d*)([dk]\d+)/gi, (_, cnt, die) => `${(cnt ? parseInt(cnt, 10) : 1) * 2}${die}`);
    }
    this.rollCustomFormula(formula, `${isCrit ? '💥 KRYTYK — ' : ''}Obrażenia: ${wp.name} (${wp.dmgType})`);
  },

  openAddWeaponModal(editIdx = null) {
    const char = this.getActiveChar();
    const existing = (editIdx !== null && char && char.weapons && char.weapons[editIdx]) ? char.weapons[editIdx] : null;
    const wp = existing || {
      name: "Długi Miecz",
      ability: "finesse",
      magicBonus: 0,
      dice: "1d8",
      extraDice: "",
      dmgType: "Cięte (Slashing)",
      range: "5 ft",
      prof: true,
      notes: ""
    };

    this.openModal(
      existing ? `⚒️ Edytuj Broń / Atak: ${wp.name}` : "⚒️ Kreator Broni i Ataków (Weapon Forge)",
      `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <label style="font-size:0.8rem;color:var(--gold);display:block;margin-bottom:4px;">Wybierz gotowy szablon broni z podręcznika D&D 5e (lub stwórz własną poniżej):</label>
            <select id="wp-preset-select" onchange="App.applyWeaponPreset(this.value)" style="width:100%;">
              <option value="">— Wybierz broń bazową z listy D&D 5e —</option>
              ${(window.DND_WEAPONS_PRESETS || []).map(p => `
                <option value="${p.id}">${p.name_pl} (${p.name_en}) — ${p.dice} ${p.dmgType_pl} [${p.props_pl}]</option>
              `).join("")}
            </select>
          </div>

          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Nazwa Broni / Ataku</label>
              <input type="text" id="wp-name" placeholder="np. Długi Miecz +1 lub Płomienny Język" value="${wp.name}" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Cecha Ataku i Obrażeń</label>
              <select id="wp-ability" style="width:100%;">
                <option value="finesse" ${wp.ability==='finesse'?'selected':''}>Finezyjna (lepsze SIŁ/ZRĘ)</option>
                <option value="STR" ${wp.ability==='STR'?'selected':''}>Siła (STR)</option>
                <option value="DEX" ${wp.ability==='DEX'?'selected':''}>Zręczność (DEX)</option>
                <option value="CHA" ${wp.ability==='CHA'?'selected':''}>Charyzma (CHA - Hexblade)</option>
                <option value="INT" ${wp.ability==='INT'?'selected':''}>Inteligencja (INT - Artefaktor)</option>
                <option value="WIS" ${wp.ability==='WIS'?'selected':''}>Mądrość (WIS - Shillelagh)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Premia Magiczna (+0 do +5)</label>
              <input type="number" id="wp-magic" value="${wp.magicBonus || 0}" min="-5" max="10" style="width:100%;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Kość Bazowa Broni</label>
              <input type="text" id="wp-dice" value="${wp.dice || '1d8'}" placeholder="np. 1d8 lub 2d6" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Dodatkowe Kości (np. żywioł)</label>
              <input type="text" id="wp-extra-dice" value="${wp.extraDice || ''}" placeholder="np. 2d6 lub 1d8+1d4" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Typ Obrażeń</label>
              <input type="text" id="wp-dmg-type" value="${wp.dmgType || 'Cięte (Slashing)'}" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Zasięg</label>
              <input type="text" id="wp-range" value="${wp.range || '5 ft'}" style="width:100%;">
            </div>
          </div>

          <div>
            <label style="font-size:0.76rem;color:var(--text-muted);">Właściwości / Notatka do broni (np. Dwuręczna, Ciężka, Półtoraręczna 1k10, Srebrzona)</label>
            <input type="text" id="wp-notes" value="${wp.notes || ''}" placeholder="np. Półtoraręczna (1k10), +2k6 obrażeń od ognia przy aktywacji" style="width:100%;">
          </div>

          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
            <input type="checkbox" id="wp-prof" ${wp.prof !== false ? 'checked' : ''}>
            <span>Posiadam biegłość w tej broni (dolicz Premię z Biegłości do rzutu na trafienie)</span>
          </label>

          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <button class="btn-ghost" onclick="App.closeModal()">Anuluj</button>
            <button class="btn-primary" onclick="App.saveWeaponFromModal(${editIdx !== null ? editIdx : 'null'})">
              ⚔️ ${existing ? 'Zapisz Zmiany w Broni' : 'Stwórz i Dodaj Broń'}
            </button>
          </div>
        </div>
      `
    );
  },

  applyWeaponPreset(presetId) {
    const p = (window.DND_WEAPONS_PRESETS || []).find(x => x.id === presetId);
    if (!p) return;
    document.getElementById("wp-name").value = `${p.name_pl} (${p.name_en})`;
    document.getElementById("wp-ability").value = p.ability;
    document.getElementById("wp-dice").value = p.dice;
    document.getElementById("wp-dmg-type").value = `${p.dmgType_pl} (${p.dmgType_en})`;
    document.getElementById("wp-range").value = p.range;
    const notesEl = document.getElementById("wp-notes");
    if (notesEl) notesEl.value = p.props_pl || "";
  },

  saveWeaponFromModal(editIdx = null) {
    const char = this.getActiveChar();
    if (!char) return;
    const name = document.getElementById("wp-name").value.trim() || "Broń";
    const ability = document.getElementById("wp-ability").value;
    const magicBonus = parseInt(document.getElementById("wp-magic").value, 10) || 0;
    const dice = document.getElementById("wp-dice").value.trim() || "1d8";
    const extraDice = document.getElementById("wp-extra-dice").value.trim();
    const dmgType = document.getElementById("wp-dmg-type").value.trim() || "Cięte";
    const range = document.getElementById("wp-range").value.trim() || "5 ft";
    const prof = document.getElementById("wp-prof").checked;
    const notesEl = document.getElementById("wp-notes");
    const notes = notesEl ? notesEl.value.trim() : "";

    char.weapons = char.weapons || [];
    const weaponObj = { name, ability, prof, magicBonus, dice, extraDice, dmgType, range, notes };
    if (editIdx !== null && editIdx !== undefined && char.weapons[editIdx]) {
      char.weapons[editIdx] = weaponObj;
      this.toast(`⚔️ Zaktualizowano broń: ${name}`);
    } else {
      char.weapons.push(weaponObj);
      this.toast(`⚔️ Stworzono i dodano broń: ${name}`);
    }
    this.saveState();
    this.closeModal();
    this.render();
  },

  removeWeapon(idx) {
    const char = this.getActiveChar();
    if (!char || !char.weapons) return;
    char.weapons.splice(idx, 1);
    this.saveState();
    this.render();
  },

  getMod(score) {
    return Math.floor(((score || 10) - 10) / 2);
  },

  fmtMod(mod) {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  },

  getProfBonus(level) {
    return Math.ceil((level || 1) / 4) + 1;
  },

  // ---------------- O(1) HASH-MAP INDEX CACHE (OPTYMALIZACJA WYDAJNOŚCI) ----------------
  _indexCache: null,

  ensureIndexCache() {
    const cLen = (window.DND_CLASSES || []).length;
    const rLen = (window.DND_RACES || []).length;
    const bLen = (window.DND_BACKGROUNDS || []).length;
    const fLen = (window.DND_FEATS || []).length;
    const iLen = (window.DND_MAGIC_ITEMS || []).length;
    const sLen = (window.DND_SPELLS || []).length;
    const mLen = (window.DND_MONSTERS || []).length;
    const condLen = (window.DND_CONDITIONS || []).length;

    const sig = `${cLen}:${rLen}:${bLen}:${fLen}:${iLen}:${sLen}:${mLen}:${condLen}`;
    if (this._indexCache && this._indexCache.sig === sig) {
      return this._indexCache;
    }

    const mkMap = (arr) => {
      const map = new Map();
      if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] && arr[i].id) map.set(arr[i].id, arr[i]);
        }
      }
      return map;
    };

    this._indexCache = {
      sig,
      classes: mkMap(window.DND_CLASSES),
      races: mkMap(window.DND_RACES),
      bgs: mkMap(window.DND_BACKGROUNDS),
      feats: mkMap(window.DND_FEATS),
      items: mkMap(window.DND_MAGIC_ITEMS),
      spells: mkMap(window.DND_SPELLS),
      monsters: mkMap(window.DND_MONSTERS),
      conditions: mkMap(window.DND_CONDITIONS)
    };
    return this._indexCache;
  },

  getClassData(classId) {
    return this.ensureIndexCache().classes.get(classId) || window.DND_CLASSES[0];
  },

  getRaceData(raceId) {
    return this.ensureIndexCache().races.get(raceId) || window.DND_RACES[0];
  },

  getBgData(bgId) {
    return this.ensureIndexCache().bgs.get(bgId) || window.DND_BACKGROUNDS[0];
  },

  getSpellById(spellId) {
    if (!spellId) return null;
    const cache = this.ensureIndexCache().spells;
    return cache.get(spellId) || cache.get(String(spellId).toLowerCase()) || null;
  },

  getFeatById(featId) {
    return this.ensureIndexCache().feats.get(featId) || null;
  },

  getMagicItemById(itemId) {
    return this.ensureIndexCache().items.get(itemId) || null;
  },

  getMonsterById(monsterId) {
    return this.ensureIndexCache().monsters.get(monsterId) || null;
  },

  getSubclassMechanics(subclassId) {
    return (window.DND_SUBCLASS_MECHANICS && window.DND_SUBCLASS_MECHANICS[subclassId]) || null;
  },

  getCharMagicItems(char) {
    if (!char || !char.magicItems || !window.DND_MAGIC_ITEMS) return [];
    const itemMap = this.ensureIndexCache().items;
    return char.magicItems.map(id => itemMap.get(id)).filter(Boolean);
  },

  getEffectiveAbilityScore(char, abId) {
    let base = (char && char.abilities && char.abilities[abId]) || 10;
    this.getCharMagicItems(char).forEach(item => {
      if (item.set_ability && item.set_ability[abId] && item.set_ability[abId] > base) {
        base = item.set_ability[abId];
      }
    });
    return base;
  },

  getMagicItemBonuses(char) {
    const bonuses = { ac: 0, saves: 0, checks: 0, spell_dc: 0, spell_atk: 0, pb: 0, archmagi_robe: false };
    this.getCharMagicItems(char).forEach(item => {
      if (item.bonus_ac) bonuses.ac += item.bonus_ac;
      if (item.bonus_saves) bonuses.saves += item.bonus_saves;
      if (item.bonus_checks) bonuses.checks += item.bonus_checks;
      if (item.bonus_spell_dc) bonuses.spell_dc += item.bonus_spell_dc;
      if (item.bonus_spell_atk) bonuses.spell_atk += item.bonus_spell_atk;
      if (item.bonus_pb) bonuses.pb += item.bonus_pb;
      if (item.id === "robe-of-the-archmagi") bonuses.archmagi_robe = true;
    });
    return bonuses;
  },

  getActiveConditions(char) {
    if (!char || !char.conditions || !window.DND_CONDITIONS) return [];
    const condMap = this.ensureIndexCache().conditions;
    return char.conditions.map(id => condMap.get(id)).filter(Boolean);
  },

  getConditionEffects(char) {
    const conds = this.getActiveConditions(char);
    const exh = (char && char.exhaustion) || 0;
    const fx = {
      acBonus: 0,
      dexSaveBonus: 0,
      speedZero: exh >= 5,
      halfSpeed: exh >= 2,
      doubleSpeed: false,
      halfMaxHP: exh >= 4,
      dead: exh >= 6,
      autoFailStrDex: false,
      disChecks: exh >= 1,
      disAttacks: exh >= 3,
      disSaves: exh >= 3,
      disDexSave: false,
      advAttacks: false,
      advStr: false,
      advDexSave: false,
      blessBonus: false,
      banePenalty: false,
      activeNames: []
    };

    conds.forEach(c => {
      fx.activeNames.push(c.name_pl);
      if (c.bonus_ac) fx.acBonus += c.bonus_ac;
      if (c.bonus_dex_save) fx.dexSaveBonus += c.bonus_dex_save;
      if (c.speedZero) fx.speedZero = true;
      if (c.halfSpeed) fx.halfSpeed = true;
      if (c.doubleSpeed) fx.doubleSpeed = true;
      if (c.autoFailStrDex) fx.autoFailStrDex = true;
      if (c.disDexSave) fx.disDexSave = true;
      if (c.advAttacks) fx.advAttacks = true;
      if (c.advStr) fx.advStr = true;
      if (c.advDexSave) fx.advDexSave = true;
      if (c.id === "frightened" || c.id === "poisoned") {
        fx.disChecks = true;
        fx.disAttacks = true;
      }
      if (c.id === "blinded" || c.id === "prone" || c.id === "restrained") {
        fx.disAttacks = true;
      }
      if (c.id === "blessed") fx.blessBonus = true;
      if (c.id === "baned") fx.banePenalty = true;
    });

    return fx;
  },

  calcAC(char) {
    const dexMod = this.getMod(this.getEffectiveAbilityScore(char, "DEX"));
    const conMod = this.getMod(this.getEffectiveAbilityScore(char, "CON"));
    const wisMod = this.getMod(this.getEffectiveAbilityScore(char, "WIS"));
    const intMod = this.getMod(this.getEffectiveAbilityScore(char, "INT"));
    const race = this.getRaceData(char.raceId);
    const subMech = this.getSubclassMechanics(char.subclassId);
    const itemBonuses = this.getMagicItemBonuses(char);
    const condFx = this.getConditionEffects(char);
    let base = 10 + dexMod;

    if (char.customArmor && char.customArmor.enabled) {
      const ca = char.customArmor;
      const cap = ca.dexCap !== undefined ? Number(ca.dexCap) : 99;
      const medMasterCap = (cap === 2 && (char.feats || []).includes("medium-armor-master")) ? 3 : cap;
      const effDex = cap <= 0 ? 0 : Math.min(medMasterCap, dexMod);
      base = (Number(ca.baseAc) || 10) + effDex + (Number(ca.magicBonus) || 0);
      if (ca.addCon) base += conMod;
      if (ca.addWis) base += wisMod;
      if (ca.addInt) base += intMod;
    } else if (itemBonuses.archmagi_robe && (char.armorType === "none" || char.armorType === "mage_armor")) {
      base = 15 + dexMod;
    } else {
      switch (char.armorType) {
        case "light": base = 12 + dexMod; break; // Ćwiekowana skóra
        case "medium": base = 15 + Math.min(((char.feats||[]).includes("medium-armor-master") ? 3 : 2), dexMod); break;
        case "heavy": base = 18; break; // Zbroja płytowa
        case "mage_armor": base = 13 + dexMod; break;
        case "unarmored_barb": base = 10 + dexMod + conMod; break;
        case "unarmored_monk": base = 10 + dexMod + wisMod; break;
        default:
          if (char.raceId === "tortle") base = 17;
          else if (char.raceId === "loxodon") base = 12 + conMod;
          else if (["lizardfolk", "autognome", "thri-kreen"].includes(char.raceId) || char.subclassId === "draconic") base = 13 + dexMod;
          else if (char.classId === "barbarian") base = 10 + dexMod + conMod;
          else if (char.classId === "monk") base = 10 + dexMod + wisMod;
          else base = 10 + dexMod;
      }
    }

    if (char.shieldEquipped) {
      base += 2 + (Number(char.shieldMagicBonus) || 0);
    }
    if (race && race.ac_bonus) base += race.ac_bonus;
    if (subMech && subMech.ac_bonus_passive) base += subMech.ac_bonus_passive;
    if (char.subclassBuffActive && subMech && subMech.toggle_buff) {
      if (subMech.toggle_buff.bonus_ac) base += subMech.toggle_buff.bonus_ac;
      if (subMech.toggle_buff.dynamic_ac_ability === "INT") base += Math.max(1, intMod);
    }
    if ((char.feats || []).includes("dual-wielder")) base += 1;
    base += itemBonuses.ac + condFx.acBonus;
    if (char.acManualBonus) base += Number(char.acManualBonus) || 0;
    return base;
  },

  openArmorCreatorModal() {
    const char = this.getActiveChar();
    if (!char) return;
    const ca = char.customArmor || { enabled: false, name: "Zbroja Płytowa +1", category: "Heavy", baseAc: 18, dexCap: 0, magicBonus: 1, stealthDis: false, adamantine: false, mithral: false, resistance: "" };

    this.openModal(
      "🛡️ Kreator Pancerza i Tarczy (Armor & Shield Forge)",
      `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <label style="font-size:0.8rem;color:var(--gold);display:block;margin-bottom:4px;">Wybierz bazowy pancerz z podręcznika D&D 5e (lub stwórz własny poniżej):</label>
            <select id="arm-preset-select" onchange="App.applyArmorPreset(this.value)" style="width:100%;">
              <option value="">— Wybierz bazowy pancerz z listy —</option>
              ${(window.DND_ARMORS_PRESETS || []).map(p => `
                <option value="${p.id}">${p.name_pl} (${p.name_en}) — Bazowa KP ${p.baseAc}${p.dexCap === 0 ? ' (bez ZRĘ)' : (p.dexCap === 2 ? ' + ZRĘ (maks. 2)' : ' + pełna ZRĘ')}</option>
              `).join("")}
            </select>
          </div>

          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Nazwa Pancerza</label>
              <input type="text" id="arm-name" value="${ca.name || 'Własny Pancerz'}" placeholder="np. Smocza Zbroja Płytowa +2" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Bazowa KP Zbroi</label>
              <input type="number" id="arm-base" value="${ca.baseAc !== undefined ? ca.baseAc : 15}" min="10" max="25" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Premia Magiczna Zbroi (+0 do +3)</label>
              <input type="number" id="arm-magic" value="${ca.magicBonus || 0}" min="0" max="5" style="width:100%;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Limit premii ze Zręczności (DEX Cap)</label>
              <select id="arm-dex-cap" style="width:100%;">
                <option value="99" ${ca.dexCap >= 99 ? 'selected' : ''}>Pełny modyfikator ze Zręczności (Lekki / Bez zbroi)</option>
                <option value="2" ${ca.dexCap === 2 ? 'selected' : ''}>Maksymalnie +2 ze Zręczności (Średni pancerz)</option>
                <option value="3" ${ca.dexCap === 3 ? 'selected' : ''}>Maksymalnie +3 ze Zręczności (Mistrz Średniego Pancerza)</option>
                <option value="0" ${ca.dexCap === 0 ? 'selected' : ''}>Brak premii ze Zręczności (Ciężki pancerz)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Dodatkowa Cecha do KP (Obrona Klasowa)</label>
              <select id="arm-extra-stat" style="width:100%;">
                <option value="">Brak dodatkowej cechy</option>
                <option value="CON" ${ca.addCon ? 'selected' : ''}>+ Kondycja (CON — Barbarzyńca / Loxodon)</option>
                <option value="WIS" ${ca.addWis ? 'selected' : ''}>+ Mądrość (WIS — Mnich)</option>
                <option value="INT" ${ca.addInt ? 'selected' : ''}>+ Inteligencja (INT — Pieśń Ostrza)</option>
              </select>
            </div>
          </div>

          <div class="card" style="background:var(--bg-deep);padding:12px;">
            <strong style="color:var(--gold);font-size:0.86rem;display:block;margin-bottom:8px;">🛡️ Konfiguracja Tarczy i Właściwości Specjalnych:</strong>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                <input type="checkbox" id="arm-shield-eq" ${char.shieldEquipped ? 'checked' : ''}>
                <span>Wyposażona Tarcza (+2 bazowe KP)</span>
              </label>
              <div>
                <label style="font-size:0.75rem;color:var(--text-muted);">Premia Magiczna Tarczy (+0 do +3):</label>
                <input type="number" id="arm-shield-magic" value="${char.shieldMagicBonus || 0}" min="0" max="5" style="width:80px;margin-left:8px;">
              </div>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                <input type="checkbox" id="arm-adamantine" ${ca.adamantine ? 'checked' : ''}>
                <span>Adamantytowa (Niewrażliwość na Trafienia Krytyczne!)</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                <input type="checkbox" id="arm-mithral" ${ca.mithral ? 'checked' : ''}>
                <span>Mitrylowa (Brak Utrudnienia w Skradaniu się)</span>
              </label>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <button class="btn-ghost btn-sm" onclick="App.disableCustomArmor()">Przywróć standardowy wybór z listy</button>
            <div style="display:flex;gap:8px;">
              <button class="btn-ghost" onclick="App.closeModal()">Anuluj</button>
              <button class="btn-primary" onclick="App.saveCustomArmorFromModal()">🛡️ Zapisz i Załóż Pancerz</button>
            </div>
          </div>
        </div>
      `
    );
  },

  applyArmorPreset(presetId) {
    const p = (window.DND_ARMORS_PRESETS || []).find(x => x.id === presetId);
    if (!p) return;
    document.getElementById("arm-name").value = `${p.name_pl} (${p.name_en})`;
    document.getElementById("arm-base").value = p.baseAc;
    document.getElementById("arm-dex-cap").value = String(p.dexCap);
    document.getElementById("arm-extra-stat").value = p.addCon ? "CON" : (p.addWis ? "WIS" : "");
  },

  saveCustomArmorFromModal() {
    const char = this.getActiveChar();
    if (!char) return;
    const name = document.getElementById("arm-name").value.trim() || "Własny Pancerz";
    const baseAc = parseInt(document.getElementById("arm-base").value, 10) || 10;
    const magicBonus = parseInt(document.getElementById("arm-magic").value, 10) || 0;
    const dexCap = parseInt(document.getElementById("arm-dex-cap").value, 10);
    const extraStat = document.getElementById("arm-extra-stat").value;
    const adamantine = document.getElementById("arm-adamantine").checked;
    const mithral = document.getElementById("arm-mithral").checked;

    char.customArmor = {
      enabled: true,
      name,
      baseAc,
      magicBonus,
      dexCap: isNaN(dexCap) ? 99 : dexCap,
      addCon: extraStat === "CON",
      addWis: extraStat === "WIS",
      addInt: extraStat === "INT",
      adamantine,
      mithral
    };
    char.shieldEquipped = document.getElementById("arm-shield-eq").checked;
    char.shieldMagicBonus = parseInt(document.getElementById("arm-shield-magic").value, 10) || 0;

    this.saveState();
    this.closeModal();
    this.render();
    this.toast(`🛡️ Założono pancerz: ${name} (Nowa KP: ${this.calcAC(char)})`);
  },

  disableCustomArmor() {
    const char = this.getActiveChar();
    if (!char) return;
    char.customArmor = null;
    char.shieldMagicBonus = 0;
    this.saveState();
    this.closeModal();
    this.render();
    this.toast("Przywrócono domyślny kalkulator pancerza.");
  },

  calcInitiative(char) {
    const dexMod = this.getMod(char.abilities.DEX);
    const pb = this.getProfBonus(char.level);
    const subMech = this.getSubclassMechanics(char.subclassId);
    let bonus = dexMod;

    if ((char.feats || []).includes("alert")) bonus += 5;
    if (char.raceId === "harengon") bonus += pb;
    if (char.classId === "bard" && char.level >= 2) bonus += Math.floor(pb / 2);

    if (subMech) {
      if (subMech.init_ability && char.level >= (this.getClassData(char.classId).subclass_level || 1)) {
        bonus += Math.max(0, this.getMod(char.abilities[subMech.init_ability]));
      }
      if (subMech.init_prof_at_level && char.level >= subMech.init_prof_at_level) {
        bonus += pb;
      }
    }
    return bonus;
  },

  calcSpeed(char) {
    const condFx = this.getConditionEffects(char);
    if (condFx.speedZero) return 0;

    const race = this.getRaceData(char.raceId);
    const subMech = this.getSubclassMechanics(char.subclassId);
    let spd = (race && race.speed) || 30;
    if (char.classId === "barbarian" && char.level >= 5 && char.armorType !== "heavy") spd += 10;
    if (char.classId === "monk" && char.level >= 2 && (char.armorType === "none" || char.armorType === "unarmored_monk") && !char.shieldEquipped) {
      spd += 10 + Math.floor((char.level - 2) / 4) * 5;
    }
    if ((char.feats || []).includes("mobile")) spd += 10;
    if (char.subclassBuffActive && subMech && subMech.toggle_buff && subMech.toggle_buff.bonus_speed) {
      spd += subMech.toggle_buff.bonus_speed;
    }
    if (condFx.doubleSpeed) spd *= 2;
    if (condFx.halfSpeed) spd = Math.floor(spd / 2);
    return spd;
  },

  syncSubclassSpellsAndBonuses(char) {
    if (!char) return;
    const subMech = this.getSubclassMechanics(char.subclassId);
    char.knownSpells = char.knownSpells || [];
    if (subMech && subMech.spells_by_level) {
      Object.entries(subMech.spells_by_level).forEach(([reqLvl, spIds]) => {
        if (char.level >= parseInt(reqLvl, 10)) {
          spIds.forEach(spId => {
            if (!char.knownSpells.includes(spId)) char.knownSpells.push(spId);
          });
        }
      });
    }
    if (char.subclassId === "lore" && char.level >= 3) {
      ["Arcana", "History", "Nature"].forEach(sk => {
        if (!char.skillProficiencies.includes(sk)) char.skillProficiencies.push(sk);
      });
    }
    if (char.subclassId === "scout" && char.level >= 3) {
      ["Nature", "Survival"].forEach(sk => {
        if (!char.skillProficiencies.includes(sk)) char.skillProficiencies.push(sk);
        if (!char.skillExpertises.includes(sk)) char.skillExpertises.push(sk);
      });
    }
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = Math.min(char.hpCurrent || char.hpMax, char.hpMax);
  },

  setCharSubclass(subclassId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.subclassId = subclassId;
    char.subclassBuffActive = false;
    this.syncSubclassSpellsAndBonuses(char);
    this.saveState();
    this.render();
    const cls = this.getClassData(char.classId);
    const sc = (cls.subclasses || []).find(s => s.id === subclassId);
    if (sc) {
      this.toast(`✨ Wybrano podklasę: ${sc.name_pl} — doliczono bonusy i zaklęcia podklasowe!`);
    }
  },

  toggleSubclassBuff() {
    const char = this.getActiveChar();
    if (!char) return;
    char.subclassBuffActive = !char.subclassBuffActive;
    this.saveState();
    this.render();
    const subMech = this.getSubclassMechanics(char.subclassId);
    if (subMech && subMech.toggle_buff) {
      this.toast(`${char.subclassBuffActive ? '🔥 Aktywowano' : '⏹️ Wyłączono'}: ${subMech.toggle_buff.name_pl}`);
    }
  },

  rollSubclassFeature(subclassId, featIdx) {
    const char = this.getActiveChar();
    const subMech = this.getSubclassMechanics(subclassId);
    if (!char || !subMech || !subMech.features || !subMech.features[featIdx]) return;
    const f = subMech.features[featIdx];

    if (f.min_roll && f.roll === "1d20") {
      // np. Srebrny Język (min 10 na k20)
      const rawRoll = Math.floor(Math.random() * 20) + 1;
      const effRoll = Math.max(f.min_roll, rawRoll);
      const chaMod = this.getMod(this.getEffectiveAbilityScore(char, "CHA"));
      const pb = this.getProfBonus(char.level);
      const bonus = chaMod + pb * 2;
      const total = effRoll + bonus;
      const detail = `1k20[${rawRoll} → min ${effRoll}] + ${bonus} = ${total}`;
      this.addDiceLogEntry({
        title: `${f.roll_label || f.name_pl}`,
        detail,
        total
      });
      this.toastRoll({
        title: f.roll_label || f.name_pl,
        detail,
        total
      });
      return;
    }

    if (f.use_ability_mod && f.roll === "1d20") {
      const abMod = this.getMod(char.abilities[f.use_ability_mod]);
      const pb = f.use_prof ? this.getProfBonus(char.level) : 0;
      this.rollDie(20, abMod + pb, f.roll_label || f.name_pl);
      return;
    }

    if (f.roll) {
      this.rollCustomFormula(f.roll, f.roll_label || f.name_pl);
    } else {
      this.toast(`✨ Użyto zdolności podklasy: ${f.name_pl}`);
    }
  },

  calcRecommendedMaxHP(char) {
    const cls = this.getClassData(char.classId);
    const race = this.getRaceData(char.raceId);
    const conMod = this.getMod(this.getEffectiveAbilityScore(char, "CON"));
    const lvl = char.level || 1;
    const hitDie = cls.hit_die || 8;
    const avgPerLevel = (hitDie / 2) + 1;

    let total = hitDie + conMod;
    if (lvl > 1) {
      total += (lvl - 1) * (avgPerLevel + conMod);
    }
    if (race && race.extra_hp_per_level) {
      total += lvl * race.extra_hp_per_level;
    }
    if ((char.feats || []).includes("tough")) {
      total += lvl * 2;
    }
    if (char.subclassId === "draconic") {
      total += lvl * 1;
    }
    const baseMax = Math.max(lvl, total);
    const condFx = this.getConditionEffects(char);
    return condFx.halfMaxHP ? Math.max(1, Math.floor(baseMax / 2)) : baseMax;
  },

  toggleCharMagicItem(itemId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.magicItems = char.magicItems || [];
    const item = window.DND_MAGIC_ITEMS.find(m => m.id === itemId);
    if (!item) return;

    if (char.magicItems.includes(itemId)) {
      char.magicItems = char.magicItems.filter(id => id !== itemId);
      this.toast(`Zdjęto przedmiot: ${item.name_pl}`);
    } else {
      char.magicItems.push(itemId);
      this.toast(`✨ Wyposażono przedmiot: ${item.name_pl}`);
    }
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = Math.min(char.hpCurrent, char.hpMax);
    this.saveState();
    this.render();
  },

  // ---------------- NAVIGATION & UI CONTROLS ----------------
  switchTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  setLangMode(lang) {
    this.state.lang = lang;
    document.querySelectorAll(".lang-btn:not(.unit-btn)").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    this.updateStaticUILang();
    this.saveState();
    this.render();
    this.toast(this.ui(
      `Język wyświetlania: ${lang === 'pl_en' ? 'Polski + Oryginał EN' : 'Tylko Polski'}`,
      `Display language: English (Wikidot Original)`
    ));
  },

  setUnitSystem(unit) {
    this.state.unitSystem = unit;
    document.querySelectorAll(".unit-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.unit === unit);
    });
    this.saveState();
    this.render();
    this.toast(unit === "metric"
      ? this.ui("📏 Jednostki: System Metryczny (5 stóp = 1,5 m)", "📏 Units: Metric System (5 ft = 1.5 m)")
      : this.ui("📏 Jednostki: System Imperialny (stopy / ft)", "📏 Units: Imperial System (feet / ft)")
    );
  },

  convertUnitsToMetric(html) {
    const isEn = this.state.lang === "en";
    const fmtM = (ftVal) => {
      const m = Math.round(parseFloat(ftVal) * 0.3 * 10) / 10;
      const str = String(m);
      return isEn ? str : str.replace(".", ",");
    };

    return html
      // Zakresy typu 20/60 ft lub 90/300 stóp
      .replace(/\b(\d+)\/(\d+)\s*(?:stóp|stopy|ft\.?|feet)\b/gi, (_, a, b) => `${fmtM(a)}/${fmtM(b)} m`)
      // Wymiary typu 100 × 5 stóp lub 50×100 ft
      .replace(/\b(\d+)\s*[×x]\s*(\d+)\s*(?:stóp|stopy|ft\.?|feet)\b/gi, (_, a, b) => `${fmtM(a)} × ${fmtM(b)} m`)
      // Pojedyncze wartości ze znakiem + lub bez: np. 30 ft, +10 ft, 120 stóp, 5-foot, 30-ft
      .replace(/(\+?\d+)\s*(?:-?\s*(?:stóp|stopy|stopa|ft\.?|feet|foot))\b/gi, (_, ft) => {
        const hasPlus = ft.startsWith("+");
        const num = parseFloat(ft);
        return `${hasPlus ? "+" : ""}${fmtM(num)} m`;
      })
      // Mile: np. 1 mila, 1 mile, 5 miles
      .replace(/\b(\d+)\s*(?:mila|mile|mili|mil|miles)\b/gi, (_, mi) => {
        const km = Math.round(parseFloat(mi) * 1.5 * 10) / 10;
        const str = isEn ? String(km) : String(km).replace(".", ",");
      return `${str} km`;
      })
      // Funty (pounds / lb): np. 10 funtów, 10 pounds
      .replace(/\b(\d+)\s*(?:funtów|funty|funt|pounds|lbs?)\b/gi, (_, lb) => {
        const kg = Math.round(parseFloat(lb) * 0.5 * 10) / 10;
        const str = isEn ? String(kg) : String(kg).replace(".", ",");
        return `${str} kg`;
      });
  },

  updateHeaderPill() {
    const pill = document.getElementById("active-char-pill");
    const char = this.getActiveChar();
    if (!pill || !char) {
      if (pill) pill.classList.add("hidden");
      return;
    }
    pill.classList.remove("hidden");
    const cls = this.getClassData(char.classId);
    const pillAvatar = document.getElementById("pill-avatar");
    if (pillAvatar) {
      if (char.portraitMode === "emoji") {
        pillAvatar.innerHTML = char.avatar || cls.icon;
      } else {
        const src = (char.portraitMode === "custom" && char.customPortraitUrl)
          ? char.customPortraitUrl
          : (char.portraitMode === "class" ? this.getClassPortrait(char.classId) : this.getRacePortrait(char.raceId));
        pillAvatar.innerHTML = `<img src="${src}" alt="${char.name}" style="width:28px;height:28px;border-radius:7px;object-fit:cover;border:1px solid var(--gold);vertical-align:middle;">`;
      }
    }
    document.getElementById("pill-name").textContent = char.name;
    document.getElementById("pill-meta").textContent = `${this.tPlain(cls.name_pl, cls.name_en)} • ${this.ui('Poz.', 'Lvl')} ${char.level}`;
    document.getElementById("pill-hp").textContent = `${char.hpCurrent}/${char.hpMax} ${this.ui('PW', 'HP')}`;
  },

  toast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, 2800);
  },

  toastRoll({ title, detail, total, isCrit = false, isFumble = false }) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    // Usuń poprzednie powiadomienia o rzucie, aby wynik na dole ekranu był zawsze natychmiastowy i czytelny
    container.querySelectorAll(".toast-roll").forEach(old => old.remove());

    const el = document.createElement("div");
    el.className = `toast toast-roll ${isCrit ? "crit" : ""} ${isFumble ? "fumble" : ""}`;
    el.innerHTML = `
      <div class="toast-roll-info">
        <div class="toast-roll-title">🎲 ${title}${isCrit ? ' <span class="badge badge-emerald">NAT 20!</span>' : ''}${isFumble ? ' <span class="badge badge-crimson">NAT 1!</span>' : ''}</div>
        <div class="toast-roll-math">${detail}</div>
      </div>
      <div class="toast-roll-total">${total}</div>
    `;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, 4200);
  },

  openModal(title, htmlContent) {
    let bodyOut = htmlContent;
    let titleOut = title;
    if (this.state.lang === "en") {
      bodyOut = this.translateDOMHtmlToEn(bodyOut);
      titleOut = this.translateDOMHtmlToEn(titleOut);
    }
    if (this.state.unitSystem === "metric") {
      bodyOut = this.convertUnitsToMetric(bodyOut);
    }
    document.getElementById("modal-title").innerHTML = titleOut;
    document.getElementById("modal-body").innerHTML = bodyOut;
    document.getElementById("modal-backdrop").classList.remove("hidden");
  },

  closeModal() {
    document.getElementById("modal-backdrop").classList.add("hidden");
  },

  // ---------------- DICE ROLLER ----------------
  toggleDiceDrawer() {
    document.getElementById("dice-drawer").classList.toggle("hidden");
  },

  setRollMode(mode) {
    this.state.rollMode = mode;
    document.getElementById("roll-mode-norm").classList.toggle("active", mode === "normal");
    document.getElementById("roll-mode-adv").classList.toggle("active", mode === "adv");
    document.getElementById("roll-mode-dis").classList.toggle("active", mode === "dis");
  },

  rollDie(sides, bonus = null, label = "", rollCategory = "generic") {
    if (bonus === null || bonus === undefined) {
      const quickBonusEl = document.getElementById("quick-die-bonus");
      bonus = quickBonusEl ? (parseInt(quickBonusEl.value, 10) || 0) : 0;
    } else {
      bonus = Number(bonus) || 0;
    }

    const char = this.getActiveChar();
    const condFx = char ? this.getConditionEffects(char) : null;
    let mode = sides === 20 ? this.state.rollMode : "normal";
    const statusNotes = [];

    if (sides === 20 && condFx) {
      // Automatyczna porażka w rzutach obronnych na SIŁ i ZRĘ (Paraliż / Ogłuszenie / Nieprzytomność / Petryfikacja)
      if ((rollCategory === "save:STR" || rollCategory === "save:DEX") && condFx.autoFailStrDex) {
        this.addDiceLogEntry({
          title: `❌ ${label} [AUTOMATYCZNA PORAŻKA — Stan!]`,
          detail: `Aktywny stan (Sparaliżowany/Ogłuszony/Nieprzytomny/Spetryfikowany) powoduje automatyczną porażkę!`,
          total: "PORAŻKA",
          isFumble: true
        });
        this.toast(`❌ ${label}: AUTOMATYCZNA PORAŻKA przez aktywny stan!`);
        return 0;
      }

      if (mode === "normal") {
        let wantAdv = false;
        let wantDis = false;

        if (rollCategory.startsWith("check:") || rollCategory.startsWith("skill:") || rollCategory === "init") {
          if (condFx.disChecks) { wantDis = true; statusNotes.push("Utrudnienie ze Stanu/Wyczerpania"); }
          if (rollCategory === "check:STR" && condFx.advStr) { wantAdv = true; statusNotes.push("Ułatwienie z Szału"); }
        } else if (rollCategory === "attack") {
          if (condFx.disAttacks) { wantDis = true; statusNotes.push("Utrudnienie ze Stanu"); }
          if (condFx.advAttacks) { wantAdv = true; statusNotes.push("Ułatwienie z Niewidzialności"); }
        } else if (rollCategory.startsWith("save:")) {
          if (condFx.disSaves) { wantDis = true; statusNotes.push("Utrudnienie z Wyczerpania 3+"); }
          if (rollCategory === "save:DEX" && condFx.disDexSave) { wantDis = true; statusNotes.push("Utrudnienie z Unieruchomienia"); }
          if (rollCategory === "save:DEX" && condFx.advDexSave) { wantAdv = true; statusNotes.push("Ułatwienie (Haste/Unik)"); }
          if (rollCategory === "save:STR" && condFx.advStr) { wantAdv = true; statusNotes.push("Ułatwienie z Szału"); }
        }

        if (wantAdv && !wantDis) mode = "adv";
        else if (wantDis && !wantAdv) mode = "dis";
        else if (wantAdv && wantDis) statusNotes.push("Adv i Dis znoszą się");
      }
    }

    const r1 = Math.floor(Math.random() * sides) + 1;
    const r2 = Math.floor(Math.random() * sides) + 1;
    let chosen = r1;
    let modeNote = "";

    if (mode === "adv") {
      chosen = Math.max(r1, r2);
      modeNote = ` [Adv: ${r1}, ${r2} → ${chosen}]`;
    } else if (mode === "dis") {
      chosen = Math.min(r1, r2);
      modeNote = ` [Dis: ${r1}, ${r2} → ${chosen}]`;
    }

    // Obsługa Błogosławieństwa (+1k4) oraz Zguby (-1k4) dla ataków i rzutów obronnych
    let extraDiceTotal = 0;
    let extraDiceStr = "";
    if (sides === 20 && condFx && (rollCategory === "attack" || rollCategory.startsWith("save:"))) {
      if (condFx.blessBonus) {
        const bRoll = Math.floor(Math.random() * 4) + 1;
        extraDiceTotal += bRoll;
        extraDiceStr += ` + 1k4[${bRoll} Bless]`;
      }
      if (condFx.banePenalty) {
        const pRoll = Math.floor(Math.random() * 4) + 1;
        extraDiceTotal -= pRoll;
        extraDiceStr += ` - 1k4[${pRoll} Bane]`;
      }
    }

    const total = chosen + bonus + extraDiceTotal;
    const isCrit = sides === 20 && chosen === 20;
    const isFumble = sides === 20 && chosen === 1;
    const bonusStr = bonus !== 0 ? (bonus > 0 ? ` + ${bonus}` : ` - ${Math.abs(bonus)}`) : (label ? " + 0" : "");
    const statusSuffix = statusNotes.length > 0 ? ` (${statusNotes.join(", ")})` : "";
    const title = (label || `Rzut 1k${sides}${bonus !== 0 ? (bonus > 0 ? `+${bonus}` : `${bonus}`) : ""}`) + statusSuffix;
    const dieRollStr = mode === "normal"
      ? `1k${sides}[${chosen}]`
      : `1k${sides}[${mode === "adv" ? "Adv" : "Dis"}: ${r1}, ${r2} → ${chosen}]`;
    const detail = `${dieRollStr}${extraDiceStr}${bonusStr} = ${total}`;

    this.addDiceLogEntry({
      title: `${title}${modeNote}`,
      detail,
      total,
      isCrit,
      isFumble
    });

    this.toastRoll({
      title,
      detail,
      total,
      isCrit,
      isFumble
    });
    return total;
  },

  rollCustomFormula(formulaStr, label = "") {
    const inputEl = document.getElementById("custom-dice-formula");
    const rawInput = (formulaStr || (inputEl ? inputEl.value : "1d20")).trim().toLowerCase();
    if (!rawInput) {
      this.toast("Wpisz formułę kości (np. 2d6+3, 1k8+2+1k4, d20+5)");
      return 0;
    }

    // Wyciągnij wyrażenie matematyczne kości i modyfikatorów (ignorując ewentualne dopiski słowne jak np. "2d6 ognia")
    const tokenRegex = /([+-]?)\s*(?:(\d*)([dk])(\d+)|(\d+))/g;
    let match;
    let total = 0;
    const detailParts = [];
    const formulaTokens = [];
    let isCrit = false;
    let isFumble = false;

    while ((match = tokenRegex.exec(rawInput)) !== null) {
      if (match[0].length === 0) break;
      const sign = match[1] === "-" ? -1 : 1;
      const signPrefix = detailParts.length === 0 ? (sign < 0 ? "-" : "") : (sign < 0 ? " - " : " + ");
      const compactSign = formulaTokens.length === 0 ? (sign < 0 ? "-" : "") : (sign < 0 ? "-" : "+");

      if (match[3]) {
        // Kość: XdY lub XkY (lub samo dY / kY -> 1 kość)
        const count = Math.min(100, match[2] ? parseInt(match[2], 10) : 1);
        const sides = Math.max(1, parseInt(match[4], 10));
        const rolls = [];
        formulaTokens.push(`${compactSign}${count}k${sides}`);

        if (count === 1 && sides === 20 && this.state.rollMode !== "normal") {
          const r1 = Math.floor(Math.random() * 20) + 1;
          const r2 = Math.floor(Math.random() * 20) + 1;
          const chosen = this.state.rollMode === "adv" ? Math.max(r1, r2) : Math.min(r1, r2);
          rolls.push(chosen);
          if (chosen === 20) isCrit = true;
          if (chosen === 1) isFumble = true;
          const subSum = chosen * sign;
          total += subSum;
          detailParts.push(`${signPrefix}1k20[${r1}, ${r2} → ${chosen}]`);
        } else {
          for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            if (count === 1 && sides === 20) {
              if (r === 20) isCrit = true;
              if (r === 1) isFumble = true;
            }
          }
          const subSum = rolls.reduce((a, b) => a + b, 0);
          total += subSum * sign;
          detailParts.push(`${signPrefix}${count}k${sides}[${rolls.join(", ")}]`);
        }
      } else if (match[5]) {
        // Stały modyfikator liczbowy
        const modVal = parseInt(match[5], 10);
        total += modVal * sign;
        formulaTokens.push(`${compactSign}${modVal}`);
        detailParts.push(`${signPrefix}${modVal}`);
      }
    }

    if (detailParts.length === 0) {
      this.toast("Nieprawidłowa formuła kości (użyj np. 2d6+3, 1k20+5 lub 2k8+1k6+4)");
      return 0;
    }

    const displayFormula = formulaTokens.join("");
    const detail = `${detailParts.join("")} = ${total}`;
    const title = label ? `${label} (${displayFormula})` : `Rzut ${displayFormula}`;

    this.addDiceLogEntry({
      title,
      detail,
      total,
      isCrit,
      isFumble
    });
    this.toastRoll({
      title,
      detail,
      total,
      isCrit,
      isFumble
    });
    return total;
  },

  addDiceLogEntry({ title, detail, total, isCrit, isFumble }) {
    const log = document.getElementById("dice-log");
    if (!log) return;
    const div = document.createElement("div");
    div.className = `roll-entry ${isCrit ? "crit" : ""} ${isFumble ? "fumble" : ""}`;
    div.innerHTML = `
      <div>
        <div style="font-weight:700;color:var(--text-main);">${title}</div>
        <div style="font-size:0.74rem;color:var(--text-muted);font-family:var(--font-mono);">${detail}</div>
      </div>
      <div class="roll-total">${total}</div>
    `;
    log.prepend(div);
  },

  clearDiceLog() {
    const log = document.getElementById("dice-log");
    if (log) log.innerHTML = "";
  },

  // ---------------- MAIN VIEW ROUTER (ZACHOWANIE FOKUSU I POMIAR CZASU RENDEROWANIA) ----------------
  lastRenderTimeMs: 0,

  render() {
    const view = document.getElementById("main-view");
    if (!view) return;

    const t0 = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();

    // Zachowaj fokus i pozycję kursora aktywnego pola wyszukiwania podczas przerenderowania DOM
    const activeEl = document.activeElement;
    let focusInfo = null;
    if (activeEl && view.contains(activeEl) && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      focusInfo = {
        id: activeEl.id || null,
        placeholder: activeEl.getAttribute("placeholder") || null,
        type: activeEl.getAttribute("type") || null,
        selStart: typeof activeEl.selectionStart === "number" ? activeEl.selectionStart : null,
        selEnd: typeof activeEl.selectionEnd === "number" ? activeEl.selectionEnd : null
      };
    }

    let outHtml = "";
    switch (this.state.tab) {
      case "characters":
        outHtml = this.renderCharactersTab();
        break;
      case "builder":
        outHtml = this.renderBuilderTab();
        break;
      case "sheet":
        outHtml = this.renderSheetTab();
        break;
      case "spells":
        outHtml = this.renderSpellsTab();
        break;
      case "bestiary":
        outHtml = this.renderBestiaryTab();
        break;
      case "compendium":
        outHtml = this.renderCompendiumTab();
        break;
    }

    if (this.state.lang === "en") {
      outHtml = this.translateDOMHtmlToEn(outHtml);
    }
    if (this.state.unitSystem === "metric") {
      outHtml = this.convertUnitsToMetric(outHtml);
    }

    // Pojedynczy zapis do DOM (brak podwójnego parsowania HTML przy trybie EN lub Metrycznym!)
    view.innerHTML = outHtml;

    if (focusInfo) {
      let target = focusInfo.id ? document.getElementById(focusInfo.id) : null;
      if (!target && focusInfo.placeholder) {
        target = Array.from(view.querySelectorAll("input, textarea")).find(el => el.getAttribute("placeholder") === focusInfo.placeholder);
      }
      if (target) {
        target.focus();
        if (focusInfo.selStart !== null && typeof target.setSelectionRange === "function" && target.type !== "number") {
          try { target.setSelectionRange(focusInfo.selStart, focusInfo.selEnd); } catch (_) {}
        }
      }
    }

    const t1 = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    this.lastRenderTimeMs = Math.round((t1 - t0) * 100) / 100;
    this.updateDocumentMetadata();
  },

  updateDocumentMetadata(customTitle = null, customDesc = null) {
    const char = this.getActiveChar();
    const cls = char ? this.getClassData(char.classId) : null;
    const race = char ? this.getRaceData(char.raceId) : null;

    const tabTitles = {
      characters: "Galeria Bohaterów — Kroniki D&D 5e",
      builder: char ? `Kreator: ${char.name} (${race ? race.name_pl : ''} ${cls ? cls.name_pl : ''} Poz. ${char.level}) — Kroniki D&D 5e` : "Kreator Postaci (1–20) — Kroniki D&D 5e",
      sheet: char ? `Karta Postaci: ${char.name} (${cls ? cls.name_pl : ''} Poz. ${char.level}) — Kroniki D&D 5e` : "Interaktywna Karta Postaci — Kroniki D&D 5e",
      spells: (this.state.spellFilters && this.state.spellFilters.onlyCharSpells && char)
        ? `Księga Zaklęć Bohatera: ${char.name} (${(char.knownSpells||[]).length} czarów) — Kroniki D&D 5e`
        : `Księga Zaklęć D&D 5e (${(window.DND_SPELLS||[]).length} czarów, Kręgi 0–9) — Kroniki D&D 5e`,
      bestiary: `Bestiariusz D&D 5e (${(window.DND_MONSTERS||[]).length} potworów AideDD, SW 0–30) — Kroniki D&D 5e`,
      compendium: `Kompendium Wikidot D&D 5e (73 Rasy, 13 Klas, 79 Podklas, 255 Przedmiotów) — Kroniki D&D 5e`
    };

    const finalTitle = customTitle || tabTitles[this.state.tab] || "Kroniki D&D 5e — Kreator, Karta Postaci, Księga Zaklęć & Bestiariusz";
    const finalDesc = customDesc || "Kroniki D&D 5e — Interaktywny Kreator Postaci (poziomy 1–20), Karta Postaci, Księga Zaklęć (Kręgi 0–9), 73 Rasy, 13 Klas, 79 Podklas, 255 Magicznych Przedmiotów i Bestiariusz 114 Potworów wg Wikidot 5e i AideDD.";

    if (typeof document !== "undefined") {
      document.title = finalTitle;
      const setMeta = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute("content", val);
      };
      setMeta("meta-description", finalDesc);
      setMeta("meta-og-title", finalTitle);
      setMeta("meta-og-desc", finalDesc);
      setMeta("meta-tw-title", finalTitle);
      setMeta("meta-tw-desc", finalDesc);
    }
  },

  translateDOMHtmlToEn(html) {
    const dict = [
      ["🛡️ Galeria Bohaterów D&D 5e", "🛡️ D&D 5e Character Roster"],
      ["Twórz nowe postacie według zasad Wikidot D&D 5e, rozwijaj je od 1 do 20 poziomu i zarządzaj nimi na PC lub telefonie.", "Create and level up D&D 5e characters (levels 1–20) using official Wikidot data across PC and mobile."],
      ["➕ Stwórz Nową Postać", "➕ Create New Character"],
      ["📥 Eksport / Import JSON &amp; Wikidot", "📥 Export / Import JSON &amp; Wikidot"],
      ["📜 Otwórz Kartę", "📜 Open Sheet"],
      ["✨ Edytuj / Awansuj (Poz.", "✨ Edit / Level Up (Lvl"],
      ["Aktywna", "Active"],
      ["❤️ PW:", "❤️ HP:"],
      ["🛡️ KP:", "🛡️ AC:"],
      ["⚡ Biegłość:", "⚡ Proficiency:"],
      ["🔮 Czary:", "🔮 Spells:"],
      ["✨ Kreator &amp; Rozwój Postaci:", "✨ Character Builder &amp; Progression:"],
      ["📜 Widok Karty Postaci", "📜 Character Sheet View"],
      ["🔮 Wybierz Zaklęcia", "🔮 Choose Spells"],
      ["1. Rasa &amp; Rodowód", "1. Race &amp; Lineage"],
      ["1. Rasa & Rodowód", "1. Race & Lineage"],
      ["2. Klasa &amp; Podklasa", "2. Class &amp; Subclass"],
      ["2. Klasa & Podklasa", "2. Class & Subclass"],
      ["3. Cechy (Point Buy / Rzuty)", "3. Ability Scores (Point Buy / Roll)"],
      ["4. Tło, Umiejętności &amp; Atuty", "4. Background, Skills &amp; Feats"],
      ["4. Tło, Umiejętności & Atuty", "4. Background, Skills & Feats"],
      ["5. Rozwój 1–20 (Tabela Wikidot)", "5. Progression 1–20 (Wikidot Table)"],
      ["6. Ekwipunek &amp; Podsumowanie", "6. Equipment &amp; Summary"],
      ["6. Ekwipunek & Podsumowanie", "6. Equipment & Summary"],
      ["Tożsamość Postaci", "Character Identity"],
      ["Imię Bohatera", "Character Name"],
      ["Ikona / Awatar", "Icon / Avatar"],
      ["Charakter (Alignment)", "Alignment"],
      ["Wybierz Rasę / Rodowód", "Choose Race / Lineage"],
      ["grywalnych ras z Wikidot 5e", "playable lineages from Wikidot 5e"],
      ["Wszystkie Kategorie Ras", "All Lineage Categories"],
      ["Wybierz Klasę (Wszystkie 13 klas oficjalnych D&D 5e)", "Choose Class (All 13 Official D&D 5e Classes)"],
      ["Kość Wytrzymałości:", "Hit Die:"],
      ["Rzuty obronne:", "Saving Throws:"],
      ["Główna cecha:", "Primary Ability:"],
      ["🔮 Magia:", "🔮 Spellcasting:"],
      ["⚔️ Klasa Bojowa", "⚔️ Martial Class"],
      ["Podklasa od", "Subclass at"],
      ["Wybierz Podklasę:", "Choose Subclass:"],
      ["✓ Wybrana", "✓ Selected"],
      ["do Inicjatywy", "to Initiative"],
      ["do KP", "to AC"],
      ["🔥 Przełącznik Bojowy", "🔥 Combat Toggle"],
      ["Zaklęć Podklasy", "Subclass Spells"],
      ["Wartości Cech (Ability Scores)", "Ability Scores"],
      ["Premia rasowa dla", "Racial bonus for"],
      ["🎲 Rzuć 4k6 (odrzuć najniższą)", "🎲 Roll 4d6 (Drop Lowest)"],
      ["Koszt Point Buy (8–15):", "Point Buy Cost (8–15):"],
      ["Główna cecha", "Primary"],
      ["Rzut obronny", "Saving Throw"],
      ["📜 Pochodzenie / Tło (Background)", "📜 Background"],
      ["Biegłości z tła:", "Background Skills:"],
      ["Narzędzia / Języki:", "Tools / Languages:"],
      ["Cecha tła:", "Background Feature:"],
      ["🎯 Umiejętności (Biegłość &amp; Ekspertyza)", "🎯 Skills (Proficiency &amp; Expertise)"],
      ["🌟 Atuty (Feats z Wikidot 5e", "🌟 Feats (Wikidot 5e"],
      ["✓ Posiadany", "✓ Acquired"],
      ["Wymóg:", "Prerequisite:"],
      ["⬆️ Poziom Postaci i Punkty Wytrzymałości", "⬆️ Character Level &amp; Hit Points"],
      ["Poziom:", "Level:"],
      ["Poziom ", "Level "],
      ["❤️ Przelicz PW wg średniej", "❤️ Recalculate Average HP"],
      ["Cechy Klasowe (Wikidot D&amp;D 5e)", "Class Features (Wikidot D&amp;D 5e)"],
      ["Biegłość", "Proficiency"],
      ["Sztuczki", "Cantrips"],
      ["Kość Sztuk Walki", "Martial Arts"],
      ["Pkt Ki", "Ki Points"],
      ["Ruch", "Movement"],
      ["Ukradkowy Atak", "Sneak Attack"],
      ["Pkt Zaklinania", "Sorcery Points"],
      ["Znane Infuzje", "Infusions Known"],
      ["Nasycone Przedm.", "Infused Items"],
      ["Komórki Paktu", "Pact Slots"],
      ["Krąg Paktu", "Slot Level"],
      ["Inwokacje", "Invocations"],
      ["🛡️ Pancerz i Klasa Pancerza", "🛡️ Armor &amp; Armor Class"],
      ["Noszony Pancerz / Formuła KP", "Equipped Armor / AC Formula"],
      ["Wyposażona Tarcza (+2 do KP)", "Shield Equipped (+2 AC)"],
      ["Startowy Ekwipunek Klasy", "Starting Class Equipment"],
      ["🎒 Ekwipunek &amp; Notatki Bohatera", "🎒 Equipment &amp; Character Notes"],
      ["➕ Dodaj", "➕ Add"],
      ["📜 Przejdź do Karty Postaci →", "📜 Go to Character Sheet →"],
      ["⛺ Krótki Odpoczynek", "⛺ Short Rest"],
      ["🌙 Długi Odpoczynek", "🌙 Long Rest"],
      ["⬆️ Awansuj (Poz.", "⬆️ Level Up (Lvl"],
      ["🖨️ Drukuj / PDF", "🖨️ Print / PDF"],
      ["⚡ Cechy Główne (Kliknij, by rzucić k20)", "⚡ Ability Scores (Click to roll d20)"],
      ["🛡️ Rzuty Obronne (Saving Throws)", "🛡️ Saving Throws"],
      ["🎯 Umiejętności (Skills)", "🎯 Skills"],
      ["Klasa Pancerza", "Armor Class (AC)"],
      ["🎲 Inicjatywa", "🎲 Initiative"],
      ["Premia Biegłości", "Proficiency Bonus"],
      ["Pasywna Percepcja", "Passive Perception"],
      ["Szybkość", "Speed"],
      ["✨ Podklasa:", "✨ Subclass:"],
      ["Kliknij wybraną zdolność podklasy, aby rzucić jej kośćmi lub aktywować bonus bojowy", "Click any subclass feature below to roll its dice or activate its combat bonus"],
      ["🔥 AKTYWNE: ", "🔥 ACTIVE: "],
      ["⚡ Włącz: ", "⚡ Activate: "],
      ["✓ Doliczono", "✓ Applied"],
      ["do Klasy Pancerza", "to Armor Class"],
      ["✨ Użyj", "✨ Use"],
      ["❤️ Punkty Wytrzymałości (Hit Points)", "❤️ Hit Points (HP)"],
      ["Kości Wytrzymałości:", "Hit Dice:"],
      ["💥 Obrażenia", "💥 Damage"],
      ["💚 Leczenie", "💚 Heal"],
      ["Tymczasowe PW:", "Temp HP:"],
      ["🔮 Rzucanie Zaklęć", "🔮 Spellcasting"],
      ["Kliknij komórkę czaru, aby ją zużyć lub odnowić", "Click a spell slot pip to expend or restore it"],
      ["ST Czarów (DC):", "Spell Save DC:"],
      ["Atak Czarem:", "Spell Attack:"],
      ["Komórki Magii Paktu", "Pact Magic Slots"],
      ["Krąg ", "Level "],
      ["Znane / Przygotowane Zaklęcia", "Known / Prepared Spells"],
      ["➕ Zarządzaj w Księdze Zaklęć", "➕ Manage in Spellbook"],
      ["⚔️ Zdolności Klasowe, Rasowe i Atuty", "⚔️ Class, Racial Features &amp; Feats"],
      ["Wszystkie Odblokowane Cechy Klasowe", "All Unlocked Class Features"],
      ["⚠️ Stany i Koncentracja (Conditions)", "⚠️ Conditions &amp; Concentration"],
      ["🎒 Ekwipunek i Uzbrojenie", "🎒 Equipment &amp; Inventory"],
      ["📝 Notatki Sesyjne", "📝 Session Notes"],
      ["🔮 Księga Zaklęć D&amp;D 5e (Wikidot Spellbook)", "🔮 D&amp;D 5e Spellbook (Wikidot)"],
      ["➕ Dodaj Zaklęcie z Wikidot", "➕ Add Custom / Wikidot Spell"],
      ["Wszystkie Kręgi", "All Levels"],
      ["0. Sztuczki / Cantrips", "0. Cantrips"],
      [". Krąg", " Level"],
      ["Wszystkie Klasy Czarujące", "All Spellcasting Classes"],
      ["Wszystkie Szkoły Magii", "All Schools of Magic"],
      ["🕯️ Rytuał", "🕯️ Ritual"],
      ["🧠 Koncentracja", "🧠 Concentration"],
      ["📜 Tylko Księga:", "📜 Only Character Spellbook:"],
      ["✨ Krąg 0 — Sztuczki (Cantrips)", "✨ Level 0 — Cantrips"],
      ["Sztuczka", "Cantrip"],
      ["Klasy:", "Classes:"],
      ["📖 Szczegóły", "📖 Details"],
      ["✓ W Księdze", "✓ In Spellbook"],
      ["➕ Do Postaci", "➕ Add to Character"],
      ["🎲 Rzuć ", "🎲 Roll "],
      ["📚 Kompendium Wikidot D&amp;D 5e", "📚 Wikidot D&amp;D 5e Compendium"],
      ["⚔️ Klasy i Rozwój 1–20", "⚔️ Classes &amp; Progression 1–20"],
      ["🧝 Rasy i Rodowody", "🧝 Races &amp; Lineages"],
      ["🌟 Atuty / Feats", "🌟 Feats"],
      ["📜 Tła", "📜 Backgrounds"],
      ["Tabela Rozwoju Klasy (Poziomy 1–20 wg Wikidot)", "Class Progression Table (Levels 1–20 — Wikidot)"],
      ["Podklasy:", "Subclasses:"],
      ["Biegłość w pancerzach:", "Armor Proficiencies:"],
      ["Biegłość w broniach:", "Weapon Proficiencies:"]
    ];

    let out = html;
    for (const [plStr, enStr] of dict) {
      out = out.split(plStr).join(enStr);
    }
    return out;
  },

  // ============================================================================
  // TAB 1: BOHATEROWIE (ROSTER)
  // ============================================================================
  renderCharactersTab() {
    const cardsHtml = this.state.characters.map(c => {
      const cls = this.getClassData(c.classId);
      const race = this.getRaceData(c.raceId);
      const sub = (cls.subclasses || []).find(s => s.id === c.subclassId);
      const isSelected = c.id === this.state.activeCharId;
      const ac = this.calcAC(c);
      const pb = this.getProfBonus(c.level);

      return `
        <div class="card ${isSelected ? 'selected' : ''}">
          <div class="card-header">
            <div style="display:flex;align-items:center;gap:12px;">
              ${this.renderCharacterPortrait(c, 56)}
              <div>
                <div class="card-title">${c.name}</div>
                <div style="font-size:0.83rem;color:var(--text-muted);">
                  ${this.tPlain(race.name_pl, race.name_en)} • <strong style="color:var(--gold);">${this.tPlain(cls.name_pl, cls.name_en)} ${c.level}</strong>
                </div>
                ${sub ? `<div style="font-size:0.76rem;color:var(--arcane-bright);">${this.tPlain(sub.name_pl, sub.name_en)}</div>` : ''}
              </div>
            </div>
            ${isSelected ? `<span class="badge badge-gold">Aktywna</span>` : ''}
          </div>

          <div class="badge-row" style="margin:12px 0;">
            <span class="badge badge-emerald">❤️ PW: ${c.hpCurrent}/${c.hpMax}</span>
            <span class="badge badge-gold">🛡️ KP: ${ac}</span>
            <span class="badge badge-arcane">⚡ Biegłość: +${pb}</span>
            <span class="badge badge-cyan" onclick="App.openCharacterSpellbook('${c.id}')" style="cursor:pointer;" title="Otwórz własną Księgę Zaklęć tej postaci">🔮 Księga Zaklęć: ${(c.knownSpells || []).length} ↗</span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;text-align:center;background:var(--bg-deep);padding:8px;border-radius:8px;margin-bottom:14px;">
            ${window.DND_ABILITIES.map(ab => {
              const sc = c.abilities[ab.id] || 10;
              const md = this.fmtMod(this.getMod(sc));
              return `<div><div style="font-size:0.65rem;color:var(--text-muted);">${ab.short_pl}</div><div style="font-weight:700;font-size:0.85rem;color:var(--gold-bright);">${sc} (${md})</div></div>`;
            }).join("")}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <button class="btn-primary btn-sm" onclick="App.selectCharacter('${c.id}', 'sheet')">📜 Otwórz Kartę</button>
            <button class="btn-secondary btn-sm" onclick="App.openCharacterSpellbook('${c.id}')">📖 Księga Zaklęć (${(c.knownSpells || []).length})</button>
            <button class="btn-secondary btn-sm" onclick="App.selectCharacter('${c.id}', 'builder')">✨ Edytuj / Awansuj (Poz. ${c.level})</button>
            <button class="btn-ghost btn-sm" onclick="App.openLevelUpModal('${c.id}')">⬆️ Level Up</button>
            <button class="btn-danger btn-sm" onclick="App.deleteCharacter('${c.id}')" title="Usuń postać">🗑️</button>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="section-header">
        <div>
          <h1 class="section-title">🛡️ Galeria Bohaterów D&D 5e</h1>
          <p class="section-subtitle">Twórz nowe postacie według zasad Wikidot D&D 5e, rozwijaj je od 1 do 20 poziomu i zarządzaj nimi na PC lub telefonie.</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn-primary" onclick="App.createNewCharacter()">➕ Stwórz Nową Postać</button>
          <button class="btn-secondary" onclick="App.openSyncModal()">📥 Eksport / Import JSON &amp; Wikidot</button>
        </div>
      </div>

      <div class="grid-cards">
        ${cardsHtml}
      </div>
    `;
  },

  selectCharacter(charId, targetTab = null) {
    this.state.activeCharId = charId;
    this.saveState();
    if (targetTab) {
      this.switchTab(targetTab);
    } else {
      this.render();
    }
  },

  createNewCharacter() {
    const newChar = {
      id: "char-" + Date.now(),
      name: "Nowy Bohater",
      avatar: "⚔️",
      raceId: "human-variant",
      classId: "fighter",
      subclassId: "battle-master",
      backgroundId: "folk-hero",
      level: 1,
      alignment: "Neutralny Dobry (NG)",
      xp: 0,
      abilities: { STR: 16, DEX: 14, CON: 14, INT: 10, WIS: 12, CHA: 10 },
      hpMax: 12,
      hpCurrent: 12,
      hpTemp: 0,
      armorType: "medium",
      shieldEquipped: true,
      acManualBonus: 0,
      inspiration: false,
      skillProficiencies: ["Athletics", "Perception", "Survival", "Animal Handling"],
      skillExpertises: [],
      feats: [],
      conditions: [],
      knownSpells: [],
      preparedSpells: [],
      usedSlots: {},
      hitDiceUsed: 0,
      inventory: ["Długi miecz (1k8 cięte)", "Tarcza (+2 KP)", "Zbroja łuskowa", "Pakiet odkrywcy", "Sakiewka (15 sz)"],
      notes: ""
    };
    newChar.hpMax = this.calcRecommendedMaxHP(newChar);
    newChar.hpCurrent = newChar.hpMax;
    this.state.characters.unshift(newChar);
    this.state.activeCharId = newChar.id;
    this.state.builderStep = 1;
    this.saveState();
    this.switchTab("builder");
    this.toast("Utworzono nową postać — skonfiguruj ją w Kreatorze!");
  },

  deleteCharacter(charId) {
    if (this.state.characters.length <= 1) {
      this.toast("Musi pozostać przynajmniej jedna postać.");
      return;
    }
    this.state.characters = this.state.characters.filter(c => c.id !== charId);
    if (this.state.activeCharId === charId) {
      this.state.activeCharId = this.state.characters[0].id;
    }
    this.saveState();
    this.render();
    this.toast("Usunięto postać.");
  },

  // ============================================================================
  // TAB 2: KREATOR & ROZWÓJ POSTACI (POZIOMY 1–20 WIKIDOT)
  // ============================================================================
  renderBuilderTab() {
    const char = this.getActiveChar();
    if (!char) return `<p>Brak wybranej postaci.</p>`;
    const cls = this.getClassData(char.classId);
    const race = this.getRaceData(char.raceId);
    const bg = this.getBgData(char.backgroundId);
    const step = this.state.builderStep;

    const steps = [
      { n: 1, label: "1. Rasa & Rodowód" },
      { n: 2, label: "2. Klasa & Podklasa" },
      { n: 3, label: "3. Cechy (Point Buy / Rzuty)" },
      { n: 4, label: "4. Tło, Umiejętności & Atuty" },
      { n: 5, label: "5. Rozwój 1–20 (Tabela Wikidot)" },
      { n: 6, label: "6. Ekwipunek & Podsumowanie" }
    ];

    let stepContent = "";

    // KROK 1: RASA
    if (step === 1) {
      const rfSearch = (this.state.raceFilterSearch || "").toLowerCase();
      const rfCat = this.state.raceFilterCat || "all";
      const filteredRaces = window.DND_RACES.filter(r => {
        if (rfCat !== "all" && !(r.category || "").toLowerCase().includes(rfCat.toLowerCase())) return false;
        if (rfSearch) {
          const m = (r.name_pl || "").toLowerCase().includes(rfSearch) ||
                    (r.name_en || "").toLowerCase().includes(rfSearch) ||
                    (r.source || "").toLowerCase().includes(rfSearch) ||
                    (r.traits_pl || []).join(" ").toLowerCase().includes(rfSearch);
          if (!m) return false;
        }
        return true;
      });

      stepContent = `
        <div class="card" style="margin-bottom:18px;">
          <h3 class="card-title" style="margin-bottom:10px;">Tożsamość i Portret Postaci</h3>
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px;">
            ${this.renderCharacterPortrait(char, 68)}
            <div style="flex:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;">
              <div>
                <label style="font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:4px;">Imię Bohatera</label>
                <input type="text" value="${char.name}" oninput="App.updateCharField('name', this.value)" style="width:100%;">
              </div>
              <div>
                <label style="font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:4px;">Wyświetlany Portret</label>
                <div style="display:flex;gap:6px;">
                  <select onchange="App.updateCharField('portraitMode', this.value); App.render();" style="flex:1;">
                    <option value="race" ${(char.portraitMode||'race')==='race'?'selected':''}>🧝 Portret Rasy + Herb Klasy</option>
                    <option value="class" ${char.portraitMode==='class'?'selected':''}>⚔️ Portret Klasy + Herb Rasy</option>
                    ${char.customPortraitUrl ? `<option value="custom" ${char.portraitMode==='custom'?'selected':''}>🖼️ Własny Wgrany Portret</option>` : ''}
                    <option value="emoji" ${char.portraitMode==='emoji'?'selected':''}>✨ Klasyczna Ikona Emoji</option>
                  </select>
                  <label class="btn-secondary btn-sm" style="cursor:pointer;white-space:nowrap;" title="Wgraj własny plik graficzny portretu z dysku">
                    📂 Wgraj
                    <input type="file" accept="image/*" style="display:none;" onchange="App.uploadCustomPortrait(event)">
                  </label>
                </div>
              </div>
              <div>
                <label style="font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:4px;">Charakter (Alignment)</label>
                <select onchange="App.updateCharField('alignment', this.value)" style="width:100%;">
                  ${["Praworządny Dobry (LG)", "Neutralny Dobry (NG)", "Chaotyczny Dobry (CG)", "Praworządny Neutralny (LN)", "Prawdziwie Neutralny (N)", "Chaotyczny Neutralny (CN)", "Praworządny Zły (LE)", "Neutralny Zły (NE)", "Chaotyczny Zły (CE)"].map(al => `<option value="${al}" ${char.alignment===al?'selected':''}>${al}</option>`).join("")}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;">
          <div>
            <h3 style="font-family:var(--font-display);color:var(--gold);">Wybierz Rasę / Rodowód (${filteredRaces.length} z ${window.DND_RACES.length} grywalnych ras z Wikidot 5e)</h3>
            <p style="font-size:0.8rem;color:var(--text-muted);">Duże karty 2×2 z pełnymi danymi anatomicznymi i mechanicznymi. Najbardziej rozbudowane rasy (z tabelami podtypów i żywiołów) automatycznie rozszerzają się do rozmiaru XL.</p>
          </div>
          <button class="btn-secondary btn-sm" onclick="App.state.raceForceXL = !App.state.raceForceXL; App.render();">
            ${this.state.raceForceXL ? '🔲 Układ 2×2 + Auto XL' : '🔳 Powiększ wszystkie karty na pełną szerokość (XL)'}
          </button>
        </div>

        <div class="filter-bar">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Szukaj rasy, cechy lub podręcznika (np. Bugbear, Shadar-kai, Tortle, Githyanki, Plasmoid, Elf, Fizban)..." value="${this.state.raceFilterSearch || ''}" oninput="App.state.raceFilterSearch=this.value;App.render();">
          </div>
          <select onchange="App.state.raceFilterCat=this.value;App.render();">
            <option value="all" ${rfCat==='all'?'selected':''}>Wszystkie Kategorie Ras (${window.DND_RACES.length})</option>
            <option value="Core" ${rfCat==='Core'?'selected':''}>Podstawowe, Podrasy &amp; Smoki Fizbana (PHB / FTD)</option>
            <option value="Multiverse" ${rfCat==='Multiverse'?'selected':''}>Egzotyczne &amp; Wieloświat (MPMM / Volo / MToF)</option>
            <option value="Monstrous" ${rfCat==='Monstrous'?'selected':''}>Potworne (Goblin, Bugbear, Hobgoblin, Kobold, Ork)</option>
            <option value="Ravenloft" ${rfCat==='Ravenloft'?'selected':''}>Rodowody z Ravenloftu (Dhampir, Hexblood, Reborn)</option>
            <option value="Eberron" ${rfCat==='Eberron'?'selected':''}>Eberron (Warforged, Changeling, Kalashtar, Shifter)</option>
            <option value="Ravnica" ${rfCat==='Ravnica'?'selected':''}>Ravnica, Theros &amp; Strixhaven (Loxodon, Leonin, Owlin, Vedalken...)</option>
            <option value="Spelljammer" ${rfCat==='Spelljammer'?'selected':''}>Spelljammer &amp; Dragonlance (Astral Elf, Plasmoid, Thri-kreen, Kender...)</option>
          </select>
        </div>

        <div class="grid-races-detailed ${this.state.raceForceXL ? 'all-xl' : ''}">
          ${filteredRaces.map(r => this.renderDetailedRaceCard(r, char.raceId === r.id, true)).join("")}
        </div>
      `;
    }

    // KROK 2: KLASA I PODKLASA
    else if (step === 2) {
      stepContent = `
        <h3 style="font-family:var(--font-display);color:var(--gold);margin-bottom:12px;">Wybierz Klasę (Wszystkie 13 klas oficjalnych D&D 5e)</h3>
        <div class="grid-cards" style="margin-bottom:24px;">
          ${window.DND_CLASSES.map(c => `
            <div class="card ${char.classId === c.id ? 'selected' : ''}" onclick="App.setCharClass('${c.id}')" style="cursor:pointer;">
              <div class="card-header">
                <div style="display:flex;align-items:center;gap:12px;">
                  <img src="${this.getClassPortrait(c.id)}" alt="${c.name_pl}" class="portrait-thumb">
                  <div>
                    <div class="card-title">${this.t(c.name_pl, c.name_en)}</div>
                    <span style="font-size:0.75rem;color:var(--text-muted);">Kość Wytrzymałości: <strong>k${c.hit_die}</strong> • Rzuty obronne: <strong>${c.saving_throws.join(", ")}</strong></span>
                  </div>
                </div>
                <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openClassDetailModal('${c.id}')" title="Otwórz pełną podstronę klasy i tabelę rozwoju 1-20">
                  📖 Podstrona Klasy
                </button>
              </div>
              <div style="font-size:0.83rem;color:var(--text-main);margin-bottom:8px;">${this.tDesc(c)}</div>
              <div class="badge-row">
                <span class="badge badge-gold">Główna cecha: ${c.primary_ability.join("/")}</span>
                ${c.spellcasting_ability ? `<span class="badge badge-arcane">🔮 Magia: ${c.spellcasting_ability}</span>` : `<span class="badge">⚔️ Klasa Bojowa</span>`}
                <span class="badge badge-emerald">Podklasa od ${c.subclass_level}. poz.</span>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
            <div>
              <h3 class="card-title" style="margin-bottom:4px;">${cls.icon} Wybierz Podklasę: ${this.t(cls.subclass_title_pl, cls.subclass_title_en)} (od ${cls.subclass_level}. poziomu)</h3>
              <p style="font-size:0.8rem;color:var(--text-muted);">Duże karty 2×2 z kompletnym opisem wszystkich zdolności na każdym poziomie podklasy, zaklęciami podklasowymi i przyciskiem otwarcia pełnej podstrony.</p>
            </div>
            <button class="btn-secondary btn-sm" onclick="App.openClassDetailModal('${cls.id}')">
              📖 Pełna Podstrona Klasy ${cls.name_pl} (Tabela 1–20)
            </button>
          </div>
          <div class="grid-subclasses-detailed">
            ${(cls.subclasses || []).map(sc => this.renderDetailedSubclassCard(cls, sc, char.subclassId === sc.id, true)).join("")}
          </div>
        </div>
      `;
    }

    // KROK 3: WARTOŚCI CECH (ABILITY SCORES)
    else if (step === 3) {
      const pointBuyCosts = { 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9 };
      let pbSpent = 0;
      window.DND_ABILITIES.forEach(ab => {
        const val = Math.min(15, Math.max(8, char.abilities[ab.id] || 10));
        pbSpent += (pointBuyCosts[val] || 0);
      });
      const pool = this.state.rolledPool || [];

      stepContent = `
        <div class="card" style="margin-bottom:18px;">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
            <div>
              <h3 class="card-title">Wartości Cech (Ability Scores)</h3>
              <p style="font-size:0.83rem;color:var(--text-muted);">Premia rasowa dla <strong>${this.tPlain(race.name_pl, race.name_en)}</strong>: ${race.asi_desc_pl}</p>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn-secondary btn-sm" onclick="App.applyStandardArray()">📏 Standard Array (15,14,13,12,10,8)</button>
              <button class="btn-primary btn-sm" onclick="App.roll4d6DropLowest()">🎲 Rzuć 6× (4k6 odrzuć najniższą) do Puli</button>
              <span class="badge badge-gold" style="font-size:0.84rem;padding:6px 12px;">Koszt Point Buy (8–15): ${pbSpent} / 27 pkt</span>
            </div>
          </div>

          ${pool.length > 0 ? `
            <div class="card" style="background:linear-gradient(135deg, rgba(139,92,246,0.16), rgba(229,193,88,0.1));border:1.5px solid var(--gold);margin-bottom:18px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
                <div>
                  <strong style="color:var(--gold-bright);font-size:0.95rem;">🎲 Pula Wylosowanych Wyników — Przypisz każdy wynik do dowolnej cechy!</strong>
                  <div style="font-size:0.78rem;color:var(--text-muted);">Kliknij wybrany kafelek wyniku poniżej, a następnie kliknij wybraną Cechę (SIŁ, ZRĘ, KON, INT, MĄD, CHA), aby go tam ulokować (lub użyj listy rozwijanej przy wyniku).</div>
                </div>
                <div style="display:flex;gap:8px;">
                  <button class="btn-secondary btn-sm" onclick="App.autoAssignPoolToClass()">✨ Auto-dopasuj do klasy (${cls.primary_ability.join("/")})</button>
                  <button class="btn-ghost btn-sm" onclick="App.state.rolledPool=[];App.state.selectedPoolIdx=null;App.render();">✕ Zamknij pulę</button>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:10px;">
                ${pool.map((item, idx) => {
                  const isSel = this.state.selectedPoolIdx === idx;
                  return `
                    <div class="card ${isSel ? 'selected' : ''}" onclick="App.selectPoolItem(${idx})" style="padding:10px;background:var(--bg-deep);text-align:center;cursor:pointer;border-color:${item.assignedTo ? 'var(--emerald)' : (isSel ? 'var(--gold)' : 'var(--border-subtle)')};">
                      <div style="font-size:1.55rem;font-family:var(--font-display);font-weight:800;color:var(--gold-bright);line-height:1.1;">
                        ${item.val} <span style="font-size:0.85rem;color:var(--text-muted);">(${this.fmtMod(this.getMod(item.val))})</span>
                      </div>
                      <div style="font-size:0.72rem;font-family:var(--font-mono);color:var(--text-muted);margin:4px 0 8px;">
                        ${item.detail}
                      </div>
                      <select onclick="event.stopPropagation()" onchange="App.assignPoolItemToAbility(${idx}, this.value)" style="width:100%;padding:5px;font-size:0.78rem;">
                        <option value="">— Przypisz do cechy —</option>
                        ${window.DND_ABILITIES.map(ab => `
                          <option value="${ab.id}" ${item.assignedTo === ab.id ? 'selected' : ''}>${ab.short_pl} (${ab.name_pl})</option>
                        `).join("")}
                      </select>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          ` : ''}

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;">
            ${window.DND_ABILITIES.map(ab => {
              const score = char.abilities[ab.id] || 10;
              const mod = this.getMod(score);
              const isPrimary = cls.primary_ability.includes(ab.id);
              const isSave = cls.saving_throws.includes(ab.id);
              const waitingAssign = this.state.selectedPoolIdx !== null && pool[this.state.selectedPoolIdx];
              return `
                <div class="card" onclick="${waitingAssign ? `App.assignPoolItemToAbility(${this.state.selectedPoolIdx}, '${ab.id}')` : ''}" style="background:var(--bg-deep);text-align:center;cursor:${waitingAssign ? 'pointer' : 'default'};border-color:${waitingAssign ? 'var(--arcane-bright)' : (isPrimary ? 'var(--gold)' : 'var(--border-subtle)')};">
                  <div style="font-weight:700;color:var(--gold);font-size:0.9rem;">${this.t(ab.name_pl, ab.name_en)}</div>
                  ${waitingAssign ? `<div style="font-size:0.72rem;color:var(--arcane-bright);margin-top:2px;">📥 Kliknij, by wstawić <strong>${pool[this.state.selectedPoolIdx].val}</strong></div>` : ''}
                  <div style="font-size:2rem;font-family:var(--font-display);font-weight:800;margin:6px 0;">
                    ${this.fmtMod(mod)}
                  </div>
                  <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;" onclick="event.stopPropagation()">
                    <button class="btn-ghost btn-sm" onclick="App.changeAbility('${ab.id}', -1)">−</button>
                    <input type="number" min="1" max="30" value="${score}" onchange="App.setAbility('${ab.id}', this.value)" style="width:64px;text-align:center;font-weight:700;font-family:var(--font-mono);">
                    <button class="btn-ghost btn-sm" onclick="App.changeAbility('${ab.id}', 1)">+</button>
                  </div>
                  <div class="badge-row" style="justify-content:center;">
                    ${isPrimary ? `<span class="badge badge-gold">Główna cecha</span>` : ''}
                    ${isSave ? `<span class="badge badge-emerald">Rzut obronny</span>` : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // KROK 4: TŁO, UMIEJĘTNOŚCI I ATUTY
    else if (step === 4) {
      stepContent = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%, 320px),1fr));gap:18px;">
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
              <h3 class="card-title">📜 Pochodzenie / Tło (Background — ${window.DND_BACKGROUNDS.length})</h3>
              <button class="btn-secondary btn-sm" onclick="App.openBackgroundDetailModal('${char.backgroundId}')">
                📖 Pełny Opis Tła
              </button>
            </div>
            <select onchange="App.setCharBackground(this.value)" style="width:100%;margin-bottom:10px;">
              ${window.DND_BACKGROUNDS.map(b => `<option value="${b.id}" ${char.backgroundId===b.id?'selected':''}>${this.tPlain(b.name_pl, b.name_en)} (${b.skills.join(", ")})</option>`).join("")}
            </select>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:280px;overflow-y:auto;padding-right:4px;margin-bottom:12px;">
              ${window.DND_BACKGROUNDS.map(b => {
                const isBgSel = char.backgroundId === b.id;
                return `
                  <div class="card ${isBgSel ? 'selected' : ''}" onclick="App.setCharBackground('${b.id}')" style="cursor:pointer;padding:11px 13px;background:var(--bg-deep);flex-shrink:0;">
                    <div class="card-header" style="margin-bottom:4px;">
                      <div class="card-title" style="font-size:0.94rem;">${this.t(b.name_pl, b.name_en)}</div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openBackgroundDetailModal('${b.id}')" title="Otwórz podstronę tła">
                          📖 Opis
                        </button>
                        <span class="badge ${isBgSel ? 'badge-emerald' : 'badge-arcane'}">${isBgSel ? '✓ Wybrane' : b.skills.join(", ")}</span>
                      </div>
                    </div>
                    <div style="font-size:0.79rem;color:var(--text-main);"><strong>Cecha:</strong> ${b.feature_pl} • <strong>Narzędzia/Języki:</strong> ${b.tools_pl}</div>
                    <div style="font-size:0.78rem;color:var(--text-muted);margin-top:3px;">${b.desc_pl}</div>
                  </div>
                `;
              }).join("")}
            </div>

            <h3 class="card-title" style="margin:18px 0 10px;">🎯 Umiejętności (Biegłość &amp; Ekspertyza)</h3>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:10px;">Klasa ${cls.name_pl} pozwala wybrać ${cls.skills_choose} umiejętności z listy klasowej (+2 z tła). Kliknij, aby przełączyć Brak → Biegłość → Ekspertyza.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              ${window.DND_SKILLS.map(sk => {
                const isProf = (char.skillProficiencies || []).includes(sk.id);
                const isExp = (char.skillExpertises || []).includes(sk.id);
                const isClassSkill = cls.skills_list.includes(sk.id);
                return `
                  <div class="skill-row" onclick="App.cycleSkillProf('${sk.id}')" style="background:var(--bg-deep);border:1px solid ${isExp ? 'var(--arcane)' : (isProf ? 'var(--gold-dim)' : 'transparent')};">
                    <div>
                      <span class="skill-prof-dot ${isExp ? 'exp' : (isProf ? 'prof' : '')}"></span>
                      <span>${this.tPlain(sk.name_pl, sk.name_en)}</span>
                      ${isClassSkill ? `<span style="color:var(--gold);font-size:0.68rem;">★</span>` : ''}
                    </div>
                    <span style="font-size:0.72rem;color:var(--text-muted);">${sk.ability}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="card">
            <h3 class="card-title" style="margin-bottom:10px;">🌟 Atuty (Feats z Wikidot 5e — ${window.DND_FEATS.length})</h3>
            <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:10px;">Wybierz atuty zdobyte na poziomach ASI (4, 8, 12, 16, 19) lub z rasy Człowiek Wariant / Custom Lineage na 1. poziomie.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <input type="text" placeholder="Szukaj atutu (np. War Caster, Lucky, Elven, GWM, Chef)..." value="${this.state.featFilterSearch || ''}" oninput="App.state.featFilterSearch=this.value;App.render();" style="flex:1;min-width:160px;">
              <select onchange="App.state.featFilterCat=this.value;App.render();">
                <option value="all" ${(this.state.featFilterCat||'all')==='all'?'selected':''}>Wszystkie (${window.DND_FEATS.length})</option>
                <option value="PHB" ${this.state.featFilterCat==='PHB'?'selected':''}>PHB (Podręcznik Gracza)</option>
                <option value="Tasha" ${this.state.featFilterCat==='Tasha'?'selected':''}>Tasha's (TCE)</option>
                <option value="Xanathar" ${this.state.featFilterCat==='Xanathar'?'selected':''}>Atuty Rasowe (XGE)</option>
                <option value="Fizban" ${this.state.featFilterCat==='Fizban'?'selected':''}>Fizban, Bigby &amp; Światy</option>
              </select>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:520px;overflow-y:auto;padding-right:4px;">
              ${window.DND_FEATS.filter(ft => {
                const fc = this.state.featFilterCat || "all";
                const fs = (this.state.featFilterSearch || "").toLowerCase();
                if (fc !== "all" && !(ft.category || ft.source || "").toLowerCase().includes(fc.toLowerCase())) return false;
                if (fs) {
                  const m = (ft.name_pl || "").toLowerCase().includes(fs) ||
                            (ft.name_en || "").toLowerCase().includes(fs) ||
                            (ft.desc_pl || "").toLowerCase().includes(fs) ||
                            (ft.prereq || "").toLowerCase().includes(fs);
                  if (!m) return false;
                }
                return true;
              }).map(ft => {
                const hasFeat = (char.feats || []).includes(ft.id);
                return `
                  <div class="card ${hasFeat ? 'selected' : ''}" onclick="App.toggleCharFeat('${ft.id}')" style="cursor:pointer;padding:12px;background:var(--bg-deep);">
                    <div class="card-header" style="margin-bottom:6px;">
                      <div class="card-title" style="font-size:0.96rem;">${this.t(ft.name_pl, ft.name_en)}</div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openFeatDetailModal('${ft.id}')" title="Otwórz podstronę atutu">
                          📖 Opis
                        </button>
                        <span class="badge ${hasFeat ? 'badge-emerald' : 'badge-gold'}">${hasFeat ? '✓ Posiadany' : ft.source}</span>
                      </div>
                    </div>
                    <div class="badge-row" style="margin:4px 0;">
                      ${ft.asi ? `<span class="badge badge-emerald">${ft.asi}</span>` : ''}
                      ${ft.prereq ? `<span class="badge badge-arcane">Wymóg: ${ft.prereq}</span>` : ''}
                    </div>
                    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">${this.tDesc(ft)}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      `;
    }

    // KROK 5: ROZWÓJ POSTACI 1–20 (TABELA PROGRESJI WIKIDOT)
    else if (step === 5) {
      stepContent = `
        <div class="card" style="margin-bottom:18px;">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
            <div>
              <h3 class="card-title">⬆️ Poziom Postaci i Punkty Wytrzymałości (${cls.icon} ${this.tPlain(cls.name_pl, cls.name_en)})</h3>
              <p style="font-size:0.84rem;color:var(--text-muted);">Kliknij dowolny wiersz w tabeli rozwoju (1–20) poniżej lub użyj suwaka, aby awansować postać i automatycznie przeliczyć PW, biegłość oraz komórki czarów.</p>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              <label style="font-weight:700;color:var(--gold);">Poziom:</label>
              <select onchange="App.setCharacterLevel(parseInt(this.value, 10))" style="font-size:1.05rem;font-weight:700;color:var(--gold-bright);">
                ${Array.from({length:20}, (_,i)=>i+1).map(lvl => `<option value="${lvl}" ${char.level===lvl?'selected':''}>Poziom ${lvl}</option>`).join("")}
              </select>
              <button class="btn-primary btn-sm" onclick="App.recalcHPToRecommended()">❤️ Przelicz PW wg średniej (${this.calcRecommendedMaxHP(char)} PW)</button>
            </div>
          </div>
        </div>

        ${this.renderClassProgressionTable(cls, char.level, true)}
      `;
    }

    // KROK 6: EKWIPUNEK, KREATOR BRONI I PANCERZA
    else if (step === 6) {
      stepContent = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%, 300px),1fr));gap:18px;">
          <div class="card">
            <div class="card-header" style="margin-bottom:10px;">
              <div>
                <h3 class="card-title">🛡️ Pancerz i Klasa Pancerza (KP: ${this.calcAC(char)})</h3>
                <span style="font-size:0.76rem;color:var(--text-muted);">Skonfiguruj własny pancerz lub użyj szybkiego wyboru</span>
              </div>
              <button class="btn-primary btn-sm" onclick="App.openArmorCreatorModal()">🛠️ Kreator Pancerza i Tarczy</button>
            </div>

            ${char.customArmor && char.customArmor.enabled ? `
              <div style="background:linear-gradient(135deg, rgba(229,193,88,0.14), rgba(139,92,246,0.12));border:1px solid var(--gold);padding:10px 12px;border-radius:8px;margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                  <div>
                    <div style="font-weight:700;color:var(--gold-bright);">🛡️ Aktywny własny pancerz: ${char.customArmor.name}</div>
                    <div style="font-size:0.76rem;color:var(--text-muted);">
                      Bazowa KP: ${char.customArmor.baseAc}${char.customArmor.magicBonus ? ` • Premia magiczna +${char.customArmor.magicBonus}` : ''}
                      ${char.customArmor.adamantine ? ' • Adamantytowa (Brak Krytyków)' : ''}
                      ${char.customArmor.mithral ? ' • Mitrylowa' : ''}
                    </div>
                  </div>
                  <button class="btn-ghost btn-sm" onclick="App.openArmorCreatorModal()">✏️ Edytuj</button>
                </div>
              </div>
            ` : ''}

            <div style="display:flex;flex-direction:column;gap:10px;">
              <div>
                <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:4px;">Noszony Pancerz / Formuła KP ${char.customArmor && char.customArmor.enabled ? '(nadpisany przez Kreator Pancerza)' : ''}</label>
                <select onchange="App.customArmor=null; App.updateCharField('customArmor', null); App.updateCharField('armorType', this.value); App.render();" style="width:100%;">
                  <option value="none" ${char.armorType==='none'?'selected':''}>Brak pancerza (10 + ZRĘ)</option>
                  <option value="mage_armor" ${char.armorType==='mage_armor'?'selected':''}>Zbroja Maga / Smocza Łuska (13 + ZRĘ)</option>
                  <option value="unarmored_barb" ${char.armorType==='unarmored_barb'?'selected':''}>Obrona bez Pancerza Barbarzyńcy (10 + ZRĘ + KON)</option>
                  <option value="unarmored_monk" ${char.armorType==='unarmored_monk'?'selected':''}>Obrona bez Pancerza Mnicha (10 + ZRĘ + MĄD)</option>
                  <option value="light" ${char.armorType==='light'?'selected':''}>Lekki Pancerz — Ćwiekowana Skóra (12 + ZRĘ)</option>
                  <option value="medium" ${char.armorType==='medium'?'selected':''}>Średni Pancerz — Półpancerz (15 + ZRĘ maks. 2)</option>
                  <option value="heavy" ${char.armorType==='heavy'?'selected':''}>Ciężki Pancerz — Zbroja Płytowa (KP 18)</option>
                </select>
              </div>
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                  <input type="checkbox" ${char.shieldEquipped ? 'checked' : ''} onchange="App.updateCharField('shieldEquipped', this.checked); App.render();">
                  <span>Wyposażona Tarcza (+2${char.shieldMagicBonus ? ` +${char.shieldMagicBonus}` : ''} do KP)</span>
                </label>
                <div>
                  <label style="font-size:0.76rem;color:var(--text-muted);">Premia magiczna tarczy:</label>
                  <input type="number" min="0" max="5" value="${char.shieldMagicBonus || 0}" onchange="App.updateCharField('shieldMagicBonus', parseInt(this.value,10)||0); App.render();" style="width:65px;margin-left:4px;">
                </div>
              </div>
              <div>
                <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:4px;">Dodatkowa premia do KP (np. Pierścień Ochrony, Pieśń Ostrza, Tarcza Wiary)</label>
                <input type="number" value="${char.acManualBonus || 0}" onchange="App.updateCharField('acManualBonus', parseInt(this.value,10)||0); App.render();" style="width:110px;">
              </div>
            </div>

            <h4 style="color:var(--gold);margin:16px 0 8px;">Startowy Ekwipunek Klasy (${cls.name_pl})</h4>
            <ul style="padding-left:18px;font-size:0.83rem;color:var(--text-muted);">
              ${(this.state.lang === 'en' ? cls.starting_equipment_en : cls.starting_equipment_pl).map(eq => `<li>${eq}</li>`).join("")}
            </ul>
          </div>

          <div class="card">
            <div class="card-header" style="margin-bottom:10px;">
              <div>
                <h3 class="card-title">⚔️ Kreator Broni i Ataków (${(char.weapons || []).length})</h3>
                <span style="font-size:0.76rem;color:var(--text-muted);">Twórz własne bronie, dodawaj premie magiczne (+1/+2/+3) i dodatkowe kości żywiołów</span>
              </div>
              <button class="btn-primary btn-sm" onclick="App.openAddWeaponModal()">⚒️ Stwórz / Dodaj Broń</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
              ${(char.weapons || []).map((wp, idx) => {
                const st = this.calcWeaponStats(char, wp);
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;background:var(--bg-deep);padding:8px 10px;border-radius:8px;border:1px solid var(--border-subtle);">
                    <div>
                      <div style="font-weight:700;color:var(--gold-bright);font-size:0.88rem;">${wp.name}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted);">
                        Trafienie: <strong>${this.fmtMod(st.toHit)}</strong> • Obrażenia: <strong>${st.dmgFormula.replace(/d/g,'k')}</strong> ${wp.dmgType} • Zasięg: ${wp.range || '5 ft'}
                      </div>
                      ${wp.notes ? `<div style="font-size:0.72rem;color:var(--arcane-bright);">${wp.notes}</div>` : ''}
                    </div>
                    <div style="display:flex;gap:4px;">
                      <button class="btn-ghost btn-sm" onclick="App.openAddWeaponModal(${idx})" title="Edytuj broń">✏️</button>
                      <button class="btn-ghost btn-sm" onclick="App.removeWeapon(${idx})" title="Usuń broń">✕</button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <h3 class="card-title" style="margin-bottom:10px;">🎒 Ekwipunek &amp; Notatki Bohatera</h3>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <input type="text" id="new-item-input" placeholder="Dodaj przedmiot do plecaka..." style="flex:1;">
              <button class="btn-primary btn-sm" onclick="App.addInventoryItem()">➕ Dodaj</button>
            </div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">
              ${(char.inventory || []).map((item, idx) => `
                <li style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-deep);padding:7px 10px;border-radius:6px;font-size:0.84rem;">
                  <span>${item}</span>
                  <button class="btn-ghost btn-sm" onclick="App.removeInventoryItem(${idx})">✕</button>
                </li>
              `).join("")}
            </ul>

            <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:4px;">Notatki o postaci / Zdolności specjalne</label>
            <textarea rows="3" style="width:100%;" oninput="App.updateCharField('notes', this.value)">${char.notes || ""}</textarea>

            <div style="margin-top:14px;display:flex;justify-content:flex-end;">
              <button class="btn-primary" onclick="App.switchTab('sheet')">📜 Przejdź do Karty Postaci →</button>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top:18px;">
          <div class="card-header">
            <div>
              <h3 class="card-title">💍 Magiczne Przedmioty i Artefakty (DMG / TCE / XGE / FTD / EGW — ${window.DND_MAGIC_ITEMS.length})</h3>
              <p style="font-size:0.8rem;color:var(--text-muted);">Kliknij przedmiot, aby dodać go do ekwipunku postaci. Bonusy do KP, Cech (np. Pas Siły Giganta = 21–29 SIŁ, Amulet Zdrowia = 19 KON), Rzutów Obronnych i ST Czarów doliczają się automatycznie!</p>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <button class="btn-primary btn-sm" onclick="App.openCustomMagicItemModal()">➕ Stwórz Własny Magiczny Przedmiot</button>
              <span class="badge badge-arcane">Zestrojone (Attunement): ${this.getCharMagicItems(char).filter(i => i.attunement).length} / 3</span>
            </div>
          </div>
          <div class="filter-bar">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Szukaj przedmiotu (np. Płaszcz Ochrony, Flame Tongue, Bag of Holding, Tatuaż, Vecna, +2, +3)..." value="${this.state.itemFilterSearch || ''}" oninput="App.state.itemFilterSearch=this.value;App.render();">
            </div>
            <select onchange="App.state.itemFilterCat=this.value;App.render();">
              <option value="all" ${(this.state.itemFilterCat||'all')==='all'?'selected':''}>Wszystkie Kategorie (${window.DND_MAGIC_ITEMS.length})</option>
              <option value="Weapon" ${this.state.itemFilterCat==='Weapon'?'selected':''}>⚔️ Bronie Magiczne (Weapons)</option>
              <option value="Armor" ${this.state.itemFilterCat==='Armor'?'selected':''}>🛡️ Pancerze i Tarcze (Armor &amp; Shields)</option>
              <option value="Wondrous Item" ${this.state.itemFilterCat==='Wondrous Item'?'selected':''}>✨ Cudowne Przedmioty, Pasy, Płaszcze i Tatuaże</option>
              <option value="Spellcasting Focus" ${this.state.itemFilterCat==='Spellcasting Focus'?'selected':''}>🔮 Fokusy Klasowe (+1/+2/+3)</option>
              <option value="Ring" ${this.state.itemFilterCat==='Ring'?'selected':''}>💍 Pierścienie (Rings)</option>
              <option value="Rod" ${this.state.itemFilterCat==='Rod'?'selected':''}>👑 Berła (Rods)</option>
              <option value="Staff" ${this.state.itemFilterCat==='Staff'?'selected':''}>🪄 Kostury (Staves)</option>
              <option value="Wand" ${this.state.itemFilterCat==='Wand'?'selected':''}>⚡ Różdżki (Wands)</option>
              <option value="Potion" ${this.state.itemFilterCat==='Potion'?'selected':''}>🧪 Mikstury i Oleje (Potions)</option>
              <option value="Scroll" ${this.state.itemFilterCat==='Scroll'?'selected':''}>📜 Zwoje (Scrolls)</option>
              <option value="Artifact" ${this.state.itemFilterCat==='Artifact'?'selected':''}>🏆 Artefakty (Artifacts)</option>
            </select>
            <select onchange="App.state.itemFilterRarity=this.value;App.render();">
              <option value="all" ${(this.state.itemFilterRarity||'all')==='all'?'selected':''}>Wszystkie Rzadkości (${window.DND_MAGIC_ITEMS.length})</option>
              <option value="Common" ${this.state.itemFilterRarity==='Common'?'selected':''}>Pospolite (Common)</option>
              <option value="Uncommon" ${this.state.itemFilterRarity==='Uncommon'?'selected':''}>Niepospolite (Uncommon)</option>
              <option value="Rare" ${this.state.itemFilterRarity==='Rare'?'selected':''}>Rzadkie (Rare)</option>
              <option value="Very Rare" ${this.state.itemFilterRarity==='Very Rare'?'selected':''}>Bardzo Rzadkie (Very Rare)</option>
              <option value="Legendary" ${this.state.itemFilterRarity==='Legendary'?'selected':''}>Legendarne (Legendary)</option>
              <option value="Artifact" ${this.state.itemFilterRarity==='Artifact'?'selected':''}>Artefakty (Artifact)</option>
            </select>
          </div>
          ${(() => {
            const filteredItems = window.DND_MAGIC_ITEMS.filter(it => {
              const ir = this.state.itemFilterRarity || "all";
              const ic = this.state.itemFilterCat || "all";
              const is = (this.state.itemFilterSearch || "").toLowerCase();
              if (ir !== "all" && it.rarity !== ir) return false;
              if (ic !== "all" && it.category !== ic) return false;
              if (is) {
                const m = (it.name_pl || "").toLowerCase().includes(is) ||
                          (it.name_en || "").toLowerCase().includes(is) ||
                          (it.desc_pl || "").toLowerCase().includes(is) ||
                          (it.category || "").toLowerCase().includes(is);
                if (!m) return false;
              }
              return true;
            });
            const lim = (this.state.pageLimits && this.state.pageLimits.items) || 24;
            const visibleItems = filteredItems.slice(0, lim);
            return `
              <div class="grid-cards">
                ${visibleItems.map(it => {
                  const equipped = (char.magicItems || []).includes(it.id);
                  return `
                    <div class="card ${equipped ? 'selected' : ''}" onclick="App.toggleCharMagicItem('${it.id}')" style="cursor:pointer;background:var(--bg-deep);">
                      <div class="card-header">
                        <div class="card-title" style="font-size:0.98rem;">${this.t(it.name_pl, it.name_en)}</div>
                        <div style="display:flex;gap:6px;align-items:center;">
                          <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openMagicItemDetailModal('${it.id}')" title="Otwórz pełny opis przedmiotu">
                            📖 Opis
                          </button>
                          <span class="badge ${equipped ? 'badge-emerald' : 'badge-gold'}">${equipped ? '✓ Wyposażony' : it.rarity}</span>
                        </div>
                      </div>
                      <div class="badge-row">
                        <span class="badge">${it.category}</span>
                        ${it.attunement ? `<span class="badge badge-arcane">🔗 Zestrojenie</span>` : `<span class="badge badge-cyan">Bez zestrojenia</span>`}
                        ${it.bonus_ac ? `<span class="badge badge-gold">+${it.bonus_ac} KP</span>` : ''}
                        ${it.bonus_saves ? `<span class="badge badge-emerald">+${it.bonus_saves} Rzuty Obronne</span>` : ''}
                        ${it.bonus_spell_dc ? `<span class="badge badge-arcane">+${it.bonus_spell_dc} ST Czarów</span>` : ''}
                      </div>
                      <div style="font-size:0.81rem;color:var(--text-muted);margin-top:6px;">${this.tDesc(it)}</div>
                    </div>
                  `;
                }).join("")}
              </div>
              ${this.renderPaginationBar('items', filteredItems.length, visibleItems.length, 24)}
            `;
          })()}
        </div>
      `;
    }

    return `
      <div class="section-header">
        <div>
          <h1 class="section-title">✨ Kreator &amp; Rozwój Postaci: ${char.name}</h1>
          <p class="section-subtitle">${this.tPlain(race.name_pl, race.name_en)} • ${this.tPlain(cls.name_pl, cls.name_en)} (Poziom ${char.level})</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn-secondary btn-sm" onclick="App.switchTab('sheet')">📜 Widok Karty Postaci</button>
          <button class="btn-primary btn-sm" onclick="App.openCharacterSpellbook('${char.id}')">📖 Księga Zaklęć Postaci (${(char.knownSpells || []).length})</button>
          <button class="btn-ghost btn-sm" onclick="App.openFullSpellbook('${cls.caster_type !== 'none' ? cls.id : 'all'}')">➕ Pełna Baza Zaklęć</button>
        </div>
      </div>

      <div class="builder-stepper">
        ${steps.map(s => `
          <button class="step-pill ${step === s.n ? 'active' : ''}" onclick="App.state.builderStep = ${s.n}; App.render();">
            <span class="step-num">${s.n}</span>
            <span>${s.label.replace(/^\d+\.\s*/, '')}</span>
          </button>
        `).join("")}
      </div>

      <!-- Mobile & Desktop Quick Step Prev/Next Bar (Top) -->
      <div class="builder-step-nav">
        <button class="btn-ghost btn-sm" ${step <= 1 ? 'disabled style="opacity:0.4;pointer-events:none;"' : ''} onclick="App.state.builderStep = Math.max(1, ${step - 1}); App.render(); window.scrollTo({top:0,behavior:'smooth'});">
          ← Poprzedni krok
        </button>
        <span class="builder-step-indicator">Krok ${step} z 6: <strong>${steps[step - 1].label.replace(/^\d+\.\s*/, '')}</strong></span>
        ${step < 6 ? `
          <button class="btn-primary btn-sm" onclick="App.state.builderStep = Math.min(6, ${step + 1}); App.render(); window.scrollTo({top:0,behavior:'smooth'});">
            Następny krok (${steps[step].label.replace(/^\d+\.\s*/, '')}) →
          </button>
        ` : `
          <button class="btn-primary btn-sm" onclick="App.switchTab('sheet'); window.scrollTo({top:0,behavior:'smooth'});">
            📜 Gotowe — Otwórz Kartę Postaci →
          </button>
        `}
      </div>

      ${stepContent}

      <!-- Quick Step Prev/Next Bar (Bottom) -->
      <div class="builder-step-nav" style="margin-top:18px;">
        <button class="btn-secondary btn-sm" ${step <= 1 ? 'disabled style="opacity:0.4;pointer-events:none;"' : ''} onclick="App.state.builderStep = Math.max(1, ${step - 1}); App.render(); window.scrollTo({top:0,behavior:'smooth'});">
          ← Wróć do kroku ${Math.max(1, step - 1)}
        </button>
        <span class="builder-step-indicator">Krok ${step} / 6</span>
        ${step < 6 ? `
          <button class="btn-primary btn-sm" onclick="App.state.builderStep = Math.min(6, ${step + 1}); App.render(); window.scrollTo({top:0,behavior:'smooth'});">
            Dalej: Krok ${step + 1} (${steps[step].label.replace(/^\d+\.\s*/, '')}) →
          </button>
        ` : `
          <button class="btn-primary btn-sm" onclick="App.switchTab('sheet'); window.scrollTo({top:0,behavior:'smooth'});">
            📜 Zakończ i Otwórz Kartę Postaci →
          </button>
        `}
      </div>
    `;
  },

  renderClassProgressionTable(cls, currentLevel = 1, interactive = false) {
    const hasSlots = cls.progression.some(r => r.slots && r.slots.some(x => x > 0));
    const maxSlotLvl = cls.caster_type === "full" ? 9 : (cls.caster_type.startsWith("half") ? 5 : 0);
    const isWarlock = cls.id === "warlock";
    const isMonk = cls.id === "monk";
    const isRogue = cls.id === "rogue";
    const isSorcerer = cls.id === "sorcerer";
    const isArtificer = cls.id === "artificer";

    return `
      <div class="wikidot-table-wrap">
        <table class="wikidot-table">
          <thead>
            <tr>
              <th>Poz.</th>
              <th>Biegłość</th>
              <th>Cechy Klasowe (Wikidot D&amp;D 5e)</th>
              ${cls.progression[0].cantrips !== undefined ? `<th>Sztuczki</th>` : ''}
              ${isMonk ? `<th>Kość Sztuk Walki</th><th>Pkt Ki</th><th>Ruch</th>` : ''}
              ${isRogue ? `<th>Ukradkowy Atak</th>` : ''}
              ${isSorcerer ? `<th>Pkt Zaklinania</th>` : ''}
              ${isArtificer ? `<th>Znane Infuzje</th><th>Nasycone Przedm.</th>` : ''}
              ${isWarlock ? `<th>Komórki Paktu</th><th>Krąg Paktu</th><th>Inwokacje</th>` : ''}
              ${hasSlots ? Array.from({length: maxSlotLvl}, (_,i)=>`<th>${i+1}. kr</th>`).join("") : ''}
            </tr>
          </thead>
          <tbody>
            ${cls.progression.map(row => {
              const isCurr = row.level === currentLevel;
              const feats = this.state.lang === "en" ? row.features_en : row.features_pl;
              return `
                <tr class="${isCurr ? 'current-lvl-row' : ''}" ${interactive ? `onclick="App.setCharacterLevel(${row.level})" style="cursor:pointer;"` : ''}>
                  <td><strong>${row.level}.</strong></td>
                  <td style="font-family:var(--font-mono);color:var(--gold-bright);">+${row.pb}</td>
                  <td>${feats.join(", ")}</td>
                  ${row.cantrips !== undefined ? `<td>${row.cantrips}</td>` : ''}
                  ${isMonk ? `<td>${row.martial_die}</td><td>${row.ki}</td><td>${row.speed_bonus}</td>` : ''}
                  ${isRogue ? `<td style="color:var(--crimson);font-weight:700;">${row.sneak_attack}</td>` : ''}
                  ${isSorcerer ? `<td style="color:var(--arcane-bright);font-weight:700;">${row.sorcery_pts}</td>` : ''}
                  ${isArtificer ? `<td>${row.infusions_known}</td><td>${row.infused_items}</td>` : ''}
                  ${isWarlock ? `<td>${row.pact_slots}</td><td>${row.pact_level}. krąg</td><td>${row.invocations}</td>` : ''}
                  ${hasSlots ? Array.from({length: maxSlotLvl}, (_,i)=>`<td style="font-family:var(--font-mono);">${row.slots[i] || '—'}</td>`).join("") : ''}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  updateCharField(field, val) {
    const char = this.getActiveChar();
    if (!char) return;
    char[field] = val;
    this.saveState();
  },

  setCharRace(raceId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.raceId = raceId;
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = Math.min(char.hpCurrent, char.hpMax);
    this.saveState();
    this.render();
  },

  setCharClass(classId) {
    const char = this.getActiveChar();
    if (!char) return;
    const cls = this.getClassData(classId);
    char.classId = classId;
    char.subclassId = cls.subclasses[0] ? cls.subclasses[0].id : null;
    char.subclassBuffActive = false;
    this.syncSubclassSpellsAndBonuses(char);
    char.hpCurrent = char.hpMax;
    this.saveState();
    this.render();
  },

  setCharBackground(bgId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.backgroundId = bgId;
    const bg = this.getBgData(bgId);
    bg.skills.forEach(sk => {
      if (!char.skillProficiencies.includes(sk)) char.skillProficiencies.push(sk);
    });
    this.saveState();
    this.render();
  },

  changeAbility(abId, delta) {
    const char = this.getActiveChar();
    if (!char) return;
    char.abilities[abId] = Math.min(30, Math.max(1, (char.abilities[abId] || 10) + delta));
    if (abId === "CON") {
      char.hpMax = this.calcRecommendedMaxHP(char);
      char.hpCurrent = char.hpMax;
    }
    this.saveState();
    this.render();
  },

  setAbility(abId, val) {
    const char = this.getActiveChar();
    if (!char) return;
    char.abilities[abId] = Math.min(30, Math.max(1, parseInt(val, 10) || 10));
    this.saveState();
    this.render();
  },

  applyStandardArray() {
    const char = this.getActiveChar();
    if (!char) return;
    const std = [15, 14, 13, 12, 10, 8];
    this.state.rolledPool = std.map(v => ({ val: v, detail: "Standard Array", assignedTo: null }));
    this.state.selectedPoolIdx = 0;
    this.render();
    this.toast("📏 Załadowano Standard Array (15, 14, 13, 12, 10, 8) do puli — rozlokuj je w wybranych cechach lub kliknij Auto-dopasuj!");
  },

  roll4d6DropLowest() {
    const char = this.getActiveChar();
    if (!char) return;
    const pool = [];
    for (let i = 0; i < 6; i++) {
      const rolls = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);
      const top3 = rolls[0] + rolls[1] + rolls[2];
      pool.push({
        val: top3,
        detail: `[${rolls[0]}, ${rolls[1]}, ${rolls[2]}, <s>${rolls[3]}</s>]`,
        assignedTo: null
      });
    }
    pool.sort((a, b) => b.val - a.val);
    this.state.rolledPool = pool;
    this.state.selectedPoolIdx = 0;
    this.render();
    this.toast(`🎲 Wylosowano pulę 6 wyników: ${pool.map(p => p.val).join(", ")} — przypisz je do wybranych cech!`);
  },

  selectPoolItem(idx) {
    this.state.selectedPoolIdx = this.state.selectedPoolIdx === idx ? null : idx;
    this.render();
  },

  assignPoolItemToAbility(idx, abId) {
    const char = this.getActiveChar();
    const pool = this.state.rolledPool || [];
    if (!char || !pool[idx]) return;

    if (!abId) {
      pool[idx].assignedTo = null;
      this.render();
      return;
    }

    // Jeśli inna kość z puli była już przypisana do tej cechy, odepnij ją
    pool.forEach((item, i) => {
      if (i !== idx && item.assignedTo === abId) {
        item.assignedTo = null;
      }
    });

    pool[idx].assignedTo = abId;
    char.abilities[abId] = pool[idx].val;
    if (abId === "CON") {
      char.hpMax = this.calcRecommendedMaxHP(char);
      char.hpCurrent = char.hpMax;
    }

    // Automatycznie zaznacz następny nieprzypisany wynik w puli
    const nextUnassigned = pool.findIndex(item => !item.assignedTo);
    this.state.selectedPoolIdx = nextUnassigned !== -1 ? nextUnassigned : null;

    this.saveState();
    this.render();
  },

  autoAssignPoolToClass() {
    const char = this.getActiveChar();
    const pool = this.state.rolledPool || [];
    if (!char || pool.length === 0) return;
    const cls = this.getClassData(char.classId);
    const sortedIndices = pool.map((p, idx) => ({ val: p.val, idx })).sort((a, b) => b.val - a.val);
    const order = [...cls.primary_ability, "CON", "DEX", "WIS", "CHA", "STR", "INT"];
    const uniqueOrder = [...new Set(order)];

    uniqueOrder.forEach((abId, i) => {
      if (sortedIndices[i] !== undefined) {
        const poolIdx = sortedIndices[i].idx;
        pool[poolIdx].assignedTo = abId;
        char.abilities[abId] = pool[poolIdx].val;
      }
    });
    this.state.selectedPoolIdx = null;
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = char.hpMax;
    this.saveState();
    this.render();
    this.toast("✨ Rozlokowano wyniki z puli optymalnie pod wybraną klasę!");
  },

  cycleSkillProf(skillId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.skillProficiencies = char.skillProficiencies || [];
    char.skillExpertises = char.skillExpertises || [];

    const hasProf = char.skillProficiencies.includes(skillId);
    const hasExp = char.skillExpertises.includes(skillId);

    if (!hasProf) {
      char.skillProficiencies.push(skillId);
    } else if (hasProf && !hasExp) {
      char.skillExpertises.push(skillId);
    } else {
      char.skillProficiencies = char.skillProficiencies.filter(s => s !== skillId);
      char.skillExpertises = char.skillExpertises.filter(s => s !== skillId);
    }
    this.saveState();
    this.render();
  },

  toggleCharFeat(featId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.feats = char.feats || [];
    if (char.feats.includes(featId)) {
      char.feats = char.feats.filter(f => f !== featId);
    } else {
      char.feats.push(featId);
    }
    char.hpMax = this.calcRecommendedMaxHP(char);
    this.saveState();
    this.render();
  },

  setCharacterLevel(lvl) {
    const char = this.getActiveChar();
    if (!char) return;
    char.level = Math.min(20, Math.max(1, lvl));
    this.syncSubclassSpellsAndBonuses(char);
    char.hpCurrent = char.hpMax;
    this.saveState();
    this.render();
    this.toast(`⬆️ Ustawiono poziom ${char.level} (${char.hpMax} PW)`);
  },

  recalcHPToRecommended() {
    const char = this.getActiveChar();
    if (!char) return;
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = char.hpMax;
    this.saveState();
    this.render();
    this.toast(`Przeliczono maksymalne PW: ${char.hpMax}`);
  },

  addInventoryItem() {
    const input = document.getElementById("new-item-input");
    if (!input || !input.value.trim()) return;
    const char = this.getActiveChar();
    char.inventory = char.inventory || [];
    char.inventory.push(input.value.trim());
    input.value = "";
    this.saveState();
    this.render();
  },

  removeInventoryItem(idx) {
    const char = this.getActiveChar();
    if (!char) return;
    char.inventory.splice(idx, 1);
    this.saveState();
    this.render();
  },

  openLevelUpModal(charId) {
    if (charId) this.state.activeCharId = charId;
    const char = this.getActiveChar();
    if (!char) return;
    if (char.level >= 20) {
      this.toast("Postać osiągnęła już maksymalny 20. poziom!");
      return;
    }
    const nextLvl = char.level + 1;
    const cls = this.getClassData(char.classId);
    const nextRow = cls.progression.find(r => r.level === nextLvl);
    const conMod = this.getMod(char.abilities.CON);
    const avgGain = (cls.hit_die / 2) + 1 + conMod;

    this.openModal(
      `⬆️ Awans na Poziom ${nextLvl}: ${char.name}`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="card" style="background:var(--bg-deep);">
            <h4 style="color:var(--gold);margin-bottom:6px;">Nowe Cechy Klasowe na ${nextLvl}. poziomie (${this.tPlain(cls.name_pl, cls.name_en)})</h4>
            <ul style="padding-left:18px;">
              ${(this.state.lang === 'en' ? nextRow.features_en : nextRow.features_pl).map(f => `<li><strong>${f}</strong></li>`).join("")}
            </ul>
            <p style="margin-top:8px;font-size:0.84rem;color:var(--text-muted);">
              Premia z biegłości: <strong>+${nextRow.pb}</strong> • Przyrost PW (średnia k${cls.hit_die} + KON): <strong>+${Math.max(1, avgGain)} PW</strong>
            </p>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button class="btn-ghost" onclick="App.closeModal()">Anuluj</button>
            <button class="btn-primary" onclick="App.setCharacterLevel(${nextLvl}); App.closeModal();">✨ Potwierdź Awans na Poziom ${nextLvl}</button>
          </div>
        </div>
      `
    );
  },

  // ============================================================================
  // TAB 3: INTERAKTYWNA KARTA POSTACI (CHARACTER SHEET)
  // ============================================================================
  renderSheetTab() {
    const char = this.getActiveChar();
    if (!char) return `<p>Brak wybranej postaci.</p>`;
    const cls = this.getClassData(char.classId);
    const race = this.getRaceData(char.raceId);
    const bg = this.getBgData(char.backgroundId);
    const sub = (cls.subclasses || []).find(s => s.id === char.subclassId);
    const itemBonuses = this.getMagicItemBonuses(char);
    const condFx = this.getConditionEffects(char);
    const pb = this.getProfBonus(char.level) + itemBonuses.pb;
    const ac = this.calcAC(char);
    const wisMod = this.getMod(this.getEffectiveAbilityScore(char, "WIS"));
    const initBonus = this.calcInitiative(char) + itemBonuses.checks;
    const speedVal = this.calcSpeed(char);
    const subMech = this.getSubclassMechanics(char.subclassId);
    const percProf = (char.skillProficiencies || []).includes("Perception");
    const percExp = (char.skillExpertises || []).includes("Perception");
    const passivePerc = 10 + wisMod + (percExp ? pb * 2 : (percProf ? pb : 0)) + ((char.feats || []).includes("observant") ? 5 : 0) + ((char.magicItems || []).includes("sentinel-shield") ? 5 : 0) + itemBonuses.checks - (condFx.disChecks ? 5 : 0);

    const effectiveMaxHP = this.calcRecommendedMaxHP(char);
    const hpPct = Math.min(100, Math.max(0, Math.round((char.hpCurrent / Math.max(1, effectiveMaxHP)) * 100)));
    const hpColorClass = hpPct <= 25 ? "low" : (hpPct <= 55 ? "mid" : "");

    const progRow = cls.progression.find(r => r.level === char.level) || cls.progression[0];
    const spellAb = cls.spellcasting_ability;
    const spellMod = spellAb ? this.getMod(this.getEffectiveAbilityScore(char, spellAb)) : 0;
    const spellSaveDC = spellAb ? (8 + pb + spellMod + itemBonuses.spell_dc) : null;
    const spellAtkBonus = spellAb ? (pb + spellMod + itemBonuses.spell_atk) : null;

    // Cechy zdobyte do obecnego poziomu
    const unlockedFeatures = [];
    cls.progression.filter(r => r.level <= char.level).forEach(r => {
      const list = this.state.lang === "en" ? r.features_en : r.features_pl;
      list.forEach(f => unlockedFeatures.push({ level: r.level, name: f }));
    });

    return `
      <!-- Header Banner -->
      <div class="card" style="margin-bottom:18px;background:linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-panel) 100%);border-color:var(--border-gold);">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
          <div style="display:flex;align-items:center;gap:14px;">
            ${this.renderCharacterPortrait(char, 68)}
            <div>
              <h1 style="font-family:var(--font-display);font-size:1.55rem;color:var(--gold-bright);line-height:1.15;">${char.name}</h1>
              <div style="font-size:0.88rem;color:var(--text-main);margin-top:2px;">
                ${this.tPlain(race.name_pl, race.name_en)} • <strong style="color:var(--gold);">${this.tPlain(cls.name_pl, cls.name_en)} (Poz. ${char.level})</strong>
                ${sub ? ` — <span style="color:var(--arcane-bright);">${this.tPlain(sub.name_pl, sub.name_en)}</span>` : ''}
              </div>
              <div style="font-size:0.76rem;color:var(--text-muted);">
                Tło: ${this.tPlain(bg.name_pl, bg.name_en)} • Charakter: ${char.alignment || 'Neutralny'} • <a href="${cls.wikidot_url}" target="_blank" style="color:var(--gold);">Wikidot ↗</a>
              </div>
            </div>
          </div>

          <div class="no-print" style="display:flex;flex-wrap:wrap;gap:8px;">
            <button class="btn-primary btn-sm" onclick="App.openCharacterSpellbook('${char.id}')">📖 Księga Zaklęć Postaci (${(char.knownSpells || []).length})</button>
            <button class="btn-secondary btn-sm" onclick="App.shortRest()">⛺ Krótki Odpoczynek</button>
            <button class="btn-secondary btn-sm" onclick="App.longRest()">🌙 Długi Odpoczynek</button>
            <button class="btn-ghost btn-sm" onclick="App.openLevelUpModal()">⬆️ Awansuj (Poz. ${char.level})</button>
            <button class="btn-ghost btn-sm" onclick="window.print()">🖨️ Drukuj / PDF</button>
          </div>
        </div>
      </div>

      <!-- Mobile Quick Section Switcher (Wygodne przełączanie sekcji Karty Postaci na telefonie bez długiego scrollowania) -->
      <div class="mobile-sheet-tabs no-print">
        <button class="mobile-sheet-tab ${(this.state.mobileSheetSection||'combat')==='combat'?'active':''}" onclick="App.state.mobileSheetSection='combat';App.render();">⚔️ Walka, PW &amp; Bronie</button>
        <button class="mobile-sheet-tab ${this.state.mobileSheetSection==='stats'?'active':''}" onclick="App.state.mobileSheetSection='stats';App.render();">⚡ Cechy &amp; Umiejętności</button>
        <button class="mobile-sheet-tab ${this.state.mobileSheetSection==='magic'?'active':''}" onclick="App.state.mobileSheetSection='magic';App.render();">🔮 Magia &amp; Zdolności</button>
        <button class="mobile-sheet-tab ${this.state.mobileSheetSection==='gear'?'active':''}" onclick="App.state.mobileSheetSection='gear';App.render();">🎒 Stany &amp; Ekwipunek</button>
        <button class="mobile-sheet-tab ${this.state.mobileSheetSection==='all'?'active':''}" onclick="App.state.mobileSheetSection='all';App.render();">📜 Pokaż Całą Kartę (Wszystkie Sekcje)</button>
      </div>

      <div class="sheet-grid">
        <!-- LEFT COLUMN: ABILITIES, SAVING THROWS, SKILLS -->
        <div class="sheet-col-left" style="${(this.state.mobileSheetSection && this.state.mobileSheetSection !== 'all' && this.state.mobileSheetSection !== 'stats') ? 'display:none;' : ''}">
          <div class="card" style="margin-bottom:16px;">
            <h3 class="card-title" style="font-size:0.95rem;margin-bottom:10px;">⚡ Cechy Główne (Kliknij, by rzucić k20)</h3>
            <div class="abilities-grid">
              ${window.DND_ABILITIES.map(ab => {
                const sc = this.getEffectiveAbilityScore(char, ab.id);
                const mod = this.getMod(sc) + itemBonuses.checks;
                const hasAdv = ab.id === "STR" && condFx.advStr;
                const hasDis = condFx.disChecks;
                return `
                  <div class="ability-box" onclick="App.rollDie(20, ${mod}, 'Test ${ab.name_pl} (${ab.id})', 'check:${ab.id}')" style="border-color:${hasDis && !hasAdv ? 'var(--crimson)' : (hasAdv ? 'var(--emerald)' : 'var(--border-gold)')};">
                    <div class="ability-label">${this.tPlain(ab.name_pl, ab.name_en)} ${hasAdv && !hasDis ? '▲' : (hasDis && !hasAdv ? '▼' : '')}</div>
                    <div class="ability-mod">${this.fmtMod(this.getMod(sc))}</div>
                    <div class="ability-score">${sc}${sc > (char.abilities[ab.id]||10) ? ' ★' : ''}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="card" style="margin-bottom:16px;">
            <h3 class="card-title" style="font-size:0.95rem;margin-bottom:8px;">🛡️ Rzuty Obronne (Saving Throws)</h3>
            ${window.DND_ABILITIES.map(ab => {
              const sc = this.getEffectiveAbilityScore(char, ab.id);
              const isProf = cls.saving_throws.includes(ab.id) || (char.level >= 14 && char.classId === "monk") || (ab.id === "WIS" && char.subclassId === "samurai" && char.level >= 7) || (ab.id === "WIS" && char.classId === "rogue" && char.level >= 15);
              const paladinAura = (char.classId === "paladin" && char.level >= 6) ? Math.max(0, this.getMod(this.getEffectiveAbilityScore(char, "CHA"))) : 0;
              const bladesongCon = (ab.id === "CON" && char.subclassBuffActive && char.subclassId === "bladesinging") ? Math.max(1, this.getMod(this.getEffectiveAbilityScore(char, "INT"))) : 0;
              const dexCondBonus = ab.id === "DEX" ? condFx.dexSaveBonus : 0;
              const bonus = this.getMod(sc) + (isProf ? pb : 0) + paladinAura + bladesongCon + itemBonuses.saves + dexCondBonus;
              const autoFail = (ab.id === "STR" || ab.id === "DEX") && condFx.autoFailStrDex;
              const saveAdv = (ab.id === "STR" && condFx.advStr) || (ab.id === "DEX" && condFx.advDexSave);
              const saveDis = condFx.disSaves || (ab.id === "DEX" && condFx.disDexSave);
              return `
                <div class="skill-row" onclick="App.rollDie(20, ${bonus}, 'Rzut obronny: ${ab.name_pl}', 'save:${ab.id}')">
                  <div>
                    <span class="skill-prof-dot ${isProf ? 'prof' : ''}"></span>
                    <span>${this.tPlain(ab.name_pl, ab.name_en)}</span>
                    ${autoFail ? `<span class="badge badge-crimson" style="font-size:0.65rem;padding:1px 6px;">AUTO-PORAŻKA</span>` : ''}
                    ${!autoFail && saveAdv && !saveDis ? `<span class="badge badge-emerald" style="font-size:0.65rem;padding:1px 6px;">Adv ▲</span>` : ''}
                    ${!autoFail && saveDis && !saveAdv ? `<span class="badge badge-crimson" style="font-size:0.65rem;padding:1px 6px;">Dis ▼</span>` : ''}
                  </div>
                  <span class="skill-bonus" style="color:${autoFail ? 'var(--crimson)' : 'var(--gold-bright)'};">${this.fmtMod(bonus)}${condFx.blessBonus ? '+k4' : ''}${condFx.banePenalty ? '-k4' : ''}</span>
                </div>
              `;
            }).join("")}
          </div>

          <div class="card">
            <h3 class="card-title" style="font-size:0.95rem;margin-bottom:8px;">🎯 Umiejętności (Skills)</h3>
            ${window.DND_SKILLS.map(sk => {
              const abMod = this.getMod(this.getEffectiveAbilityScore(char, sk.ability));
              const isProf = (char.skillProficiencies || []).includes(sk.id);
              const isExp = (char.skillExpertises || []).includes(sk.id);
              const jackOfAllTrades = (char.classId === "bard" && char.level >= 2 && !isProf) ? Math.floor(pb / 2) : 0;
              const feyWandererCha = (sk.ability === "CHA" && char.subclassId === "fey-wanderer" && char.level >= 3) ? Math.max(1, wisMod) : 0;
              const bonus = abMod + (isExp ? pb * 2 : (isProf ? pb : jackOfAllTrades)) + feyWandererCha + itemBonuses.checks;
              return `
                <div class="skill-row" onclick="App.rollDie(20, ${bonus}, 'Umiejętność: ${sk.name_pl}', 'check:${sk.ability}')">
                  <div>
                    <span class="skill-prof-dot ${isExp ? 'exp' : (isProf ? 'prof' : '')}"></span>
                    <span>${this.tPlain(sk.name_pl, sk.name_en)} <small style="color:var(--text-dim);">(${sk.ability})</small></span>
                  </div>
                  <span class="skill-bonus" style="color:${condFx.disChecks ? '#fca5a5' : 'var(--gold-bright)'};">${this.fmtMod(bonus)}${condFx.disChecks ? ' ▼' : ''}</span>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- CENTER COLUMN: COMBAT VITALS, HP, SPELLS & CLASS FEATURES -->
        <div class="sheet-col-center" style="${(this.state.mobileSheetSection && this.state.mobileSheetSection !== 'all' && this.state.mobileSheetSection !== 'combat' && this.state.mobileSheetSection !== 'magic') ? 'display:none;' : ''}">
          <div class="sheet-combat-group" style="${(this.state.mobileSheetSection === 'magic') ? 'display:none;' : ''}">
          <div class="vitals-grid">
            <div class="vital-card ac" style="cursor:pointer;" onclick="App.openArmorCreatorModal()" title="Kliknij, aby otworzyć Kreator Pancerza i Tarczy">
              <div class="vital-val">🛡️ ${ac}</div>
              <div class="vital-lbl">Klasa Pancerza ⚙</div>
            </div>
            <div class="vital-card" style="cursor:pointer;" onclick="App.rollDie(20, ${initBonus}, 'Inicjatywa', 'init')">
              <div class="vital-val">${this.fmtMod(initBonus)}${condFx.disChecks ? ' ▼' : ''}</div>
              <div class="vital-lbl">🎲 Inicjatywa</div>
            </div>
            <div class="vital-card">
              <div class="vital-val">+${pb}</div>
              <div class="vital-lbl">Premia Biegłości</div>
            </div>
            <div class="vital-card">
              <div class="vital-val" style="color:${speedVal === 0 ? 'var(--crimson)' : (condFx.doubleSpeed ? 'var(--emerald)' : 'var(--gold-bright)')};">🏃 ${speedVal} ft</div>
              <div class="vital-lbl">Szybkość</div>
            </div>
            <div class="vital-card">
              <div class="vital-val">👁️ ${passivePerc}</div>
              <div class="vital-lbl">Pasywna Percepcja</div>
            </div>
          </div>

          <!-- Subclass Interactive Actions & Passive Bonuses Panel -->
          ${sub ? `
            <div class="card" style="margin-bottom:16px;border-color:var(--arcane);">
              <div class="card-header">
                <div>
                  <h3 class="card-title" style="color:var(--arcane-bright);">✨ Podklasa: ${this.t(sub.name_pl, sub.name_en)}</h3>
                  <span style="font-size:0.78rem;color:var(--text-muted);">Kliknij wybraną zdolność podklasy, aby rzucić jej kośćmi lub aktywować bonus bojowy</span>
                </div>
                ${subMech && subMech.toggle_buff ? `
                  <button class="${char.subclassBuffActive ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="App.toggleSubclassBuff()">
                    ${char.subclassBuffActive ? '🔥 AKTYWNE: ' : '⚡ Włącz: '}${subMech.toggle_buff.name_pl}
                  </button>
                ` : ''}
              </div>

              <div class="badge-row" style="margin-bottom:10px;">
                ${subMech && subMech.init_ability ? `<span class="badge badge-emerald">✓ Doliczono +${this.getMod(char.abilities[subMech.init_ability])} (${subMech.init_ability}) do Inicjatywy</span>` : ''}
                ${subMech && subMech.init_prof_at_level && char.level >= subMech.init_prof_at_level ? `<span class="badge badge-emerald">✓ Doliczono +${pb} (Biegłość) do Inicjatywy</span>` : ''}
                ${subMech && subMech.ac_bonus_passive ? `<span class="badge badge-gold">✓ Doliczono +${subMech.ac_bonus_passive} do Klasy Pancerza</span>` : ''}
                ${char.subclassId === 'draconic' ? `<span class="badge badge-emerald">✓ Doliczono +${char.level} PW (Smocza Odporność)</span>` : ''}
                ${char.subclassId === 'fey-wanderer' && char.level >= 3 ? `<span class="badge badge-emerald">✓ Doliczono +${Math.max(1, wisMod)} (MĄD) do wszystkich umiejętności CHA</span>` : ''}
              </div>

              <div style="display:flex;flex-direction:column;gap:8px;">
                ${subMech && subMech.features ? subMech.features.filter(f => f.level <= char.level).map((f, fIdx) => `
                  <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;border:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;cursor:pointer;" onclick="App.rollSubclassFeature('${sub.id}', ${fIdx})">
                    <div style="flex:1;min-width:200px;">
                      <div style="font-weight:700;color:var(--gold-bright);">
                        ${this.t(f.name_pl, f.name_en)}
                        <span class="badge badge-arcane" style="margin-left:6px;">${f.action_type || 'Zdolność'}</span>
                      </div>
                      <div style="font-size:0.8rem;color:var(--text-muted);margin-top:3px;">${this.tDesc(f)}</div>
                    </div>
                    <button class="btn-primary btn-sm" onclick="event.stopPropagation(); App.rollSubclassFeature('${sub.id}', ${fIdx})">
                      ${f.roll ? `🎲 Rzuć ${f.roll.replace(/d/g,'k')}` : '✨ Użyj'}
                    </button>
                  </div>
                `).join("") : `
                  <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;">
                    <div style="font-size:0.84rem;">${this.tDesc(sub)}</div>
                  </div>
                `}
              </div>
            </div>
          ` : ''}

          <!-- HP Tracker -->
          <div class="hp-tracker">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <span style="font-family:var(--font-display);font-weight:700;color:var(--gold);">❤️ Punkty Wytrzymałości (Hit Points)</span>
                <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Kości Wytrzymałości: ${char.level - (char.hitDiceUsed||0)}/${char.level}k${cls.hit_die}</span>
              </div>
              <div style="font-family:var(--font-mono);font-size:1.25rem;font-weight:800;color:${condFx.dead ? 'var(--crimson)' : 'var(--emerald)'};">
                ${condFx.dead ? '💀 MARTWY (Wyczerpanie 6)' : `${char.hpCurrent} / ${effectiveMaxHP} PW`} ${char.hpTemp ? `<span style="color:var(--cyan);">(+${char.hpTemp} Temp)</span>` : ''}
              </div>
            </div>

            <div class="hp-bar-outer">
              <div class="hp-bar-inner ${hpColorClass}" style="width:${hpPct}%;"></div>
            </div>

            <div class="no-print" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;margin-top:10px;">
              <div style="display:flex;gap:6px;align-items:center;">
                <input type="number" id="hp-delta-input" value="5" min="1" style="width:68px;padding:6px;text-align:center;font-family:var(--font-mono);">
                <button class="btn-danger btn-sm" onclick="App.modifyHP(-1)">💥 Obrażenia</button>
                <button class="btn-primary btn-sm" onclick="App.modifyHP(1)">💚 Leczenie</button>
              </div>
              <div style="display:flex;gap:6px;align-items:center;">
                <span style="font-size:0.76rem;color:var(--text-muted);">Tymczasowe PW:</span>
                <input type="number" value="${char.hpTemp || 0}" min="0" onchange="App.updateCharField('hpTemp', parseInt(this.value,10)||0); App.render();" style="width:64px;padding:5px;text-align:center;">
              </div>
            </div>
          </div>

          <!-- Weapons & Attacks Panel -->
          <div class="card" style="margin-bottom:16px;">
            <div class="card-header">
              <div>
                <h3 class="card-title">⚔️ Bronie, Ataki i Pancerz (Weapons &amp; Armor Forge)</h3>
                <span style="font-size:0.78rem;color:var(--text-muted);">Kliknij <strong>Trafienie (k20)</strong> lub <strong>Obrażenia</strong> — premie z cech, biegłości, przedmiotów, szału i stanów doliczają się automatycznie!</span>
              </div>
              <div class="no-print" style="display:flex;gap:6px;flex-wrap:wrap;">
                <button class="btn-secondary btn-sm" onclick="App.openArmorCreatorModal()">🛡️ Kreator Pancerza</button>
                <button class="btn-primary btn-sm" onclick="App.openAddWeaponModal()">⚒️ Kreator Broni</button>
              </div>
            </div>

            ${char.customArmor && char.customArmor.enabled ? `
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;background:var(--bg-deep);padding:8px 12px;border-radius:8px;border:1px solid var(--border-gold);margin-bottom:8px;">
                <div style="font-size:0.82rem;">
                  🛡️ <strong>Noszony pancerz:</strong> <span style="color:var(--gold-bright);">${char.customArmor.name}</span>
                  (Bazowa KP ${char.customArmor.baseAc}${char.customArmor.magicBonus ? ` +${char.customArmor.magicBonus}` : ''}${char.shieldEquipped ? ` • Tarcza +${2 + (Number(char.shieldMagicBonus)||0)}` : ''}${char.customArmor.adamantine ? ' • Adamantytowa' : ''}${char.customArmor.mithral ? ' • Mitrylowa' : ''})
                </div>
                <button class="btn-ghost btn-sm no-print" onclick="App.openArmorCreatorModal()">✏️ Edytuj pancerz</button>
              </div>
            ` : ''}

            <div class="wikidot-table-wrap" style="margin:6px 0 0;">
              <table class="wikidot-table weapons-responsive-table">
                <thead>
                  <tr>
                    <th>Nazwa Broni / Ataku</th>
                    <th>Zasięg</th>
                    <th>Trafienie (Atak k20)</th>
                    <th>Obrażenia (Kości + Mod)</th>
                    <th class="no-print">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  ${(char.weapons || []).map((wp, idx) => {
                    const st = this.calcWeaponStats(char, wp);
                    const hasAdv = condFx.advAttacks;
                    const hasDis = condFx.disAttacks;
                    return `
                      <tr>
                        <td>
                          <strong style="color:var(--gold-bright);">${wp.name}</strong>
                          <div style="font-size:0.72rem;color:var(--text-muted);">Cecha: ${st.usedAb}${wp.magicBonus ? ` • Magiczna +${wp.magicBonus}` : ''}${st.rageBonus ? ` • Szał +${st.rageBonus}` : ''}${wp.notes ? ` • ${wp.notes}` : ''}</div>
                        </td>
                        <td style="font-size:0.8rem;color:var(--text-muted);">${wp.range || '5 ft'}</td>
                        <td>
                          <button class="btn-primary btn-sm" onclick="App.rollWeaponAttack(${idx})" style="font-family:var(--font-mono);font-weight:800;">
                            🎯 ${this.fmtMod(st.toHit)}${condFx.blessBonus ? '+k4' : ''}${condFx.banePenalty ? '-k4' : ''}${hasAdv && !hasDis ? ' ▲' : (hasDis && !hasAdv ? ' ▼' : '')}
                          </button>
                        </td>
                        <td>
                          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                            <button class="btn-secondary btn-sm" onclick="App.rollWeaponDamage(${idx}, false)" style="font-family:var(--font-mono);">
                              🎲 ${st.dmgFormula.replace(/d/g,'k')}
                            </button>
                            <button class="btn-ghost btn-sm no-print" onclick="App.rollWeaponDamage(${idx}, true)" title="Rzuć podwójnymi kośćmi obrażeń (Trafienie Krytyczne!)">
                              💥 Kryt
                            </button>
                            <span style="font-size:0.74rem;color:var(--text-muted);">${wp.dmgType}</span>
                          </div>
                        </td>
                        <td class="no-print">
                          <div style="display:flex;gap:4px;">
                            <button class="btn-ghost btn-sm" onclick="App.openAddWeaponModal(${idx})" title="Edytuj broń">✏️</button>
                            <button class="btn-ghost btn-sm" onclick="App.removeWeapon(${idx})" title="Usuń broń">✕</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                  ${char.classId === "rogue" ? (() => {
                    const sneakDice = `${Math.ceil(char.level / 2)}d6`;
                    return `
                      <tr>
                        <td><strong style="color:var(--crimson);">🗡️ Ukradkowy Atak (Sneak Attack)</strong></td>
                        <td>Raz / turę</td>
                        <td><span class="badge badge-gold">Przy Ułatwieniu / Sojuszniku</span></td>
                        <td colspan="2">
                          <button class="btn-primary btn-sm" onclick="App.rollCustomFormula('${sneakDice}', 'Ukradkowy Atak (Sneak Attack)')">🎲 Rzuć ${sneakDice.replace('d','k')}</button>
                          <button class="btn-ghost btn-sm no-print" onclick="App.rollCustomFormula('${Math.ceil(char.level / 2) * 2}d6', '💥 KRYTYK: Ukradkowy Atak')">💥 Kryt (${Math.ceil(char.level / 2) * 2}k6)</button>
                        </td>
                      </tr>
                    `;
                  })() : ''}
                  ${char.classId === "paladin" && char.level >= 2 ? `
                    <tr>
                      <td><strong style="color:var(--gold-bright);">☀️ Boskie Ugodzenie (Divine Smite)</strong></td>
                      <td>Przy trafieniu wręcz</td>
                      <td><span class="badge badge-gold">Zużywa komórkę czaru</span></td>
                      <td colspan="2">
                        <div style="display:flex;gap:4px;flex-wrap:wrap;">
                          <button class="btn-primary btn-sm" onclick="App.rollCustomFormula('2d8', 'Boskie Ugodzenie (1. krąg)')">1.kr (2k8)</button>
                          <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('3d8', 'Boskie Ugodzenie (2. krąg / vs Nieumarły)')">2.kr (3k8)</button>
                          <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('4d8', 'Boskie Ugodzenie (3. krąg)')">3.kr (4k8)</button>
                          <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('5d8', 'Boskie Ugodzenie (4. krąg — maks.)')">4.kr (5k8)</button>
                        </div>
                      </td>
                    </tr>
                  ` : ''}
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <!-- Spellcasting & Spell Slots on Sheet (Always available so every character can open their personal Spellbook) -->
          <div class="sheet-magic-group" style="${(this.state.mobileSheetSection === 'combat') ? 'display:none;' : ''}">
          <div class="card" style="margin-bottom:16px;">
            <div class="card-header">
              <div>
                <h3 class="card-title">🔮 Księga Zaklęć i Magia Bohatera ${spellAb ? `(${spellAb})` : ''}</h3>
                <span style="font-size:0.8rem;color:var(--text-muted);">
                  ${spellAb ? 'Kliknij komórkę czaru, aby ją zużyć lub odnowić, albo otwórz pełny widok Księgi Zaklęć tej postaci' : 'Zaklęcia rasowe, z atutów lub przedmiotów przypisane do tej postaci'}
                </span>
              </div>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                ${spellAb ? `
                  <span class="badge badge-gold">ST Czarów (DC): <strong>${spellSaveDC}</strong></span>
                  <span class="badge badge-arcane" style="cursor:pointer;" onclick="App.rollDie(20, ${spellAtkBonus}, 'Atak Czarem', 'attack')">Atak Czarem: <strong>${this.fmtMod(spellAtkBonus)}${condFx.blessBonus ? '+k4' : ''}${condFx.banePenalty ? '-k4' : ''}</strong> 🎲</span>
                ` : ''}
                <button class="btn-primary btn-sm no-print" onclick="App.openCharacterSpellbook('${char.id}')">
                  📖 Otwórz Księgę Zaklęć Postaci (${(char.knownSpells || []).length}) →
                </button>
              </div>
            </div>

            ${spellAb && char.classId === "warlock" ? `
              <div style="display:flex;align-items:center;gap:12px;background:var(--bg-deep);padding:10px 14px;border-radius:8px;margin-bottom:12px;">
                <span style="font-weight:700;color:var(--arcane-bright);">Komórki Magii Paktu (${progRow.pact_level}. Kręgu):</span>
                <div class="slot-pip-group">
                  ${Array.from({length: progRow.pact_slots || 2}, (_, idx) => {
                    const used = (char.usedSlots && char.usedSlots.pact || 0) > idx;
                    return `<div class="slot-pip ${used ? 'used' : ''}" onclick="App.toggleSpellSlot('pact', ${idx}, ${progRow.pact_slots || 2})"></div>`;
                  }).join("")}
                </div>
              </div>
            ` : (spellAb && progRow.slots ? `
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px;">
                ${progRow.slots.map((maxCount, idx) => {
                  if (!maxCount) return "";
                  const circle = idx + 1;
                  const usedCount = (char.usedSlots && char.usedSlots[circle]) || 0;
                  return `
                    <div style="background:var(--bg-deep);padding:8px 10px;border-radius:8px;border:1px solid var(--border-subtle);">
                      <div style="font-size:0.75rem;color:var(--gold);font-weight:700;margin-bottom:4px;">Krąg ${circle} (${maxCount - usedCount}/${maxCount})</div>
                      <div class="slot-pip-group">
                        ${Array.from({length: maxCount}, (_, pipIdx) => `
                          <div class="slot-pip ${pipIdx < usedCount ? 'used' : ''}" onclick="App.toggleSpellSlot(${circle}, ${pipIdx}, ${maxCount})"></div>
                        `).join("")}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            ` : '')}

            <!-- Prepared Spells Grouped by Circle -->
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                <strong style="font-size:0.86rem;color:var(--text-main);">Znane / Przygotowane Zaklęcia (${(char.knownSpells || []).length})</strong>
                <div class="no-print" style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button class="btn-secondary btn-sm" onclick="App.openCharacterSpellbook('${char.id}')">📖 Widok Księgi Postaci (${(char.knownSpells || []).length})</button>
                  <button class="btn-ghost btn-sm" onclick="App.openFullSpellbook('${cls.caster_type !== 'none' ? cls.id : 'all'}')">➕ Dodaj z Pełnej Księgi Zaklęć</button>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${(char.knownSpells || []).length === 0 ? `<span style="font-size:0.8rem;color:var(--text-muted);">Brak przypisanych zaklęć — kliknij „➕ Dodaj z Pełnej Księgi Zaklęć”, aby wybrać czary.</span>` : (char.knownSpells || []).map(spId => {
                  const sp = this.getSpellById(spId);
                  if (!sp) return "";
                  return `
                    <span class="badge ${sp.level === 0 ? 'badge-cyan' : 'badge-arcane'}" style="cursor:pointer;padding:5px 10px;font-size:0.78rem;" onclick="App.openSpellModal('${sp.id}')">
                      [${sp.level === 0 ? 'Szt' : sp.level + ' kr'}] ${this.tPlain(sp.name_pl, sp.name_en)}
                      ${sp.dice ? `<strong style="color:var(--gold);margin-left:4px;">(${sp.dice})</strong>` : ''}
                    </span>
                  `;
                }).join("")}
              </div>
            </div>
          </div>

          <!-- Class Progression Features & Feats -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom:10px;">⚔️ Zdolności Klasowe, Rasowe i Atuty (Poziom 1–${char.level})</h3>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${(cls.features_detail || []).filter(f => f.level <= char.level).map(fd => `
                <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;border-left:3px solid var(--gold);">
                  <div style="font-weight:700;color:var(--gold-bright);">${this.t(fd.name_pl, fd.name_en)} <span class="badge badge-gold">Poz. ${fd.level}</span></div>
                  <div style="font-size:0.82rem;color:var(--text-main);margin-top:4px;">${this.tDesc(fd)}</div>
                </div>
              `).join("")}

              ${(char.feats || []).map(fId => {
                const ft = this.getFeatById(fId);
                if (!ft) return "";
                return `
                  <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;border-left:3px solid var(--arcane);">
                    <div style="font-weight:700;color:var(--arcane-bright);">Atut: ${this.t(ft.name_pl, ft.name_en)}</div>
                    <div style="font-size:0.82rem;color:var(--text-main);margin-top:4px;">${this.tDesc(ft)}</div>
                  </div>
                `;
              }).join("")}

              <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;">
                <div style="font-weight:700;color:var(--gold);margin-bottom:6px;">Wszystkie Odblokowane Cechy Klasowe (Poz. 1–${char.level}):</div>
                <div class="badge-row">
                  ${unlockedFeatures.map(uf => `<span class="badge badge-gold">Poz. ${uf.level}: ${uf.name}</span>`).join("")}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: CONDITIONS, INVENTORY, NOTES -->
        <div class="sheet-col-right" style="${(this.state.mobileSheetSection && this.state.mobileSheetSection !== 'all' && this.state.mobileSheetSection !== 'gear') ? 'display:none;' : ''}">
          <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h3 class="card-title" style="font-size:0.95rem;">⚠️ Stany, Buffy i Wyczerpanie (Conditions)</h3>
              ${((char.conditions||[]).length > 0 || (char.exhaustion||0) > 0) ? `<button class="btn-ghost btn-sm" onclick="App.clearAllConditions()">Wyczyść</button>` : ''}
            </div>

            <!-- Exhaustion 0-6 Selector -->
            <div style="background:var(--bg-deep);padding:8px 10px;border-radius:8px;margin-bottom:10px;border:1px solid ${(char.exhaustion||0) > 0 ? 'var(--crimson)' : 'var(--border-subtle)'};">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:0.78rem;font-weight:700;color:${(char.exhaustion||0) > 0 ? '#fca5a5' : 'var(--gold)'};">💀 Poziom Wyczerpania (Exhaustion: ${char.exhaustion || 0}/6)</span>
              </div>
              <div style="display:flex;gap:4px;margin-bottom:4px;">
                ${[0,1,2,3,4,5,6].map(lvl => `
                  <button class="chip-btn ${(char.exhaustion||0) === lvl ? 'active' : ''}" onclick="App.setExhaustion(${lvl})" style="flex:1;padding:4px 0;font-weight:700;${(char.exhaustion||0) === lvl && lvl > 0 ? 'background:var(--crimson);color:#fff;border-color:var(--crimson);' : ''}">
                    ${lvl}
                  </button>
                `).join("")}
              </div>
              <div style="font-size:0.73rem;color:var(--text-muted);">
                ${this.tDesc(window.DND_EXHAUSTION_LEVELS[char.exhaustion || 0])}
              </div>
            </div>

            <div style="font-size:0.75rem;color:var(--gold);font-weight:700;margin-bottom:6px;">✨ Pozytywne Stany / Buffy Bojowe i Osłony:</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
              ${window.DND_CONDITIONS.filter(c => c.type === 'buff').map(cond => {
                const active = (char.conditions || []).includes(cond.id);
                return `
                  <button class="chip-btn ${active ? 'active' : ''}" onclick="App.toggleCondition('${cond.id}')" title="${cond.desc_pl}" style="padding:5px 9px;font-size:0.74rem;${active ? 'background:rgba(52,211,153,0.2);border-color:var(--emerald);color:#6ee7b7;' : ''}">
                    ${active ? '🟢 ' : ''}${this.tPlain(cond.name_pl, cond.name_en)}
                  </button>
                `;
              }).join("")}
            </div>

            <div style="font-size:0.75rem;color:#fca5a5;font-weight:700;margin-bottom:6px;">🔴 Negatywne Stany (Conditions D&amp;D 5e):</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;">
              ${window.DND_CONDITIONS.filter(c => c.type !== 'buff').map(cond => {
                const active = (char.conditions || []).includes(cond.id);
                return `
                  <button class="chip-btn ${active ? 'active' : ''}" onclick="App.toggleCondition('${cond.id}')" title="${cond.desc_pl}" style="padding:5px 9px;font-size:0.74rem;${active ? 'background:rgba(217,70,79,0.25);border-color:var(--crimson);color:#fca5a5;' : ''}">
                    ${active ? '🔴 ' : ''}${this.tPlain(cond.name_pl, cond.name_en)}
                  </button>
                `;
              }).join("")}
            </div>

            ${(char.conditions || []).length > 0 ? `
              <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">
                ${char.conditions.map(cId => {
                  const cObj = window.DND_CONDITIONS.find(x => x.id === cId);
                  if (!cObj) return "";
                  const isBuff = cObj.type === "buff";
                  return `<div style="font-size:0.77rem;background:${isBuff ? 'rgba(52,211,153,0.12)' : 'rgba(217,70,79,0.14)'};border:1px solid ${isBuff ? 'var(--emerald)' : 'var(--crimson)'};padding:6px 8px;border-radius:6px;"><strong>${this.tPlain(cObj.name_pl, cObj.name_en)}:</strong> ${this.tDesc(cObj)}</div>`;
                }).join("")}
              </div>
            ` : ''}
          </div>

          <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h3 class="card-title" style="font-size:0.95rem;">💍 Magiczne Przedmioty (${this.getCharMagicItems(char).length})</h3>
              <button class="btn-ghost btn-sm no-print" onclick="App.state.builderStep=6;App.switchTab('builder');">➕ Dodaj</button>
            </div>
            ${this.getCharMagicItems(char).length === 0 ? `<p style="font-size:0.8rem;color:var(--text-muted);">Brak wyposażonych przedmiotów magicznych.</p>` : `
              <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
                ${this.getCharMagicItems(char).map(it => `
                  <div style="background:var(--bg-deep);padding:8px 10px;border-radius:8px;border:1px solid var(--border-gold);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                    <div style="flex:1;min-width:140px;">
                      <div style="font-weight:700;font-size:0.83rem;color:var(--gold-bright);">${this.tPlain(it.name_pl, it.name_en)}</div>
                      <div style="font-size:0.74rem;color:var(--text-muted);">${it.desc_pl}</div>
                    </div>
                    ${it.roll ? `
                      <button class="btn-primary btn-sm" onclick="App.rollCustomFormula('${it.roll}', '${it.roll_label || it.name_pl}')">
                        🎲 ${it.roll.replace(/d/g,'k')}
                      </button>
                    ` : ''}
                  </div>
                `).join("")}
              </div>
            `}
            <h3 class="card-title" style="font-size:0.95rem;margin-bottom:8px;">🎒 Ekwipunek i Uzbrojenie</h3>
            <ul style="padding-left:18px;font-size:0.84rem;display:flex;flex-direction:column;gap:4px;">
              ${(char.inventory || []).map(it => `<li>${it}</li>`).join("")}
            </ul>
          </div>

          <div class="card">
            <h3 class="card-title" style="font-size:0.95rem;margin-bottom:8px;">📝 Notatki Sesyjne</h3>
            <textarea rows="6" style="width:100%;font-size:0.84rem;" oninput="App.updateCharField('notes', this.value)" placeholder="Zapisuj tu złoto, NPC, aktywne efekty i plany...">${char.notes || ""}</textarea>
          </div>
        </div>
      </div>
    `;
  },

  modifyHP(sign) {
    const char = this.getActiveChar();
    const input = document.getElementById("hp-delta-input");
    if (!char || !input) return;
    const val = Math.max(0, parseInt(input.value, 10) || 0);
    if (sign < 0) {
      let dmg = val;
      if (char.hpTemp > 0) {
        const absorbed = Math.min(char.hpTemp, dmg);
        char.hpTemp -= absorbed;
        dmg -= absorbed;
      }
      char.hpCurrent = Math.max(0, char.hpCurrent - dmg);
      if ((char.conditions || []).includes("concentrating") && val > 0) {
        const dc = Math.max(10, Math.floor(val / 2));
        this.toast(`⚠️ Otrzymano ${val} obrażeń podczas Koncentracji! Wykonaj rzut obronny na KON (ST ${dc})!`);
      }
    } else {
      char.hpCurrent = Math.min(char.hpMax, char.hpCurrent + val);
    }
    this.saveState();
    this.render();
  },

  toggleSpellSlot(circle, pipIdx, maxCount) {
    const char = this.getActiveChar();
    if (!char) return;
    char.usedSlots = char.usedSlots || {};
    const currentUsed = char.usedSlots[circle] || 0;
    if (pipIdx < currentUsed) {
      char.usedSlots[circle] = pipIdx;
    } else {
      char.usedSlots[circle] = Math.min(maxCount, pipIdx + 1);
    }
    this.saveState();
    this.render();
  },

  toggleCondition(condId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.conditions = char.conditions || [];
    if (char.conditions.includes(condId)) {
      char.conditions = char.conditions.filter(c => c !== condId);
    } else {
      char.conditions.push(condId);
      // Jeśli postać zostaje Obezwładniona, Sparaliżowana, Ogłuszona, Nieprzytomna lub Spetryfikowana — automatycznie traci Koncentrację!
      if (["incapacitated", "paralyzed", "petrified", "stunned", "unconscious"].includes(condId) && char.conditions.includes("concentrating")) {
        char.conditions = char.conditions.filter(c => c !== "concentrating");
        this.toast("⚠️ Koncentracja została automatycznie przerwana przez nałożony stan!");
      }
    }
    this.saveState();
    this.render();
  },

  setExhaustion(lvl) {
    const char = this.getActiveChar();
    if (!char) return;
    char.exhaustion = Math.min(6, Math.max(0, lvl));
    const effMax = this.calcRecommendedMaxHP(char);
    if (char.hpCurrent > effMax) char.hpCurrent = effMax;
    if (char.exhaustion >= 6) {
      char.hpCurrent = 0;
      this.toast("💀 Poziom 6 Wyczerpania — postać umiera z wycieńczenia!");
    }
    this.saveState();
    this.render();
  },

  clearAllConditions() {
    const char = this.getActiveChar();
    if (!char) return;
    char.conditions = [];
    char.exhaustion = 0;
    this.saveState();
    this.render();
    this.toast("✨ Wyczyszczono wszystkie aktywne stany i wyczerpanie.");
  },

  shortRest() {
    const char = this.getActiveChar();
    if (!char) return;
    const cls = this.getClassData(char.classId);
    const conMod = this.getMod(this.getEffectiveAbilityScore(char, "CON"));
    const healRoll = Math.max(1, Math.floor(Math.random() * cls.hit_die) + 1 + conMod);
    const effMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = Math.min(effMax, char.hpCurrent + healRoll);
    if (char.classId === "warlock" && char.usedSlots) {
      char.usedSlots.pact = 0;
    }
    this.saveState();
    this.render();
    this.toast(`⛺ Krótki Odpoczynek: Odzyskano +${healRoll} PW${char.classId === 'warlock' ? ' oraz Komórki Magii Paktu!' : '!'}`);
  },

  longRest() {
    const char = this.getActiveChar();
    if (!char) return;
    if (char.exhaustion && char.exhaustion > 0) {
      char.exhaustion = Math.max(0, char.exhaustion - 1);
    }
    char.hpMax = this.calcRecommendedMaxHP(char);
    char.hpCurrent = char.hpMax;
    char.hpTemp = 0;
    char.usedSlots = {};
    char.hitDiceUsed = 0;
    this.saveState();
    this.render();
    this.toast("🌙 Długi Odpoczynek: Pełne PW, odnowione komórki czarów oraz -1 poziom Wyczerpania!");
  },

  // ============================================================================
  // TAB 4: KSIĘGA ZAKLĘĆ (KRĘGI 0–9, KLASY, SZKOŁY, FILTRY + WŁASNA KSIĘGA POSTACI)
  // ============================================================================
  openCharacterSpellbook(charId = null) {
    if (charId) {
      this.state.activeCharId = charId;
    }
    this.state.spellFilters.onlyCharSpells = true;
    this.state.spellFilters.level = "all";
    this.state.spellFilters.classId = "all";
    this.state.spellFilters.school = "all";
    this.state.spellFilters.ritualOnly = false;
    this.state.spellFilters.concOnly = false;
    this.state.spellFilters.search = "";
    this.saveState();
    this.switchTab("spells");
  },

  openFullSpellbook(classId = "all") {
    this.state.spellFilters.onlyCharSpells = false;
    this.state.spellFilters.classId = classId || "all";
    this.state.spellFilters.level = "all";
    this.switchTab("spells");
  },

  renderSpellsTab() {
    const char = this.getActiveChar();
    const cls = char ? this.getClassData(char.classId) : null;
    const f = this.state.spellFilters;

    const basePool = (f.onlyCharSpells && char)
      ? window.DND_SPELLS.filter(s => (char.knownSpells || []).includes(s.id))
      : window.DND_SPELLS;

    const filtered = basePool.filter(sp => {
      if (f.level !== "all" && sp.level !== parseInt(f.level, 10)) return false;
      if (f.classId !== "all" && !sp.classes.includes(f.classId)) return false;
      if (f.school !== "all" && sp.school !== f.school) return false;
      if (f.ritualOnly && !sp.ritual) return false;
      if (f.concOnly && !sp.concentration) return false;
      if (f.search.trim()) {
        const q = f.search.toLowerCase();
        const matchName = (sp.name_pl || "").toLowerCase().includes(q) || (sp.name_en || "").toLowerCase().includes(q);
        const matchDesc = (sp.desc_pl || "").toLowerCase().includes(q) || (sp.desc_en || "").toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => a.level - b.level || a.name_pl.localeCompare(b.name_pl));

    // Group by Circle (0..9)
    const grouped = {};
    filtered.forEach(sp => {
      grouped[sp.level] = grouped[sp.level] || [];
      grouped[sp.level].push(sp);
    });

    const circleCounts = {};
    basePool.forEach(s => {
      circleCounts[s.level] = (circleCounts[s.level] || 0) + 1;
    });

    return `
      <div class="section-header">
        <div>
          <h1 class="section-title">
            ${f.onlyCharSpells && char ? `📖 Księga Zaklęć Bohatera: ${char.name}` : '🔮 Księga Zaklęć D&amp;D 5e (Wikidot Spellbook)'}
          </h1>
          <p class="section-subtitle">
            ${f.onlyCharSpells && char
              ? `Wyświetlasz tylko zaklęcia przypisane do postaci ${char.name} (${(char.knownSpells||[]).length} zaklęć z podziałem na Kręgi 0–9).`
              : 'Duże karty zaklęć 2×2 z pełnym opisem działania. Zaklęcia o rozbudowanych opisach automatycznie rozszerzają się do szerokiego kafelka XL.'}
          </p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${char ? `
            <button class="${f.onlyCharSpells ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="App.openCharacterSpellbook('${char.id}')">
              📖 Własna Księga: ${char.name} (${(char.knownSpells||[]).length})
            </button>
            <button class="${!f.onlyCharSpells ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="App.openFullSpellbook('all')">
              📚 Wszystkie Zaklęcia D&amp;D 5e (${window.DND_SPELLS.length})
            </button>
          ` : ''}
          <button class="btn-secondary btn-sm" onclick="App.state.spellForceXL = !App.state.spellForceXL; App.render();">
            ${this.state.spellForceXL ? '🔲 Układ 2×2 + Auto XL' : '🔳 Powiększ wszystkie zaklęcia (XL)'}
          </button>
          <button class="btn-ghost btn-sm" onclick="App.openAddCustomSpellModal()">➕ Dodaj Własne Zaklęcie</button>
        </div>
      </div>

      ${f.onlyCharSpells && char ? `
        <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg, rgba(139,92,246,0.14), rgba(229,193,88,0.09));border-color:var(--border-gold);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              ${this.renderCharacterPortrait(char, 54)}
              <div>
                <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;color:var(--gold-bright);">
                  📜 Osobista Księga Zaklęć: ${char.name} (${cls ? this.tPlain(cls.name_pl, cls.name_en) : ''} Poz. ${char.level})
                </div>
                <div style="font-size:0.8rem;color:var(--text-muted);">
                  Liczba przypisanych zaklęć: <strong>${(char.knownSpells||[]).length}</strong> • Możesz rzucać kośćmi obrażeń/leczenia bezpośrednio z kart poniżej lub przełączyć na pełną bazę, aby dodać nowe czary.
                </div>
              </div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn-secondary btn-sm" onclick="App.switchTab('sheet')">← Wróć do Karty Postaci</button>
              ${cls && cls.caster_type !== 'none' ? `
                <button class="btn-primary btn-sm" onclick="App.openFullSpellbook('${cls.id}')">
                  ➕ Przeglądaj zaklęcia klasy ${cls.name_pl.split(" ")[0]}
                </button>
              ` : ''}
              <button class="btn-ghost btn-sm" onclick="App.openFullSpellbook('all')">
                📚 Pokaż pełną bazę (${window.DND_SPELLS.length})
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Circle Selector Bar (0-9) -->
      <div class="spell-circles-bar">
        <button class="circle-pill ${f.level === 'all' ? 'active' : ''}" onclick="App.setSpellFilter('level', 'all')">
          ${f.onlyCharSpells ? `Wszystkie Kręgi Postaci (${basePool.length})` : `Wszystkie Kręgi (${window.DND_SPELLS.length})`}
        </button>
        <button class="circle-pill ${f.level === '0' ? 'active' : ''}" onclick="App.setSpellFilter('level', '0')">
          0. Sztuczki / Cantrips (${circleCounts[0] || 0})
        </button>
        ${[1,2,3,4,5,6,7,8,9].map(lvl => `
          <button class="circle-pill ${f.level === String(lvl) ? 'active' : ''}" onclick="App.setSpellFilter('level', '${lvl}')">
            ${lvl}. Krąg (${circleCounts[lvl] || 0})
          </button>
        `).join("")}
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Szukaj zaklęcia po polsku lub angielsku (np. Fireball, Kula Ognia, Shield)..." value="${f.search}" oninput="App.setSpellFilter('search', this.value)">
        </div>

        <select onchange="App.setSpellFilter('classId', this.value)">
          <option value="all" ${f.classId==='all'?'selected':''}>Wszystkie Klasy Czarujące</option>
          ${window.DND_CLASSES.filter(c => c.caster_type !== 'none').map(c => `
            <option value="${c.id}" ${f.classId===c.id?'selected':''}>${c.icon} ${this.tPlain(c.name_pl, c.name_en)}</option>
          `).join("")}
        </select>

        <select onchange="App.setSpellFilter('school', this.value)">
          <option value="all" ${f.school==='all'?'selected':''}>Wszystkie Szkoły Magii</option>
          ${Object.entries(window.DND_SPELL_SCHOOLS).map(([k, v]) => `
            <option value="${k}" ${f.school===k?'selected':''}>${v.icon} ${v.pl} (${k})</option>
          `).join("")}
        </select>

        <label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;cursor:pointer;">
          <input type="checkbox" ${f.ritualOnly ? 'checked' : ''} onchange="App.setSpellFilter('ritualOnly', this.checked)">
          <span>🕯️ Rytuał</span>
        </label>

        <label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;cursor:pointer;">
          <input type="checkbox" ${f.concOnly ? 'checked' : ''} onchange="App.setSpellFilter('concOnly', this.checked)">
          <span>🧠 Koncentracja</span>
        </label>

        ${char ? `
          <label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;cursor:pointer;color:var(--gold);">
            <input type="checkbox" ${f.onlyCharSpells ? 'checked' : ''} onchange="App.setSpellFilter('onlyCharSpells', this.checked)">
            <span>📜 Tylko Księga: ${char.name} (${(char.knownSpells||[]).length})</span>
          </label>
        ` : ''}
      </div>

      <!-- Spells Grouped by Level -->
      ${Object.keys(grouped).length === 0 ? `<div class="card"><p>Brak zaklęć spełniających wybrane kryteria.</p></div>` : ''}
      ${Object.keys(grouped).sort((a,b)=>a-b).map(lvlKey => {
        const lvl = parseInt(lvlKey, 10);
        const list = grouped[lvl];
        const headerTitle = lvl === 0 ? "✨ Krąg 0 — Sztuczki (Cantrips)" : `🔮 Krąg ${lvl} (Zaklęcia ${lvl}. Poziomu)`;
        return `
          <div style="margin-bottom:26px;">
            <h2 style="font-family:var(--font-display);font-size:1.25rem;color:var(--gold);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border-subtle);">
              ${headerTitle} <span class="badge badge-gold">${list.length}</span>
            </h2>
            <div class="grid-spells-detailed ${this.state.spellForceXL ? 'all-xl' : ''}">
              ${list.map(sp => {
                const sch = window.DND_SPELL_SCHOOLS[sp.school] || { pl: sp.school, icon: "✨" };
                const isKnown = char && (char.knownSpells || []).includes(sp.id);
                const isMobCompact = this.isMobileLayout();
                const descLen = ((sp.desc_pl || "").length + (this.state.lang === "pl_en" ? (sp.desc_en || "").length : 0));
                const isXL = Boolean(!isMobCompact && (this.state.spellForceXL || sp.xl || descLen > 340 || (sp.desc_pl || "").length > 230));

                if (isMobCompact) {
                  return `
                    <div class="card mobile-compact-card ${isKnown ? 'selected' : ''}">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;" onclick="App.openSpellModal('${sp.id}')">
                        <div style="flex:1;min-width:0;">
                          <div class="card-title" style="font-size:0.98rem;">${this.t(sp.name_pl, sp.name_en)}</div>
                          <div style="font-size:0.74rem;color:var(--text-muted);margin-top:2px;">
                            ${sch.icon} ${sch.pl} • ⏱️ ${sp.time} • 📏 ${sp.range} • ⏳ ${sp.duration}
                          </div>
                        </div>
                        <span class="badge ${sp.level === 0 ? 'badge-cyan' : 'badge-gold'}" style="font-size:0.72rem;">
                          ${sp.level === 0 ? 'Sztuczka' : sp.level + '. Krąg'}
                        </span>
                      </div>
                      <div class="badge-row" style="margin:4px 0;">
                        ${sp.concentration ? `<span class="badge badge-crimson">🧠 Koncentracja</span>` : ''}
                        ${sp.ritual ? `<span class="badge badge-emerald">🕯️ Rytuał</span>` : ''}
                        ${sp.damage_type ? `<span class="badge badge-arcane">💥 ${sp.damage_type}</span>` : ''}
                        <span class="badge">🔮 ${sp.components}</span>
                      </div>
                      <div class="mobile-clamp-2" style="font-size:0.79rem;color:var(--text-muted);line-height:1.45;" onclick="App.openSpellModal('${sp.id}')">
                        ${this.tDesc(sp)}
                      </div>
                      <div style="display:flex;gap:6px;align-items:center;justify-content:space-between;border-top:1px solid var(--border-subtle);padding-top:8px;">
                        ${sp.dice ? `<button class="btn-primary btn-sm" style="flex:1;" onclick="App.rollCustomFormula('${sp.dice}', '${sp.name_pl.replace(/'/g, "\\'")}')">🎲 Rzuć ${sp.dice.replace(/d/g,'k')}</button>` : ''}
                        <button class="btn-ghost btn-sm" style="flex:1;" onclick="App.openSpellModal('${sp.id}')">📖 Pełny Opis</button>
                        ${char ? `
                          <button class="${isKnown ? 'btn-secondary' : 'btn-primary'} btn-sm" style="flex:1;" onclick="App.toggleCharSpell('${sp.id}')">
                            ${isKnown ? '✓ W Księdze' : '➕ Dodaj'}
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }

                return `
                  <div class="card spell-card-2x2 ${isXL ? 'spell-card-xl' : ''} ${isKnown ? 'selected' : ''}">
                    <div style="display:flex;flex-direction:column;gap:10px;">
                      <div class="card-header" style="margin-bottom:0;">
                        <div onclick="App.openSpellModal('${sp.id}')" style="cursor:pointer;">
                          <div class="card-title" style="font-size:1.15rem;">${this.t(sp.name_pl, sp.name_en)}</div>
                          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;">
                            ${sch.icon} <strong>${sch.pl}</strong> (${sp.school}) •
                            <a href="http://dnd5e.wikidot.com/spell:${sp.id}" target="_blank" onclick="event.stopPropagation()" style="color:var(--gold);">Wikidot ↗</a>
                          </div>
                        </div>
                        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
                          <button class="btn-secondary btn-sm" onclick="App.openSpellModal('${sp.id}')" title="Otwórz dedykowaną podstronę zaklęcia">
                            📖 Podstrona
                          </button>
                          <span class="badge ${sp.level === 0 ? 'badge-cyan' : 'badge-gold'}" style="font-size:0.8rem;padding:5px 10px;">
                            ${sp.level === 0 ? 'Sztuczka (Krąg 0)' : sp.level + '. Krąg'}
                          </span>
                          ${isXL ? `<span class="badge badge-arcane" style="font-size:0.68rem;">📜 Karta XL</span>` : ''}
                        </div>
                      </div>

                      <div class="badge-row" style="margin:0;">
                        ${sp.concentration ? `<span class="badge badge-crimson">🧠 Wymaga Koncentracji</span>` : ''}
                        ${sp.ritual ? `<span class="badge badge-emerald">🕯️ Rytuał (+10 min)</span>` : ''}
                        ${sp.damage_type ? `<span class="badge badge-arcane">💥 Typ: ${sp.damage_type}</span>` : ''}
                        ${sp.dice ? `<span class="badge badge-gold">🎲 Kości: ${sp.dice.replace(/d/g,'k')}</span>` : ''}
                      </div>

                      <div class="spell-meta-grid">
                        <div class="spell-meta-item">
                          <span class="spell-meta-lbl">⏱️ Czas Rzucania</span>
                          <span class="spell-meta-val">${sp.time}</span>
                        </div>
                        <div class="spell-meta-item">
                          <span class="spell-meta-lbl">📏 Zasięg / Obszar</span>
                          <span class="spell-meta-val">${sp.range}</span>
                        </div>
                        <div class="spell-meta-item">
                          <span class="spell-meta-lbl">🔮 Komponenty</span>
                          <span class="spell-meta-val">${sp.components}</span>
                        </div>
                        <div class="spell-meta-item">
                          <span class="spell-meta-lbl">⏳ Czas Trwania</span>
                          <span class="spell-meta-val">${sp.duration}</span>
                        </div>
                      </div>

                      <div class="spell-desc-box">
                        ${this.tDesc(sp)}
                      </div>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--border-subtle);padding-top:10px;">
                      <div style="font-size:0.77rem;color:var(--text-muted);">
                        <strong>Dostępne dla klas:</strong> ${sp.classes.map(cid => {
                          const cObj = this.getClassData(cid);
                          return cObj ? `<span style="color:var(--gold-bright);font-weight:600;">${cObj.icon} ${cObj.name_pl.split(" ")[0]}</span>` : cid;
                        }).join(" • ")}
                      </div>

                      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                          ${sp.dice ? `<button class="btn-primary btn-sm" onclick="App.rollCustomFormula('${sp.dice}', '${sp.name_pl.replace(/'/g, "\\'")}')">🎲 Rzuć ${sp.dice.replace(/d/g,'k')}</button>` : ''}
                          <button class="btn-ghost btn-sm" onclick="App.openSpellModal('${sp.id}')">📖 Pełny Opis / Podstrona</button>
                        </div>
                        ${char ? `
                          <button class="${isKnown ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="App.toggleCharSpell('${sp.id}')">
                            ${isKnown ? '✓ W Księdze Postaci' : '➕ Dodaj do Postaci'}
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}
    `;
  },

  setSpellFilter(key, val) {
    this.state.spellFilters[key] = val;
    this.render();
  },

  toggleCharSpell(spellId) {
    const char = this.getActiveChar();
    if (!char) return;
    char.knownSpells = char.knownSpells || [];
    if (char.knownSpells.includes(spellId)) {
      char.knownSpells = char.knownSpells.filter(id => id !== spellId);
      this.toast("Usunięto zaklęcie z księgi postaci.");
    } else {
      char.knownSpells.push(spellId);
      this.toast("Dodano zaklęcie do księgi postaci!");
    }
    this.saveState();
    this.render();
  },

  openSpellModal(spellId) {
    const sp = window.DND_SPELLS.find(s => s.id === spellId);
    if (!sp) return;
    const sch = window.DND_SPELL_SCHOOLS[sp.school] || { pl: sp.school, icon: "✨" };
    const slug = sp.id;
    const wikidotLink = `http://dnd5e.wikidot.com/spell:${slug}`;

    this.openModal(
      `🔮 ${this.tPlain(sp.name_pl, sp.name_en)}`,
      `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div class="badge-row">
            <span class="badge badge-gold">${sp.level === 0 ? 'Sztuczka (Cantrip)' : `Zaklęcie ${sp.level}. Kręgu`}</span>
            <span class="badge badge-arcane">${sch.icon} ${sch.pl} (${sp.school})</span>
            ${sp.concentration ? `<span class="badge badge-crimson">🧠 Wymaga Koncentracji</span>` : ''}
            ${sp.ritual ? `<span class="badge badge-emerald">🕯️ Rytuał</span>` : ''}
          </div>

          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;background:var(--bg-deep);padding:12px;border-radius:8px;font-size:0.86rem;">
            <div><strong>Czas rzucania:</strong> ${sp.time}</div>
            <div><strong>Zasięg:</strong> ${sp.range}</div>
            <div><strong>Komponenty:</strong> ${sp.components}</div>
            <div><strong>Czas trwania:</strong> ${sp.duration}</div>
          </div>

          <div style="font-size:0.92rem;line-height:1.65;">
            ${this.tDesc(sp)}
          </div>

          <div style="font-size:0.82rem;color:var(--text-muted);">
            <strong>Dostępne dla klas:</strong> ${sp.classes.map(cid => {
              const cObj = window.DND_CLASSES.find(x => x.id === cid);
              return cObj ? this.tPlain(cObj.name_pl, cObj.name_en) : cid;
            }).join(", ")}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
            <a href="${wikidotLink}" target="_blank" style="color:var(--gold);font-size:0.84rem;">🔗 Otwórz stronę zaklęcia na dnd5e.wikidot.com ↗</a>
            ${sp.dice ? `<button class="btn-primary" onclick="App.rollCustomFormula('${sp.dice}', '${sp.name_pl}')">🎲 Rzuć ${sp.dice}</button>` : ''}
          </div>
        </div>
      `
    );
  },

  openAddCustomSpellModal() {
    this.openModal(
      "➕ Dodaj Własne Zaklęcie / Importuj z Wikidot",
      `
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <input type="text" id="cust-sp-pl" placeholder="Nazwa polska (np. Kula Wodna)">
            <input type="text" id="cust-sp-en" placeholder="Nazwa angielska (np. Watery Sphere)">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <select id="cust-sp-lvl">
              ${[0,1,2,3,4,5,6,7,8,9].map(l => `<option value="${l}">${l === 0 ? '0 - Sztuczka' : l + '. Krąg'}</option>`).join("")}
            </select>
            <select id="cust-sp-sch">
              ${Object.keys(window.DND_SPELL_SCHOOLS).map(s => `<option value="${s}">${s}</option>`).join("")}
            </select>
            <input type="text" id="cust-sp-dice" placeholder="Kości (np. 4d6)">
          </div>
          <textarea id="cust-sp-desc" rows="4" placeholder="Opis działania zaklęcia..."></textarea>
          <button class="btn-primary" onclick="App.saveCustomSpell()">💾 Zapisz Zaklęcie w Bazie</button>
        </div>
      `
    );
  },

  saveCustomSpell() {
    const name_pl = document.getElementById("cust-sp-pl").value.trim();
    const name_en = document.getElementById("cust-sp-en").value.trim() || name_pl;
    const level = parseInt(document.getElementById("cust-sp-lvl").value, 10) || 0;
    const school = document.getElementById("cust-sp-sch").value;
    const dice = document.getElementById("cust-sp-dice").value.trim() || null;
    const desc_pl = document.getElementById("cust-sp-desc").value.trim();

    if (!name_pl) {
      this.toast("Podaj nazwę zaklęcia!");
      return;
    }

    const newSp = {
      id: "custom-" + Date.now(),
      name_pl,
      name_en,
      level,
      school,
      classes: ["wizard", "sorcerer", "warlock", "cleric", "druid", "bard"],
      time: "1 akcja",
      range: "60 stóp",
      components: "V, S",
      duration: "Natychmiastowy",
      ritual: false,
      concentration: false,
      dice,
      damage_type: "Custom",
      desc_pl,
      desc_en: desc_pl
    };

    window.DND_SPELLS.push(newSp);
    const saved = JSON.parse(localStorage.getItem("dnd5e_custom_spells_v1") || "[]");
    saved.push(newSp);
    localStorage.setItem("dnd5e_custom_spells_v1", JSON.stringify(saved));
    this.closeModal();
    this.render();
    this.toast(`Dodano zaklęcie: ${name_pl}`);
  },

  // ============================================================================
  // TAB 5: KOMPENDIUM WIKIDOT 5E (KLASY 1-20, RASY, TŁA, ATUTY)
  // ============================================================================
  renderCompendiumTab() {
    const sub = this.state.compendiumSubtab;
    const selCls = this.getClassData(this.state.selectedClassView);

    return `
      <div class="section-header">
        <div>
          <h1 class="section-title">📚 Kompendium Wikidot D&amp;D 5e</h1>
          <p class="section-subtitle">Kompletne tabele tworzenia i rozwoju klas (poziomy 1–20), podklasy, rodowody (rasy), tła oraz atuty z bezpośrednimi odnośnikami do dnd5e.wikidot.com.</p>
        </div>
        <div class="spell-circles-bar" style="margin:0;">
          <button class="circle-pill ${sub==='classes'?'active':''}" onclick="App.state.compendiumSubtab='classes';App.render();">⚔️ Klasy i Rozwój 1–20 (13)</button>
          <button class="circle-pill ${sub==='races'?'active':''}" onclick="App.state.compendiumSubtab='races';App.render();">🧝 Rasy i Rodowody (${window.DND_RACES.length})</button>
          <button class="circle-pill ${sub==='feats'?'active':''}" onclick="App.state.compendiumSubtab='feats';App.render();">🌟 Atuty / Feats (${window.DND_FEATS.length})</button>
          <button class="circle-pill ${sub==='items'?'active':''}" onclick="App.state.compendiumSubtab='items';App.render();">💍 Magiczne Przedmioty (${window.DND_MAGIC_ITEMS.length})</button>
          <button class="circle-pill ${sub==='backgrounds'?'active':''}" onclick="App.state.compendiumSubtab='backgrounds';App.render();">📜 Tła (${window.DND_BACKGROUNDS.length})</button>
          <button class="circle-pill" onclick="App.switchTab('bestiary');">🐉 Bestiariusz AideDD (${(window.DND_MONSTERS||[]).length}) ↗</button>
          <button class="circle-pill" onclick="App.openSourcesAndLicensesModal();">⚖️ Źródła i Licencje</button>
        </div>
      </div>

      ${sub === "classes" ? `
        <div class="spell-circles-bar">
          ${window.DND_CLASSES.map(c => `
            <button class="circle-pill ${selCls.id === c.id ? 'active' : ''}" onclick="App.state.selectedClassView='${c.id}';App.render();">
              ${c.icon} ${this.tPlain(c.name_pl, c.name_en)}
            </button>
          `).join("")}
        </div>

        <div class="card" style="margin-bottom:18px;">
          <div class="card-header">
            <div style="display:flex;align-items:center;gap:14px;">
              <img src="${this.getClassPortrait(selCls.id)}" alt="${selCls.name_pl}" class="portrait-lg">
              <div>
                <h2 class="card-title" style="font-size:1.4rem;">${selCls.icon} ${this.t(selCls.name_pl, selCls.name_en)}</h2>
                <span style="font-size:0.82rem;color:var(--text-muted);">Źródło: ${selCls.source} • <a href="${selCls.wikidot_url}" target="_blank" style="color:var(--gold);">${selCls.wikidot_url} ↗</a></span>
              </div>
            </div>
            <span class="badge badge-gold" style="font-size:0.9rem;">Kość Wytrzymałości: k${selCls.hit_die}</span>
          </div>
          <p style="margin-bottom:12px;">${this.tDesc(selCls)}</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;background:var(--bg-deep);padding:12px;border-radius:8px;font-size:0.84rem;">
            <div><strong>Biegłość w pancerzach:</strong> ${this.tPlain(selCls.armor_prof_pl, selCls.armor_prof_en)}</div>
            <div><strong>Biegłość w broniach:</strong> ${this.tPlain(selCls.weapon_prof_pl, selCls.weapon_prof_en)}</div>
            <div><strong>Rzuty obronne:</strong> ${selCls.saving_throws.join(", ")}</div>
            <div><strong>Umiejętności (wybierz ${selCls.skills_choose}):</strong> ${selCls.skills_list.join(", ")}</div>
          </div>
        </div>

        <h3 style="font-family:var(--font-display);color:var(--gold);margin-bottom:8px;">Tabela Rozwoju Klasy (Poziomy 1–20 wg Wikidot)</h3>
        ${this.renderClassProgressionTable(selCls, 0, false)}

        <h3 style="font-family:var(--font-display);color:var(--gold);margin:20px 0 12px;">Podklasy: ${this.t(selCls.subclass_title_pl, selCls.subclass_title_en)} (${selCls.subclasses.length})</h3>
        <div class="grid-subclasses-detailed">
          ${selCls.subclasses.map(sc => this.renderDetailedSubclassCard(selCls, sc, false, false)).join("")}
        </div>
      ` : ''}

      ${sub === "races" ? (() => {
        const rfSearch = (this.state.raceFilterSearch || "").toLowerCase();
        const rfCat = this.state.raceFilterCat || "all";
        const filteredRaces = window.DND_RACES.filter(r => {
          if (rfCat !== "all" && !(r.category || "").toLowerCase().includes(rfCat.toLowerCase())) return false;
          if (rfSearch) {
            const m = (r.name_pl || "").toLowerCase().includes(rfSearch) ||
                      (r.name_en || "").toLowerCase().includes(rfSearch) ||
                      (r.source || "").toLowerCase().includes(rfSearch) ||
                      (r.traits_pl || []).join(" ").toLowerCase().includes(rfSearch);
            if (!m) return false;
          }
          return true;
        });
        return `
          <div class="filter-bar">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Szukaj rasy / rodowodu po nazwie, podręczniku lub cesze..." value="${this.state.raceFilterSearch || ''}" oninput="App.state.raceFilterSearch=this.value;App.render();">
            </div>
            <select onchange="App.state.raceFilterCat=this.value;App.render();">
              <option value="all" ${rfCat==='all'?'selected':''}>Wszystkie Kategorie Ras (${window.DND_RACES.length})</option>
              <option value="Core" ${rfCat==='Core'?'selected':''}>Podstawowe, Podrasy &amp; Smoki Fizbana (PHB / FTD)</option>
              <option value="Multiverse" ${rfCat==='Multiverse'?'selected':''}>Egzotyczne &amp; Wieloświat (MPMM / Volo / MToF)</option>
              <option value="Monstrous" ${rfCat==='Monstrous'?'selected':''}>Potworne (Goblin, Bugbear, Hobgoblin, Kobold, Ork)</option>
              <option value="Ravenloft" ${rfCat==='Ravenloft'?'selected':''}>Rodowody z Ravenloftu (Dhampir, Hexblood, Reborn)</option>
              <option value="Eberron" ${rfCat==='Eberron'?'selected':''}>Eberron (Warforged, Changeling, Kalashtar, Shifter)</option>
              <option value="Ravnica" ${rfCat==='Ravnica'?'selected':''}>Ravnica, Theros &amp; Strixhaven (Loxodon, Leonin, Owlin, Vedalken...)</option>
              <option value="Spelljammer" ${rfCat==='Spelljammer'?'selected':''}>Spelljammer &amp; Dragonlance (Astral Elf, Plasmoid, Thri-kreen, Kender...)</option>
            </select>
            <button class="btn-secondary btn-sm" onclick="App.state.raceForceXL = !App.state.raceForceXL; App.render();">
              ${this.state.raceForceXL ? '🔲 Układ 2×2 + Auto XL' : '🔳 Pełna Szerokość (XL)'}
            </button>
          </div>
          <div class="grid-races-detailed ${this.state.raceForceXL ? 'all-xl' : ''}">
            ${filteredRaces.map(r => this.renderDetailedRaceCard(r, false, false)).join("")}
          </div>
        `;
      })() : ''}

      ${sub === "feats" ? (() => {
        const fc = this.state.featFilterCat || "all";
        const fs = (this.state.featFilterSearch || "").toLowerCase();
        const filteredFeats = window.DND_FEATS.filter(ft => {
          if (fc !== "all" && !(ft.category || ft.source || "").toLowerCase().includes(fc.toLowerCase())) return false;
          if (fs) {
            const m = (ft.name_pl || "").toLowerCase().includes(fs) ||
                      (ft.name_en || "").toLowerCase().includes(fs) ||
                      (ft.desc_pl || "").toLowerCase().includes(fs) ||
                      (ft.prereq || "").toLowerCase().includes(fs);
            if (!m) return false;
          }
          return true;
        });
        return `
          <div class="filter-bar">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Szukaj atutu po nazwie, wymogu lub efekcie (np. War Caster, Lucky, Elven, GWM, Fey Touched)..." value="${this.state.featFilterSearch || ''}" oninput="App.state.featFilterSearch=this.value;App.render();">
            </div>
            <select onchange="App.state.featFilterCat=this.value;App.render();">
              <option value="all" ${fc==='all'?'selected':''}>Wszystkie Atuty (${window.DND_FEATS.length})</option>
              <option value="PHB" ${fc==='PHB'?'selected':''}>Player's Handbook (PHB)</option>
              <option value="Tasha" ${fc==='Tasha'?'selected':''}>Tasha's Cauldron of Everything (TCE)</option>
              <option value="Xanathar" ${fc==='Xanathar'?'selected':''}>Atuty Rasowe z Xanathar's (XGE)</option>
              <option value="Fizban" ${fc==='Fizban'?'selected':''}>Fizban, Bigby, Strixhaven &amp; Book of Many Things</option>
            </select>
          </div>
          <div class="grid-cards">
            ${filteredFeats.map(ft => `
              <div class="card">
                <div class="card-header">
                  <div class="card-title">${this.t(ft.name_pl, ft.name_en)}</div>
                  <div style="display:flex;gap:6px;align-items:center;">
                    <button class="btn-secondary btn-sm" onclick="App.openFeatDetailModal('${ft.id}')">📖 Podstrona</button>
                    <span class="badge badge-gold">${ft.source}</span>
                  </div>
                </div>
                <div class="badge-row">
                  ${ft.asi ? `<span class="badge badge-emerald">${ft.asi}</span>` : ''}
                  ${ft.prereq ? `<span class="badge badge-arcane">Wymóg: ${ft.prereq}</span>` : ''}
                </div>
                <div style="font-size:0.85rem;margin-top:6px;">${this.tDesc(ft)}</div>
              </div>
            `).join("")}
          </div>
        `;
      })() : ''}

      ${sub === "items" ? (() => {
        const ir = this.state.itemFilterRarity || "all";
        const ic = this.state.itemFilterCat || "all";
        const is = (this.state.itemFilterSearch || "").toLowerCase();
        const char = this.getActiveChar();
        const filteredItems = window.DND_MAGIC_ITEMS.filter(it => {
          if (ir !== "all" && it.rarity !== ir) return false;
          if (ic !== "all" && it.category !== ic) return false;
          if (is) {
            const m = (it.name_pl || "").toLowerCase().includes(is) ||
                      (it.name_en || "").toLowerCase().includes(is) ||
                      (it.desc_pl || "").toLowerCase().includes(is) ||
                      (it.category || "").toLowerCase().includes(is);
            if (!m) return false;
          }
          return true;
        });
        return `
          <div class="filter-bar">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="Szukaj magicznego przedmiotu (np. Flame Tongue, Cloak of Protection, Tatuaż, Vecna, Staff of Power, Bag of Holding)..." value="${this.state.itemFilterSearch || ''}" oninput="App.state.itemFilterSearch=this.value;App.render();">
            </div>
            <select onchange="App.state.itemFilterCat=this.value;App.render();">
              <option value="all" ${ic==='all'?'selected':''}>Wszystkie Kategorie (${window.DND_MAGIC_ITEMS.length})</option>
              <option value="Weapon" ${ic==='Weapon'?'selected':''}>⚔️ Bronie Magiczne (Weapons)</option>
              <option value="Armor" ${ic==='Armor'?'selected':''}>🛡️ Pancerze i Tarcze (Armor &amp; Shields)</option>
              <option value="Wondrous Item" ${ic==='Wondrous Item'?'selected':''}>✨ Cudowne Przedmioty, Pasy, Płaszcze i Tatuaże</option>
              <option value="Spellcasting Focus" ${ic==='Spellcasting Focus'?'selected':''}>🔮 Fokusy Klasowe (+1/+2/+3)</option>
              <option value="Ring" ${ic==='Ring'?'selected':''}>💍 Pierścienie (Rings)</option>
              <option value="Rod" ${ic==='Rod'?'selected':''}>👑 Berła (Rods)</option>
              <option value="Staff" ${ic==='Staff'?'selected':''}>🪄 Kostury (Staves)</option>
              <option value="Wand" ${ic==='Wand'?'selected':''}>⚡ Różdżki (Wands)</option>
              <option value="Potion" ${ic==='Potion'?'selected':''}>🧪 Mikstury i Oleje (Potions)</option>
              <option value="Scroll" ${ic==='Scroll'?'selected':''}>📜 Zwoje (Scrolls)</option>
              <option value="Artifact" ${ic==='Artifact'?'selected':''}>🏆 Artefakty (Artifacts)</option>
            </select>
            <select onchange="App.state.itemFilterRarity=this.value;App.render();">
              <option value="all" ${ir==='all'?'selected':''}>Wszystkie Rzadkości (${window.DND_MAGIC_ITEMS.length})</option>
              <option value="Common" ${ir==='Common'?'selected':''}>Pospolite (Common)</option>
              <option value="Uncommon" ${ir==='Uncommon'?'selected':''}>Niepospolite (Uncommon)</option>
              <option value="Rare" ${ir==='Rare'?'selected':''}>Rzadkie (Rare)</option>
              <option value="Very Rare" ${ir==='Very Rare'?'selected':''}>Bardzo Rzadkie (Very Rare)</option>
              <option value="Legendary" ${ir==='Legendary'?'selected':''}>Legendarne (Legendary)</option>
              <option value="Artifact" ${ir==='Artifact'?'selected':''}>Artefakty (Artifact)</option>
            </select>
            <button class="btn-primary btn-sm" onclick="App.openCustomMagicItemModal()">➕ Stwórz Magiczny Przedmiot</button>
          </div>
          <div class="grid-cards">
            ${filteredItems.slice(0, (this.state.pageLimits && this.state.pageLimits.items) || 24).map(it => {
              const equipped = char && (char.magicItems || []).includes(it.id);
              return `
                <div class="card ${equipped ? 'selected' : ''}">
                  <div class="card-header">
                    <div class="card-title">${this.t(it.name_pl, it.name_en)}</div>
                    <div style="display:flex;gap:6px;align-items:center;">
                      <button class="btn-secondary btn-sm" onclick="App.openMagicItemDetailModal('${it.id}')">📖 Podstrona</button>
                      <span class="badge badge-gold">${it.rarity}</span>
                    </div>
                  </div>
                  <div class="badge-row">
                    <span class="badge">${it.category}</span>
                    ${it.attunement ? `<span class="badge badge-arcane">${it.attunement_req || 'Wymaga zestrojenia'}</span>` : `<span class="badge badge-cyan">Bez zestrojenia</span>`}
                    ${it.bonus_ac ? `<span class="badge badge-gold">+${it.bonus_ac} KP</span>` : ''}
                    ${it.bonus_saves ? `<span class="badge badge-emerald">+${it.bonus_saves} Rzuty Obronne</span>` : ''}
                    ${it.bonus_spell_dc ? `<span class="badge badge-arcane">+${it.bonus_spell_dc} ST Czarów</span>` : ''}
                  </div>
                  <div style="font-size:0.84rem;margin:8px 0 12px;">${this.tDesc(it)}</div>
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                    ${it.roll ? `<button class="btn-primary btn-sm" onclick="App.rollCustomFormula('${it.roll}', '${it.roll_label || it.name_pl}')">🎲 Rzuć ${it.roll.replace(/d/g,'k')}</button>` : '<span></span>'}
                    ${char ? `<button class="${equipped ? 'btn-secondary' : 'btn-ghost'} btn-sm" onclick="App.toggleCharMagicItem('${it.id}')">${equipped ? '✓ Wyposażony' : '➕ Wyposaż Postać'}</button>` : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          ${this.renderPaginationBar('items', filteredItems.length, Math.min(filteredItems.length, (this.state.pageLimits && this.state.pageLimits.items) || 24), 24)}
        `;
      })() : ''}

      ${sub === "backgrounds" ? `
        <div class="grid-cards">
          ${window.DND_BACKGROUNDS.map(b => `
            <div class="card">
              <div class="card-header">
                <div class="card-title">${this.t(b.name_pl, b.name_en)}</div>
                <div style="display:flex;gap:6px;align-items:center;">
                  <button class="btn-secondary btn-sm" onclick="App.openBackgroundDetailModal('${b.id}')">📖 Podstrona</button>
                  <span class="badge badge-arcane">${b.skills.join(", ")}</span>
                </div>
              </div>
              <p style="font-size:0.83rem;margin-bottom:6px;"><strong>Narzędzia/Języki:</strong> ${b.tools_pl}</p>
              <p style="font-size:0.83rem;margin-bottom:6px;"><strong>Cecha:</strong> ${b.feature_pl}</p>
              <p style="font-size:0.8rem;color:var(--text-muted);">${b.desc_pl}</p>
            </div>
          `).join("")}
        </div>
      ` : ''}
    `;
  },

  // ============================================================================
  // SZCZEGÓŁOWE KARTY PODKLAS (2x2) ORAZ DEDYKOWANE PODSTRONY (MODALE OPISOWE)
  // ============================================================================
  renderDetailedSubclassCard(cls, sc, isSelected = false, selectable = false, fullExpanded = false) {
    const sMech = this.getSubclassMechanics(sc.id) || {};
    const feats = sMech.features || [];
    const isMobCompact = this.isMobileLayout() && !fullExpanded;
    const primaryFeats = fullExpanded ? feats : feats.slice(0, 2);
    const extraFeats = fullExpanded ? [] : feats.slice(2);
    const spellsByLvl = sMech.spells_by_level || null;
    const bonusSpellsCount = spellsByLvl ? Object.values(spellsByLvl).flat().length : 0;
    const lore = sMech.lore_pl || this.tDesc(sc);

    if (isMobCompact) {
      return `
        <div class="card mobile-compact-card ${isSelected ? 'selected' : ''}" ${selectable ? `onclick="App.setCharSubclass('${sc.id}')" style="cursor:pointer;"` : ''}>
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="${this.getClassPortrait(cls.id)}" alt="${sc.name_pl}" class="portrait-thumb" style="width:44px;height:44px;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                <div class="card-title" style="font-size:0.98rem;">${this.t(sc.name_pl, sc.name_en)}</div>
                <span class="badge ${isSelected ? 'badge-emerald' : 'badge-gold'}" style="font-size:0.7rem;">${isSelected ? '✓ Wybrana' : sc.source}</span>
              </div>
              <div style="font-size:0.74rem;color:var(--text-muted);margin-top:2px;">
                ${cls.icon} ${this.tPlain(cls.name_pl, cls.name_en)} • Od ${cls.subclass_level}. poz. • ${feats.length} zdolności
              </div>
            </div>
          </div>
          <div class="badge-row" style="margin:6px 0;">
            ${feats.map(f => `<span class="badge badge-gold">Poz. ${f.level}: ${this.tPlain(f.name_pl, f.name_en)}</span>`).join("")}
            ${bonusSpellsCount ? `<span class="badge badge-arcane">🔮 +${bonusSpellsCount} Zaklęć</span>` : ''}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--border-subtle);padding-top:8px;">
            <button class="btn-secondary btn-sm" style="flex:1;" onclick="event.stopPropagation(); App.openSubclassDetailModal('${cls.id}', '${sc.id}')">
              📖 Pełny Opis Podklasy
            </button>
            ${selectable ? `
              <button class="${isSelected ? 'btn-secondary' : 'btn-primary'} btn-sm" style="flex:1;" onclick="event.stopPropagation(); App.setCharSubclass('${sc.id}')">
                ${isSelected ? '✓ Wybrana' : '✨ Wybierz'}
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }

    return `
      <div class="card subclass-card-detailed ${isSelected ? 'selected' : ''}" ${selectable ? `onclick="App.setCharSubclass('${sc.id}')" style="cursor:pointer;"` : ''}>
        <div class="card-header" style="margin-bottom:4px;align-items:flex-start;">
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="${this.getClassPortrait(cls.id)}" alt="${sc.name_pl}" class="portrait-thumb" style="width:54px;height:54px;">
            <div>
              <div class="card-title" style="font-size:1.14rem;">${this.t(sc.name_pl, sc.name_en)}</div>
              <div style="font-size:0.77rem;color:var(--text-muted);margin-top:2px;">
                ${cls.icon} <strong>${this.tPlain(cls.name_pl, cls.name_en)}</strong> • 📚 Źródło: <strong>${sc.source}</strong> • Od ${cls.subclass_level}. poziomu
              </div>
            </div>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
            <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); App.openSubclassDetailModal('${cls.id}', '${sc.id}')" title="Otwórz dedykowaną podstronę tej podklasy">
              📖 Podstrona
            </button>
            ${selectable ? `
              <span class="badge ${isSelected ? 'badge-emerald' : 'badge-gold'}" style="font-size:0.8rem;padding:5px 10px;">
                ${isSelected ? '✓ Wybrana' : 'Wybierz'}
              </span>
            ` : `<span class="badge badge-gold">${sc.source}</span>`}
          </div>
        </div>

        <div class="badge-row" style="margin:2px 0;">
          <span class="badge badge-gold">⚔️ ${feats.length} zdolności (Poz. ${feats.map(f => f.level).filter((v,i,a)=>a.indexOf(v)===i).join(" / ")})</span>
          ${sMech.init_ability ? `<span class="badge badge-emerald">⚡ +${sMech.init_ability.toUpperCase()} do Inicjatywy</span>` : ''}
          ${sMech.init_prof_at_level ? `<span class="badge badge-emerald">⚡ +Biegłość do Inicjatywy</span>` : ''}
          ${sMech.ac_bonus_passive ? `<span class="badge badge-gold">🛡️ +${sMech.ac_bonus_passive} KP</span>` : ''}
          ${sMech.toggle_buff ? `<span class="badge badge-crimson">🔥 ${sMech.toggle_buff.name_pl}</span>` : ''}
          ${bonusSpellsCount ? `<span class="badge badge-arcane">🔮 +${bonusSpellsCount} Zaklęć</span>` : ''}
        </div>

        <div class="race-lore-box" style="margin:2px 0;">
          <strong>📜 Charakterystyka:</strong> ${lore}
        </div>

        ${spellsByLvl ? `
          <div style="background:var(--bg-deep);border:1px solid var(--border-subtle);border-radius:8px;padding:9px 11px;">
            <div style="font-size:0.76rem;font-weight:700;color:var(--arcane-bright);margin-bottom:4px;">
              🔮 Zaklęcia Podklasy (kliknij nazwę, aby otworzyć podstronę zaklęcia):
            </div>
            <div style="display:flex;flex-direction:column;gap:3px;font-size:0.76rem;">
              ${Object.entries(spellsByLvl).map(([lvl, spIds]) => `
                <div>
                  <strong style="color:var(--gold);">Poz. ${lvl}:</strong>
                  ${spIds.map(sid => {
                    const spObj = this.getSpellById(sid);
                    const label = spObj ? this.tPlain(spObj.name_pl, spObj.name_en) : sid;
                    return spObj
                      ? `<a href="javascript:void(0)" onclick="event.stopPropagation(); App.openSpellModal('${spObj.id}')" style="color:var(--arcane-bright);text-decoration:underline;margin-right:5px;">${label}</a>`
                      : `<span style="color:var(--text-main);margin-right:5px;">${label}</span>`;
                  }).join(" • ")}
                </div>
              `).join("")}
            </div>
          </div>
        ` : ''}

        <div class="subclass-feature-timeline">
          ${primaryFeats.map(f => `
            <div class="subclass-feature-item">
              <div class="subclass-feature-head">
                <strong style="color:var(--gold-bright);font-size:0.89rem;">⚡ Poziom ${f.level}: ${this.t(f.name_pl, f.name_en)}</strong>
                <div style="display:flex;gap:6px;align-items:center;">
                  <span class="badge badge-gold" style="font-size:0.68rem;">Poz. ${f.level}</span>
                  ${f.roll ? `
                    <button class="btn-primary btn-sm" onclick="event.stopPropagation(); App.rollCustomFormula('${f.roll}', '${(f.roll_label || f.name_pl).replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.72rem;">
                      🎲 Rzuć ${f.roll.replace(/d/g,'k')}
                    </button>
                  ` : ''}
                </div>
              </div>
              <div style="font-size:0.81rem;color:var(--text-main);line-height:1.52;">
                ${this.tDesc(f)}
              </div>
            </div>
          `).join("")}

          ${extraFeats.length > 0 ? `
            <details class="std-accordion" onclick="event.stopPropagation()">
              <summary>
                <span>⚔️ Wyższe poziomy podklasy: Poz. ${extraFeats.map(f => f.level).join(" / ")} (+${extraFeats.length} zdolności)</span>
              </summary>
              <div class="std-accordion-body">
                ${extraFeats.map(f => `
                  <div class="subclass-feature-item">
                    <div class="subclass-feature-head">
                      <strong style="color:var(--gold-bright);font-size:0.88rem;">⚡ Poziom ${f.level}: ${this.t(f.name_pl, f.name_en)}</strong>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <span class="badge badge-gold" style="font-size:0.68rem;">Poz. ${f.level}</span>
                        ${f.roll ? `
                          <button class="btn-primary btn-sm" onclick="event.stopPropagation(); App.rollCustomFormula('${f.roll}', '${(f.roll_label || f.name_pl).replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.72rem;">
                            🎲 Rzuć ${f.roll.replace(/d/g,'k')}
                          </button>
                        ` : ''}
                      </div>
                    </div>
                    <div style="font-size:0.81rem;color:var(--text-main);line-height:1.5;">
                      ${this.tDesc(f)}
                    </div>
                  </div>
                `).join("")}
              </div>
            </details>
          ` : ''}
        </div>
      </div>
    `;
  },

  openRaceDetailModal(raceId) {
    const r = this.getRaceData(raceId);
    if (!r) return;
    const char = this.getActiveChar();
    const isSelected = char && char.raceId === r.id;
    this.openModal(
      `🧝 Podstrona Rasy: ${this.tPlain(r.name_pl, r.name_en)} (${r.source})`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${this.renderDetailedRaceCard(r, isSelected, false, true)}
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="${r.wikidot_url}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz oficjalną stronę na dnd5e.wikidot.com ↗</a>
            <div style="display:flex;gap:8px;">
              ${char ? `
                <button class="btn-primary" onclick="App.setCharRace('${r.id}'); App.closeModal(); App.toast('🧝 Wybrano rasę: ${r.name_pl}');">
                  ${isSelected ? '✓ Aktualnie Wybrana Rasa' : `✨ Wybierz Rasę: ${r.name_pl}`}
                </button>
              ` : ''}
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  openClassDetailModal(classId) {
    const cls = this.getClassData(classId);
    if (!cls) return;
    const char = this.getActiveChar();
    const isSelected = char && char.classId === cls.id;
    this.openModal(
      `${cls.icon} Podstrona Klasy: ${this.tPlain(cls.name_pl, cls.name_en)} (Poziomy 1–20)`,
      `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:14px;">
              <img src="${this.getClassPortrait(cls.id)}" alt="${cls.name_pl}" class="portrait-lg">
              <div>
                <h3 style="font-family:var(--font-display);font-size:1.35rem;color:var(--gold);">${cls.icon} ${this.t(cls.name_pl, cls.name_en)}</h3>
                <div style="font-size:0.82rem;color:var(--text-muted);">
                  📚 Źródło: <strong>${cls.source}</strong> • Kość Wytrzymałości: <strong>k${cls.hit_die}</strong> • Rzuty Obronne: <strong>${cls.saving_throws.join(", ")}</strong>
                </div>
              </div>
            </div>
            ${char ? `
              <button class="btn-primary" onclick="App.setCharClass('${cls.id}'); App.closeModal(); App.toast('⚔️ Wybrano klasę: ${cls.name_pl}');">
                ${isSelected ? '✓ Aktualna Klasa Bohatera' : `✨ Wybierz Klasę: ${cls.name_pl}`}
              </button>
            ` : ''}
          </div>

          <div class="race-lore-box">
            ${this.tDesc(cls)}
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;background:var(--bg-deep);padding:12px;border-radius:8px;font-size:0.84rem;">
            <div><strong>🛡️ Pancerze:</strong> ${this.tPlain(cls.armor_prof_pl, cls.armor_prof_en)}</div>
            <div><strong>⚔️ Bronie:</strong> ${this.tPlain(cls.weapon_prof_pl, cls.weapon_prof_en)}</div>
            <div><strong>🎯 Umiejętności (${cls.skills_choose}):</strong> ${cls.skills_list.join(", ")}</div>
            <div><strong>🔮 Cecha Magii:</strong> ${cls.spellcasting_ability || 'Brak (Klasa Bojowa)'}</div>
          </div>

          <div>
            <h4 style="font-family:var(--font-display);color:var(--gold);margin-bottom:8px;">📊 Tabela Rozwoju Klasy (Poziomy 1–20)</h4>
            ${this.renderClassProgressionTable(cls, char ? char.level : 1, false)}
          </div>

          <div>
            <h4 style="font-family:var(--font-display);color:var(--gold);margin-bottom:8px;">⚡ Kluczowe Zdolności Klasowe</h4>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${(cls.key_features || []).map(kf => `
                <div class="subclass-feature-item">
                  <strong style="color:var(--gold-bright);">Poz. ${kf.level}: ${this.t(kf.name_pl, kf.name_en)}</strong>
                  <div style="font-size:0.83rem;color:var(--text-main);margin-top:4px;">${this.tDesc(kf)}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div>
            <h4 style="font-family:var(--font-display);color:var(--gold);margin-bottom:8px;">✨ Dostępne Podklasy (${(cls.subclasses || []).length}) — kliknij, aby otworzyć podstronę podklasy:</h4>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${(cls.subclasses || []).map(sc => `
                <button class="btn-secondary btn-sm" onclick="App.openSubclassDetailModal('${cls.id}', '${sc.id}')">
                  📖 ${this.tPlain(sc.name_pl, sc.name_en)} (${sc.source})
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="${cls.wikidot_url}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz oficjalną stronę klasy na dnd5e.wikidot.com ↗</a>
            <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
          </div>
        </div>
      `
    );
  },

  openSubclassDetailModal(classId, subclassId) {
    const cls = this.getClassData(classId);
    const sc = (cls.subclasses || []).find(s => s.id === subclassId);
    if (!cls || !sc) return;
    const char = this.getActiveChar();
    const isSelected = char && char.classId === cls.id && char.subclassId === sc.id;
    const wikidotSubUrl = `${cls.wikidot_url}:${sc.id}`;

    this.openModal(
      `✨ Podstrona Podklasy: ${this.tPlain(sc.name_pl, sc.name_en)} (${cls.name_pl})`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${this.renderDetailedSubclassCard(cls, sc, isSelected, false, true)}
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <div style="display:flex;gap:12px;align-items:center;">
              <a href="${wikidotSubUrl}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz podklasę na dnd5e.wikidot.com ↗</a>
              <button class="btn-ghost btn-sm" onclick="App.openClassDetailModal('${cls.id}')">← Wróć do Klasy ${cls.name_pl}</button>
            </div>
            <div style="display:flex;gap:8px;">
              ${char ? `
                <button class="btn-primary" onclick="App.setCharClass('${cls.id}'); App.setCharSubclass('${sc.id}'); App.closeModal(); App.toast('✨ Wybrano podklasę: ${sc.name_pl}');">
                  ${isSelected ? '✓ Aktualnie Wybrana Podklasa' : `✨ Wybierz Podklasę: ${sc.name_pl}`}
                </button>
              ` : ''}
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  openBackgroundDetailModal(bgId) {
    const b = this.getBgData(bgId);
    if (!b) return;
    const char = this.getActiveChar();
    const isSelected = char && char.backgroundId === b.id;

    this.openModal(
      `📜 Podstrona Tła (Background): ${this.tPlain(b.name_pl, b.name_en)}`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="badge-row">
            <span class="badge badge-gold">🎯 Biegłości w umiejętnościach: ${b.skills.join(", ")}</span>
            <span class="badge badge-arcane">🛠️ Narzędzia i Języki: ${b.tools_pl}</span>
          </div>
          <div class="race-lore-box">
            <strong>📖 Opis Pochodzenia:</strong> ${b.desc_pl}
          </div>
          <div class="subclass-feature-item">
            <strong style="color:var(--gold-bright);">🌟 Cecha Tła: ${b.feature_pl}</strong>
            <div style="font-size:0.86rem;color:var(--text-main);margin-top:6px;">
              Jako <strong>${this.tPlain(b.name_pl, b.name_en)}</strong> posiadasz specjalną cechę fabularną <em>${b.feature_pl}</em> oraz startowe biegłości w umiejętnościach <strong>${b.skills.join(" i ")}</strong>, które automatycznie zaznaczają się na Twojej Karcie Postaci po wybraniu tego tła.
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="http://dnd5e.wikidot.com/background:${b.id}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz tło na dnd5e.wikidot.com ↗</a>
            <div style="display:flex;gap:8px;">
              ${char ? `
                <button class="btn-primary" onclick="App.setCharBackground('${b.id}'); App.closeModal(); App.toast('📜 Wybrano tło: ${b.name_pl}');">
                  ${isSelected ? '✓ Aktualne Tło Bohatera' : `✨ Wybierz Tło: ${b.name_pl}`}
                </button>
              ` : ''}
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  openFeatDetailModal(featId) {
    const ft = window.DND_FEATS.find(f => f.id === featId);
    if (!ft) return;
    const char = this.getActiveChar();
    const hasFeat = char && (char.feats || []).includes(ft.id);

    this.openModal(
      `🌟 Podstrona Atutu (Feat): ${this.tPlain(ft.name_pl, ft.name_en)} (${ft.source})`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="badge-row">
            <span class="badge badge-gold">📚 Źródło: ${ft.source}</span>
            ${ft.asi ? `<span class="badge badge-emerald">⚡ Premia do Cech: ${ft.asi}</span>` : ''}
            <span class="badge badge-arcane">🔒 Wymagania: ${ft.prereq || 'Brak wymagań wstępnych'}</span>
          </div>
          <div class="subclass-feature-item" style="font-size:0.92rem;line-height:1.65;">
            ${this.tDesc(ft)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="http://dnd5e.wikidot.com/feat:${ft.id}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz atut na dnd5e.wikidot.com ↗</a>
            <div style="display:flex;gap:8px;">
              ${char ? `
                <button class="btn-primary" onclick="App.toggleCharFeat('${ft.id}'); App.closeModal();">
                  ${hasFeat ? '🗑️ Usuń Atut z Postaci' : `➕ Dodaj Atut do Postaci: ${ft.name_pl}`}
                </button>
              ` : ''}
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  openMagicItemDetailModal(itemId) {
    const it = window.DND_MAGIC_ITEMS.find(x => x.id === itemId);
    if (!it) return;
    const char = this.getActiveChar();
    const equipped = char && (char.magicItems || []).includes(it.id);
    const aideddUrl = `https://www.aidedd.org/dnd/om.php?vo=${encodeURIComponent(it.aidedd_slug || it.id)}`;

    this.openModal(
      `💍 Podstrona Przedmiotu: ${this.tPlain(it.name_pl, it.name_en)} (${it.rarity})`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="badge-row">
            <span class="badge badge-gold">✨ Rzadkość: ${it.rarity}</span>
            <span class="badge">${it.category}</span>
            ${it.source ? `<span class="badge badge-cyan">📚 ${it.source}</span>` : ''}
            ${it.attunement ? `<span class="badge badge-arcane">🔗 ${it.attunement_req || 'Wymaga zestrojenia (Attunement)'}</span>` : `<span class="badge badge-cyan">Bez zestrojenia</span>`}
            ${it.bonus_ac ? `<span class="badge badge-gold">🛡️ +${it.bonus_ac} do KP (Auto)</span>` : ''}
            ${it.bonus_saves ? `<span class="badge badge-emerald">🛡️ +${it.bonus_saves} do Rzutów Obronnych (Auto)</span>` : ''}
            ${it.bonus_spell_dc ? `<span class="badge badge-arcane">🔮 +${it.bonus_spell_dc} do ST i Ataku Czarów (Auto)</span>` : ''}
          </div>
          <div class="subclass-feature-item" style="font-size:0.92rem;line-height:1.65;">
            ${this.tDesc(it)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              ${it.roll ? `<button class="btn-secondary" onclick="App.rollCustomFormula('${it.roll}', '${(it.roll_label || it.name_pl).replace(/'/g, "\\'")}')">🎲 Rzuć ${it.roll.replace(/d/g,'k')}</button>` : ''}
              <a href="${aideddUrl}" target="_blank" rel="noopener" class="btn-ghost btn-sm" style="text-decoration:none;">🔗 Karta AideDD ↗</a>
              ${it.wikidot_url ? `<a href="${it.wikidot_url}" target="_blank" rel="noopener" class="btn-ghost btn-sm" style="text-decoration:none;">🔗 Wikidot 5e ↗</a>` : ''}
            </div>
            <div style="display:flex;gap:8px;">
              ${char ? `
                <button class="btn-primary" onclick="App.toggleCharMagicItem('${it.id}'); App.closeModal();">
                  ${equipped ? '🗑️ Zdejmij Przedmiot' : `➕ Wyposaż Postać: ${it.name_pl}`}
                </button>
              ` : ''}
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  openCustomMagicItemModal() {
    this.openModal(
      "💍 Kuźnia Magicznych Przedmiotów i Artefaktów (Custom Magic Item)",
      `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Nazwa Przedmiotu (PL)</label>
              <input type="text" id="cmi-name-pl" placeholder="np. Korona Króla Lisza" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Nazwa Angielska (EN)</label>
              <input type="text" id="cmi-name-en" placeholder="np. Crown of the Lich King" style="width:100%;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Kategoria</label>
              <select id="cmi-cat" style="width:100%;">
                <option value="Wondrous Item">Cudowny Przedmiot (Wondrous Item)</option>
                <option value="Weapon">Broń Magiczna (Weapon)</option>
                <option value="Armor">Pancerz / Tarcza (Armor)</option>
                <option value="Spellcasting Focus">Fokus Czarowania (Spellcasting Focus)</option>
                <option value="Ring">Pierścień (Ring)</option>
                <option value="Rod">Berło (Rod)</option>
                <option value="Staff">Kostur (Staff)</option>
                <option value="Wand">Różdżka (Wand)</option>
                <option value="Potion">Mikstura (Potion)</option>
                <option value="Artifact">Artefakt (Artifact)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Rzadkość</label>
              <select id="cmi-rarity" style="width:100%;">
                <option value="Common">Pospolity (Common)</option>
                <option value="Uncommon">Niepospolity (Uncommon)</option>
                <option value="Rare" selected>Rzadki (Rare)</option>
                <option value="Very Rare">Bardzo Rzadki (Very Rare)</option>
                <option value="Legendary">Legendarny (Legendary)</option>
                <option value="Artifact">Artefakt (Artifact)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.76rem;color:var(--text-muted);">Kości Akcji (opcjonalnie)</label>
              <input type="text" id="cmi-roll" placeholder="np. 4d8 lub 8d6" style="width:100%;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
            <div>
              <label style="font-size:0.74rem;color:var(--text-muted);">Bonus do KP (+AC)</label>
              <input type="number" id="cmi-ac" value="0" min="0" max="10" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.74rem;color:var(--text-muted);">Bonus Rzutów Obr.</label>
              <input type="number" id="cmi-saves" value="0" min="0" max="10" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.74rem;color:var(--text-muted);">Bonus ST Czarów</label>
              <input type="number" id="cmi-dc" value="0" min="0" max="10" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.74rem;color:var(--text-muted);">Bonus Ataku Czarem</label>
              <input type="number" id="cmi-spatk" value="0" min="0" max="10" style="width:100%;">
            </div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
            <input type="checkbox" id="cmi-attune" checked>
            <span>Wymaga Zestrojenia (Attunement)</span>
          </label>
          <textarea id="cmi-desc" rows="3" placeholder="Pełny opis właściwości magicznego przedmiotu..."></textarea>
          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <button class="btn-ghost" onclick="App.closeModal()">Anuluj</button>
            <button class="btn-primary" onclick="App.saveCustomMagicItem()">💾 Stwórz i Wyposaż Postać</button>
          </div>
        </div>
      `
    );
  },

  saveCustomMagicItem() {
    const name_pl = document.getElementById("cmi-name-pl").value.trim();
    if (!name_pl) {
      this.toast("Podaj nazwę przedmiotu!");
      return;
    }
    const name_en = document.getElementById("cmi-name-en").value.trim() || name_pl;
    const category = document.getElementById("cmi-cat").value;
    const rarity = document.getElementById("cmi-rarity").value;
    const roll = document.getElementById("cmi-roll").value.trim() || null;
    const bonus_ac = parseInt(document.getElementById("cmi-ac").value, 10) || 0;
    const bonus_saves = parseInt(document.getElementById("cmi-saves").value, 10) || 0;
    const bonus_spell_dc = parseInt(document.getElementById("cmi-dc").value, 10) || 0;
    const bonus_spell_atk = parseInt(document.getElementById("cmi-spatk").value, 10) || 0;
    const attunement = document.getElementById("cmi-attune").checked;
    const desc_pl = document.getElementById("cmi-desc").value.trim() || "Własny magiczny przedmiot.";

    const newItem = {
      id: "custom-item-" + Date.now(),
      name_pl,
      name_en,
      category,
      rarity,
      attunement,
      attunement_req: attunement ? "Wymaga zestrojenia" : null,
      bonus_ac: bonus_ac || undefined,
      bonus_saves: bonus_saves || undefined,
      bonus_spell_dc: bonus_spell_dc || undefined,
      bonus_spell_atk: bonus_spell_atk || undefined,
      roll: roll || undefined,
      roll_label: roll ? `${name_pl} (${roll})` : undefined,
      desc_pl,
      desc_en: desc_pl
    };

    window.DND_MAGIC_ITEMS.unshift(newItem);
    const char = this.getActiveChar();
    if (char) {
      char.magicItems = char.magicItems || [];
      char.magicItems.push(newItem.id);
      this.saveState();
    }
    this.closeModal();
    this.render();
    this.toast(`💍 Dodano i wyposażono przedmiot: ${name_pl}!`);
  },

  // ============================================================================
  // TAB 6: BESTIARIUSZ D&D 5E (AIDEDD MONSTERS — https://www.aidedd.org/monster-dnd5/)
  // ============================================================================
  renderBestiaryTab() {
    const monsters = window.DND_MONSTERS || [];
    const q = (this.state.monsterFilterSearch || "").toLowerCase();
    const fType = this.state.monsterFilterType || "all";
    const fCr = this.state.monsterFilterCr || "all";
    const beastsOnly = Boolean(this.state.monsterBeastsOnly);
    const enc = this.state.encounterMonsters || [];

    const filtered = monsters.filter(m => {
      if (beastsOnly && m.type_en !== "Beast") return false;
      if (fType !== "all" && m.type_en !== fType) return false;
      if (fCr !== "all") {
        if (fCr === "low" && m.cr_num > 1) return false;
        else if (fCr === "mid" && (m.cr_num < 2 || m.cr_num > 5)) return false;
        else if (fCr === "high" && (m.cr_num < 6 || m.cr_num > 12)) return false;
        else if (fCr === "epic" && (m.cr_num < 13 || m.cr_num > 19)) return false;
        else if (fCr === "legend" && m.cr_num < 20) return false;
        else if (!["low","mid","high","epic","legend"].includes(fCr) && String(m.cr) !== fCr) return false;
      }
      if (q) {
        const match = (m.name_pl || "").toLowerCase().includes(q) ||
                      (m.name_en || "").toLowerCase().includes(q) ||
                      (m.type_pl || "").toLowerCase().includes(q) ||
                      (m.traits || []).map(t => t.name_pl + " " + t.desc_pl).join(" ").toLowerCase().includes(q) ||
                      (m.actions || []).map(a => a.name_pl + " " + a.desc_pl).join(" ").toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => a.cr_num - b.cr_num || a.name_pl.localeCompare(b.name_pl));

    return `
      <div class="section-header">
        <div>
          <h1 class="section-title">🐉 Bestiariusz D&amp;D 5e (AideDD Monster Manual)</h1>
          <p class="section-subtitle">
            Pełne bloki statystyk potworów z <a href="https://www.aidedd.org/monster-dnd5/" target="_blank" style="color:var(--gold);font-weight:600;">aidedd.org/monster-dnd5 ↗</a> — klikalne rzuty na Cechy, Trafienie, Obrażenia i PW, filtr Dzikiego Kształtu (Wild Shape / Polimorfia) oraz Tracker Starcia.
          </p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="${beastsOnly ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="App.state.monsterBeastsOnly = !App.state.monsterBeastsOnly; App.render();">
            🐾 ${beastsOnly ? '✓ Tylko Bestie (Wild Shape / Polimorfia)' : 'Pokaż Bestie (Druid / Polimorfia / Chowańce)'}
          </button>
          <button class="btn-secondary btn-sm" onclick="App.state.monsterForceXL = !App.state.monsterForceXL; App.render();">
            ${this.state.monsterForceXL ? '🔲 Układ 2×2 + Auto XL' : '🔳 Pełna Szerokość (XL)'}
          </button>
          <button class="btn-primary btn-sm" onclick="App.openCustomMonsterModal()">➕ Stwórz Potwora</button>
        </div>
      </div>

      ${enc.length > 0 ? `
        <div class="card" style="margin-bottom:18px;background:linear-gradient(135deg, rgba(217,70,79,0.14), rgba(229,193,88,0.1));border-color:var(--gold);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
            <div>
              <strong style="font-family:var(--font-display);font-size:1.05rem;color:var(--gold-bright);">⚔️ Aktywne Starcie / Przywołane Istoty (${enc.length})</strong>
              <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Śledź na żywo PW potworów, wierzchowców, chowańców lub form Dzikiego Kształtu Druida</span>
            </div>
            <button class="btn-ghost btn-sm" onclick="App.state.encounterMonsters=[];App.render();">🗑️ Wyczyść starcie</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;">
            ${enc.map((em, idx) => `
              <div style="background:var(--bg-deep);border:1px solid ${em.hpCurrent <= 0 ? 'var(--crimson)' : 'var(--border-gold)'};border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                  <div style="cursor:pointer;" onclick="App.openMonsterDetailModal('${em.id}')">
                    <strong style="color:var(--gold-bright);">${em.icon || '🐉'} ${em.label}</strong>
                    <span class="badge badge-gold" style="margin-left:4px;">🛡️ KP ${em.ac}</span>
                  </div>
                  <button class="btn-ghost btn-sm" onclick="App.removeEncounterMonster(${idx})">✕</button>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                  <span style="font-family:var(--font-mono);font-weight:800;font-size:1.05rem;color:${em.hpCurrent <= 0 ? 'var(--crimson)' : 'var(--emerald)'};">
                    ${em.hpCurrent <= 0 ? '💀 0' : `❤️ ${em.hpCurrent}`} / ${em.hpMax} PW
                  </span>
                  <div style="display:flex;gap:4px;">
                    <button class="btn-danger btn-sm" onclick="App.modifyEncounterHP(${idx}, -5)">-5</button>
                    <button class="btn-danger btn-sm" onclick="App.modifyEncounterHP(${idx}, -1)">-1</button>
                    <button class="btn-secondary btn-sm" onclick="App.modifyEncounterHP(${idx}, 1)">+1</button>
                    <button class="btn-primary btn-sm" onclick="App.modifyEncounterHP(${idx}, 5)">+5</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <div class="filter-bar">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Szukaj potwora po nazwie PL/EN, zdolności lub ataku (np. Smok, Dragon, Licz, Beholder, Wilk, T-Rex, Goblin, Wampir)..." value="${this.state.monsterFilterSearch || ''}" oninput="App.state.monsterFilterSearch=this.value;App.render();">
        </div>
        <select onchange="App.state.monsterFilterType=this.value;App.render();">
          <option value="all" ${fType==='all'?'selected':''}>Wszystkie Typy Potworów (${monsters.length})</option>
          <option value="Beast" ${fType==='Beast'?'selected':''}>🐾 Bestie (Beast — Druid / Chowańce / Polimorfia)</option>
          <option value="Dragon" ${fType==='Dragon'?'selected':''}>🐉 Smoki (Dragon)</option>
          <option value="Undead" ${fType==='Undead'?'selected':''}>💀 Nieumarli (Undead)</option>
          <option value="Fiend" ${fType==='Fiend'?'selected':''}>😈 Czarty — Demony i Diabły (Fiend)</option>
          <option value="Aberration" ${fType==='Aberration'?'selected':''}>👁️ Aberracje (Aberration)</option>
          <option value="Humanoid" ${fType==='Humanoid'?'selected':''}>⚔️ Humanoidy i NPC (Humanoid)</option>
          <option value="Monstrosity" ${fType==='Monstrosity'?'selected':''}>🦂 Monstrualności (Monstrosity)</option>
          <option value="Giant" ${fType==='Giant'?'selected':''}>🗿 Giganty (Giant)</option>
          <option value="Elemental" ${fType==='Elemental'?'selected':''}>🌪️ Żywiołaki (Elemental)</option>
          <option value="Construct" ${fType==='Construct'?'selected':''}>⚙️ Konstrukty i Golemy (Construct)</option>
          <option value="Fey" ${fType==='Fey'?'selected':''}>🧚 Fey (Wróżki i Wiedźmy)</option>
          <option value="Celestial" ${fType==='Celestial'?'selected':''}>🪽 Niebianie (Celestial)</option>
          <option value="Ooze" ${fType==='Ooze'?'selected':''}>🟢 Szlamy (Ooze)</option>
          <option value="Plant" ${fType==='Plant'?'selected':''}>🌿 Rośliny (Plant)</option>
        </select>
        <select onchange="App.state.monsterFilterCr=this.value;App.render();">
          <option value="all" ${fCr==='all'?'selected':''}>Wszystkie SW / CR (0 – 30)</option>
          <option value="low" ${fCr==='low'?'selected':''}>SW 0 – 1 (Niskopoziomowe / Wild Shape)</option>
          <option value="mid" ${fCr==='mid'?'selected':''}>SW 2 – 5 (Średnie zagrożenie)</option>
          <option value="high" ${fCr==='high'?'selected':''}>SW 6 – 12 (Wysokie zagrożenie)</option>
          <option value="epic" ${fCr==='epic'?'selected':''}>SW 13 – 19 (Bossowie i Dorosłe Smoki)</option>
          <option value="legend" ${fCr==='legend'?'selected':''}>SW 20 – 30 (Starożytne Smoki, Licz, Tarrasque)</option>
        </select>
      </div>

      <div class="grid-races-detailed ${this.state.monsterForceXL ? 'all-xl' : ''}">
        ${filtered.slice(0, (this.state.pageLimits && this.state.pageLimits.monsters) || 24).map(m => this.renderDetailedMonsterCard(m, false)).join("")}
      </div>
      ${this.renderPaginationBar('monsters', filtered.length, Math.min(filtered.length, (this.state.pageLimits && this.state.pageLimits.monsters) || 24), 24)}
    `;
  },

  renderDetailedMonsterCard(m, isModal = false) {
    const isMobCompact = this.isMobileLayout() && !isModal;
    const isXL = Boolean(isModal || (!isMobCompact && this.state.monsterForceXL));
    const portraitUri = window.getMonsterPortraitUri ? window.getMonsterPortraitUri(m) : "";
    const aideddUrl = `https://www.aidedd.org/dnd/monstres.php?vo=${encodeURIComponent(m.aidedd_slug || m.id)}`;
    const allActions = m.actions || [];
    const primaryActions = isXL ? allActions : allActions.slice(0, 2);
    const extraActions = isXL ? [] : allActions.slice(2);
    const hasLeg = Boolean(m.legendary_actions && m.legendary_actions.length > 0);

    if (isMobCompact) {
      const firstAct = allActions[0];
      return `
        <div class="card mobile-compact-card">
          <div style="display:flex;align-items:center;gap:11px;" onclick="App.openMonsterDetailModal('${m.id}')">
            <img src="${portraitUri}" alt="${m.name_pl}" class="portrait-thumb" style="width:48px;height:48px;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                <div class="card-title" style="font-size:0.98rem;">${this.t(m.name_pl, m.name_en)}</div>
                <span class="badge badge-crimson" style="font-size:0.72rem;">💀 SW ${m.cr}</span>
              </div>
              <div style="font-size:0.74rem;color:var(--text-muted);margin-top:2px;">
                ${this.tPlain(m.type_pl, m.type_en)} • ${m.size.split(" ")[0]} • 🛡️ KP ${m.ac} • ❤️ PW ${m.hp} • 🏃 ${m.speed}
              </div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;background:var(--bg-deep);padding:6px;border-radius:8px;text-align:center;margin:6px 0;">
            ${window.DND_ABILITIES.map(ab => {
              const sc = (m.abilities && m.abilities[ab.id]) || 10;
              const mod = this.getMod(sc);
              return `
                <div onclick="App.rollDie(20, ${mod}, '${m.name_pl.replace(/'/g, "\\'")}: Test ${ab.short_pl}')" style="cursor:pointer;padding:3px 2px;border-radius:5px;background:var(--bg-card);">
                  <div style="font-size:0.62rem;font-weight:700;color:var(--gold);">${ab.short_pl}</div>
                  <div style="font-size:0.78rem;font-weight:800;color:var(--text-main);">${sc} <span style="color:var(--gold-bright);">(${this.fmtMod(mod)})</span></div>
                </div>
              `;
            }).join("")}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:space-between;border-top:1px solid var(--border-subtle);padding-top:8px;">
            ${firstAct && firstAct.atk_bonus !== undefined ? `
              <button class="btn-primary btn-sm" onclick="App.rollDie(20, ${firstAct.atk_bonus}, '${m.name_pl.replace(/'/g, "\\'")}: Atak — ${firstAct.name_pl.replace(/'/g, "\\'")}')" style="flex:1;">
                🎯 Atak ${this.fmtMod(firstAct.atk_bonus)}
              </button>
            ` : ''}
            ${firstAct && firstAct.dmg_dice ? `
              <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('${firstAct.dmg_dice}', '${m.name_pl.replace(/'/g, "\\'")}: Obrażenia — ${firstAct.name_pl.replace(/'/g, "\\'")}')" style="flex:1;">
                🎲 ${firstAct.dmg_dice.replace(/d/g,'k')}
              </button>
            ` : ''}
            <button class="btn-ghost btn-sm" onclick="App.openMonsterDetailModal('${m.id}')" style="flex:1;">
              📖 Statblock
            </button>
            <button class="btn-secondary btn-sm" onclick="App.addMonsterToEncounter('${m.id}')">
              ⚔️ +Starcie
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="card race-card-2x2 ${isXL ? 'race-card-xl' : ''}">
        <div class="card-header" style="margin-bottom:4px;align-items:center;">
          <div style="display:flex;align-items:center;gap:14px;">
            <img src="${portraitUri}" alt="${m.name_pl}" class="portrait-lg" style="width:72px;height:72px;">
            <div>
              <div class="card-title" style="font-size:1.22rem;">${this.t(m.name_pl, m.name_en)}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
                ${m.size} • <strong>${this.tPlain(m.type_pl, m.type_en)}</strong> • ${m.alignment_pl} •
                <a href="${aideddUrl}" target="_blank" style="color:var(--gold);font-weight:600;">AideDD Statblock ↗</a>
              </div>
              <div class="badge-row" style="margin:6px 0 0;">
                <span class="badge badge-crimson" style="font-size:0.78rem;">💀 SW (CR): ${m.cr} (${m.xp.toLocaleString()} PD)</span>
                <span class="badge badge-gold" style="font-size:0.78rem;">🛡️ KP: ${m.ac} ${m.ac_desc ? `(${m.ac_desc})` : ''}</span>
                <span class="badge badge-emerald" style="font-size:0.78rem;cursor:pointer;" onclick="App.rollCustomFormula('${m.hp_formula}', 'Losowanie PW: ${m.name_pl.replace(/'/g, "\\'")}')" title="Kliknij, aby wylosować PW potwora z kości">
                  ❤️ PW: ${m.hp} (${m.hp_formula.replace(/d/g,'k')}) 🎲
                </span>
                <span class="badge badge-cyan" style="font-size:0.78rem;">🏃 ${m.speed}</span>
              </div>
            </div>
          </div>

          <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
            ${!isModal ? `
              <button class="btn-secondary btn-sm" onclick="App.openMonsterDetailModal('${m.id}')">
                📖 Podstrona
              </button>
            ` : ''}
            <button class="btn-primary btn-sm" onclick="App.addMonsterToEncounter('${m.id}')" title="Dodaj tego potwora do aktywnego starcia, aby śledzić jego PW">
              ⚔️ Do Starcia
            </button>
          </div>
        </div>

        <!-- 6 Clickable Ability Scores -->
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;background:var(--bg-deep);padding:10px;border-radius:10px;border:1px solid var(--border-subtle);text-align:center;">
          ${window.DND_ABILITIES.map(ab => {
            const sc = (m.abilities && m.abilities[ab.id]) || 10;
            const mod = this.getMod(sc);
            return `
              <div onclick="App.rollDie(20, ${mod}, '${m.name_pl.replace(/'/g, "\\'")}: Test ${ab.short_pl}')" style="cursor:pointer;padding:4px;border-radius:6px;background:var(--bg-card);border:1px solid rgba(255,255,255,0.05);" title="Kliknij, aby wykonać rzut k20 na ${ab.name_pl} tego potwora">
                <div style="font-size:0.66rem;font-weight:700;color:var(--gold);">${ab.short_pl}</div>
                <div style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${sc} <span style="color:var(--gold-bright);">(${this.fmtMod(mod)})</span></div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Saves, Skills, Resistances, Senses -->
        <div style="background:var(--bg-deep);padding:10px 12px;border-radius:8px;font-size:0.8rem;display:flex;flex-direction:column;gap:3px;border-left:3px solid var(--gold);">
          ${m.saves_pl ? `<div><strong>🛡️ Rzuty obronne:</strong> ${m.saves_pl}</div>` : ''}
          ${m.skills_pl ? `<div><strong>🎯 Umiejętności:</strong> ${m.skills_pl}</div>` : ''}
          ${m.resistances_pl ? `<div><strong>🛡️ Odporności:</strong> ${m.resistances_pl}</div>` : ''}
          ${m.immunities_pl ? `<div><strong>🔒 Niepodatności / Podatności:</strong> ${m.immunities_pl}</div>` : ''}
          <div><strong>👁️ Zmysły:</strong> ${m.senses_pl} • <strong>🗣️ Języki:</strong> ${m.languages_pl}</div>
        </div>

        ${m.traits && m.traits.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${m.traits.map(tr => `
              <div class="race-trait-box" style="padding:8px 12px;">
                <strong style="color:var(--gold-bright);font-size:0.86rem;">✨ ${tr.name_pl}</strong>
                <div style="font-size:0.81rem;color:var(--text-main);">${tr.desc_pl}</div>
              </div>
            `).join("")}
          </div>
        ` : ''}

        <!-- Actions with Clickable Attack & Damage Rolls -->
        <div>
          <div style="font-family:var(--font-display);font-size:0.88rem;font-weight:700;color:var(--gold);border-bottom:1px solid var(--border-gold);padding-bottom:4px;margin-bottom:8px;">
            ⚔️ Akcje Bojowe (${allActions.length}) — kliknij, aby rzucić na trafienie lub obrażenia:
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${primaryActions.map(act => `
              <div class="subclass-feature-item">
                <div class="subclass-feature-head">
                  <strong style="color:var(--gold-bright);font-size:0.89rem;">⚔️ ${act.name_pl}</strong>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    ${act.atk_bonus !== undefined ? `
                      <button class="btn-primary btn-sm" onclick="App.rollDie(20, ${act.atk_bonus}, '${m.name_pl.replace(/'/g, "\\'")}: Atak — ${act.name_pl.replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.73rem;">
                        🎯 Trafienie ${this.fmtMod(act.atk_bonus)}
                      </button>
                    ` : ''}
                    ${act.dmg_dice ? `
                      <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('${act.dmg_dice}', '${m.name_pl.replace(/'/g, "\\'")}: Obrażenia — ${act.name_pl.replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.73rem;">
                        🎲 ${act.dmg_dice.replace(/d/g,'k')} ${act.dmg_type_pl || ''}
                      </button>
                    ` : ''}
                  </div>
                </div>
                <div style="font-size:0.81rem;color:var(--text-main);line-height:1.5;">${act.desc_pl}</div>
              </div>
            `).join("")}

            ${(!isXL && (extraActions.length > 0 || hasLeg)) ? `
              <details class="std-accordion">
                <summary>
                  <span>⚔️ Więcej akcji (${extraActions.length})${hasLeg ? ' + 👑 Akcje Legendarne' : ''}</span>
                </summary>
                <div class="std-accordion-body">
                  ${extraActions.map(act => `
                    <div class="subclass-feature-item">
                      <div class="subclass-feature-head">
                        <strong style="color:var(--gold-bright);font-size:0.88rem;">⚔️ ${act.name_pl}</strong>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                          ${act.atk_bonus !== undefined ? `
                            <button class="btn-primary btn-sm" onclick="App.rollDie(20, ${act.atk_bonus}, '${m.name_pl.replace(/'/g, "\\'")}: Atak — ${act.name_pl.replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.73rem;">
                              🎯 Trafienie ${this.fmtMod(act.atk_bonus)}
                            </button>
                          ` : ''}
                          ${act.dmg_dice ? `
                            <button class="btn-secondary btn-sm" onclick="App.rollCustomFormula('${act.dmg_dice}', '${m.name_pl.replace(/'/g, "\\'")}: Obrażenia — ${act.name_pl.replace(/'/g, "\\'")}')" style="padding:2px 8px;font-size:0.73rem;">
                              🎲 ${act.dmg_dice.replace(/d/g,'k')} ${act.dmg_type_pl || ''}
                            </button>
                          ` : ''}
                        </div>
                      </div>
                      <div style="font-size:0.8rem;color:var(--text-main);line-height:1.5;">${act.desc_pl}</div>
                    </div>
                  `).join("")}
                  ${hasLeg ? m.legendary_actions.map(la => `
                    <div style="background:rgba(217,70,79,0.1);border:1px solid rgba(217,70,79,0.35);border-radius:8px;padding:8px 12px;font-size:0.8rem;">
                      <strong style="color:#fca5a5;">👑 ${la.name_pl}:</strong> ${la.desc_pl}
                    </div>
                  `).join("") : ''}
                </div>
              </details>
            ` : ''}
          </div>
        </div>

        ${(isXL && hasLeg) ? `
          <div>
            <div style="font-family:var(--font-display);font-size:0.88rem;font-weight:700;color:var(--crimson);border-bottom:1px solid var(--crimson);padding-bottom:4px;margin-bottom:6px;">
              👑 Akcje Legendarne:
            </div>
            ${m.legendary_actions.map(la => `
              <div style="background:rgba(217,70,79,0.1);border:1px solid rgba(217,70,79,0.35);border-radius:8px;padding:8px 12px;font-size:0.8rem;">
                <strong style="color:#fca5a5;">${la.name_pl}:</strong> ${la.desc_pl}
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>
    `;
  },

  openMonsterDetailModal(monsterId) {
    const m = (window.DND_MONSTERS || []).find(x => x.id === monsterId);
    if (!m) return;
    const aideddUrl = `https://www.aidedd.org/dnd/monstres.php?vo=${encodeURIComponent(m.aidedd_slug || m.id)}`;
    this.openModal(
      `🐉 Karta Potwora: ${this.tPlain(m.name_pl, m.name_en)} (SW ${m.cr})`,
      `
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${this.renderDetailedMonsterCard(m, true)}
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="${aideddUrl}" target="_blank" style="color:var(--gold);font-weight:600;">🔗 Otwórz oficjalny statblock na aidedd.org ↗</a>
            <div style="display:flex;gap:8px;">
              <button class="btn-primary" onclick="App.addMonsterToEncounter('${m.id}'); App.closeModal();">⚔️ Dodaj do Aktywnego Starcia</button>
              <button class="btn-ghost" onclick="App.closeModal()">Zamknij</button>
            </div>
          </div>
        </div>
      `
    );
  },

  addMonsterToEncounter(monsterId) {
    const m = (window.DND_MONSTERS || []).find(x => x.id === monsterId);
    if (!m) return;
    this.state.encounterMonsters = this.state.encounterMonsters || [];
    const count = this.state.encounterMonsters.filter(x => x.id === m.id).length + 1;
    this.state.encounterMonsters.push({
      id: m.id,
      icon: m.icon,
      label: count > 1 ? `${m.name_pl} #${count}` : m.name_pl,
      ac: m.ac,
      hpMax: m.hp,
      hpCurrent: m.hp
    });
    this.render();
    this.toast(`⚔️ Dodano do starcia: ${m.name_pl} (${m.hp} PW, KP ${m.ac})`);
  },

  modifyEncounterHP(idx, delta) {
    const list = this.state.encounterMonsters || [];
    if (!list[idx]) return;
    list[idx].hpCurrent = Math.min(list[idx].hpMax, Math.max(0, list[idx].hpCurrent + delta));
    this.render();
  },

  removeEncounterMonster(idx) {
    this.state.encounterMonsters = (this.state.encounterMonsters || []).filter((_, i) => i !== idx);
    this.render();
  },

  openCustomMonsterModal() {
    this.openModal(
      "🐉 Kreator Potwora / NPC (Custom Monster Statblock)",
      `
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Nazwa Potwora (PL)</label>
              <input type="text" id="cm-name-pl" placeholder="np. Cienisty Smok" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Typ Istoty</label>
              <select id="cm-type" style="width:100%;">
                <option value="Monstrosity">Monstrualność (Monstrosity)</option>
                <option value="Beast">Bestia (Beast)</option>
                <option value="Dragon">Smok (Dragon)</option>
                <option value="Undead">Nieumarły (Undead)</option>
                <option value="Fiend">Czart (Fiend)</option>
                <option value="Aberration">Aberracja (Aberration)</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Giant">Gigant (Giant)</option>
                <option value="Elemental">Żywiołak (Elemental)</option>
                <option value="Construct">Konstrukt (Construct)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Stopień Wyzwania (SW / CR)</label>
              <input type="number" id="cm-cr" value="5" min="0" max="30" style="width:100%;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Klasa Pancerza (KP)</label>
              <input type="number" id="cm-ac" value="16" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Punkty Wytrzymałości (PW)</label>
              <input type="number" id="cm-hp" value="95" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Formuła Kości PW</label>
              <input type="text" id="cm-hp-dice" value="10d10+40" style="width:100%;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Nazwa Głównego Ataku</label>
              <input type="text" id="cm-atk-name" value="Ugryzienie Cienia" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Bonus do Trafienia (+X)</label>
              <input type="number" id="cm-atk-bonus" value="8" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.75rem;color:var(--text-muted);">Kości Obrażeń Ataku</label>
              <input type="text" id="cm-atk-dice" value="3d8+5" style="width:100%;">
            </div>
          </div>
          <textarea id="cm-desc" rows="3" placeholder="Opis zdolności i ataku potwora..."></textarea>
          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <button class="btn-ghost" onclick="App.closeModal()">Anuluj</button>
            <button class="btn-primary" onclick="App.saveCustomMonster()">💾 Stwórz Potwora w Bestiariuszu</button>
          </div>
        </div>
      `
    );
  },

  saveCustomMonster() {
    const name_pl = document.getElementById("cm-name-pl").value.trim();
    if (!name_pl) {
      this.toast("Podaj nazwę potwora!");
      return;
    }
    const type_en = document.getElementById("cm-type").value;
    const cr_num = parseFloat(document.getElementById("cm-cr").value) || 1;
    const ac = parseInt(document.getElementById("cm-ac").value, 10) || 14;
    const hp = parseInt(document.getElementById("cm-hp").value, 10) || 45;
    const hp_formula = document.getElementById("cm-hp-dice").value.trim() || "6d8+18";
    const atkName = document.getElementById("cm-atk-name").value.trim() || "Atak";
    const atkBonus = parseInt(document.getElementById("cm-atk-bonus").value, 10) || 5;
    const atkDice = document.getElementById("cm-atk-dice").value.trim() || "2d6+3";
    const desc = document.getElementById("cm-desc").value.trim() || "Atak wręcz lub zdolność specjalna.";

    const newM = {
      id: "custom-monster-" + Date.now(),
      name_pl,
      name_en: name_pl,
      icon: "🐉",
      type_pl: type_en,
      type_en,
      size: "Large (Duży)",
      alignment_pl: "Neutralny",
      cr: String(cr_num),
      cr_num,
      xp: Math.round(cr_num * 500),
      ac,
      ac_desc: "naturalny pancerz",
      hp,
      hp_formula,
      speed: "30 ft",
      abilities: { STR: 18, DEX: 14, CON: 18, INT: 10, WIS: 12, CHA: 12 },
      senses_pl: "Widzenie w ciemności 60 ft, Pasywna Percepcja 11",
      languages_pl: "Wspólny",
      traits: [],
      actions: [
        { name_pl: atkName, atk_bonus: atkBonus, dmg_dice: atkDice, dmg_type_pl: "obrażeń", desc_pl: desc }
      ]
    };

    window.DND_MONSTERS.unshift(newM);
    this.closeModal();
    this.render();
    this.toast(`🐉 Dodano potwora do Bestiariusza: ${name_pl}!`);
  },

  clearAllLocalData() {
    localStorage.removeItem("dnd5e_characters_v1");
    localStorage.removeItem("dnd5e_active_char_v1");
    localStorage.removeItem("dnd5e_lang_v1");
    localStorage.removeItem("dnd5e_unit_v1");
    localStorage.removeItem("dnd5e_theme_v1");
    localStorage.removeItem("dnd5e_custom_spells_v1");
    this.state.characters = [];
    this.seedDemoCharacters();
    this.closeModal();
    this.render();
    this.toast("🗑️ Wykasowano wszystkie dane z pamięci lokalnej przeglądarki (localStorage) i przywrócono stan początkowy.");
  },

  openSourcesAndLicensesModal(activeSection = "licenses") {
    this.openModal(
      "⚖️ Centrum Informacji Prawnych: Licencje (CC-BY-4.0 / OGL 1.0a), RODO, LocalStorage i Regulamin",
      `
        <div style="display:flex;flex-direction:column;gap:14px;font-size:0.85rem;">
          <div class="spell-circles-bar" style="margin-bottom:4px;">
            <button class="circle-pill ${activeSection==='licenses'?'active':''}" onclick="App.openSourcesAndLicensesModal('licenses')">⚖️ 1. Licencje, SRD 5.1 &amp; OGL 1.0a</button>
            <button class="circle-pill ${activeSection==='privacy'?'active':''}" onclick="App.openSourcesAndLicensesModal('privacy')">🔒 2. Polityka Prywatności, RODO &amp; LocalStorage</button>
            <button class="circle-pill ${activeSection==='terms'?'active':''}" onclick="App.openSourcesAndLicensesModal('terms')">📜 3. Regulamin, Znaki Towarowe &amp; DMCA</button>
            <button class="circle-pill ${activeSection==='sources'?'active':''}" onclick="App.openSourcesAndLicensesModal('sources')">📚 4. Wykaz Źródeł i Podręczników</button>
          </div>

          ${activeSection === "licenses" ? `
            <div class="race-lore-box">
              <strong>📜 1. Wymagana Atrybucja System Reference Document 5.1 (Creative Commons CC-BY-4.0)</strong><br>
              <em>"This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" style="color:var(--gold);">https://dnd.wizards.com/resources/systems-reference-document</a>. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" style="color:var(--gold);">https://creativecommons.org/licenses/by/4.0/legalcode</a>."</em>
            </div>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">🛡️ 2. Wymagana Nota Polityki Treści Fanowskich (Wizards of the Coast Fan Content Policy)</strong>
              <div style="margin-top:4px;color:var(--text-main);">
                <strong>PL:</strong> „Kroniki D&amp;D 5e to nieoficjalne Treści Fanowskie dozwolone w ramach <a href="https://company.wizards.com/pl/legal/fancontentpolicy" target="_blank" style="color:var(--gold);">Polityki Treści Fanowskich</a>. Niezatwierdzone ani niesponsorowane przez Wizards. Część wykorzystanych materiałów stanowi własność Wizards of the Coast. ©Wizards of the Coast LLC.”<br>
                <strong>EN:</strong> “Kroniki D&amp;D 5e is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.”
              </div>
            </div>

            <details class="std-accordion" open>
              <summary><span>📜 3. Pełny Tekst Prawny Open Game License Version 1.0a (OGL v1.0a + Section 15 Copyright Notice)</span></summary>
              <div class="std-accordion-body" style="font-family:var(--font-mono);font-size:0.74rem;line-height:1.48;max-height:240px;overflow-y:auto;white-space:pre-wrap;color:var(--text-muted);">OPEN GAME LICENSE Version 1.0a
The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.

1. Definitions: (a)"Contributors" means the copyright and/or trademark owners who have contributed Open Game Content; (b)"Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d)"Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product Identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) "You" or "Your" means the licensee in terms of this agreement.
2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.
3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.
4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.
5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.
6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.
7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity.
8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.
9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.
10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.
11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.
12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.
13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.
14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.
15. COPYRIGHT NOTICE
Open Game License v 1.0a Copyright 2000, Wizards of the Coast, LLC.
System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.; Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.
Kroniki D&D 5e (D&D 5e Chronicles Web Application) Copyright 2026, mackos1112.</div>
            </details>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">💻 4. Licencja MIT dla Kodu Aplikacji i Grafik SVG (MIT License)</strong>
              <div style="margin-top:4px;color:var(--text-muted);font-size:0.8rem;">
                Copyright (c) 2026 mackos1112. Kod źródłowy silnika aplikacji <em>Kroniki D&amp;D 5e</em> oraz proceduralne generatory portretów SVG ras, klas i potworów (<code>js/data-portraits.js</code>, <code>js/data-monsters.js</code>) są udostępniane na otwartej licencji <strong>MIT License</strong>.
              </div>
            </div>
          ` : ''}

          ${activeSection === "privacy" ? `
            <div class="race-lore-box">
              <strong>🔒 1. Klauzula Informacyjna RODO (GDPR — Rozporządzenie UE 2016/679)</strong><br>
              Aplikacja <strong>Kroniki D&amp;D 5e</strong> działa wyłącznie lokalnie po stronie przeglądarki użytkownika (architektura <em>100% Client-Side / Zero-Backend</em>). Twórca aplikacji <strong>nie gromadzi, nie przesyła na żaden serwer, nie analizuje ani nie przetwarza żadnych danych osobowych użytkowników</strong>, nie stosuje ciasteczek śledzących ani reklamowych oraz nie wymaga rejestracji konta.
            </div>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">💾 2. Informacja o Pamięci Lokalnej (<code>window.localStorage</code> — Art. 399 PKE / Dyrektywa ePrivacy)</strong>
              <div style="margin-top:6px;color:var(--text-main);">
                Aplikacja wykorzystuje wyłącznie niezbędną technicznie pamięć lokalną Twojej przeglądarki (<code>localStorage</code>) na Twoim urządzeniu, aby zachować utworzone przez Ciebie karty postaci i ustawienia widoku:
                <ul style="padding-left:18px;margin-top:6px;display:flex;flex-direction:column;gap:3px;">
                  <li><code>dnd5e_characters_v1</code> — zapisane przez Ciebie karty postaci i ich ekwipunek,</li>
                  <li><code>dnd5e_active_char_v1</code> — identyfikator ostatnio wybranej postaci,</li>
                  <li><code>dnd5e_lang_v1</code>, <code>dnd5e_unit_v1</code>, <code>dnd5e_theme_v1</code> — wybór języka (PL/EN), jednostek (ft/m) oraz motywu (Ciemny/Jasny),</li>
                  <li><code>dnd5e_custom_spells_v1</code> — dodane przez Ciebie własne zaklęcia.</li>
                </ul>
              </div>
              <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;background:var(--bg-deep);padding:10px 12px;border-radius:8px;border:1px solid var(--border-subtle);">
                <span style="font-size:0.8rem;color:var(--text-muted);">Masz pełne prawo do eksportu swoich danych do pliku JSON lub ich natychmiastowego usunięcia z przeglądarki:</span>
                <div style="display:flex;gap:8px;">
                  <button class="btn-secondary btn-sm" onclick="App.exportCharactersJSON()">💾 Eksportuj Dane (JSON)</button>
                  <button class="btn-danger btn-sm" onclick="App.clearAllLocalData()">🗑️ Wyczyść Wszystkie Dane Lokalne</button>
                </div>
              </div>
            </div>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">🌐 3. Zewnętrzni Dostawcy Infrastruktury Technicznej (GitHub Pages &amp; Google Fonts)</strong>
              <div style="margin-top:4px;color:var(--text-main);">
                • <strong>Hosting statyczny:</strong> Witryna jest hostowana w usłudze <em>GitHub Pages</em> (GitHub, Inc., 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA). Serwery GitHub mogą przetwarzać techniczne logi zapytań HTTP (np. adres IP) w celach bezpieczeństwa sieciowego zgodnie z <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" style="color:var(--gold);">GitHub Privacy Statement ↗</a>.<br>
                • <strong>Czcionki webowe:</strong> Krój pisma pobierany jest z CDN <em>Google Fonts</em> zgodnie z <a href="https://policies.google.com/privacy" target="_blank" style="color:var(--gold);">Polityką Prywatności Google ↗</a>.
              </div>
            </div>
          ` : ''}

          ${activeSection === "terms" ? `
            <div class="race-lore-box">
              <strong>📜 1. Regulamin Świadczenia Usług Drogą Elektroniczną i Wyłączenie Odpowiedzialności</strong><br>
              1. Serwis <strong>Kroniki D&amp;D 5e</strong> jest darmowym, niekomercyjnym narzędziem edukacyjnym i pomocniczym dla graczy stołowych gier fabularnych (RPG).<br>
              2. Do korzystania z aplikacji wymagana jest przeglądarka internetowa z włączoną obsługą JavaScript i HTML5.<br>
              3. Aplikacja jest dostarczana w stanie „takim, jaki jest” (<em>AS-IS</em>), bez jakichkolwiek gwarancji wyraźnych ani dorozumianych.
            </div>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">™️ 2. Zastrzeżenie Znaków Towarowych (Trademarks Disclaimer)</strong>
              <div style="margin-top:4px;color:var(--text-main);">
                Nazwy <em>Dungeons &amp; Dragons, D&amp;D, D&amp;D 5e, Wizards of the Coast, Player's Handbook, Dungeon Master's Guide, Monster Manual, Xanathar's Guide to Everything, Tasha's Cauldron of Everything, Fizban's Treasury of Dragons, Mordenkainen Presents: Monsters of the Multiverse, Forgotten Realms, Eberron, Ravenloft, Ravnica, Theros, Strixhaven, Spelljammer, Dragonlance</em> oraz powiązane logotypy są znakami towarowymi lub zastrzeżonymi znakami towarowymi należącymi do <strong>Wizards of the Coast LLC</strong> w USA i innych krajach. Zostały one przywołane wyłącznie w celach informacyjnych i opisowych (określenie kompatybilności z zasadami 5. edycji).
              </div>
            </div>

            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">📬 3. Kontakt oraz Procedura Zgłaszania Naruszeń (Notice &amp; Takedown / DMCA)</strong>
              <div style="margin-top:4px;color:var(--text-main);">
                Szanujemy prawa własności intelektualnej wszystkich autorów i wydawców. W przypadku jakichkolwiek pytań prawnych, uwag lub zgłoszeń dotyczących praw autorskich (<em>Notice &amp; Takedown / DMCA</em>) prosimy o utworzenie zgłoszenia w oficjalnym repozytorium projektu:<br>
                🔗 <a href="https://github.com/mackos1112/KartaPostaciDND/issues" target="_blank" style="color:var(--gold);font-weight:700;">https://github.com/mackos1112/KartaPostaciDND/issues ↗</a>
              </div>
            </div>
          ` : ''}

          ${activeSection === "sources" ? `
            <div class="subclass-feature-item">
              <strong style="color:var(--gold-bright);">🌐 Internetowe Bazy i Kompendia Referencyjne</strong>
              <ul style="padding-left:18px;margin-top:6px;display:flex;flex-direction:column;gap:4px;">
                <li><strong>D&amp;D 5e Wikidot Compendium:</strong> <a href="http://dnd5e.wikidot.com/" target="_blank" style="color:var(--gold);">http://dnd5e.wikidot.com/ ↗</a> — struktura tabel klas 1–20, podklas, rodowodów, teł, atutów, zaklęć kręgów 0–9 i magicznych przedmiotów.</li>
                <li><strong>AideDD Monster D&amp;D 5e:</strong> <a href="https://www.aidedd.org/monster-dnd5/" target="_blank" style="color:var(--gold);">https://www.aidedd.org/monster-dnd5/ ↗</a> — katalog potworów i bloków statystyk w zakładce Bestiariusz.</li>
                <li><strong>Oficjalny Dokument SRD 5.1 (Wizards of the Coast):</strong> <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" style="color:var(--gold);">https://dnd.wizards.com/resources/systems-reference-document ↗</a></li>
              </ul>
            </div>

            <div>
              <strong style="color:var(--gold);display:block;margin-bottom:6px;">📚 Wykaz Skrótów Podręczników Źródłowych D&amp;D 5e:</strong>
              <div class="wikidot-table-wrap" style="margin:0;">
                <table class="wikidot-table">
                  <thead>
                    <tr>
                      <th>Skrót</th>
                      <th>Pełny Tytuł Podręcznika (EN / PL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>PHB</strong></td><td>Player's Handbook (Podręcznik Gracza D&amp;D 5e)</td></tr>
                    <tr><td><strong>DMG</strong></td><td>Dungeon Master's Guide (Przewodnik Mistrza Podziemi)</td></tr>
                    <tr><td><strong>MM</strong></td><td>Monster Manual (Księga Potworów)</td></tr>
                    <tr><td><strong>XGE</strong></td><td>Xanathar's Guide to Everything (Przewodnik Xanathara)</td></tr>
                    <tr><td><strong>TCE</strong></td><td>Tasha's Cauldron of Everything (Kocioł Wszystkiego Tashy)</td></tr>
                    <tr><td><strong>FTD</strong></td><td>Fizban's Treasury of Dragons (Skarbiec Smoków Fizbana)</td></tr>
                    <tr><td><strong>MPMM</strong></td><td>Mordenkainen Presents: Monsters of the Multiverse (Potwory Wieloświata)</td></tr>
                    <tr><td><strong>VGM / MToF</strong></td><td>Volo's Guide to Monsters / Mordenkainen's Tome of Foes</td></tr>
                    <tr><td><strong>VRGR</strong></td><td>Van Richten's Guide to Ravenloft (Przewodnik Van Richtena po Ravenlofcie)</td></tr>
                    <tr><td><strong>ERLW</strong></td><td>Eberron: Rising from the Last War</td></tr>
                    <tr><td><strong>EGW</strong></td><td>Explorer's Guide to Wildemount (Przewodnik Odkrywcy po Wildemount)</td></tr>
                    <tr><td><strong>SCAG</strong></td><td>Sword Coast Adventurer's Guide (Przewodnik po Wybrzeżu Mieczy)</td></tr>
                    <tr><td><strong>GGtR / MOT / SCC</strong></td><td>Guildmasters' Guide to Ravnica / Mythic Odysseys of Theros / Strixhaven</td></tr>
                    <tr><td><strong>AAG / DSotDQ</strong></td><td>Astral Adventurer's Guide (Spelljammer) / Dragonlance: Shadow of the Dragon Queen</td></tr>
                    <tr><td><strong>BGG / BMT</strong></td><td>Bigby Presents: Glory of the Giants / The Book of Many Things</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:12px;">
            <a href="https://github.com/mackos1112/KartaPostaciDND/blob/main/LICENSE.md" target="_blank" style="color:var(--gold);font-weight:600;">📄 Otwórz pełny plik LICENSE.md w repozytorium ↗</a>
            <button class="btn-primary" onclick="App.closeModal()">Zamknij</button>
          </div>
        </div>
      `
    );
  },

  // ---------------- EXPORT / IMPORT & WIKIDOT SYNC MODAL ----------------
  openSyncModal() {
    this.openModal(
      "⚙️ Zarządzanie Danymi, Eksport JSON (PC ↔ Telefon) & Wikidot",
      `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card" style="background:var(--bg-deep);">
            <h4 style="color:var(--gold);margin-bottom:6px;">📲 Przenoszenie Postaci między PC a Telefonem (JSON)</h4>
            <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:12px;">
              Zapisz wszystkie swoje postacie do pliku <code>.json</code> lub wczytaj plik na telefonie / innym komputerze.
            </p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button class="btn-primary btn-sm" onclick="App.exportCharactersJSON()">💾 Pobierz Plik JSON (Eksport)</button>
              <label class="btn-secondary btn-sm" style="cursor:pointer;">
                📂 Wczytaj Plik JSON (Import)
                <input type="file" accept=".json" style="display:none;" onchange="App.importCharactersJSON(event)">
              </label>
            </div>
          </div>

          <div class="card" style="background:var(--bg-deep);">
            <h4 style="color:var(--gold);margin-bottom:6px;">🌐 Aktualizacja z dnd5e.wikidot.com</h4>
            <p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:10px;">
              Aplikacja posiada wbudowaną pełną bazę offline z <strong>dnd5e.wikidot.com</strong> (13 klas z tabelami poziomów 1–20, podklasy, rodowody, tła, atuty i zaklęcia kręgów 0–9 z tłumaczeniem PL i oryginałem EN). Możesz też pobrać pojedynczą stronę zaklęcia bezpośrednio z Wikidot:
            </p>
            <div style="display:flex;gap:8px;">
              <input type="text" id="wikidot-fetch-slug" placeholder="np. spell:wish lub spell:eldritch-blast" value="spell:wish" style="flex:1;">
              <button class="btn-secondary btn-sm" onclick="App.openWikidotDirect()">🔗 Otwórz na Wikidot</button>
            </div>
          </div>
        </div>
      `
    );
  },

  exportCharactersJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.characters, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `kroniki_dnd5e_postacie_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.toast("Pobrano plik JSON z postaciami!");
  },

  importCharactersJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.state.characters = parsed;
          this.state.activeCharId = parsed[0].id;
          this.saveState();
          this.closeModal();
          this.render();
          this.toast(`Zaimportowano ${parsed.length} postaci!`);
        }
      } catch (err) {
        this.toast("Błąd odczytu pliku JSON.");
      }
    };
    reader.readAsText(file);
  },

  openWikidotDirect() {
    const slug = document.getElementById("wikidot-fetch-slug").value.trim();
    if (!slug) return;
    window.open(`http://dnd5e.wikidot.com/${slug}`, "_blank");
  }
};

window.addEventListener("DOMContentLoaded", () => App.init());
