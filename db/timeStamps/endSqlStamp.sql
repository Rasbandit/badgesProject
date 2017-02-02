UPDATE timeStamps
SET sqlEndTime = $2
WHERE user_id = $1;