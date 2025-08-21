import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query) {
    return NextResponse.json(
      { success: false, message: '검색어(q)가 필요합니다.' },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: 'YouTube API Key가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        query
      )}&key=${apiKey}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || '유튜브 API 요청 실패');
    }

    const videoId = data.items?.[0]?.id?.videoId;

    if (!videoId) {
      return NextResponse.json(
        { success: false, message: '검색 결과가 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      videoId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
