<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user_id
    $user_id = $_POST["user_id"];

    $output = [
        "noListings" => false
    ];

    $getQuery = "SELECT * FROM `listings` WHERE `user_id_posted`=$user_id";
    $results = mysqli_query($conn, $getQuery);

    // if there are no listings user has posted
    if(mysqli_num_rows($results) == 0){
        $output["noListings"] = true;
    }
    // else add to the output
    else {
        while($row = mysqli_fetch_assoc($results)){
            $output["listings"][] = $row; 
        }
    }

    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>