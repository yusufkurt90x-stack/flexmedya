"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ProjectThumb } from "./ProjectThumb";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { hostname } from "@/lib/project-url";
import type { Project } from "@/lib/projects";

export function Projects({ items }: { items: Project[] }) {
  if (items.length === 0) return null;

  return (
    <section id="projeler" className="border-b border-line py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projeler"
          title={
            <>
              Yaptığımız işlerden <span className="text-gradient">bazıları.</span>
            </>
          }
          description="Her biri canlı ve çalışıyor. Tıklayın, kendiniz gezin."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((p) => (
            <motion.a
              key={p.id}
              variants={fadeUp}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-orange-400/40 hover:shadow-[0_0_50px_-20px_rgba(251,146,60,0.6)]"
            >
              {/* Tarayıcı çerçevesi */}
              <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="size-2 rounded-full bg-fg/15" />
                <span className="ml-2 truncate rounded-md bg-fg/5 px-2 py-0.5 font-mono text-[11px] text-subtle">
                  {hostname(p.url)}
                </span>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <ProjectThumb
                  image={p.image}
                  url={p.url}
                  title={p.title}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                {p.category && (
                  <span className="self-start rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-300">
                    {p.category}
                  </span>
                )}
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
                {p.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>}
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">
                  Siteyi ziyaret et
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
