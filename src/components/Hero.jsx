import { useRef, useState } from "react";
import {
  ChevronDown,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import CherryBlossomParticles from "./CherryBlossomParticles";
import { images } from "../data/memories";
import useReducedMotion from "../hooks/useReducedMotion";

const VIDEO_SRC = "/video/pancreas-intro.mp4";
const SPEEDS = [0.5, 1, 1.5];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false);

  // Video state
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Controls state
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // ---- Helpers ----
  const scrollToStory = () => {
    document.querySelector("#story")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // ---- Video play/pause ----
  const startVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      setVideoFinished(false);
      setVideoPlaying(true);

      await video.play();
    } catch (error) {
      console.error("Unable to play intro video:", error);
      setVideoPlaying(false);
      setVideoFailed(true);
    }
  };

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        setVideoPlaying(true);
        await video.play();
      } catch (error) {
        console.error("Unable to resume video:", error);
      }
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setVideoPlaying(false);
    setVideoFinished(true);

    const video = videoRef.current;
    if (video) video.currentTime = 0;

    setProgress(0);
    setCurrentTime(0);

    // Keep videoFinished true briefly so the video can fade out
    // before the hero image returns.
    window.setTimeout(() => {
      setVideoFinished(false);
    }, 1200);
  };

  // ---- Controls ----
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = (event) => {
    setDuration(event.currentTarget.duration);
    event.currentTarget.volume = volume;
    event.currentTarget.muted = muted;
  };

  const seek = (event) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const next = Number(event.target.value);
    video.currentTime = (next / 100) * video.duration;
    setProgress(next);
    setCurrentTime(video.currentTime);
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds),
    );
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const changeVolume = (event) => {
    const video = videoRef.current;
    if (!video) return;
    const next = Number(event.target.value);
    video.volume = next;
    video.muted = next === 0;
    setVolume(next);
    setMuted(video.muted);
  };

  const changeSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    video.playbackRate = next;
    setSpeed(next);
  };

  const toggleFullscreen = async () => {
    const node = sectionRef.current;
    if (!node) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (node.requestFullscreen) {
        await node.requestFullscreen();
      }
    } catch {
      // Fullscreen is an enhancement; ignore failures silently.
    }
  };

  const videoVisible = videoPlaying || videoFinished;

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-bg"
    >
      {/* =========================================================
          HERO IMAGE (fades out when video is visible)
      ========================================================= */}

      <div
        aria-hidden="true"
        className={`
          absolute inset-0
          transition-all
          duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${videoVisible ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"}
        `}
      >
        {!imageFailed ? (
          <img
            src={images.hero}
            alt=""
            onError={() => setImageFailed(true)}
            loading="eager"
            fetchPriority="high"
            className="
              h-full w-full scale-105 object-cover opacity-60
              [animation:hero-drift_60s_linear_infinite_alternate]
              motion-reduce:animate-none
            "
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 50% 20%, rgba(232,169,184,0.20), transparent 65%),
                radial-gradient(ellipse 60% 45% at 15% 80%, rgba(113,133,156,0.16), transparent 65%),
                linear-gradient(180deg, #191a20 0%, #121317 50%, #0b0c0e 100%)
              `,
            }}
          />
        )}

        {/* Hero image overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/30 to-bg/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(232,169,184,0.08),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('/images/noise.png')]" />
      </div>

      {/* =========================================================
          INLINE VIDEO (plays inside the hero)
      ========================================================= */}

      <div
        aria-hidden={!videoVisible}
        className={`
          absolute inset-0 overflow-hidden
          transition-all duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${videoVisible ? "scale-100 opacity-100" : "scale-[1.025] opacity-0 pointer-events-none"}
        `}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted={muted}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => {
            if (
              videoRef.current &&
              videoRef.current.currentTime <
                videoRef.current.duration - 0.2
            ) {
              setVideoPlaying(false);
            }
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={() => setVideoFailed(true)}
          className="h-full w-full object-cover"
        />

        {/* Cinematic video overlays (lighter than the image overlays
            so the video stays visible) */}
        <div className="pointer-events-none absolute inset-0 bg-black/15" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
      </div>

      {/* =========================================================
          CHERRY BLOSSOMS (hidden while video is playing)
      ========================================================= */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-0 z-[5]
          transition-opacity duration-1000
          ${videoVisible ? "opacity-0" : "opacity-100"}
        `}
      >
        <CherryBlossomParticles density="normal" />
      </div>

      {/* =========================================================
          HERO TEXT (fades out when video is visible)
      ========================================================= */}

      <div
        className={`
          relative z-10 mx-auto flex w-full max-w-4xl flex-col
          items-center px-6 pb-20 pt-24 text-center
          sm:px-8 sm:pb-24
          transition-all duration-[900ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            videoVisible
              ? "pointer-events-none translate-y-[-16px] scale-[0.98] opacity-0 blur-[2px]"
              : "translate-y-0 scale-100 opacity-100 blur-0"
          }
        `}
      >
        {/* Small heading */}
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.38em] text-blue sm:text-xs sm:tracking-[0.45em]">
          A Tribute to a Story About Living
        </p>

        {/* Main title */}
        <h1
          id="hero-title"
          className="
            max-w-3xl font-serif-jp text-balance
            text-[2.7rem] font-medium leading-[1.08]
            tracking-[-0.02em] text-cream
            drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]
            sm:text-6xl md:text-7xl lg:text-[5.25rem]
          "
        >
          I Want to Eat
          <br />
          Your Pancreas
        </h1>

        {/* Japanese title */}
        <p className="mt-5 font-serif-jp text-base tracking-[0.20em] text-warm-white/55 sm:text-xl">
          君の膵臓をたべたい
        </p>

        {/* Divider */}
        <div aria-hidden="true" className="mt-7 flex items-center gap-3">
          <span className="h-px w-10 bg-warm-white/20 sm:w-16" />
          <span className="h-1 w-1 rotate-45 bg-gold/70" />
          <span className="h-px w-10 bg-warm-white/20 sm:w-16" />
        </div>

        {/* Description */}
        <p className="mt-7 max-w-lg text-balance text-sm leading-7 text-warm-white/65 sm:text-base sm:leading-8">
          A story about two people who discovered the meaning of living
          through one another.
        </p>

        {/* Play button */}
        <div className="mt-9">
          <button
            type="button"
            onClick={videoPlaying ? toggleVideo : startVideo}
            aria-label={videoPlaying ? "Pause intro video" : "Play intro video"}
            className="
              group relative flex min-h-12 min-w-12 items-center justify-center
              rounded-full border border-cream/45 bg-bg/35 p-5 text-cream
              shadow-[0_0_35px_rgba(215,181,109,0.10)] backdrop-blur-md
              transition-all duration-700
              hover:scale-105 hover:border-gold/80
              hover:shadow-[0_0_45px_rgba(232,169,184,0.18)]
              focus-visible:ring-1 focus-visible:ring-gold/80
              sm:h-16 sm:w-16
            "
          >
            <span
              aria-hidden="true"
              className="absolute inset-1 rounded-full border border-warm-white/10 transition-all duration-700 group-hover:inset-0"
            />
            {videoPlaying ? (
              <Pause
                className="relative h-5 w-5 text-cream sm:h-6 sm:w-6"
                strokeWidth={1.1}
              />
            ) : (
              <Play
                className="relative ml-0.5 h-5 w-5 text-cream transition-transform duration-500 group-hover:scale-110 group-hover:text-gold sm:h-6 sm:w-6"
                fill="currentColor"
                strokeWidth={1.1}
              />
            )}
          </button>

          <p className="mt-3 text-[9px] uppercase tracking-[0.38em] text-warm-white/45">
            {videoPlaying ? "Pause Memory" : "Play Intro"}
          </p>
        </div>
      </div>

      {/* =========================================================
          INLINE VIDEO CONTROL BAR
          Appears only while the video is visible, anchored to
          the bottom of the hero.
      ========================================================= */}

      <div
        className={`
          absolute bottom-0 left-0 right-0 z-40
          border-t border-white/10 bg-black/45
          px-4 py-3 backdrop-blur-md
          transition-all duration-700
          ${
            videoVisible
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-4 opacity-0 pointer-events-none"
          }
        `}
      >
        {videoFailed ? (
          <div className="flex items-center justify-center py-2">
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/50">
              Intro video unavailable
            </p>
          </div>
        ) : (
          <>
            {/* Progress row */}
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-white/60">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={seek}
                aria-label="Video progress"
                className="
                  h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full
                  bg-white/20 accent-[#D7B56D]
                  [&::-webkit-slider-thumb]:h-3.5
                  [&::-webkit-slider-thumb]:w-3.5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#D7B56D]
                  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(215,181,109,0.5)]
                  [&::-moz-range-thumb]:h-3.5
                  [&::-moz-range-thumb]:w-3.5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:bg-[#D7B56D]
                "
              />

              <span className="w-10 shrink-0 font-mono text-[11px] tabular-nums text-white/60">
                {formatTime(duration)}
              </span>
            </div>

            {/* Button row */}
            <div className="mt-2 flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => skip(-10)}
                aria-label="Back 10 seconds"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.4} />
              </button>

              <button
                type="button"
                onClick={toggleVideo}
                aria-label={videoPlaying ? "Pause video" : "Play video"}
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-white/10 text-white transition-all
                  hover:bg-white/20 hover:text-gold
                  focus-visible:ring-1 focus-visible:ring-gold
                "
              >
                {videoPlaying ? (
                  <Pause className="h-4 w-4" strokeWidth={1.4} />
                ) : (
                  <Play
                    className="ml-0.5 h-4 w-4"
                    fill="currentColor"
                    strokeWidth={1.1}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => skip(10)}
                aria-label="Forward 10 seconds"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
              >
                <RotateCw className="h-4 w-4" strokeWidth={1.4} />
              </button>

              {/* Volume cluster */}
              <div className="ml-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" strokeWidth={1.4} />
                  ) : (
                    <Volume2 className="h-4 w-4" strokeWidth={1.4} />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                  aria-label="Volume"
                  className="
                    hidden h-1 w-20 cursor-pointer appearance-none rounded-full
                    bg-white/20 accent-[#D7B56D]
                    sm:block
                    [&::-webkit-slider-thumb]:h-2.5
                    [&::-webkit-slider-thumb]:w-2.5
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#D7B56D]
                    [&::-moz-range-thumb]:h-2.5
                    [&::-moz-range-thumb]:w-2.5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:bg-[#D7B56D]
                  "
                />
              </div>

              {/* Speed */}
              <button
                type="button"
                onClick={changeSpeed}
                aria-label={`Playback speed ${speed}x`}
                className="ml-1 flex h-9 min-w-[44px] items-center justify-center rounded-full px-2 text-[11px] font-medium tracking-wider text-white/80 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
              >
                {speed}×
              </button>

              <div className="flex-1" />

              <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/40 sm:block">
                Intro
              </span>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" strokeWidth={1.4} />
                ) : (
                  <Maximize className="h-4 w-4" strokeWidth={1.4} />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* =========================================================
          SCROLL BUTTON (hidden while video is visible)
      ========================================================= */}

      <button
        type="button"
        onClick={scrollToStory}
        aria-label="Scroll to the story"
        className={`
          group absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2
          flex-col items-center gap-3 rounded-full px-4 py-2
          outline-none transition-all duration-700 sm:bottom-9
          ${videoVisible ? "pointer-events-none opacity-0" : "opacity-100"}
        `}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-warm-white/40 transition-colors duration-500 group-hover:text-gold">
          Scroll to remember
        </span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-warm-white/20 p-1 transition-all duration-500 group-hover:border-gold/50">
          <ChevronDown
            className="h-3.5 w-3.5 text-warm-white/45 transition-all duration-500 group-hover:translate-y-1 group-hover:text-gold"
            strokeWidth={1.3}
          />
        </span>
      </button>
    </section>
  );
}