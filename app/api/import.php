<?php

require_once('config.php');

if (($handle = fopen("http://openflights.svn.sourceforge.net/viewvc/openflights/openflights/data/airports.dat", "r")) !== FALSE) {
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
		$id = $mysqli->real_escape_string($data[0]);
		$name = $mysqli->real_escape_string($data[1]);
		$city = $mysqli->real_escape_string($data[2]);
		$country = $mysqli->real_escape_string($data[3]);
		$iata = $mysqli->real_escape_string($data[4]);
		$icao = $mysqli->real_escape_string($data[5]);
		if (empty($iata)) {
			continue;
		}
		$lat = $mysqli->real_escape_string($data[6]);
		$long = $mysqli->real_escape_string($data[7]);

		$query = "REPLACE INTO airports (id, name, city, country, iata, icao, lat, `long`) VALUES ('$id', '$name', '$city', '$country', '$iata', '$icao', '$lat', '$long')";
		if (!$mysqli->query($query)) {
			printf("Error: %s\n", $mysqli->sqlstate);
			exit();
		}
	}
	fclose($handle);
}

$mysqli->close();
