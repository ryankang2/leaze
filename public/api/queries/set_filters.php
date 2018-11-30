<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    //expecting input of a user id
    $user_id = $_POST["user_id"];

    // expecting input of value for each filter (pass "" for filter not set)
    $filters = [
        "dist_to_campus" => $_POST["dist_to_campus"],
        "price_low" => $_POST["price_low"],
        "price_high" => $_POST["price_high"],
        "pet" => $_POST["pet"],
        "laundry" => $_POST["laundry"],
        "furnished" => $_POST["furnished"],
        "gym" => $_POST["gym"],
        "pool" => $_POST["pool"],
        "parking" => $_POST["parking"],
        "home_type" => $_POST["home_type"],
        "room_type" => $_POST["room_type"]
    ];

    foreach($filters as $key => $value) {
        if ($value != "") {
            $updateQuery = "UPDATE `filters` SET $key=$value WHERE `user_id`=$user_id";
            mysqli_query($conn, $updateQuery);
        }
    }
?>