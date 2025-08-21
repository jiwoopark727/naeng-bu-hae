'use client';

import Image from 'next/image';
import fallback from '../../../../../../public/fallback.png';
import { use, useEffect, useState } from 'react';
import DetailRecipe from '@/app/components/DetailRecipe';

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

export type StepItems = {
  description: string;
  image: string;
};

export default function DetailPage({ params }: Props) {
  const { name } = use(params);
  const menu = decodeURIComponent(name);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [step, setStep] = useState<StepItems[]>([]);
  const [videoId, setVideoId] = useState<string | null>(null);

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

        const manualSteps: StepItems[] = [];

        for (let i = 1; i <= 20; i++) {
          const num = i.toString().padStart(2, '0');
          const description = json.data[`MANUAL${num}`];
          const image = json.data[`MANUAL_IMG${num}`];

          if (description) {
            manualSteps.push({
              description,
              image: image || '',
            });
          }
        }

        setStep(manualSteps);

        // 유튜브 영상 검색
        const youtubeRes = await fetch(
          `/api/youtube/search?q=${encodeURIComponent(menu + ' 레시피')}`
        );
        const youtubeJson = await youtubeRes.json();

        if (!youtubeRes.ok || !youtubeJson.success) {
          throw new Error(
            youtubeJson.message || '레시피 유튜브를 불러오지 못했습니다.'
          );
        }

        setVideoId(youtubeJson.videoId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipeDetail(menu);
  }, [menu]);

  if (!recipe)
    return (
      <div className='w-full h-10 flex justify-center items-center'>
        <span className='text-sm text-gray-400'>{menu} 불러오는 중...</span>
      </div>
    );

  return (
    <div className='relative w-[393px] md:h-[calc(100vh-78px)] md:max-h-[758px] flex flex-col px-4 py-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden h-[calc(100vh-3rem)] max-h-[calc(852px-4rem)]'>
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
            <div key={item.trim()} className='pl-1'>
              {item.trim()}
            </div>
          ))}
        </div>
      </section>

      {/* 조리 과정 */}
      <DetailRecipe step={step} />

      {/* 유튜브 영상 */}
      {videoId && (
        <div className='mt-6'>
          <h3 className='font-bold mb-2 text-sm'>YouTube 조리 영상</h3>
          <iframe
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${menu} 레시피 영상`}
            allowFullScreen
            className='rounded-xl w-full h-full'
          />
        </div>
      )}
    </div>
  );
}
