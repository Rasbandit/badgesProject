UPDATE timeStamps
SET sqlEndTime = $2
WHERE timestamps.id = $3 AND user_id = $1;