import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MacbookScroll } from "@/components/MacbookScroll";
import { Projects } from "@/components/Projects";
import { SectorMarquee } from "@/components/SectorMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { BentoTilt } from "@/components/BentoTilt";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { getVisibleProjects } from "@/lib/projects";

export default async function Home() {
  // Admin panelinde her değişiklikte revalidatePath("/") ile yenilenir.
  const projects = await getVisibleProjects();

  return (
    <>
      <Header showProjects={projects.length > 0} />
      <main className="overflow-x-clip">
        <Hero />
        <MacbookScroll />
        <Projects items={projects} />
        <SectorMarquee />
        <HowItWorks />
        <BentoTilt />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
