import { numToString } from '@/components/shared/funtions';
import { getInstaPageById } from '@/lib/actions/instaPage.action';
import Image from 'next/image';


import React from 'react'
const Pages = async({params}:any) => {
 
  const page = await getInstaPageById(params.influencer);
  
  
  
  return (
    <section className="profile ">
    <div className="profile-balance mt-16 " >
       <div className='flex flex-col items-center mt-[-120px]'>
            <Image src={page[0].profile_pic_url} alt="coins" width={160} height={160} className="rounded-full border-8 shadow-lg shadow-neutral-800 border-neutral-700" />
            <p className='mt-2 text-center font-semibold'>{page[0].pageUserName}</p>
            
          </div >
          <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Owner Name</span><br/><span>{page[0].full_name}</span></p>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Followers</span><br/><span>{numToString(page[0].followers)}</span></p>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Followings</span><br/><span>{page[0].following}</span></p>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Average Views</span><br/><span>{numToString(page[0].average_views)}</span></p>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Media</span><br/><span>{page[0].media_count}</span></p>
            <p className='mt-2 text-center bg-gray-100 p-4 rounded-3xl'><span className='font-extrabold'>Bio</span><br/><span>{page[0].bio}</span></p>
           
          </div>
      </div>
    </section>
  )
}

export default Pages;
