import { numToString } from '@/components/shared/funtions';
import { getAllInstaPages } from '@/lib/actions/instaPage.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const influencers = async() => {
  const allPages = await getAllInstaPages();
  const popularInfluencer = allPages.sort((a:any, b:any) => b.followers - a.followers)
  return (
    <div>
      <h2 className='text-4xl mb-4 ml-6 lg:ml-0 font-extrabold text-neutral-700'>INFLUENCERS</h2>
      <hr className='shadow-lg h-2  '/>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-2 ml-[20%]'>
      {popularInfluencer.map((page: any) => (
                    <div key={page._id} className='flex flex-col justify-center items-center w-60 p-4 bg-zinc-800 rounded-2xl shadow-lg shadow-zinc-800 hover:shadow-red-600'>
                    <Link href={`/influencers/${page._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center mt-5 mb-8 w-full items-center gap-1' >
                    <Image src={page.profile_pic_url} alt='profile' width={180} height={180} className='rounded-full border-8 border-zinc-800'/>
                    
                      <p className='mt-3 font-semibold text-neutral-300'>@{page.pageUserName}</p>
                      <p><span className='font-semibold text-neutral-300'>Followers: </span> <span className='text-gray-400 font-medium'>{numToString(page.followers)}</span></p>
                      <p><span className='font-semibold text-neutral-300'>Average Views: </span> <span className='text-gray-400 font-medium'>{numToString(page.average_views)}</span></p>
                      </div>
                    </Link>
                    </div>
                  
                  ))}

      </div>

    
    </div>
  )
}

export default influencers
