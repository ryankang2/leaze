<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

   function updatePassword($code, $email, $conn){
        $updateFourDigitQuery = "UPDATE `users` SET `code`=$code WHERE `email`='$email'";
        print($updateFourDigitQuery);
        $result = mysqli_query($conn, $updateFourDigitQuery);
        print($result);
        if(mysqli_num_rows($result) > 0){
            return "correctly updated password";
        }
        else{
            return "email not in db";
        }

   }




?>