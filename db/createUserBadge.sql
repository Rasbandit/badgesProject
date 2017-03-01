INSERT INTO users (user_name, user_id, html_badge, basic_js_badge, int_js_badge, angular_badge, node_badge, sql_badge, pproj_badge, gproj_badge)
VALUES ($1, $2, true, true, true, false, false, false, false, false)
WHERE users.id = $3;
