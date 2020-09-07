<!DOCTYPE HTML>
<html>
<head><title> Login</title></head>
<body>
<h1 align="center">Story Site</h1>
<h4 align="center">share your story, show your life</h4>
<h3>Login</h3>
<form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST">
		<p><label for="account">account:</label>
		<input type="text" name="account" id="account" /></p>
		<p><label for="pwd">password:</label>
		<input type="password" name="pwd" id="pwd" /></p>
	    <p><input type="submit" value="log in" /></p>
</form>
<form action="insert.php" method="POST">
	    <p><input type="submit" value="register" /></p>
</form>
<form action="viewstory.php" method="POST">
        <input type="hidden" name="visitor" value="visitor">
	    <p><input type="submit" value="visitor" /></p>
</form>



<?php
session_destroy();
//echo "user now is  ".$_SESSION['user_id'];
require 'connectsql.php';
if(isset($_POST['account'])and isset($_POST['pwd'])){
    $account = $_POST['account'];
    $password =$_POST['pwd'];
    //connect to database
    if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
	}
	else{
    $user = $_POST['account'];
    $stmt = $mysqli->prepare("SELECT COUNT(*), account, password FROM userinfo WHERE account=?");
    $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($cnt, $account, $pwd_hash);
    $stmt->fetch();
    $pwd_guess = $_POST['pwd'];
    echo "count number ";
    echo "<br>";
    echo $cnt;
    echo "<br>";
    echo $pwd_guess;
    echo "<br>";
    echo $user;
    echo "<br>";
    echo crypt($pwd_guess, $pwd_hash);
    echo "<br>";
    if( $cnt == 1 && crypt($pwd_guess, $pwd_hash)==$pwd_hash){
	    // Login succeeded!
	    session_start();
	    $_SESSION['user_id'] = $account;
	    $_SESSION['token'] = substr(md5(rand()), 0, 10);
	    header("Location: Welcome.php");
	    exit;	
    }
    else{
        //failed login
	    echo "Failed log in, please try again";
	}
	}
}
?>


</body>
</html>