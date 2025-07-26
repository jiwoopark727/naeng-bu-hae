import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.RECIPES_API_KEY;
const API_URL = 'http://openapi.foodsafetykorea.go.kr/api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { success: false, message: '메뉴 이름이 없습니다.' },
      { status: 400 }
    );
  }

  const encodedName = encodeURIComponent(name);
  const url = `${API_URL}/${API_KEY}/COOKRCP01/json/1/5/RCP_NM=${encodedName}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const recipe = data?.COOKRCP01?.row?.[0];

    if (!recipe) {
      return NextResponse.json(
        { success: false, message: '레시피를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: recipe });
  } catch (error) {
    console.error('API fetch 실패:', error);
    return NextResponse.json(
      { success: false, message: '레시피 불러오기 실패' },
      { status: 500 }
    );
  }
}
