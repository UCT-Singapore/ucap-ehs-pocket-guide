const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "..");
const ICONS = path.join(__dirname, "icons");

const NAVY = "0C3D72";
const NAVY_DARK = "082A52";
const CYAN = "12A0D6";
const WHITE = "FFFFFF";
const BG_LIGHT = "F4F5F7";
const INK = "16181C";
const INK_SOFT = "4A4F57";

const URL_TEXT = "uct-singapore.github.io/ucap-ehs-pocket-guide";
const URL_FULL = "https://uct-singapore.github.io/ucap-ehs-pocket-guide/";

const TITLE_FONT = "Cambria";
const BODY_FONT = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
const PW = 13.333;
const PH = 7.5;

function iconCircle(slide, { x, y, d, bg, icon, iconScale = 0.56 }) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" } });
  const iw = d * iconScale;
  slide.addImage({ path: path.join(ICONS, `${icon}.png`), x: x + (d - iw) / 2, y: y + (d - iw) / 2, w: iw, h: iw });
}

function footer(slide, light) {
  slide.addText("UCAP EHS Pocket Guide", {
    x: 0.5, y: PH - 0.45, w: 6, h: 0.3,
    fontFace: BODY_FONT, fontSize: 10, color: light ? "9FB6D6" : INK_SOFT, margin: 0
  });
}

/* ---------- Slide 1: Title ---------- */
{
  const slide = pres.addSlide();
  slide.background = { color: NAVY };

  // logo badge (white rounded tile, reused from the app's own PWA icon)
  const badgeSize = 1.5;
  slide.addImage({ path: path.join(ASSETS, "icons/icon-512.png"), x: (PW - badgeSize) / 2, y: 0.55, w: badgeSize, h: badgeSize });

  slide.addText("Add the EHS Pocket Guide\nto Your Home Screen", {
    x: 1, y: 2.35, w: PW - 2, h: 1.5,
    fontFace: TITLE_FONT, bold: true, fontSize: 34, color: WHITE, align: "center", valign: "top",
    lineSpacingMultiple: 1.08, margin: 0
  });
  slide.addText("One-tap access to emergency steps, checklists and contacts — on iPhone and Android", {
    x: 1.4, y: 3.75, w: PW - 2.8, h: 0.6,
    fontFace: BODY_FONT, fontSize: 16, color: "CADCFC", align: "center", margin: 0
  });

  // QR card (image already carries its own white background)
  const qrSize = 1.9;
  slide.addImage({ path: path.join(__dirname, "qr_only.png"), x: (PW - qrSize) / 2, y: 4.55, w: qrSize, h: qrSize });
  slide.addText("SCAN OR TAP", {
    x: 0, y: 6.55, w: PW, h: 0.3,
    fontFace: BODY_FONT, bold: true, fontSize: 11, color: CYAN, align: "center", charSpacing: 2, margin: 0
  });
  slide.addText(URL_TEXT, {
    x: 0, y: 6.85, w: PW, h: 0.35,
    fontFace: BODY_FONT, fontSize: 13, color: "CADCFC", align: "center", margin: 0
  });
}

/* ---------- Slide 2: Why add it ---------- */
{
  const slide = pres.addSlide();
  slide.background = { color: BG_LIGHT };

  slide.addText("Why Add It to Your Home Screen?", {
    x: 0.6, y: 0.55, w: PW - 1.2, h: 0.7,
    fontFace: TITLE_FONT, bold: true, fontSize: 30, color: NAVY, margin: 0
  });

  const cards = [
    { icon: "zap", bg: CYAN, title: "Quick Access", desc: "Open it in one tap — no need to search for the link every time." },
    { icon: "wifiOff", bg: NAVY, title: "Works With Poor Signal", desc: "Key pages stay cached, so it still opens with a weak or no connection." },
    { icon: "globe", bg: CYAN, title: "English & 中文", desc: "Switch the whole guide's language anytime, right from the home screen." },
    { icon: "moon", bg: NAVY, title: "Light or Dark", desc: "Opens in light mode by default — toggle dark whenever you prefer." }
  ];

  const cardW = 5.75, cardH = 2.15, gapX = 0.5, gapY = 0.4;
  const startX = (PW - (cardW * 2 + gapX)) / 2;
  const startY = 1.7;
  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);
    slide.addShape(pres.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH, rectRadius: 0.12,
      fill: { color: WHITE }, line: { type: "none" },
      shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 8, offset: 3, angle: 90 }
    });
    iconCircle(slide, { x: x + 0.35, y: y + 0.35, d: 0.75, bg: c.bg, icon: c.icon });
    slide.addText(c.title, {
      x: x + 1.35, y: y + 0.32, w: cardW - 1.65, h: 0.4,
      fontFace: BODY_FONT, bold: true, fontSize: 16, color: NAVY, margin: 0
    });
    slide.addText(c.desc, {
      x: x + 1.35, y: y + 0.75, w: cardW - 1.65, h: 1.1,
      fontFace: BODY_FONT, fontSize: 12.5, color: INK_SOFT, margin: 0, lineSpacingMultiple: 1.15
    });
  });

  footer(slide, false);
}

