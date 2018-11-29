<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
   require "../mysql_connect.php";

    function getMatchingPercentage($user1, $user2) {
        $percentage = 100;
        $user1int  = intval($user1);
        $user2int  = intval($user2);

        // // get the preferences for each user
        $user1PrefQuery = "SELECT * FROM `preferences` WHERE `user_id`=$user1int";
        print($user1PrefQuery);
        $user1PrefResults = mysqli_query($conn, $user1PrefQuery);
        if(!$user1PrefResults){
            print("user 1 query is wrong");
        }
        $user2PrefQuery = "SELECT * FROM `preferences` WHERE `user_id`=$user2int";
        $user2PrefResults = mysqli_query($conn, $user2PrefQuery);

        print_r(json_encode($user1PrefResults));
        print_r(json_encode($user2PrefResults));
        

        // now compare the preferences for each user
        if(mysqli_num_rows($user1PrefResults) > 0 && mysqli_num_rows($user2PrefResults) > 0) {
            $user1Row = mysqli_fetch_assoc($user1PrefResults);
            $user2Row = mysqli_fetch_assoc($user2PrefResults);

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
                    case "substances":
                        if($value && $user2Row[$key]) {
                            $percentage -= abs(intval($value) - intval($user2Row[$key]));
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