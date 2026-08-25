"""
Generate PWA icons (icon-192.png, icon-512.png) from the UCT logo.

Renders brand/uct-logo.pdf, crops it to its content bounds, and
centers it on a white rounded-square tile.

Requires: pip install pymupdf pillow
"""

import fitz
from PIL import Image, ImageDraw

LOGO_PDF = "brand/uct-logo.pdf"
RENDER_ZOOM = 4  # supersample the PDF for a crisp source bitmap


def load_logo():
    doc = fitz.open(LOGO_PDF)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(RENDER_ZOOM, RENDER_ZOOM), alpha=True)
    img = Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)
    return img.crop(img.getbbox())


def make_icon(size, path, logo):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size, size], radius=size * 0.22, fill=(255, 255, 255, 255))

    max_w = size * 0.68
    max_h = size * 0.68
    scale = min(max_w / logo.width, max_h / logo.height)
    resized = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.LANCZOS)
    pos = ((size - resized.width) // 2, (size - resized.height) // 2)
    img.alpha_composite(resized, pos)
    img.save(path, "PNG")


logo = load_logo()
make_icon(512, "icons/icon-512.png", logo)
make_icon(192, "icons/icon-192.png", logo)
print("done")
