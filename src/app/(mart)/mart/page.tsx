'use client';

import Image from 'next/image';
import MartBackground from '../../../../public/assets/images/MartBackground1.jpg';
import CartWoman from '../../../../public/assets/images/CartWoman.png';
import { useEffect, useState } from 'react';
import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 임시 구매 가능한 재료
const availableItems = [
  { category: '채소', name: '가지' },
  { category: '채소', name: '감자' },
  { category: '채소', name: '고구마' },
  { category: '채소', name: '고추' },
  { category: '채소', name: '당근' },
  { category: '채소', name: '대파' },
  { category: '채소', name: '도라지' },
  { category: '채소', name: '마늘' },
  { category: '채소', name: '무' },
  { category: '채소', name: '미나리' },
  { category: '채소', name: '방울토마토' },
  { category: '채소', name: '버섯' },
  { category: '채소', name: '부추' },
  { category: '채소', name: '브로콜리' },
  { category: '채소', name: '비트' },
  { category: '채소', name: '상추' },
  { category: '채소', name: '생강' },
  { category: '채소', name: '셀러리' },
  { category: '채소', name: '시금치' },
  { category: '채소', name: '아스파라거스' },
  { category: '채소', name: '애호박' },
  { category: '채소', name: '양배추' },
  { category: '채소', name: '양상추' },
  { category: '채소', name: '양파' },
  { category: '채소', name: '열무' },
  { category: '채소', name: '오이' },
  { category: '채소', name: '옥수수' },
  { category: '채소', name: '완두콩' },
  { category: '채소', name: '우엉' },
  { category: '채소', name: '청경채' },
  { category: '채소', name: '청양고추' },
  { category: '채소', name: '참나물' },
  { category: '채소', name: '쪽파' },
  { category: '채소', name: '케일' },
  { category: '채소', name: '콩나물' },
  { category: '채소', name: '토마토' },
  { category: '채소', name: '파' },
  { category: '채소', name: '파프리카' },
  { category: '채소', name: '피망' },
  { category: '채소', name: '호박' },

  { category: '육류', name: '소고기' },
  { category: '육류', name: '돼지고기' },
  { category: '육류', name: '닭고기' },
  { category: '육류', name: '양고기' },
  { category: '육류', name: '베이컨' },
  { category: '육류', name: '소시지' },
  { category: '육류', name: '햄' },
  { category: '육류', name: '훈제오리' },
  { category: '육류', name: '닭가슴살' },
  { category: '육류', name: '닭다리살' },
  { category: '육류', name: '불고기용 소고기' },
  { category: '육류', name: '갈비' },
  { category: '육류', name: '삼겹살' },
  { category: '육류', name: '목살' },
  { category: '육류', name: '안심' },
  { category: '육류', name: '등심' },
  { category: '육류', name: '스팸' },
  { category: '육류', name: '차돌박이' },
  { category: '육류', name: '떡갈비' },
  { category: '육류', name: '미트볼' },

  { category: '해산물', name: '새우' },
  { category: '해산물', name: '오징어' },
  { category: '해산물', name: '문어' },
  { category: '해산물', name: '홍합' },
  { category: '해산물', name: '바지락' },
  { category: '해산물', name: '조개' },
  { category: '해산물', name: '게' },
  { category: '해산물', name: '꽃게' },
  { category: '해산물', name: '낙지' },
  { category: '해산물', name: '가리비' },
  { category: '해산물', name: '연어' },
  { category: '해산물', name: '고등어' },
  { category: '해산물', name: '참치' },
  { category: '해산물', name: '꽁치' },
  { category: '해산물', name: '멸치' },
  { category: '해산물', name: '건새우' },
  { category: '해산물', name: '쭈꾸미' },
  { category: '해산물', name: '미역' },
  { category: '해산물', name: '다시마' },

  { category: '유제품', name: '우유' },
  { category: '유제품', name: '치즈' },
  { category: '유제품', name: '슬라이스 치즈' },
  { category: '유제품', name: '모짜렐라 치즈' },
  { category: '유제품', name: '체다 치즈' },
  { category: '유제품', name: '버터' },
  { category: '유제품', name: '생크림' },
  { category: '유제품', name: '휘핑크림' },
  { category: '유제품', name: '요거트' },
  { category: '유제품', name: '그릭요거트' },
  { category: '유제품', name: '크림치즈' },
  { category: '유제품', name: '연유' },

  { category: '양념', name: '소금' },
  { category: '양념', name: '설탕' },
  { category: '양념', name: '간장' },
  { category: '양념', name: '고추장' },
  { category: '양념', name: '된장' },
  { category: '양념', name: '식초' },
  { category: '양념', name: '참기름' },
  { category: '양념', name: '들기름' },
  { category: '양념', name: '후추' },
  { category: '양념', name: '고춧가루' },
  { category: '양념', name: '다진마늘' },
  { category: '양념', name: '생강가루' },
  { category: '양념', name: '맛술' },
  { category: '양념', name: '미림' },
  { category: '양념', name: '설탕시럽' },
  { category: '양념', name: '케찹' },
  { category: '양념', name: '마요네즈' },
  { category: '양념', name: '굴소스' },
  { category: '양념', name: '스리라차' },
  { category: '양념', name: '허브솔트' },

  { category: '기타', name: '라면' },
  { category: '기타', name: '밥' },
  { category: '기타', name: '계란' },
  { category: '기타', name: '떡' },
  { category: '기타', name: '두부' },
  { category: '기타', name: '유부' },
  { category: '기타', name: '어묵' },
  { category: '기타', name: '만두' },
  { category: '기타', name: '국수' },
  { category: '기타', name: '당면' },
  { category: '기타', name: '건면' },
  { category: '기타', name: '우동면' },
  { category: '기타', name: '파스타면' },
  { category: '기타', name: '김' },
  { category: '기타', name: '김치' },
  { category: '기타', name: '치즈스틱' },
  { category: '기타', name: '식빵' },
  { category: '기타', name: '핫도그' },
  { category: '기타', name: '떡볶이떡' },
  { category: '기타', name: '잡곡' },
  { category: '기타', name: '통조림참치' },
  { category: '기타', name: '스팸' },
  { category: '기타', name: '깻잎' },
  { category: '기타', name: '카레가루' },
  { category: '기타', name: '빵가루' },
  { category: '기타', name: '떡국떡' },
];

