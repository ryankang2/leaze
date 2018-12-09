<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user_id
    $user_id = $_POST["user_id"];

    $output = [
        "success" => false,
        "dist_to_campus" => "100",
        "price_low" => "0",
        "price_high" => "5000",
        "pet" => false,
        "laundry" => false,
        "furnished" => false,
        "gym" => false,
        "pool" => false,
        "parking" => false,
        "roomHouse" => false,
        "roomApart" => false,
        "roomSingle" => false,
        "roomDouble" => false,
        "roomTriple" => false,
        "roomLiving" => false
    ];

    // get the user's saved default filters
    $userFiltersQuery = "SELECT * FROM `filters` WHERE `user_id`=$user_id";
    $userFiltersResults = mysqli_query($conn, $userFiltersQuery);

    if(mysqli_num_rows($userFiltersResults) > 0){
        $output["success"] = true;
        $userRow = mysqli_fetch_assoc($userFiltersResults);

        foreach($userRow as $key => $value) {
            // if not null (null means user has not set default for this filter)
            if ($value) {
                switch($key) {
                    case "home_type":
                        if (strpos($value, 'h') !== false) {
                            $output["roomHouse"] = true;
                        }
                        if (strpos($value, 'a') !== false) {
                            $output["roomApart"] = true;
                        }
                        break;
                    case "room_type":
                        if (strpos($value, 's') !== false) {
                            $output["roomSingle"] = true;
                        }
                        if (strpos($value, 'd') !== false) {
                            $output["roomDouble"] = true;
                        }
                        if (strpos($value, 't') !== false) {
                            $output["roomTriple"] = true;
                        }
                        if (strpos($value, 'l') !== false) {
                            $output["roomLiving"] = true;
                        }
                        break;
                    case "price_low":
                        // fall through
                    case "price_high":
                        // fall through
                    case "dist_to_campus":
                        if ($value) {
                            $output[$key] = $value;
                        }
                        break;
                    case "user_id":
                        break;
                    // rest are boolean filters
                    default:
                        if ($value == "1") {
                            $output[$key] = true;
                        }
                }
            }
        }
    }

    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>