DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(100),
 department_name VARCHAR(100),
 price DECIMAL(10,2) NULL,
 stock_quantity INTEGER(100),
 PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Assassin''s Creed', 'Video Games', 29.97, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Milk-Bone Hot Dog Treats', 'Pet Supplies', 8.24, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Verses for the Dead', 'Books', 14.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Neutrogena Ultra Gentle Cleanser', 'Beauty and Personal Care', 23.43, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Echo Dot', 'Devices', 29.99, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Tiffany Lamp', 'Home and Kitchen', 79.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Jenga', 'Games', 8.55, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Pet Bed', 'Pet Supplies', 13.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Pure 80s', 'CDs and Vinyl', 10.68, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Dracula', 'Books', 9.00, 60);

