"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Terminal } from "./Terminal";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const steps = [
  {
    icon: MessageSquare,
    title: "Tanışalım",
    text: "WhatsApp'tan birkaç dakikalık sohbetle işletmenizi, hedeflerinizi ve beğendiğiniz tarzı öğreniyoruz.",
  },
  {
    icon: Palette,
    title: "Ücretsiz örneğinizi tasarlayalım",
    text: "48 saat içinde size özel bir ön izleme hazırlıyoruz. Beğenmezseniz hiçbir ücret yok.",
  },
  {
    icon: Rocket,
    title: "Yayına alalım",
    text: "Alan adı, SSL, Google kaydı ve hız optimizasyonu dahil — siteniz 7 gün içinde yayında.",
  },
];

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="border-b border-line py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Nasıl Çalışır"
          title="Üç adımda internetteyiz."
          description="Teknik detaylarla siz uğraşmayın. Süreci baştan sona biz yönetiyoruz."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-4"
          >
            {steps.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group flex gap-5 rounded-2xl border border-line bg-card p-6 transition hover:border-line-strong"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-orange-600 dark:text-orange-400">
                    0{i + 1}
                  </span>
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-orange-400/10 text-orange-600 dark:text-orange-300">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
