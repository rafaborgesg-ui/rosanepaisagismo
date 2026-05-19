/** Premium easing curves */
const EASE_PREMIUM = [0.16, 1, 0.3, 1];
const EASE_SMOOTH = [0.22, 1, 0.36, 1];
const EASE_CINEMATIC = [0.25, 0.46, 0.45, 0.94];

export function getFadeUp(reducedMotion = false) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: EASE_SMOOTH },
    },
  };
}

export function getStagger(reducedMotion = false) {
  if (reducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
}

export function getInViewProps(reducedMotion = false, options = {}) {
  const {
    axis = "y",
    offset = 24,
    delay = 0,
    duration = 0.65,
    margin = "-90px",
    blur = false,
  } = options;

  if (reducedMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: { once: true, margin },
      transition: undefined,
    };
  }

  const hidden = {
    opacity: 0,
    [axis]: offset,
    ...(blur ? { filter: "blur(8px)" } : {}),
  };

  const visible = {
    opacity: 1,
    [axis]: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  return {
    initial: hidden,
    whileInView: visible,
    viewport: { once: true, margin },
    transition: { delay, duration, ease: EASE_SMOOTH },
  };
}

/** Blur reveal animation — text/content enters from blurred state */
export function getBlurReveal(reducedMotion = false, options = {}) {
  const { delay = 0, duration = 1.05, offset = 28 } = options;

  if (reducedMotion) {
    return {
      initial: false,
      animate: {},
      transition: undefined,
    };
  }

  return {
    initial: { opacity: 0, y: offset, filter: "blur(14px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration, ease: EASE_PREMIUM, delay },
  };
}

/** Cinematic hover preset for images */
export function getCinematicHover(reducedMotion = false) {
  if (reducedMotion) return {};

  return {
    whileHover: {
      scale: 1.035,
      transition: { duration: 1.2, ease: EASE_CINEMATIC },
    },
  };
}

/** Stagger children container */
export function getStaggerContainer(reducedMotion = false, options = {}) {
  const { staggerDelay = 0.08, delayChildren = 0.1 } = options;

  if (reducedMotion) {
    return {
      initial: "visible",
      whileInView: "visible",
      viewport: { once: true },
    };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-80px" },
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren,
        },
      },
    },
  };
}

/** Stagger child item */
export function getStaggerItem(reducedMotion = false, options = {}) {
  const { axis = "y", offset = 22, blur = false } = options;

  if (reducedMotion) {
    return { variants: { hidden: {}, visible: {} } };
  }

  return {
    variants: {
      hidden: {
        opacity: 0,
        [axis]: offset,
        ...(blur ? { filter: "blur(6px)" } : {}),
      },
      visible: {
        opacity: 1,
        [axis]: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
        transition: { duration: 0.65, ease: EASE_SMOOTH },
      },
    },
  };
}
