const amqp = require('amqplib')


module.exports.Consume = async (queueName, payload) => {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable: false})

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {persistent: true})
    console.log(`Message: ${JSON.stringify(payload)}`)

    setTimeout(() => {
        connection.close()
        process.exit(0)
    })
}
