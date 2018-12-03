<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of value of all listing attributes (pass "" if not set)
    $info = [
        "date_posted" => "18/12/3",//$_POST["date_posted"],
        "user_id_posted" => "10",//$_POST["user_id_posted"],
        "title" => "Single room in La Jolla!",//$_POST["title"],
        "address" => "505 La Jolla Way",//$_POST["address"],
        "description" => "Looking to rent out a room in my apartment. Very close to campus!",//$_POST["description"],
        "dist_to_campus" => "5",//$_POST["dist_to_campus"],
        "price" => "800",//$_POST["price"],
        "move_in_date" => "",//$_POST["move_in_date"],
        "move_out_date" => "",//$_POST["move_out_date"],
        "home_type" => "a",//$_POST["home_type"],
        "room_type" => "s",//$_POST["room_type"],
        "pet" => "",//$_POST["pet"],
        "in_unit_laundry" => "1",//$_POST["in_unit_laundry"],
        "furnished" => "0",//$_POST["furnished"],
        "gym" => "1",//$_POST["gym"],
        "pool" => "1",//$_POST["pool"],
        "parking" => ""//$_POST["parking"]
    ];

    // build the query
    $addListingQuery = "INSERT INTO `listings` (";
    foreach($info as $key => $value) {
        if ($value != "") {
            $addListingQuery .= $key . ",";
        }
    }
    //drop last comma
    $addListingQuery = substr($addListingQuery, 0, -1);
    $addListingQuery .= ") VALUES (";
    foreach($info as $key => $value) {
        if ($value != "") {
            $addListingQuery .= "'$value',";
        }
    }
    //drop last comma and close parantheses
    $addListingQuery = substr($addListingQuery, 0, -1);
    $addListingQuery .= ")";

    // now add entry to listings table in database
    mysqli_query($conn, $addListingQuery);

    mysqli_close($conn);
?>