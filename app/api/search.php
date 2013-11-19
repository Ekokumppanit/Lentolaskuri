<?php
/**
 * Return Airport data from the database based on search query
 *
 * @category Lentolaskuri
 * @package  Lentolaskuri
 * @author   Ismo Vuorinen <ismo@ivuorinen.net>
 * @license  http://www.gnu.org/licenses/agpl.html GNU Affero General Public License
 * @link     https://github.com/Ekokumppanit/Lentolaskuri
 */

require_once 'config.php';

header("Access-Control-Allow-Origin: *");

$get_s = (empty($_GET['s'])) ? null : $_GET['s'];
$get_i = (empty($_GET['i'])) ? null : $_GET['i'];

$search = $mysqli->real_escape_string($get_s);
$id     = $mysqli->real_escape_string($get_i);

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
    AS
        score
    FROM
        " . $config['table'] . "
    WHERE
        name LIKE '$search%' OR
        name LIKE '%$search%' OR
        country LIKE '$search%' OR
        country LIKE '%$search%' OR
        city LIKE '$search%' OR
        city LIKE '%$search%' OR
        iata LIKE '$search%'
    ORDER BY
        score DESC
    LIMIT 10;";
} else if (!empty($id)) {
    $query = "SELECT * FROM " . $config['table'] . " WHERE id LIKE '$id';";
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
