import { getAllCampaigns } from '@/lib/actions/campaign.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { formatDate, numToString } from '@/components/shared/funtions';

const sponsorships = async() => {
  const allCampaigns = await getAllCampaigns();
  const latestCampaigns = allCampaigns.sort((a:any, b:any) => new Date(b.uploadTime).valueOf()-new Date(a.uploadTime).valueOf())
  return (
    <div>
      <h2 className='text-4xl mb-4 font-extrabold text-neutral-700'>SPONSORSHIPS</h2>
      <hr className='shadow-lg h-2 '/>
      <div className='grid grid-cols-4 gap-1 '>
      {latestCampaigns.map((campaign: any) => (
                    <div key={campaign._id} className='flex flex-col justify-center w-60 gap-1'>
                    <Link href={`/sponsorships/${campaign._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center mt-5 mb-5 w-full gap-1' >
                    <Image src={campaign.thembnailImgUrl} alt='profile' width={240} height={180} className='rounded-2xl'/>
                      <p className='ml-2 font-semibold text-xs text-gray-400'>{formatDate(campaign?.uploadTime)}</p>
                      <p className='mt-1 ml-2 font-bold text-xl text-neutral-800'>{campaign.campaignName}</p>
                      <p className='ml-2 font-semibold text-zinc-600'>Min {numToString(campaign.minFolower)} Followers Required </p>
                      </div>
                    </Link>
                    </div>
                  
                  ))}

      </div>
    </div>
  )
}

export default sponsorships
