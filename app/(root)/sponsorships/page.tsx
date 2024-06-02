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
      <h2 className='text-4xl mb-4 ml-6 lg:ml-0 font-extrabold text-neutral-700'>SPONSORSHIPS</h2>
      <hr className='shadow-lg h-2 ml-6 lg:ml-0'/>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
      {latestCampaigns.map((campaign: any) => (
                    <div key={campaign._id} className='flex flex-col justify-center items-center'>
                    <Link href={`/sponsorships/${campaign._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center mt-5 mb-5 w-[243px] gap-1' >
                    <div className="relative w-full h-0 pb-[100%]">
                    <Image src={campaign.thembnailImgUrl} alt='profile' layout="fill" objectFit="cover" className='relative rounded-2xl h-[100%]'/>
                    </div>
                      <p className='ml-2 font-semibold text-xs text-gray-400'>{formatDate(campaign?.uploadTime)}</p>
                      <p className='mt-1 ml-2 font-bold text-xl text-neutral-800'>{campaign.campaignName}</p>
                      <p className='ml-2 font-semibold text-sm text-zinc-600'>Min {numToString(campaign.minFolower)} Followers Required </p>
                      </div>
                    </Link>
                    </div>
                  
                  ))}

      </div>
    </div>
  )
}

export default sponsorships
