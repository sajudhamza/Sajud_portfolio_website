# Sajud Hamza — Portfolio Website

Immersive personal portfolio for www.sajudhamza.com. Plain HTML/JS — no build step,
no npm install. Any static file server runs it.

## Run locally

```
npx serve            # or: python3 -m http.server 8000
```
Open the printed localhost URL. Do NOT open index.html directly from the file
manager — the browser blocks local file loads; it must go through a server.

## File map

| File | What it is |
|---|---|
| `index.html` | The whole site: markup, styles (inline), and the app logic class at the bottom in `<script data-dc-script>` |
| `support.js` | Runtime that renders index.html's template (loads React from CDN). Don't edit |
| `hero3d.js` | All three.js scenes: interactive hero (drag/click nodes) + per-page ambient variants (`waves`, `rings`, `shapes`, `drift`, `rain`) |
| `tilt-card.js` | `<tilt-card>` hover-tilt wrapper used on cards |
| `sfx.js` | Web Audio ambients + page-transition cues (SOUND ON/OFF in the nav) |
| `data/portfolioData.js` | **All content lives here**: publications, articles, media, judging, patents, memberships, testimonials, protected files, trivia questions |
| `assets/` | Profile photo, membership logos, testimonial photos |

## Sound

Each chapter has its own ambient bed (home pulse, research waves, recognition rings, patents shapes, testimonials drift, vault rain) plus a short transition cue when you change pages. Sound starts **off** until the visitor taps **SOUND ON** (or any click unlocks audio for the browser). Preference is stored in `localStorage`.

## Common edits

**Add a publication / article / judging role / media feature / vault file:**
edit the matching array in `data/portfolioData.js` — the site picks it up automatically.
Counts (stats bar, chips) update on their own.

**Change bio, hero copy, education, skills:** search the text in `index.html` and edit
in place. Skills/education are in the logic class near the bottom (`skillGroups`) and
the EDUCATION section markup.

**Change the vault password:** in `index.html`, search `Sajud@1234` in the logic class.
Note: it's client-side (visible to anyone reading the source), same as the original site.

**Page accent colors:** each page ("chapter") has a hard-coded accent —
amber `#e8b64c` (home/research), coral `#e8836b` (recognition), teal `#6bc9b4`
(patents), mauve `#c39ee8` (testimonials), ember `#e0755f` (vault). Search-and-replace
a hex to retheme a chapter; also update it in the `_go()` transition map in the logic class.

**3D scenes:** particle counts, speeds, and shapes are all in `hero3d.js`, one
`variant === '...'` block per page.

**SEO:** title/description/OG tags and the JSON-LD Person schema are at the top of
`index.html` inside `<helmet>`.

## Deploying

Links to certificates, testimonial letters, and vault documents point to root paths
(`/membercert/...`, `/protected_files/...`, `/Testimonial/...`, `/patents/...`).
They 404 locally — they resolve once deployed alongside those folders from the
repo's `public/` directory. See the separate deploy package's README for repo steps.
