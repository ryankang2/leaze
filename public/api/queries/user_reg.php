<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "errors" => []
    ];
    $first_name = $_POST["fname"];
    $last_name = $_POST["lname"];
    $email = $_POST["email"];
    $password = hash("sha512", $_POST["password"]);
    $full_name = $first_name . ' ' . $last_name;

    $checkUserQuery = "SELECT * from `users` WHERE `email`='$email'";
    $result = mysqli_query($conn, $checkUserQuery);
    if(mysqli_num_rows($result)==0) {
        $insertNewUserQ = "INSERT INTO `users` (email,password,full_name,first_name,last_name) VALUES ('$email','$password','$full_name','$first_name','$last_name')";
        if (mysqli_query($conn, $insertNewUserQ)) {
            $output["userSuccess"] = true;
            // $out
        }
        else {
            $output["errors"][] = "User Insertion Error";
        }
        $userID = mysqli_insert_id($conn);
        $insertNewProfileQ = "INSERT INTO `profile` (user_id, has_picture, about_me, school, major, facebook, instagram, twitter, favorites, year) VALUES ($userID, 0, '', '', '', 
                                '', '', '', '', '')";
        if(mysqli_query($conn, $insertNewProfileQ)){
            $output["profileSuccess"] = true;
        }
        else{
            $output["errors"][] = "Profile Insertion Error";
        }
        $insertNewPreferencesQ = "INSERT INTO `preferences` (user_id) VALUES ($userID)";
        if(mysqli_query($conn, $insertNewPreferencesQ)){
            $output["prefSuccess"] = true;
        }
        else{
            $output["errors"][] = "Preferences Insertion Error";
        }
        $insertNewFiltersQ = "INSERT INTO `filters` (user_id, dist_to_campus, price_low, price_high, pet, laundry, furnished, gym, pool, parking,
                                home_type, room_type) VALUES ($userID, 50, 0, 10000, 1, 1, 1, 1, 1, 1, 'a', 'd')";
        if(mysqli_query($conn, $insertNewFiltersQ)){
            $output["filtersSuccess"] = true;
        }
        else{
            $output["errors"][] = "Filters Insertion Error";
        }
    }

    mysqli_close($conn);

    print_r(json_encode($output));

?>
