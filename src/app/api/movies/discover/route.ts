import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      sort_by: searchParams.get('sort_by') || 'popularity.desc',
      include_adult: searchParams.get('include_adult') === 'true',
      include_video: searchParams.get('include_video') === 'true',
      language: searchParams.get('language') || 'en-US',
    };

    const data = await ServerService.discoverMovies(params);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch movie' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}
