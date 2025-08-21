import RecipeList from '@/app/components/RecipeList';
import { Suspense } from 'react';

export default function RecipesPage() {
  return (
    <div className='p-4 w-[393px] md:h-[calc(100dvh-78px)] md:max-h-[758px] overflow-y-scroll [&::-webkit-scrollbar]:hidden h-[calc(100dvh-3rem)] max-h-[calc(852px-4rem)]'>
      <Suspense>
        <RecipeList />
      </Suspense>
    </div>
  );
}
