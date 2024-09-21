CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  -- description Can store max characters of 255
  description VARCHAR(255)
)