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
        name: "Main Menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Emplyee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            
            // "Update Employee Manager",
            // "View Employeee by Manager",
            // "View emnployee by Department",
            // "Delete Department",
            // "Delete Role",
            // "Delete Emplyee",
            // "View TOTAL Salary per department"
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            
            
                // case "Update Employee Manager":
            //     updateEmployeeManager();
            //     break;
            // case "View Employee by Manager":
            //     viewEmployeeByManager();
            //     break;
            // case "View Employee by Department":
            //     viewEmployeeByDepartment();
            //     break;
            // case "Delete Department":
            //     deleteDepartment();
            //     break;
            // case "Delete Role":
            //     deleteRole();
            //     break;
            // case "Delete Employee":
            //     deleteEmployee();
            //     break;
            // case "View Total Salary per Department":
            //     viewTotalSalaryPerDepartment();
            //     break;
        }
    }



    )};
