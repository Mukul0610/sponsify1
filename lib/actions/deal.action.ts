"use server";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Deal from "../database/models/deal.model";


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