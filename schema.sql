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
salary DECIMAL(10,2) NOT NULL,
department_id INTEGER NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
id INTEGER(30) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100),
last_name VARCHAR(100),
role_id INTEGER,
manager_id INTEGER NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL,
FOREIGN KEY (manager_id) REFERENCES employees(role_id) ON DELETE SET NULL
);

INSERT INTO departments (dept_name) values ('Management');
INSERT INTO departments (dept_name) values ('Fulfillment');
INSERT INTO departments (dept_name) values ('Production');
INSERT INTO departments (dept_name) values ('Quality Control');

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

INSERT INTO employees (first_name, last_name) values ('John', 'Gibbs');
INSERT INTO employees (first_name, last_name) values ('Gray', 'Cohen');
INSERT INTO employees (first_name, last_name) values ('Rachel', 'Wood');
INSERT INTO employees (first_name, last_name) values ('Levi', 'Corbett');
INSERT INTO employees (first_name, last_name) values ('Connor', 'Allen');
INSERT INTO employees (first_name, last_name) values ('Cole', 'Winton');
INSERT INTO employees (first_name, last_name) values ('Abigail', 'Frazier');
INSERT INTO employees (first_name, last_name) values ('Dylan', 'Mikres');
INSERT INTO employees (first_name, last_name) values ('Trent', 'Sims');

INSERT INTO roles (title, salary, department_id) values ('Operations Manager', 70000, 1);
INSERT INTO roles (title, salary, department_id) values ('Fulfillment Specialist', 40000, 2);
INSERT INTO roles (title, salary, department_id) values ('Painter', 45000, NULL);
INSERT INTO roles (title, salary, department_id) values ('Production Lead', 50000, 3);
INSERT INTO roles (title, salary, department_id) values ('Paint Lead', 60000, NULL);