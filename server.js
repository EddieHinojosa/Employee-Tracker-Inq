require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");
const PORT = process.env.PORT || 3001;
const app = express();


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
        name: "Main_Menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
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
            // "View Total Salary per Department"
        ],
    })
    .then((answer) => {
        switch (answer.Main_Menu) {
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
    });
};

//VIEW ALL section 👇👇👇👇👇

//View All employees
function viewAllEmployees() {
    pool.query ("SELECT * FROM Employee", (err, res) => {
        if (err) {
            console.error(err);
            return inputSelection();
        } 
            console.table(res.rows);
            inputSelection();
    })
};


//View All Roles
function viewAllRoles() {
    pool.query ("SELECT * FROM Roles", (err, res) => {
        if (err) {
            console.error(err);
            return inputSelection();
        } 
            console.table(res.rows);
            inputSelection();
    })
};



//View All Departments
function viewAllDepartments() {
    pool.query ("SELECT * FROM Department", (err, res) => {
        if (err) {
            console.error(err);
            return inputSelection();
        } 
            console.table(res.rows);
            inputSelection();
    })
};

//VIEW ALL section  👆👆👆👆👆

//------------------------------------------------------------

//ADD section 👇👇👇👇👇


//Add Employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee's first name",
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter employee's last name",
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter employee's role ID",
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter employee's manager ID",
        },
    ])
    .then((answer) => {
        pool.query(
            "INSERT INTO Employee (First_Name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
            (err, res) => {
                if (err) {
                    console.error(err);
                    return inputSelection();
                }
                console.log(`Employee ${answer.First_Name, answer.Last_Name} added successfully`);
                inputSelection();
            }
        );
    });
};


//Add Role
async function addRole() {
    const { rows:Roles } = await pool.query("SELECT * FROM Roles");
    const rolesList = Roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    inquirer.prompt([
        {
            name: "Title",
            type: "input",
            message: "Enter role title",
        },
        {
            name: "Salary",
            type: "input",
            message: "Enter role salary",
        },
        {
            name: "Dept_id",
            type: "list",
            message: "What would you like to do?",
            choices: rolesList
        },
    ])
    .then((answer) => {
        pool.query(
            "INSERT INTO Roles (Title, Salary, Dept_id) VALUES ($1, $2, $3)",
            [answer.Title, parseFloat(answer.Salary), answer.Dept_id],
            (err, res) => {
                if (err) {
                    console.error(err);
                    return inputSelection();
                }
                console.log(`Role ${answer.Title} added successfully`);
                inputSelection();
            }
        );
    });
};






//Update Employee Role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employee_id",
            type: "input",
            message: "Enter employee's ID",
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter employee's new role ID",
        },
    ])
    .then((answer) => {
        pool.query(
            "UPDATE Employee SET role_id = $1 WHERE id = $2",
            [answer.role_id, answer.employee_id],
            (err, res) => {
                if (err) {
                    console.error(err);
                    return inputSelection();
                }
                console.log(`Employee ${answer.employee_id} role updated successfully`);
                inputSelection();
            }
        );
    });
};




app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});