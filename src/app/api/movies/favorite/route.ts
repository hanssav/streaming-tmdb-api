import { ServerService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const movieId = parseInt(body.media_id);
    const accountId = body.account_id;

    if (!movieId || !accountId) {
      return NextResponse.json(
        { error: 'movieId and accountId are required' },
        { status: 400 }
      );
    }

    const res = await ServerService.addToFavorite(accountId, {
      media_type: body.media_type,
      media_id: movieId,
      favorite: body.favorite,
    });

    return NextResponse.json(res, { status: res.status || 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}
