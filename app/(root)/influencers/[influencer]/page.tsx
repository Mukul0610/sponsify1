import { getInstaPageById } from '@/lib/actions/instaPage.action';
import Image from 'next/image';


import React from 'react'
const Pages = async({params}) => {
 
  const page = await getInstaPageById(params.influencer);
  
  
  
  return (
    <section className="profile">
      <div className="profile-balance">
       <h1>{page[0].followers}</h1>
       <div className='flex flex-col items-center mt-[-80px]'>
            <Image src={page[0].profile_pic_url} alt="coins" width={100} height={100} className="rounded-full" />
            <p className='mt-2 text-center font-bold"'>{page[0].pageUserName}</p>
            
          </div >
          <div>
          <p className='mt-2 text-center font-bold"'>{page[0].full_name}</p>
            <p className='mt-2 text-center font-bold"'>{page[0].followers}</p>
            <p className='mt-2 text-center font-bold"'>{page[0].following}</p>
            <p className='mt-2 text-center font-bold"'>{page[0].media_count}</p>
            <p className='mt-2 text-center font-bold"'>{page[0].bio}</p>
            <p className='mt-2 text-center font-bold"'>{page[0].average_views}</p>
          </div>
      </div>
    </section>
  )
}

export default Pages;
