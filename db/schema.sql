DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE Department (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE Role (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(30) UNIQUE NOT NULL,
    Salary DECIMAL NOT NULL,
    Dept_Id INTERGER NOT NULL,
    FOREIGN KEY (Dept_Id) REFERENCES Department(Id)
);

CREATE TABLE Employee (
    Id SERIAL PRIMARY KEY,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Role_Id INTEGER NOT NULL,
    Manager_Id INTEGER,
    FOREIGN KEY (Role_Id) REFERENCES Department(Id)
    FOREIGN KEY (Manager_Id) REFERENCES Employee(Id)
);