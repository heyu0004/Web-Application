<!DOCTYPE HTML>
<html>
<head><title> Welcome </title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();

if($_SESSION['user_id']=='visitor'){
echo "visitors cannot comment stories, please log in now";
}
else{
$account=$_SESSION['user_id'];
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}


        $stmt = $mysqli->prepare("insert into comments (account_name,story_name,comment) values (?,?,?)");
        if(!$stmt){
	        printf("Query Prep Failed: %s\n", $mysqli->error);
	        exit;
        }
$stmt->bind_param('sss',$account ,$_SESSION['detail'],$_POST['addcomment']);
        $stmt->execute();
        $stmt->close();

header("location: detail.php");
exit;
}

?>
</body>
</html>