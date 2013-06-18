<?php
/**
 * Database configuration
 *
 * Configure these and open the project in your browser,
 * install script takes care of the rest.
 */
$config = array(
	'server'   => 'localhost',
	'db'       => 'database',
	'user'     => 'username',
	'password' => 'password',
    'table'    => 'airports'
);

// ----

$mysqli = new mysqli($config['server'], $config['user'], $config['password'], $config['db']);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
