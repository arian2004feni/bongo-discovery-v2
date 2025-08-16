import hero1 from "../../assets/herobg/hero-1.webp";
import hero2 from "../../assets/herobg/hero-2.webp";
import hero3 from "../../assets/herobg/hero-3.webp";
import hero4 from "../../assets/herobg/hero-4.webp";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SplitText } from "../SplitText";
import { delay } from "motion";

const images = [hero1, hero2, hero3, hero4];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Preload images once at start
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Change image every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion Variants (Fixed)
  const imageVariants = {
    initial: {
      opacity: 0.5,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        opacity: { duration: 1, delay: 0.5 },
        scale: { duration: 0, delay: 0.5},
        filter: { duration: 1, delay: 0.5 },
      },
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 1 },
        scale: { duration: 6 },
        filter: { duration: 1 },
      },
    },
    exit: {
      opacity: 0.5,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        opacity: { duration: 1 },
        scale: { duration: 1 },
        filter: { duration: 1 },
      },
    },
  };

  return (
    <div className="hero relative w-full h-screen min-h-[700px] max-h-[780px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{
            backgroundImage: `url(${images[current]})`,
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-20" />

      {/* Text Content */}

      <div className="text-center z-30">
        <SplitText
          text="Find Your Story in Bangladesh"
          by="chars"
          className="text-5xl md:text-7xl font-heading font-normal mb-4 text-white"
          stagger={0.018}
          duration={0.55}
          offsetY={28}
        />
        <SplitText
          text="Eco-conscious journeys through rivers, forests, and heritage of
            Bangladesh."
          by="words"
          as="p"
          className="mb-4 text-xl text-white/80"
          stagger={0.03}
          delay={0.25}
          duration={0.5}
          offsetY={18}
        />
        <motion.button
          className="btn btn-primary text-base border-none shadow-none px-6 py-3"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <SplitText
            text="Explore Now"
            by="chars"
            stagger={0.04}
            duration={0.45}
            offsetY={10}
            className="inline-block"
          />
        </motion.button>
      </div>
    </div>
  );
}
