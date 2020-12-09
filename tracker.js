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
    //Run function to start asking the user questions
    startTracker();
});



//Outline questions that the user will be given in the terminal

//first ask the user what task they would like to do
function startTracker() {
    inquirer.prompt({  
        type: 'action',
        message: 'What would you like to do?',
        name: 'task',
        choices: ['View all employees', 'Add employee', 'Remove employee', 'Exit']
    }).then(function (answer) {
        //change what is presented to the user based on their answer to the question above
        switch (answer.task) {
        case 'View all employees':
            console.log('I want to view employees');
            // currentEmployees();
            break;

        case 'Add employee':
            console.log('I want to add employees');
            addEmployees();
            break;

        case 'Remove employee':
            console.log('I want to remove employees');
            break;

        case 'Exit':
            console.log('I want this to be over');
            connection.end();
            break;   
        }
    });
};

//Add function to view the current employees


//Add function to add an employee
function addEmployees() {
    inquirer.prompt([
        {  
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first',
        },
        {  
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last',
        },
        {  
        type: 'list',
        message: "What is the employee's role?",
        name: 'role',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Jr. Software Engineer', 'COO', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
    ]).then(function (answer) {
        //add the new user to the employee database
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role
            },
            function(err) {
                if(err) throw err;
                console.log("added!");
                startTracker();
            }
        )
    });
};

//Add function to remove an employee