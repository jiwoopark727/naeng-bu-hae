import Image from 'next/image';
import FoodImg from '../../../../public/food1.png';
import CheckImg from '../../../../public/assets/images/Check.png';
import StepImg from '../../../../public/food2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function DetailPage() {
  const ingredients = [
    '두부 곤약잡곡밥 두부 110g(⅓모)',
    '현미쌀 3g',
    '찹쌀 3g',
    '실곤약 3g',
    '나물준비 콩나물 15g(15개)',
    '표고버섯 4g(1/2장)',
    '애호박 10g(5×2×1cm)',
    '고사리 15g(7줄기)',
    '당근 15g(5×3×1cm)',
    '소금 3g(2/3작은술)',
    '소금 약간(나물데침)',
    '비빔고추장 소스 초고추장 5g(1작은술)',
    '플레인요거트 10g(2작은술)',
    '참기름 2g(1/3작은술)',
    '곁들임 새싹채소 3g',
  ];

  return (
    <div className={`relative w-[90%] h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden`}>
      <div className='absolute top-5 w-full flex justify-center mb-5 pb-1.5 border-b border-gray-200'>
        <p className='font-bold'>저염 간장을 이용한 닭개장 비빔밥</p>
      </div>
      <Image
        src={FoodImg}
        alt='FoodImg'
        width={393}
        height={800}
        className='absolute top-20 rounded-xl'
      ></Image>
      <div className='absolute w-full top-85 border border-gray-200 rounded-xl'>
        <div className='pt-2 pb-2 pl-3 mb-2 bg-gray-100 text-xs font-bold'>
          <p>재료</p>
        </div>
        <div>
          <ul className='pb-2 text-xs/5'>
            {ingredients.map((a) => (
              <div className='flex items-center' key={a}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className='text-xs w-3 h-3 ml-1.5 mr-1.5 text-sky-300'
                />
                <li>{a}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className='absolute top-180 w-full text-xs'>
        <div className='border-b-2 border-gray-200 pb-1'>
          <p className='font-bold'>레시피</p>
        </div>
        <div className='flex justify-between items-center mb-4 pt-2 pb-2 border-b border-gray-200'>
          <span className='cursor-pointer'>
            <FontAwesomeIcon icon={faAngleLeft} className='w-3 h-3' />
          </span>
          <span className='text-sky-400 font-bold text-[14px]'>Step.1</span>
          <span className='cursor-pointer'>
            <FontAwesomeIcon icon={faAngleRight} className='w-3 h-3' />
          </span>
        </div>
        <div className='flex justify-center mb-4'>
          <Image src={StepImg} alt='step' width={265} height={130} className='rounded-xl'></Image>
        </div>
        <div className='mb-10'>
          <p>
            잡곡을 깨끗하게 씻고 물에 30분 정도 불려 물을 1:1로 하여 밥이 끓으면 약한 불로 줄이고
            뜸을 들여 고슬고슬한 밥을 지어 한입 크기로 뭉쳐놓는다.
          </p>
        </div>
      </div>
    </div>
  );
}
