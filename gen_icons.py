from PIL import Image, ImageDraw

def make_icon(size, path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background: rounded square, UCAP red
    pad = 0
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=size * 0.22, fill=(208, 52, 44, 255))

    # White cross (simple, high-contrast, reads at small sizes)
    cx, cy = size / 2, size / 2
    bar_w = size * 0.16
    bar_len = size * 0.5
    # vertical bar
    d.rounded_rectangle(
        [cx - bar_w / 2, cy - bar_len / 2, cx + bar_w / 2, cy + bar_len / 2],
        radius=bar_w * 0.3, fill=(255, 255, 255, 255)
    )
    # horizontal bar
    d.rounded_rectangle(
        [cx - bar_len / 2, cy - bar_w / 2, cx + bar_len / 2, cy + bar_w / 2],
        radius=bar_w * 0.3, fill=(255, 255, 255, 255)
    )

    img.save(path, "PNG")

make_icon(192, "icons/icon-192.png")
make_icon(512, "icons/icon-512.png")
print("done")
