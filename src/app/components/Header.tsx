import Image from 'next/image';
import Logo from '../../../public/assets/images/Logo.png';

export default function Header() {
  return (
    <div className='w-full h-[78px] bg-gray-200 flex items-center px-6 justify-between'>
      <span className='text-3xl cursor-pointer hover:scale-105'>
        <Image src={Logo} alt='Logo' width={40} height={40}></Image>
      </span>
      <span className='text-sm font-semibold cursor-pointer transition-all duration-300 hover:text-blue-400 translate-y-[2px] hover:translate-x-[5px]'>
        장보러 가기 ➡️
      </span>
    </div>
  );
}
