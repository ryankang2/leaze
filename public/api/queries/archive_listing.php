<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    
    // expecting input of listing id for the listing to be archived
    $listing_id = intval($_POST["listing_id"]);
    $output = [
        "success" => "false"
    ];
    $updateArchiveQuery = "UPDATE `listings` SET `archived`=1 WHERE `listing_id`=$listing_id";
    if(mysqli_query($conn, $updateArchiveQuery)){
        $output["success"] = "true";
    }
    print($updateArchiveQuery);
    print_r($output);

    mysqli_close($conn);
?>