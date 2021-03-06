const amqp = require('amqplib')


module.exports.sendToQueue = async (queueName, data) => {
    /**
     * @param {string} queueName The name of the Queue to forward message to
     * @param {JSON} data The data to be sent
     */
    const uri = process.env.RABBITMQ_URI || 'amqp://localhost:5672'
    const connection = await amqp.connect(uri)

    console.log('Order Service RabbitMq Connected')

    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable: false})

    channel.sendToQueue(queueName, Buffer.from(data), {persistent: true})
    console.log(`Message: ${data}`)

    connection.close()
}
