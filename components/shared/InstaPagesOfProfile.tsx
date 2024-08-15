import { deleteInstaPage, getAllInstaPageToUpdate, getInstaPageByUserId, updateOnePage } from '@/lib/actions/instaPage.action';
import React, { useEffect } from 'react'
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
import AddInstaPage from './AddInstaPage';
interface InstaPagesOfProfile {
    param: string; // Assuming param is a string, change type as per your requirement
  }
  

const InstaPagesOfProfile: React.FC<InstaPagesOfProfile> = async({ param })=> {


   
    const updateData = async () => {
      const pages = await  getAllInstaPageToUpdate(param);
      if(pages[0].pageUserName){
        for(let i=0;i<pages.length;i++){
          try{
          const response = await fetch(`https://pythonapi-pimk.onrender.com/${pages[i].pageUserName}`);
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
        }catch(err) {
          console.log(err)
        }
        }
      }
     
    }
    updateData()


  

  
    const pages = await getInstaPageByUserId(param);

  
  return (
    <div >
    {pages ?
      <div className='width-full  p-3 pl-4 mt-10 mb-6'>
        <h2 className='flex justify-center text-5xl font-bold'>Your Insta Pages</h2>
        <Table className='mt-4 bg-gray-400'>
      
      <TableHeader className='bg-neutral-700'>
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
        <TableRow>
        <TableCell colSpan={7}><AddInstaPage param={param} /></TableCell>
          </TableRow>
      </TableBody>
    </Table>
        

      </div> :
      <div></div>
    }

  </div>
  )
}

export default InstaPagesOfProfile
