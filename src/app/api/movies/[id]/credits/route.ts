import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await context.params;

    const data = await ServerService.getMovieByIdWithCredits(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch moviec credits';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