function stepsSlide({ title, warning, steps, note }) {
  const slide = pres.addSlide();
  slide.background = { color: BG_LIGHT };

  slide.addText(title, {
    x: 0.6, y: 0.55, w: PW - 1.2, h: 0.7,
    fontFace: TITLE_FONT, bold: true, fontSize: 30, color: NAVY, margin: 0
  });

  let contentTop = 1.55;
  if (warning) {
    const boxH = 0.75;
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: contentTop, w: PW - 1.2, h: boxH, rectRadius: 0.1,
      fill: { color: "E6F4FA" }, line: { type: "none" }
    });
    iconCircle(slide, { x: 0.85, y: contentTop + (boxH - 0.5) / 2, d: 0.5, bg: CYAN, icon: "info", iconScale: 0.6 });
    slide.addText(warning, {
      x: 1.55, y: contentTop, w: PW - 2.35, h: boxH,
      fontFace: BODY_FONT, bold: true, fontSize: 14, color: NAVY, valign: "middle", margin: 0, lineSpacingMultiple: 1.1
    });
    contentTop += boxH + 0.4;
  }

  const rowH = (6.6 - contentTop) / steps.length;
  steps.forEach((s, i) => {
    const y = contentTop + i * rowH;
    // number badge
    slide.addShape(pres.ShapeType.ellipse, {
      x: 0.6, y: y + (rowH - 0.6) / 2, w: 0.6, h: 0.6,
      fill: { color: NAVY }, line: { type: "none" }
    });
    slide.addText(String(i + 1), {
      x: 0.6, y: y + (rowH - 0.6) / 2, w: 0.6, h: 0.6,
      fontFace: BODY_FONT, bold: true, fontSize: 20, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    // icon circle
    iconCircle(slide, { x: 1.55, y: y + (rowH - 0.6) / 2, d: 0.6, bg: CYAN, icon: s.icon });
    // text
    slide.addText(s.text, {
      x: 2.55, y: y, w: PW - 3.15, h: rowH,
      fontFace: BODY_FONT, fontSize: 16, color: INK, valign: "middle", margin: 0, lineSpacingMultiple: 1.1
    });
  });

  if (note) {
    slide.addText(note, {
      x: 0.6, y: 6.75, w: PW - 1.2, h: 0.4,
      fontFace: BODY_FONT, italic: true, fontSize: 12, color: INK_SOFT, margin: 0
    });
  }

  footer(slide, false);
  return slide;
}

/* ---------- Slide 3: iPhone / iPad ---------- */
stepsSlide({
  title: "iPhone & iPad (Safari)",
  warning: "Must be opened in Safari — Chrome, Firefox and other iPhone browsers can't install it as a full app.",
  steps: [
    { icon: "globe", text: "Open the link above in Safari" },
    { icon: "share", text: "Tap the Share icon in the toolbar" },
    { icon: "plusSquare", text: "Scroll down and tap “Add to Home Screen”" },
    { icon: "check", text: "Tap “Add” in the top right — done!" }
  ]
});

/* ---------- Slide 4: Android ---------- */
stepsSlide({
  title: "Android (Chrome)",
  steps: [
    { icon: "globe", text: "Open the link above in Chrome" },
    { icon: "moreVertical", text: "Tap the ⋮ menu in the top right" },
    { icon: "plusSquare", text: "Tap “Add to Home screen” (or “Install app”)" },
    { icon: "check", text: "Tap “Add” / “Install” to confirm — done!" }
  ],
  note: "Tip: Chrome sometimes shows an “Install” banner automatically — just tap that instead."
});

/* ---------- Slide 5: Support / closing ---------- */
{
  const slide = pres.addSlide();
  slide.background = { color: NAVY };

  const badgeSize = 1.1;
  slide.addImage({ path: path.join(ASSETS, "icons/icon-512.png"), x: (PW - badgeSize) / 2, y: 0.6, w: badgeSize, h: badgeSize });

  slide.addText("Questions?", {
    x: 0, y: 2.0, w: PW, h: 0.6,
    fontFace: TITLE_FONT, bold: true, fontSize: 28, color: WHITE, align: "center", margin: 0
  });

  const cardW = 5.2, cardH = 1.05;
  const cx = (PW - cardW) / 2, cy = 2.85;
  slide.addShape(pres.ShapeType.roundRect, {
    x: cx, y: cy, w: cardW, h: cardH, rectRadius: 0.12,
    fill: { color: NAVY_DARK }, line: { type: "none" }
  });
  iconCircle(slide, { x: cx + 0.25, y: cy + (cardH - 0.6) / 2, d: 0.6, bg: CYAN, icon: "phoneCall" });
  slide.addText("EHS — Toh Ee Meng", {
    x: cx + 1.05, y: cy + 0.15, w: cardW - 1.3, h: 0.4,
    fontFace: BODY_FONT, bold: true, fontSize: 15, color: WHITE, margin: 0
  });
  slide.addText("9678 5585", {
    x: cx + 1.05, y: cy + 0.55, w: cardW - 1.3, h: 0.35,
    fontFace: BODY_FONT, fontSize: 13, color: "CADCFC", margin: 0
  });

  const qrSize = 1.5;
  slide.addImage({ path: path.join(__dirname, "qr_only.png"), x: (PW - qrSize) / 2, y: 4.5, w: qrSize, h: qrSize });
  slide.addText(URL_TEXT, {
    x: 0, y: 6.15, w: PW, h: 0.35,
    fontFace: BODY_FONT, fontSize: 12, color: "CADCFC", align: "center", margin: 0
  });

  footer(slide, true);
}

pres.writeFile({ fileName: path.join(ASSETS, "UCAP_EHS_Add_to_Home_Screen.pptx") }).then(() => {
  console.log("wrote UCAP_EHS_Add_to_Home_Screen.pptx");
});
