import { NextResponse } from "next/server";

interface InstagramMediaItem {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

interface InstagramApiResponse {
  data: InstagramMediaItem[];
  error?: { message: string };
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({ posts: [] });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${token}&limit=6`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Instagram API error:", err);
      return NextResponse.json({ posts: [] });
    }

    const data: InstagramApiResponse = await res.json();

    const posts = (data.data ?? [])
      .filter((p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        imageUrl: p.media_url,
        permalink: p.permalink,
      }));

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Instagram fetch failed:", err);
    return NextResponse.json({ posts: [] });
  }
}
