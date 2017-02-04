CREATE TABLE if not exists messages
(
    id serial PRIMARY KEY,
    user_id int references users(id),
    user_name varchar(255),
    message TEXT
);