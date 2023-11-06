import asyncHandler from '../middleWare/asyncHandler.js';
import Order from '../models/orderModel.js';

//@desc Create new Order
//@route Post /api/orders
//@access private
const addOrderItems = asyncHandler(async (req,res)=>{
  const {
    placeOrderId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  }=req.body;
  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error('No order items');
  }else{
    const order=new Order({
      placeOrderId,
        orderItems:orderItems.map((x)=>({
            ...x,
            product:x._id,
            _id:undefined
        })),
user: req.user._id,
shippingAddress,
paymentMethod,
itemsPrice,
taxPrice,
shippingPrice,
totalPrice
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
})
//@desc Get logged in user
//@route GET  /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req,res)=>{
   const orders = await Order.find({user:req.user._id});
   res.status(200).json(orders);
 })
 //@desc Get order by ID
//@route GET  /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req,res)=>{
  const order = await Order.findById(req.params.id).populate('user','name email');
  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error('Order Not found');
  }
 })
  //@desc Update order to paid
//@route Put  /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req,res)=>{
  const order = await Order.findById(req.params.id);
  if(order){
    order.isPaid=true;
    order.paidAt = Date.now();
    order.paymentResult={
      id:req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };
    const updatedOrder=await order.save();
    res.status(200).json(updatedOrder);
  }
  else{
    res.status(404);
    throw new Error('Order not found')
  }
 })
 //@desc Update order to delivered
//@route PUT  /api/orders/:id/deliver
//@access private
const updateOrderToDelivered = asyncHandler(async (req,res)=>{
    res.send('update order to delivered')
 })
//@desc Get all orders
//@route GET  /api/orders/
//@access private/Admin
const getOrders = asyncHandler(async (req,res)=>{
    res.send('get all orders')
 })

 export {
    addOrderItems,
    getMyOrders,
    getOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid
 }