'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Ingredients = ['다진 마늘', '우유', '계란', '김치', '두부', '목살'];

export default function IngredientListModal() {
  const router = useRouter();

  const handleXclick = () => {
    router.back();
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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

  return (
    <motion.div
      className='absolute top-50 right-5 z-20 text-md text-black w-70 h-130 bg-white rounded-[15px] opacity-95 p-4'
      initial={{ opacity: 0, scale: 0.9, x: -50, y: -140 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className='h-full'>
        <div className='relative w-full h-full'>
          <span className='flex justify-between items-center mb-4'>
            <p className='text-md font-semibold'>냉장고에 있는 재료</p>
            <span className='px-2 cursor-pointer' onClick={handleXclick}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </span>

          <div className='text-[13px]'>
            <ul>
              {Ingredients.map((item, idx) => (
                <div key={idx} className='flex mb-1.5'>
                  <input
                    type='checkbox'
                    id={item}
                    onChange={() => toggleIngredient(item)}
                    checked={selectedIngredients.includes(item)}
                    className='w-4 h-4 translate-y-0.5 accent-blue-500 mr-1.5'
                  />
                  <li>{item}</li>
                </div>
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
