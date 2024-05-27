"use client";
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { createCampaign } from '@/lib/actions/campaign.action';
import { NextResponse } from 'next/server';
import { auth, getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserById, updateCredits } from '@/lib/actions/user.actions';

const option = [
  { value: "any", label: "Any" },
  { value: "fashion", label: "Fashion" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fitness", label: "Fitness" },
  { value: "beauty", label: "Beauty" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "photography", label: "Photography" },
  { value: "art", label: "Art" },
  { value: "pets", label: "Pets" },
  { value: "nature", label: "Nature" },
  { value: "home_decor", label: "Home Decor" },
  { value: "music", label: "Music" },
  { value: "parenting", label: "Parenting" },
  { value: "technology", label: "Technology" },
  { value: "celebrity", label: "Celebrity" },
  { value: "meme", label: "Meme" },
  { value: "fan_page", label: "Fan Page" },
  { value: "health_wellness", label: "Health & Wellness" },
  { value: "education", label: "Education" },
  { value: "business_entrepreneurship", label: "Business/Entrepreneurship" },
  { value: "sports", label: "Sports" }
];

interface AutomateCampaignProps {
  param: string;
  credits:number // Assuming param is a string, change type as per your requirement
}

const AutomateCampaign: React.FC<AutomateCampaignProps> = ({ param ,credits})=> {
  const handleFinalSubmit = async (e: CreateCampaignParams) => {
    if(credits>e.creditUseForCampaign){
    const newCampaign = await createCampaign(e)
    const updatedCredit=credits-e.creditUseForCampaign
    const userUpdate= await updateCredits(param,updatedCredit)

    if(newCampaign){
      setData({userId:param,
        campaignName: '',
        minFolower: 10000,
        averageViews: 10000,
        description: '',
        preferredGender: 'Any',
        type: 'logo',
        price: 0,
        day: 0,
        biolink: '',
        wayOfPaying: 'views',
        thembnailImgUrl: "",
        promotionPostUrl:"",
        verificationImgUrl:"",
        categories:[],
        creditUseForCampaign:1000,
        amountUsed:1000,
      })
    }

    return NextResponse.json({ message: "OK", newPage: createCampaign});
    alert("Your Campaign Is Create")
    }
    else{
      alert("You don't Have credit")
    }
  }
  


  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    userId:param,
    campaignName: '',
    minFolower: 10000,
    averageViews: 10000,
    description: '',
    preferredGender: 'Any',
    type: 'logo',
    price: 0,
    day: 0,
    biolink: '',
    wayOfPaying: 'views',
    thembnailImgUrl: "",
    promotionPostUrl:"",
    verificationImgUrl:"",
    categories:[],
    creditUseForCampaign:1000,
    amountUsed:1000,
  })
