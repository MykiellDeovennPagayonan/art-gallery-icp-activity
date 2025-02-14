/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";

const slides: string | any[] = []

export default function Slides() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute w-full h-full"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <button
        onClick={nextSlide}
        className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded"
      >
        Next →
      </button>
    </div>
  );
}
