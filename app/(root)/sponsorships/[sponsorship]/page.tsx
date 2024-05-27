import PageVerificationButton from '@/components/shared/PageVerificationButton';
import { formatDate, numToString } from '@/components/shared/funtions';
import { getCampaignById } from '@/lib/actions/campaign.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import Image from 'next/image';
import React from 'react'
import { getUserById } from '@/lib/actions/user.actions';
import { getInstaPageByUserId } from '@/lib/actions/instaPage.action';

const Pages = async({params}:any) => {
    const campaign = await getCampaignById(params.sponsorship);
    const { userId } = auth();
    if (!userId) redirect("/sign-in");
    const user = await getUserById(userId);
    const id = user._id
    const sponid=params.sponsorship
  return (
    <div>
      <div>
        <Image src={campaign[0].thembnailImgUrl} width={600} height={500} className='border-[32px] p-1 border-neutral-800 rounded-3xl' alt=""/>
        <div className='ml-6 mt-8 flex flex-col gap-6 w-[56%]'>
        <p className='text-3xl font-bold text-neutral-700'>{campaign[0].campaignName}</p>
        <p className='text-lg text-neutral-500'>{formatDate(campaign[0].uploadTime)}</p>
        <p className='bg-gray-300 px-4 py-1 rounded-full w-20 text-neutral-700 font-semibold'>₹{campaign[0].price*100}</p>
        
        <div className='w-full'>
        <PageVerificationButton param={id} sponId={sponid}/>
        </div>
        <div className='mt-2'>
            <h2 className='text-xl font-bold text-neutral-700'>Minimum followers</h2>
            <p className='text-neutral-500 font-semibold mt-1'>{numToString(campaign[0].minFolower)}</p>
        </div>
        <div className='mt-2'>
            <h2 className='text-xl font-bold text-neutral-700'>Average Views</h2>
            <p className='text-neutral-500 font-semibold mt-1'>{numToString(campaign[0].averageViews)}</p>
        </div>
        <div className='mt-2'>
            <h2 className='text-xl font-bold text-neutral-700'>Payable Days For A Post</h2>
            <p className='text-neutral-500 font-semibold mt-1'>{campaign[0].day} days</p>
        </div>
        <div className='mt-2'>
            <h2 className='text-xl font-bold text-neutral-700'>Preferred gender</h2>
            <p className='text-neutral-500 font-semibold mt-1'>{campaign[0].preferredGender}</p>
        </div>
        <div className='mt-2'>
        <h2 className='text-xl font-bold text-neutral-700'>Catagories</h2>
        <p className='text-neutral-500 font-semibold mt-3'>{campaign[0].categories.map((category:any)=>(<span key={category} className='bg-gray-300 px-4 py-1 mr-2 rounded-full text-neutral-700 font-semibold'>{category}</span>))}</p>
        </div>
        <div className='mt-2'>
            <h2 className='text-xl font-bold text-neutral-700'>Description</h2>
            <p className='text-neutral-500 font-semibold mt-1'>{campaign[0].description}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Pages
