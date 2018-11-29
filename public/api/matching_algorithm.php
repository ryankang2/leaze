<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("./mysql_connect.php");
    include "./queries/matching_algorithm_func.php";

    // expecting input of the user id of the main user
    //$mainUser = $_POST["mainUser"];
    $mainUser = 13; //test, delete after
    // expecting input of an array of user ids of the other users to compare main user to
    //$otherUsers = $_POST["otherUsers"];
    $otherUsers = array(14); //test, delete after

    $output = [
        "mainUser" => $mainUser
    ];

    foreach($otherUsers as $other) {
        $output[$other] = getMatchingPercentage($mainUser, $other, $conn);
    }
    
    // print final output array
    print_r(json_encode($output));
?>