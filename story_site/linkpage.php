<!DOCTYPE HTML>
<html>
<head><title> Welcome </title></head>
<body>
<?php
session_start();

require 'connectsql.php';
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}
$stmt = $mysqli->prepare("select story_name,content,account_name from stories where title =?");
$stmt->bind_param('s', $title);
$title = $_SESSION['storytitle'];
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->execute();
$result = $stmt->get_result();
echo "<ul>\n";
while($row = $result->fetch_assoc()){
	printf("\t<li>%s       %s</li>\n",htmlspecialchars("title: ".$row["story_name"] ),htmlspecialchars("author: ".$row["account_name"] ));
	printf("\t%s %s\n",htmlspecialchars("content: "),htmlspecialchars( $row["content"] ));
	
	echo "\n";
	echo "\n";
}

$stmt->close();
?>
</body>
</html>