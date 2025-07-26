'use client';

import Image from 'next/image';
import fallback from '../../../../../../public/fallback.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { use, useEffect, useState } from 'react';

type Props = {
  params: Promise<{ name: string }>;
};

type Recipe = {
  RCP_NM: string;
  ATT_FILE_NO_MAIN: string;
  RCP_PARTS_DTLS: string;
  MANUAL01: string;
  MANUAL_IMG01: string;
};

export default function DetailPage({ params }: Props) {
  const { name } = use(params);
  const menu = decodeURIComponent(name);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!menu) return;

    const fetchRecipeDetail = async (name: string) => {
      try {
        const res = await fetch(
          `/api/recipes/detail?name=${encodeURIComponent(name)}`
        );
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || '레시피를 불러오지 못했습니다.');
        }

        setRecipe(json.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipeDetail(menu);
    console.log('레시피 디테일 api fetch');
  }, [menu]);

  console.log(recipe);
  if (!recipe) return <p className='p-4'>{menu} 레시피를 불러오는 중...</p>;

  return (
    <div className='relative w-full h-full flex flex-col overflow-hidden px-4 py-2'>
      {/* 제목 (헤더 안에 있으니 여기선 그냥 margin) */}
      <div className='mb-3 text-center font-bold text-lg break-keep'>
        {recipe.RCP_NM}
      </div>

      {/* 이미지 */}
      <div className='flex justify-center mb-4'>
        <Image
          src={recipe.ATT_FILE_NO_MAIN || fallback}
          alt={recipe.RCP_NM}
          width={350}
          height={350}
          className='rounded-xl object-cover'
        />
      </div>

      {/* 재료 */}
      <section className='bg-gray-50 rounded-xl border border-gray-300 p-3 mb-4 text-xs font-bold'>
        <p className='mb-2'>재료</p>
        <div className='font-normal space-y-1'>
          {recipe.RCP_PARTS_DTLS.split(',').map((item) => (
            <div key={item.trim()} className='pl-2'>
              {item.trim()}
            </div>
          ))}
        </div>
      </section>

      {/* 레시피(스크롤 영역) */}
      <section className='flex flex-col flex-grow overflow-y-auto border border-gray-300 rounded-xl p-3 text-xs'>
        <div className='border-b-2 border-gray-200 pb-1 mb-2 font-bold'>
          레시피
        </div>

        <div className='flex justify-between items-center mb-3'>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='이전 단계'
          >
            <FontAwesomeIcon icon={faAngleLeft} className='w-5 h-5' />
          </button>

          <span className='text-sky-400 font-bold text-sm'>Step.1</span>

          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='다음 단계'
          >
            <FontAwesomeIcon icon={faAngleRight} className='w-5 h-5' />
          </button>
        </div>

        <div className='flex justify-center mb-4'>
          <Image
            src={recipe.MANUAL_IMG01 || fallback}
            alt='step'
            width={265}
            height={130}
            className='rounded-xl object-cover'
          />
        </div>

        <div className='px-2'>
          <p>{recipe.MANUAL01}</p>
        </div>
      </section>
    </div>
  );
}
