<?php
    $output = [
        "success" => false,
    ];

    $output["success"] = true;
    $output["message"] = "this is from the backend";

    return json_encode($output);
?>