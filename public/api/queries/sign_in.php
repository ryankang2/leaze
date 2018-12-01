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
    // $password = hash("sha512", $_POST["password"]);
    $password = $_POST["password"];

    $checkUserQuery = "SELECT * from `users` WHERE `email`='$email'";
    $result = mysqli_query($conn, $checkUserQuery);
    if(mysqli_num_rows($result) > 0){
        $output["correctUser"] = true;
        while($row = mysqli_fetch_assoc($result)){
            $dbPassword = $row["password"];
            if($dbPassword == $password){
                $output["success"] = true;
                $output["correctPassword"] = true;
                $output["id"] = $row["user_id"];
            }
        }
    }
    else{
        $output["correctUser"] = false;
    }

    mysqli_close($conn);
    print_r(json_encode($output));


?>
