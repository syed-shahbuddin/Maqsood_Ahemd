# Maqsood Ahmed — Portfolio

Dark single-page portfolio built with **React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Edit the content

Everything personal lives in one file: `src/data/site.ts`

- `site` — name, initials, location, email, phone, LinkedIn URL (**replace the placeholder**), rotating roles, hero copy, marquee text, HLS video URL
- `projects` — the four bento cards (title, tag, status, bullets, image, grid span)
- `journal` — the four "Recent thoughts" pills
- `explorations` — the six parallax gallery cards
- `stats`, `skills`, `education`, `certifications`, `languages` — used on the home page and the `/resume` page

Images are Unsplash URLs — swap in your own files under `public/` any time.
`public/Maqsood-Ahmed-Resume.pdf` is served by the "Download PDF" button on `/resume`.

## Structure

```
src/
  App.tsx                  routes + page transitions + hash scrolling
  pages/Index.tsx          home: loader → hero → work → journal → explorations → stats → contact
  pages/Resume.tsx         full resume page
  components/
    LoadingScreen.tsx      000→100 counter, rotating words, progress bar
    Navbar.tsx             floating pill nav, active-section tracking
    Hero.tsx               HLS video background, GSAP entrance, rotating role
    SelectedWorks.tsx      bento grid + project detail modal
    Journal.tsx            horizontal entry pills
    Explorations.tsx       pinned centre + GSAP parallax columns + lightbox
    Stats.tsx              count-up stats
    Contact.tsx            flipped video, GSAP marquee, CTA, footer bar
    ui/GradientButton.tsx  pill button with accent-gradient hover ring
    ui/SectionHeader.tsx   eyebrow + heading + subtext pattern
    ui/HlsVideo.tsx        hls.js wrapper with native-HLS fallback
  index.css                design tokens, fonts, keyframes, utilities
tailwind.config.js         custom colors, fonts, animations
```

## Deploy

`npm run build` and upload `dist/` to Vercel, Netlify, Cloudflare Pages or GitHub Pages.
Because the site uses client-side routing, configure a SPA fallback (all routes → `index.html`).
On Vercel/Netlify this is automatic for Vite projects.
