'use client';

import { useRouter } from 'next/navigation';

export default function IngredientList() {
  const router = useRouter();

  const handleXclick = () => {
    router.back();
  };

  return (
    <div className='absolute top-50 right-5 z-20 text-md text-black w-70 h-130 bg-white rounded-[15px] opacity-95 p-4'>
      <div className='relative w-full h-full'>
        <span className='flex justify-between items-center mb-4'>
          <p className='text-md font-semibold'>냉장고에 있는 재료</p>
          <span className='px-2 cursor-pointer' onClick={handleXclick}>
            X
          </span>
        </span>

        <div className='text-[13px]'>
          <ul>
            <li>
              <span className='mr-1'>✅</span>
              <span>다진 마늘</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>김치</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>두부</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>돼지 앞다리살</span>
            </li>
          </ul>
        </div>

        <button className='w-full bg-blue-400 text-sm font-bold text-white py-2 rounded-[10px] hover:bg-blue-600 transition absolute bottom-0'>
          레시피 추천
        </button>
      </div>
    </div>
  );
}
