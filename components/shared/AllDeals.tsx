import { getCampaignById } from '@/lib/actions/campaign.action';
import { getDealByUserId } from '@/lib/actions/deal.action';
import React from 'react'
import Deals from './Deals';

interface AllDealsProps {
    param: string; // Assuming param is a string, change type as per your requirement
  }
const AllDeals: React.FC<AllDealsProps> = async({ param })=>  {
    const deals = await getDealByUserId(param);
  return (
    <div>
      {deals.map((deal:any)=>(
        <div key={deal._id}>
            <Deals userId={param} pageId={deal.pageId} sponId={deal.sponsorshipId}/>
        </div>
      ))}
    </div>
  )
}

export default AllDeals
