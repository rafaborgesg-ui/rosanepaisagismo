import { useEffect, useState } from "react";

const PRELOAD_DURATION = 4700;
const FADE_DURATION = 720;
const PRELOADER_RUNTIME_KEY = "__rbpPreloaderPlayed";

export default function SitePreloader() {
  const [hasAlreadyPlayed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window[PRELOADER_RUNTIME_KEY] === true;
  });
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(!hasAlreadyPlayed);

  useEffect(() => {
    if (hasAlreadyPlayed) return undefined;

    let locked = true;
    let finishTimer;
    let hideTimer;
    let fallbackTimer;

    const root = document.documentElement;
    const body = document.body;

    const scrollTop = () => {
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      body.scrollTop = 0;
    };

    const restoreDestination = () => {
      const hash = window.location.hash?.slice(1);
      if (!hash) {
        scrollTop();
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ block: "start" });
      }
    };

    const blockScroll = (event) => {
      if (locked) event.preventDefault();
    };

    const blockKeys = (event) => {
      const blockedKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (locked && blockedKeys.includes(event.keyCode)) {
        event.preventDefault();
      }
    };

    const release = () => {
      locked = false;
      window[PRELOADER_RUNTIME_KEY] = true;
      root.classList.remove("rbp-preloading");
      body.classList.remove("rbp-preloading");
      window.requestAnimationFrame(restoreDestination);
    };

    const finish = () => {
      scrollTop();
      setIsFading(true);
      hideTimer = window.setTimeout(() => {
        setIsVisible(false);
        release();
      }, FADE_DURATION);
    };

    const start = () => {
      if (finishTimer) return;
      finishTimer = window.setTimeout(finish, PRELOAD_DURATION);
    };

    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // Browsers that do not support scrollRestoration can ignore this.
    }

    scrollTop();
    root.classList.add("rbp-preloading");
    body.classList.add("rbp-preloading");
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys, { passive: false });

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
      fallbackTimer = window.setTimeout(start, 1200);
    }

    return () => {
      locked = false;
      window.clearTimeout(finishTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("load", start);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeys);
      root.classList.remove("rbp-preloading");
      body.classList.remove("rbp-preloading");
    };
  }, [hasAlreadyPlayed]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        html.rbp-preloading,
        html.rbp-preloading body {
          height: 100%;
          overflow: hidden !important;
          overscroll-behavior: none;
        }

        html.rbp-preloading body {
          position: fixed;
          inset: 0;
          width: 100%;
        }

        .rbp-preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f7f2;
          opacity: 1;
          pointer-events: auto;
          transition: opacity .68s ease;
        }

        .rbp-preloader-done {
          opacity: 0;
          pointer-events: none;
        }

        .rbp-preloader-inner {
          width: min(260px, 48vw);
        }

        .rbp-preload-mark {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          transform-origin: center;
          animation: rbpMarkDrop 4.7s cubic-bezier(.72, 0, .2, 1) both;
        }

        .rbp-preload-ghost,
        .rbp-preload-trace,
        .rbp-preload-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .rbp-preload-ghost {
          background: #fff;
          -webkit-mask: url("/brand/rosane-logo-mark-white.png") center / contain no-repeat;
          mask: url("/brand/rosane-logo-mark-white.png") center / contain no-repeat;
          opacity: 0;
          filter: drop-shadow(0 0 1px rgba(24, 31, 26, .32));
          animation: rbpGhostReveal 4.7s ease both;
        }

        .rbp-preload-trace {
          opacity: 0;
          background: url("/brand/rosane-logo-mark-trace-sprite.png") 0 0 / 7200% 100% no-repeat;
          filter: drop-shadow(0 0 1px rgba(24, 31, 26, .14));
          animation:
            rbpTraceOpacity 4.7s ease both,
            rbpTraceFrames 3.2s steps(71, end) .22s forwards;
        }

        .rbp-preload-fill {
          background: #858a82;
          -webkit-mask: url("/brand/rosane-logo-mark-white.png") center / contain no-repeat;
          mask: url("/brand/rosane-logo-mark-white.png") center / contain no-repeat;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          animation: rbpGreenFill 4.7s cubic-bezier(.65, 0, .2, 1) both;
        }

        @keyframes rbpGhostReveal {
          0% {
            opacity: .72;
            transform: scale(.985);
            filter: blur(.65px) drop-shadow(0 0 1px rgba(24, 31, 26, .3));
          }
          8% {
            opacity: .9;
            transform: scale(.992);
            filter: blur(.18px) drop-shadow(0 0 1px rgba(24, 31, 26, .36));
          }
          22% {
            opacity: .82;
            transform: scale(1);
            filter: blur(0) drop-shadow(0 0 1px rgba(24, 31, 26, .34));
          }
          54% {
            opacity: .42;
            transform: scale(1);
            filter: blur(0) drop-shadow(0 0 1px rgba(24, 31, 26, .22));
          }
          70%,
          100% {
            opacity: 0;
            transform: scale(1.006);
            filter: blur(.35px) drop-shadow(0 0 1px rgba(24, 31, 26, .12));
          }
        }

        @keyframes rbpTraceFrames {
          0% { background-position: 0 0; }
          100% { background-position: 100% 0; }
        }

        @keyframes rbpTraceOpacity {
          0%,
          8% {
            opacity: 0;
            filter: blur(.8px);
          }
          14% {
            opacity: .48;
            filter: blur(.18px);
          }
          54% {
            opacity: .82;
            filter: blur(0);
          }
          72% {
            opacity: .62;
            filter: blur(0);
          }
          82%,
          100% {
            opacity: 0;
            filter: blur(.28px);
          }
        }

        @keyframes rbpGreenFill {
          0%,
          58% {
            opacity: 0;
            clip-path: inset(0 0 0 0);
            transform: scale(.998);
          }
          68% {
            opacity: .38;
            clip-path: inset(0 0 0 0);
            transform: scale(1);
          }
          80%,
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: scale(1);
          }
        }

        @keyframes rbpMarkDrop {
          0% {
            opacity: 1;
            transform: translate3d(0, -8px, 0) scale(.985);
          }
          76% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          88% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 32px, 0) scale(1.01);
          }
        }
      `}</style>
      <div
        className={`rbp-preloader${isFading ? " rbp-preloader-done" : ""}`}
        aria-label="Carregando Rosane Borges Paisagismo"
        role="status"
      >
        <div className="rbp-preloader-inner">
          <div className="rbp-preload-mark" aria-label="Rosane Borges Paisagismo">
            <div className="rbp-preload-ghost" aria-hidden="true" />
            <div className="rbp-preload-trace" aria-hidden="true" />
            <div className="rbp-preload-fill" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
