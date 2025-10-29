import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "khel.ai - Cricket Analysis Automation",
  description: "khel.ai is a platform for cricket analysis and tracking",
  icons: {
    icon: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/cropped-khel_logo-removebg-preview-65x91-1.png",
        rel: "icon",
        type: "image/png",
      },
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/cropped-khel_logo-removebg-preview-65x91-1.png",
        rel: "shortcut icon",
        type: "image/png",
      },
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/047c0b3a-a6d3-4cb6-9537-953f680f54d6-khel-ai/assets/images/cropped-khel_logo-removebg-preview-65x91-1.png",
        rel: "apple-touch-icon",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
      </body>
    </html>
  );
}
