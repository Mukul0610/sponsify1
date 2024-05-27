import AutomateCampaign from '@/components/shared/AutomateCampaign'
import { getUserById } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Campaign = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const credit=user.creditBalance
  const id = user._id
  return (
    <div >
    <AutomateCampaign param={id} credits={credit}/>
    </div>
  )
}

export default Campaign
