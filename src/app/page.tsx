'use client';

import Image from 'next/image';
import Background5 from '../../public/assets/images/Background5.jpg';
import Fridge from '../../public/assets/images/Fridge.png';
import '@/app/globals.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleFridgeClick = () => {
    router.push('/ingredients');
  };
  return (
    <>
      <div className='relative w-[393px] h-[calc(852px-3rem)] overflow-hidden'>
        {/* 배경이미지 */}
        <Image
          src={Background5}
          alt='Background'
          width={393}
          height={800}
          className='absolute bottom-0 left-0 z-0 h-full'
        />

        {/* 겹쳐지는 냉장고 이미지 */}
        <Image
          src={Fridge}
          alt='Fridge'
          width={120}
          height={200}
          className='absolute top-3 left-40 z-10 cursor-pointer'
          onClick={handleFridgeClick}
        />
        <div className='absolute top-30 left-5 z-20 font-semibold text-sm animate-pulse duration-300 text-black'>
          냉장고를 터치해!! 👉
        </div>
      </div>
    </>
  );
}
