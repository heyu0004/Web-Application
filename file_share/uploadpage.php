<!DOCTYPE html>
<head>
    <title> Upload Page </title>
</head>
<body>
	<?php
	session_start();
	// Get the filename and make sure it is valid
	$filename = basename($_FILES['uploadedfile']['name']);
	if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
		echo $filename;
		echo "Invalid filename";
		exit;
	}
 
	// Get the username and make sure it is valid
	$username = $_SESSION['login_user'];
	if( !preg_match('/^[\w_\-]+$/', $username) ){
		echo "Invalid username";
		exit;
	}
	
	#set the full path
	$full_path = sprintf("/home/heyu/public_html/fileshare/%s/%s", $username, $filename);
	if($moveResult=move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path) ){
		echo "Your file has been uploaded succesfully!";
        echo '<form action="/~heyu/file_exchange/login.php">';
		echo '<input type="submit" value="Back to Main Page">';
		echo '</form>';
	}else{
		echo "Failed";
		echo "<br>";
		echo '<form action="/~heyu/file_exchange/login.php">';
		echo '<input type="submit" value="Back to Main Page">';
		echo '</form>';
	}
	
	
	?>
</form>
</body>