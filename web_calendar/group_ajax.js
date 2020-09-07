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
//echo "start!!!";
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
	echo json_encode(array("success" => false,"message" => "Request forgery detected","session"=>$_SESSION['token'],"post"=>$_POST['token']));
	exit;
}

$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'calendar');
if($mysqli->connect_errno) {
    //echo "sql connection error";
	echo json_encode(array("success" => false,"message" => "sql connection error"));
	exit;
	}
header("Content-Type: application/json"); 
$username=$_SESSION['username'];
$user2=$_POST['user2'];
$event_id=$_POST['id'];

//check if user2 exists
$stmt = $mysqli->prepare("select count(*) from user where username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error2"));	
	exit;
}
$stmt->bind_param('s',$user2);     
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
echo json_encode(array("success" => false,"message" => "user2 does not exist"));	
exit;
}

//check if event_id exists
$stmt = $mysqli->prepare("select count(*) from events where (username=? && id=?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error2"));	
	exit;
}
$stmt->bind_param('si',$username,$event_id);     
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
$stmt = $mysqli->prepare("select count(*) from sharedevents where (username=? && event_id=?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error3"));	
	exit;
}
$stmt->bind_param('si',$username,$event_id);     
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
echo json_encode(array("success" => false,"message" => "user2 does not exist"));	
exit;}
}

//check id shared before
$stmt = $mysqli->prepare("select count(*) from sharedevents where (username=? && event_id=?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error4"));	
	exit;
}
$stmt->bind_param('si',$user2,$event_id);     
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count!==0){
echo json_encode(array("success" => false,"message" => "  the event has been shared already "));	
exit;
}

//create share event
$stmt = $mysqli->prepare("insert into sharedevents (username,event_id) values (?,?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error5"));	
	exit;
}
$stmt->bind_param('si',$user2,$event_id);     
$stmt->execute();
$stmt->close();


echo json_encode(array("success" => true,"message" => "you've shared an event! "));
exit;

?>