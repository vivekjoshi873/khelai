import Image from "next/image";
import { ChevronRight } from "lucide-react";

const solutions = [
  { text: "Automated ball tracking for accurate analysis" },
  { text: "Effortless video clipping with AI technology" },
  { text: "All-in-one Android app for seamless analysis" },
  { text: "Flexible plans with free trials and premium benefits" },
  { text: "Real-time insights and faster analysis with advanced tools" },
];

const SolutionsFeatures = () => {
  return (
    <section className="w-full py-20 bg-[linear-gradient(280deg,#fbf7ff,#fff_52%,#fbf7ff)]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-[32px] font-bold text-text-dark mb-8 leading-tight">
              Our Revolutionary Solutions
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-gray text-base font-normal">
                    {solution.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 relative w-full">
            <div className="hidden lg:block absolute w-full h-full bg-gradient-to-br from-primary to-purple-gradient-end rounded-2xl transform translate-x-4 translate-y-4"></div>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/pexels-photo-10469894-scaled-1-1024x676-3.jpeg"
              alt="A Person in White Uniform Playing Cricket on Green Grass Field"
              width={670}
              height={500}
              className="relative rounded-xl object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsFeatures;
