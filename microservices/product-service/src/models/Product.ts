import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Order } from './Order';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    imageUrl: string;

    @OneToMany(() => Order, (order) => order.product, { nullable: true })
    orders: Order[];
}