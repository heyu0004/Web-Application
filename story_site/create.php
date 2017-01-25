<!DOCTYPE HTML>
<html>
<head><title>Create a new story</title></head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<?php
session_start();
//echo "session token ".$_SESSION['token'];
//echo "<br>";
//echo "post token ".$_POST['token'];
?>
   <form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST">
	    <p>Title:</p>
		<textarea name="title" style="width:250px;height:50px;"></textarea>
	    <p>Content:</p>
		<textarea name="content" style="width:250px;height:150px;"></textarea>
		<p>Link:</p>
		<textarea name="link" style="width:250px;height:50px;"></textarea>
		<input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
	    <p><input type="submit" value="submit" /></p>
   </form>

   <form action="Welcome.php" method="POST">
	    <p><input type="submit" value="back" /></p>
   </form>

<?php
session_start();
if($_SESSION['token'] !== $_POST['token']){
	die("Request forgery detected");
}
$account=$_SESSION['user_id'];
$title=$_POST['title'];
$content=$_POST['content'];
$link=$_POST['link'];

if(isset($_POST['title'])){
  if(!(trim($title)=='')){
    //connect database
    require 'connectsql.php';
    if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
    //check title and content validation of a same account
    $stmt = $mysqli->prepare("select story_name from stories");
    if(!$stmt){
	    printf("Query Prep Failed: %s\n", $mysqli->error);
	    exit;
    }
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
	    $used=false;
	    if ($title==$row["story_name"]){
	    $used=true;
	    break;}
    }
    if ($used==true){
    echo "The title has been used, please try another one ";
    }
    //insert story when story tiltle is valid
    else{
        if($mysqli->connect_errno) {
	    printf("Connection Failed: %s\n", $mysqli->connect_error);
	    exit;}
        $stmt = $mysqli->prepare("insert into stories (story_name,story_link,content,account_name) values (?,?, ?, ?)");
        if(!$stmt){
	        printf("Query Prep Failed: %s\n", $mysqli->error);
	        exit;
        }
        $stmt->bind_param('ssss', $title, $link ,$content,$_SESSION['user_id']);
        $stmt->execute();
        $stmt->close();
        echo "succeed creating!";
        echo "<br>";
        echo "Title: ".$title;
        echo "<br>";
        echo "Content: ".$content;
        echo "<br>";
        if(!(trim($link)=='')){
        echo "Link= ".$link;
        }
    }
   }
  else{
     echo "your story should at least have a title";
  }
}


?>
</body>
</html>