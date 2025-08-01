import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../../../shared/src/models/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: process.env.POSTGRES_DB,
    entities: [User],
    synchronize: true,
});