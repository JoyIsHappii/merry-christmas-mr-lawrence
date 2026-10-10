# Merry Christmas, Mr. Lawrence — A Scroll Story

- **Live site:** https://merry-christmasmr-lawrence-ncb3rlc3f-joyishappii.vercel.app
- **Repo:** https://github.com/Cornerstone-CICCC/m1-0126-wd301-wd302-story-telling-website-joyishappii
- **Author:** Joy ([@JoyIsHappii](https://github.com/JoyIsHappii))
- **Story in one sentence:** A personal listening note on Ryuichi Sakamoto's *Merry Christmas, Mr. Lawrence*, following the piece from its first quiet note to the life it found after the 1983 film.

---

## About

This is a one-page scroll story built for the WD-302 assignment. As you scroll, a musical staff drifts across a pinned stage, notes appear one by one, and four short chapters tell how the melody opens, returns, holds warmth and sorrow together, and outlived the film it was written for. It ends on a short coda.

You can also press **Play the music** in the top corner to listen to the original piece while you read.

## The four chapters

| | Chapter | Idea |
|---|---|---|
| 一 | The opening | The first note simply appears. |
| 二 | The return | We hear it again, but differently. |
| 三 | What it holds | Warmth and sorrow share the room. |
| 四 | After the film | The music found a life of its own. |

## How the animation tells the story

- **Pinned stage.** The whole story plays on one sticky stage. The reader stays in place while the music "plays out" around them.
- **Notes appear in order.** Each note on the staff fades and rises in at its own point in the scroll, like a melody being written as you listen.
- **Color follows the mood.** The background slowly shifts between deep teals as the chapters change, so the feeling changes without anything jumping.
- **Graceful exits.** The opening title, the red disc and each chapter fade and drift away instead of blinking out.
- **Progress bar.** A thin bar at the top tracks where you are, from 01 to 04.
- **Reduced motion.** If your device asks for reduced motion, the scroll animations are turned off and the text is shown plainly.

## Built with

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Motion](https://motion.dev) (`useScroll`, `useTransform`, `useReducedMotion`)
- Deployed on [Vercel](https://vercel.com)

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To make a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── App.tsx      # the story: chapters, score, notes, music player
├── App.css      # layout and styling for the stage and chapters
├── index.css    # global styles
├── main.tsx     # React entry point
└── assets/      # film poster used in the music player
```

## Credits

- Music: *Merry Christmas, Mr. Lawrence* by Ryuichi Sakamoto, from the 1983 film *戦場のメリークリスマス*. Played through an embedded YouTube video.
- This is a non-commercial student project made as an appreciation of Sakamoto's work. All rights to the music and film belong to their owners.
