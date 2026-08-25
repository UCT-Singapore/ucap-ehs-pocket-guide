/* ============================================================
   UCAP EHS POCKET GUIDE — APP LOGIC
   Simple hash-router single-page app. No build step required.
   ============================================================ */

const $app = document.getElementById("app");
const BRAND_LOGO_SRC = "./brand/uct-logo.png";

/* ---------- Language ---------- */
function getLang() {
  return localStorage.getItem("ehs_lang") || "en";
}
function setLang(lang) {
  localStorage.setItem("ehs_lang", lang);
  render();
}
// Resolve a bilingual { en, zh } field to the current language's string.
// Non-object fields (ids, urls, phone numbers) pass through unchanged.
function t(field) {
  if (field && typeof field === "object" && !Array.isArray(field) && "en" in field) {
    return field[getLang()] || field.en;
  }
  return field;
}

const UI = {
  heroTagline: { en: "Got a workplace safety situation? Find what to do in 20–30 seconds.", zh: "遇到工作场所安全问题？20-30秒内即可找到应对方法。" },
  searchPlaceholderHome: { en: "Search a topic, e.g. 'spill', 'ladder'...", zh: "搜索主题，例如「泄漏」、「梯子」..." },
  browseByTopic: { en: "Browse by Topic", zh: "按主题浏览" },
  emergencyBannerTitle: { en: "Emergency", zh: "紧急情况" },
  emergencyBannerSub: { en: "Fire, injury, spill — tap for immediate steps", zh: "火灾、受伤、泄漏——点击查看应急步骤" },
  iWantToSection: { en: "I Want To...", zh: "我要..." },
  checklistRowTitle: { en: "Get checklist before starting a task", zh: "开始任务前获取检查清单" },
  checklistRowSub: { en: "New chemical, ladder, hot work, contractor and more", zh: "新化学品、梯子、动火作业、承包商等" },
  disclaimerTitle: { en: "Quick Action Guide", zh: "快速行动指南" },
  disclaimerBody: { en: "This guide provides quick workplace guidance and does not replace approved Risk Assessments, Work Instructions, SDSs or emergency procedures. When in doubt, contact EHS.", zh: "本指南提供快速的工作场所指引，不能替代经批准的风险评估、作业指导书、SDS或应急程序。如有疑问，请联系EHS。" },
  noTopicsInCategory: { en: "No topics yet in this category.", zh: "该类别暂无主题。" },
  needMoreInfo: { en: "Need More Information?", zh: "需要更多信息？" },
  iWantToHeading: { en: "What are you about to do?", zh: "您准备做什么？" },
  iWantToSub: { en: "Get the checklist to complete before you start.", zh: "获取开始前需完成的检查清单。" },
  iWantToSearchPlaceholder: { en: "Search an action...", zh: "搜索操作..." },
  noMatches: { en: "No matches. Try a different search term.", zh: "未找到匹配项。请尝试其他搜索词。" },
  emergencyContactsHeading: { en: "📞 Emergency Contacts", zh: "📞 紧急联系方式" },
  quickGuides: { en: "Quick Guides", zh: "快速指南" },
  allTopicsHeading: { en: "🔍 All Topics", zh: "🔍 所有主题" },
  pageNotFound: { en: "Page not found.", zh: "页面未找到。" },
  backToHome: { en: "← Back to Home", zh: "← 返回首页" },
  categoryFallback: { en: "Category", zh: "类别" },
  guideFallback: { en: "Guide", zh: "指南" },
  checklistFallback: { en: "Checklist", zh: "检查清单" },
  emergencyContactsTitle: { en: "Emergency Contacts", zh: "紧急联系方式" },
  azTitle: { en: "A–Z Quick Search", zh: "A–Z 快速搜索" },
  navHome: { en: "Home", zh: "首页" },
  navEmergency: { en: "Emergency", zh: "紧急" },
  navIWantTo: { en: "I Want To", zh: "我要" },
  navSearch: { en: "Search", zh: "搜索" },
  installBannerText: { en: "📲 Add this guide to your home screen for one-tap access.", zh: "📲 将本指南添加到主屏幕，一键访问。" },
  installBannerTextIOS: { en: "📲 Add this guide to your home screen: tap the Share button below, then \"Add to Home Screen\".", zh: "📲 将本指南添加到主屏幕：点击下方的分享按钮，然后选择「添加到主屏幕」。" },
  installBannerTextIOSNonSafari: { en: "📲 For the full app experience, open this page in Safari, then tap Share → \"Add to Home Screen\" (Chrome and other iOS browsers can't install it as an app).", zh: "📲 如需完整应用体验，请在Safari浏览器中打开此页面，然后点击「分享」→「添加到主屏幕」（Chrome及其他iOS浏览器无法将本指南安装为应用程序）。" },
  installBtn: { en: "Install", zh: "安装" },
  addToHomeScreen: { en: "Add to Home Screen", zh: "添加到主屏幕" },
  searchPlaceholderGeneric: { en: "Search a topic...", zh: "搜索主题..." },
  noResults: {
    en: (q) => `No results for "${q}". Try a shorter word, or contact EHS directly.`,
    zh: (q) => `未找到「${q}」的相关结果。请尝试更简短的关键词，或直接联系EHS。`
  }
};
function tt(key) {
  return UI[key][getLang()] || UI[key].en;
}

