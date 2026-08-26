const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fi = require("react-icons/fi");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "icons");
fs.mkdirSync(OUT_DIR, { recursive: true });

// name -> [iconComponentName, color] — all white; circle background color
// (navy/cyan) is decided per placement in the slide-building script.
const ICONS = {
  zap: ["FiZap", "FFFFFF"],
  wifiOff: ["FiWifiOff", "FFFFFF"],
  globe: ["FiGlobe", "FFFFFF"],
  moon: ["FiMoon", "FFFFFF"],
  share: ["FiShare", "FFFFFF"],
  plusSquare: ["FiPlusSquare", "FFFFFF"],
  moreVertical: ["FiMoreVertical", "FFFFFF"],
  download: ["FiDownload", "FFFFFF"],
  phoneCall: ["FiPhoneCall", "FFFFFF"],
  check: ["FiCheck", "FFFFFF"],
  info: ["FiInfo", "FFFFFF"]
};

async function main() {
  for (const [name, [compName, color]] of Object.entries(ICONS)) {
    const Comp = fi[compName];
    // Use react-icons' own rendered <svg> markup as-is — it already carries
    // the fill="none" stroke="currentColor" + style="color:..." that Feather
    // icons need; stripping/rebuilding the root tag loses those and every
    // icon rasterizes as a solid black silhouette instead of a white outline.
    const svg = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Comp, { color: `#${color}`, size: 256 })
    );
    const pngPath = path.join(OUT_DIR, `${name}.png`);
    await sharp(Buffer.from(svg)).resize(256, 256).png().toFile(pngPath);
    console.log("wrote", pngPath);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
