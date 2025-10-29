import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-primary to-violet-700">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-8 py-[60px] text-center lg:py-[100px]">
        <h2 className="max-w-3xl font-bold text-white text-3xl md:text-4xl lg:text-5xl">
          Experience the Power of Automated Cricket Analysis
        </h2>
        <p className="max-w-2xl text-lg text-violet-200 md:text-xl">
          Try khel.ai today and revolutionize your game analysis
        </p>
        <Link
          href="/"
          className="group mt-4 inline-flex decoration-0 items-center justify-center gap-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-[0_2px_4px_rgba(124,58,237,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_12px_rgba(124,58,237,0.3)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          Get Started
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
