var ProductModel = require("../models/product");
const env = require('../DB')
//Retrieve Product Details From Db 

var GetProducts = (req,res)=>{
    ProductModel.find({},(err,data)=>{

        if(err) return res.status(422).json({ 'error': 'No products found. An error has occuured' });            
        else return res.json(data);
        })
}

var GetProductById = (req,res)=> {
    var idInfo = req.params.id;
    ProductModel.find({_id:idInfo},(err,data)=> {

            if(err) return res.status(422).json({'error': "Podcut with given Id not found"});
            else return res.json(data);
    })
}

var StoreProductInfo = (req,res)=> {
    let { productname, productdesc, productprice, productimage, producttype, company } = req.body;
    if (!productname) {
        return res.status(422).json({ 'error': 'Please provide product name' })
      }
      if (!productdesc) {
        return res.status(422).json({ 'error': 'Please provide product description' })
      }
      if (!productprice) {
        return res.status(422).json({ 'error': 'Please provide product price' })
      }
      if (!productimage) {
        return res.status(422).json({ 'error': 'Please provide product image' })
      }
      if (!producttype) {
        return res.status(422).json({ 'error': 'Please provide product type' })
      }
      if (!company) {
        return res.status(422).json({ 'error': 'Please provide product company' })
      }
        productimage = productimage.replace("C:\\fakepath\\", "");

        const product = new ProductModel({productname, productdesc, productprice, productimage, company, producttype });
        product.save((err,result)=> {
        if(err){
            return res.status(422).json({"error":"Product not inserted"});
        }else 
        {
            return res.status(200).json({ 'Productsaved': true })
        }
    });
}

var UpdateProductInfo = (req,res)=> {       

    var productId = req.params.id;
    const {productname, productdesc, productprice, productimage, producttype, company} = req.body
    const updateproduct = {
        "productname" : productname,
        "productdesc" : productdesc,
        "productprice" : productprice,
        "productimage" : productimage,
        "producttype" :  producttype,
        "company" : company
    }
    //const prod = this.GetProductById(productId);
    ProductModel.updateOne({_id:productId}, {$set:updateproduct}, (err,result) => {

        if(err) return res.status(422).json({"error":"Product not updated"});

        if(result.nModified > 0){
           return res.status(200).json({"productupdated":true});
        }
        else {
            return res.status(422).json({"error":"Product not updated"});
        }
    })
}

var DeleteProductInfo = (req,res)=> {
        var pid = req.params.id;
        //const prod = this.GetProductById(pid);
        ProductModel.deleteOne({_id:pid}, (err,result)=> {

           if(err) return res.status(422).json({"error" : "Product not deleted"});

           if(result.deletedCount>0)
           {
                return res.status(200).json({"productdeleted" : true});
           }
           else 
           {
                return res.status(422).json({"error" : "Product not deleted"});
           }
        })   
}
module.exports = {GetProducts,GetProductById,StoreProductInfo,UpdateProductInfo,DeleteProductInfo}
