import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { filter: string } }
) {
  const { filter } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${filter}?api_key=f3c507998cbb0454425758a0eddd7ba9`
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
