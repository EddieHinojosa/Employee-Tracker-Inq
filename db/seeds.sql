\c employees_db;

INSERT INTO Department(name)
VALUES 
    ('Sales'), 
    ('Engineer'), 
    ('Finance'), 
    ('Legal');

INSERT INTO Role (Department_Id, Title, Salary)
VALUES 
    (1, 'Sales Lead', 100000),
    (1, 'Salesperson', 80000),
    (2, 'Lead Engineer', 150000),
    (2, 'Software Engineer', 120000),
    (3, 'Account Manager', 160000),
    (3, 'Accountant', 125000),
    (4, 'Legal Team Lead', 250000),
    (4, 'Lawyer', 190000);

INSERT INTO Employee (First_Name, Last_Name, Role_Id, Manager_Id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);