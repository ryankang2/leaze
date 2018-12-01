<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
        "email" => "",
        "guests_per_week" => 0,
        "late_sleeper" => 0,
        "deep_sleeper" => 0,
        "early_bird" => 0,
        "messiness" => 0,
        "video_games" => 0,
        "extrovert" => 0,
        "study_noise_level" => 0,
        "sharing_belongings" => 0,
        "roommate_relationship" => 0,
        "alcohol" => 0
        "marijuana" => 0
        "other" => 0
    ];

    //assume we can pass in the user id, and we output the information in output
    //$user = $_POST["user_id"];
    $user = 6;

    $prefQuery= "SELECT * from `preferences` WHERE `user_id`='$user'";
    $result = mysqli_query($conn, $prefQuery);
    
    $userQuery= "SELECT * from `users` WHERE `user_id`='$user';";

    // should only return one row (make sure to delete upon user 
    if(mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $output["guests_per_week"] = $row["guests_per_week"];
        $output["late_sleeper"] = $row["late_sleeper"];
        $output["deep_sleeper"] = $row["deep_sleeper"];
        $output["early_bird"] = $row["early_bird"];
        $output["messiness"] = $row["messiness"];
        $output["video_games"] = $row["video_games"];
        $output["extrovert"] = $row["extrovert"];
        $output["study_noise_level"] = $row["study_noise_level"];
        $output["sharing_belongings"] = $row["sharing_belongings"];
        $output["roommate_relationship"] = $row["roommate_relationship"];
        $output["alcohol"] = $row["alcohol"];
        $output["marijuana"] = $row["marijuana"];
        $output["other"] = $row["otherdrug"];
        $result = mysqli_query($conn, $prefQuery);
        $row = mysqli_fetch_assoc($result);
        $output["email"] = $row["email"];
        $output["success"] = true;
    }
    mysqli_close($conn);
    print_r(json_encode($output));

?>
