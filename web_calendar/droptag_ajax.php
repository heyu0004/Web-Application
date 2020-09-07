<?php
ini_set("session.cookie_httponly", 1);
session_start();
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
	echo json_encode(array("success" => false,"message" => "Request forgery detected"));
	exit;
}
$mysqli = new mysqli('localhost','heyu', 'PASSWORD', 'calendar');
if($mysqli->connect_errno) {
	echo json_encode(array("success" => false,"message" => "sql connection error"));
	exit;}
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
$username=$_SESSION['username'];
if(isset($_POST['id'])){
}
else{
echo json_encode(array("success" => false,"message" => "please input an id"));
	exit;
}
$tag=htmlspecialchars($_POST['tag']);
$id=htmlspecialchars($_POST['id']);
$stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE username=?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if($count==0){
    echo json_encode(array("success" => false,"message" => "visitors cannot edit events"));
	exit;
}
if($count==1){
$id=htmlspecialchars($_POST['id']);
$stmt = $mysqli->prepare("select username from events where id=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('s',$id);     
$stmt->execute();
$stmt->bind_result($id_username);
$stmt->fetch();
$stmt->close();

if($id_username!==$username){
echo json_encode(array("success" => false,"message" => "there is no such an event to drop tag! "));
exit;
}

$stmt = $mysqli->prepare("UPDATE events SET tag=? WHERE id=?");
if(!$stmt){
	echo json_encode(array("success" => false,"message" => "stat error"));	
	exit;
}
$stmt->bind_param('ss',$blank,$id);  
$blank='';   
$stmt->execute();
$stmt->close();

echo json_encode(array("success" => true,"message" => "you've added a tag! "));
exit;
}

?>