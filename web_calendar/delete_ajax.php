<?php
ini_set("session.cookie_httponly", 1);
session_start();

$previous_ua = @$_SESSION['useragent'];
$current_ua = $_SERVER['HTTP_USER_AGENT'];
if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	die("Session hijack detected");
	echo json_encode(array("success" => false,"message" => "Session hijack detected"));
	exit;
}else{
	$_SESSION['useragent'] = $current_ua;
}

if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
	echo json_encode(array("success" => false,"message" => "Request forgery detected"));
	exit;
}
$mysqli = new mysqli('localhost', 'heyu', 'PASSWORD', 'calendar');
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
$username=$_SESSION['username'];

$stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
    echo json_encode(array("success" => false,"message" => "visitors cannot delete events"));
	exit;
}
else{
$id=htmlspecialchars($_POST['id']);
$stmt = $mysqli->prepare("select count(*),username from events where id=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('s',$id);     
$stmt->execute();
$stmt->bind_result($count,$id_username);
$stmt->fetch();
$stmt->close();

$count=htmlspecialchars($count);

if($id_username!==$username){
echo json_encode(array("success" => false,"message" => "there is no such an event to delete! "));
exit;
}
$stmt = $mysqli->prepare("delete from events where id=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('s',$id);     
$stmt->execute();
$stmt->close();
echo json_encode(array("success" => true,"message" => "you've deleted an event! "));
exit;	
}
?>