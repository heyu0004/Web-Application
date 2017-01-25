
<?php
// Content of database.php
 
$mysqli = new mysqli('localhost', 'heyu', 'PASSWORD', 'wustl');
 
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>
