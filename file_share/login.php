<!DOCTYPE HTML>
<html>
    <head>
        <title> Login Page </title>
    </head>
    <body>
    	<h1 align="center"> File Exchange </h1>
        <h3> Please enter your username below </h3>
        <form action= "<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST">
            <p>
                <label for="usernameinput"> Username: </label>
                <input type= "text" name="username" id="usernameinput"/>
                <input type="submit" name="Submit" value="Submit"/>
            </p>
        </form>
    
	
	
    <?php
    session_start();
    if( isset($_POST['username'])||isset($_SESSION['login_user']) ){
        $login = false;
        if (isset($_POST['username']) ){
		$username = $_POST['username'];}
		else{
		$username =$_SESSION['login_user'];
		}
        $text = fopen("/home/heyu/users/usernames.txt", "r") or die ("Unable to open file!");
        while(!feof($text)){
		$realusername = fgets($text);
		if (strlen($username)==0){
			break;
		}
		elseif (trim($realusername) == trim($username)){
                $login = true;
                $_SESSION['login_user']= $username;
                break;
            }
        }
		fclose($text);
        if ($login == true){
        	echo "Success Login";
        	echo "<br>";
        	echo "<br>";
            get_files($username);
			logout();
			deletefile();
			viewfile();
            upload();
        }
        else {
            echo "Invalid Username. Please check your login information and try again.";
			echo "<br>";
			adduser();
        }
    }
    
	#Function that accesses and displays a user's files    
    function get_files($username){
        $dir = "/home/heyu/public_html/fileshare/".$username."/";
        $userfiles = (scandir($dir));
        $filecount = count($userfiles)-2;
        
		echo "<h2>Hi ".$username.",</h2>";
		echo "<br>";
        echo "You have ".$filecount." files in your account:";
        echo "<br>";
    	echo "<ol>";
        for($i=2; $i<count($userfiles);$i++){
            echo "<li>";
            echo $userfiles[$i];
            echo "</li>";
            #echo "<br>";  
        }
        echo "</ol>";
     }
     
	 #Function that adds the upload functionality
     function upload(){
        echo '<h3> Upload a File </h3>';
        echo '<form enctype="multipart/form-data" action="/~heyu/file_exchange/uploadpage.php" method="POST">';
        echo '<p> <input type="hidden" name="MAX_FILE_SIZE" value="20000000" />';
		echo '<label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input"/></p>';
        echo '<p><input type="submit" value="Upload File"/></p></form>';
	 }
	 
	 #Function that adds the viewfile functionality
	 function viewfile(){
		echo '<h3> View File </h3>';
		echo '<form method="GET" action="/~heyu/file_exchange/viewfile.php">';
		echo '<label> View File: <input type="text" name="file"/> </label>';
		echo '<input type="submit" name="submit" value="View File">';
		echo '</form>';		
        
	 }
	 
	 #Function that adds the deletefile functionality
	 function deletefile(){
		echo '<h3> Delete File </h3>';
		echo '<form method="POST" action="/~heyu/file_exchange/deletepage.php">';
		echo '<label> Delete File: <input type="text" name="deletefile"/> </label>';
		echo '<input type="submit" name="submit" value="Delete File">';
		echo '</form>';
	 }
	 
	 #Function that adds the logout functionality
     function logout(){   
        echo '<h3> Log Out </h3>';
        echo '<form action="/~heyu/file_exchange/logout.php" method="POST">';
		echo '<input type="submit" value="Log Out">';
		echo '</form>';
	 }
	 
	 function adduser(){
		echo '<h3> Add New User </h3>';
		echo '<form method="POST" action="/~heyu/file_exchange/adduserpage.php">';
		echo '<label> New User Name: <input type="text" name="adduser"/> </label>';
		echo '<input type="submit" name="submit" value="Create User">';
		echo '</form>';
	 }
     
    ?>
    </body>
	</html>