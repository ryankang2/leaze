<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of listing id
    $listing_id = $_POST["listing_id"];

    $output = [
        "noPhotos" => true
    ];

    $getQuery = "SELECT `photo` FROM `photos` WHERE `listing_id`=$listing_id";
    $results = mysqli_query($conn, $getQuery);

    if(mysqli_num_rows($results) > 0){
        $output["noPhotos"] = false;
        while($row = mysqli_fetch_assoc($results)){
            $output["photos"] = $row["photo"];
        }
    }
    
    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>