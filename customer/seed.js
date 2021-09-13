const Customer = require('./models/customer')

const names = ["John", "Joanne", "Bob", "Will", "Chris", "Mike", "Anna", "Jack", "Peter", "Paul"];


const customers = names.map(name => ({
    name,
    email: `${name}@gmail.com`,
    password: "password",
}))

module.exports = function seed(){
    Customer
    .insertMany(customers)
    .then(
        function(){
            console.log("Customer seed data inserted")
        }
    )
    .catch(
        function(error){
            console.log("Customer seed data already inserted")
        }
    )
}
