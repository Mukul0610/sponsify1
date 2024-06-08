import { getAllDealBySponId } from '@/lib/actions/addPost.action';
import { getCampaignById } from '@/lib/actions/campaign.action';
import Link from 'next/link';
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Pages = async ({ params }: any) => {
    const campaign = await getCampaignById(params.campaigndasbord);
    const deals = await getAllDealBySponId(params.campaigndasbord);
    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold text-neutral-700 flex justify-center'>{campaign[0].campaignName}</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center items-center mt-4'>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32 px-12'>
                    <p className='item-center font-semibold text-lg'>Amount You Are Spending on this Campaign</p>
                    <p>{campaign[0].creditUseForCampaign}</p>
                </div>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32'>
                    <p className='item-center font-semibold text-lg'>Remaning Amonunt</p>
                    <p>{Math.floor(campaign[0].amountUsed)}</p>
                </div>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32'>
                    <p className='item-center font-semibold text-lg'>Amount You Are Spending For 10K views</p>
                    <p>{campaign[0].price}</p>
                </div>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32'>
                    <Link href={campaign[0].promotionPostUrl} download target="_blank">
                        Post You are Promoting
                    </Link>
                </div>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32'>
                    <p className='item-center font-semibold text-lg'>Number of days you are going to Pay for a reel</p>
                    <p> {campaign[0].day}</p>
                </div>
                <div className='mt-2 text-center bg-gray-100 p-4 rounded-3xl h-32'>
                    <Link href={campaign[0].verificationImgUrl} download target="_blank">
                        Verifing Image for post
                    </Link>
                </div>
             </div>

            
            
             <Table className='mt-12'>
      <TableCaption>A list of your recent deals.</TableCaption>
      <TableHeader className='bg-gray-700'>
        <TableRow>
          <TableHead className="text-gray-100 font-semibold">Page Id</TableHead>
          <TableHead className="text-gray-100 font-semibold">Post Link</TableHead>
          <TableHead className="text-gray-100 font-semibold">Status</TableHead>
          <TableHead className="text-right text-gray-100 font-semibold">Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='bg-gray-50 hover:bg-gray-200'>
        {deals.map((deal:any) => (
          <TableRow key={deal._id}>
            <TableCell className="font-medium"><Link href={`https://www.instagram.com//${deal.pageUserName}`} style={{ textDecoration: 'none',color:'black' }} target="_blank" >{deal.pageUserName}</Link></TableCell>
            <TableCell><Link href={`${deal.postlink}`} style={{ textDecoration: 'none',color:'black' }} target="_blank" >{deal.postlink}</Link></TableCell>
            <TableCell>{deal.dealStatus}</TableCell>
            <TableCell className="text-right">{deal.pageAverageViews}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

        </div>
    )
}

export default Pages
