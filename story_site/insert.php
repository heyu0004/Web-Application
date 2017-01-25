<!DOCTYPE HTML>
<html>
    <head>
        <title> Register </title>
    </head>
<body>
<h1 align="center">Story Site
<h4 align="center">share your story, show your life</h4></h1>
<h3>Register</h3>
<form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST">
		<p><label for="account">account:</label>
		<input type="text" name="account" id="account" /></p>
		<p><label for="pwd">password:</label>
		<input type="password" name="pwd" id="pwd" /></p>
		<p><label for="name">your name:</label>
		<input type="text" name="name" id="name" /></p>
		<p><label for="email">email address:</label>
		<input type="text" name="email" id="email" /></p>
	    <p><input type="submit" value="submit" /></p>
</form>


<?php
require 'connectsql.php';

if(isset($_POST['account'])and isset($_POST['pwd'])){
    $account = $_POST['account'];
    $password =$_POST['pwd'];
    $email=$_POST['email'];
    $name=$_POST['name'];

//conenected to database?
    if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;}

//check account validation
$stmt = $mysqli->prepare("select account from userinfo order by account ");
    if(!$stmt){
     printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;}
	$stmt->execute();
	$result = $stmt->get_result();echo "<ul>\n";
    while($row = $result->fetch_assoc()){
      $used=false;
	  if ($account==$row["account"]){
	  $used=true;
	  break;
	  }
	}echo "</ul>\n";
    $stmt->close();
    
    //found identical account in database,cannot create a new account
    if($used==true){
    echo "your account has already been used, please try another one";}
    
    //no identical account found in database, able to create a new account
    else{
    $stmt = $mysqli->prepare("insert into userinfo (name,email_address,account, password) values (?,?,?,?)");
    if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli, $mysqli->error);
	exit;
    }
    $stmt->bind_param('ssss',$name,$email, $account, crypt($password));
    $stmt->execute();
    $stmt->close();
    echo "you've succefully created an account";
    }
}
?>


<form action="query.php" method="POST">
	    <p><input type="submit" value="go back log in" /></p>
</form>
</body>
</html>