<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false;
    ]

    // checks for *strictly* matching queries
    

    mysqli_close($conn);
    print_r(json_encode($output));

?>
