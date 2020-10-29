var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// mySQL Connection //

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    questions();
});

function questions() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Employees",
                "View Roles",
                "Add a Department",
                "Add an Employee",
                "Add an Employee Role",
                "Update Employee Roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Departments":
                    if (answer.action === "View Departments") {
                        viewDepartments();
                        break;
                    }

                case "View Employees":
                    viewEmployees();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add an Employee":
                    addEmployee()
                    break;

                case "Add an Employee Role":
                    addRoles();
                    break;

                case "Update Employee Roles":
                    updateRoles();
                    break;
            }
        });
}


function viewDepartments() {
    // query the database for all departments
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        let resultsArray = [];
        for (var i = 0; i < res.length; i++) {
            resultsArray.push(res[i].dept_name);
        }
        console.log("Here are the departments...")
        console.table(resultsArray);
        // return resultsArray;
        questions();
    })
}

function viewEmployees() {
    // query the database for all employees
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        let resultsArray = [];
        for (var i = 0; i < res.length; i++) {
            resultsArray.push(res[i].first_name);
            // how to get the last name too?
        }
        console.log("Here are the employees...")
        console.table(resultsArray);
        // return resultsArray;
        questions();
    })
}

function viewRoles() {
    // query the database for all Roles
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        let resultsArray = [];
        for (var i = 0; i < res.length; i++) {
            resultsArray.push(res[i].title);
        }
        console.log("Here are the roles...")
        console.table(resultsArray);
        // return resultsArray;
        questions();
    })
    // need to re-run questions function at the end of other functions
}


function addDepartment() {
    // prompt for info about the Department
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What Department would you like to add?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert Department
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    dept_name: answer.deptName,
                },
            )
            console.table("Your new department has been added!");
            questions();
        });
};


function addRoles() {
    // prompt for info about the Role
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What Role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What salary does this position have?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert Role
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.salary
                },
            )
            console.table("Your new role has been added!")
            questions();
        });
};

function addEmployee() {
    // prompt for info about the Employee
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee you want to add?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee you want to add?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert Role
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                },
            )
            console.table("Your new employee has been added!")
            questions();
        });
};

// function updateRoles() {
//     inquirer
//         .prompt([
//             {
//                 name: "employeeName",
//                 type: "input",
//                 message: "What is the first name of the employee you want to update?"
//             },
//             {
//                 name: "employeeRole",
//                 type: "input",
//                 message: "What is their new role?"
//             },
//         ])
//         .then(function (answer) {
//             connection.query(

//                 "SELECT * FROM employees JOIN roles on employees.role_id = roles.id"
//                 "UPDATE employees WHERE first_name = answer.employeeName "
//                 // "SELECT first_name FROM employees AS a INNER JOIN roles AS b ON a.role_id = b.id and UPDATE employees SET role_id WHERE first_name = answer.employeeName",
//                 // "SELECT ? FROM employees WHERE first_name = answer.employeeName",
//             //     {
//             //         first_name: answer.employeeName,
//             //         role_id: answer.employeeRole
//             //     },
//             // )
//                 // console.log("Your employee has been updated!")
//         }
//         );
//         };
//         // need to re call questions at the end of all functions

function updateEmployeeRole(id, role_id) {
    return this.connection.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [role_id, id]
    )
}

function findAllRoles() {
    return this.connection.query(
        "SELECT role.id, role.title, departments.dept_name AS department, roles.salary FROM roles LEFT JOIN departments on roles.departments_id = departments.id;"
    );
};

function findAllEmployees() {
    return this.connection.query(
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;"
    );
};

async function updateRoles() {
    const employees = await findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);


    await updateEmployeeRole(employeeId, roleId);

    console.log("Updated employee's role");

    // questionPrompts();
};