import { ServerService } from '@/services';
import { Movie } from '@/types';
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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const accountId = searchParams.get('account_id');
  const movieId = searchParams.get('movie_id');

  if (!accountId) {
    return NextResponse.json(
      { error: 'accountId is required' },
      { status: 400 }
    );
  }

  try {
    const favorites = await ServerService.getAllFavorites(Number(accountId));

    if (movieId) {
      const favorite = favorites.find((f: Movie) => f.id === Number(movieId));
      return NextResponse.json(favorite || null);
    }

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch favorite movies' },
      { status: 500 }
    );
  }
}
