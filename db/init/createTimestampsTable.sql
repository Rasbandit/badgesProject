CREATE TABLE if not exists timestamps
(
    id serial PRIMARY KEY,
    user_id int references users(id),
    user_name varchar(255),
    htmlStartTime TIMESTAMP WITH TIME ZONE,
    htmlEndTime TIMESTAMP WITH TIME ZONE,
    basicJsStartTime TIMESTAMP WITH TIME ZONE,
    basicJsEndTime TIMESTAMP WITH TIME ZONE,
    intJsStartTime TIMESTAMP WITH TIME ZONE,
    intJsEndTime TIMESTAMP WITH TIME ZONE,
    angularStartTime TIMESTAMP WITH TIME ZONE,
    angularEndTime TIMESTAMP WITH TIME ZONE,
    nodeStartTime TIMESTAMP WITH TIME ZONE,
    nodeEndTime TIMESTAMP WITH TIME ZONE,
    sqlStartTime TIMESTAMP WITH TIME ZONE,
    sqlEndTime TIMESTAMP WITH TIME ZONE
);