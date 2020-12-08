//Add module dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//Outline information for database connection
var connection = mysql.createConnection({
  host: "localhost",

  //Add the port for mysql
  port: 3306,

  //Add default username
  user: "root",

  //Add default password
  password: "",
  database: "staff_trackerDB"
});

//Make the connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});


//Outline questions that the user will be given in the terminal
function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'task',
            choices: ['View all employees', 'Add employee', 'Remove employee']
        }
    ])
}