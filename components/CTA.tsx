"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "./Backdrop";
import { Meteors } from "./Meteors";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { whatsappUrl } from "@/lib/site";

export function CTA() {
  return (
    <section id="iletisim" className="relative isolate overflow-hidden py-32">
      <Backdrop />
      <Meteors count={24} />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400"
        >
          Hazır mısınız?
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-4xl font-bold tracking-tighter text-balance sm:text-6xl"
        >
          İşletmenizi bu hafta <span className="text-gradient">internete taşıyalım.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Size özel örnek sitenizi 48 saat içinde hazırlayalım. Beğenirseniz devam ederiz, beğenmezseniz
          hiçbir ücret ödemezsiniz.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_50px_-10px_rgba(251,146,60,0.8)] transition hover:brightness-110"
          >
            Ücretsiz Örnek İste
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
