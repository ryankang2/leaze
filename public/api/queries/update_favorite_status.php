<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");

    // expecting input of user id,listing id, and whether to favorite or unfavorite
    $user_id = $_POST["user_id"];
    $listing_id = $_POST["listing_id"];
    $unfavorited = $_POST["unfavorited"];

    $getFavQuery = "SELECT `favorites` FROM `profile` WHERE `user_id`=$user_id";
    $getFavResults = mysqli_query($conn, $getFavQuery);

    if(mysqli_num_rows($getFavResults) > 0){
        $row = mysqli_fetch_assoc($getFavResults);
        $favs = $row["favorites"];
        $newVal = "";
        if ($unfavorited == "false") {
            $newVal = $favs . $listing_id . ",";
        }
        else {
            $split = explode(',', $favs);
            for($i = 0; $i < count($split)-1; $i++) {
                if ($split[$i] != $listing_id) {
                    $newVal .= $split[$i] . ",";
                }
            }
        }
    }

    $updateQuery = "UPDATE `profile` SET `favorites`= '$newVal' WHERE `user_id`=$user_id";
    mysqli_query($conn, $updateQuery);

    mysqli_close($conn);
?>