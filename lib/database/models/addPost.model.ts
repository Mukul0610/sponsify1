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
    view:{
        type:Number,
        default:0
    },
    dealStatus:{
        type:String,
        default:"active"
    },
    paymentTime:{
        type:Date,
        requiered:true,
    }
})
    const AddPost = models?.AddPost || model("AddPost", AddPostSchema);

    export default AddPost;