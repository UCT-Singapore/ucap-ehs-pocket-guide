/* ============================================================
   UCAP EHS POCKET GUIDE — APP LOGIC
   Simple hash-router single-page app. No build step required.
   ============================================================ */

const $app = document.getElementById("app");

/* ---------- Helpers ---------- */
function topicById(id) {
  return TOPICS.find(t => t.id === id);
}
function iWantToById(id) {
  return I_WANT_TO.find(t => t.id === id);
}
function catById(id) {
  return CATEGORIES.find(c => c.id === id);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[s]));
}

function linkAction(action) {
  if (action === "sds") return SITE.sdsSystemUrl;
  if (action === "contacts") return "#/contacts";
  if (action === "report") return SITE.reportingSystemUrl;
  if (action === "procedure") return SITE.procedureSystemUrl;
  if (action && action.startsWith("custom:")) return action.slice(7);
  return "#";
}

function renderLinks(links) {
  if (!links || !links.length) return "";
  return `<div class="links-grid">${links.map(l => {
    const href = linkAction(l.action);
    const external = l.action !== "contacts";
    return `<a class="link-btn plain" href="${href}" ${external ? 'target="_blank" rel="noopener"' : ""}>
      <span class="emoji">${l.emoji}</span><span>${escapeHtml(l.label)}</span>
    </a>`;
  }).join("")}</div>`;
}

const DISCLAIMER = `<div class="disclaimer">
  <strong>Quick Action Guide</strong>
  This guide provides quick workplace guidance and does not replace approved Risk Assessments, Work Instructions, SDSs or emergency procedures. When in doubt, contact EHS.
</div>`;

/* ---------- Views ---------- */
function viewHome() {
  const categoryTiles = CATEGORIES.map(c => `
    <div class="tile" data-nav="#/category/${c.id}">
      <span class="emoji">${c.emoji}</span>
      <span class="label">${escapeHtml(c.label)}</span>
    </div>`).join("");

  return `
    <div class="hero">
      <div class="eyebrow">${escapeHtml(SITE.companyShort)} EHS</div>
      <h1>Pocket Guide</h1>
      <p>Got a workplace safety situation? Find what to do in 20–30 seconds.</p>
    </div>

    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="searchInput" type="search" placeholder="Search a topic, e.g. 'spill', 'ladder'..." autocomplete="off">
    </div>
    <div id="searchResults"></div>

    <div id="homeSections">
      <div class="emergency-banner" data-nav="#/category/emergency">
        <span class="emoji">🔴</span>
        <span>Emergency<span class="sub">Fire, injury, spill — tap for immediate steps</span></span>
      </div>

      <div class="section-label">Browse by Topic</div>
      <div class="tile-grid">${categoryTiles}</div>

      <div class="section-label">I Want To...</div>
      <div class="row">
        <span class="emoji">💡</span>
        <span class="text">Get checklist before starting a task<small>New chemical, ladder, hot work, contractor and more</small></span>
        <span class="chev">›</span>
      </div>
    </div>
    ${DISCLAIMER}
  `;
}

