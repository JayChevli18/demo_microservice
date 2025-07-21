import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './config/db';


const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const startServer = async () => {
    try {
        console.log('Initializing database...');
        await AppDataSource.initialize();
        console.log('Database connected');
        const port = process.env.PORT || 5001;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Server startup failed', error);
    }
};

startServer();