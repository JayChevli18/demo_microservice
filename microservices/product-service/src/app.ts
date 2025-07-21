import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import productRoutes from './routes/productRoutes';
import { AppDataSource } from './config/db';

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const startServer = async () => {
    try {
        console.log('Initializing database...');
        await AppDataSource.initialize();
        console.log('Database connected');

        const port = process.env.PORT || 5002;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Server startup failed', error);
    }
};

startServer();