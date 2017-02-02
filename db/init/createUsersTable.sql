CREATE TABLE if not exists users
(
    id SERIAL primary key,
    display_name varchar(255),
    joindate date,
    githubid varchar(255),
    facebookid varchar(255),
    ghemail varchar(255),
    fbemail varchar(255),
    profileimg varchar(255)
);