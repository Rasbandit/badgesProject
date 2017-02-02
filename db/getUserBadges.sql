select users.display_name, html_badge, basic_js_badge, int_js_badge, angular_badge, node_badge, sql_badge, pproj_badge, gproj_badge from users
join badges on users.display_name = badges.display_name
where users.id = $1;
