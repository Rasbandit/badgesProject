UPDATE timeStamps
SET angularStartTime = $2
WHERE user_id = $1;