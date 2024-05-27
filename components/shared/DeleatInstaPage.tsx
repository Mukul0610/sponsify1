"use client"

import React, { useState } from 'react'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteInstaPage } from '@/lib/actions/instaPage.action';

  interface DeleatInstaPageProps {
    pageName: string;
    pageId:string // Assuming param is a string, change type as per your requirement
  }

const DeleatInstaPage: React.FC<DeleatInstaPageProps> = ({ pageName,pageId}) => {
    const [open, setOpen] = useState(false)
    const deleat=async()=>{
        await deleteInstaPage(pageId);
        alert("Your Page Is deleated")
      }

  return (
    <div>
      <AlertDialog open={open}>
  <AlertDialogTrigger onClick={() => setOpen(true)}><img src="/assets/icons/remove_icon.png" alt="" /></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Are You sure you want to Deleat ${pageName} page
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

export default DeleatInstaPage
