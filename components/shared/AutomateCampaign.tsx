"use client";
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';

import Image from 'next/image'
import { Upload } from 'lucide-react';
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

const AutomateCampaign = () => {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null)


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/uploadapi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update state with the uploaded filename
      setUploadedFileName(response.data.filename);
      console.log(uploadedFileName);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  


  //main content
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    campaignName: '',
    minFolower: 10000,
    averageViews: 10000,
    description: '',
    preferredGender: 'Any',
    type: 'logo',
    price: 0,
    day: 0,
    biolink: '',
    imageURL: '',
    wayOfPaying: 'views',
  })

  return (
    <div className="flex flex-col gap-5 p-4 w-96 lg:w-full text-lg shadow-md">
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>1. What's your campaign name?</h4>
        <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='text' required onChange={e => setData({ ...data, campaignName: e.target.value })} value={data.campaignName} />
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>2. Minimum followers required?</h4>
        <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='number' required onChange={(e: any) => setData({ ...data, minFolower: e.target.value })} value={data.minFolower} />
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>3. Average views required?</h4>
        <input className="w-full h-10 border-2 border-gray-500 rounded-md" type='number' required onChange={(e: any) => setData({ ...data, averageViews: e.target.value })} value={data.averageViews} />
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>4. What's your campaign description?</h4>
        <textarea required onChange={e => setData({ ...data, description: e.target.value })} value={data.description} className="w-full h-32 border-2 border-gray-500 rounded-md" />
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>5. Choose categories for your product</h4>
        <Select className="w-full h-10 border-2 border-gray-500 rounded-md" options={option} value={categories} onChange={(categories: any) => { setCategories(categories) }} isMulti={true} />
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>6. Preferred Gender?</h4>
        <select required onChange={e => setData({ ...data, preferredGender: e.target.value })} value={data.preferredGender} className="w-full pl-4 h-12 border-2 bg-neutral-600 text-slate-200 rounded-lg font-bold cursor-pointer">
          <option value='logo'>Any</option>
          <option value='non logo'>Male</option>
          <option value='non logo'>FeMale</option>
        </select>
      </div>
      <div className="p-12 rounded-lg hover:shadow-lg">
        <h4 className='mb-5'>7. Type of promotion?</h4>
        <select required onChange={e => setData({ ...data, type: e.target.value })} value={data.type} className="w-full h-12 border-2 pl-4 bg-neutral-600 text-slate-200 rounded-lg font-bold cursor-pointer">
          <option value='logo'>Logo</option>
          <option value='non logo'>Not Logo</option>
        </select>
      </div>
      {data.type === 'logo' ?
        <div className="p-12 rounded-lg hover:shadow-lg">
          <h4 className='mb-5'>8. Price per 10k in Rs?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, price: e.target.value })} value={data.price} />
          <h4 className='mb-4 mt-12'>9. Payable days for reel?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="number" required onChange={(e: any) => setData({ ...data, day: e.target.value })} value={data.day} />
          <h4 className='mb-4 mt-12'>10. Logo image?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="file" />
          <h4 className='mb-4 mt-12'>11. Link That Should present on Bio of Pages?</h4>
          <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="text" required onChange={(e: any) => setData({ ...data, biolink: e.target.biolink })} value={data.biolink} />
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


              <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e:any)=>{setFile(e.target.files[0])}} />
                <button type="submit">Upload</button>
              </form>


              <h4 className='mb-4 mt-12'>11. Link That Should present on Bio of Pages?(optional)</h4>
              <input className="w-full h-10 border-2 border-gray-500 rounded-md" type="text" required onChange={(e: any) => setData({ ...data, biolink: e.target.biolink })} value={data.biolink} />
            </div>
          }

        </div>}

      <button>Submit</button>
    </div>
  )
}

export default AutomateCampaign