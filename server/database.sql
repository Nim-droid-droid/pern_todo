CREATE DATABASE perntodo;

CREATE TABLE todo(
  -- this column is going to make each to do unique so i can do CRUD on it e.g. update/delete/create a todo
  -- SERIAL increments my primary key val for me to insure uniqueness - SERIAL data type stores a sequential integer, of the INT data type, that is automatically assigned by the database server when a new row is inserted.
  -- doesnt have to be called todo_id can be called anything.
  todo_id SERIAL PRIMARY KEY,
  -- description Can store max characters of 255
  description VARCHAR(255)
)