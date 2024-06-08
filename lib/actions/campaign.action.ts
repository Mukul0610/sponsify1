"use server";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";
import Campaign from "../database/models/sponsorship.model";

export async function createCampaign(campaign: CreateCampaignParams) {
    try {
      await connectToDatabase();
  
      const newCampaign = await Campaign.create(campaign);
  
      return JSON.parse(JSON.stringify(newCampaign));
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  }
export async function getAllCampaigns() {
    try {
      await connectToDatabase();
  
      const campaign = await Campaign.find({});
  
      if (campaign.length === 0) throw new Error("No pages found");
  
      return JSON.parse(JSON.stringify(campaign));
    } catch (error) {
      handleError(error);
    }
  }

  export async function getCampaignByUserId(id: string) {
    try {
      await connectToDatabase();
  
      const campaign = await Campaign.find({ userId: id});
  
      if (!campaign) throw new Error("User not found");
  
      return JSON.parse(JSON.stringify(campaign));
    } catch (error) {
      handleError(error);
    }
  }


  export async function getCampaignById(id: any) {
    try {
   +   await connectToDatabase();
  
      const campaign = await Campaign.find({ _id: new ObjectId(id)});
      return JSON.parse(JSON.stringify(campaign));
    } catch (error) {
      handleError(error);
    }
  }

  export async function updateCampaign(sponId: string, amount: number) {
    try {
      await connectToDatabase();
  
      const updatedCampaign = await Campaign.findOneAndUpdate(
        { _id: sponId },
      { amountUsed:amount},
      { new: true }
      );    
  
      if (!updatedCampaign) throw new Error("User update failed");
      
      return JSON.parse(JSON.stringify(updatedCampaign));
    } catch (error) {
      handleError(error);
    }
  }
 

