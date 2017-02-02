insert into users (display_name, facebookid, fbEmail) values ($1, $2, $3) returning display_name, facebookid fbEmail;
