<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    $output = [
        "success"=>false,
    ];
    $code = $_POST["code_to_confirm"];
    $email = $_POST["email_of_user"];
    $query = "SELECT * FROM `users` WHERE `code`=$code AND `email`='$email'";
    $result = mysqli_query($conn, $query);

    print_r(json_encode($output));

?>