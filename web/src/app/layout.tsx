import './globals.css';
import { 
  Roboto_Flex as Roboto, 
  Bai_Jamjuree as BaiJamjuree 
} from 'next/font/google';

import { cookies } from 'next/headers';

import { Hero } from '@/components/Hero';
import { SignIn } from '@/components/SignIn';
import { Profile } from '@/components/Profile';
import { Copyright } from '@/components/Copyright';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree'});

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token');
  
  return (
    <html lang="en">
      <body 
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}
      >
        <main className="grid grid-cols-2 min-h-screen">

        {/* Sessão da Esquerda */}
        <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
      
          {/* Blur */}
          <div className="absolute right-0 top-1/2 translate-x-1/2 h-[288px] w-[526px] -translate-y-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
          
          {/* Stripes */}
          <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />
        
          {/* Logo: ícone do usuário */}
          {isAuthenticated ? <Profile /> : <SignIn />}     

          {/* Logo: nlw spacetime */}
          <Hero />          

          {/* Copyright */}
          <Copyright />          
        </div>

        {/* Sessão da Direita */}
        <div className="flex overflow-y-scroll max-h-screen flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
          {/* onde vai aparecer o conteúdo específico de cada page */}
          {children}
        </div>
      </main>
      </body>
    </html>
  );
}
