<?php
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Headers: *");
       require_once("../mysql_connect.php");
        
       // expecting input of array of photo files
       $photos = htmlentities(addslashes($_POST["images"]));
       

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
    //    foreach($photos as $value ) {
    //               // convert to blob type with fopen and rb mode
    //        $blob = fopen($value, 'rb');

    //        // now insert into database
    //        $insertQuery = "INSERT INTO `photos` (listing_id, photo) VALUES ($listing_id, $blob)";
    //        if(!mysqli_query($conn, $insertQuery)){
    //            $output["success"] = false;
    //        }
    //    }


    
        // $blob = fopen($photos, 'rb');
        // print($listing_id);
        $insertQuery = "INSERT INTO `photos` (listing_id, photo) VALUES ($listing_id, '$photos')";
        print($insertQuery);
        if(!mysqli_query($conn, $insertQuery)){
            $output["success"] = false;
        }
        // print($insertQuery);
       mysqli_close($conn);
       print_r(json_encode($output));
?>