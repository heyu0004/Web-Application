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
	echo json_encode(array("success" => false,"message" => "Connection Failed"));	
	exit;
}
$stmt = $mysqli->prepare("select id,event,date,time,month,year,tag from events where username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "statment error1"));
	exit;
}
$username = $_SESSION['username'];
$stmt->bind_param('s', $username);
//echo 'username after stmt'.$account;

$id=array();
$event=array();
$date=array();
$time=array();
$month=array();
$year=array();
$tag=array();
$stmt->execute();
$result = $stmt->get_result();
$i=0;
while($row = $result->fetch_assoc()){
    $id[$i]=htmlspecialchars($row["id"] );
	$event[$i]=htmlspecialchars($row["event"] );
	$date[$i]=htmlspecialchars($row["date"] );
	$time[$i]=htmlspecialchars($row["time"] );
	$month[$i]=htmlspecialchars($row["month"] );
	$year[$i]=htmlspecialchars($row["year"] );
	if($row["tag"]!==''){
	$tag[$i]=htmlspecialchars("[".$row["tag"]."]" );}
	else{
	$tag[$i]='';
	}
	$i=$i+1;
	}
$stmt->close();


$stmt = $mysqli->prepare("select count(*) as num from events where username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "statment error2"));
	exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($num);
$stmt->fetch();
$stmt->close();


$stmt = $mysqli->prepare("select event_id,events.year as year,events.month as month,events.date as date,events.time as time,events.event as event from sharedevents join events on sharedevents.event_id=events.id where sharedevents.username=?");
$stmt->bind_param('s', $username);
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "statment error3"));
	exit;
}
$id_s=array();
$event_s=array();
$date_s=array();
$time_s=array();
$month_s=array();
$year_s=array();
$stmt->execute();
$result = $stmt->get_result();
$i=$num;
while($row = $result->fetch_assoc()){
    $id[$i]=htmlspecialchars($row["event_id"] );
	$event[$i]=htmlspecialchars("(shared)".$row["event"] );
	$date[$i]=htmlspecialchars($row["date"] );
	$time[$i]=htmlspecialchars($row["time"] );
	$month[$i]=htmlspecialchars($row["month"] );
	$year[$i]=htmlspecialchars($row["year"] );
	$tag[$i]='';
	$i=$i+1;
	}
$stmt->close();


echo json_encode(array("success" => true,"id"=>$id,"event" => $event,"month"=>$month,"date"=>$date,"time"=>$time,"year"=>$year,"tag"=>$tag));	
	    exit;
?>
