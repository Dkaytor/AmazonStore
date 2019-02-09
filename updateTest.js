var mysql = require("mysql");
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
  updateProduct();

});


function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        id: 9
      },
      {
        stock_quantity: 60
      }
    ],
    function(err, res) {
      console.log(" products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("showing new table...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    console.table(res);
    connection.end();

});

  
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
