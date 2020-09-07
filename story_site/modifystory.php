<!DOCTYPE HTML>
<html>
<head><title> modify </title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
//echo "session token ".$_SESSION['token'];
//echo "post token ".$_POST['token'];
?>
<form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>"  method="POST">
	    <p>edit the story:</p>
		<textarea name="editstory" style="width:250px;height:50px;"></textarea>
		<p>edit the link:</p>
		<textarea name="link" style="width:250px;height:50px;"></textarea>
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="submit" /></p>
</form>

<form action="Welcome.php" method="POST">
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="quit/back to my page" /></p>
</form>

<?php
session_start();
//$account=$_SESSION['user_id'];
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
}
$op=$_POST['operation'];
if ($_POST['modify']){
$_SESSION['modify']=$_POST['modify'];}
switch ($op){
case 'd':
delete_story();break;
default:
edit_story();
}
?>



<?php
session_start();
function edit_story(){

if(isset($_POST['editstory'])){
require 'connectsql.php';
if($mysqli->connect_errno) {
printf("Connection Failed: %s\n", $mysqli->connect_error);
exit;}
//before edit a story,check account's privalige
$stmt = $mysqli->prepare("select account_name from stories where story_name=?");
$stmt->bind_param('s', $edit);
$edit = $_SESSION['modify'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
$get_account_name=$row["account_name"];
}
$stmt->close();
if($get_account_name!==$_SESSION['user_id']){
echo "Warning: you cannot edit other one's story!";
}
else{
$stmt = $mysqli->prepare("update stories set content=? WHERE story_name=?");
$stmt->bind_param('ss', $newcontent,$edit);
$edit = $_SESSION['modify'];
$newcontent=$_POST['editstory'];
echo "edit story succeed!";
echo "<br>";
echo "title ".$edit;
echo "<br>";
echo "content ".$newcontent;
if(!$stmt){
printf("Query Prep Failed: %s\n", $mysqli->error);
exit;}
$stmt->execute();
$stmt->close();
}
}
}



function delete_story(){

require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
//before delete a story,check account's privalige
$stmt = $mysqli->prepare("select account_name from stories where story_name=?");
$stmt->bind_param('s', $delete);
$delete = $_POST['modify'];
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
echo "Warning: you cannot delete other one's story!";
}
else{
$stmt = $mysqli->prepare("delete from stories where story_name=?");
$stmt->bind_param('s', $delete);
$delete = $_POST['modify'];
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