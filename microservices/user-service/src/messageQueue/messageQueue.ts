import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    console.log('RabbitMQ connected');
    return channel;
  } catch (error) {
    console.error('RabbitMQ connection failed', error);
  }
};

export default connectRabbitMQ;
