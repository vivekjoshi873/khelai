"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FreeTrialCta = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 5000);
  };

  const features = [
    "14-day free trial",
    "No credit card required",
    "Full feature access",
    "Cancel anytime",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-purple-700 py-20 md:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl"></div>
        <div className="absolute -right-4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white blur-3xl delay-1000"></div>
      </div>

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Limited Time Offer
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Start Your Free Trial Today
          </h2>

          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Experience the power of automated cricket analysis. No credit card
            required, cancel anytime.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium md:text-base">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              >
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-14 border-white/30 bg-white/10 px-6 text-base text-white placeholder:text-white/60 backdrop-blur-sm focus:border-white focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group h-14 bg-white px-8 text-base font-semibold text-primary transition-all hover:scale-105 hover:bg-white hover:shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center ">
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 rounded-2xl bg-white/20 p-8 backdrop-blur-sm">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Welcome Aboard! 🎉
                </h3>
                <p className="text-white/90">
                  Check your inbox for your free trial access link and getting
                  started guide.
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-white/70">
            Join 10,000+ coaches and analysts already using khel.ai
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialCta;
