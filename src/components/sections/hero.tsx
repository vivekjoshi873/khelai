import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-violet-700 pt-32 pb-32 text-white md:pt-40 md:pb-40"
    >
      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center lg:px-8">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Cricket Analysis Automation at Your Fingertips
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-violet-200 md:text-xl">
          Powerful tools to simplify cricket analysis and tracking
        </p>
        <Link
          href="/pricing"
          className="mt-10 inline-flex items-center justify-center gap-x-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white decoration-0"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-20 w-full text-background md:h-24">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full fill-current"
          aria-hidden="true"
        >
          <path d="M0,70 Q720,0 1440,70 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
