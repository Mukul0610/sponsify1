
import LatestSponsorship from '@/components/shared/LatestSponsorship'
import PopularInfluencers from '@/components/shared/PopularInfluencers'
import PopularSponsorships from '@/components/shared/PopularSponsorships'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {

  return (
    <div className='flex flex-col gap-16'>
      <SignedIn>
      <LatestSponsorship/>
      <PopularSponsorships/>
      <PopularInfluencers/>
      </SignedIn>

      <SignedOut>
        <div>
          <UserButton/>
        </div>
      </SignedOut>
    </div>
  )
}

export default Home

