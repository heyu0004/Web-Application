<!DOCTYPE HTML>
<html>
    <head>
        <title> like </title>
    </head>
<body>
<?php
session_start();
$storyname=$_SESSION['detail'];
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
$stmt = $mysqli->prepare("select likes from stories where story_name=?");
$stmt->bind_param('s', $storyname);
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;}
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
$likes=$row["likes"];
}
$stmt->close();
$likes= $likes+1;
echo "likes ".$likes;
echo "storyname ".$storyname;
$stmt = $mysqli->prepare("update stories set likes=? where story_name=?");
$stmt->bind_param('is',$likes,$storyname);
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;}
$stmt->execute();
echo $likes;
$stmt->close();
header("Location: detail.php");
exit;
?>
</body>
</html>