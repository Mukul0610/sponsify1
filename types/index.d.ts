/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    photo: string;
  };
  
  declare type UpdateUserParams = {
    firstName: string | null;
    lastName: string | null;
    username: string;
    photo: string;
  };
  
  // ====== IMAGE PARAMS
  declare type UpdateInstaPageParams = {
    userId: string;
    pageUserName: string;
    full_name: string,
    followers: number,
    following: number,
    media_count: number,
    bio: string,
    average_views:number,
    profile_pic_url:string
  };
  declare type CreateCampaignParams = {
    campaignName: string,
    minFolower: number,
    averageViews: number,
    description: string,
    preferredGender: string,
    type: string,
    price: number,
    day: number,
    biolink: string,
    wayOfPaying: string,
    thembnailImgUrl: string,
    promotionPostUrl:string,
    verificationImgUrl:string,
    creditUseForCampaign:number,
    categories:any,
    amountUsed:number
  };

  //deal
  declare type CreateDealParms = {
    userId: string;
    sponsorshipId: string;
    pageId: string,

  };

  declare type CreatePostParms = {
  userId:string,
  sponsorshipId:string,
  pageId:string,
  postlink:string,
  paymentTime:any,
  pageAverageViews:number
  };

  
  declare type UpdateCampaignParams={
    amountUsed:number
  }
