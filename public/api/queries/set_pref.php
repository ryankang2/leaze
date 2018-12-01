<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" = false
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = $_POST["user_id"];

    // if there is a way to track what's been changed in the frontend, that would be the best.
    // here is if we can track what's been changed

    // assuming comes in as an associative array, hopefully this is what frontend can give us
    $changed = $_POST["changed_fields"];

    foreach ($changed as $key => $value) {
        $updateQuery = "UPDATE `preferences` SET '$key'='$value' WHERE `preferences_id`='$user'";
        if (!mysqli_query($conn, $updateQuery)) {
            $output["success"] = false;
            break;
        }
    }

    mysqli_close($conn);
    print_r(json_encode($output));
?>
