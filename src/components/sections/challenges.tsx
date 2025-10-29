import Image from "next/image";

const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path d="M4.6,22.1c-0.4-0.4-0.6-0.9-0.6-1.5s0.2-1.1,0.6-1.5l8.6-8.6l-8.6-8.5c-0.4-0.4-0.6-0.9-0.6-1.5s0.2-1.1,0.6-1.5 c0.8-0.8,2.2-0.8,3,0l10.1,10.1c0.8,0.8,0.8,2,0,2.8L7.6,22.1C6.8,22.9,5.4,22.9,4.6,22.1z" />
  </svg>
);

const Challenges = () => {
  const challengesList = [
    "Manual ball tracking is time-consuming and prone to errors",
    "Finding and clipping video highlights require manual effort",
    "Need to switch between multiple tools and platforms for analysis",
    "Limited access to advanced analysis features without paid plans",
    "Delays in getting analysis due to manual processes",
  ];

  return (
    <section id="features" className="bg-background py-20">
      <div className="mx-auto max-w-[1152px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex justify-center">
            <div className="bg-primary p-4 rounded-[20px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/pexels-photo-3601184-scaled-1-1024x683-2.jpeg"
                alt="Boy in Full Cricket Gear"
                width={670}
                height={500}
                className="rounded-xl object-cover  w-full h-[320px] md:h-[520px] lg:h-[600px]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-[28px] lg:text-[32px] font-bold text-foreground mb-6">
              Challenges Faced by Traditional Cricket Analysis
            </h3>
            <ul className="space-y-4">
              {challengesList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <ChevronIcon className="h-6 w-6 fill-primary flex-shrink-0 mt-0.5 mr-4" />
                  <p className="text-muted-foreground text-base font-normal">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Challenges;