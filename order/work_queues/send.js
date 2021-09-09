const amqp = require('amqplib')


module.exports.sendToQueue = async (queueName, data) => {
    const connection = await amqp.connect('amqp://rabbitmq')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable: false})

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {persistent: true})
    console.log(`Message: ${JSON.stringify(data)}`)
}
