<!DOCTYPE HTML>
<html>
<head><title> editcomment </title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
//$editstory=$_POST['editstory'];
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
	echo json_encode(array("success" => false,"message" => "Request forgery detected"));
}
require 'connectsql.php';
if($mysqli->connect_errno) {
printf("Connection Failed: %s\n", $mysqli->connect_error);
exit;}
$stmt = $mysqli->prepare("update comments set comment=? WHERE comment_id=?;");
$stmt->bind_param('ss', $newcontent,$edit);
$edit = $_SESSION['modifyc'];
$newcontent=$_POST['editcomment'];
if(!$stmt){
printf("Query Prep Failed: %s\n", $mysqli->error);
exit;}
$stmt->execute();
$stmt->close();
$_SESSION['edited']=true;
header("location:Welcome.php");
exit;
?>
</body>
</html>