<?php



$config = array(
	'server' => 'localhost',
	'db' => 'lentolaskuri2',
	'user' => 'lentolaskuri2',
	'password' => '8@89z~UIwavn',
);

// ----

$mysqli = new mysqli($config['server'], $config['user'], $config['password'], $config['db']);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
