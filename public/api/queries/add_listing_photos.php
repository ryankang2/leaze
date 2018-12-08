<?php
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Headers: *");
       require_once("../mysql_connect.php");

       // expecting input of listing id
       $listing_id = $_POST["listing_id"];

       // expecting input of array of photo files
       $photos = $_POST["photos"];

       // loop through array of input photos
       for ($i = 0; $i < count($photos); $i++) {
           // convert to blob type with fopen and rb mode
           $blob = fopen($photos[$i], 'rb');

           // now insert into database
           $insertQuery = "INSERT INTO `photos` (listing_id, photo) VALUES ($listing_id, $blob)";
           mysqli_query($conn, $insertQuery);
       }

       mysqli_close($conn);
?>