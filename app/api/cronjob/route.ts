import { getAllDealNeedToUpdate, updatePostViews } from "@/lib/actions/addPost.action";
import { getCampaignById, updateCampaign } from "@/lib/actions/campaign.action";
import { updateCredits } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";






export async function GET(request: Request) {
    const deals = await getAllDealNeedToUpdate();
    if(deals && deals.length > 0){
        for(let i=0;i<deals.length;i++){
            const response = await fetch(`http://127.0.0.1:5000/views?url=${deals[i].postlink}`);
            const maindata = await response.json();
            const campaign:any = await getCampaignById(deals[i].sponId);
            if(campaign && maindata){
                const userPostViews= await updatePostViews(deals[i],maindata.views)
                const updateAmountUsed = campaign[0].amountUsed + deals[i].prices*( deals[i].pageAverageViews-maindata.views) * 0.0001;
                await updateCampaign(deals[i].sponId, updateAmountUsed);
                const updatedCredit=deals[i].prices*maindata.views*0.0001;
                const userUpdate= await updateCredits(deals[i].userId,updatedCredit);
                
            }       
        
        }
        }
    
    
    
    return NextResponse.json({
      deals
    });
}