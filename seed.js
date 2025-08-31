const mongoose=require('mongoose')

const Product=require('./models/Product');


const products=[
    {
        name:"Iphone 14pro",
        img:"https://images.unsplash.com/photo-1694570149728-b1011c2a772b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lMTR8ZW58MHx8MHx8fDA%3D",
        price:130000,
        desc:"very costly, aukat se bahar"
    },
    {
         name:"Mackbook m2 pro",
        img:"https://images.unsplash.com/photo-1717865499857-ec35ce6e65fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYm9vayUyMGFpciUyMG0yfGVufDB8fDB8fHww",
        price:230000,
        desc:"ye to bilkul aukat k bahar"
    },
    {
         name:"Ipad pro",
        img:"https://images.unsplash.com/photo-1627405016867-4d59bd6b4747?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price:275000,
        desc:"very costly, bas dekh skte hr"
    },
    {
         name:"airpods",
        img:"https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
        price:45000,
        desc:"bas yhi aukat ki hai"
    },
    {
         name:"Iwatch",
        img:"https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SXdhdGNofGVufDB8fDB8fHww",
        price:75000,
        desc:"costly, aukat ke andar hai"
    }
]

async function seedDB(){
    await Product.deleteMany({});
   await  Product.insertMany(products);
    console.log("data seeded successfully")
}

// jitne bhi db k mongoose k expression h n vo promise return krte hai

module.exports=seedDB;