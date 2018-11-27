<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];

    $output["success"] = true;
    $output["message"] = "this is from the backend";

    print_r(json_encode($output));
?>