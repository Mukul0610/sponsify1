import { deleteInstaPage, getInstaPageByUserId } from '@/lib/actions/instaPage.action';
import React from 'react'
import { numToString } from './funtions';
import { useRouter } from 'next/navigation';
import DeleatInstaPage from './DeleatInstaPage';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
interface InstaPagesOfProfile {
    param: string; // Assuming param is a string, change type as per your requirement
  }
  

const InstaPagesOfProfile: React.FC<InstaPagesOfProfile> = async({ param })=> {
  
    const pages = await getInstaPageByUserId(param);

  
  return (
    <div >
    {pages ?
      <div className='width-full  p-3 pl-4 mt-2 mb-6'>
        <h2 className='text-2xl flex justify-center font-bold'>Your Insta Pages</h2>
        <Table className='mt-2 bg-gray-400'>
      
      <TableHeader className='bg-gray-700'>
        <TableRow>
          <TableHead className="text-gray-100 font-semibold">Page User Name</TableHead>
          <TableHead className="text-gray-100 font-semibold">Full Name</TableHead>
          <TableHead className="text-gray-100 font-semibold">Followers</TableHead>
          <TableHead className="text-right text-gray-100 font-semibold">Following</TableHead>
          <TableHead className="text-gray-100 font-semibold">No. Of Posts</TableHead>
          <TableHead className="text-gray-100 font-semibold">Average Views</TableHead>
          <TableHead className="text-right text-gray-100 font-semibold">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='bg-gray-50 hover:bg-gray-200'>
        {pages.map((page: any) => (
          <TableRow key={page._id}>
            <TableCell className="font-medium"><Link href={`https://www.instagram.com//${page.pageUserName}`} style={{ textDecoration: 'none',color:'black' }} target="_blank" >{page.pageUserName}</Link></TableCell>
            <TableCell >{page.full_name}</TableCell>
            <TableCell className="text-center">{numToString(page.followers)}</TableCell>
            <TableCell className="text-center" >{page.following}</TableCell>
            <TableCell className="text-center">{page.media_count}</TableCell>
            <TableCell className="text-center" >{numToString(page.average_views)}</TableCell>
            <TableCell className="text-center"><DeleatInstaPage pageName={page.pageUserName} pageId={page._id}/></TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
        

      </div> :
      <div></div>
    }

  </div>
  )
}

export default InstaPagesOfProfile
