<!DOCTYPE html>
<head>
    <title> Log Out Page </title>
</head>
<body>
    <?php
    session_start();
    session_destroy();
    header("Location: login.php");
    ?>
</body>