useEffect(()=>{
  let arr=[]
  
  for (let i = 0; i < categories.length; i++) {
    arr.push(categories[i].value);
  }
  setData((prevState: any) => ({
    ...prevState,
    categories:arr
  })) 
},[categories])

  const onUploadSuccessThembnailImgUrlHandler = (result: any) => {
    setData((prevState: any) => ({
      ...prevState,
      thembnailImgUrl: result?.info?.secure_url
    }))
  }
  const onUploadSuccessPostUrlHandler = (result: any) => {
    setData((prevState: any) => ({
      ...prevState,
      promotionPostUrl: result?.info?.secure_url
    }))
  }
  const onUploadSuccessVerificationImgUrlHandler = (result: any) => {
    setData((prevState: any) => ({
      ...prevState,
      verificationImgUrl: result?.info?.secure_url
    }))
  }
  return (
    <div className="flex flex-col justify-center gap-8 p-4 w-90% text-lg shadow-2xl">
    <h1 className='text-3xl flex justify-center font-extrabold mb-2 mt-2'>Campaign</h1>
      <div className="px-12">
        <h4 className='mb-2 font-semibold'>1. What's your campaign name?</h4>
        <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type='text' required onChange={e => setData({ ...data, campaignName: e.target.value })} value={data.campaignName} />
      </div>
      <div className='grid grid-cols-2 px-12 gap-4'>
      <div className="rounded-lg">
        <h4 className='mb-2 font-semibold'>2. Minimum followers required?</h4>
        <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type='number' required onChange={(e: any) => setData({ ...data, minFolower: e.target.value })} value={data.minFolower} />
      </div>
      <div className="rounded-lg">
        <h4 className='mb-2 font-semibold'>3. Average views required?</h4>
        <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type='number' required onChange={(e: any) => setData({ ...data, averageViews: e.target.value })} value={data.averageViews} />
      </div>
      </div>
      
      
      <div className="px-12 rounded-lg">
        <h4 className='mb-2 font-semibold'>4. What's your campaign description?</h4>
        <textarea required onChange={e => setData({ ...data, description: e.target.value })} value={data.description} className="w-full h-32 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" />
      </div>

      <div className='grid grid-cols-2 px-12 gap-4'>
      <div className="rounded-lg">
        <h4 className='mb-2 font-semibold'>5. Preferred Gender?</h4>
        <select required onChange={e => setData({ ...data, preferredGender: e.target.value })} value={data.preferredGender} className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md cursor-pointer">
          <option value='any'>Any</option>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select>
      </div>
      <div className="rounded-lg">
        <h4 className='mb-2 font-semibold'>6. Amount Spend On this Campaign ?</h4>
        <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type='number' required onChange={(e: any) => setData({ ...data, creditUseForCampaign: e.target.value,amountUsed:e.target.value })} value={data.creditUseForCampaign} />
      </div>
      </div>

      <div className="px-12 rounded-lg">
        <h4 className='mb-2 font-semibold'>7. Choose categories for your product</h4>
        <Select className="w-full h-12 border-2 bg-gray-100  border-gray-300 rounded-md" classNamePrefix="bg-gray-100 rounded-md" options={option} value={categories} onChange={(categories: any) => { setCategories(categories) }} isMulti={true} />
      </div>
      

      <div className='grid grid-cols-2 px-12 gap-4'>
      <div className="rounded-lg">
        <h4 className='mb-2 font-semibold'>9. Type of promotion?</h4>
        <select required onChange={e => setData({ ...data, type: e.target.value })} value={data.type} className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md cursor-pointer">
          <option value='logo'>Logo</option>
          <option value='non logo'>Not Logo</option>
        </select>
      </div>
      <div className="rounded-lg">
      <h4 className='mb-2 font-semibold'>7. Thumbenail of Your Campaign?</h4>
      <div className='w-full p-2'>
          <CldUploadWidget
            uploadPreset="sponsify"
            onSuccess={onUploadSuccessThembnailImgUrlHandler}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <div>
                  {data.thembnailImgUrl ?<img src={data.thembnailImgUrl} width={200} height={200} className='mb-3'/>:<></>}
                  
                <button onClick={handleOnClick} className='bg-gray-700 p-1 px-3 rounded-lg font-semibold text-white items-end'>
                 Upload Thaumnail image
                </button>
                </div>
              );
            }}
          </CldUploadWidget>
          </div>
          </div></div>
      {data.type === 'logo' ?
        <div>
          <div className='grid grid-cols-2 px-12 gap-4'>
            <div className="rounded-lg">
            <h4 className='mb-2 font-semibold'>10. Price per 10k in Rs?</h4>
          <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, price: e.target.value })} value={data.price} />
            </div>
            <div className="rounded-lg">
            <h4 className='mb-2 font-semibold'>9. Payable days for reel?</h4>
          <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, day: e.target.value })} value={data.day} />
            </div>
          </div>
          


          <div className="px-12 rounded-lg mt-8">
          <h4 className='mb-2 font-semibold'>13. Link That Should present on Bio of Pages?</h4>
          <input className="w-full h-12 p-2 px-4 border-2 border-gray-300 bg-gray-100 rounded-md" type="text" required onChange={(e: any) => setData({ ...data, biolink: e.target.biolink })} value={data.biolink} />
          </div>

          <div className='grid grid-cols-2 px-12 mt-8 gap-4'>
          <div className="rounded-lg">
          <h4 className='mb-2 font-semibold'>11. Gif of Logo?</h4>
          <div className='w-full p-2 px-4'>
          <CldUploadWidget
            uploadPreset="sponsify"
            onSuccess={onUploadSuccessPostUrlHandler}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <button onClick={handleOnClick} className='bg-gray-700 p-1 px-3 rounded-lg font-semibold text-white items-end'>
                  Upload logo gif
                </button>
              );
            }}
          </CldUploadWidget>
          </div>
          </div>
          <div className="rounded-lg">
          <h4 className='mb-2 font-semibold'>12. Main Image of Logo for verify posts?</h4>
          <div className='w-full p-2 px-4'>
          <CldUploadWidget
            uploadPreset="sponsify"
            onSuccess={onUploadSuccessVerificationImgUrlHandler}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <button onClick={handleOnClick} className='bg-gray-700 p-1 px-3 rounded-lg font-semibold text-white items-end'>
                  Upload image without background
                </button>
              );
            }}
          </CldUploadWidget>
            </div>
          </div>
          </div>
          
          


         
        </div>
        :
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>8. How You are Going to Pay</h4>
          <select required onChange={e => setData({ ...data, wayOfPaying: e.target.value })} value={data.wayOfPaying} className="w-full h-12 border-2 pl-4 bg-neutral-600 text-slate-200 rounded-lg font-bold cursor-pointer">
            <option value='views'>On Views</option>
            <option value='upload'>On Upload</option>
          </select>
          {data.wayOfPaying === 'views' ?
            <div className='mt-12'>
              <h4 className='mb-5'>9. Price per 10k in Rs?</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, price: e.target.value })} value={data.price} />
              <h4 className='mb-4 mt-12'>10. Payable days for reel\post?</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, day: e.target.value })} value={data.day} />
              <h4 className='mb-4 mt-12'>11. Reel or Post need to promote?</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="file" />
              <h4 className='mb-4 mt-12'>12. Link That Should present on Bio of Pages?(optional)</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="text" required onChange={(e: any) => setData({ ...data, biolink: e.target.biolink })} value={data.biolink} />
            </div>
            :
            <div className='mt-12'>
              <h4 className='mb-5'>9. Price to a page with 10k average views?</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, price: e.target.value })} value={data.price} />
              <h4 className='mb-4 mt-12'>10. Reel or Post need to promote?</h4>





              <h4 className='mb-4 mt-12'>11. Link That Should present on Bio of Pages?(optional)</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="text" required onChange={(e: any) => setData({ ...data, biolink: e.target.biolink })} value={data.biolink} />
            </div>
          }

        </div>}
         
      <button type='button' className='bg-neutral-700 w-32 py-2 px-6 ml-[45%] font-bold text-slate-200 rounded-full hover:bg-black' onClick={() => handleFinalSubmit(data)}>Submit</button>
  
    </div>
  )
}

export default AutomateCampaign