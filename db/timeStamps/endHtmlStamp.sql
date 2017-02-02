UPDATE timeStamps
SET htmlEndTime = $2
WHERE user_id = $1;