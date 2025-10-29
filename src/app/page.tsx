import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import SolutionsGrid from "@/components/sections/solutions-grid";
import Challenges from "@/components/sections/challenges";
import SolutionsFeatures from "@/components/sections/solutions-features";
import WhyChoose from "@/components/sections/why-choose";
import CtaSection from "@/components/sections/cta";
import Faq from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact";
import FreeTrialCta from "@/components/sections/free-trial-cta";
import Footer from "@/components/sections/footer";
import YouTubeSingle from "@/components/sections/youtube-single";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SolutionsGrid />
        <Challenges />
        <SolutionsFeatures />
        <WhyChoose />
        <CtaSection />
        <YouTubeSingle />
        <FreeTrialCta />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
