<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "noListings" => true,
        "success" => false
    ];

    $input = explode(" ", $_POST["searchQuery"]);

    $searchQ = "select * from `listings` where ";
    foreach ($input as $word) {
        $searchQ .= "address like \"%" . $word . "%\" or title like \"%" . $word . "%\" or description like \"%" . $word . "%\" or ";
    }

    $searchQ = substr($searchQ,0,-4);
    $searchQ .= ";";

    $listings = mysqli_query($conn, $searchQ);

    if (mysqli_num_rows($listings) == 0) {
        $output["noListings"] = true;
    }

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
        $output["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));
?>
