<!DOCTYPE HTML>
<html>
<head><title> detail </title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
//echo "token session ".$_SESSION['token'];
//echo "<br>";
//echo "token post ".$_POST['token'];
?>

<form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>"  method="POST">
      <p>add a comment:</p>
      <p><textarea name="addcomment" style="width:250px;height:150px;"></textarea></p>
      <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
      <p><input type="submit" value="add comment" /></p>
</form>
<form action="like.php"  method="POST">
      <p><input type="submit" value="like story" /></p>
</form>
<form action="viewstory.php" method="POST">
      <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
      <p><input type="submit" value="back view other stories" /></p>
</form>

<?php
session_start();
if ($_POST['detail'] and trim($_POST['detail'])!==''){
$_SESSION['detail']=$_POST['detail'];
}
if(isset($_POST['addcomment']) and trim($_POST['addcomment'])!==''){
    if ($_SESSION['user_id']=='visitor'){
        echo "Notice: visitors cannot comment on stories";
        echo "<br>";
    }
    else{
        $_SESSION['addcomment']=$_POST['addcomment'];
        $account=$_SESSION['user_id'];
        if(($_SESSION['token'] !== $_POST['token']) and ($_SESSION['visitor'] !== $_POST['visitor'])){
	        die("Request forgery detected");
        }
        //link to database, add comment
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
        echo "add comment succeed!";
        show();
    }
}
else{
show();
}





function show(){
require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
$stmt = $mysqli->prepare("select account_name,likes,content,story_link from stories where story_name=?");
$stmt->bind_param('s', $storyname);
$storyname= $_SESSION['detail'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;}
$stmt->execute();
$result = $stmt->get_result();

while($row = $result->fetch_assoc()){

	printf("\t<li>%s</li>\n",htmlspecialchars("Title: ".$storyname ));
	printf("\t%s\n",htmlspecialchars("Author: ".$row["account_name"] ));
	echo "<br>";
	printf("\t%s\n",htmlspecialchars( "Content: ".$row["content"]));
	echo "<br>";
	printf("\t%s\n",htmlspecialchars( "Likes: ".$row["likes"]));
	echo "<br>";
	if (trim($row["story_link"])!==''){
	$link_address=htmlspecialchars( $row["story_link"] );
	//printf("\t%s %s\n",htmlspecialchars("link: "),htmlspecialchars( $row["story_link"] ));
	echo "<a href='$link_address'>".$link_address."</a>";
	}
}
$stmt = $mysqli->prepare("select comment,account_name from comments where story_name=?");
$stmt->bind_param('s', $storyname);
$storyname= $_SESSION['detail'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;}
$stmt->execute();
$result = $stmt->get_result();
echo "<br>";
echo "<br>";
echo "Comments: ";
while($row = $result->fetch_assoc()){
   echo "<ul>";
    printf("<li>%s %s</li>",htmlspecialchars( $row["account_name"].": " ),htmlspecialchars( $row["comment"] ));
    echo"</ul>";
}
$stmt->close();
}
?>




</body>
</html>