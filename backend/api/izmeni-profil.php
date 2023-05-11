<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';

include_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$authHeader = getallheaders();
if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] == 'PUT') {
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];
    $data = json_decode(file_get_contents("php://input"));

    $ime2 = $data->ime;
    $prezime2 = $data->prezime;
    $username2 = $data->username;



    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $id = $decoded->id;
        $ime = $decoded->ime;
        $prezime = $decoded->prezime;
        $username = $decoded->username;



        $sql = $conn->query("UPDATE user SET ime = '$ime2', prezime = '$prezime2', username = '$username2' WHERE id = '$id'");

        $sql2 = $conn->query("SELECT * FROM user WHERE id = '$id'");
        if ($sql2->num_rows > 0) {
            $user = $sql2->fetch_assoc();

            $key = "YOUR_SECRET_KEY"; //ovo nam je ko neki kljuc za sifrovanje i desifrovanje valjda, i mozemo da napisemo sta god hocemo JWT key

            $payload = array(
                'id' => $user['id'],
                'username' => $user['username'],
                'ime' => $user['ime'],
                'prezime' => $user['prezime'],
                'password' => $user['password'],
                'tip' => $user['tip']
            );

            $token = JWT::encode($payload, $key, 'HS256');
        }


        if ($sql) {
            http_response_code(200);
            http_response_code(200);
            exit(json_encode(array(
                'token' => $token,
                'id' => $id,
                'username' => $username2,
                'ime' => $ime2,
                'prezime' => $prezime2,
                'password' => $user['password'],
                'tip' => $user['tip']

            )));
        } else {
            http_response_code(500);
            echo json_encode((array('message' => 'Internal Server error')));
        }
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array('message' => 'Please authenticate'));
    }
} else {
    http_response_code(404);
}
