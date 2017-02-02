UPDATE timeStamps
SET angularEndTime = $2
WHERE user_id = $1;