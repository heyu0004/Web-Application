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
	echo json_encode(array("success" => false,"message" => "sql connection error"));
	exit;}
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
$username=$_SESSION['username'];
//echo "username ".$username;
if(isset($_POST['day'])&&($_POST['event'])&&($_POST['month'])){
}
else{
echo json_encode(array("success" => false,"message" => "please fill in all requied areas! "));
exit;
}
$time=htmlspecialchars($_POST['time']);
$day=htmlspecialchars($_POST['day']);
$event=htmlspecialchars($_POST['event']);
$month=htmlspecialchars($_POST['month']);
$year=htmlspecialchars($_POST['year']);
$stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE username=?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
    echo json_encode(array("success" => false,"message" => "visitors cannot add events"));
	exit;
}
if($count==1){
$stmt = $mysqli->prepare("insert into events (event,time,date,year,username,month) values (?,?,?,?,?,?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('ssssss',$event ,$time,$day,$year,$username,$month);     
$stmt->execute();
$stmt->close();

echo json_encode(array("success" => true,"message" => "you've added an event! "));
exit;
}

?>