import '@/app/globals.css';
import Header from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='min-h-[100dvh] w-full flex items-center justify-center bg-gray-300'>
          <div className='w-full max-w-[393px] h-[100dvh] max-h-[852px] bg-[#efd9bb] flex flex-col items-center'>
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
