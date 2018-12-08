<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user id to update profile pic for
    $user_id = $_POST["user_id"];

    // expecting input of photo to update with
    $photo = $_POST["photo"];

    $updateQuery = "UPDATE `profile` SET `profile_pic`=$photo WHERE `user_id`=$user_id";
    mysqli_query($conn, $updateQuery);

    mysqli_close($conn);
?>