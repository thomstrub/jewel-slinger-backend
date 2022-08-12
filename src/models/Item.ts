import mongoose from "mongoose";

const item = new mongoose.Schema({
    name:{
        required: true,
        type: String,
    },
    price:{
        required: false,
        type: String,
    },
    quantity:{
        required: false,
        type: Number,
    },
    photo:{
        required: false,
        type: String
    },
    description:{
        required: false,
        type: String
    },
    size:{
        required: false,
        type: String
    },
    user:{
        required: false,
        type: String
    }
})

export default mongoose.model("Item", item);