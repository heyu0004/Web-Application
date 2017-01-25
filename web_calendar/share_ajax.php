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

$mysqli = new mysqli('localhost', 'heyu', 'PASSWORD', 'calendar');
if($mysqli->connect_errno) {
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
	echo json_encode(array("success" => false,"message" => "stat error1"));	
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

//check if the user has event to share
$stmt = $mysqli->prepare("select count(*) from events where username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error2"));	
	exit;
}
$stmt->bind_param('s',$username);     
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
	echo json_encode(array("success" => true,"message" => "you have nothing to share with others"));	
	exit;
}


//get all event id from the user
$stmt = $mysqli->prepare("select id from events where username=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error3"));	
	exit;
}
$stmt->bind_param('s',$username);     
$stmt->execute();
$id=array();
$stmt->execute();
$result = $stmt->get_result();
$i=0;
while($row = $result->fetch_assoc()){
    $id[$i]=htmlspecialchars($row["id"] );
	$i=$i+1;
	}
$stmt->close();

//check if events are shared already
$k=0;
$j=$i-1;
$id_real=array();
while($j>=0){
$stmt = $mysqli->prepare("select count(*) from sharedevents where (username=?&&event_id=?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error4"));	
	exit;
}
$event_id_check= $id[$j]; 
$stmt->bind_param('si',$user2,$event_id_check); 
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
$j=$j-1;
if($count==0){
$id_real[$k]=$id[$j];
$k=$k+1;
}
}
if($k==0){
    echo json_encode(array("success" => false,"message" => "you've shared calendar with this user before"));	
	exit;
}
$i=$k-1;
//create share event
while($i>=0){
$stmt = $mysqli->prepare("insert into sharedevents (username,event_id) values (?,?)");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error5"));	
	exit;
}
$stmt->bind_param('si',$user2,$event_id); 
$event_id= $id[$i];  
$stmt->execute();
$stmt->close();
$i=$i-1;
}
echo json_encode(array("success" => true,"message" => "you've shared your event! "));
exit;

?>