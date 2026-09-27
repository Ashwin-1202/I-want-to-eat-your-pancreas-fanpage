# I Want to Eat Your Pancreas — A Tribute

A cinematic, diary-like tribute site inspired by the themes of *I Want to
Eat Your Pancreas* (君の膵臓をたべたい). Built as a frontend-only React +
Vite + Tailwind CSS project — no backend, no database.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Adding real images (optional)

Every image is optional — every section falls back to a hand-tuned
gradient if a file is missing, so the site never breaks. To use your own
visuals, drop files into `public/images/` with these exact names:

```
public/images/hero.jpg
public/images/school.jpg
public/images/hospital.jpg
public/images/train.jpg
public/images/city.jpg
public/images/sky.jpg
public/images/fireworks.jpg
public/images/sunset.jpg
```

No copyrighted film stills are included or required — original
atmospheric photography or illustration works best.

## Adding ambient audio (optional)

Drop a quiet ambient/lo-fi loop at `public/audio/ambient.mp3`. The
floating note button in the bottom-right corner lets the visitor opt in;
nothing autoplays, and the button still works with no crash if the file
is absent.

## Project structure

```
src/
├── components/       reusable section + UI components
├── data/memories.js  all copy and content, separate from presentation
├── hooks/            useScrollReveal, useReducedMotion
├── App.jsx           assembles the page
└── index.css         Tailwind v4 theme tokens + custom animations
```

## Notes on content

All diary entries, letters, and memory descriptions are original tribute
writing inspired by the film's themes — no dialogue or text is
reproduced from the movie.

## Adding the optional cinematic intro video

The hero keeps the original image as its default visual. To enable the intro experience,
place your own legally usable video at:

```
public/video/pancreas-intro.mp4
```

The video is not bundled with this project. It is only loaded after the visitor opens
the intro player, and the player falls back gracefully if the file is missing.
"# I-want-to-eat-your-pancreas-fanpage" 
