import Image from 'next/image';

export default function RecipesPage() {
  const list = [
    { pic: 'food1.png', menu: '저염 간장을 이용한 닭게장 비빔밥' },
    { pic: 'food2.png', menu: '순두부 찌개' },
    { pic: 'food3.png', menu: '해물 채소장을 넣은 곰취 쌈밥' },
    {
      pic: 'food4.png',
      menu: '유자골드레싱을 곁들인 곤드레 단호박 크로켓 샐러드',
    },
  ];
  return (
    <div className='w-96 flex justify-between flex-wrap p-4'>
      {list.map((a) => (
        <div
          className='h-52 basis-40 grow-0 shrink-0 border border-gray-400 border-solid mb-6 rounded-lg cursor-pointer'
          key={a.pic}
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
