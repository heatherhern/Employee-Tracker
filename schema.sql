DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments (
id INTEGER AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INTEGER(30) NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,4) NOT NULL,
department_id INTEGER(15) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
id INTEGER(30) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100),
last_name VARCHAR(100),
role_id INTEGER,
manager_id INTEGER NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles (id),
FOREIGN KEY (manager_id) REFERENCES employees(role_id)
);

INSERT INTO departments (id, dept_name) values ('1', 'Management');
INSERT INTO departments (id, dept_name) values ('2', 'Fulfillment');

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;