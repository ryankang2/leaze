<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    $output = [
        "noListings" => false
    ];

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

    // expecting input of current value of each filter
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

    // build the listings query based on the filters the user has set
    $getListings = "SELECT * FROM `listings` WHERE `archived`=0 AND ";

    $getListings .= "`dist_to_campus`<=" . $filters["dist_to_campus"] . " AND ";
    $getListings .= "`price`>=" . $filters["price_low"] . " AND ";
    $getListings .= "`price`<=" . $filters["price_high"] . " AND ";

    if ($filters["pet"] == "true") {
        $getListings .= "`pet`=1 AND ";
    }

    if ($filters["laundry"] == "true") {
        $getListings .= "`in_unit_laundry`=1 AND ";
    }

    if ($filters["furnished"] == "true") {
        $getListings .= "`furnished`=1 AND ";
    }

    if ($filters["gym"] == "true") {
        $getListings .= "`gym`=1 AND ";
    }

    if ($filters["pool"] == "true") {
        $getListings .= "`pool`=1 AND ";
    }

    if ($filters["parking"] == "true") {
        $getListings .= "`parking`=1 AND ";
    }

    if (strlen($filters["home_type"]) == 1) {
        $getListings .= "`home_type`=" . $filters["home_type"] . " AND ";
    }
    elseif (strlen($filters["home_type"]) == 2) {
        $getListings .= "`home_type` IN ('h', 'a') AND ";
    }

    if (strlen($filters["room_type"]) > 0) {
        $getListings .= "`room_type` IN (";
        $arr = str_split($filters["room_type"]);
        for ($i=0; $i<count($arr); $i++){
            $getListings .= "'" . $arr[$i] . "',";
        }
        //remove last comma and close parantheses
        $getListings = substr($getListings, 0, -1);
        $getListings .= ") AND ";
    }

    // remove last " AND " in the query string
    $getListings = substr($getListings, 0, -5);
    // now make the query
    $listings = mysqli_query($conn, $getListings);

    // if there are no listings with user's desired filters
    if(mysqli_num_rows($listings) == 0){
        $output["noListings"] = true;
    }
    // else add to the output (info about the listing and the user who posted)
    else {
        $count = 0;
        while($row = mysqli_fetch_assoc($listings)){
            $output["listings"][] = $row;
            $userID = $row["user_id_posted"];
            $userQuery = "SELECT * FROM `users` JOIN `profile` ON `users`.user_id=`profile`.user_id WHERE `users`.user_id=$userID";
            $userResult = mysqli_query($conn, $userQuery);
            if(mysqli_num_rows($userResult) > 0){
               $userRow = mysqli_fetch_assoc($userResult);
               $userRow["password"] = "XXX";
               $output["listings"][$count]["user"] = $userRow;
            }
            $count++;
        }
    }
    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>