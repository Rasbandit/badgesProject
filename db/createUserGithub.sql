insert into users (display_name, githubId, joinDate, profileimg)
values ($1, $2, $3, $4)
returning id, display_name, githubId, JoinDate, profileimg;