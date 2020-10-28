var mysql = require("mysql");
var inquirer = require("inquirer");

// mySQL Connection //

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Herbie101!",
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

                case "Update Employee Roles":
                    addRoles();
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
        console.log(resultsArray);
        // return resultsArray;
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
        console.log(resultsArray);
        // return resultsArray;
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
        console.log(resultsArray);
        // return resultsArray;
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
            console.log("Your new department has been added!")
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
                    console.log("Your new role has been added!")
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
                            console.log("Your new employee has been added!")
                            });
                        };


        // need to re call questions at the end of all functions 
