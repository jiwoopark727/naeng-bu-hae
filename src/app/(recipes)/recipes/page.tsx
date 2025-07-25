'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RecipesPage() {
  const router = useRouter();

  const goToDetail = (menu: string) => {
    router.push(`/recipes/detail/${encodeURIComponent(menu)}`);
  };

  // api 데이터로 대체 예정
  const list = [
    { pic: 'food1.png', menu: '저염 간장을 이용한 닭게장 비빔밥' },
    { pic: 'food2.png', menu: '순두부 찌개' },
    { pic: 'food3.png', menu: '해물 채소장을 넣은 곰취 쌈밥' },
    {
      pic: 'food4.png',
      menu: '유자골드레싱을 곁들인 곤드레 단호박 크로켓 샐러드',
    },
    {
      pic: 'food4.png',
      menu: '유자골드레싱을 곁들인 곤드레 단호박 크로켓 샐러드1',
    },
    {
      pic: 'food4.png',
      menu: '유자골드레싱을 곁들인 곤드레 단호박 크로켓 샐러드2',
    },
  ];
  return (
    <div className='w-96 flex justify-between items-start flex-wrap p-4'>
      {list.map((a) => (
        <div
          className='h-52 basis-40 grow-0 shrink-0 border border-gray-400 border-solid mb-6 rounded-lg cursor-pointer'
          key={a.menu}
          onClick={() => goToDetail(a.menu)}
        >
          <div className='p-5 pb-2'>
            <Image
              className='h-28 rounded-xl'
              src={`/${a.pic}`}
              alt={a.menu}
              width={120}
              height={50}
            />
          </div>
          <div className='pl-5 pr-5 text-center text-xs'>
            <p>{a.menu}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
