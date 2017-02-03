UPDATE timeStamps
SET htmlendtime = $2
WHERE timestamps.id = $3 AND user_id = $1;