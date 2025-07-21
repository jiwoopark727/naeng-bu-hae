import Image from 'next/image';
import Background from '../../public/assets/images/Background.png';
import Fridge from '../../public/assets/images/Fridge.png';
import '@/app/globals.css';

export default function Home() {
  return (
    <>
      <div className='relative w-[393px] h-[774px]'>
        {/* 배경이미지 */}
        <Image
          src={Background}
          alt='Background'
          width={393}
          height={774}
          className='absolute top-0 left-0 z-0'
        />
        {/* 겹쳐지는 냉장고 이미지 */}
        <Image
          src={Fridge}
          alt='Fridge'
          width={300}
          height={200}
          className='absolute top-[230px] left-[80px] z-10'
        />
        <div className='absolute top-[480px] left-[160px] z-20 font-semibold text-lg animate-pulse duration-300 cursor-pointer text-yellow-400'>
          👈 Touch!!
        </div>
      </div>
    </>
  );
}
