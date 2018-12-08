<?php
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Headers: *");
       require_once("../mysql_connect.php");

       // expecting input of array of photo files
       $photos = file_get_contents($_POST["images"]);

        // print_r($photos);
       $output = [
           "success" => true,
       ];
       // get the listing id
       $getQuery = "SELECT MAX(listing_id) AS ID_MAX FROM `listings`";
       $result = mysqli_query($conn, $getQuery);
       if ($result) {
           $listing_id = intval(mysqli_fetch_assoc($result)["ID_MAX"]);
       }

       // loop through array of input photos
    //    for ($i = 0; $i < count($photos); $i++) {
    //        // convert to blob type with fopen and rb mode
    //        $blob = fopen($photos[$i], 'rb');

    //        // now insert into database
    //        $insertQuery = "INSERT INTO `photos` (listing_id, photo) VALUES ($listing_id, $blob)";
    //        if(!mysqli_query($conn, $insertQuery)){
    //            $output["success"] = false;
    //        }
    //    }
    
        // $blob = fopen($photos, 'rb');
        print($listing_id);
        $insertQuery = "INSERT INTO `photos` (listing_id, photo) VALUES ($listing_id, $photos)";
        if(!mysqli_query($conn, $insertQuery)){
            $output["success"] = false;
        }
        // print($insertQuery);
       mysqli_close($conn);
       print_r(json_encode($output));
?>