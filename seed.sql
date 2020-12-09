-- outline which databse will be used for the rest of this document --
USE staff_trackerDB;

-- add starter department, role, and employee info to the database --

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 120000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 110000, 2), ('Softwawre Engineer', 90000, 2), ('Jr. Softwawre Engineer', 50000, 2), ('COO', 150000, 3), ('Accountant', 130000, 3), ('Legal Team Lead', 180000, 4), ('Lawyer', 115000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Neil', 'Weasley', 'Sales Lead'), ('Kenley', 'Bruzz', 'Salesperson'), ('Mark', 'Smith', 'Salesperson'), ('Jenn', 'Bon', 'Lead Engineer'), ('Robert', 'Wallace', 'Softwawre Engineer'), ('Talita', 'McNoll', 'Jr. Softwawre Engineer'), ('Meagan', 'Bruzz', 'COO'), ('Andrea', 'Williams', 'Accountant'), ('Courtney', 'Cramer', 'Accountant'), ('Lydia', 'Howell', 'Legal Team Lead'), ('Laura', 'Smicket', 'Lawyer'), ('JimBob', 'Dixon', 'Lawyer');

