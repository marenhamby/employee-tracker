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
connection.connect(function (err) {
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
        choices: ['View all employees', 'View all roles', 'View all departments', 'Add employee', 'Change employee role', 'Exit']
    }).then(function (answer) {
        //change what is presented to the user based on their answer to the question above
        switch (answer.task) {
            case 'View all employees':
                currentEmployees();
                break;

            case 'View all roles':
                currentRoles();
                break;

            case 'View all departments':
                currentRoles();
                break;
            
            case 'Add employee':
                addEmployees();
                break;

            case 'Change employee role':
                changeRole();
                break;

            case 'Exit':
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
            startTracker();
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
            function (err) {
                if (err) throw err;
                console.log("added!");
                startTracker();
            }
        )
    });
};

// Add function to change an employee's role
function changeRole() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        const empList = results.map(person => { return { name: `${person.first_name} ${person.last_name}`, value: person.id } })
        connection.query("SELECT * FROM role", function (err, results) {
            const roleList = results.map(role => { return { name: role.title, value: role.id } })
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Whose role would you like to change?',
                    name: 'person',
                    choices: empList
                },
                {
                    type: 'list',
                    message: "What is the employee's new role?",
                    name: 'role',
                    choices: roleList
                }
            ]).then(function ({person, role}) {
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?",[role, person], err=>{
                    if (err) console.log(err)
                    startTracker()
                })
            })
        })
    })


};