UPDATE timeStamps
SET nodeEndTime = $2
WHERE user_id = $1;