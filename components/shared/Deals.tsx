"use client"

import { getCampaignById, updateCampaign } from '@/lib/actions/campaign.action';
import { getInstaPageById } from '@/lib/actions/instaPage.action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import { createPost } from '@/lib/actions/addPost.action';


interface DealsProps {
    pageId: string;
    sponId:string,
    userId:string, // Assuming param is a string, change type as per your requirement
  }
const Deals: React.FC<DealsProps> = ({  userId, pageId, sponId}) =>  {
const [pages,setPage]=useState([{
  pageUserName:'Loading...',
  average_views:0,
}]);

const [campaigns,setCampaigns]=useState([{
  campaignName:"Loading...",
  promotionPostUrl:"mukul",
  amountUsed:0,
  price:0,
  verificationImgUrl:"mukul",
  day:0
}]); 
const [addpost,setAddPost]=useState(false)
const [post,setPost]=useState("")
const [result,setResult]=useState(false)


const addPost =(pageViews:number,sponamount:number,price:number)=>{
  if(price*0.0001*pageViews < sponamount){
    setAddPost(true)
  }
  else{
    alert("Sorry This Campaing doesn't Have enough credit to Pay this page, you can try with another page with less averge views ")
  }
}

const router = useRouter()
//deal data adding and verifying posts
const handleSubmite=async(e:string,post:string,day:number,views:number,amountRemaining:number,price:number)=>{
    try {
      // Fetch data from the API
      const response = await fetch(`http://127.0.0.1:5000/process?reel_url=${post}&input_image_path=${e}`);
      const maindata = await response.json();
  
      // Assuming setResult is a function to update some state with the fetched da
      console.log(maindata);
  
      if (maindata) {
        // Prepare data for the new post
        const data = {
          userId: userId,
          sponsorshipId: sponId,
          pageId: pageId,
          postlink: post,
          paymentTime: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
          pageAverageViews: views
        };
  
        // Create a new post
        const newPost = await createPost(data);
        alert("Your Post Is Submitted");
  
        // Update the amount used in the campaign
        const updateAmountUsed = amountRemaining - price * views * 0.0001;
        await updateCampaign(sponId, { amountUsed: updateAmountUsed });
  
        // Refresh the router to reflect changes
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  };
  
    useEffect(() => {
      const fetchData = async () => {
        const campaign = await getCampaignById(sponId);
        const page = await getInstaPageById(pageId);
        setPage(page)
        setCampaigns(campaign)
      }
      fetchData()
    }, [])
  return (
    <div className='w-[80%] mt-8 shadow-xl rounded-xl bg-gray-200 p-8 flex flex-col gap-6'>
      <div className='flex flex-row'>
     <p className='font-semibold text-xl'>
      Campaign Name:
      </p>
      
      <p className='font-semibold ml-12 mr-12 text-xl text-neutral-600'>
        {campaigns[0].campaignName}
        </p>
        <p className='font-semibold text-xl ml-32 bg-neutral-700 text-zinc-100 rounded-full px-6 py-1'>
          <Link href={`/sponsorships/${sponId}`} style={{ textDecoration: 'none' }}>
            Deatil
            </Link>
            </p>
      
     </div>
     <div className='flex flex-row justify-between'>
      <p className='font-semibold text-xl'>
      Post/Logo for Promotion
      </p> 
      <p className='font-semibold text-xl ml-12 bg-neutral-700 text-zinc-100 rounded-full px-6 py-1'>
      <Link href={campaigns[0].promotionPostUrl} download target="_blank">
              Download
      </Link>
      </p>
     </div>
    
     <div className='flex flex-row'>
     <p className='font-semibold text-xl'>
     Page Eligible For:
      </p>
      
      <p className='font-semibold ml-12 mr-12 text-xl text-neutral-600'>
      { pages[0].pageUserName}
        </p>
        </div>
        {addpost?
        <div className='flex'>
          <input className="h-10 px-2 border-2 border-gray-500 w-[60%] rounded-l-lg" type='string' required onChange={(e: any) => setPost(e.target.value )} value={post} />
          <button className='font-semibold bg-neutral-700 text-zinc-100 rounded-r-lg p-2 px-6' onClick={()=>handleSubmite(campaigns[0].verificationImgUrl,post,campaigns[0].day,pages[0].average_views,campaigns[0].amountUsed,campaigns[0].price)}>Submit</button>
        </div>:<div></div>}
        <button onClick={()=>addPost(pages[0].average_views, campaigns[0].amountUsed, campaigns[0].price)} className='font-semibold bg-neutral-700 text-zinc-100 rounded-full py-2 w-[20%]'>+ Add New Post</button>
    </div>
  )
}

export default Deals
