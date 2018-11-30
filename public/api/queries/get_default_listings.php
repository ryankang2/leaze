<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    //expecting input of a user id
    //$user_id = $_POST["user_id"];
    $user_id = 3; //test, delete after

    $output = [
        "noListings" => false
    ];

    $filters = [
        "dist_to_campus" => "",
        "price_low" => "",
        "price_high" => "",
        "pet" => "",
        "laundry" => "",
        "furnished" => "",
        "gym" => "",
        "pool" => "",
        "parking_spots" => "",
        "home_type" => "",
        "room_type" => ""
    ];

    // get the user's saved default filters
    $userFiltersQuery = "SELECT * FROM `filters` WHERE `user_id`=$user_id";
    $userFiltersResults = mysqli_query($conn, $userFiltersQuery);

    // determine which filters user has actually set
    if(mysqli_num_rows($userFiltersResults) > 0){
        $userRow = mysqli_fetch_assoc($userFiltersResults);
        foreach($userRow as $key => $value) {
            // if the current filter is not null (user has set it)
            if ($value) {
                $filters[$key] = $value;
            }
        } 
    }

    // build the listings query based on the filters the user has set
    $getListings = "SELECT * FROM `listings` WHERE `archived`=0 AND ";

    if ($filters["dist_to_campus"] != "") {
        $getListings .= "`dist_to_campus`<=" . $filters["dist_to_campus"] . " AND ";
    }

    if ($filters["price_low"] != "") {
        $getListings .= "`price`>=" . $filters["price_low"] . " AND ";
    }

    if ($filters["price_high"] != "") {
        $getListings .= "`price`<=" . $filters["price_high"] . " AND ";
    }

    if ($filters["pet"] != "") {
        $getListings .= "`pets`==" . $filters["pet"] . " AND ";
    }

    if ($filters["laundry"] != "") {
        $getListings .= "`in_unit_laundry`==" . $filters["laundry"] . " AND ";
    }

    if ($filters["furnished"] != "") {
        $getListings .= "`furnished`==" . $filters["furnished"] . " AND ";
    }

    if ($filters["gym"] != "") {
        $getListings .= "`gym`==" . $filters["gym"] . " AND ";
    }

    if ($filters["pool"] != "") {
        $getListings .= "`pool`==" . $filters["pool"] . " AND ";
    }

    if ($filters["parking_spots"] != "") {
        $getListings .= "`parking_spot`>=" . $filters["parking_spots"] . " AND ";
    }

    if ($filters["home_type"] != "") {
        $getListings .= "`home_type`==" . $filters["home_type"] . " AND ";
    }

    if ($filters["room_type"] != "") {
        $getListings .= "`room_type`==" . $filters["room_type"] . " AND ";
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

    // print final output array
    print_r(json_encode($output));
?>