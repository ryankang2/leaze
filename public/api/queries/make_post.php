<?php
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Headers: *");
       require_once("../mysql_connect.php");

       $output = [
           "success"=>false,
       ];
       //---security for sql injection attacks---//
       //htmlentities -> strip a string of various element encodings
       //addslahes -> gets rid of quotes

       $user_id = $_POST["user_id_posted"];    //hard coded (use $_POST['user_id'])
       $date_posted = date("Y/m/d");
       $title = htmlentities(addslashes($_POST["title"]));
       $address = htmlentities(addslashes($_POST["address"]));
       $description = htmlentities(addslashes($_POST["description"]));
       $distance = htmlentities(addslashes(intval($_POST["dist_to_campus"])));
       $price = htmlentities(addslashes($_POST["price"]));
       $home_type = $_POST["home_type"];
       $room_type = $_POST["room_type"];
       $pet = ($_POST["pet"] === "true" ? 1 : 0);
       $laundry = ($_POST["in_unit_laundry"] === "true" ? 1 : 0);
       $furnished = ($_POST["furnished"] === "true" ? 1 : 0);
       $gym = ($_POST["gym"] === "true" ? 1 : 0);
       $pool = ($_POST["pool"] === "true" ? 1 : 0);
       $parking = ($_POST["parking"] === "true" ? 1 : 0);
       $archived = 0;

       $postQuery = "INSERT INTO `listings` (date_posted, user_id_posted, title, address, description,
                    dist_to_campus, price, home_type, room_type, pet, in_unit_laundry, furnished, gym, 
                    pool, parking, archived) VALUES ('$date_posted', $user_id, '$title', '$address', '$description',
                    $distance, $price, '$home_type', '$room_type', $pet, $laundry, $furnished, $gym, 
                    $pool, $parking, $archived)";
        $result = mysqli_query($conn, $postQuery);
        if($result){
            $output["success"] = true;
        } 


       print_r(json_encode($output));
?>
