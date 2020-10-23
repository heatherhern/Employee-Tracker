var mysql = require("mysql");
var inquirer = require("inquirer");

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
            name: "viewDepartment",
            type: "input",
            message: "View a Department"
        })

        .prompt({
            name: "viewRoles",
            type: "input",
            message: "View Roles"
        })

        .prompt({
            name: "viewEmployees",
            type: "input",
            message: "View Employees"
        })

        .prompt({
            name: "addDepartment",
            type: "input",
            message: "Add a Department"
        })

        .prompt({
            name: "addRole",
            type: "input",
            message: "Add a Role"
        })

        .prompt({
            name: "addEmployee",
            type: "input",
            message: "Add an Employee"
        })

        .prompt({
            name: "updateEmployeeRoles",
            type: "input",
            message: "Update Employee Roles"
        })



    // .then(function (answer) {
    //     console.log(answer.song);
    //     connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
    //         if (err) throw err;
    //         console.log(
    //             "Position: " +
    //             res[0].position +
    //             " || Song: " +
    //             res[0].song +
    //             " || Artist: " +
    //             res[0].artist +
    //             " || Year: " +
    //             res[0].year
    //         );
    //         runSearch();
    //     });
    // });
}
