"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { getInstaPageById, getInstaPageByUserId } from '@/lib/actions/instaPage.action'
import { getCampaignById } from '@/lib/actions/campaign.action'
import {useRouter} from 'next/navigation';
import { createDeal } from '@/lib/actions/deal.action'

interface PageVerificationButtonProps {
  param: string;
  sponId:string // Assuming param is a string, change type as per your requirement
}

const PageVerificationButton: React.FC<PageVerificationButtonProps> = ({ param,sponId}) => {
  
  


  const [page, setPage] = useState([{
    _id:"mmr",
    pageUserName:"loading.."
  }])
  const [open, setOpen] = useState(false)
  
 
 
  useEffect(() => {
    const fetchData = async () => {
      const pages = await getInstaPageByUserId(param);
      setPage(pages)
    }
    fetchData()
  }, [])


//creating deal

const handleFinal = async (e: CreateDealParms) => {
  const newCampaign = await createDeal(e)
  alert("For this page, the portal of this campaign has opened on your profile. If you are not able to see the portal, please refresh it. 🚀🔄")
}

  

  const verifing=async(pageid:string)=>{
    const data={
      "userId":param,
      "sponsorshipId":sponId,
      "pageId":pageid,
    }
    const campaign = await getCampaignById(sponId);
    const page = await getInstaPageById(pageid);
    
      if(page[0].followers>campaign[0].minFolower &&page[0].average_views>campaign[0].averageViews){
        handleFinal(data)
          setOpen(false)
      }else{
        alert("Sorry Your Page is Not Eligible for this Campaign")
      }
  }
  

  
  
  const addpage = () => {
    redirect("/profile")
  }
  return (
    <div className='w-full'>
      <AlertDialog open={open}>
        <AlertDialogTrigger className="bg-neutral-700 p-3 w-full font-bold text-slate-200 rounded-full shadow-xl shadow-gray-300 hover:bg-neutral-800" onClick={() => setOpen(true)}>Apply</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apply With?</AlertDialogTitle>
            <AlertDialogDescription>
            <div className='mb-8 flex flex-col gap-1'>
                {page.map((e) => (
                  <div key={e._id} className='text-lg font-semibold text-zinc-800 flex justify-between px-4 py-2 mr-5 border-2 rounded-lg border-neutral-500'>{e.pageUserName} <button onClick={() => verifing(e._id)} className='bg-zinc-700 font-bold text-gray-300 w-3/12 rounded-full py-1'>Apply</button></div>
                  
                ))}
              </div>
              <Link href="/profile" className='bg-neutral-700 p-3 font-bold text-slate-200 rounded-full'>+Add New Page</Link>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </div>
  )
}

export default PageVerificationButton


