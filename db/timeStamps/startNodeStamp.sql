UPDATE timeStamps
SET nodeStartTime = $2
WHERE display_name = $1;