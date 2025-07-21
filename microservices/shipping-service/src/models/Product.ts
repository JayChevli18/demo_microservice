import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // description: string;

    // @Column()
    // price: number;

    // @Column({ nullable: true })
    // quantity: number;

    // @Column({ nullable: true })
    // imageUrl: string;

    // @Column({ nullable: true })
    // weight: number; // Important for shipping calculations

    // @Column({ nullable: true })
    // dimensions: string; // Important for shipping calculations

    @OneToMany(() => Order, (order) => order.product, { nullable: true })
    orders: Order[];
} 