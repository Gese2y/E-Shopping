import express  from 'express';
// import products from './Products';
// import test from './data/test.js'
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleWare/errorMidllewar.js';
dotenv.config();
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js'


const port = process.env.PORT;

connectDB();
const app = express();

app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.use('/api/products', productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>
console.log(`server running on port ${port}`));