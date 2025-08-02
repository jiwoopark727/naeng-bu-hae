import RecipeList from '@/app/components/RecipeList';
import { Suspense } from 'react';

export default function RecipesPage() {
  return (
    <div className='p-4 relative w-[393px] h-[756px] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
      <Suspense>
        <RecipeList />
      </Suspense>
    </div>
  );
}
