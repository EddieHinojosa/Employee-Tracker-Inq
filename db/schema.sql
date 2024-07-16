DROP DATABASE IF EXISTS employees_tracker_db;
CREATE DATABASE employees_tracker_db;

\c employees_tracker_db;

CREATE TABLE Department (
    ID SERIAL PRIMARY KEY,
    Dept_Name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE Roles (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(30) UNIQUE NOT NULL,
    Salary DECIMAL NOT NULL,
    Dept_Id INTEGER NOT NULL,
    FOREIGN KEY(Dept_Id) REFERENCES Department(Id)
);

CREATE TABLE Employee (
    Id SERIAL PRIMARY KEY,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Role_Id INTEGER NOT NULL,
    Manager_Id INTEGER,
    FOREIGN KEY(Role_Id) REFERENCES Roles(Id),
    FOREIGN KEY(Manager_Id) REFERENCES Employee(Id)
);