<?php 
$connect = mysql_connect(“172.31.4.144:3306”, “fyshTail”, “goldendong”);
if (!$connect) {
  die('Connection Failed: ' . mysql_error());
}
mysql_select_db(“leaze”, $connect);

$password = hash('sha512', $_POST[password]);
$user_info = "INSERT INTO users (email,password,full_name,first_name,last_name,age) VALUES ('$_POST[name]','$password','$_POST[email]','firstname','lastname',69";
if (!mysql_query($user_info, $connect)) {
  die('Error: ' . mysql_error());
}

mysql_close($connect);
?>
