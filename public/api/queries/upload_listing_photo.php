<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../mysql_connect.php");
    $targetDir = "uploads/";
    $allowTypes = array("jpg", "png", "jpeg", "gif");

    $stateMsg = $errorMsg = $insertValueSQL = $errorUpload = $errorUploadType = "";
    if(!empty(array_filter($_FILES["files"]["name"]))){
        foreach($_FILES["files"]["name"] as $key=>$val){
            $fileName = basename($_FILES["files"]["name"][$key]);
            $targetFilePath = $targetDir . $fileName;
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
            if(in_array($fileType, $allowTypes)){
                // Upload file to server
                if(move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)){
                    // Image db insert sql
                    $insertValueSQL .= "('".$fileName."', NOW()),";
                }else{
                    $errorUpload .= $_FILES['files']['name'][$key].', ';
                }
            }else{
                $errorUploadType .= $_FILES['files']['name'][$key].', ';
            } 
        }
        if(!empty($insertValuesSQL)){
            $insertValuesSQL = trim($insertValuesSQL,',');
            // Insert image file name into database
            $insert = $conn->query("INSERT INTO photos (file_name) VALUES $insertValuesSQL");
            if($insert){
                $errorUpload = !empty($errorUpload)?'Upload Error: '.$errorUpload:'';
                $errorUploadType = !empty($errorUploadType)?'File Type Error: '.$errorUploadType:'';
                $errorMsg = !empty($errorUpload)?'<br/>'.$errorUpload.'<br/>'.$errorUploadType:'<br/>'.$errorUploadType;
                $statusMsg = "Files are uploaded successfully.".$errorMsg;
            }
            else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
        }
    }
    else{
        $statusMsg = 'Please select a file to upload.';
    }
    
    // Display status message
    // echo $statusMsg;
    $query = $conn->query("SELECT * FROM photos ORDER BY photos_id DESC");

    if($query->num_rows > 0){
        while($row = $query->fetch_assoc()){
            $imageURL = 'uploads/'.$row["file_name"];
    ?>
        <img src="<?php echo $imageURL; ?>" alt="" />
    <?php }
    }else{ ?>
        <p>No image(s) found...</p>
    <?php } ?>


?>  