<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
        "correctPassword" => false,
        "correctUser" => false,
    ];

    //need to sha1 password
    $email = $_POST["email"];
    $password = $_POST["password"];

    $checkUserQuery = "SELECT * from `users` WHERE `email`='$email'";
    $result = mysqli_query($conn, $checkUserQuery);
    if(mysqli_num_rows($result) > 0){
        $output["correctUser"] = true;
        while($row = mysqli_fetch_assoc($result)){
            $output["success"] = true;
            $dbPassword = $row["password"];
            if($dbPassword == $password){
                $output["correctPassword"] = true;
            }
        }
    }
    else{
        $output["correctUser"] = false;
    }


    print_r(json_encode($output));



?>