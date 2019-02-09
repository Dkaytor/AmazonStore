var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

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

connection.connect(function (err) {
    if (err) throw err;
    readProducts();

});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement

        console.table(res);
        startTransaction();

    });
}

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
        .then(function (checkQuantity) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { id: checkQuantity.id },
                function (err, res) {
                    console.log("checkQuantity id " + checkQuantity.id);
                    console.log("checkQuantity stock " + checkQuantity.stock_quantity);
                    for (var i = 0; i < res.length; i++) {
                        console.log("stock: " + res[i].stock_quantity);
                        if (checkQuantity.stock_quantity > res[i].stock_quantity) {
                            console.log("We have insufficient quantity to place your order");
                        }
                        else {
                            console.log("We are placing your order!");
                            //placeOrder();
                            console.log("Check Quant order " + checkQuantity.stock_quantity);
                            console.log("Check Quant stock " + res[i].stock_quantity);
                                                  
                            newQuantity = res[i].stock_quantity - checkQuantity.stock_quantity;
                            console.log("new quantity " + newQuantity);
                        
                        }
                        
                        
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                  {
                                    id: checkQuantity.id
                                  },
                                  {
                                    stock_quantity: res[i].stock_quantity
                                  }
                                ],
                                function(error) {
                                  if (error) throw err;
                                  console.log("new stock " + newQuantity);
                                  
                                }
                              );
                              connection.end();
                    }
                }
            
                )
                
                
        });

       
}

function updateQty() {
    //console.log("update stock " + res[i].stock_quantity);
}
