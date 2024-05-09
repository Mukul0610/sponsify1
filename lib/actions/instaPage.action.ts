"use server";

import { revalidatePath } from "next/cache";
import InstaPage from "../database/models/instaPage.model"
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

export async function createInstaPage(instaPage: UpdateInstaPageParams) {
    try {
      await connectToDatabase();
  
      const newInstaPage = await InstaPage.create(instaPage);
  
      return JSON.parse(JSON.stringify(newInstaPage));
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  }
  export async function getInstaPageByUserId(id: string) {
    try {
      await connectToDatabase();
  
      const pages = await InstaPage.find({ userId: id});
  
      if (!pages) throw new Error("User not found");
  
      return JSON.parse(JSON.stringify(pages));
    } catch (error) {
      handleError(error);
    }
  }
  export async function getAllInstaPages() {
    try {
      await connectToDatabase();
  
      const pages = await InstaPage.find({});
  
      if (pages.length === 0) throw new Error("No pages found");
  
      return JSON.parse(JSON.stringify(pages));
    } catch (error) {
      handleError(error);
    }
  }

  export async function deleteInstaPage(pageId: string) {
    try {
      await connectToDatabase();
  
      // Find user to delete
      const pageToDelete = await InstaPage.findOne({ pageId });
  
      if (!pageToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedPage = await InstaPage.findByIdAndDelete(pageToDelete._id);
      revalidatePath("/profile");
  
      return deletedPage ? JSON.parse(JSON.stringify(deletedPage)) : null;
    } catch (error) {
      handleError(error);
    }
  }

  

  export async function getInstaPageById(id: any) {
    try {
      await connectToDatabase();
  
      const pages = await InstaPage.find({ _id: new ObjectId(id)});
  
      
  
      return JSON.parse(JSON.stringify(pages));
    } catch (error) {
      handleError(error);
    }
  }
 