function viewCategory(catId) {
  const cat = catById(catId);
  if (!cat) return viewNotFound();
  const topics = TOPICS.filter(t => t.category === catId);
  const rows = topics.map(t => `
    <div class="row" data-nav="#/topic/${t.id}">
      <span class="emoji">${t.emoji}</span>
      <span class="text">${escapeHtml(t.title)}</span>
      <span class="chev">›</span>
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(cat.label)}</div>
    <h2 style="margin:0 0 12px;font-size:19px;">${cat.emoji} ${escapeHtml(cat.label)}</h2>
    <div class="row-list">${rows || `<div class="empty-state">No topics yet in this category.</div>`}</div>
    ${DISCLAIMER}
  `;
}

function viewTopic(id) {
  const t = topicById(id);
  if (!t) return viewNotFound();
  const steps = t.steps.map((s, i) => `
    <div class="step-card">
      <div class="step-num">${i + 1}</div>
      <div class="step-body"><strong>${escapeHtml(s.title)}</strong><p>${escapeHtml(s.text)}</p></div>
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(t.badge)}</div>
    <div class="topic-header"><span class="emoji">${t.emoji}</span><h2>${escapeHtml(t.title)}</h2></div>
    <div style="margin:14px 0 10px;">
      ${steps}
    </div>
    ${t.danger ? `<div class="danger-box"><strong>⚠️ Important</strong>${escapeHtml(t.danger)}</div>` : ""}
    <div class="section-label">Need More Information?</div>
    ${renderLinks(t.links)}
    ${DISCLAIMER}
  `;
}

function viewIWantToList(query) {
  const q = (query || "").trim().toLowerCase();
  const items = I_WANT_TO.filter(i => !q || i.label.toLowerCase().includes(q));
  const rows = items.map(i => `
    <div class="row" data-nav="#/iwantto/${i.id}">
      <span class="emoji">${i.emoji}</span>
      <span class="text">${escapeHtml(i.label)}</span>
      <span class="chev">›</span>
    </div>`).join("");

  return `
    <div class="badge">I Want To...</div>
    <h2 style="margin:0 0 4px;font-size:19px;">💡 What are you about to do?</h2>
    <p style="margin:0 0 14px;color:var(--ink-soft);font-size:13.5px;">Get the checklist to complete before you start.</p>
    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="iWantToSearch" type="search" placeholder="Search an action..." autocomplete="off" value="${escapeHtml(query || "")}">
    </div>
    <div class="row-list">${rows || `<div class="empty-state">No matches. Try a different search term.</div>`}</div>
    ${DISCLAIMER}
  `;
}

function viewIWantToDetail(id) {
  const item = iWantToById(id);
  if (!item) return viewNotFound();
  const checklist = item.checklist.map(c => `<li>${escapeHtml(c)}</li>`).join("");

  return `
    <div class="badge">I Want To...</div>
    <div class="topic-header"><span class="emoji">${item.emoji}</span><h2>${escapeHtml(item.label)}</h2></div>
    <p style="margin:8px 0 12px;font-size:14px;color:var(--ink-soft);">${escapeHtml(item.intro)}</p>
    <ul class="checklist">${checklist}</ul>
    ${item.note ? `<div class="note-box"><strong>Note:</strong> ${escapeHtml(item.note)}</div>` : ""}
    ${item.danger ? `<div class="danger-box"><strong>⚠️ Important</strong>${escapeHtml(item.danger)}</div>` : ""}
    <div class="section-label">Need More Information?</div>
    ${renderLinks(item.links)}
    ${DISCLAIMER}
  `;
}

function viewContacts() {
  return `
    <div class="badge">Emergency</div>
    <h2 style="margin:0 0 14px;font-size:19px;">📞 Emergency Contacts</h2>
    <div class="row-list">
      <a class="row plain" href="tel:${SITE.emergencyPhone.replace(/[^\d+]/g,'')}">
        <span class="emoji">🔴</span>
        <span class="text">Site Emergency<small>${escapeHtml(SITE.emergencyPhone)}</small></span>
        <span class="chev">📞</span>
      </a>
      <a class="row plain" href="tel:${SITE.ehsPhone.replace(/[^\d+]/g,'')}">
        <span class="emoji">🧑‍⚕️</span>
        <span class="text">EHS Department<small>${escapeHtml(SITE.ehsPhone)}</small></span>
        <span class="chev">📞</span>
      </a>
      <a class="row plain" href="tel:${SITE.securityPhone.replace(/[^\d+]/g,'')}">
        <span class="emoji">🛡️</span>
        <span class="text">Security<small>${escapeHtml(SITE.securityPhone)}</small></span>
        <span class="chev">📞</span>
      </a>
    </div>
    ${DISCLAIMER}
  `;
}

function viewSearch(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return "";
  const topicMatches = TOPICS.filter(t =>
    t.title.toLowerCase().includes(q) || t.badge.toLowerCase().includes(q)
  );
  const iwtMatches = I_WANT_TO.filter(i => i.label.toLowerCase().includes(q));

  if (!topicMatches.length && !iwtMatches.length) {
    return `<div class="empty-state">No results for "${escapeHtml(query)}". Try a shorter word, or contact EHS directly.</div>`;
  }

  let html = "";
  if (topicMatches.length) {
    html += `<div class="section-label">Quick Guides</div><div class="row-list">`;
    html += topicMatches.map(t => `
      <div class="row" data-nav="#/topic/${t.id}">
        <span class="emoji">${t.emoji}</span>
        <span class="text">${escapeHtml(t.title)}<small>${escapeHtml(t.badge)}</small></span>
        <span class="chev">›</span>
      </div>`).join("");
    html += `</div>`;
  }
  if (iwtMatches.length) {
    html += `<div class="section-label">I Want To...</div><div class="row-list">`;
    html += iwtMatches.map(i => `
      <div class="row" data-nav="#/iwantto/${i.id}">
        <span class="emoji">${i.emoji}</span>
        <span class="text">${escapeHtml(i.label)}</span>
        <span class="chev">›</span>
      </div>`).join("");
    html += `</div>`;
  }
  return html;
}

function viewAZ() {
  const all = [...TOPICS.map(t => ({ id: t.id, label: t.title, emoji: t.emoji, type: "topic" }))]
    .sort((a, b) => a.label.localeCompare(b.label));
  const rows = all.map(t => `
    <div class="row" data-nav="#/topic/${t.id}">
      <span class="emoji">${t.emoji}</span>
      <span class="text">${escapeHtml(t.label)}</span>
      <span class="chev">›</span>
    </div>`).join("");
  return `
    <div class="badge">A–Z</div>
    <h2 style="margin:0 0 12px;font-size:19px;">🔍 All Topics</h2>
    <div class="row-list">${rows}</div>
    ${DISCLAIMER}
  `;
}

function viewNotFound() {
  return `<div class="empty-state">Page not found.<br><br><a class="plain" href="#/" style="color:var(--blue);font-weight:600;">← Back to Home</a></div>`;
}

/* ---------- Top bar config per route ---------- */
function topbarFor(route) {
  if (route.name === "home") {
    return { title: SITE.name, sub: SITE.companyShort, showBack: false };
  }
  const titles = {
    category: () => catById(route.params[0])?.label || "Category",
    topic: () => topicById(route.params[0])?.title || "Guide",
    iwantto_list: () => "I Want To...",
    iwantto_detail: () => iWantToById(route.params[0])?.label || "Checklist",
    contacts: () => "Emergency Contacts",
    az: () => "A–Z Quick Search"
  };
  const fn = titles[route.name];
  return { title: fn ? fn() : SITE.name, sub: null, showBack: true };
}

/* ---------- Router ---------- */
function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home", params: [] };
  if (parts[0] === "category" && parts[1]) return { name: "category", params: [parts[1]] };
  if (parts[0] === "topic" && parts[1]) return { name: "topic", params: [parts[1]] };
  if (parts[0] === "iwantto" && parts[1]) return { name: "iwantto_detail", params: [parts[1]] };
  if (parts[0] === "iwantto") return { name: "iwantto_list", params: [] };
  if (parts[0] === "contacts") return { name: "contacts", params: [] };
  if (parts[0] === "az") return { name: "az", params: [] };
  if (parts[0] === "search") return { name: "search", params: [decodeURIComponent(parts[1] || "")] };
  return { name: "notfound", params: [] };
}

function render() {
  const route = parseRoute();
  let bodyHtml = "";

  switch (route.name) {
    case "home": bodyHtml = viewHome(); break;
    case "category": bodyHtml = viewCategory(route.params[0]); break;
    case "topic": bodyHtml = viewTopic(route.params[0]); break;
    case "iwantto_list": bodyHtml = viewIWantToList(""); break;
    case "iwantto_detail": bodyHtml = viewIWantToDetail(route.params[0]); break;
    case "contacts": bodyHtml = viewContacts(); break;
    case "az": bodyHtml = viewAZ(); break;
    case "search": bodyHtml = viewIWantToList ? viewSearchPage(route.params[0]) : ""; break;
    default: bodyHtml = viewNotFound();
  }

  const tb = topbarFor(route);
  $app.innerHTML = `
    <div class="topbar">
      ${tb.showBack ? `<button class="back-btn" id="backBtn">←</button>` : `<span style="width:36px;"></span>`}
      <div class="title">${escapeHtml(tb.title)}${tb.sub ? `<small>${escapeHtml(tb.sub)}</small>` : ""}</div>
      ${tb.showBack ? `<button class="home-btn" data-nav="#/">⌂</button>` : `<span style="width:36px;"></span>`}
    </div>
    <div class="install-banner" id="installBanner">
      <span>📲 Add this guide to your home screen for one-tap access.</span>
      <button id="installBtn">Install</button>
      <button class="dismiss" id="installDismiss">✕</button>
    </div>
    <main id="mainContent">${bodyHtml}</main>
    <nav class="bottom-nav">
      <button data-nav="#/" class="${route.name === 'home' ? 'active' : ''}"><span class="emoji">🏠</span>Home</button>
      <button data-nav="#/category/emergency" class="${route.name === 'category' && route.params[0] === 'emergency' ? 'active' : ''}"><span class="emoji">🔴</span>Emergency</button>
      <button data-nav="#/iwantto" class="${route.name === 'iwantto_list' || route.name === 'iwantto_detail' ? 'active' : ''}"><span class="emoji">💡</span>I Want To</button>
      <button data-nav="#/az" class="${route.name === 'az' ? 'active' : ''}"><span class="emoji">🔍</span>Search</button>
    </nav>
  `;

  bindNav();
  bindSearch();
  bindInstallBanner();
  window.scrollTo(0, 0);
}

function viewSearchPage(q) {
  return `
    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="searchInput" type="search" placeholder="Search a topic..." value="${escapeHtml(q)}" autocomplete="off">
    </div>
    <div id="searchResults">${viewSearch(q)}</div>
  `;
}

function bindNav() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", () => {
      const target = el.getAttribute("data-nav");
      location.hash = target;
    });
  });
  const backBtn = document.getElementById("backBtn");
  if (backBtn) backBtn.addEventListener("click", () => history.back());
}

