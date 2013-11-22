<?php
/**
 * Import Airport data from OpenFlights csv-file to database
 *
 * @category Lentolaskuri
 * @package  Lentolaskuri
 * @author   Ismo Vuorinen <ismo@ivuorinen.net>
 * @license  http://www.gnu.org/licenses/agpl.html GNU Affero General Public License
 * @link     https://github.com/Ekokumppanit/Lentolaskuri
 */

/**
 * See if we have config.php
 */
if (is_readable('config.php')) {
    include_once 'config.php';
} else {
    die("Couldn't find configuration file. Please check the installation guide.");
}

// If we can see lentolaskuri.sql and config.php setting
// $config['create_table'] is true, we try to create table for airports.
if (is_readable('lentolaskuri.sql') && $config['create_table']) {
    $create_table = file_get_contents('lentolaskuri.sql');
    if (! empty($create_table)) {

        // Test if user has changed database table name and change accordingly
        if ($config['table'] !== 'airports') {
            $create_table = str_replace(
                "CREATE TABLE IF NOT EXISTS `airports`",
                "CREATE TABLE IF NOT EXISTS `".$config['db']."`.`".$config['table']."`",
                $create_table
            );
        }

        if (! $mysqli->query($create_table)) {
            printf("Error: %s\n", $mysqli->sqlstate);
            exit();
        }

        echo "Created table: {$config['db']}.{$config['table']} (Please turn off table creation now from config.php: 'create_table' => false )\n";

    } else {
        die("Couldn't find lentolaskuri.sql");
    }
}


// Try to load the airports.dat file, or bail out
if (($handle = fopen("http://sourceforge.net/p/openflights/code/HEAD/tree/openflights/data/airports.dat?format=raw", "r")) !== false) {

    // Similar to fgets() except that fgetcsv() parses the line it reads for
    // fields in CSV format and returns an array containing the fields read.
    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
        $id      = $mysqli->real_escape_string($data[0]);
        $name    = $mysqli->real_escape_string($data[1]);
        $city    = $mysqli->real_escape_string($data[2]);
        $country = $mysqli->real_escape_string($data[3]);
        $iata    = $mysqli->real_escape_string($data[4]);
        $icao    = $mysqli->real_escape_string($data[5]);
        if (empty($iata)) {
            continue;
        }
        $lat     = $mysqli->real_escape_string($data[6]);
        $long    = $mysqli->real_escape_string($data[7]);

        // REPLACE works exactly like INSERT, except that if an old row in the
        // table has the same value as a new row for a PRIMARY KEY or
        // a UNIQUE index, the old row is deleted before the new row is inserted.
        // http://dev.mysql.com/doc/refman/5.0/en/replace.html
        $query = "REPLACE INTO ".$config['db'].".".$config['table']." (id, name, city, country, iata, icao, lat, `long`) "
               . "VALUES ('$id', '$name', '$city', '$country', '$iata', '$icao', '$lat', '$long')";

        if (! $mysqli->query($query)) {
            printf("Error: %s\n", $mysqli->sqlstate);
            exit();
        }
    }
    fclose($handle);
}

$mysqli->close();
