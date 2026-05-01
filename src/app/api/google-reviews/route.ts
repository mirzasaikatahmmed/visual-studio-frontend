import { NextResponse } from "next/server";

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface PlaceDetailsResponse {
  result: {
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
  status: string;
}

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [], rating: 5, totalRatings: 0 });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ reviews: [], rating: 5, totalRatings: 0 });
    }

    const data: PlaceDetailsResponse = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status);
      return NextResponse.json({ reviews: [], rating: 5, totalRatings: 0 });
    }

    const reviews = (data.result.reviews ?? []).map((r) => ({
      name: r.author_name,
      time: r.relative_time_description,
      text: r.text,
      avatar: r.profile_photo_url,
      rating: r.rating,
    }));

    return NextResponse.json({
      reviews,
      rating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
    });
  } catch (err) {
    console.error("Google Places fetch failed:", err);
    return NextResponse.json({ reviews: [], rating: 5, totalRatings: 0 });
  }
}
