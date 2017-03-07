insert into users (display_name, githubId, joinDate, ghemail, profileimg)
values ($1, $2, $3, $4, $5)
returning id, display_name, githubId, JoinDate, ghemail, profileimg;