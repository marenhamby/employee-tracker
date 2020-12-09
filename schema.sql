-- remove existing database, if already present --
DROP DATABASE IF EXISTS staff_trackerDB;

-- create new database for this project --
CREATE DATABASE staff_trackerDB;

-- outline which databse will be used for the rest of this document --
USE staff_trackerDB;

-- create tables to be used in this application --
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
