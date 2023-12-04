import React from 'react';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'], weight: '800' });

export default function Hero() {
  return (
    <>
      <h1 className={`font-bold ${font.className} text-6xl`}>Discover and Share</h1>
    
      <p className={`font-bold text-6xl ${font.className} flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-orange-200 via-orange-500 to-orange-200`}>
        AI-Powered Prompts
      </p>
      <p className='my-3 font-extralight'>An open-source AI prompting tool for modern world to discover, create and share creative prompts</p>
    </>
  );
}
