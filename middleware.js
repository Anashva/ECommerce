const Product=require('./models/Product')

const {productSchema,reviewSchema}=require('./Schema')

const validateProduct=(req,res,next)=>{
    const {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error');
    }
    next();//next mtlb validate function k baad ka work 
}

const isLoggedIn=(req,res,next)=>{

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }
    
    if(!req.isAuthenticated()){
        req.flash('error','please login first');
        return res.redirect('/login');
    }
    next();//agla middleware chalao
}


const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You do not have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error','You do not have the permission to do that');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor=async (req,res,next)=>{
    let {id}=req.params;//prodcut id
    let product=await Product.findById(id);//enitre product
    console.log(product.author);
    console.log(req.user);
    if(!product.author.equals(req.user._id)){
        req.flash('error','You are not the authorize user');
        return res.redirect(`/products/${id}`);
    }
    next();
}







module.exports={isProductAuthor,isSeller,isLoggedIn, validateProduct,validateReview};

























