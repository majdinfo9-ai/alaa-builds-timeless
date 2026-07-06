import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { VisionMission } from "@/components/VisionMission";
import { Values } from "@/components/Values";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { Trust } from "@/components/Trust";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <VisionMission />
      <Values />
      <Services />
      <Projects />
      <Team />
      <Trust />
      <CTA />
    </>
  );
}
