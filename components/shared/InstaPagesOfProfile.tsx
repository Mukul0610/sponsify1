import { deleteInstaPage, getInstaPageByUserId } from '@/lib/actions/instaPage.action';
import React from 'react'
import { numToString } from './funtions';
import { useRouter } from 'next/navigation';
import DeleatInstaPage from './DeleatInstaPage';
interface InstaPagesOfProfile {
    param: string; // Assuming param is a string, change type as per your requirement
  }
  

const InstaPagesOfProfile: React.FC<InstaPagesOfProfile> = async({ param })=> {
  
    const pages = await getInstaPageByUserId(param);

  
  return (
    <div className='mt-8 shadow-xl rounded-xl bg-gray-200'>
    {pages ?
      <div className='width-full  p-3 pl-4 mt-2 mb-6'>
        <h2 className='text-2xl flex justify-center font-bold'>Your Insta Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-x-12 md:gap-x-12 gap-y-12 md:gap-y-0 py-5 md:py-8 text-gray-700 text-lg md:text-base font-semibold">
          <p>Page User Name</p>
          <p>Full Name</p>
          <p>Followers </p>
          <p>Following</p>
          <p>No. Of Posts</p>
          
          <p>Average Views</p>
          <p>Remove</p>
        </div>
        <hr />
        <div>
          {pages.map((page: any) => (
            <div key={page._id}>
            <div  className="grid grid-cols-1 md:grid-cols-7 items-center gap-x-12 md:gap-x-12 gap-y-12 md:gap-y-0 py-5 md:py-8 text-gray-700 text-lg md:text-base font-semibold">

              <p>{page.pageUserName}</p>
              <p>{page.full_name}</p>
              <p>{numToString(page.followers)} </p>
              
              <p>{page.following}</p>
              <p>{page.media_count}</p>
              
              <p>{numToString(page.average_views)}</p>
              <DeleatInstaPage pageName={page.pageUserName} pageId={page._id}/>
            </div>
            <hr/>
            </div>
          
          ))}


        </div>

      </div> :
      <div></div>
    }

  </div>
  )
}

export default InstaPagesOfProfile
