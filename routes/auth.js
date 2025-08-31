const express=require('express');
const User=require('../models/User');
const { route } = require('./product');
const passport=require('passport');
const router=express.Router()



// to show the form of signup
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})





// actualy want to register a user in my db
router.post('/register',async (req,res)=>{

    try{
        let{email,password,username,role}=req.body;
    // password hash ho kar jaega
    const user=new User({email,username,role});
    const newUser= await User.register(user,password)
    // res.redirect('/login');
    req.login(newUser,function(err){
        if(err){
            return next(err);
        }
        req.flash('success','welcome, you are registered successfully')
        return res.redirect('/products');
        
    })
    }
    catch(e){
        req.flash('error',e.message);
        return res.redirect('/products')
    }
})





// to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
})







// to actually login via the db
router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    // console.log(req.user , "User");
    req.flash("success", `Welcome Back ${req.user.username}`);
    res.redirect("/products");
  }
);


// router.post('/login',
//     passport.authenticate('local', {
//             failureRedirect: '/login',
//             failureMessage:true

//         }),
//     (req, res)=> {
//         // console.log(req.user)
//         req.flash('success','welcome back');
//         res.redirect('/products')
//   }
// )


// logout

router.get('/logout',(req,res)=>{
    // req.logout always work in callback function
    req.logout(() => {
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  });
})








module.exports=router;


