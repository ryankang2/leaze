<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "success" => false,
    ];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];
    $password = hash("sha512", $_POST["password"]);
    $full_name = $first_name . ' ' . $last_name;

    $checkUserQuery = "SELECT * from `users` WHERE `email`='$email'";
    $result = mysqli_query($conn, $checkUserQuery);
    if(mysqli_num_rows($result)==0) {
        $insertNewUserQ = "INSERT INTO `users` (email,password,full_name,first_name,last_name) VALUES ('$email','$password','$full_name','$first_name','$last_name')";
        if (mysqli_query($conn, $insertNewUserQ)) {
            $output["success"] = true;
        }
        else {
            echo "insertion error";
        }
    }

    mysqli_close($conn);
    print_r(json_encode($output);

?>
