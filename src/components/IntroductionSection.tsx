"use client"
import { Highlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";
import { FlipWords } from "./ui/flip-words";

export default function IntroductionSection() {
  const flipWords = ["Creativity", "Beauty", "Essence", "Life"]
  return (
    <div className="flex flex-col w-screen items-center justify-center h-screen bg-neutral-950">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-3xl lg:text-4xl font-bold text-neutral-300 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
          Hello my name is {" "}
        <Highlight className="text-black dark:text-white">
          Mykiell
        </Highlight>
      </motion.h1>
      <h2 className='flex flex-col text-center my-12 text-5xl lg:text-7xl font-bold text-white'>
        <span className="text-3xl lg:text-5xl">I believe ART is</span>
        <FlipWords className="text-center text-green-400" words={flipWords} />
      </h2>
    </div>
  )
}