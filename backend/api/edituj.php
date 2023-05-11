<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $file = $_FILES['file']['name'];

    $ext = pathinfo($file, PATHINFO_EXTENSION);

    $targetPath = 'slike/';

    $actual_fname = $_FILES['file']['name'];
    $actual_fname = preg_replace('/[^A-Za-z0-9\-]/', '', $actual_fname);

    $modified_fname = uniqid(rand(10, 200)) . '-' . rand(1000, 1000000) . '-' . $actual_fname;

    $target_path = $targetPath . basename($modified_fname) . "." . $ext;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
        $result["status"] = 1;
        $result["message"] = "Uploaded file successfully.";
    }

    echo json_encode($result);
}
