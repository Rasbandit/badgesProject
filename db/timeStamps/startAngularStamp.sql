INSERT INTO timestamps
(user_id, user_name, angularStartTime)
VALUES ($1, $2, $3)
RETURNING id, user_name, angularStartTime;