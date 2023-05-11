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
    $data = json_decode(file_get_contents("php://input"));




    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $id_user = $decoded->id;

        for ($i = 0; $i < count($data); $i++) {
            $idKursa = $data[$i]->idKursa;
            $sql = $conn->query("INSERT INTO kupljenikursevi (idKursa, id_user) VALUES ('$idKursa', '$id_user')");
        }

        http_response_code(200);
        echo json_encode($data[0]->idKursa);
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
        $id_user = $decoded->id;
        $sql = $conn->query("SELECT * from kupljenikursevi WHERE id_user = '$id_user'");
        if ($sql->num_rows > 0) {
            for ($i = 0; $i < $sql->num_rows; $i++) {
                $row = $sql->fetch_array(MYSQLI_ASSOC);
                $kursevi[$i] = [
                    'idKursa' => $row['idKursa']
                ];
            }
        }



        http_response_code(200);
        echo json_encode($kursevi);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array('message' => 'Please authenticate'));
    }
 } 

