const express=require('express');
const router=express.Router()
const Product=require('../models/Product')
const Review = require('../models/Review');
const {validateProduct,validateReview}=require('../middleware');





router.post('/products/:id/review' ,validateReview, async (req,res)=>{
    try{
        let {id}=req.params;
    let{rating,comment}=req.body;
    const product=await Product.findById(id);
    const review=new Review({rating,comment});
    // res.send("review route")
    const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAverageRating.toFixed(1));

    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','Review added successfully')
    res.redirect(`/products/${id}`);

    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})



module.exports=router;


// populate:-agr hme dusre collection se information chahiye hota hai
// jab ek particluar product ko show krenge tabhi uske sath review bhi show kr denge populate on the basis of objectid only

