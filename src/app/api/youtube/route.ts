import { NextRequest } from "next/server";

type YouTubeSearchItem = {
  id: { kind: string; videoId?: string; channelId?: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { medium?: { url: string; width: number; height: number } };
    channelTitle: string;
  };
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawHandle = searchParams.get("handle") || "@khel.ai.cricket";
  const channelIdParam = searchParams.get("channelId");
  const handle = rawHandle.replace(/^@+/, "");
  const maxResultsParam = searchParams.get("maxResults");
  const maxResults = Math.min(Math.max(Number(maxResultsParam) || 6, 1), 24);

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing YOUTUBE_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    let channelId = channelIdParam || "";

    if (!channelId) {
      const resA = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(
          handle
        )}&key=${apiKey}`
      );
      const jsonA = await resA.json();
      channelId = jsonA?.items?.[0]?.id || channelId;
    }

    if (!channelId) {
      const resB = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
          `@${handle}`
        )}&maxResults=1&key=${apiKey}`
      );
      const jsonB = await resB.json();
      channelId = jsonB?.items?.[0]?.id?.channelId || channelId;
    }

    if (!channelId) {
      const resC = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
          handle
        )}&maxResults=1&key=${apiKey}`
      );
      const jsonC = await resC.json();
      channelId = jsonC?.items?.[0]?.id?.channelId || channelId;
    }

    if (!channelId) {
      return new Response(
        JSON.stringify({ error: "Channel not found", handle: `@${handle}` }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
    );
    const searchJson = await searchRes.json();
    const items: YouTubeSearchItem[] = searchJson?.items || [];

    const videos = items
      .filter((it) => it.id?.videoId)
      .map((it) => ({
        id: it.id.videoId as string,
        title: it.snippet.title,
        description: it.snippet.description,
        publishedAt: it.snippet.publishedAt,
        thumbnail: it.snippet.thumbnails?.medium?.url || "",
        channelTitle: it.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
        embedUrl: `https://www.youtube.com/embed/${it.id.videoId}`,
      }));

    return new Response(
      JSON.stringify({ channelId, handle: `@${handle}`, videos }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
