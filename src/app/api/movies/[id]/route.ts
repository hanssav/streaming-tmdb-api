import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movie_id = Number(id);
    const data = await ServerService.getMovieById(movie_id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch movie';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
