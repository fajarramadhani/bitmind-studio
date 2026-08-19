# BITMIND STUDIO

## Brand Positioning

**Web & Digital Product Studio**

BITMIND STUDIO is positioned as a professional studio for businesses that need clearer, more credible, and more useful digital experiences.

## Tagline

> We design and build digital experiences that work.

## Logo

The official brand mark is a white BITMIND monogram inside a rounded blue square.

Source and generated assets:

```text
public/brand/
├── bitmind-icon-source.png
├── bitmind-icon.png
├── icon-32.png
├── icon-48.png
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
└── og-default.png
```

- `bitmind-icon-source.png` preserves the supplied 500×500 raster source.
- `bitmind-icon.png` is a canvas-cropped 512×512 usage asset.
- Cropping removes external whitespace only. The logo proportions, colors, and monogram are unchanged.
- Use `object-contain`. Never stretch, crop into the mark, add gradients, glow, heavy shadows, or redraw the monogram.

## Colors

### Brand

```text
Primary Blue       #0065FF
Primary Hover      #0057E6
Primary Dark       #004BBF
Primary Soft       #E8F1FF
Primary Foreground #FFFFFF
```

The primary blue was sampled from the dominant pixels in the supplied official logo. The darker variant is used for small accent text and focus states where stronger contrast is required.

### Neutral Palette

```text
Background         #F6F6F3
Surface            #FFFFFF
Foreground         #111111
Muted Foreground   #707070
Border             #E4E4E1
```

The interface should remain predominantly neutral. Brand blue is reserved for primary actions, focus states, selected states, small labels, and controlled emphasis.

## Typography

The website uses **Geist** through `next/font`.

- Wordmarks use simple Geist text beside the official icon.
- Do not create a custom or imitation logo typeface.
- Display typography remains tight, clear, and editorial.

## Usage

- Navbar icon: 36px
- Footer icon: 42px
- Icon and adjacent wordmark should be exposed to assistive technology as one brand link.
- When the icon is adjacent to the wordmark, use an empty image alt and label the parent link `BITMIND STUDIO` to avoid duplicate announcements.
- Current production candidate is controlled by `siteConfig.url` or `NEXT_PUBLIC_SITE_URL`.
