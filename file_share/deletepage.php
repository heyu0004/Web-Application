<!DOCTYPE html>
<html>
<head>
	<title> Delete Page </title>
</head>
<body>

<form enctype="multipart/form-data" action="login.php" method="POST">
	<input type="submit" value="Back to Main Page" name="submit">
</form>
<br>

<?php
session_start();
	
	if (strlen($_POST['deletefile'])==0){
		echo "You did not enter a file name. Please try again.";
		return;
	}

	$dir = "/home/heyu/public_html/fileshare/".$_SESSION['login_user']."/";

	if (!file_exists($dir.$_POST['deletefile'])){
		echo "The file provided does not exist.";
		echo "<br>";
		return;
	}

	unlink($dir.htmlentities($_POST['deletefile']));
	echo 'Your file was succesfully deleted.';

?>

</body>
</html>