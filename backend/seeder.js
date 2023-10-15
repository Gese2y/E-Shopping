import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'

import users from './data/users.js'
// import products from './data/Products';
import Product from './models/productsModels.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import products from './data/Products.js';

dotenv.config();

await connectDB();
const options = { maxTimeMS: 100000 }; // Increase timeout to 30 seconds

const importData= async () =>{
    try {
        await Order.deleteMany(options);
        await Product.deleteMany(options);
        await User.deleteMany(options);

        const createUsers= await User.insertMany(users);
        const adminUser = createUsers[0]._id;

        const sampleProduct = products.map((product)=>{
            // console.log('products', product);
            return {
                ...product, user: adminUser
            };
        })
        await Product.insertMany(sampleProduct, options);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
 
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    }
    catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}
if (process.argv[2] === '-d'){
    destroyData();
}
else{
   importData(); 
}