const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "..");
const ICONS = path.join(__dirname, "icons");

const NAVY = "0C3D72";
const CYAN = "12A0D6";
const WHITE = "FFFFFF";
const INK = "16181C";
const INK_SOFT = "4A4F57";
const BORDER = "D8DEE8";

const URL_TEXT = "uct-singapore.github.io/ucap-ehs-pocket-guide";

const TITLE_FONT = "Cambria";
const BODY_FONT = "Calibri";

const pres = new pptxgen();
// A4 portrait, print-ready
pres.defineLayout({ name: "A4_PORTRAIT", width: 8.27, height: 11.69 });
pres.layout = "A4_PORTRAIT";
const PW = 8.27;
const PH = 11.69;

const slide = pres.addSlide();
slide.background = { color: WHITE };

function iconCircle(x, y, d, bg, icon, iconScale = 0.56) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" } });
  const iw = d * iconScale;
  slide.addImage({ path: path.join(ICONS, `${icon}.png`), x: x + (d - iw) / 2, y: y + (d - iw) / 2, w: iw, h: iw });
}

/* ---------- Header: logo + title ---------- */
const logoSize = 0.85;
slide.addImage({ path: path.join(ASSETS, "brand/uct-logo.png"), x: (PW - logoSize * 3.007) / 2, y: 0.5, w: logoSize * 3.007, h: logoSize });

slide.addText("Add the EHS Pocket Guide to Your Home Screen", {
  x: 0.5, y: 1.5, w: PW - 1, h: 0.85,
  fontFace: TITLE_FONT, bold: true, fontSize: 26, color: NAVY, align: "center", valign: "top",
  isTextBox: true, margin: 0, lineSpacingMultiple: 1.05
});
slide.addText("One-tap access to emergency steps, checklists and contacts", {
  x: 0.5, y: 2.35, w: PW - 1, h: 0.35,
  fontFace: BODY_FONT, fontSize: 13, color: INK_SOFT, align: "center", isTextBox: true, margin: 0
});

/* ---------- QR code ---------- */
const qrSize = 2.05;
slide.addShape(pres.ShapeType.roundRect, {
  x: (PW - qrSize) / 2 - 0.12, y: 2.85, w: qrSize + 0.24, h: qrSize + 0.24, rectRadius: 0.1,
  fill: { color: WHITE }, line: { color: BORDER, width: 1 },
  shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 6, offset: 2, angle: 90 }
});
slide.addImage({ path: path.join(__dirname, "qr_only.png"), x: (PW - qrSize) / 2, y: 2.97, w: qrSize, h: qrSize });
slide.addText("SCAN OR TAP TO OPEN", {
  x: 0, y: 5.2, w: PW, h: 0.28,
  fontFace: BODY_FONT, bold: true, fontSize: 11, color: CYAN, align: "center", charSpacing: 2, isTextBox: true, margin: 0
});
slide.addText(URL_TEXT, {
  x: 0, y: 5.46, w: PW, h: 0.3,
  fontFace: BODY_FONT, fontSize: 11, color: INK_SOFT, align: "center", isTextBox: true, margin: 0
});

/* ---------- Two-column instructions ---------- */
const colTop = 6.05;
const colGap = 0.4;
const colW = (PW - 1 - colGap) / 2;
const leftX = 0.5;
const rightX = leftX + colW + colGap;

function instructionColumn(x, heading, warning, steps) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y: colTop, w: colW, h: 4.75, rectRadius: 0.08,
    fill: { color: "F4F5F7" }, line: { type: "none" }
  });
  slide.addText(heading, {
    x: x + 0.25, y: colTop + 0.22, w: colW - 0.5, h: 0.4,
    fontFace: TITLE_FONT, bold: true, fontSize: 17, color: NAVY, isTextBox: true, margin: 0
  });

  let cursorY = colTop + 0.7;
  if (warning) {
    slide.addText(warning, {
      x: x + 0.25, y: cursorY, w: colW - 0.5, h: 0.62,
      fontFace: BODY_FONT, bold: true, fontSize: 10.5, color: NAVY, isTextBox: true, margin: 0, lineSpacingMultiple: 1.12
    });
    cursorY += 0.72;
  }

  const rowH = (colTop + 4.75 - 0.3 - cursorY) / steps.length;
  steps.forEach((s, i) => {
    const y = cursorY + i * rowH;
    slide.addShape(pres.ShapeType.ellipse, {
      x: x + 0.25, y: y + (rowH - 0.42) / 2, w: 0.42, h: 0.42,
      fill: { color: NAVY }, line: { type: "none" }
    });
    slide.addText(String(i + 1), {
      x: x + 0.25, y: y + (rowH - 0.42) / 2, w: 0.42, h: 0.42,
      fontFace: BODY_FONT, bold: true, fontSize: 14, color: WHITE, align: "center", valign: "middle", isTextBox: true, margin: 0
    });
    slide.addText(s, {
      x: x + 0.8, y: y, w: colW - 1.05, h: rowH,
      fontFace: BODY_FONT, fontSize: 11, color: INK, valign: "middle", isTextBox: true, margin: 0, lineSpacingMultiple: 1.08
    });
  });
}

instructionColumn(
  leftX,
  "iPhone & iPad",
  "Must use Safari — Chrome/Firefox on iPhone can't install it as a full app.",
  [
    "Open the link above in Safari",
    "Tap the Share icon in the toolbar",
    "Scroll down, tap “Add to Home Screen”",
    "Tap “Add” in the top right — done!"
  ]
);

instructionColumn(
  rightX,
  "Android",
  null,
  [
    "Open the link above in Chrome",
    "Tap the ⋮ menu in the top right",
    "Tap “Add to Home screen” (or “Install app”)",
    "Tap “Add”/“Install” to confirm — done!"
  ]
);

/* ---------- Footer ---------- */
const footY = 11.05;
iconCircle(0.5, footY - 0.02, 0.4, CYAN, "phoneCall", 0.55);
slide.addText([
  { text: "Need help? Contact EHS: ", options: { bold: true, color: NAVY } },
  { text: "9678 5585", options: { bold: true, color: NAVY } }
], {
  x: 1.05, y: footY, w: PW - 2, h: 0.4,
  fontFace: BODY_FONT, fontSize: 12, valign: "middle", isTextBox: true, margin: 0
});

pres.writeFile({ fileName: path.join(ASSETS, "UCAP_EHS_Add_to_Home_Screen_Poster.pptx") }).then(() => {
  console.log("wrote UCAP_EHS_Add_to_Home_Screen_Poster.pptx");
});
