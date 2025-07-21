import { AppDataSource } from '../config/db';
import { Shipping } from '../models/Shipping';
import amqp from 'amqplib';

export const createShipping = async (orderId: number, address: string) => {
    const shipping=new Shipping();
    shipping.order={id:orderId} as any;
    shipping.address=address;
    shipping.status='pending';
    await AppDataSource.getRepository(Shipping).save(shipping);
    console.log('Shipping created', shipping);
    return {shippingId:shipping.id, orderId:orderId, status:shipping.status};
}

export const updateShippingStatus = async (shippingId: number, status: string) => {
    const shipping=await AppDataSource.getRepository(Shipping).findOne({ 
        where: { id: shippingId } 
    });
    if(!shipping){
        throw new Error('Shipping not found');
    }
    shipping.status=status;
    await AppDataSource.getRepository(Shipping).save(shipping);
    return shipping;
}

export const consumeOrderFromQueue = async ()=>{
    try{
        const rabbitmqUri=process.env.RABBITMQ_URI || 'amqp://localhost:5672';
        const connection=await amqp.connect(rabbitmqUri);
        const channel=await connection.createChannel();
        const queue='orderQueue';
        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, (msg)=>{
            if(msg){
                const order=JSON.parse(msg.content.toString());
                console.log('Order received', order);
                createShipping(order.orderId, order.address);
                console.log('Shipping created', order.orderId);
                channel.ack(msg);
            }
        }, { noAck: false });
    }catch(error){
        console.error('Error consuming order from queue:', error);
        throw error;
    }
}

consumeOrderFromQueue();

export const getShippingAll = async () => {
    const shipping = await AppDataSource.getRepository(Shipping).find();
    return shipping;
}
