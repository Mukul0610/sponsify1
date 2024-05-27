import { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  statusOfCampaign:{
    type:String,
    default:"active"
  },
  minFolower: {
    type: Number,
    required: true,
  },
  averageViews: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preferredGender: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now // Set default value to current time
  },
  thembnailImgUrl: {
    type: String,
    require: true,
  },
  promotionPostUrl: {
    type: String,
  },
  verificationImgUrl: {
    type: String,
  },
  categories: {
    type: Array
  },
  creditUseForCampaign:{
    type:Number,
    require:true,
  },
  amountUsed:{ //it is a amount remaining for campaing not used
    type:Number,
  }
})

const Campaign = models?.Campaign || model("Campaign", CampaignSchema);

export default Campaign;