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
        connection.end();

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
            var query = connection.query(
                "SELECT * FROM products WHERE ?",
                {
                    id: inquirer.id
                },
                function (err, res) {
                if (inquirerResponse.id > res[0].stock_quantity) {
                   console.log("Insufficient quantity!")
                }
                else {
                    console.log("Purchasing");
                }
            }
            )
        });

}

