import { useEffect, useRef, useState } from "react";

import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import poster from "./assets/merry-christmas-mr-lawrence-poster.png";

const chapters = [
  {
    number: "一",
    eyebrow: "The opening",
    title: "The first note simply appears.",
    body: "No grand entrance. Just a small phrase with enough silence around it to make you stop what you are doing.",
  },
  {
    number: "二",
    eyebrow: "The return",
    title: "We hear it again, but differently.",
    body: "The melody comes back carrying more weight. Repetition turns it into something remembered rather than repeated.",
  },
  {
    number: "三",
    eyebrow: "What it holds",
    title: "Warmth and sorrow share the room.",
    body: "That contradiction is what stays with me. The piece never asks us to choose one feeling over the other.",
  },
  {
    number: "四",
    eyebrow: "After the film",
    title: "The music found a life of its own.",
    body: "Written in 1983, rearranged many times since. Each version changes the frame, but the feeling remains intact.",
  },
];

const notes = [
  { x: 1, y: 32 },
  { x: 14, y: 4 },
  { x: 27, y: 19 },
  { x: 40, y: -11 },
  { x: 53, y: 4 },
  { x: 66, y: -25 },
  { x: 79, y: -10 },
  { x: 92, y: 19 },
];

type ChapterProps = {
  body: string;
  eyebrow: string;
  index: number;
  number: string;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  title: string;
};

function StoryChapter({
  body,
  eyebrow,
  index,
  number,
  progress,
  reduceMotion,
  title,
}: ChapterProps) {
  const start = index * 0.205 + 0.075;
  const opacity = useTransform(
    progress,
    [start, start + 0.05, start + 0.145, start + 0.19],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, start + 0.05, start + 0.19],
    [18, 0, -12],
  );

  return (
    <motion.article
      className={`chapter chapter-${index + 1}`}
      style={reduceMotion ? undefined : { opacity, y }}
    >
      <span className="chapter-number">{number}</span>
      <div>
        <p className="chapter-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="chapter-body">{body}</p>
      </div>
    </motion.article>
  );
}

function ScoreNote({
  index,
  progress,
  x,
  y,
}: {
  index: number;
  progress: MotionValue<number>;
  x: number;
  y: number;
}) {
  const start = 0.11 + index * 0.035;
  const opacity = useTransform(progress, [start, start + 0.055], [0, 1]);
  const noteY = useTransform(progress, [start, start + 0.06], [12, 0]);

  return (
    <motion.div
      className={`note note-${index + 1}`}
      style={{
        left: `${x}%`,
        top: `calc(50% + ${y}px)`,
        opacity,
        y: noteY,
      }}
    >
      <span />
    </motion.div>
  );
}

