<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';



if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $user = [];

    $sql = $conn->query("SELECT * FROM user WHERE tip ='autor' OR tip = 'kupac'");

    for ($i = 0; $i < $sql->num_rows; $i++) {
        $row = $sql->fetch_array(MYSQLI_ASSOC);

        $user[$i] = [
            'id' => $row['id'],
            'ime' => $row['ime'],
            'prezime' => $row['prezime'],
            'tip' => $row['tip']

        ];
    }
    http_response_code(201);
    echo json_encode($user);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);

        $sql = $conn->query("DELETE FROM user where id = '$id'");
        
        if ($sql) {
            http_response_code(201);


            exit(json_encode(['response' => $id]));
        } else {
            exit(json_encode(['response' => 'niste uspeli']));
        }
    } else {
        http_response_code(500);
        echo json_encode((array('message' => 'Internal Server error')));
    }
}
