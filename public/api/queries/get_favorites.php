<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user id
    $user_id = $_POST["user_id"];

    $output = [
        "noFavorites" => false
    ];

    $listOfFavs = array();

    $getFavQuery = "SELECT `favorites` FROM `profile` WHERE `user_id`=$user_id";
    $getFavResults = mysqli_query($conn, $getFavQuery);

    if(mysqli_num_rows($getFavResults) > 0){
        $row = mysqli_fetch_assoc($getFavResults);
        $favs = $row["favorites"];
        if (strlen($favs) < 2) {
            $output["noFavorites"] = true;
        }
        else {
            $split = explode(',', $favs);
            for($i = 0; $i < count($split)-1; $i++) {
                    array_push($listOfFavs, $split[$i]);
            }
            // in case there are repeat listing ids in favorites column in db
            $listOfFavs = array_unique($listOfFavs);
            
            // build the query
            $getListingsQuery = "SELECT * FROM `listings` WHERE `archived`=0 AND `listing_id` IN (";
            for ($i = 0; $i < count($listOfFavs); $i++) {
                $getListingsQuery .= $listOfFavs[$i] . ",";
            }
            // drop last comma and close parantheses
            $getListingsQuery = substr($getListingsQuery, 0, -1);
            $getListingsQuery .= ")";

            // now make the query to get listings
            $listings = mysqli_query($conn, $getListingsQuery);

            // build the ouput
            if(mysqli_num_rows($listings) > 0){
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
        }
    }      

    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>