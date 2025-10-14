import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const movieId = parseInt(id, 10);
    const data = await ServerService.getMovieById(movieId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch movie';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
