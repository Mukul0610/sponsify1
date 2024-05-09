

import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getInstaPageByUserId } from '@/lib/actions/instaPage.action'
import { getUserById } from "@/lib/actions/user.actions";
import AddInstaPage from '@/components/shared/AddInstaPage';


const profile = async () => {

  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const id = user._id
  if (!id) redirect("/sign-in");
  const pages = await getInstaPageByUserId(id);
  return (
    <div>
      <section className="profile">
        <div className="profile-balance">
          <div className='flex flex-col items-center mt-[-80px]'>
            <Image src={user.photo} alt="coins" width={100} height={100} className="rounded-full" />
            <p className='mt-2 text-center font-bold"'>{user.username}</p>
          </div >
          <h3 className="mt-5 font-bold">CREDITS AVAILABLE</h3>
          <div className="mt-4 flex  items-center gap-4">
            <Image src="/assets/icons/coins.svg" alt="coins" width={50} height={50} className="size-9 md:size-12" />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
              </div>
              <div>
            {pages ?
              <div className='width-full  p-3 pl-4 mt-8'>
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
                      <p>{page.followers} </p>
                      <p>{page.following}</p>
                      <p>{page.media_count}</p>
                      
                      <p>{page.average_views}</p>
                      <p><img src="/assets/icons/remove_icon.png" alt="" /></p>
                    </div>
                    <hr/>
                    </div>
                  
                  ))}


                </div>
              </div> :
              <div></div>
            }

          </div>
          <AddInstaPage param={id} />
        </div>
      </section>
    </div>
  )
}

export default profile
