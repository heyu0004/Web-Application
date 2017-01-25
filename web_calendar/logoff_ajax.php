<?php
// logoff_ajax.php
        
	    session_destroy();
	    echo json_encode(array("success" => true,"message" => "you are logged off"));
	    exit;	
	    

?>
