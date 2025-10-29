"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function YouTubeSingle() {
  const embedUrl = "https://www.youtube.com/embed/yZ446VbBAiA";

  return (
    <section className="py-16 md:py-24 bg-background-light">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`${embedUrl}?rel=0`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          <div>
            <h1 className=" text-3xl md:text-4xl font-bold mb-4 text-primary italic">
              Recording & Setup Guidelines
            </h1>
            <ul className="space-y-3 list-disc pl-5 text-muted-foreground mt-10">
              <li>
                <span className="text-foreground font-medium  italic">
                  Stump Calibration
                </span>{" "}
                : Use two sets of three stumps for calibration. Accurate
                calibration is essential for reliable ball tracking; poor
                calibration can lead to errors in analysis.
              </li>
              <li>
                <span className="text-foreground font-medium italic">
                  Tripod Requirements
                </span>{" "}
                : A tripod taller than 60 inches is recommended to ensure
                optimal accuracy in ball tracking. Ensure bowlers do not
                obstruct the ball’s path during delivery.
              </li>
              <li>
                <span className="text-foreground font-medium italic">
                  Filming Device & Data Sharing
                </span>{" "}
                : Film the session using an iPhone or iPad for best results.
                After capturing footage, easily share the data with teammates
                who use Android devices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
