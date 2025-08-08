'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function IngredientListModal() {
  const router = useRouter();

  const handleXclick = () => {
    router.push('/');
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const toggleIngredient = (ingredient: string) => {
    const isSelected = selectedIngredients.includes(ingredient);

    if (isSelected) {
      // 이미 선택된 경우 → 제거
      setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
    } else {
      // 새로 선택하려는 경우
      if (selectedIngredients.length >= 5) {
        alert('최대 5개의 재료만 선택할 수 있습니다.');
        return;
      }

      setSelectedIngredients((prev) => [...prev, ingredient]);
    }
  };

  //로컬스토리지에 있는, 즉 내 냉장고에 있는 재료들 목록 가져오기
  useEffect(() => {
    const stored = localStorage.getItem('Ingredients');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setIngredients(parsed);
        }
      } catch (e) {
        console.error('로컬스토리지 재료 리스트 파싱 에러', e);
      }
    }
  }, []);

  return (
    <motion.div
      className='absolute top-25 left-10 md:left-4 z-20 text-md text-black w-75 md:w-90 h-100 bg-white rounded-[15px] opacity-95 p-4'
      initial={{ opacity: 0, scale: 0.9, x: 10, y: -120 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className='h-full'>
        <div className='relative w-full h-full'>
          <span className='flex justify-between items-center mb-4'>
            <p className='md:text-md text-sm font-semibold'>
              냉장고에 있는 재료
            </p>
            <span className='px-2 cursor-pointer' onClick={handleXclick}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </span>

          <div className='text-[13px] md:text-[11px] h-[calc(25rem-120px)] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
            <ul className='grid md:grid-cols-3 md:gap-x-0 md:gap-y-2 grid-cols-2 gap-x-2 gap-y-1'>
              {ingredients.map((item, idx) => (
                <li key={idx} className='flex items-center'>
                  <input
                    type='checkbox'
                    id={item}
                    onChange={() => toggleIngredient(item)}
                    checked={selectedIngredients.includes(item)}
                    className='w-4 h-4 accent-blue-500 mr-1.5'
                  />
                  <label htmlFor={item}>{item}</label>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              const query = selectedIngredients.join(',');
              router.push(`/recipes?selected=${encodeURIComponent(query)}`);
            }}
            className='w-full bg-blue-400 text-sm font-bold text-white py-2 rounded-[10px] hover:bg-blue-600 transition absolute bottom-0'
          >
            레시피 추천
          </button>
        </div>
      </div>
    </motion.div>
  );
}
