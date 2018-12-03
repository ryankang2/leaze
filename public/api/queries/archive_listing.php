<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    
    // expecting input of listing id for the listing to be archived
    $listing_id = $_POST["listing_id"];
    $updateArchiveQuery = "UPDATE `listings` SET `archived`=1 WHERE `listing_id`=$listing_id";
    mysqli_query($conn, $updateArchiveQuery);

    mysqli_close($conn);
?>