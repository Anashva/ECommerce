const express=require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router=express.Router()//method-mini instance
const {validateProduct,validateReview,isLoggedIn,isSeller,isProductAuthor}=require('../middleware')
const{showAllProducts,productForm,createProduct,showProduct,editProductForm,updateProduct,deleteProduct}=require('../controllers/product');





router.get('/products',showAllProducts);

router.get('products/new',isLoggedIn,isSeller,productForm);

router.post('/products', isLoggedIn, isSeller, validateProduct, createProduct);

router.get('/products/:id', isLoggedIn, showProduct);


router.get('/products/:id/edit',isLoggedIn,isProductAuthor, editProductForm);

router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, updateProduct);


router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct);
















// // to show all the products
// router.get('/products', async (req,res)=>{
//     try{
//         let products =await Product.find({})
//     res.render('products/index',{products})
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })



// // to show the form for new product-single hai to product nhi to products
// router.get('/product/new',isLoggedIn,isSeller,(req,res)=>{
//     try{
//         res.render('products/new');
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })



// // to actually add the product
// router.post('/products', validateProduct ,isLoggedIn,isSeller, async (req,res)=>{
//     try{
//         let {name,img,price,desc,author}=req.body;
//     await Product.create({name,img,price,desc,author:req.user._id})
//         req.flash('success', 'Product added successfully');
//     res.redirect('/products')//get request
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })



// // to show a particular product
// router.get('/products/:id',isLoggedIn, async (req,res)=>{
//     try{
//         let {id}=req.params;
//     let foundProduct=await Product.findById(id).populate('reviews');// ab dono data from product n review aa skte hai
//     res.render('products/show' ,{foundProduct,msg:req.flash('msg')})
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })



// // form to edit the products:-
// router.get('/products/:id/edit',isLoggedIn,isSeller,async (req,res)=>{
//     try{
//         let {id}=req.params;
//     let foundProduct=await Product.findById(id);
//     res.render('products/edit',{foundProduct})
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })




// // TO actually edit data in db
// router.patch('/products/:id' ,isLoggedIn,isSeller,isProductAuthor,validateProduct, async(req,res)=>{
//     try{
//         let {id}=req.params;
//     let {name,img,price,desc}=req.body;
//     await  Product.findByIdAndUpdate(id ,{name,img,price,desc})
//     req.flash('success', 'Product edited successfully');
//     res.redirect(`/products/${id}`);
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })


// // to delete a product
// router.delete('/products/:id',isLoggedIn,isSeller, isProductAuthor, async (req,res)=>{
//     try{
//         let {id}=req.params;
//     const product=await Product.findById(id);

//     for(let id of product.reviews){
//         await Review.findByIdAndDelete(id);
//     }
//     await Product.findByIdAndDelete(id);
//     req.flash('success', 'Product deleted successfully');
//     res.redirect('/products');
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })














module.exports=router;