"use client"

import { getCampaignById, updateCampaign } from '@/lib/actions/campaign.action';
import { getInstaPageById } from '@/lib/actions/instaPage.action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/actions/addPost.action';
import Image from 'next/image';
import newupload from '@/public/assets/icons/delete.png'
import DeleatDeal from './Deleatdeal';

interface DealsProps {
  pageId: string;
  sponId: string,
  userId: string,
  dealId:string // Assuming param is a string, change type as per your requirement
}
const Deals: React.FC<DealsProps> = ({ dealId,userId, pageId, sponId }) => {
  const [pages, setPage] = useState([{
    pageUserName: 'Loading...',
    average_views: 0,
  }]);

  const [campaigns, setCampaigns] = useState([{
    campaignName: "Loading...",
    promotionPostUrl: "mukul",
    amountUsed: 0,
    price: 0,
    verificationImgUrl: "mukul",
    day: 0,
    biolink: ""
  }]);
  const [addpost, setAddPost] = useState(false)
  const [post, setPost] = useState("")

  const addPost = (pageViews: number, sponamount: number, price: number) => {
    if (price * 0.0001 * pageViews < sponamount) {
      setAddPost(true)
    }
    else {
      alert("Sorry This Campaign doesn't have enough credit to pay this page, you can try with another page with less average views.")
    }
  }
  const [verify, setVerify] = useState(false)

  const router = useRouter()
  // Deal data adding and verifying posts
  const handleSubmite = async (e: string, post: string, day: number, views: number, amountRemaining: number, price: number, userName: string, biolinks: string) => {
    setVerify(true)
    try {
      // Fetch data from the API https://pythonapi-2fhr.onrender.com/process?reel_url=${post}&input_image_path=${e}
      const response = await fetch(`https://pythonapi-2fhr.onrender.com/process?reel_url=${post}&input_image_path=${e}`);
      const maindata = await response.json();
      
      if (maindata) {
        // Prepare data for the new post
        const data = {
          userId: userId,
          sponsorshipId: sponId,
          pageId: pageId,
          postlink: post,
          paymentTime: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
          pageAverageViews: views,
          pageUserName: userName,
          biolink: biolinks,
          prices: price
        };

        // Create a new post
        const newPost = await createPost(data);
        alert("Your Post Is Submitted");

        // Update the amount used in the campaign
        const updateAmountUsed = amountRemaining - price * views * 0.0001;
        await updateCampaign(sponId, updateAmountUsed);
        setPost("")
        // Refresh the router to reflect changes
      } else {
        alert("Sorry, something is wrong with your post.")
      }
    } catch (error) {
      alert(error);
    }
    setVerify(false)
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
    <div className='lg:w-[80%] mt-8 shadow-xl rounded-xl bg-gray-200 px-4 lg:px-8 py-4 flex flex-col gap-4'>
      <DeleatDeal Id={dealId} />

      <div className='flex flex-col lg:flex-row items-start lg:items-center'>
        <p className='font-semibold text-lg'>
          Campaign Name:
        </p>
        <p className='font-semibold ml-0 lg:ml-12 mr-0 lg:mr-12 text-lg text-neutral-600'>
          {campaigns[0].campaignName}
        </p>
        <p className='font-bold text-xl mt-2 lg:mt-0 lg:ml-auto bg-neutral-700 text-zinc-100 rounded-full px-6 py-1'>
          <Link href={`/sponsorships/${sponId}`} style={{ textDecoration: 'none' }}>
            Detail
          </Link>
        </p>
      </div>

      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between'>
        <p className='font-semibold text-lg'>
          Post/Logo for Promotion
        </p>
        <p className='font-bold text-xl mt-2 lg:mt-0 lg:ml-auto bg-neutral-700 text-zinc-100 rounded-full px-6 py-1'>
          <Link href={campaigns[0].promotionPostUrl} download target="_blank">
            Download
          </Link>
        </p>
      </div>

      <div className='flex flex-col lg:flex-row items-start lg:items-center'>
        <p className='font-semibold text-lg'>
          Page Eligible For:
        </p>
        <p className='font-semibold ml-0 lg:ml-12 mr-0 lg:mr-12 text-lg text-neutral-600'>
          {pages[0].pageUserName}
        </p>
      </div>

      {addpost && (
        <div className='flex flex-col lg:flex-row items-start lg:items-center'>
          <input 
            className="h-10 px-2 border-2 border-gray-500 w-full lg:w-[60%] rounded-lg lg:rounded-l-lg mb-2 lg:mb-0" 
            type='string' 
            required 
            onChange={(e: any) => setPost(e.target.value)} 
            value={post} 
          />
          <button 
            className='font-semibold bg-neutral-700 text-zinc-100 rounded-lg lg:rounded-r-lg p-2 px-6' 
            onClick={() => handleSubmite(campaigns[0].verificationImgUrl, post, campaigns[0].day, pages[0].average_views, campaigns[0].amountUsed, campaigns[0].price, pages[0].pageUserName, campaigns[0].biolink)}
          >
            Submit
          </button>
        </div>
      )}

      <button 
        onClick={() => addPost(pages[0].average_views, campaigns[0].amountUsed, campaigns[0].price)} 
        className='font-semibold bg-neutral-700 text-zinc-100 rounded-full py-2 w-full lg:w-[20%]'
      >
        + Add New Post
      </button>

      {verify && <div>Verifying...</div>}
    </div>
  )
}

export default Deals

