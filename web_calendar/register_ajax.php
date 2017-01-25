<?php
// login_ajax.php

$mysqli = new mysqli('localhost', 'heyu', 'PASSWORD', 'calendar');
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
$username = $_POST['username'];
$password = $_POST['password'];
$stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE username=?");
if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "sql statement error1"
	));	
	exit;
}
    
if(strlen($username)==0){
    echo json_encode(array(
		"success" => false,
		"message" => "Empty username"
	));	
	exit;
}
    
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    
if ($count!=0){
    echo json_encode(array(
		"success" => false,
		"message" => "Used username"
	));
      exit;
}
    
    $stmt = $mysqli->prepare("insert into user (username,password) values (?,?)");
    
    if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "sql statement error2"
	));	
	exit;
    }
    $stmt->bind_param('ss',$username,crypt($password));
    $stmt->execute();
    $stmt->close();
	    
	    echo json_encode(array(
		"success" => true
	));
	    exit;	
    

?>
