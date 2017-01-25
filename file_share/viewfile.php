
<?php
session_start();
 
$filename = $_GET['file'];
 
// We need to make sure that the filename is in a valid format; if it's not, display an error and leave the script.
// To perform the check, we will use a regular expression.
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo "Invalid filename";
	exit;
}
 
$username = $_SESSION['login_user'];
if( !preg_match('/^[\w_\-]+$/', $username) ){
	echo "Invalid username";
	exit;
}
 
$full_path = sprintf("/home/heyu/public_html/fileshare/%s/%s", $username, $filename);

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($full_path);

// Finally, set the Content-Type header to the MIME type of the file, and display the file.
header("Content-Type: ".$mime);
header('Content-Disposition: attachment; filename="'.$filename.'"');
readfile($full_path);
?>
