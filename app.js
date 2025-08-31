if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');
const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/review');
const userRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');
const ejsmate=require('ejs-mate');
const methodoverride=require('method-override');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');
const MongoStore = require('connect-mongo');






// const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/shopping-sam-app' ;
const dbURL = process.env.dbURL


mongoose.set('strictQuery', true);
mongoose.connect(dbURL, {
    useNewUrlParser: true,       // parses the connection string correctly
    useUnifiedTopology: true,    // enables the new Server Discovery and Monitoring engine
    tls: true                     // forces TLS/SSL, required for Atlas
})
.then(() => {
    console.log("DB connected successfully");
})
.catch((err) => {
    console.log("DB connection error:");
    console.error(err);
});


let secret = process.env.SECRET || 'weneedabettersecretkey';

let store = MongoStore.create({
    secret:secret,
    mongoUrl: dbURL,
    touchAfter:24*60*60
})



// session middleware
let configSession={
    store,
  secret: 'keyboard cat',
  name:'bhaukal',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires: Date.now()+24*7*60*60*1000 ,
    maxAge:24*7*60*60*1000
  }
}








app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));// public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))//Returns middleware that only parses urlencoded bodies 
app.use(methodoverride('_method'))//patch method for editing product
app.use(session(configSession));
app.use(flash());
// passport wali
app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(User.serializeUser());//Registers a function used to serialize user objects into the session.
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

// passsport wali
passport.use(new LocalStrategy(User.authenticate()));









// seeding database
// seedDB()




app.get('/' , (req,res)=>{
    res.render('home');
})



app.use(productRoutes);//so that har incoming request ke liye chal jae
app.use(reviewRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes);






const port=process.env.PORT || 8080;
app.listen(8080,(req,res)=>{
    console.log("server created succcfly")
})