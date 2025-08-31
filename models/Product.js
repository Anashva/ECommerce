// ye folder bs schema banane or model k liye h 
const mongoose=require('mongoose')
const Review = require('./Review');




const productSchema=new mongoose.Schema({
    // name: String,
    name:{
        type:String,
        trim:true,
        required:true
    },
    img :{
    type:String,
    trim:true
    // default
    },
    price:{
        type:Number,
        min:0,
        required:true
    }  ,
    avgRating: {
        type: Number,
        default:0 
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
           type:mongoose.Schema.Types.ObjectId, //ye id ko se model k liye hai usi k ref me id use krenge
           ref:'Review' 
        }
    ],
    author:{
          
           type:mongoose.Schema.Types.ObjectId, //ye id ko se model k liye hai usi k ref me id use krenge
           ref:'User' 
        
    }
})



// middleware jo BTS mongodb operation karwane par use hota hai and iske andar pre and post middleware hote hai which are basically used over the schema and before the model in js class
productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})




let Product=mongoose.model('Product' ,productSchema);

module.exports=Product;































