<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];

    $id = $_POST["id"];

    $getUserQuery = "SELECT * FROM `users` WHERE `user_id`=$id";
    $result = mysqli_query($conn, $getUserQuery);
    if(mysqli_num_rows($result) === 0){
        print_r(json_encode($output));
    }
    else{
        $row = mysqli_fetch_assoc($result);
        $output["user"][] = $row;
        $output["success"] = true;
    }
    print_r(json_encode($output));
?>