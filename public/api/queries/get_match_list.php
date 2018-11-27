<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false;
        "listings" => [];
    ]

    // checks for *strictly* matching queries
    
    // we need filters to come in as an associative array
    $filters = $_POST["filters"];
    
    // select all initially
    $buildQuery = "SELECT * FROM `listings`";
    
    // if there are any filters applied, add them to the query
    if (sizeof($filters) > 0) {
        $buildQuery .= " WHERE ";
        foreach ($filters as $key=>$value) {
            $buildQuery .= "'$key'='$value' AND ";
        }
        //trim ending AND lol smfh
        $buildQuery = substr($buildQuery, 0, -4);
    }

    $query = $buildQuery

    $results = mysqli_query($conn, $query)

    if ($results != false) {
        $ouptut["listings"] = $results;
        $output["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));

?>
