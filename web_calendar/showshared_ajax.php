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
$stmt = $mysqli->prepare("select event_id,events.year as year,events.month as month,events.date as date,events.time as time,events.event as event from sharedevents join events on sharedevents.event_id=events.id where sharedevents.username=?");
$stmt->bind_param('s', $username);
if(!$stmt){
	//printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array("success" => false,"message" => "statment error"));
	exit;
}
$stmt->execute();
$id=array();
$event=array();
$date=array();
$time=array();
$month=array();
$year=array();
$stmt->execute();
$result = $stmt->get_result();
$i=0;
while($row = $result->fetch_assoc()){
    $id[$i]=htmlspecialchars($row["event_id"] );
	$event[$i]=htmlspecialchars("shared event".$row["event"] );
	$date[$i]=htmlspecialchars($row["date"] );
	$time[$i]=htmlspecialchars($row["time"] );
	$month[$i]=htmlspecialchars($row["month"] );
	$year[$i]=htmlspecialchars($row["year"] );
	$i=$i+1;
	}
$stmt->close();
echo json_encode(array("success" => true,"id"=>$id,"event" => $event,"month"=>$month,"date"=>$date,"time"=>$time,"year"=>$year));	
	    exit;

?>
