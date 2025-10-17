import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const movieId = searchParams.get('movie_id');

  if (!movieId) {
    return NextResponse.json({ error: 'movieId is required' }, { status: 400 });
  }
  try {
    const trailerVideo = await ServerService.getVideo(parseInt(movieId));

    return NextResponse.json(trailerVideo, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
