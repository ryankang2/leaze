<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user id to update profile pic for
    $user_id = $_POST["user_id"];

    // expecting input of photo to update with
    $photo = $_POST["photo"];

    // convert to blob type with fopen and rb mode
    $blob = fopen($photo, 'rb');

    $updateQuery = "UPDATE `profile` SET `profile_pic`=$blob WHERE `user_id`=$user_id";
    mysqli_query($conn, $updateQuery);

    mysqli_close($conn);
?>