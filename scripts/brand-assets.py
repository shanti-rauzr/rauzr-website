"""Generate favicon, apple touch icon, and Open Graph image. Run once; commit the files."""

from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/workspace/public")
FONT = "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"
FONT_REG = "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"
TEAL = (15, 118, 110, 255)
INK = (11, 18, 32, 255)


def r_path() -> str:
    font = TTFont(FONT)
    cmap = font.getBestCmap()
    name = cmap[ord("R")]
    glyph_set = font.getGlyphSet()
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(pen)
    g = font["glyf"][name]
    x_min, y_min, x_max, y_max = g.xMin, g.yMin, g.xMax, g.yMax
    target_h = 16.5
    scale = target_h / (y_max - y_min)
    mid_x = (x_min + x_max) / 2
    mid_y = (y_min + y_max) / 2
    # Optical center, slightly high.
    cx, cy = 16.1, 16.6
    transform = f"translate({cx} {cy}) scale({scale:.5f} {-scale:.5f}) translate({-mid_x:.2f} {-mid_y:.2f})"
    return f'<path fill="#ffffff" transform="{transform}" d="{pen.getCommands()}"/>'


def write_svg() -> None:
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0F766E"/>
  {r_path()}
</svg>
'''
    (ROOT / "favicon.svg").write_text(svg)


def raster_with_pil() -> None:
    """Pillow rendering of the same mark, used for ico and as fallback."""

    def mark(size: int) -> Image.Image:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        radius = int(size * 0.25)
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=TEAL)
        font = ImageFont.truetype(FONT, int(size * 0.56))
        text = "R"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        x = (size - tw) / 2 - bbox[0]
        y = (size - th) / 2 - bbox[1] - size * 0.03
        draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
        return img

    icon32 = mark(32)
    icon16 = mark(16)
    icon180 = mark(180)
    icon32.save(ROOT / "favicon-32.png")
    icon180.save(ROOT / "apple-touch-icon.png")
    icon32.save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32)])
    # Also store 16 inside the ico via a second save that includes both.
    icon32.save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32)],
        append_images=[icon16],
    )


def og() -> None:
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), (11, 18, 32))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 12, h), fill=(15, 118, 110))

    mark = Image.open(ROOT / "apple-touch-icon.png").convert("RGBA").resize((72, 72), Image.Resampling.LANCZOS)
    img.paste(mark, (76, 68), mark)

    brand = ImageFont.truetype(FONT, 36)
    small = ImageFont.truetype(FONT_REG, 22)
    head = ImageFont.truetype(FONT, 68)
    sub = ImageFont.truetype(FONT_REG, 30)
    fine = ImageFont.truetype(FONT_REG, 24)

    draw.text((168, 78), "Rauzr", font=brand, fill=(255, 255, 255))
    draw.text((168, 118), "rauzr.ai", font=small, fill=(176, 190, 202))

    draw.text((76, 250), "Agents prepare the dossier.", font=head, fill=(255, 255, 255))
    draw.text((76, 338), "Humans file it.", font=head, fill=(255, 255, 255))
    draw.rectangle((76, 450, 148, 455), fill=(15, 118, 110))
    draw.text((76, 478), "Dossiq  ·  Decision support for CTD Module 3", font=sub, fill=(214, 224, 230))
    draw.text((76, 548), "US CBE-30   ·   EU Type IB   ·   Humans file", font=fine, fill=(168, 184, 196))
    img.save(ROOT / "og.png", optimize=True)


if __name__ == "__main__":
    write_svg()
    raster_with_pil()
    og()
    print("wrote", ROOT)
