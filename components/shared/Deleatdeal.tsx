"use client"

import React, { useState } from 'react'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteDeal } from '@/lib/actions/deal.action';

  interface DeleatDealProps {
    Id:string // Assuming param is a string, change type as per your requirement
  }

const DeleatDeal: React.FC<DeleatDealProps> = ({Id}) => {
    const [open, setOpen] = useState(false)
    const deleat=async()=>{
        await deleteDeal(Id);
        alert("Your deal Is closed")
      }

  return (
    <div>
      <AlertDialog open={open}>
  <AlertDialogTrigger onClick={() => setOpen(true)}  ><div className='flex flex-row items-end'><img src="/assets/icons/delete.png" width={25} height={25} alt=""  className='ml-auto cursor-pointer items-end'/></div></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Are You sure you want to close this deal
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel  onClick={() => setOpen(false)}>No</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleat()}>Yes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default DeleatDeal