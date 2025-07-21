import { DataSource } from 'typeorm';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

export const AppDataSource=new DataSource({ 
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Product, Order],
    synchronize: true,
});