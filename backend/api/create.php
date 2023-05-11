<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';

include_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

//get request headers

$authHeader = getallheaders();
if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];

    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));

        http_response_code(200);
        echo json_encode($decoded);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array('message' => 'Please authenticate'));
    }
}
if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] == 'GET') {
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];

    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $id = $decoded->id;

        $sql = $conn->query("SELECT * FROM user where id = '$id'");
        if ($sql->num_rows > 0) {

            $user = $sql->fetch_assoc();
        }

        http_response_code(200);
        echo json_encode([
            'id' => $user['id'],
            'ime' => $user['ime'],
            'prezime' => $user['prezime'],
            'username' => $user['username'],
            'password' => $user['password'],
            'tip' => $user['tip']

        ]);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array('message' => 'Please authenticate'));
    }
}
