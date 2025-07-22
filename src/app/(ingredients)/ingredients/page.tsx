import Image from 'next/image';
import Background5 from '../../../../public/assets/images/Background5.jpg';
import Fridge_open from '../../../../public/assets/images/Fridge_open.png';
import IngredientList from '@/app/components/IngredientList';

export default function IngredientsPage() {
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
          src={Fridge_open}
          alt='Fridge'
          width={260}
          height={200}
          className='absolute top-10 left-3 z-10 cursor-pointer'
        />

        {/* 재료 리스트 모달 */}
        <IngredientList />
      </div>
    </>
  );
}
