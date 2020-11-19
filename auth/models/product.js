const mongoose = require("mongoose");
const { strict } = require("assert");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;
//const { setFlagsFromString } = require("v8");
//mongoose.pluralize(null);           //avoid s post fix for collection. 


var ProductSchema = new Schema({
    productname:String,
    productdesc : String,
    productprice:Number,
    productimage : String,
    company : String,
    producttype : String

   
});

var ProductModel = mongoose.model("Product",ProductSchema);

module.exports = ProductModel;