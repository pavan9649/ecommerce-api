const Product = require("../models/product");
const express = require("express");
//const body = require("body-parser");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});


router.get(`/:id`, async (req, res) => {
    const productList = await Product.findById(req.params.id);
  
    if (!productList) {
      res.status(500).json({ success: false });
    }
    res.send(productList);
  });

  router.get('/get/countbystationery', async (req, res) => {
    const productCount = await Product.countDocuments(({product_type:"stationery"}))
  
    if (!productCount) {
      res.status(500).json({ success: flase });
    }
    res.send({
      productCount: productCount
    });
  });
  router.get('/get/countbyuniform', async (req, res) => {
    const productCount = await Product.countDocuments(({product_type:"uniform"}))
  
    if (!productCount) {
      res.status(500).json({ success: flase });
    }
    res.send({
      productCount: productCount
    });
  });
  

router.post(`/`, async(req, res) => {
  let product = new Product({
    product_name: req.body.product_name,
    product_type: req.body.product_type,
    product_description:req.body.product_description,
    product_price:req.body.product_price,
    noOfProduct: req.body.noOfProduct
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});


router.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        product_price:req.body.product_price
      },
      { new: true }
    );
  
    if (!product) return res.status(400).send("the product cannot be created");
  
    res.send(product);
  });

  router.post("/get/sell",async(req,res)=>{
      try{
          let product=new Product({
              product_name:req.body.product_name,
              product_type:req.body.product_type,
              noOfProduct:req.body.noOfProduct
          })
          //console.log(product.countInStock)
          let stock=product.noOfProduct;
          let  currentStock=await Product.findOne({product_name:product.product_name});
          //let s=JSON.stringify(currentStock);
          //let d=parseInt(s);
          //let finalStock=(currentStock-stock);
          //let value =parseInt(finalStock);

         // console.log(d);
          //console.log(typeof(value));
         const result =await Product.updateOne({product_name:product.product_name}, {$set:{noOfProduct:(currentStock.noOfProduct-stock)}});
         if (result) {
            return res
              .status(200)
              .json({ success: true, message: "the product purchase successful" });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "the product not available" });
          }

      
    }catch(e)
      {
          console.log(e)

      }

  })
  
router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then((product) => {
        if (product) {
          return res
            .status(200)
            .json({ success: true, message: "the product deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "the product not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  });

module.exports = router;