DROP DATABASE IF EXISTS staff_trackerDB;

CREATE DATABASE staff_trackerDB;

USE staff_trackerDB;

CREATE TABLE department (
    id  INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
)