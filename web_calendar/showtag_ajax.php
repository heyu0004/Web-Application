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
$username = $_SESSION['username'];
if($_POST['tag']!==''){
$tag = $_POST['tag'];
}
else{
echo json_encode(array("success" => false,"message" => "input a tag"));	
	exit;
}
//$tag='individual';
$stmt = $mysqli->prepare("select count(*) as num from events where (username=? AND tag=?)");
if(!$stmt){
	//printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array("success" => false,"message" => "statment error1"));
	exit;
}
$stmt->bind_param('ss', $username,$tag);
$stmt->execute();
$stmt->bind_result($num);
$stmt->fetch();
$stmt->close();
if($num==0){
    echo json_encode(array("success" => false,"message" => "you have no tagged events"));
	exit;
}

$stmt = $mysqli->prepare("select id,event,date,time,month,year,tag from events where tag =? and username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "statment error2"));
	exit;
}
$stmt->bind_param('ss', $tag,$username);
$i=0;
$id=array();
$event=array();
$date=array();
$time=array();
$month=array();
$year=array();
$tag_=array();
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
    $id[$i]=htmlspecialchars($row["id"] );
	$event[$i]=htmlspecialchars($row["event"] );
	$date[$i]=htmlspecialchars($row["date"] );
	$time[$i]=htmlspecialchars($row["time"] );
	$month[$i]=htmlspecialchars($row["month"] );
	$year[$i]=htmlspecialchars($row["year"] );
	$tag_[$i]=htmlspecialchars("[".$row["tag"]."]" );	
	$i=$i+1;
	
	}
$stmt->close();

echo json_encode(array("success" => true,"id"=>$id,"event" => $event,"month"=>$month,"date"=>$date,"time"=>$time,"year"=>$year,"tag"=>$tag_));	
	    exit;
?>
