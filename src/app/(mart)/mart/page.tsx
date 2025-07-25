import Image from 'next/image';
import MartBackground from '../../../../public/assets/images/MartBackground1.jpg';
import CartWoman from '../../../../public/assets/images/CartWoman.png';

export default function MartPage() {
  return (
    <div className='relative w-full h-full'>
      <Image
        src={MartBackground}
        alt='mart'
        width={400}
        height={400}
        className='absolute top-0 left-0 h-full'
      ></Image>
      <Image
        src={CartWoman}
        alt='cart'
        width={450}
        height={450}
        className='absolute bottom-15 left-0'
      ></Image>
      <div className='absolute bottom-32 right-23 bg-[#f43c3c] w-16 h-16 rounded-[50%] cursor-pointer flex justify-center items-center text-white'>
        {/* 담긴 개수에 따라 숫자 변동 예정 */}
        <p>2</p>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-11 bg-[#fb4a4a] flex justify-center items-center text-white text-xs cursor-pointer'>
        <p>구매하기(냉장고 가기)</p>
      </div>
    </div>
  );
}
