<!DOCTYPE HTML>
<html>
<head><title> View stories </title></head>
<body>
<h1 align="center">Story Site</h1>
<h4 align="center">share your story, show your life</h4>
<?php
session_start();
echo "Hello , ".$_SESSION['user_id'];
?>

<?php
if($_POST['visitor']=='visitor'){
$_SESSION['user_id']=$_POST['visitor'];
}

if($_SESSION['user_id']=='visitor'){}
else{
echo '<form action="Welcome.php" method="POST">';
echo '<p><input type="submit" value="back to my page" /></p>';
echo '</form>';
}
?>
<?php
//echo "Hello , ".$_SESSION['user_id'];
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
$stmt = $mysqli->prepare("select story_name,story_link,posttime,content,account_name from stories order by posttime desc");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
	echo "<ul>";
    echo "<br>";
	printf("%s%s","Title: ",htmlspecialchars($row["story_name"] ));
	echo "<br>";
	printf("%s%s","Author: ",htmlspecialchars($row["account_name"] ));
	echo "<br>";
	printf("%s%s","Content: ",htmlspecialchars($row["content"] ));
    echo "<br>";
    printf("%s%s","Posttime: ",htmlspecialchars($row["posttime"] ));
	echo "<br>";
	echo "</ul>";
}
$stmt->close();
	echo "<br>";
	echo "<br>";
?>

<form action="detail.php" method="POST">
	    <p>View Story</p>
	    <p>please type the title of the story for details</p>
		<textarea name="detail" style="width:250px;height:20px;"></textarea>
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="view the story" /></p>
</form>

<form action="query.php" method="POST">
	    <p><input type="submit" value="back to log in page" /></p>
</form>

</body>
</html>

