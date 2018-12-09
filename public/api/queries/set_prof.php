<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];

    //assume we can pass in the user id, and we output the information in output
    $user = $_POST["user_id"];
    $firstname = htmlentities(addslashes($_POST["firstname"]));
    $lastname = htmlentities(addslashes($_POST["lastname"]));
    $fullname = $firstname . $lastname;
    $age = $_POST["age"];
    $school = htmlentities(addslashes($_POST["school"]));
    $major = htmlentities(addslashes($_POST["major"]));
    $year = htmlentities(addslashes($_POST["year"]));
    $bio = htmlentities(addslashes($_POST["bio"]));
    $facebook = htmlentities(addslashes($_POST["facebook"]));
    $instagram = htmlentities(addslashes($_POST["instagram"]));
    $twitter = htmlentities(addslashes($_POST["twitter"]));

    $fullname = $firstname . " " . $lastname;
    
    $updateUser = "UPDATE `users` SET `full_name`='$fullname', `first_name`='$firstname',`last_name`='$lastname', `age`=$age WHERE `user_id`=$user";
    $updateProf = "UPDATE `profile` SET `school`='$school', `major`='$major', `year`='$year', `about_me`='$bio', `facebook`='$facebook', `instagram`='$instagram', `twitter`='$twitter' WHERE `user_id`=$user";

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
