// SplitText.jsx
import { motion, useInView } from "motion/react";
import React, { useMemo, useRef } from "react";
// import { motion, useInView } from "motion";


/**
 * SplitText
 * - Animate by "chars" or "words"
 * - Plays once when it enters the viewport
 * - Fully accessible (keeps readable text via aria-label)
 */
export function SplitText({
  text,
  by = "chars",                 // "chars" | "words"
  as: Tag = "h1",                // any tag/component
  className = "",
  delay = 0,                     // delay before first child
  duration = 0.6,                // each child anim duration
  stagger = 0.03,                // gap between children
  offsetY = 24,                  // initial translateY
  ease = [0.22, 1, 0.36, 1],     // easeOutCubic-bezier
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  const parts = useMemo(() => {
    if (by === "words") {
      // Keep spaces as their own tokens so layout doesn’t jump
      return text.split(/(\s+)/).map((p) => (p === " " ? "\u00A0" : p));
    }
    // Characters (preserve spaces as &nbsp;)
    return Array.from(text).map((c) => (c === " " ? "\u00A0" : c));
  }, [text, by]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: offsetY },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease },
    },
  };

  return (
    <Tag className={className}>
      {/* Screen readers get the full phrase; visual layer is animated spans */}
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="inline-block"
      >
        {parts.map((token, i) => {
          // Don’t animate pure whitespace when splitting by words
          const isSpaceToken = by === "words" && /^\s+$/.test(token);
          if (isSpaceToken) return <span key={`s-${i}`}>{token}</span>;

          return (
            <motion.span
              key={`${by}-${i}`}
              variants={child}
              className="inline-block will-change-transform"
              style={{ backfaceVisibility: "hidden" }}
            >
              {token}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
