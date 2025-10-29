"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Youtube,
  ArrowRight,
  Mail,
  Check,
  Linkedin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitted(true);
    setIsLoading(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 4000);
  };

  const topLinks = [
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
  ];

  const bottomLinks = [
    { name: "Contact Us", href: "/contact-us" },
    { name: "About Us", href: "/about-us" },
    { name: "Downloads", href: "/downloads" },
    { name: "Pricing", href: "/pricing" },
  ];

  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/khel.ai.cricket//",
      name: "Instagram",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/khel-ai/",
      name: "LinkedIn",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@khel.ai.cricket",
      name: "YouTube",
    },
  ];

  return (
    <footer className="bg-muted border-t">
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Stay Updated with khel.ai
            </h3>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Get the latest cricket analysis insights, feature updates, and
              exclusive tips delivered to your inbox.
            </p>

            {!isSubmitted ? (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:gap-4"
              >
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 border-border bg-background px-4 text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group h-12 bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 mx-auto flex max-w-xl items-center justify-center gap-3 rounded-lg bg-primary/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    Successfully subscribed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for confirmation.
                  </p>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <nav
            className="flex flex-col items-center gap-4 md:items-start"
            aria-label="Footer"
          >
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {topLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-normal text-primary hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {bottomLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-normal text-primary hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center gap-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-primary transition-opacity hover:opacity-75"
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <p className="text-center text-sm text-muted-foreground">
            Copyright © 2025 khel.ai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
