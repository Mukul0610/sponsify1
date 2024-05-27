import { Schema, model, models } from "mongoose";

const DealSchema=new Schema({
    userId:{
        type: String,
        required: true,
    },
    sponsorshipId:{
        type:String,
        requiered:true,
    },
    pageId:{
        type:String,
        requiered:true,
    }
})
    const Deal = models?.Deal || model("Deal", DealSchema);

    export default Deal;