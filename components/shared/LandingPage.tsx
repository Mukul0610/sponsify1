import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import hero from '@/public/assets/icons/sponsify_hero.png';

const LandingPage = () => {
  return (
    <div className='w-[100%]'>
      <div className="relative flex justify-center min-h-screen">
        <Image 
          src={hero} 
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <nav className='absolute top-0 left-0 right-0 flex justify-between items-center h-16 w-full p-4 lg:px-16 bg-gray-800 bg-opacity-50 shadow-md rounded'>
          <Link href='/' className="flex items-center gap-2 md:py-2">
            <p className="font-extrabold text-4xl">
              SPON<span className="text-red-600">SIFY</span>
            </p>
          </Link>
          <Button asChild className='bg-white h-10 text-xl text-gray-900 font-bold '>
            <Link href='/sign-in'>
              Login | Signup
            </Link>
          </Button>
        </nav>
        <div className="absolute inset-0 flex mt-44 justify-center">
          <div className='flex align-center flex-col'><h1 className="text-white text-4xl flex justify-center font-extrabold"><span className='text-red-600 mr-3'>STREAMLINE</span>YOUR </h1>
          <h1 className='text-white text-4xl flex justify-center font-extrabold'>INFLUENCER<span className='text-blue-600 ml-3'>PARTNERSHIPS</span> </h1>
          <p className='flex justify-center'>AI-driven platform connecting brands and Instagram</p><p className='flex justify-center'>  influencers for effortless campaign management.</p>
          </div>
 
        </div>
      </div>
      <div><div className="relative overflow-hidden pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/aMWCE6nN_mM?si=659T_m1YWhvvqpL9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe></div></div>
    </div>
  );
};

export default LandingPage;
