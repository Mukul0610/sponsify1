import { getAllInstaPages } from '@/lib/actions/instaPage.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"
import { numToString } from './funtions';

const PopularInfluencers = async() => {
  const allPages = await getAllInstaPages();
  const popularInfluencer = allPages.sort((a:any, b:any) => b.average_views - a.average_views)
  return (
    <div>
      <h2 className='text-3xl font-bold ml-4 lg:ml-0 text-neutral-800 gap-2 mb-4'>Popular Influencer</h2>
      <Carousel opts={{align: "end"}} className="w-[78%] py-2 lg:w-full md:w-full">
      <CarouselContent >
      {popularInfluencer.map((page: any) => (
                    <CarouselItem  key={page._id} className='md:basis-1/2 lg:basis-1/4 ml-4 lg:ml-0 flex flex-cols justify-center'>
                    <div className='flex flex-col justify-center w-60 p-4 bg-zinc-800 rounded-2xl shadow-lg shadow-zinc-800 hover:shadow-red-600'>
                    <Link href={`/influencers/${page._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center mt-5 mb-8 w-full items-center gap-1' >
                    <Image src={page.profile_pic_url} alt='profile' width={180} height={180} className='rounded-full border-8 border-zinc-800'/>
                    
                      <p className='mt-3 font-semibold text-neutral-300'>@{page.pageUserName}</p>
                      <p><span className='font-semibold text-neutral-300'>Followers: </span> <span className='text-gray-400 font-medium'>{numToString(page.followers)}</span></p>
                      <p><span className='font-semibold text-neutral-300'>Average Views: </span> <span className='text-gray-400 font-medium'>{numToString(page.average_views)}</span></p>
                      </div>
                    </Link>
                    </div>
                    </CarouselItem >
                  
                  ))}

</CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
        </Carousel>

    
    </div>
  )
}

export default PopularInfluencers