const amqp = require('amqplib')
const Payment = require('../models/payment')


module.exports.publishTransaction = async (channel, exchangeName, data) => {
    await channel.assertExchange(exchangeName, 'fanout', {durable: false})
    channel.publish(exchangeName, '', Buffer.from(data))

    console.log(`Data PUBLISHED to Rabbit Messaging Queue on Exchange ${exchangeName} : ${data}`)
}

module.exports.saveQueuedTransaction = async (channel, exchangeName) => {
    await channel.assertExchange(exchangeName, 'fanout', {durable: false})

    const q = await channel.assertQueue('', {durable: false})
    
    console.log(`Waiting for messages in queue: ${q.queue}`)

    channel.bindQueue(q.queue, exchangeName, '')
    channel.consume(q.queue, async data => {
        const payload = {customerId, productId, orderId, amount} = JSON.parse(data.content)
        
        const payment = new Payment({
                customerId,
                productId,
                orderId,
                amount
              })
        const newpayment = await payment.save()
        console.log(`Data received from Exchange '${exchangeName}': ${JSON.stringify(payload)}`)
        console.log(`Transaction Data Saved to DB': ${JSON.stringify(newpayment)}`)

        channel.ack(data)
    })
}