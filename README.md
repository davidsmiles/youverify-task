# Youverify Task Challenge

This is an E-Commerce microservices architecture application to enable certain services communicate seamlessly.

## How To Run

Ensure you have docker and docker-compose
Use the [docker-compose](https://docs.docker.com/compose/install/) to run.


```bash
docker-compose up --build --detach
```

## Services
- Customer
- Product
- Order
- Payment

## Procedure
- When a customer makes an order, a message/request (containing data like customerId, productId, amount etc.) should be sent to the order service using a REST (RESTful) base communication.

- The order service in turn sends a request (containing customerId, orderId, amount) to the payment service, the order (which should contain the customerId, productId, orderId, amount and orderStatus [pending]) should be saved in the database and also a response (this response should contain the customerId, orderId, productId, and orderStatus) be sent back to the customer.

- The payment service should publish transaction details (customerId, orderId, productId, and amount) to a rabbitmq messaging queue and a worker at the end of the queue should save the queued data in the database transaction history.


## Ports
- Customer  /8080
- Product   /8081
- Order     /8082
- Payment   /8083

Didn't utilize NGINX to make it all run on PORT 80

## Endpoints available
[Postman Documentation Available HERE](https://documenter.getpostman.com/view/8673257/U16ks5Vi)
```
For the ease of simplicity, only necessary endpoints covered.

/GET /customers/:id Get a specific customer by id
/GET /customers Get all customers
/POST /customers Customer signup --header Content-Type application/json
{
    name: david,
    email: ugberodavid@gmail.com,
    password: 1234
}

/GET /products/:id Get a specific product by id
/GET /products Get all products
/POST /products Add a new product --header
{
    name: Product1,
    description: Description for product 1,
    amount: 120,000
}

/GET /orders Get all orders in the DB, can be filtered by customerId, productId passed as Query param
/POST /orders Make an order - endpoint made by a customer --header Content-Type application/json
{
    customerId: 163863894639,
    productId: 8749749479ehf9,
    amount: 120,000
}

/GET /payments Retrieve all Payments data
```

## Tests
```bash
cd {the-service-folder} && npm test
```

## Notes
I ensured to follow and execute the procedure perfectly.   
However, This Microservices does not cover certain core implemenations in a REST API:
- **AUTHENTICATION** - _actual signup or login._
- **AUTHORIZATION**  - _JSON WEB TOKENS._
- **VALIDATION**     - _The Order Service does not check to see that customerId or productId are indeed valid._
  
## Author
**David Ugbero <ugberodavid@gmail.com>**