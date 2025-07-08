import video from "../../assets/videoplayback.mp4";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function OverviewSection() {
  const videoRef = useRef(null);

  return (
    <section className="bg-base-100 w-full">
      <div className="mx-auto">
        <motion.div
          className="relative w-full min-h-[700px] mx-auto overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute inset-0 z-0"
            src={video}
            loop
            muted
            autoPlay
          />
          <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
            {/* Poster image */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 dark:from-[#006A4E]/30 via-black/40 dark:via-[#006A4E]/40 to-black/70 z-20 dark:to-[#006A4E]/50" />
            <div className="absolute max-w-4xl z-20 text-center text-white px-4">
              <h2 className="text-6xl font-heading mb-6">
                Your gateway to authentic Bangladesh
              </h2>
              <p>
                At Bongo Discovery, we meticulously craft journeys that go
                beyond sightseeing, inviting you to deeply connect with the
                heart and soul of Bangladesh. From the planning stages to your
                triumphant return, we handle every detail, ensuring an
                authentic, seamless, and unforgettable travel experience.
              </p>
              <button className="btn btn-primary mt-4">Explore</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
