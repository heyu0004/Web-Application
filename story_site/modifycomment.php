<!DOCTYPE HTML>
<html>
<head><title> modifycomment </title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
//echo "session token ".$_SESSION['token'];
//echo "post token ".$_POST['token'];
?>
<form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>"  method="POST">
	    <p>edit the comment:</p>
		<textarea name="editc" style="width:250px;height:50px;"></textarea>
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="submit" /></p>
</form>

<form action="Welcome.php" method="POST">
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="back to my page" /></p>
</form>

<?php
session_start();
//$account=$_SESSION['user_id'];
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
}
$op=$_POST['operation'];
if ($_POST['modifyc']){
$_SESSION['modifyc']=(int)$_POST['modifyc'];

}
switch ($op){
case 'dc':delete_comment();break;
default:edit_comment();
}




function edit_comment(){
if(isset($_POST['editc'])){
require 'connectsql.php';
if($mysqli->connect_errno) {
printf("Connection Failed: %s\n", $mysqli->connect_error);
exit;}

//before edit a comment,check account's privalige
$stmt = $mysqli->prepare("select account_name from comments where comment_id=?");
$stmt->bind_param('s',$edit);
$edit = $_SESSION['modifyc'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
$get_account_name=$row["account_name"];
}
if($get_account_name!==$_SESSION['user_id']){
echo "Warning: you cannot edit other one's comment!";
}
else{
$stmt = $mysqli->prepare("update comments set comment=? WHERE comment_id=?;");
$stmt->bind_param('ss', $newcontent,$edit);
$edit = $_SESSION['modifyc'];
$newcontent=$_POST['editc'];
echo "comment_id ".$edit;
echo "<br>";
echo "comment ".$newcontent;
if(!$stmt){
printf("Query Prep Failed: %s\n", $mysqli->error);
exit;}
$stmt->execute();
$stmt->close();
//$_SESSION['edited']=true;
echo "edit comment succeed!";

}
}
}

function delete_comment(){
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
//before edit a comment,check account's privalige
$stmt = $mysqli->prepare("select account_name from comments where comment_id=?");
$stmt->bind_param('s',$edit);
$edit = $_SESSION['modifyc'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
$get_account_name=$row["account_name"];
}
if($get_account_name!==$_SESSION['user_id']){
echo "Warning: you cannot delete other one's comment!";
}
else{
$stmt = $mysqli->prepare("delete from comments where comment_id=?");
$stmt->bind_param('s', $delete);
$delete = $_POST['modifyc'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$stmt->close();

header("location: Welcome.php");
exit;
}
}
?>
</body>
</html>