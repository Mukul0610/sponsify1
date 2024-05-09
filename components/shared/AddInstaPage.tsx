"use client";
import { createInstaPage } from '@/lib/actions/instaPage.action';
import { auth, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react'
import type { NextApiRequest } from "next";
import { getUserId } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


interface AddInstaPageProps {
  param: string; // Assuming param is a string, change type as per your requirement
}

const AddInstaPage: React.FC<AddInstaPageProps> = ({ param })=> {
  const handleSubmit = async (e: UpdateInstaPageParams) => {
    const newPage = await createInstaPage(e)

    return NextResponse.json({ message: "OK", newPage: createInstaPage });

  }
  const [addpage,setAddpage]=useState("");
  
 
  

  const [pageid, setPageId] = useState("");
  const [count, setCount] = useState("")
  const [data, setData] = useState({
    userId: param,
    pageUserName: "",
    full_name: "",
    followers: 0,
    following: 0,
    media_count: 0,
    bio: "",
    average_views: 0,
    profile_pic_url: ""
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


  return (
    <div>
      <button type="button" className="bg-neutral-700 py-2 px-6 font-bold text-slate-200 rounded-full hover:bg-black mt-4" onClick={() => setAddpage("add")}>+Add Your Insta Page</button>
       
      {addpage?<div >
        
        <input type='text' placeholder=""className='w-8/12 h-8 mt-8 border-2 border-r-0 rounded-full  border-neutral-700 p-4' required onChange={(e) => setPageId(e.target.value)} value={pageid} />
        <button type="button" className='w-2/12 h-9 mt-8 bg-neutral-700 rounded-full ml-[-40px] text-slate-200 ' onClick={() => setCount(pageid)}>data</button>
        <br />
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
