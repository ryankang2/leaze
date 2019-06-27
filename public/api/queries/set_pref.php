<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = $_POST["user_id"];

    $changed = [
        "guests_per_week" => $_POST["gpd"],
        "late_sleeper" => $_POST["latesleep"],
        "deep_sleeper" => $_POST["deepsleep"],
        "early_bird" => $_POST["earlyrise"],
        "messiness" => $_POST["messy"],
        "video_games" => $_POST["videogames"],
        "extrovert" => $_POST["extro"],
        "alcohol" => $_POST["alcohol"],
        "marijuana" => $_POST["marijuana"],
        "cigarettes" => $_POST["cigarettes"],
        "otherdrug" => $_POST["other"],
        "study_noise_level" => $_POST["noise"],
        "sharing_belongings" => $_POST["share"],
        "roommate_relationship" => $_POST["relations"]
    ];

    // if there is a way to track what's been changed in the frontend, that would be the best.
    // here is if we can track what's been changed

    // assuming comes in as an associative array, hopefully this is what frontend can give us

    $worked = true;
    foreach ($changed as $key => $value) {
        $updateQuery = "UPDATE `preferences` SET `$key`=$value WHERE `user_id`=$user";
        if (!mysqli_query($conn, $updateQuery)) {
            $worked = false;
            break;
        }
    }

    if ($worked) {
        $output["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));
?>
