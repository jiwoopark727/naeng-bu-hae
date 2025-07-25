import '@/app/globals.css';

export default function RecipeListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full'>
      <main className='w-full h-full flex justify-center'>{children}</main>
    </div>
  );
}
