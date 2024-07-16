require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const pg = require("pg");
const PORT = process.env.PORT || 3001;
const app = express();
const { Pool } = require("pg");

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Connect to db with credentials from .env file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

pool.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to the database 🤘");
        inputSelection();
    }
})

function inputSelection() {
    inquirer.prompt({



        
    })
}


