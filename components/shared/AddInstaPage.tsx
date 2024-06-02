"use client";
import { createInstaPage, getAllInstaPageToUpdate, updateOnePage } from '@/lib/actions/instaPage.action';
import Select from 'react-select'

import React, { useEffect, useState } from 'react'


interface AddInstaPageProps {
  param: string; // Assuming param is a string, change type as per your requirement
}

const AddInstaPage: React.FC<AddInstaPageProps> = ({ param })=> {
  const handleSubmit = async (e: UpdateInstaPageParams) => {
    try{
    const newPage = await createInstaPage(e)
    if(newPage){
      setData({
        userId: param,
        pageUserName: "",
        full_name: "",
        followers: 0,
        following: 0,
        media_count: 0,
        bio: "",
        average_views: 0,
        profile_pic_url: "",
        categories:[]
      })
    }
  }catch(error){
    console.log(error)
  }
  }
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
  const [addpage,setAddpage]=useState("");
  const [pageid, setPageId] = useState("");
  const [count, setCount] = useState("")
  const [categories, setCategories] = useState([{
    value:"loading..."
  }]);
  const [data, setData] = useState({
    userId: param,
    pageUserName: "",
    full_name: "",
    followers: 0,
    following: 0,
    media_count: 0,
    bio: "",
    average_views: 0,
    profile_pic_url: "",
    categories:[]
  })

  useEffect(() => {
    if (count !== "") {
      fetch(`http://localhost:5000/${count}`)
        .then((response) => response.json())
        .then((maindata) => {
          setData({
            ...data,
            pageUserName: maindata.username,
            full_name: maindata.full_name,
            followers: maindata.followers,
            following: maindata.following,
            media_count: maindata.media_count,
            bio: maindata.bio,
            average_views: maindata.average_views,
            profile_pic_url: maindata.profile_pic_url
          }
        

          )
        });
    }
  }, [count]);
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

  useEffect(() => {
    const updateData = async () => {
      const pages = await  getAllInstaPageToUpdate(param);
      if(pages){
        for(let i=0;i<pages.length;i++){
          const response = await fetch(`http://localhost:5000/${pages[i].pageUserName}`);
          const maindata = await response.json();
          if(maindata){
            const data={
            pageUserName: maindata.username,
            full_name: maindata.full_name,
            followers: maindata.followers,
            following: maindata.following,
            media_count: maindata.media_count,
            bio: maindata.bio,
            average_views: maindata.average_views,
            profile_pic_url: maindata.profile_pic_url,
            timeOfUpdate: new Date(Date.now() + 3* 24 * 60 * 60 * 1000),
            }

            await updateOnePage(pages[i]._id,data)
          }
        }
      }
      
    }
    updateData()
  }, [])


  return (
    <div>
      <button type="button" className="bg-neutral-700 py-2 px-6 font-bold text-slate-200 rounded-full hover:bg-black mt-4" onClick={() => setAddpage("add")}>+Add Your Insta Page</button>
       
      {addpage?<div className='border-2 border-neutral-500 rounded-3xl p-6 mt-8 w-10/12'>
        <h3 className='mt-8 mb-2 font-bold text-2xl text-neutral-800'>Your User Id</h3>
        <input type='text' placeholder=""className='w-8/12 h-8 border-2 rounded-full  border-neutral-700 p-4' required onChange={(e) => setPageId(e.target.value)} value={pageid} />
        <h3 className='mt-8 mb-2 font-bold text-2xl text-neutral-800'>Categories of Page for better recommandtion </h3>
        <Select className="w-8/12 h-10 border-2 shadow-2xl border-gray-500 rounded-md" options={option} value={categories} onChange={(categories: any) => { setCategories(categories) }} isMulti={true} />
        <button type="button" className='w-2/12 h-9 mt-8 bg-neutral-700 rounded-full text-slate-200 ' onClick={() => setCount(pageid)}>data</button>
        {!data.pageUserName && count?<div>Loading...</div>:<div></div>}
      </div>:<div></div>}
      {data.pageUserName ?
        <div className='width-full shadow-2xl p-3 pl-4 mt-8'>
          <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-x-12 md:gap-x-12 gap-y-12 md:gap-y-0 py-5 md:py-8 text-gray-700 text-lg md:text-base font-semibold">
            <p>Page User Name</p>
            <p>Full Name</p>
            <p>Followers </p>
            <p>Following</p>
            <p>No. Of Posts</p>
            <p>Bio</p>
            <p>Average Views</p>
          </div>
          <hr />
          <div>
            <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-x-12 md:gap-x-12 gap-y-12 md:gap-y-0 py-5 md:py-8 text-gray-700 text-lg md:text-base font-semibold">

              <p>{data.pageUserName}</p>
              <p>{data.full_name}</p>
              <p>{data.followers} </p>
              <p>{data.following}</p>
              <p>{data.media_count}</p>
              <p>{data.bio}</p>
              <p>{data.average_views}</p>


            </div>
            <hr />
          </div>
          <div className="flex justify-center mt-6 ">
          <button type="button" className='bg-neutral-700 py-2 px-6 font-bold text-slate-200 rounded-full hover:bg-black' onClick={() => handleSubmit(data)}>Submit</button>
          </div>
        </div>:
        <div></div>
        }
          
    </div>

  )
}

export default AddInstaPage
