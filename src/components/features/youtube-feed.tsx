"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle: string;
  url: string;
  embedUrl: string;
};

export default function YouTubeFeed({
  handle = "@khel.ai.cricket",
  maxResults = 6,
}: {
  handle?: string;
  maxResults?: number;
}) {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    setError(null);
    setVideos(null);
    fetch(
      `/api/youtube?handle=${encodeURIComponent(handle)}&maxResults=${maxResults}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (aborted) return;
        if (data?.videos) setVideos(data.videos as VideoItem[]);
        else setError("No videos found");
      })
      .catch(() => !aborted && setError("Failed to load videos"));
    return () => {
      aborted = true;
    };
  }, [handle, maxResults]);

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive border border-destructive/30 p-4 rounded-md text-sm">
        {error}
      </div>
    );
  }

  if (!videos) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((v) => (
        <Card key={v.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`${v.embedUrl}?rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold line-clamp-2">
                {v.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(v.publishedAt).toLocaleDateString()}
              </p>
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a href={v.url} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
