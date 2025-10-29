"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Is the ball tracking feature accurate?",
    answer:
      "Yes, our ball tracking technology provides precise results, given the camera quality and conditions",
  },
  {
    question: "Can I access the app on iOS devices?",
    answer: "Currently, the app is available only for Android devices",
  },
  {
    question: "What is the duration of the free trial?",
    answer: "Our free trial lasts for a single match",
  },
  {
    question: "Can I upgrade my plan at any time?",
    answer: "Yes, you can easily upgrade your plan within the app",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-background-light py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common queries about our services
            </p>
          </div>
          <div className="mt-12 space-y-5">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm "
              >
                <h3 className="text-lg font-semibold text-card-foreground ">
                  <button
                    id={`faq-question-${index}`}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
                    aria-expanded={activeIndex === index}
                  >
                    <span className="flex-1 pr-4">{item.question}</span>
                    {activeIndex === index ? (
                      <Minus className="h-6 w-6 shrink-0 text-primary" />
                    ) : (
                      <Plus className="h-6 w-6 shrink-0 text-primary" />
                    )}
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={cn(
                    "grid grid-rows-[0fr] transition-all duration-300 ease-in-out",
                    { "grid-rows-[1fr]": activeIndex === index }
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-base text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
