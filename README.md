# AmazonStore

This app simulates shopping with Amazon.

When you log on you are given a table of items for sale.
Each item shows the item id, item name and item price.
Quantities on hand are not shown but kept in an sql table to check if we have enough quantity on hand.

Once the table is shown the user is prompted to input the item id they want to purchase and how much quantity they want to purchase.
The app then checks this request against the sql table to see if there is sufficient quantity to complete the transaction.
If there is not sufficient quantity a message pops up saying insufficient quantity.
It then asks if they want to continue shopping.
If they respond no the terminal prints "Have a good day" and ends the connection to the sql table.

If there is sufficient quantity to meet the request, the terminal prints "We are placing your order!".
The app then states how much the purchase costs.
Once the cost is shown, the app then asks if they want to continue shopping.
If no then the terminal prints "Have a good day" and ends the connection to the sql table.
If yes, then the table is shown again and the process starts over.