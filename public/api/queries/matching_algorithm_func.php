<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    function getMatchingPercentage($user1, $user2, $conn) {
        // rating starts at 100%, can only go down
        $percentage = 100;

        // get the preferences for each user
        $user1PrefQuery = "SELECT * FROM `preferences` WHERE `user_id`=$user1";
        $user1PrefResults = mysqli_query($conn, $user1PrefQuery);
        $user2PrefQuery = "SELECT * FROM `preferences` WHERE `user_id`=$user2";
        $user2PrefResults = mysqli_query($conn, $user2PrefQuery);  


        // now compare the preferences for each user
        if(mysqli_num_rows($user1PrefResults) > 0 && mysqli_num_rows($user2PrefResults) > 0) {
            $user1Row = mysqli_fetch_assoc($user1PrefResults);
            $user2Row = mysqli_fetch_assoc($user2PrefResults);
 
            // substance preferences first, different format than rest
            if (abs(intval($user1Row["alcohol"]) - intval($user2Row["alcohol"])) == 2) {
                $percentage -= 1;
            }
            if (abs(intval($user1Row["marijuana"]) - intval($user2Row["marijuana"])) == 2) {
                $percentage -= 2;
            }
            if (abs(intval($user1Row["cigarettes"]) - intval($user2Row["cigarettes"])) == 2) {
                $percentage -= 3;
            }
            if (abs(intval($user1Row["otherdrug"]) - intval($user2Row["otherdrug"])) == 2) {
                $percentage -= 5;
            }

            foreach($user1Row as $key => $value) {        
                switch($key) {           
                    case "deep_sleeper":
                        // fall through
                    case "early_bird":
                        // fall through
                    case "late_sleeper":
                        if (abs(intval($value) - intval($user2Row[$key])) == 2) {
                            $percentage -= 2.5;
                        }
                        break;
                    case "guests_per_week":
                        // fall through
                    case "study_noise_level":
                        // fall through
                    case "video_games":
                        if($value && $user2Row[$key]) {
                            $percentage -= abs(intval($value) - intval($user2Row[$key])) * 0.5;
                        }
                        break;
                    case "messiness":
                        // fall through                  
                    case "extrovert":
                        if($value && $user2Row[$key]) {
                            $percentage -= abs(intval($value) - intval($user2Row[$key])) * 2;
                        }
                        break;
                    case "sharing_belongings":
                        if($value && $user2Row[$key]) {
                            $percentage -= abs(intval($value) - intval($user2Row[$key])) * 1.5;
                        }
                        break;
                    case "roommate_relationship":
                        if($value && $user2Row[$key]) {
                                $dif = abs(intval($value) - intval($user2Row[$key]));
                                if ($dif == 1) {
                                    $percentage -= 5;
                                }
                                elseif ($dif == 2) {
                                    $percentage -= 10;
                                }
                        }
                        break;   
                    default:
                        break;
                }
            }
        }
        return round($percentage);
    }
?>