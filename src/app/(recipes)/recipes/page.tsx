'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import fallback from '../../../../public/fallback.png';

interface Recipe {
  RCP_NM: string;
  RCP_PARTS_DTLS: string;
  ATT_FILE_NO_MAIN: string;
}

export default function RecipesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const query = searchParams.get('selected'); // 예: '김치,두부'
    if (!query) return;

    const ingredients = query.split(',');

    const fetchRecipes = async () => {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      setRecipes(data.recipes || []);
    };

    fetchRecipes();
    console.log('레세피 api fetch');
  }, [searchParams]);

  const goToDetail = (menu: string) => {
    router.push(`/recipes/detail/${encodeURIComponent(menu)}`);
  };

  return (
    <div className='p-4 relative w-[393px] h-[756px] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
      <div>
        {recipes.length === 0 ? (
          <p className='text-sm'>레시피들을 불러오는중...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
