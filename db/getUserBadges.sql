select user_id, html_badge, basic_js_badge, int_js_badge, angular_badge, node_badge, sql_badge, pproj_badge, gproj_badge from badges
join users on badges.user_id = $1;