'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/downloads", label: "Downloads" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/about-us", label: "About Us" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled
        ? 'bg-gradient-to-r from-[#7c3aed]/70 to-[#6d28d9]/70 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-20">
        <a href="/" className="flex flex-shrink-0 items-center gap-2">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/cropped-khel_logo-removebg-preview-65x91-1.png"
            alt="khel.ai logo"
            width={65}
            height={91}
            className="h-14 w-auto"
          />
          <span className="text-2xl font-bold text-white">khel.ai</span>
        </a>
        
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="text-base font-semibold text-white transition-opacity hover:opacity-80">
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="hidden items-center md:flex">
          <a href="/pricing" className="rounded-md border border-white px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary decoration-0">
            Get Started
          </a>
        </div>

        <button 
          className="text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="absolute left-0 top-full w-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] shadow-lg md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-lg font-semibold text-white">
                {item.label}
              </a>
            ))}
            <a href="/pricing" className="mt-2 w-4/5 max-w-xs rounded-md bg-white py-3 text-center text-lg font-semibold text-primary decoration-0">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}