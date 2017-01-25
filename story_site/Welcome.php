<!DOCTYPE HTML>
<html>
<head><title> Homepage </title></head>

<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
echo '<br>';
echo '<h3>Welcome '.$_SESSION['user_id']." =^ ^=</h3>";
echo '<br>';
?>
<form action="create.php" method="POST">
        <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
        <p>Create your new story Now!
	    <input type="submit" value="create stories" /></p>
</form>

<form action="viewstory.php" method="POST">
	    <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p>See what everybody else are sharing Now!
	    <input type="submit" value="view stories" /></p>
</form>
<form action="query.php" method="POST">
<p><input type="submit" value="log out" /></p>
</form>
<?php
session_start();
//view pages do not ask for csrf
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
$stmt = $mysqli->prepare("select story_name,posttime,story_link,content,account_name from stories where account_name=? order by posttime desc");
$stmt->bind_param('s', $account);
$account = $_SESSION['user_id'];
$stmt->execute();
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
echo "<br>";
echo "My Stories:";
echo "<br>";
while($row = $result->fetch_assoc()){
    echo "<ul>";
	printf("<li>%s</li>",htmlspecialchars($row["story_name"] ));
    printf("<ul><li>%s</li>",htmlspecialchars( $row["content"] ));
    if(trim($row["story_link"])!==''){
    $link_address=htmlspecialchars( $row["story_link"] );
	echo "<li><a href='$link_address'>".$link_address."</a></li>";}
    printf("<li>%s</li></ul>",htmlspecialchars( $row["posttime"] ));
    echo "</ul>";
}
$stmt->close();
//show my comments
$stmt = $mysqli->prepare("select story_name,comment,comment_id from comments where account_name=? order by comment_id desc");
$stmt->bind_param('s', $account);
$account = $_SESSION['user_id'];
$stmt->execute();
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
echo "<br>";
echo "My Comments:";
echo "<br>";
while($row = $result->fetch_assoc()){
    echo "<ul>";
	printf("<li>%s</li>",htmlspecialchars("(c_id) ".$row["comment_id"] ));		
    printf("<ul><li>%s</li>",htmlspecialchars("on story : ".$row["story_name"] ));		
	printf("<li>%s</li></ul>",htmlspecialchars( $row["comment"]));	
	echo "</ul>";
}
echo "<br>";
$stmt->close();

?>
<form action="modifystory.php" method="POST">
	    <p>Modify my story (please use the story title):
		<textarea name="modify" style="width:250px;height:20px;"></textarea>
		<input type="radio" name="operation" value="d">delete it
		<input type="radio" name="operation" value="e">edit it
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <input type="submit" value="modify story" /></p>
</form>

<form action="modifycomment.php" method="POST">
	    <p>Modify my comment (please use c_id):
		<textarea name="modifyc" style="width:250px;height:20px;"></textarea>
		<input type="radio" name="operation" value="dc">delete it
		<input type="radio" name="operation" value="ec">edit it
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <input type="submit" value="modify comment" /></p>
</form>


</body>
</html>
