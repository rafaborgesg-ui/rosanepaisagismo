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
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
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
  } = options;

  if (reducedMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: { once: true, margin },
      transition: undefined,
    };
  }

  const hidden = axis === "x" ? { opacity: 0, x: offset } : { opacity: 0, y: offset };
  return {
    initial: hidden,
    whileInView: { opacity: 1, [axis]: 0 },
    viewport: { once: true, margin },
    transition: { delay, duration, ease: [0.22, 1, 0.36, 1] },
  };
}
