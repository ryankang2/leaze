<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("./mysql_connect.php");
    include "./queries/matching_algorithm_func.php";

    // expecting input of the user id of the main user
    $mainUser = $_POST["mainUser"];
    // expecting input of other user to get matching percentage between
    $other = $_POST["other"];

    $output = [
        "mainUser" => $mainUser,
        "result" => getMatchingPercentage($mainUser, $other, $conn)
    ];

    mysqli_close($conn);

    // print final output array
    print_r(json_encode($output));
?>