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

//Run function to start asking the user questions
startTracker();

//Outline questions that the user will be given in the terminal

//first ask the user what task they would like to do
function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'task',
            choices: ['View all employees', 'Add employee', 'Remove employee', 'Exit']
        }
    ]).then(function ({role}) {
        //change what is presented to the user based on their answer to the question above
        if (task === 'View all employees') {
            console.log('I want to view employees')
        };
        if (task === 'Add employee') {
            console.log('I want to add employees')
        };
        if (task === 'Remove employee') {
            console.log('I want to remove employees')
        };
        if (task === 'Exit') {
            console.log('I want this to be over');
            connection.end();
        };
    })
};

//Add function to view the current employees

//Add function to add an employee

//Add function to remove an employee