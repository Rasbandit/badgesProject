insert into badges
(user_name, user_id, html_badge, basic_js_badge, int_js_badge, angular_badge, node_badge, sql_badge, pproj_badge, gproj_badge)
values ($1, $2, true, false, false, false, false, false, false, false)
returning user_name, user_id, true, false, false, false, false, false, false, false;