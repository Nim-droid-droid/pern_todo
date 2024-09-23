CREATE DATABASE perntodo;

CREATE TABLE todo(
  -- this column is going to make each to do unique so i can do CRUD on it e.g. update/delete/create a todo
  -- SERIAL increments my primary key val for me to insure uniqueness 
  todo_id SERIAL PRIMARY KEY,
  -- description Can store max characters of 255
  description VARCHAR(255)
)