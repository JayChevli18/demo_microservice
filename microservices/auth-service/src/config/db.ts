import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../../../shared/src/models/User';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: process.env.POSTGRES_DB,
    entities: [User],
    synchronize: true,
});