import { DataSource } from 'typeorm';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Shipping } from '../models/Shipping';

export const AppDataSource=new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Order, Product, Shipping],
    synchronize: true,
});
