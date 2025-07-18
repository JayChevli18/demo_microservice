import express from 'express';
import shippingRoutes from './routes/shippingRoutes';
import { AppDataSource } from './config/db';

const app=express();

app.use(express.json());

app.use('/api/shipping', shippingRoutes);

const startServer=async()=>{
    try{
        await AppDataSource.initialize();
        console.log('Database connected');
        app.listen(5004,()=>{
            console.log(`Shipping service is running on port 5004`);
        });
    }catch(error){
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

startServer();