import { Schema, model, models } from "mongoose";

const AddPostSchema=new Schema({
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
    },
    postlink:{
        type:String,
        requiered:true,
        unique:true
    },
    postuploadTime: {
        type: Date,
        default: Date.now // Set default value to current time
      },
    pageAverageViews:{
        type:Number,
    },
    dealStatus:{
        type:String,
        default:"active"
    },
    paymentTime:{
        type:Date,
        requiered:true,
    },
    pageUserName:{
        type:String,
        requiered:true,
    },
    biolink:{
        type:String
    },
    prices:{
        type:Number
    }
})
    const AddPost = models?.AddPost || model("AddPost", AddPostSchema);

    export default AddPost;