insert into users (display_name, githubId, joinDate)
values ($1, $2, $3)
returning display_name, githubId, JoinDate;