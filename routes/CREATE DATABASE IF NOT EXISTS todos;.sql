CREATE DATABASE IF NOT EXISTS todos;
CREATE TABLE IF NOT EXISTS todo(
    id serial,
    task varchar(255),
    description varchar(100),
    status varchar(10),
    priority varchar(10)
);