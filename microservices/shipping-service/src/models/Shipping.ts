import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.id)
    order: Order;

    @Column()
    address: string;
    
    @Column()
    status: string;
}