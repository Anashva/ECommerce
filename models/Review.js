// ye file bs schema banane or model k liye h 
const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    // rating and comment
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true})
// timestamp-created and updated

const Review=mongoose.model('Review' ,reviewSchema);

module.exports=Review;































