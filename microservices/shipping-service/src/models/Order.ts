import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    price: number;

    @Column()
    userId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ nullable: true })
    status: string;
} 