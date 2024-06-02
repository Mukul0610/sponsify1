"use server";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import AddPost from "../database/models/addPost.model";


export async function createPost(post: CreatePostParms) {
    try {
      await connectToDatabase();
  
      const newPost = await AddPost.create(post);
  
      return JSON.parse(JSON.stringify(newPost));
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  }

export async function getAllDealNeedToUpdate() {
    try {
      await connectToDatabase();
  
      const campaign = await AddPost.find({
        dealStatus: "active",
        paymentTime: { $lt: Date.now() }
      });
  
      if (campaign.length === 0) throw new Error("No pages found");
  
      return JSON.parse(JSON.stringify(campaign));
    } catch (error) {
      handleError(error);
    }
  }

export async function updatePostViews(userId: string, views: any) {
    try {
      await connectToDatabase();
  
      const updatedPostViews = await AddPost.findOneAndUpdate(
        { _id: userId },
        { pageAverageViews: views, dealStatus:"done" }, // $inc will add a negative value correctly
        { new: true }
      );
  
      if (!updatedPostViews) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedPostViews));
    } catch (error) {
      handleError(error);
    }
  }
  