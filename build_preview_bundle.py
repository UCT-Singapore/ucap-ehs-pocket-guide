"""
Assemble preview_bundle.html — a self-contained single-file build of
the app, for use as a live Artifact preview. Inlines styles.css,
data.js and app.js, and embeds binary assets (icon, logo, SDS PDF)
as data: URIs so the whole thing works with no file server.

Run after any change to index.html / styles.css / data.js / app.js
/ icons / brand / sds, and re-publish the resulting file.

Usage: python3 build_preview_bundle.py
"""

import base64
import re

TITLE = "UCAP EHS Pocket Guide"
DESCRIPTION = "Quick-reference EHS guide for UCAP employees — emergency steps, chemical safety, PPE, waste disposal and more."


def b64_uri(path, mime):
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def main():
    icon_uri = b64_uri("icons/icon-192.png", "image/png")
    logo_uri = b64_uri("brand/uct-logo.png", "image/png")
    sds_uri = b64_uri("sds/IPA_SDS.pdf", "application/pdf")
    smoking_map_uri = b64_uri("docs/smoking-area-map.jpg", "image/jpeg")
    conduct_excerpt_uri = b64_uri("docs/Smoking_Policy_and_Disciplinary_Action_Excerpt.pdf", "application/pdf")

    styles = read("styles.css")

    data_js = read("data.js")
    data_js = data_js.replace('"./sds/IPA_SDS.pdf"', f'"{sds_uri}"')
    data_js = data_js.replace("./docs/smoking-area-map.jpg", smoking_map_uri)
    data_js = data_js.replace("./docs/Smoking_Policy_and_Disciplinary_Action_Excerpt.pdf", conduct_excerpt_uri)

    app_js = read("app.js")
    app_js = app_js.replace('"./brand/uct-logo.png"', f'"{logo_uri}"')
    app_js = re.sub(
        r'if \("serviceWorker" in navigator\) \{.*?\n\}\n?',
        "// Service worker registration omitted in this preview bundle (artifacts run sandboxed).\n",
        app_js,
        flags=re.S,
    )

    bundle = f"""<meta charset="UTF-8">
<title>{TITLE}</title>
<meta name="description" content="{DESCRIPTION}">
<link rel="icon" href="{icon_uri}">
<style>
{styles}
</style>

<div id="app">
  <div class="empty-state">Loading EHS Pocket Guide…</div>
</div>

<script>
{data_js}
</script>
<script>
{app_js}
</script>
"""

    with open("preview_bundle.html", "w", encoding="utf-8") as f:
        f.write(bundle)
    print(f"wrote preview_bundle.html ({len(bundle):,} bytes)")


if __name__ == "__main__":
    main()
