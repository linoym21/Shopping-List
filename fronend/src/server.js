// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6731052',
    database: 'shopping list'
});

const app = express();
app.use(bodyParser.json());

// Get all items
app.get('/items', (req, res) => {
    connection.query('SELECT * FROM items', (error, results) => {
        if (error) {
            console.error('Error fetching items: ', error);
            res.status(500).json({ error: 'Error fetching items' });
            return;
        }
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
