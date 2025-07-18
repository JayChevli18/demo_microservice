import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './config/db';
import path from 'path';

// Specify the path to the .env file located in the project root
// dotenv.config({ path: path.resolve(__dirname, '../../../.env'), debug: true });

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