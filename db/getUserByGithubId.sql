select * from users
JOIN badges ON users.display_name = badges.display_name
where githubId = $1;
