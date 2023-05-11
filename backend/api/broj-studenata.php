<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';



if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $idKursa = $conn->real_escape_string($_GET['id']);

    $sql = $conn->query("SELECT * FROM kupljenikursevi WHERE idKursa = '$idKursa'");

   
    http_response_code(201);
    echo json_encode($sql->num_rows);
}

