import Image from 'next/image';

const cardData = [
  {
    number: "1",
    title: "Smart and Efficient",
    description: "Cutting-edge technology to simplify cricket analysis",
  },
  {
    number: "2",
    title: "Comprehensive Features",
    description: "All-in-one solution for analysis and tracking needs",
  },
  {
    number: "3",
    title: "Flexible Pricing",
    description: "Choose from free trials or upgrade for premium benefits",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-background py-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-[36px] font-bold text-foreground mb-12">
          Why Choose khel.ai?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/why-us-4.jpg"
              alt="A focused cricket player in action, representing khel.ai's smart and efficient analysis."
              width={680}
              height={600}
              className="rounded-xl shadow-lg object-cover w-full"
            />
          </div>

          <div className="flex flex-col gap-4">
            {cardData.map((card) => (
              <div key={card.number} className="flex items-start gap-5 p-6 bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow mb-5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#8B5CF6] text-primary-foreground font-bold text-lg">
                  {card.number}
                </div>
                <div>
                  <h5 className="font-bold text-lg text-card-foreground">{card.title}</h5>
                  <p className="text-muted-foreground mt-1">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}