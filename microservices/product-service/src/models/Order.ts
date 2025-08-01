import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.orders, { nullable: true })
    product: Product;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    userId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

}   