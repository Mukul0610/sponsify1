"use server";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Deal from "../database/models/deal.model";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";


export async function createDeal(deal: CreateDealParms) {
    try {
      await connectToDatabase();
  
      const newDeal = await Deal.create(deal);
  
      return JSON.parse(JSON.stringify(newDeal));
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  }
  
  export async function getDealByUserId(id: string) {
    try {
      await connectToDatabase();
  
      const deal = await Deal.find({ userId: id});
  
      if (!deal) throw new Error("User not found");
  
      return JSON.parse(JSON.stringify(deal));
    } catch (error) {
      handleError(error);
    }
  }

  export async function deleteDeal(Id: string) {
    try {
      await connectToDatabase();
  
      // Find user to delete
      const dealToDelete = await Deal.findOne({ _id: new ObjectId(Id)});
  
      if (!dealToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedDeal = await Deal.deleteMany({ _id: Id });
      revalidatePath("/profile");
  
      return deletedDeal ? JSON.parse(JSON.stringify(deletedDeal)) : null;
    } catch (error) {
      handleError(error);
    }
  }