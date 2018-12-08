<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $output = [
        "exists" => false;
    ];

    $email = $_POST["email"];

    $checkUserQuery = "SELECT * from `users` WHERE `email`='$email'";
    $result = mysqli_query($conn, $checkUserQuery);
    if(mysqli_num_rows($result)>0) {
        $output["exists"] = true;
    }

    mysqli_close($conn);

    print_r(json_encode($output));

?>
