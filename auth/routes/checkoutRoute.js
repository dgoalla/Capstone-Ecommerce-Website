var express = require("express");
var router = express.Router();

var CheckoutController = require("../controllers/checkout.controller.js");

router.get("/orders/:id", CheckoutController.GetOrdersByUser);// sub path 
router.get("/:id", CheckoutController.GetUserOrderById);     //Store Product Info
router.post("/", CheckoutController.StoreOrderInfo) // sub path using path param 

/*
*/
module.exports = router;