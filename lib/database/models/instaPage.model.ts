import { Schema, model, models } from "mongoose";

const InstaPageSchema=new Schema({
    userId:{
        type: String,
        required: true,
    },
    pageUserName:{
        type:String,
        required:true,
        unique:true
    },
    full_name:{
        type: String,
        required: true,
    } ,
    followers:{
        type: Number,
        required: true,
    },
    following:{
        type: Number,
        required: true,
    },
    media_count:{
        type: Number,
    },
    bio:{
        type: String,
        required: true,
    },
    average_views:{
        type: Number,
    },
    profile_pic_url:{
        type: String,
        required: true,
    }
    })

    const InstaPage = models?.InstaPage || model("InstaPage", InstaPageSchema);

    export default InstaPage;