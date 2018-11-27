<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // print("filters response from backend!");

    $output = [
        "success" => false
    ];

    $minPrice = $_POST["minPrice"];
    $maxPrice = $_POST["maxPrice"];

    $listingQuery = "SELECT * FROM `listings` WHERE `price`>$minPrice AND `price`<$maxPrice";
    $result = mysqli_query($conn, $listingQuery);
    if(mysqli_num_rows($result) > 0){
        $count = 0;
        while($row = mysqli_fetch_assoc($result)){
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
        $output["success"] = true;
    }

    print_r(json_encode($output));

?>