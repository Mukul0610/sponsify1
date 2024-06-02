import { getAllCampaigns } from '@/lib/actions/campaign.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { formatDate, numToString } from '@/components/shared/funtions';
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"


const LatestSponsorship = async() => {
  const allCampaigns = await getAllCampaigns();
  const latestCampaigns = allCampaigns.sort((a:any, b:any) => new Date(b.uploadTime).valueOf()-new Date(a.uploadTime).valueOf())
  return (
    <div >
      <h2 className='text-3xl font-bold ml-4 lg:ml-0 text-neutral-800'>Latest Sponsorships </h2>
      
      <Carousel opts={{align: "end",}} className="w-[78%] py-2 lg:w-full md:w-full">
      <CarouselContent >
      {latestCampaigns.map((campaign: any) => (
                    <CarouselItem key={campaign._id} className='md:basis-1/3 lg:basis-1/4 ml-4 lg:ml-0 flex flex-col items-center'>
                    <Link href={`/sponsorships/${campaign._id}`} style={{ textDecoration: 'none',color:'black' }}>
                    <div className='flex flex-col justify-center mt-5 mb-5 w-[243px] gap-1' >
                    <div className="relative w-full h-0 pb-[95%]">
                    <Image src={campaign.thembnailImgUrl} alt='profile' layout="fill" objectFit="cover" className='rounded-2xl h-[100%]'/>
                    </div>
                    <p className='ml-2 font-semibold text-xs text-gray-400'>{formatDate(campaign?.uploadTime)}</p>
                      <p className='mt-1 ml-2 font-bold text-xl text-neutral-800'>{campaign.campaignName}</p>
                      <p className='ml-2 font-semibold text-zinc-600'>Min {numToString(campaign.minFolower)} Followers Required </p>
                      </div>
                    </Link>
                    </CarouselItem>
                  
                  ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
        </Carousel>
      </div>
    
  )
}

export default LatestSponsorship
