const Product = require('./models/product')

const names = [
    "Product 1", "Product 2", "Product 3", "Product 4", "Product 5", 
    "Product 6", "Product 7", "Product 8", "Product 9", "Product 10"
]


const products = names.map(name => ({
    name,
    description: `Description for ${name}`,
    amount: 1000,
}))

module.exports = function seed(){
    Product
    .insertMany(products)
    .then(
        function(){
            console.log("product seed data inserted")
        }
    )
    .catch(
        function(error){
            console.log("product seed data already inserted")
        }
    )
}
