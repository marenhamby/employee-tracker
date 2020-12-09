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
        type: 'list',
        message: 'What would you like to do?',
        name: 'task',
        choices: ['View all employees', 'Add employee', 'Remove employee', 'Exit']
    }).then(function (answer) {
        //change what is presented to the user based on their answer to the question above
        switch (answer.task) {
        case 'View all employees':
            console.log('I want to view employees');
            currentEmployees();
            break;

        case 'Add employee':
            console.log('I want to add employees');
            addEmployees();
            break;

        case 'Remove employee':
            console.log('I want to remove employees');
            removeEmployees();
            break;

        case 'Exit':
            console.log('I want this to be over');
            connection.end();
            break;   
        }
    });
};


//Add function to view the current employees
function currentEmployees() {
    var search = connection.query(`SELECT employee.id, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Role, role.salary as Salary, department.name as Department 
    FROM ((employee 
    LEFT JOIN role ON employee.role_id = role.id) 
    LEFT JOIN department ON role.department_id = department.id)`,
    function (err, res) {
        if (err) throw err;
        console.table(res);
    });
};

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
        switch (answer.role) {
            case 'Sales Lead': answer.role = 1;
            break;
            case 'Salesperson': answer.role = 2;
            break;
            case 'Lead Engineer': answer.role = 3;
            break;
            case 'Software Engineer': answer.role = 4;
            break;
            case 'Jr. Software Engineer': answer.role = 5;
            break;
            case 'COO': answer.role = 6;
            break;
            case 'Accountant': answer.role = 7;
            break;
            case 'Legal Team Lead': answer.role = 8;
            break;
            case 'Lawyer': answer.role = 9;
            break;
        }
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
function removeEmployees() {
    inquirer.prompt({  
        type: 'list',
        message: 'Who would you like to remove?',
        name: 'task',
        choices: []
    }).then(function (answer) {

}