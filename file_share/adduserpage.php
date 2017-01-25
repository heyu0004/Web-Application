<!DOCTYPE html>
<head>
    <title> Add User Page </title>
</head>
<body>
    
    <form action="/~heyu/file_exchange/login.php">
	<input type="submit" value="Back to Main Page">
	</form>
    
    
    <?php
    if ( strlen($_POST['adduser'])==0 ){
    echo "Invalid username";
	exit;
	}
    $myfile = fopen("/home/heyu/users/usernames.txt", "a+") or die ("Unable to open file!");
    fwrite($myfile,"\n".$_POST['adduser']);
    fclose($myfile);
    $dir = "/home/heyu/public_html/fileshare/".$_POST['adduser'];
    
    if(!file_exists($dir)){
        mkdir($dir);
		echo "<br>";
		echo "<br>";
        echo "Your new account has been succesfully created.";
    }
    else {
		echo "<br>";
        echo "That account name is already taken. Please choose another.";
    }
    
    
    ?>
    
</body>