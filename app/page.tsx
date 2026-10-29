import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import snapshot from "@/public/data/projects.json";

const publicRepoCount = snapshot.filter(
  (repo: { fork: boolean; archived: boolean }) => !repo.fork && !repo.archived,
).length;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <About publicRepoCount={publicRepoCount} />
        <Skills />
        <ProjectsSection />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
