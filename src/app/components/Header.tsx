'use client';

import Image from 'next/image';
import Logo from '../../../public/assets/images/Logo.png';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleMartClick = () => {
    router.push('/mart');
  };

  const handleHomeClick = () => {
    router.push('/ingredients');
  };

  const pathname = usePathname();

  return (
    <div className='w-full min-h-[78px] bg-white flex items-center px-6 justify-between '>
      <span className='text-3xl cursor-pointer hover:scale-105' onClick={handleLogoClick}>
        <Image src={Logo} alt='Logo' width={40} height={40}></Image>
      </span>
      <>
        {pathname === '/mart' ? (
          <span
            onClick={handleHomeClick}
            className='text-sm font-semibold cursor-pointer transition-all duration-300 hover:text-blue-400 hover:translate-x-[5px]'
          >
            집 가기 ➡️
          </span>
        ) : (
          <span
            onClick={handleMartClick}
            className='text-sm font-semibold cursor-pointer transition-all duration-300 hover:text-blue-400 hover:translate-x-[5px]'
          >
            마트 가기 ➡️
          </span>
        )}
      </>
    </div>
  );
}
