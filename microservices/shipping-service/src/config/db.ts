import { DataSource } from 'typeorm';
import { Order } from '../../../product-service/src/models/Order';
import { Product } from '../../../product-service/src/models/Product';
import { Shipping } from '../models/Shipping';
import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../../../.env'), debug: true });
dotenv.config();

export const AppDataSource=new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Order, Product, Shipping],
    synchronize: true,
});
