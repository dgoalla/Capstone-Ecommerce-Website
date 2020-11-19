var checkoutModel = require("../models/checkout");
// var checkoutModel = Model.Checkout;
// var OrderModel =  Model.orders;
const env = require('../DB');
//const { use, delete } = require("../routes/UserRoute");
//Retrieve Product Details From Db 

var GetOrdersByUser = (req,res)=>{
    var idInfo = req.params.id;
    checkoutModel.find({userid: idInfo},(err,data)=>{
        if(err) return res.status(422).json({ 'error': 'No Orders found. An error has occuured' });            
        else
        {
           // console.log(data.orders)
            return res.json(data);
        } 
        })
}

var GetUserOrderById = (req,res)=> {
    var idInfo = req.params.id;
    checkoutModel.find({_id:idInfo},(err,data)=> {

            if(err) return res.status(422).json({'error': "Order with given Id not found"});
            else return res.json(data);
    })
}

var StoreOrderInfo = (req,res)=> {

    const orderlist = req.body;
   
    // checkoutModel.collection.insertMany(orderlist, (err,result)=> {
    // if(err)
    // {
    //     return res.status(422).json({"error":"Order not inserted"});
    // }else 
    // {
    //     return res.status(200).json({ 'Order saved': true })
    // }
    // });
    let user = "";
    for(let i=0; i< orderlist.length; i++)
    {
        let { productid, userid, quantity} = orderlist[i];
        if (!productid) {
            return res.status(422).json({ 'error': 'Please provide product id' })
        }
        if (!userid) {
            return res.status(422).json({ 'error': 'Please provide user id' })
        }
        if (!quantity) {
        return res.status(422).json({ 'error': 'Please provide quantity' })
        }
        user = orderlist[i].userid;
    }
        const order = new checkoutModel({userid : user, orders : orderlist});
        console.log(order);
        order.save((err,result)=> {
        if(err)
        {
            console.log("error")
            return res.status(422).json({"error":"Order not inserted"});
        }else 
        {
            console.log("inserted");
            return res.status(200).json({ 'Order saved': true })
        }
        });

   
    
}

module.exports = {GetOrdersByUser,GetUserOrderById,StoreOrderInfo,}
