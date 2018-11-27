<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" = false;
        "guests_per_week" = -1;
        "late_sleeper" = -1;
        "deep_sleeper" = -1;
        "early_bird" = -1;
        "messiness" = -1;
        "video_games" = -1;
        "extrovert" = -1;
        "study_noise_level" = -1;
        "sharing_belongings" = -1;
        "roommate_relationship" = -1;
        "substances" = -1;
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = $_POST["user_id"];

    $prefQuery= "SELECT * from `preferences` WHERE `preferences_id`='$user'";
    $result = mysqli_query($conn, $checkUserQuery);
    
    // should only return one row (make sure to delete upon user 
    if(mysqli_num_rows($result) == 1){
        $row = mysqli_fetch_assoc($result)
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
        $output["substances"] = $row["substances"];
        $ourput["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));


?>
