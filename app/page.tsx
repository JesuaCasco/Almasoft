import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CustomDevelopment } from "@/components/sections/CustomDevelopment";
import { FinancialKnowledge } from "@/components/sections/FinancialKnowledge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { MainSolutions } from "@/components/sections/MainSolutions";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Problems />
      <MainSolutions />
      <FinancialKnowledge />
      <Industries />
      <CustomDevelopment />
      <Process />
      <About />
      <FinalCTA />
      <Contact />
    </main>
  );
}
