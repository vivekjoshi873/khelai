"use client";

import { useState, FormEvent } from "react";
import { Loader2, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!agreed) {
        setStatus("error");
        setMessage("You must agree to the privacy policy.");
        return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setEmail("");
    setAgreed(false);
  };

  return (
    <section className="bg-background-light py-16 sm:py-24">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark">Thanks for subscribing!</h2>
            <p className="text-lg text-text-gray">We've received your email. You'll hear from us soon.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-text-dark sm:text-3xl">Stay Updated</h2>
            <p className="mt-4 text-lg text-text-gray">
              Join our community to get the latest updates, industry news, and special offers delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:border sm:border-input sm:bg-white sm:p-1.5 sm:shadow-sm sm:focus-within:ring-2 sm:focus-within:ring-ring">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 w-full rounded-lg border border-input bg-white px-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:h-full sm:flex-1 sm:border-none sm:bg-transparent sm:px-6 sm:py-0 sm:focus:ring-0 sm:focus:ring-offset-0"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#8B5CF6] px-6 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:w-auto sm:rounded-full"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

               {status === "error" && message && (
                  <p className="mt-2 text-sm text-destructive">{message}</p>
                )}
            </form>
            
            <div className="mt-5 flex items-center justify-center space-x-2.5">
                <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 shrink-0 cursor-pointer rounded-sm border-2 border-input accent-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" 
                />
                <label htmlFor="terms" className="cursor-pointer text-sm text-muted-foreground">
                    I agree to the <a href="#" className="text-primary underline-offset-4 hover:underline">Privacy Policy</a>.
                </label>
            </div>
          </>
        )}
      </div>
    </section>
  );
}