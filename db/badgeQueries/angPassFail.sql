UPDATE badges
SET angular_badge = $2
WHERE user_id = $1;