const ItemCategory = ['채소', '육류', '해산물', '유제품', '양념', '기타'];

export default function MartPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [cate, setCate] = useState(ItemCategory[0]);
  const [keyword, setKeyword] = useState<string>('');
  const [search, setSearch] = useState<boolean>(false);

  const filteredItems = availableItems.filter((item) => item.category === cate);
  const searchedItems = availableItems.filter((item) => item.name === keyword);

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

  //구매 버튼 함수
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

  // 검색 입력 값 keyword state 변수 onChange 설정
  const handleInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSearch(false);
  };

  //검색 버튼 눌렀을 때 동작하는 함수
  const handleSearchButton = () => {
    setSearch(true);
    setCate(searchedItems[0].category);
  };

  // 돋보기 옆 x버튼 클릭시 input value 초기화 검색상태도 false
  const handleXButton = () => {
    setKeyword('');
    setSearch(false);
  };

  // 검색을 이미 했고 그리고 슬라이드 좌우 버튼을 눌럿을때
  const handleSlideButton = () => {
    setSearch(false);
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
      <div className='absolute w-[95%] h-[53%] top-2.5 left-2.5 p-4 rounded shadow-md bg-[#ffffff9f] '>
        <h3 className='flex justify-center mb-5 font-bold'>마트 재료 목록</h3>

        {/* 검색창 */}
        <div className='relative flex justify-center'>
          <input
            type='text'
            placeholder='재료 검색'
            value={keyword}
            onChange={handleInputKeyword}
            className='w-52 border-b border-[#000] text-sm mb-4 p-0.5'
          />
          {/* x 버튼 검색어 지우는 */}
          <span>
            <FontAwesomeIcon
              icon={faXmark}
              className='text-xs absolute right-23 bottom-5.5 cursor-pointer'
              onClick={handleXButton}
            ></FontAwesomeIcon>
          </span>
          {/* 돋보기(검색 버튼) */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='absolute right-17 bottom-5 cursor-pointer'
            onClick={handleSearchButton}
          />
        </div>

        {/* 슬라이드 좌우 버튼 + 카테고리 이름 */}
        <div className='flex justify-between mb-2'>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='이전 카테고리'
            onClick={() => {
              prevCategory();
              handleSlideButton();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} className='w-5 h-5' />
          </button>
          <span>{cate}</span>
          <button
            type='button'
            className='cursor-pointer text-gray-600 hover:text-gray-900'
            aria-label='다음 카테고리'
            onClick={() => {
              nextCategory();
              handleSlideButton();
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} className='w-5 h-5' />
          </button>
        </div>

        {/* 재료 목록들 */}
        <div className='max-h-[250px] overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[11px] mt-5'>
          <ul className='grid grid-cols-3 gap-x-3 gap-y-2'>
            {search
              ? searchedItems.map((item) => (
                  <li key={item.name} className='flex items-center'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        checked={cart.has(item.name)}
                        onChange={() => toggleCartItem(item.name)}
                        className='w-4 h-4 accent-blue-500 mr-1.5'
                      />
                      <label htmlFor={item.name}>{item.name}</label>
                    </div>
                  </li>
                ))
              : filteredItems.map((item) => (
                  <li key={item.name} className='flex items-center'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        checked={cart.has(item.name)}
                        onChange={() => toggleCartItem(item.name)}
                        className='w-4 h-4 accent-blue-500 mr-1.5'
                      />
                      <label htmlFor={item.name}>{item.name}</label>
                    </div>
                  </li>
                ))}
          </ul>
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
