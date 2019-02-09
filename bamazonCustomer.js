//These are dependencies needed to run the app
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

//This creates the connection to the local host, my computer
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "jake0104",
    database: "bamazon_db"
});

//This starts the program by checking the connection and if good starts the function readProducts
connection.connect(function (err) {
    if (err) throw err;
    readProducts();

});

//This function calls out to the sql database to pull in information on certain columns we want the customer to be able to see
function readProducts() {
    
    connection.query("SELECT id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        //This is a npm addin to make a better looking table
        console.table(res);
        //Once the table is shown, the function startTransaction is called
        startTransaction();

    });
}

//This function starts by using inquirer to gather data from the client
function startTransaction() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the product you want to purchase?",
            name: "id",
            validate: function validateId(id) {
                return id !== '';
            }
        },
        {
            type: "input",
            message: "Please enter quantity of product you wish to purchase",
            name: "stock_quantity",
            validate: function validateId(stock_quantity) {
                return stock_quantity !== '';
            }
        }


    ])
        //This function checks the input from inquirer to see if there is enough quantity on hand
        .then(function (checkQuantity) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { id: checkQuantity.id },
                function (err, res) {
                    
                    for (var i = 0; i < res.length; i++) {
                        
                        if (checkQuantity.stock_quantity > res[i].stock_quantity) {
                            console.log("We have insufficient quantity to place your order");
                            contShopping();
                        }
                        else {
                            console.log("We are placing your order!");
                                //This section calculates the cost of the purchase and lets the customer know
                                var cost = checkQuantity.stock_quantity * res[0].price;                          
                                console.log("Your cost is $" + parseFloat(cost).toFixed(2));
                                newQty = res[i].stock_quantity - checkQuantity.stock_quantity;
                           
                                //Once the previous function confirms that there is enough stock on hand
                                //this function then takes the order quantity and subtracts it from the 
                                //quantity on hand to get the new quanity on hand and updates
                                //sql with the new stock quantity
                                var query = connection.query(
                                "UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE id=?",
                                [checkQuantity.stock_quantity, checkQuantity.id],
                                        
                                function (error) {
                                    if (error) throw err;
                                    contShopping();
                                  
                                }
                            );
                        }
                        
                        
                    }
                }

            )


        });


}

//This function comes after the customer request is taken
//This is the way that the program ends based on whether
//they want to continue or not
function contShopping() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to continue shopping?",
            name: "id",
            
            }
        
    ])
    .then ( function (cont) {

        if (cont.id === true) {
            readProducts();
        }
        else {
            console.log("Have a good day!");
            connection.end();
        }
    })
}
