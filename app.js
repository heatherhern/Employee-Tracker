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
                "Add a Role",
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
                    // songSearch();
                    break;

                case "Add an Employee":
                    // songAndAlbumSearch();
                    break;

                case "Update Employee Roles":
                    // songAndAlbumSearch();
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
}