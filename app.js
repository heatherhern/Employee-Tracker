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
                    // artistSearch();
                    break;

                case "View Employees":
                    // multiSearch();
                    break;

                case "View Roles":
                    // rangeSearch();
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