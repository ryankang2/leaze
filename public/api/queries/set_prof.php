<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = $_POST["user_id"];
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $fullname = $firstname . $lastname;
    $age = $_POST["age"];
    $school = $_POST["school"];
    $major = $_POST["major"];
    $year = $_POST["year"];
    $bio = $_POST["bio"];
    
    $updateUser = "UPDATE `users` SET `full_name`='$fullname', `first_name`='$firstname',`last_name`='$lastname', `age`=$age WHERE `user_id`=$user";
    $updateProf = "UPDATE `profile` SET `school`='$school', `major`='$major', `year`='$year', `about_me`='$bio' WHERE `user_id`=$user";

    $resultUser = mysqli_query($conn, $updateUser);
    $resultProf = mysqli_query($conn, $updateProf);

    if(!$resultUser){
        echo "result user wrong";
    }
    if(!$resultProf){
        echo "result prof wrong";
    }
    
    // should only return one row (make sure to delete upon user 
    if($resultUser && $resultProf){
        $output["success"] = true;
    }

    mysqli_close($conn);
    print_r(json_encode($output));
?>
