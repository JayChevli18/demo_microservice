import amqp from 'amqplib';
// import { AppDataSource } from '../config/db';
import { Order } from '../models/Order';

export const publishOrderToQueue = async (order:Order, address:string)=>{
    try{
        const rabbitmqUri=process.env.RABBITMQ_URI || 'amqp://localhost:5672';
        const connection=await amqp.connect(rabbitmqUri);
        const channel=await connection.createChannel();

        const queue='orderQueue';
        const msg=JSON.stringify({
            orderId:order.id,
            userId:order.userId,
            productId:order.product.id,
            quantity:order.quantity,
            address:address
        });

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(`Order ${order.id} published to queue`);

        await channel.close();
        await connection.close();
    }catch(error){
        console.error('Error publishing order to queue:', error);
        throw error;
    }
}