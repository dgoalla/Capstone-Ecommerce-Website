var express = require("express");
var router = express.Router();

var ProductController = require("../controllers/productController.js");



router.get("/",ProductController.GetProducts);// sub path 
router.post("/",ProductController.StoreProductInfo);     //Store Product Info
router.get("/:id",ProductController.GetProductById) // sub path using path param 
router.put("/:id",ProductController.UpdateProductInfo);      //Update Product Details
router.delete("/:id",ProductController.DeleteProductInfo); //Delete product using Id
/*
*/
module.exports = router;