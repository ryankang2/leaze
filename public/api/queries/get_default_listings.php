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
        "parking" => "",
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
        $getListings .= "`pets`=1 AND ";
    }

    if ($filters["laundry"] != "") {
        $getListings .= "`in_unit_laundry`=1 AND ";
    }

    if ($filters["furnished"] != "") {
        $getListings .= "`furnished`=1 AND ";
    }

    if ($filters["gym"] != "") {
        $getListings .= "`gym`=1 AND ";
    }

    if ($filters["pool"] != "") {
        $getListings .= "`pool`=1 AND ";
    }

    if ($filters["parking"] != "") {
        $getListings .= "`parking`=1 AND " ;
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