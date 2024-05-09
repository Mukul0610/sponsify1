import { getAllInstaPages } from '@/lib/actions/instaPage.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const influencers = async() => {
  const allPages = await getAllInstaPages();
  return (
    <div>
      <h2 className='text-4xl mb-4 font-bold text-[#0a0a0a]'>INFLUENCERS</h2>
      <hr className='shadow-lg h-2 '/>
      <div className='grid grid-cols-4 gap-1 mt-10'>
      {allPages.map((page: any) => (
                    <div key={page._id} className='flex flex-col justify-center'>
                    <Link href={`/influencers/${page._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center w-full items-center gap-1' >
                    <Image src={page.profile_pic_url} alt='profile' width={220} height={220} className='rounded-full border-8 shadow-lg shadow-neutral-800 border-neutral-700'/>
                    
                      <p className='mt-3 font-semibold'>@{page.pageUserName}</p>
                      <p><span className='font-semibold'>Followers: </span> <span className='text-gray-500 font-medium'>{page.followers}</span></p>
                      <p><span className='font-semibold'>Average Views: </span> <span className='text-gray-500 font-medium'>{page.average_views}</span></p>
                      </div>
                    </Link>
                    </div>
                  
                  ))}

      </div>

    
    </div>
  )
}

export default influencers
