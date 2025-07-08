import hero1 from "../../assets/hero-1.jpg";
import hero2 from "../../assets/hero-2.jpg";
import hero3 from "../../assets/hero-3.jpg";
import hero4 from "../../assets/hero-4.jpg";
import hero5 from "../../assets/hero-5.webp";
import hero6 from "../../assets/hero-6.jpeg";
import hero7 from "../../assets/hero-7.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        return prev + 1 >= images.length ? 0 : prev + 1;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion Variants (Fixed)
  const imageVariants = {
    initial: {
      opacity: 0.5,
      scale: 1.08,
      filter: "blur(10px)",
      transition: {
        opacity: { duration: 1 },
        scale: { duration: 0 },
        filter: { duration: 1 },
      },
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 1 },
        scale: { duration: 4 },
        filter: { duration: 1 },
      },
    },
    exit: {
      opacity: 0.5,
      scale: 1.08,
      filter: "blur(10px)",
      transition: {
        opacity: { duration: 1 },
        scale: { duration: 1 },
        filter: { duration: 1 },
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-20" />

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center z-30 text-white text-center px-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">Bongo Discovery</h1>
          <p className="mb-6 max-w-xl mx-auto text-xl">
            Eco-conscious journeys through rivers, forests, and heritage of
            Bangladesh.
          </p>
          <button className="btn btn-primary">Explore Now</button>
        </div>
      </div>
    </div>
  );
}
