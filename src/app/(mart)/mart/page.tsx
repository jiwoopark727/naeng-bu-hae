'use client';

import Image from 'next/image';
import MartBackground from '../../../../public/assets/images/MartBackground1.jpg';
import CartWoman from '../../../../public/assets/images/CartWoman.png';
import { useEffect, useState } from 'react';

// 임시 구매 가능한 재료
const availableItems = [
  '양파',
  '계란',
  '감자',
  '마늘',
  '토마토',
  '마라',
  '버섯',
];

export default function MartPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);

  // localStorage에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('Ingredients');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setIngredients(parsed);
        }
      } catch (e) {
        console.error('로컬스토리지 재료 리스트 파싱 에러', e);
      }
    }
  }, []);

  const toggleCartItem = (item: string) => {
    setCart((prev) => {
      const newCart = new Set(prev);
      if (newCart.has(item)) {
        newCart.delete(item);
      } else {
        newCart.add(item);
      }
      return newCart;
    });
  };

  const handleBuyButton = () => {
    const newItems = [...ingredients];
    let updated = false;

    cart.forEach((item) => {
      if (!newItems.includes(item)) {
        newItems.push(item);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem('Ingredients', JSON.stringify(newItems));
      setIngredients(newItems);
    }

    // 구매 후 장바구니 초기화
    setCart(new Set());
    alert('냉장고에 재료가 추가되었습니다.');
  };

  return (
    <div className='relative w-full h-full'>
      {/* 배경 및 캐릭터 이미지 */}
      <Image
        src={MartBackground}
        alt='mart'
        width={400}
        height={400}
        className='absolute top-0 left-0 h-full'
      />
      <Image
        src={CartWoman}
        alt='cart'
        width={450}
        height={450}
        className='absolute bottom-15 left-0'
      />

      {/* 재료 리스트(슬라이드로 바꿔야됨) */}
      {/* 딱 카트 끄는 아줌마 바로 위까지 */}
      <div className='absolute w-full h-[55%] top-0 left-0 p-4 rounded shadow-md'>
        <h3 className='flex justify-center mb-2 font-bold'>마트 재료 목록</h3>
        {availableItems.map((item) => (
          <div key={item} className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={cart.has(item)}
              onChange={() => toggleCartItem(item)}
              className='w-4 h-4 accent-blue-500 mr-1.5'
            />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* 장바구니 수량 */}
      <div
        onClick={() => setShowModal(true)}
        className='absolute bottom-32 right-23 bg-[#f43c3c] w-16 h-16 rounded-[50%] cursor-pointer flex justify-center items-center text-white'
      >
        <p>{cart.size}</p>
      </div>

      {/* 장바구니 모달 */}
      {showModal && (
        <div className='absolute left-52 bottom-58  flex justify-center items-center z-50'>
          <div className='bg-white w-[170px] p-6 rounded shadow-lg'>
            <h2 className='text-md font-bold mb-4'>🛒 장바구니</h2>
            {Array.from(cart).length > 0 ? (
              <ul className='list-disc pl-4'>
                {Array.from(cart).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>장바구니에 담긴 재료가 없습니다.</p>
            )}
            <button
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded-[12px] cursor-pointer'
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 구매하기 버튼 */}
      <div
        onClick={handleBuyButton}
        className='absolute bottom-0 left-0 w-full h-11 bg-[#fb4a4a] flex justify-center items-center text-white text-xs cursor-pointer'
      >
        <p>구매하기(냉장고 가기)</p>
      </div>
    </div>
  );
}
