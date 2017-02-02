UPDATE timeStamps
SET sqlStartTime = $2
WHERE display_name = $1;