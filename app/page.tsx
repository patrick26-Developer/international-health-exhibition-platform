// app/page.tsx
import { CTASection } from "@/components/sections/cta";
import { EditionsTimeline } from "@/components/sections/editions-timeline";
import { MissionSection } from "@/components/sections/mission";
import { PartnersShowcase } from "@/components/sections/partners-showcase";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { StatisticsSection } from "@/components/sections/statistics";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Home />
      <MissionSection />
      <StatisticsSection />
      <ProgramsPreview />
      <EditionsTimeline />
      < PartnersShowcase />
       <CTASection />
    </div>
  );
}
