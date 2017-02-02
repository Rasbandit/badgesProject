UPDATE timeStamps
SET basicJsEndTime = $2
WHERE user_id = $1;