function bindSearch() {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  if (input && results) {
    input.addEventListener("input", () => {
      results.innerHTML = viewSearch(input.value);
      bindNav();
    });
    input.addEventListener("focus", () => {
      const homeSections = document.getElementById("homeSections");
      if (homeSections && input.value.trim()) homeSections.style.display = "none";
    });
    input.addEventListener("input", () => {
      const homeSections = document.getElementById("homeSections");
      if (homeSections) homeSections.style.display = input.value.trim() ? "none" : "";
    });
  }
  const iwtInput = document.getElementById("iWantToSearch");
  if (iwtInput) {
    iwtInput.addEventListener("input", () => {
      const rowList = document.querySelector(".row-list");
      const q = iwtInput.value.trim().toLowerCase();
      const items = I_WANT_TO.filter(i => !q || i.label.toLowerCase().includes(q));
      rowList.innerHTML = items.map(i => `
        <div class="row" data-nav="#/iwantto/${i.id}">
          <span class="emoji">${i.emoji}</span>
          <span class="text">${escapeHtml(i.label)}</span>
          <span class="chev">›</span>
        </div>`).join("") || `<div class="empty-state">No matches. Try a different search term.</div>`;
      bindNav();
    });
  }
}

/* ---------- PWA install prompt ---------- */
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (!localStorage.getItem("ehs_install_dismissed")) {
    const banner = document.getElementById("installBanner");
    if (banner) banner.classList.add("show");
  }
});

function bindInstallBanner() {
  const banner = document.getElementById("installBanner");
  const installBtn = document.getElementById("installBtn");
  const dismissBtn = document.getElementById("installDismiss");
  if (deferredInstallPrompt && !localStorage.getItem("ehs_install_dismissed") && banner) {
    banner.classList.add("show");
  }
  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      if (banner) banner.classList.remove("show");
    });
  }
  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      localStorage.setItem("ehs_install_dismissed", "1");
      if (banner) banner.classList.remove("show");
    });
  }
}

/* ---------- Home search wiring (redirect to #/search) ---------- */
document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "searchInput" && parseRoute().name === "home") {
    // keep inline results on home page, no redirect needed
  }
});

/* ---------- Init ---------- */
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
