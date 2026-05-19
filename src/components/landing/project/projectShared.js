export const labelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#8f7b55]";

export const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};
