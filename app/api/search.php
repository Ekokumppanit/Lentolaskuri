<?php

require_once('config.php');

header("Access-Control-Allow-Origin: *");

$search = $mysqli->real_escape_string($_GET['s']);
$id     = $mysqli->real_escape_string($_GET['i']);

if (empty($search) && empty($id)) {
	exit();
}

$query = "";

if (!empty($search)) {
  $query = "
  SELECT *,
  CASE
    WHEN iata LIKE '$search%' THEN 100
    WHEN name LIKE '$search%' THEN 75
    WHEN name LIKE '%$search%' THEN 74
    WHEN city LIKE '$search%' THEN 70
    WHEN country LIKE '$search%' THEN 65
    WHEN city LIKE '%$search%' THEN 60
    WHEN country LIKE '%$search%' THEN 55
    ELSE 0 END
  AS score
  FROM airports
  WHERE
    name LIKE '$search%' OR
    name LIKE '%$search%' OR
    country LIKE '$search%' OR
    country LIKE '%$search%' OR
    city LIKE '$search%' OR
    city LIKE '%$search%' OR
    iata LIKE '$search%'
  ORDER BY score DESC
  LIMIT 10;
  ";
} else if (!empty($id)) {
  $query ="SELECT * FROM airports WHERE id LIKE '$id';";
}

$results = array();
if ($result = $mysqli->query($query)) {

	while ($row = $result->fetch_assoc()) {
		$results[] = $row;
	}

  print(json_encode($results));

} else {
	printf("Error: %s\n", $mysqli->sqlstate);
}
