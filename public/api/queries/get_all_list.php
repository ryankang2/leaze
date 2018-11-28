<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" = false;
        "listings" = [];
    ]

    $listQuery = "SELECT * from `listings`"
    $result = mysqli_query($conn, $listQuery);
    if ($result != false) {
        $output["success"] = true;
        $output["listings"] = $result;
    }

    mysqli_close($conn);
    print_r(json_encode($output));
?>
