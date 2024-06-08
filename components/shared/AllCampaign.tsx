import { getCampaignByUserId } from '@/lib/actions/campaign.action';
import Link from 'next/link';
import React from 'react'

interface AllCampaignsProps {
    param: string; // Assuming param is a string, change type as per your requirement
  }


const AllCampaign: React.FC<AllCampaignsProps> = async({ param })=>  {
    const campaigns = await getCampaignByUserId(param);
  return (
    <div className='bg-gray-100 mt-8 lg:w-[50%] md:w-[80%] rounded-xl pb-4 pt-4'>
        <h1 className='text-2xl font-bold text-neutral-800 flex justify-center'>Your Campaigns</h1>
        {campaigns.map((campaign:any)=>(
        <div key={campaign._id} className='bg-gray-300 font-semibold rounded-sm text-neutral-800 h-10 flex items-center p-2 ml-8 m-2 mr-8 pl-8'>
            <Link href={`/profile/${campaign._id}`} style={{ textDecoration: 'none',color:'black' }}>{campaign.campaignName}</Link>
        </div>
      ))}
      
    </div>
  )
}

export default AllCampaign
