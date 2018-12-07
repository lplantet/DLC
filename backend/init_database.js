const mysql = require('mysql');

console.log('Connecting to mysql...');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
});

connection.connect();

// Drop the database if it already exists
console.log('Removing current database...')
connection.query('DROP DATABASE IF EXISTS dlc;');

// Create the database
console.log('Creating database...')
connection.query('CREATE DATABASE dlc;');
connection.query('USE dlc;');

// Create the movies table
console.log('Creating table \'movies\'...');
connection.query(`CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  genre VARCHAR(255) NOT NULL,
  rating DECIMAL(3,2) NOT NULL
);`);

console.log('Closing connection...');
connection.end();

console.log('\nDatabase has been initialized');
