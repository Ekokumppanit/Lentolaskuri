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
