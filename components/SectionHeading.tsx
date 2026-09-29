"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  const centered = align === "center";
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <motion.p
        variants={fadeUp}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-4 text-3xl font-bold tracking-tighter text-balance sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
