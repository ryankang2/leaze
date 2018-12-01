<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    //expecting input of a user id
    $user_id = $_POST["user_id"];

    // build the home string to match how it is stored internally in database
    $home = "";
    if ($_POST["roomHouse"]) {
        $home .= "h";
    }
    if ($_POST["roomApart"]) {
        $home .= "a";
    }

    // build the room string to match how it is stored internally in database
    $room = "";
    if ($_POST["roomSingle"]) {
        $room .= "s";
    }
    if ($_POST["roomDouble"]) {
        $room .= "d";
    }
    if ($_POST["roomTriple"]) {
        $room .= "t";
    }
    if ($_POST["roomLiving"]) {
        $room .= "l";
    }

    // expecting input of value for each filter
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
        "home_type" => $home,
        "room_type" => $room
    ];

    foreach($filters as $key => $value) {
        if ($value) {
            $updateQuery = "UPDATE `filters` SET $key=$value WHERE `user_id`=$user_id";
            mysqli_query($conn, $updateQuery);
        }
    }

    mysqli_close($conn);
?>