function SoundPlayer() {
  const playerRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isExpanded || !hasStarted) return;
    const timeout = window.setTimeout(() => setIsExpanded(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;

    const minimizeOnOutsideClick = (event: PointerEvent) => {
      if (!playerRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    const minimizeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
    };

    document.addEventListener("pointerdown", minimizeOnOutsideClick);
    document.addEventListener("keydown", minimizeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", minimizeOnOutsideClick);
      document.removeEventListener("keydown", minimizeOnEscape);
    };
  }, [isExpanded]);

  const startMusic = () => {
    setHasStarted(true);
    setIsExpanded(true);
  };

  const stopMusic = () => {
    setHasStarted(false);
    setIsExpanded(false);
  };

  return (
    <aside
      ref={playerRef}
      className={`sound-player ${isExpanded ? "is-open" : ""} ${hasStarted ? "has-started" : ""}`}
      aria-label="Music player"
    >
      {isExpanded ? (
        <>
          <div className="sound-heading">
            <div>
              <span>Now playing</span>
              <strong>Merry Christmas, Mr. Lawrence</strong>
            </div>
            <div className="player-actions">
              <button type="button" onClick={() => setIsExpanded(false)}>
                Minimize
              </button>
              <button
                className="stop-button"
                type="button"
                onClick={stopMusic}
                aria-label="Stop music"
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          className="listen-button"
          type="button"
          onClick={hasStarted ? () => setIsExpanded(true) : startMusic}
        >
          <span className="sound-art">
            <img src={poster} alt="" />
            <i aria-hidden="true" />
          </span>
          <span>
            <small>{hasStarted ? "Now playing" : "Original score"}</small>
            {hasStarted ? "Open controls" : "Play the music"}
          </span>
        </button>
      )}
      {hasStarted && (
        <iframe
          className={isExpanded ? "" : "player-minimized"}
          src="https://www.youtube.com/embed/LGs_vGt0MY8?autoplay=1&rel=0&playsinline=1"
          title="Merry Christmas, Mr. Lawrence by Ryuichi Sakamoto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </aside>
  );
}

function App() {
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const openingOpacity = useTransform(
    scrollYProgress,
    [0, 0.065, 0.11],
    [1, 1, 0],
  );
  const openingY = useTransform(scrollYProgress, [0, 0.11], [0, -24]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.36, 0.62, 0.86, 1],
    ["#0a4147", "#0a4147", "#072f37", "#0d3942", "#19576a", "#0a353b"],
  );
  const foreground = useTransform(
    scrollYProgress,
    [0, 0.14, 0.3, 0.82, 0.94, 1],
    ["#a9bdb7", "#a9bdb7", "#bfd0ca", "#bfd0ca", "#b7c8c1", "#b7c8c1"],
  );
  const scoreX = useTransform(scrollYProgress, [0.11, 0.86], ["-8%", "7%"]);
  const scoreOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.15, 0.82, 0.91],
    [0, 0.7, 0.7, 0],
  );
  const scoreScale = useTransform(scrollYProgress, [0.1, 0.88], [0.92, 1.04]);
  const discScale = useTransform(scrollYProgress, [0, 0.72], [1, 1.7]);
  const discOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.66, 0.86],
    [1, 0, 0, 0.28],
  );
  const verticalTitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [0.45, 0],
  );

  return (
    <main>
      <section
        ref={storyRef}
        className="story"
        aria-label="The story of Merry Christmas, Mr. Lawrence"
      >
        <motion.div
          className="stage"
          style={{
            backgroundColor: reduceMotion ? "#16212a" : backgroundColor,
            color: reduceMotion ? "#bfd0ca" : foreground,
          }}
        >
          <header className="topbar">
            <SoundPlayer />
            <div className="progress-wrap" aria-hidden="true">
              <span>01</span>
              <span className="progress-track">
                <motion.span
                  className="progress-fill"
                  style={{ scaleX: scrollYProgress }}
                />
              </span>
              <span>04</span>
            </div>
          </header>

          <motion.div
            id="top"
            className="opening"
            style={
              reduceMotion
                ? undefined
                : { opacity: openingOpacity, y: openingY }
            }
          >
            <motion.div
              className="red-disc"
              style={
                reduceMotion
                  ? undefined
                  : { opacity: discOpacity, scale: discScale }
              }
            />
            <motion.p
              className="vertical-title"
              style={{ opacity: verticalTitleOpacity }}
            >
              戦場のメリークリスマス
            </motion.p>
            <p className="issue">
              A personal listening note <span>№ 01</span>
            </p>
            <h1>
              Merry Christmas,
              <br />
              <em>Mr. Lawrence</em>
            </h1>
            <div className="opening-bottom">
              <p>
                <strong>Ryuichi Sakamoto</strong>
                <br />
                Music for the 1983 film
              </p>
              <p className="opening-note">
                Four minutes of distance,
                <br />
                tenderness, and return.
              </p>
              <span className="scroll-prompt">
                Scroll <i>↓</i>
              </span>
            </div>
          </motion.div>

          <div className="world" aria-hidden="true">
            <motion.div
              className="red-disc red-disc-later"
              style={
                reduceMotion
                  ? undefined
                  : { opacity: discOpacity, scale: discScale }
              }
            />
            <motion.div
              className="score"
              style={
                reduceMotion
                  ? { opacity: 0.7 }
                  : { x: scoreX, opacity: scoreOpacity, scale: scoreScale }
              }
            >
              <div className="staff">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              {notes.map((note, index) => (
                <ScoreNote
                  index={index}
                  key={index}
                  progress={scrollYProgress}
                  x={note.x}
                  y={note.y}
                />
              ))}
              <span className="measure measure-one" />
              <span className="measure measure-two" />
            </motion.div>
          </div>

          <div className="chapter-stack">
            {chapters.map((chapter, index) => (
              <StoryChapter
                {...chapter}
                index={index}
                key={chapter.number}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <div className="coordinates" aria-hidden="true">
            <span>RYUICHI SAKAMOTO</span>
            <span>PIANO / SYNTHESIZER</span>
          </div>
        </motion.div>
      </section>

      <section className="ending">
        <p className="ending-index">04 / CODA</p>
        <h2>
          It sounds like remembering
          <br />
          something <em>while it happens.</em>
        </h2>
        <p className="ending-copy">
          That is why I keep returning to it—not because it resolves the
          feeling, but because it lets the feeling remain.
        </p>
        <a href="#top" className="replay">
          Listen again <span>↗</span>
        </a>
        <footer>
          <span>An appreciation of Ryuichi Sakamoto</span>
          <span>戦場のメリークリスマス</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
