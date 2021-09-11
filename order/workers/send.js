import { connect } from 'amqplib'


export async function sendToQueue(queueName, data) {
    /**
     * @param {string} queueName The name of the Queue to forward message to
     * @param {JSON} data The data to be sent
     */
    const connection = await connect('amqp://rabbitmq')

    console.log('Order Service RabbitMq Connected')

    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable: false})

    channel.sendToQueue(queueName, Buffer.from(data), {persistent: true})
    console.log(`Message: ${data}`)
}
