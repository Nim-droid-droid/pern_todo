CREATE DATABASE perntodo;

CREATE TABLE todo(
  -- this column is going to make each to do unique so i can do CRUD on it e.g. update/delete/create a todo
  todo_id SERIAL PRIMARY KEY,
  -- description Can store max characters of 255
  description VARCHAR(255)
)