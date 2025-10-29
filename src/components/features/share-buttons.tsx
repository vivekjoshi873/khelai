"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Share2,
  Link as LinkIcon,
  Twitter,
  Mail,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

const Toast = ({ message, show }: { message: string; show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <div className="animate-in fade-in-0 slide-in-from-bottom-5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
        {message}
      </div>
    </div>
  );
};

interface ShareButtonsProps {
  sessionId?: string;
  highlightId?: string;
  title?: string;
  pageUrl?: string;
  onDownload?: () => void;
}

export default function ShareButtons({
  sessionId,
  highlightId,
  title = "Check this out on khel.ai",
  pageUrl,
  onDownload,
}: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const shareUrl = useMemo(() => {
    const baseUrl =
      pageUrl ||
      (typeof window !== "undefined" ? window.location.href.split("?")[0] : "");
    const params = new URLSearchParams();
    if (sessionId) params.set("session", sessionId);
    if (highlightId) params.set("highlight", highlightId);

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }, [sessionId, highlightId, pageUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => setOpen(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const shareOptions = [
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Copy Link",
      action: handleCopyLink,
      type: "button",
    },
    {
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: "WhatsApp",
      href: `whatsapp://send?text=${encodeURIComponent(`${title}: ${shareUrl}`)}`,
      type: "link",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      type: "link",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might be interested in this:\n\n${shareUrl}`)}`,
      type: "link",
    },
    ...(onDownload
      ? [
          {
            icon: <Download className="h-5 w-5" />,
            label: "Download",
            action: onDownload,
            type: "button",
          },
        ]
      : []),
  ];

  const ShareMenuContent = () => (
    <div className="flex flex-col gap-1 p-2">
      {shareOptions.map((option) =>
        option.type === "button" ? (
          <button
            key={option.label}
            onClick={() => {
              if (option.action) option.action();
              if (option.label !== "Copy Link") {
                setOpen(false);
              }
            }}
            className="flex w-full items-center gap-3 rounded-md p-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ) : (
          <a
            key={option.label}
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-md p-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {option.icon}
            <span>{option.label}</span>
          </a>
        )
      )}
    </div>
  );

  const triggerButton = (
    <Button variant="ghost" size="icon" aria-label="Share">
      <Share2 className="h-5 w-5" />
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Share</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <ShareMenuContent />
            </div>
          </DrawerContent>
        </Drawer>
        <Toast message="Link copied!" show={showToast} />
      </>
    );
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <ShareMenuContent />
        </PopoverContent>
      </Popover>
      <Toast message="Link copied!" show={showToast} />
    </>
  );
}
