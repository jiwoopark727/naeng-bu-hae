export default function IngredientList() {
  return (
    <div className='absolute top-50 right-5 z-20 text-md text-black w-70 h-130 bg-white rounded-[15px] opacity-95 p-4'>
      <div className='relative w-full h-full'>
        <h1 className='text-lg font-semibold mb-4'>냉장고에 있는 재료</h1>

        <div className='text-[13px]'>
          <ul>
            <li>
              <span className='mr-1'>✅</span>
              <span>다진 마늘</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>김치</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>두부</span>
            </li>
            <li>
              <span className='mr-1'>✅</span>
              <span>돼지 앞다리살</span>
            </li>
          </ul>
        </div>

        <button className='w-full bg-blue-400 text-sm font-bold text-white py-2 rounded-[10px] hover:bg-blue-600 transition absolute bottom-0'>
          레시피 추천
        </button>
      </div>
    </div>
  );
}