/* ---------- Theme ---------- */
function getStoredTheme() {
  return localStorage.getItem("ehs_theme"); // "light" | "dark" | null (follow system)
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme || "light");
}
function currentEffectiveTheme() {
  return getStoredTheme() || "light";
}
function toggleTheme() {
  const next = currentEffectiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem("ehs_theme", next);
  applyTheme(next);
  render();
}
applyTheme(getStoredTheme());

/* ---------- Install prompt platform detection ----------
   iOS Safari has no beforeinstallprompt event — there is no
   programmatic way to trigger the install there, so it needs its
   own banner with manual "tap Share > Add to Home Screen" text.
-------------------------------------------------------- */
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
// Chrome/Firefox/Edge on iOS are all WebKit under the hood and still contain
// "Safari" in their UA string, so real Safari has to be identified by the
// ABSENCE of those other browsers' own UA tokens. This matters because iOS
// only allows a true standalone (full-screen, no browser chrome) home-screen
// install from Safari itself — other iOS browsers can only add a bookmark.
function isIOSSafari() {
  return isIOS() && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|mercury/i.test(navigator.userAgent);
}
function isStandalone() {
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
    || window.navigator.standalone === true;
}

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
      <span class="emoji">${l.emoji}</span><span>${escapeHtml(t(l.label))}</span>
    </a>`;
  }).join("")}</div>`;
}

function disclaimer() {
  return `<div class="disclaimer">
    <strong>${escapeHtml(tt("disclaimerTitle"))}</strong>
    ${escapeHtml(tt("disclaimerBody"))}
  </div>`;
}

/* ---------- Views ---------- */
function viewHome() {
  const categoryTiles = CATEGORIES.map(c => `
    <div class="tile" data-nav="#/category/${c.id}">
      <span class="emoji">${c.emoji}</span>
      <span class="label">${escapeHtml(t(c.label))}</span>
    </div>`).join("");

  const lang = getLang();
  const theme = currentEffectiveTheme();

  return `
    <div class="brand-strip">
      <img src="${BRAND_LOGO_SRC}" alt="UCT" class="brand-logo">
      <div class="brand-strip-toggles">
        <div class="lang-toggle" id="langToggle">
          <button data-lang="en" class="${lang === "en" ? "active" : ""}">EN</button>
          <button data-lang="zh" class="${lang === "zh" ? "active" : ""}">中</button>
        </div>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">${theme === "dark" ? "☀️" : "🌙"}</button>
        ${isStandalone() ? "" : `<button class="theme-toggle" id="installNowBtn" aria-label="${escapeHtml(tt("addToHomeScreen"))}">📲</button>`}
      </div>
    </div>

    <div class="hero">
      <div class="eyebrow">${escapeHtml(SITE.companyShort)} EHS</div>
      <h1>${escapeHtml(t(SITE.tagline))}</h1>
      <p>${escapeHtml(tt("heroTagline"))}</p>
    </div>

    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="searchInput" type="search" placeholder="${escapeHtml(tt("searchPlaceholderHome"))}" autocomplete="off">
    </div>
    <div id="searchResults"></div>

    <div id="homeSections">
      <div class="emergency-banner" data-nav="#/category/emergency">
        <span class="emoji">🔴</span>
        <span>${escapeHtml(tt("emergencyBannerTitle"))}<span class="sub">${escapeHtml(tt("emergencyBannerSub"))}</span></span>
      </div>

      <div class="section-label">${escapeHtml(tt("browseByTopic"))}</div>
      <div class="tile-grid">${categoryTiles}</div>

      <div class="section-label">${escapeHtml(tt("iWantToSection"))}</div>
      <div class="row" data-nav="#/iwantto">
        <span class="emoji">💡</span>
        <span class="text">${escapeHtml(tt("checklistRowTitle"))}<small>${escapeHtml(tt("checklistRowSub"))}</small></span>
        <span class="chev">›</span>
      </div>
    </div>
    ${disclaimer()}
  `;
}

