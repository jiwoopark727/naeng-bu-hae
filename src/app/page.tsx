import Image from 'next/image';
import Background5 from '../../public/assets/images/Background5.jpg';
import Fridge from '../../public/assets/images/Fridge.png';
import '@/app/globals.css';

export default function Home() {
  return (
    <>
      <div className='relative w-[393px] h-[800px] overflow-hidden'>
        {/* 배경이미지 */}
        <Image
          src={Background5}
          alt='Background'
          width={393}
          height={800}
          className='absolute bottom-0 left-0 z-0'
        />

        {/* 겹쳐지는 냉장고 이미지 */}
        <Image
          src={Fridge}
          alt='Fridge'
          width={120}
          height={200}
          className='absolute top-20 left-5 z-10 cursor-pointer'
        />
        <div className='absolute top-70 right-15 z-20 font-semibold text-md animate-pulse duration-300 text-black'>
          👈 냉장고를 터치하세요!!
        </div>
      </div>
    </>
  );
}
