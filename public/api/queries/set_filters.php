<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    //expecting input of a user id
    $user_id = $_POST["user_id"];

    // build the home string to match how it is stored internally in database
    $home = "";
    if ($_POST["roomHouse"] == "true") {
        $home .= "h";
    }
    if ($_POST["roomApart"] == "true") {
        $home .= "a";
    }

    // build the room string to match how it is stored internally in database
    $room = "";
    if ($_POST["roomSingle"] == "true") {
        $room .= "s";
    }
    if ($_POST["roomDouble"] == "true") {
        $room .= "d";
    }
    if ($_POST["roomTriple"] == "true") {
        $room .= "t";
    }
    if ($_POST["roomLiving"] == "true") {
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
    
    // determine if it is the first time user is setting filters
    $checkHasFilters = "SELECT * FROM `filters` WHERE `user_id`=$user_id";
    $results = mysqli_query($conn, $checkHasFilters);
    $firstTime = true;
    if (mysqli_num_rows($results) > 0) {
        $firstTime = false;
    }
    
    if ($firstTime == false) {
        foreach($filters as $key => $value) {
            if ($value != "false") {
                // match the format that the database stores true booleans
                if ($value == "true") {
                    $value = "1";
                }

                $updateQuery = "UPDATE `filters` SET $key='$value' WHERE `user_id`=$user_id";
                mysqli_query($conn, $updateQuery);
            }
        }
    }
    else {
        $insertQuery = "INSERT INTO `filters` (user_id,";
        foreach($filters as $key => $value) {
            if ($value != "false") {               
                $insertQuery .= $key . ",";
            }
        }
        //drop last comma
        $insertQuery = substr($insertQuery, 0, -1);

        $insertQuery .= ") VALUES ('$user_id',";
        foreach($filters as $key => $value) {
            if ($value != "false") {
                // match the format that the database stores true booleans
                if ($value == "true") {
                    $value = "1";
                }
                $insertQuery .= "'$value',";
            }
        }
        //drop last comma and close parantheses
        $insertQuery = substr($insertQuery, 0, -1);
        $insertQuery .= ")";

        mysqli_query($conn, $insertQuery);
    }

    mysqli_close($conn);
?>