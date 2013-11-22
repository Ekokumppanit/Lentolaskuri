<?php
/**
 * Database configuration
 *
 * Configure these and open the project in your browser,
 * install script takes care of the rest.
 *
 * @category Lentolaskuri
 * @package  Lentolaskuri
 * @author   Ismo Vuorinen <ismo@ivuorinen.net>
 * @license  http://www.gnu.org/licenses/agpl.html GNU Affero General Public License
 * @link     https://github.com/Ekokumppanit/Lentolaskuri
 */

/**
 * Configuration variables for Lentolaskuri
 *
 * Database settings
 * - server       = database server address
 * - db           = database name
 * - user         = database username
 * - password     = database password
 * - table        = database table to store airport names and locations
 * - create_table = true or false, should running import.php try to create database table
 * - refresh_key  = semi-secret key to use to trigger import action: import.php?key=[the key]
 *
 * Please change the refresh_key and use it to import airport data to the database.
 * Use the key as an url parameter: http://example.com/lentolaskuri/api/import.php?key=[the key]
 *
 * @var array
 */
$config = array(
    'server'       => 'localhost',
    'db'           => 'database',
    'user'         => 'username',
    'password'     => 'password',
    'table'        => 'airports',
    'create_table' => true,
    'refresh_key'  => 'lentolaskuridatabasekey' // You should change this to your reset key
);

// ----

$mysqli = new mysqli($config['server'], $config['user'], $config['password'], $config['db']);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
