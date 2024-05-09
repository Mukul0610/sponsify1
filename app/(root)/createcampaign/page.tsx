"use client"
import AutomateCampaign from '@/components/shared/AutomateCampaign'
import MenualCampaign from '@/components/shared/menualCampaign'
import React, { useState } from 'react'

const page = () => {
  const [button,setButton]=useState("auto")
  return (
    <div >
      <div className="flex">
  <button onClick={()=>setButton("auto")} className={`flex-1 ${button==="auto" ? "bg-neutral-600 text-slate-200" : "text-slate-600 bg-white"}  py-4 rounded-t-3xl`}>Automate Campaingn</button>
  <button onClick={()=>setButton("manual")} className={`flex-1 ${button==="manual" ? "bg-neutral-600 text-slate-200" : "text-slate-600 bg-white"} py-4 rounded-t-3xl`}>Manual</button>
</div>
{button==="auto"? <AutomateCampaign/>:<MenualCampaign/>}
    </div>
  )
}

export default page
