import { NextRequest, NextResponse } from 'next/server';

export interface Recipe {
  RCP_SEQ: string; // 일련번호
  RCP_NM: string; // 요리명
  RCP_WAY2: string; // 조리방법 (e.g., 볶음, 끓이기 등)
  RCP_PAT2: string; // 요리종류 (e.g., 반찬, 국물요리 등)
  INFO_WGT: string; // 중량(1인분)
  INFO_ENG: string; // 열량(kcal)
  INFO_CAR: string; // 탄수화물(g)
  INFO_PRO: string; // 단백질(g)
  INFO_FAT: string; // 지방(g)
  INFO_NA: string; // 나트륨(mg)
  HASH_TAG: string; // 해시태그
  ATT_FILE_NO_MAIN: string; // 대표이미지 URL
  ATT_FILE_NO_MK: string; // 조리완성이미지 URL
  RCP_PARTS_DTLS: string; // 재료 정보

  // 조리순서 (최대 20단계)
  MANUAL01: string;
  MANUAL_IMG01: string;
  MANUAL02: string;
  MANUAL_IMG02: string;
  MANUAL03: string;
  MANUAL_IMG03: string;
  MANUAL04: string;
  MANUAL_IMG04: string;
  MANUAL05: string;
  MANUAL_IMG05: string;
  MANUAL06: string;
  MANUAL_IMG06: string;
  MANUAL07: string;
  MANUAL_IMG07: string;
  MANUAL08: string;
  MANUAL_IMG08: string;
  MANUAL09: string;
  MANUAL_IMG09: string;
  MANUAL10: string;
  MANUAL_IMG10: string;
  MANUAL11: string;
  MANUAL_IMG11: string;
  MANUAL12: string;
  MANUAL_IMG12: string;
  MANUAL13: string;
  MANUAL_IMG13: string;
  MANUAL14: string;
  MANUAL_IMG14: string;
  MANUAL15: string;
  MANUAL_IMG15: string;
  MANUAL16: string;
  MANUAL_IMG16: string;
  MANUAL17: string;
  MANUAL_IMG17: string;
  MANUAL18: string;
  MANUAL_IMG18: string;
  MANUAL19: string;
  MANUAL_IMG19: string;
  MANUAL20: string;
  MANUAL_IMG20: string;
}

const API_KEY = process.env.RECIPES_API_KEY;
const API_URL = 'http://openapi.foodsafetykorea.go.kr/api';

export async function POST(req: NextRequest) {
  const { ingredients, page = 1 } = await req.json(); // ['김치', '두부'], page도 같이 받아옴
  const PAGE_SIZE = 10;

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json({ error: '재료 배열이 필요합니다.' }, { status: 400 });
  }

  const start = 1;
  const end = 300; // 최대 300개 정도 가져온 뒤 필터

  const url = `${API_URL}/${API_KEY}/COOKRCP01/json/${start}/${end}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const rows = data.COOKRCP01?.row ?? [];
    console.log(rows);

    // 서버에서 재료 포함 여부 필터
    const filtered = rows.filter((recipe: Recipe) =>
      ingredients.every((ing: string) => recipe.RCP_PARTS_DTLS?.includes(ing))
    );

    // 몇 개씩 보여줄 지 정하는 코드
    const startIdx = (page - 1) * PAGE_SIZE;
    const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    // return NextResponse.json({ recipes: filtered.slice(0, 12) }); // 12개만 반환
    return NextResponse.json({
      recipes: paginated,
      hasMore: startIdx + PAGE_SIZE < filtered.length,
    });
  } catch (err) {
    console.error('레시피 API 오류:', err);
    return NextResponse.json({ error: '레시피를 불러오지 못했습니다.' }, { status: 500 });
  }
}
