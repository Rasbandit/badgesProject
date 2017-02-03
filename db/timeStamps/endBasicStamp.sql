UPDATE timestamps
SET basicjsendtime = $2
WHERE timestamps.id = $3 AND user_id = $1;