function viewCategory(catId) {
  const cat = catById(catId);
  if (!cat) return viewNotFound();
  const topics = TOPICS.filter(topic => topic.category === catId);
  const rows = topics.map(topic => `
    <div class="row" data-nav="#/topic/${topic.id}">
      <span class="emoji">${topic.emoji}</span>
      <span class="text">${escapeHtml(t(topic.title))}</span>
      <span class="chev">›</span>
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(t(cat.label))}</div>
    <h2 style="margin:0 0 12px;font-size:19px;">${cat.emoji} ${escapeHtml(t(cat.label))}</h2>
    <div class="row-list">${rows || `<div class="empty-state">${escapeHtml(tt("noTopicsInCategory"))}</div>`}</div>
    ${disclaimer()}
  `;
}

function viewTopic(id) {
  const topic = topicById(id);
  if (!topic) return viewNotFound();
  const steps = topic.steps.map((s, i) => `
    <div class="step-card">
      <div class="step-num">${i + 1}</div>
      <div class="step-body"><strong>${escapeHtml(t(s.title))}</strong><p>${escapeHtml(t(s.text))}</p></div>
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(t(topic.badge))}</div>
    <div class="topic-header"><span class="emoji">${topic.emoji}</span><h2>${escapeHtml(t(topic.title))}</h2></div>
    <div style="margin:14px 0 10px;">
      ${steps}
    </div>
    ${topic.danger ? `<div class="danger-box"><strong>⚠️ ${getLang() === "zh" ? "重要" : "Important"}</strong>${escapeHtml(t(topic.danger))}</div>` : ""}
    <div class="section-label">${escapeHtml(tt("needMoreInfo"))}</div>
    ${renderLinks(topic.links)}
    ${disclaimer()}
  `;
}

function viewIWantToList(query) {
  const q = (query || "").trim().toLowerCase();
  const items = I_WANT_TO.filter(i => !q || t(i.label).toLowerCase().includes(q));
  const rows = items.map(i => `
    <div class="row" data-nav="#/iwantto/${i.id}">
      <span class="emoji">${i.emoji}</span>
      <span class="text">${escapeHtml(t(i.label))}</span>
      <span class="chev">›</span>
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(tt("iWantToSection"))}</div>
    <h2 style="margin:0 0 4px;font-size:19px;">💡 ${escapeHtml(tt("iWantToHeading"))}</h2>
    <p style="margin:0 0 14px;color:var(--ink-soft);font-size:13.5px;">${escapeHtml(tt("iWantToSub"))}</p>
    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="iWantToSearch" type="search" placeholder="${escapeHtml(tt("iWantToSearchPlaceholder"))}" autocomplete="off" value="${escapeHtml(query || "")}">
    </div>
    <div class="row-list">${rows || `<div class="empty-state">${escapeHtml(tt("noMatches"))}</div>`}</div>
    ${disclaimer()}
  `;
}

function viewIWantToDetail(id) {
  const item = iWantToById(id);
  if (!item) return viewNotFound();
  const checklist = item.checklist.map(c => `<li>${escapeHtml(t(c))}</li>`).join("");

  return `
    <div class="badge">${escapeHtml(tt("iWantToSection"))}</div>
    <div class="topic-header"><span class="emoji">${item.emoji}</span><h2>${escapeHtml(t(item.label))}</h2></div>
    <p style="margin:8px 0 12px;font-size:14px;color:var(--ink-soft);">${escapeHtml(t(item.intro))}</p>
    <ul class="checklist">${checklist}</ul>
    ${item.note ? `<div class="note-box"><strong>${getLang() === "zh" ? "注意：" : "Note:"}</strong> ${escapeHtml(t(item.note))}</div>` : ""}
    ${item.danger ? `<div class="danger-box"><strong>⚠️ ${getLang() === "zh" ? "重要" : "Important"}</strong>${escapeHtml(t(item.danger))}</div>` : ""}
    <div class="section-label">${escapeHtml(tt("needMoreInfo"))}</div>
    ${renderLinks(item.links)}
    ${disclaimer()}
  `;
}

function viewContacts() {
  const groups = CONTACTS.map(g => `
    <div class="section-label">${escapeHtml(t(g.group))}</div>
    <div class="row-list">
      ${g.items.map(c => `
        <a class="row plain" href="tel:${c.phone.replace(/[^\d+]/g, '')}">
          <span class="emoji">${c.emoji}</span>
          <span class="text">${escapeHtml(t(c.label))}<small>${escapeHtml(c.phone)}</small></span>
          <span class="chev">📞</span>
        </a>`).join("")}
    </div>`).join("");

  return `
    <div class="badge">${escapeHtml(tt("emergencyBannerTitle"))}</div>
    <h2 style="margin:0 0 14px;font-size:19px;">${escapeHtml(tt("emergencyContactsHeading"))}</h2>
    ${groups}
    ${disclaimer()}
  `;
}

function viewSearch(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return "";
  const topicMatches = TOPICS.filter(topic =>
    t(topic.title).toLowerCase().includes(q) || t(topic.badge).toLowerCase().includes(q)
  );
  const iwtMatches = I_WANT_TO.filter(i => t(i.label).toLowerCase().includes(q));

  if (!topicMatches.length && !iwtMatches.length) {
    return `<div class="empty-state">${escapeHtml(tt("noResults")(query))}</div>`;
  }

  let html = "";
  if (topicMatches.length) {
    html += `<div class="section-label">${escapeHtml(tt("quickGuides"))}</div><div class="row-list">`;
    html += topicMatches.map(topic => `
      <div class="row" data-nav="#/topic/${topic.id}">
        <span class="emoji">${topic.emoji}</span>
        <span class="text">${escapeHtml(t(topic.title))}<small>${escapeHtml(t(topic.badge))}</small></span>
        <span class="chev">›</span>
      </div>`).join("");
    html += `</div>`;
  }
  if (iwtMatches.length) {
    html += `<div class="section-label">${escapeHtml(tt("iWantToSection"))}</div><div class="row-list">`;
    html += iwtMatches.map(i => `
      <div class="row" data-nav="#/iwantto/${i.id}">
        <span class="emoji">${i.emoji}</span>
        <span class="text">${escapeHtml(t(i.label))}</span>
        <span class="chev">›</span>
      </div>`).join("");
    html += `</div>`;
  }
  return html;
}

function viewAZ() {
  const all = TOPICS.map(topic => ({ id: topic.id, label: t(topic.title), emoji: topic.emoji }))
    .sort((a, b) => a.label.localeCompare(b.label, getLang() === "zh" ? "zh-Hans" : "en"));
  const rows = all.map(topic => `
    <div class="row" data-nav="#/topic/${topic.id}">
      <span class="emoji">${topic.emoji}</span>
      <span class="text">${escapeHtml(topic.label)}</span>
      <span class="chev">›</span>
    </div>`).join("");
  return `
    <div class="badge">A–Z</div>
    <h2 style="margin:0 0 12px;font-size:19px;">${escapeHtml(tt("allTopicsHeading"))}</h2>
    <div class="row-list">${rows}</div>
    ${disclaimer()}
  `;
}

function viewNotFound() {
  return `<div class="empty-state">${escapeHtml(tt("pageNotFound"))}<br><br><a class="plain" href="#/" style="color:var(--blue);font-weight:600;">${escapeHtml(tt("backToHome"))}</a></div>`;
}

/* ---------- Top bar config per route ---------- */
function topbarFor(route) {
  if (route.name === "home") {
    return { title: t(SITE.name), sub: SITE.companyShort, showBack: false };
  }
  const titles = {
    category: () => t(catById(route.params[0])?.label) || tt("categoryFallback"),
    topic: () => t(topicById(route.params[0])?.title) || tt("guideFallback"),
    iwantto_list: () => tt("iWantToSection"),
    iwantto_detail: () => t(iWantToById(route.params[0])?.label) || tt("checklistFallback"),
    contacts: () => tt("emergencyContactsTitle"),
    az: () => tt("azTitle")
  };
  const fn = titles[route.name];
  return { title: fn ? fn() : t(SITE.name), sub: null, showBack: true };
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
  document.documentElement.lang = getLang() === "zh" ? "zh-Hans" : "en";
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
    case "search": bodyHtml = viewSearchPage(route.params[0]); break;
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
      <span>${escapeHtml(
        !isIOS() ? tt("installBannerText") :
        isIOSSafari() ? tt("installBannerTextIOS") :
        tt("installBannerTextIOSNonSafari")
      )}</span>
      ${isIOS() ? "" : `<button id="installBtn">${escapeHtml(tt("installBtn"))}</button>`}
      <button class="dismiss" id="installDismiss">✕</button>
    </div>
    <main id="mainContent">${bodyHtml}</main>
    <nav class="bottom-nav">
      <button data-nav="#/" class="${route.name === 'home' ? 'active' : ''}"><span class="emoji">🏠</span>${escapeHtml(tt("navHome"))}</button>
      <button data-nav="#/category/emergency" class="${route.name === 'category' && route.params[0] === 'emergency' ? 'active' : ''}"><span class="emoji">🔴</span>${escapeHtml(tt("navEmergency"))}</button>
      <button data-nav="#/iwantto" class="${route.name === 'iwantto_list' || route.name === 'iwantto_detail' ? 'active' : ''}"><span class="emoji">💡</span>${escapeHtml(tt("navIWantTo"))}</button>
      <button data-nav="#/az" class="${route.name === 'az' ? 'active' : ''}"><span class="emoji">🔍</span>${escapeHtml(tt("navSearch"))}</button>
    </nav>
  `;

  bindNav();
  bindSearch();
  bindInstallBanner();
  bindToggles();
  window.scrollTo(0, 0);
}

function viewSearchPage(q) {
  return `
    <div class="search-wrap">
      <span class="icon">🔍</span>
      <input id="searchInput" type="search" placeholder="${escapeHtml(tt("searchPlaceholderGeneric"))}" value="${escapeHtml(q)}" autocomplete="off">
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

function bindToggles() {
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.querySelectorAll("button[data-lang]").forEach(btn => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  const installNowBtn = document.getElementById("installNowBtn");
  if (installNowBtn) {
    installNowBtn.addEventListener("click", () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.finally(() => { deferredInstallPrompt = null; });
        return;
      }
      // No native prompt available (iOS, or not yet offered by the browser) —
      // re-show the instructional banner even if it was previously dismissed.
      const banner = document.getElementById("installBanner");
      if (banner) banner.classList.add("show");
    });
  }
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
      const items = I_WANT_TO.filter(i => !q || t(i.label).toLowerCase().includes(q));
      rowList.innerHTML = items.map(i => `
        <div class="row" data-nav="#/iwantto/${i.id}">
          <span class="emoji">${i.emoji}</span>
          <span class="text">${escapeHtml(t(i.label))}</span>
          <span class="chev">›</span>
        </div>`).join("") || `<div class="empty-state">${escapeHtml(tt("noMatches"))}</div>`;
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
  const dismissed = localStorage.getItem("ehs_install_dismissed");
  const showable = isIOS() ? !isStandalone() : !!deferredInstallPrompt;
  if (banner && showable && !dismissed) {
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

/* ---------- Init ---------- */
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
