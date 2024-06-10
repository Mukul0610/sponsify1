

import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getInstaPageByUserId } from '@/lib/actions/instaPage.action'
import { getUserById } from "@/lib/actions/user.actions";
import AddInstaPage from '@/components/shared/AddInstaPage';
import { getDealByUserId } from '@/lib/actions/deal.action';
import InstaPagesOfProfile from '@/components/shared/InstaPagesOfProfile';
import AllDeals from '@/components/shared/AllDeals';
import AllCampaign from '@/components/shared/AllCampaign';
import Pyment from '@/components/shared/Pyment';


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
        <div className="profile-balance mt-8">
          <div className='flex flex-col items-center mt-[-80px]'>
            <Image src={user.photo} alt="coins" width={100} height={100} className="rounded-full" />
            <p className='mt-2 text-center font-bold"'>{user.username}</p>
          </div >
          <h3 className="mt-5 font-bold">CREDITS AVAILABLE</h3>
          <div className='flex flex-col lg:flex-row lg:justify-between'>
            <div className="mt-4 flex  items-center gap-4">
              <Image src="/assets/icons/coins.svg" alt="coins" width={50} height={50} className="size-9 md:size-12" />
              <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
            </div>
            <Pyment/>
          </div>


          <InstaPagesOfProfile param={id} />
          <AddInstaPage param={id} />
          <AllDeals param={id} />
          <AllCampaign param={id} />
        </div>
      </section>
    </div>
  )
}

export default profile
