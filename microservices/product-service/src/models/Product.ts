import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Order } from './Order';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    imageUrl: string;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];
}