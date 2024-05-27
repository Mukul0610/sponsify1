"use client"; 
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import Image from 'next/image'
import arrow_logo from '../Assets/arrow.png'
const option=[
  {value:"any", label: "Any"},
  {value:"fashion", label: "Fashion"},
  {value: "travel", label: "Travel"},
  {value: "food", label: "Food"},
  {value: "fitness", label: "Fitness"},
  {value: "beauty", label: "Beauty"},
  {value: "lifestyle", label: "Lifestyle"},
  {value: "photography", label: "Photography"},
  {value: "art", label: "Art"},
  {value: "pets", label: "Pets"},
  {value: "nature", label: "Nature"},
  {value: "home_decor", label: "Home Decor"},
  {value: "music", label: "Music"},
  {value: "parenting", label: "Parenting"},
  {value: "technology", label: "Technology"},
  {value: "celebrity", label: "Celebrity"},
  {value: "meme", label: "Meme"},
  {value: "fan_page", label: "Fan Page"},
  {value: "health_wellness", label: "Health & Wellness"},
  {value: "education", label: "Education"},
  {value: "business_entrepreneurship", label: "Business/Entrepreneurship"},
  {value: "sports", label: "Sports"}
];

const MenualCampaign = () => {
const [categories,setCategories]=useState([]);

const [data,setData]=useState({
  campaigns:'',
  minFolower:'10k',
  averageViews:'100k',
  description:'',
  preferredGender:'Any',
  type:'logo',
  price:0,
  day:0,
})        
  return (
    <div className="flex flex-col gap-5 p-4 w-96 lg:w-full text-lg shadow-md">
      <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>1. What your campaign name?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='text' required onChange={e=>setData({...data,campaigns:e.target.value})} value={data.campaigns}/>
        </div>
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>2. Minimum followers required?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='text' required onChange={e=>setData({...data,minFolower:e.target.value})} value={data.minFolower}/>
        </div>
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>3. Average views required?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='text' required onChange={e=>setData({...data,averageViews:e.target.value})} value={data.averageViews}/>
        </div>
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>4. What your campaign description?</h4>
          <textarea required onChange={e=>setData({...data,description:e.target.value})} value={data.description} className="w-full h-32 border-2 border-gray-500 rounded-md"/>
        </div>
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>5. Choose categories for your product</h4>
          <Select className="w-full h-10 border-2 border-gray-500 rounded-md" options={option} value={categories} onChange={(categories:any)=> {setCategories(categories)}} isMulti={true}/>
        </div>
        <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>6. Preferred Gender?</h4>
          <select required onChange={e=>setData({...data,preferredGender:e.target.value})} value={data.preferredGender} className="w-full pl-4 h-12 border-2 bg-neutral-600 text-slate-200 rounded-lg font-bold cursor-pointer">
            <option value='logo'>Any</option>
            <option value='non logo'>Male</option>
            <option value='non logo'>FeMale</option>
          </select>
        </div>
        
      <button>Submit</button>
    </div>
  )
}

export default MenualCampaign