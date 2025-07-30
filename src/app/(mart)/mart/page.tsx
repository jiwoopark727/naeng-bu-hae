'use client';

import Image from 'next/image';
import MartBackground from '../../../../public/assets/images/MartBackground1.jpg';
import CartWoman from '../../../../public/assets/images/CartWoman.png';
import { useEffect, useState } from 'react';
import { faAngleLeft, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 임시 구매 가능한 재료
// const availableItems = ['양파', '계란', '감자', '마늘', '토마토', '마라', '버섯'];
const availableItems = [
  { category: '채소', name: '양파' },
  { category: '채소', name: '대파' },
  { category: '채소', name: '당근' },
  { category: '채소', name: '마늘' },
  { category: '채소', name: '감자' },

  { category: '육류', name: '소고기' },
  { category: '육류', name: '돼지고기' },
  { category: '육류', name: '닭고기' },
  { category: '육류', name: '스팸' },
  { category: '육류', name: '베이컨' },

  { category: '해산물', name: '오징어' },
  { category: '해산물', name: '새우' },
  { category: '해산물', name: '참치' },
  { category: '해산물', name: '홍합' },

  { category: '유제품', name: '치즈' },
  { category: '유제품', name: '버터' },
  { category: '유제품', name: '우유' },

  { category: '양념', name: '간장' },
  { category: '양념', name: '고추장' },
  { category: '양념', name: '된장' },
  { category: '양념', name: '소금' },
  { category: '양념', name: '설탕' },
  { category: '양념', name: '참기름' },
  { category: '양념', name: '식초' },
  { category: '양념', name: '후추' },

  { category: '기타', name: '라면' },
  { category: '기타', name: '밥' },
  { category: '기타', name: '계란' },
  { category: '기타', name: '떡' },
];

const ItemCategory = ['채소', '육류', '해산물', '유제품', '양념', '기타'];

export default function MartPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [cate, setCate] = useState(ItemCategory[0]);

  const filteredItems = availableItems.filter((item) => item.category === cate);

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

  const prevCategory = () => {
    setIndex((prev) => {
      const newIndex = prev === 0 ? ItemCategory.length - 1 : prev - 1;
      setCate(ItemCategory[newIndex]);
      return newIndex;
    });
  };

  const nextCategory = () => {
    setIndex((prev) => {
      const newIndex = prev === ItemCategory.length - 1 ? 0 : prev + 1;
      setCate(ItemCategory[newIndex]);
      return newIndex;
    });
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
      <div className='absolute w-[95%] h-[45%] top-2.5 left-2.5 p-4 rounded shadow-md bg-[#ffffff9f] '>
        <h3 className='flex justify-center mb-5 font-bold'>마트 재료 목록</h3>
        {/* <div className='relative flex justify-center'>
          <input
            type='text'
            placeholder='재료 검색'
            className='w-52 border-b border-[#000] text-xs mb-4'
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='w-3 h-3 absolute right-17 bottom-5'
          />
        </div> */}
        <div className='flex justify-between mb-2'>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='이전 카테고리'
            onClick={prevCategory}
          >
            <FontAwesomeIcon icon={faAngleLeft} className='w-5 h-5' />
          </button>
          <span>{cate}</span>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='다음 카테고리'
            onClick={nextCategory}
          >
            <FontAwesomeIcon icon={faAngleRight} className='w-5 h-5' />
          </button>
        </div>
        <div className='max-h-[250px] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
          {filteredItems.map((item) => (
            <div key={item.name} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={cart.has(item.name)}
                onChange={() => toggleCartItem(item.name)}
                className='w-4 h-4 accent-blue-500 mr-1.5'
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
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
