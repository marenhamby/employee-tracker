--remove existing database, if already present
DROP DATABASE IF EXISTS staff_trackerDB;

--create new database for this project
CREATE DATABASE staff_trackerDB;

--outline which databse will be used for the rest of this document
USE staff_trackerDB;

CREATE TABLE department (
    id  INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
)