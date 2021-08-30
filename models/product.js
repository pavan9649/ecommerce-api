const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_type:{
        type:String,
        required:true
    },
    product_description:{
        type:String,

    },
    product_price:{
        type:Number,
        default:0
    },
    noOfProduct:{
        type:Number,
        required:true,
        min:0,
        max:300,
        default:0
    },
    isFeatured:
     { 
         type: Boolean, 
         default: false 
    }
});

const Product =mongoose.model("Product",productSchema);
module.exports=Product;