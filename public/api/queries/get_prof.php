<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
        "email" => "",
        "firstname" => "",
        "lastname" => "",
        "age" => "",
        "school" => "",
        "major" => "",
        "year" => "",
        "bio" => "",
        "facebook" => "",
        "instagram" => "",
        "twitter" => ""
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = 1; //$_POST["user_id"];

    $userQuery= "SELECT * from `user` WHERE `user_id`='$user';";
    $profQuery= "SELECT * from `profile` WHERE `user_id`='$user';";
    $resultUser = mysqli_query($conn, $userQuery);
    $resultProf = mysqli_query($conn, $prefQuery);
    
    // should only return one row (make sure to delete upon user 
    if(mysqli_num_rows($resultUser) == 1){
        $userRow = mysqli_fetch_assoc($resultUser);
        $profRow = mysqli_fetch_assoc($resultProf);
        $output["firstname"] = $userRow["first_name"];
        $output["lastname"] = $userRow["last_name"];
        $output["email"] = $userRow["email"];
        $output["age"] = $userRow["age"];
        $output["school"] = $profRow["school"];
        $output["major"] = $profRow["major"];
        $output["year"] = $profRow["year"];
        $output["bio"] = $profRow["about_me"];
        $output["facebook"] = $profRow["facebook"];
        $output["instagram"] = $profRow["instagram"];
        $output["twitter"] = $profRow["twitter"];
        $output["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));


?>
