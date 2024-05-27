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