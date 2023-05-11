<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"));

    $ime = $data->ime;
    $prezime = $data->prezime;
    $username = $data->username;
    $password = $data->password;
    $tip = $data->tip;

    $hashed = hash('sha256', $password);
    $sql2 = $conn->query("SELECT * FROM user WHERE username = '$username'");
    if ($sql2->num_rows > 0) {
        http_response_code(400);
        exit(json_encode((array('message' => 'Username je vec zauzet'))));
    } else {
        $sql = $conn->query("INSERT INTO user (ime,prezime,username,password,tip) values ('$ime','$prezime','$username','$hashed', '$tip')");

        if ($sql) {
            http_response_code(201);
            echo json_encode((array('message' => 'User created')));
        } else {
            http_response_code(500);
            echo json_encode((array('message' => 'Internal Server error')));
        }
    }
} else {
    http_response_code(404);
}
