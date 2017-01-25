<?php
// login_ajax.php

$mysqli = new mysqli('localhost', 'heyu', 'PASSWORD', 'calendar');
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
$username = $_POST['username'];
$pwd_guess =$_POST['password'];
$stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE username=?");
 if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "sql statement error1"
	));	
	exit;
    }
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    if ($count==0){
      echo json_encode(array("success" => false,"message" => "Unregistered user"));
      exit;
    }   
    if ($count==1){    
      $stmt = $mysqli->prepare("SELECT COUNT(*),password FROM user WHERE username=?");
    if(!$stmt){
	  echo json_encode(array("success" => false,"message" => "sql statement error1"));	
	  exit;
    }
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($count,$pwd_hash);
    $stmt->fetch();
    $stmt->close();
    if(crypt($pwd_guess, $pwd_hash)==$pwd_hash){
	    ini_set("session.cookie_httponly", 1);
	    session_start();
	    $_SESSION['username'] = $username;
	    $_SESSION['token'] = substr(md5(rand()), 0, 10);
	    echo json_encode(array("success" => true,"token"=>$_SESSION['token']));
	    exit;	
    }
    else{
        //failed login
	    echo json_encode(array("success" => false,"message" => "Incorrect Username or Password"));
	    exit;	
	}
}

?>
