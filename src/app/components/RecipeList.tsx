'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import fallback from '../../../public/fallback.png';

interface Recipe {
  RCP_NM: string;
  RCP_PARTS_DTLS: string;
  ATT_FILE_NO_MAIN: string;
}

export default function RecipeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [ingredients, setIngredients] = useState<string[] | null>(null);

  const goToDetail = (menu: string) => {
    router.push(`/recipes/detail/${encodeURIComponent(menu)}`);
  };

  const fetchRecipes = async (pageNum: number) => {
    if (!ingredients) return;

    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, page: pageNum }),
    });

    const data = await res.json();
    setRecipes((prev) => [...prev, ...(data.recipes || [])]);
    setHasMore(data.hasMore);
  };

  // 1페이지 데이터 받아오기
  useEffect(() => {
    const query = searchParams.get('selected');
    if (!query) return;

    const parsed = query.split(',');
    setIngredients(parsed);
    setRecipes([]);
    setPage(1);
  }, [searchParams]);

  // page가 변경될 때(스크롤 내릴 때) fetch
  useEffect(() => {
    if (ingredients) {
      fetchRecipes(page);
    }
  }, [page, ingredients]);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (!hasMore) return;
    // IntersectionObserver 브라우저에 내장된 web api 함수; 특정 DOM 요소가 화면에 보이는지 감시
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      // threshold 0 ~ 1 까지 얼마나 화면에 보여야 콜백을 실행할 지 설정하는 값
      { threshold: 0.5 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore]);

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            onClick={() => goToDetail(recipe.RCP_NM)}
            className='border border-gray-300 rounded-lg overflow-hidden shadow hover:scale-105 transition cursor-pointer'
          >
            <Image
              src={recipe.ATT_FILE_NO_MAIN || fallback}
              alt={recipe.RCP_NM}
              width={300}
              height={200}
              className='w-full h-28 object-cover'
            />
            <div className='p-2 text-sm text-center font-medium'>{recipe.RCP_NM}</div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={observerRef} className='w-full h-10 flex justify-center items-center'>
          <span className='text-sm text-gray-400'>불러오는 중...</span>
        </div>
      )}
    </>
  );
}
