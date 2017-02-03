INSERT INTO timestamps
(user_id, user_name, sqlstarttime)
VALUES ($1, $2, $3)
RETURNING id;