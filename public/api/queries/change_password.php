<?php
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     require_once("../mysql_connect.php");   

    $output = [
        "success"=> false,
    ];
    $email = $_POST["email"];
    $password = sha512($_POST["password"]);
    $query = "UPDATE `users` SET `password`='$password' WHERE `email`='$email'";
    $result = mysqli_query($conn, $query);
    if($result){
        $output["success"] = true;
    }

    print_r($output);

?>