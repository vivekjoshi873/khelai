import React from "react";

const solutions = [
  {
    number: "1",
    title: "Ball Tracking",
    description: "Track the path and speed of every ball with precision",
  },
  {
    number: "2",
    title: "Auto Video Clipping",
    description: "Automatically clip video highlights without manual effort",
  },
  {
    number: "3",
    title: "Single Android App",
    description: "Access all features and tools from one convenient app",
  },
  {
    number: "4",
    title: "Free Trials and Paid Plans",
    description:
      "Try our features for free or upgrade to unlock additional benefits",
  },
  {
    number: "5",
    title: "Real-time Analysis",
    description: "Get instant insights and statistics during live matches",
  },
  {
    number: "6",
    title: "Data Visualization",
    description: "Visualize data in graphs and charts for better analysis",
  },
];

const SolutionsGrid = () => {
  return (
    <section id="about" className="bg-background py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Solutions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Streamline your cricket analysis with our advanced features
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.number}
              className="flex flex-col rounded-lg bg-card p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#8B5CF6] text-primary-foreground">
                <span className="text-xl font-bold">{solution.number}</span>
              </div>
              <h4 className="text-xl font-semibold leading-snug text-foreground">
                {solution.title}
              </h4>
              <p className="mt-2 text-base text-muted-foreground">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
