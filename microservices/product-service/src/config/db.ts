import { DataSource } from 'typeorm';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const AppDataSource=new DataSource({ 
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Product, Order],
    synchronize: true,
});