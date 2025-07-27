'use client';

import Image from 'next/image';
import fallback from '../../../../../../public/fallback.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { use, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

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

type StepItems = {
  description: string;
  image: string;
};

const rowVariants = {
  entry: (back: boolean) => ({
    x: back ? -400 : 400,
  }),
  center: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? 400 : -400,
  }),
};

export default function DetailPage({ params }: Props) {
  const { name } = use(params);
  const menu = decodeURIComponent(name);
  const offset = 1;
  const [index, setIndex] = useState(0);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [step, setStep] = useState<StepItems[]>([]);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    if (step) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalSteps = step.length - 1;
      const maxIndex = Math.floor(totalSteps / offset);
      setLeaving(true);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (step) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalSteps = step.length - 1;
      const maxIndex = Math.floor(totalSteps / offset);
      setLeaving(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  useEffect(() => {
    if (!menu) return;

    const fetchRecipeDetail = async (name: string) => {
      try {
        const res = await fetch(`/api/recipes/detail?name=${encodeURIComponent(name)}`);
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

        console.log(manualSteps);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipeDetail(menu);
    console.log('레시피 디테일 api fetch');
  }, [menu]);

  console.log(recipe);
  console.log(step);
  if (!recipe) return <p className='p-4'>{menu} 레시피를 불러오는 중...</p>;

  return (
    <div className='relative w-[393px] h-[756px] flex flex-col px-4 py-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
      {/* 제목 (헤더 안에 있으니 여기선 그냥 margin) */}
      <div className='mb-3 text-center font-bold text-lg break-keep'>{recipe.RCP_NM}</div>

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

      {/* 레시피(스크롤 영역) */}
      <section className='flex flex-col flex-grow border border-gray-300 rounded-xl p-3 text-xs'>
        <div className='border-b-2 border-gray-200 pb-1 mb-2 font-bold'>레시피</div>

        <div className='flex justify-between items-center mb-3'>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='이전 단계'
            onClick={decreaseIndex}
          >
            <FontAwesomeIcon icon={faAngleLeft} className='w-5 h-5' />
          </button>

          <span className='text-sky-400 font-bold text-sm'>Step.{index + 1}</span>

          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='다음 단계'
            onClick={increaseIndex}
          >
            <FontAwesomeIcon icon={faAngleRight} className='w-5 h-5' />
          </button>
        </div>

        <div className='relative h-[250px] overflow-hidden'>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={back}>
            <motion.div
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -100) {
                  increaseIndex(); // 오른쪽으로 넘김
                } else if (info.offset.x > 100) {
                  decreaseIndex(); // 왼쪽으로 넘김
                }
              }}
              custom={back}
              variants={rowVariants}
              initial='entry'
              animate='center'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index}
              className='absolute w-full h-full mb-4'
            >
              {step
                .slice(0)
                .slice(offset * index, offset * index + offset)
                .map((i) => (
                  <div key={i.image} className='flex flex-col items-center'>
                    <Image
                      src={i.image || fallback}
                      alt='step'
                      width={265}
                      height={170}
                      className='rounded-xl object-cover mb-2'
                    />

                    <div className='px-2'>
                      <p>{i.description}</p>
                    </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
