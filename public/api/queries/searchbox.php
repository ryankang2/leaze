<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];

    $input = $_POST["searchQuery"].explode(" ");
    $length = count($input);
    
    for($i = 0; $i < $length; $i++){

    }

    print_r(json_encode($output));
?>