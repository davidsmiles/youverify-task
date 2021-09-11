import Payment from '../models/payment'


export async function publishTransaction(channel, exchangeName, data) {
    /**
     * Publishes Transaction Details to a Rabbitmq Messaging Queue, as instructed
     * 
     * @param {Object} channel The RabbitMQ channel to use
     * @param {Object} exchangeName The name of the Exchange to publish to
     * @param {JSON} data The data to publish
     */
    await channel.assertExchange(exchangeName, 'fanout', {durable: false})
    channel.publish(exchangeName, '', Buffer.from(data))

    console.log(`Data PUBLISHED to Rabbit Messaging Queue on Exchange ${exchangeName} : ${data}`)
}

export async function saveQueuedTransaction(channel, exchangeName) {
    /**
     * Consumes data previously published and most importantly..
     * Saves the queued data in the database
     * 
     * @param {Object} channel The RabbitMQ channel to use
     * @param {Object} exchangeName The name of the Exchange to publish to
     */

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