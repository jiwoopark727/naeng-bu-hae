import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.RECIPES_API_KEY;
const API_URL = 'http://openapi.foodsafetykorea.go.kr/api';

export async function POST(req: NextRequest) {
  const { ingredients } = await req.json(); // ['김치', '두부']

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: '재료 배열이 필요합니다.' },
      { status: 400 }
    );
  }

  const start = 1;
  const end = 300; // 최대 300개 정도 가져온 뒤 필터

  const url = `${API_URL}/${API_KEY}/COOKRCP01/json/${start}/${end}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const rows = data.COOKRCP01?.row ?? [];

    // 서버에서 재료 포함 여부 필터
    const filtered = rows.filter((recipe: any) =>
      ingredients.every((ing: string) => recipe.RCP_PARTS_DTLS?.includes(ing))
    );

    return NextResponse.json({ recipes: filtered.slice(0, 12) }); // 12개만 반환
  } catch (err) {
    console.error('레시피 API 오류:', err);
    return NextResponse.json(
      { error: '레시피를 불러오지 못했습니다.' },
      { status: 500 }
    );
  }
}
