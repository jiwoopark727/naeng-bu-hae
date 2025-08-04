import React from 'react';

interface CartModalProps {
  cart: Set<string>;
  setCart: React.Dispatch<React.SetStateAction<Set<string>>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({
  cart,
  setCart,
  showModal,
  setShowModal,
}) => {
  if (!showModal) return null;

  const removeFromCart = (itemToRemove: string) => {
    // Set은 직접 변경하면 안된대서 새 Set 생성
    const updatedCart = new Set(cart);
    updatedCart.delete(itemToRemove);
    setCart(updatedCart);
  };

  return (
    <div className='absolute left-35 bottom-54 flex justify-center items-center z-50'>
      <div className='bg-white w-[240px] p-4 rounded-[15px] shadow-lg'>
        <h2 className='text-sm font-bold mb-4'>🛒 장바구니</h2>
        {Array.from(cart).length > 0 ? (
          <ul className='list-disc pl-4 space-y-2'>
            {Array.from(cart).map((item) => (
              <li
                key={item}
                className='flex justify-between items-center text-xs'
              >
                <span>{item}</span>
                <button
                  className='ml-2 text-xs text-red-500 hover:underline cursor-pointer'
                  onClick={() => removeFromCart(item)}
                >
                  제거
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-xs'>장바구니에 담긴 재료가 없습니다.</p>
        )}
        <button
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded-[12px] cursor-pointer w-full text-sm'
          onClick={() => setShowModal(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CartModal;
