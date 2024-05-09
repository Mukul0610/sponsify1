import { Schema, model, models } from "mongoose";

const CampaignSchema=new Schema({
    userId:{
        type: String,
        required: true,
    },
    campaignName:{
        type: String,
        required: true,
    },
  minFolower:{
        type: Number,
        required: true,
    },
  averageViews:{
        type: Number,
        required: true,
    },
  description:{
        type: String,
        required: true,
    },
  preferredGender:{
        type: String,
        required: true,
    },
  type:{
        type: String,
        required: true,
    },
  price:{
        type: Number,
        required: true,
    },
  day:{
        type: Number,
        required: true,
    },
    pages: {
        type: [{
            type: Object,
            properties: {
                page: {
                    type: String
                },
                value: {
                    type: Number
                }
            },
            required: []
        }]
    }
    })

    const Campaign = models?.Campaign || model("Campaign", CampaignSchema);

    export default Campaign;