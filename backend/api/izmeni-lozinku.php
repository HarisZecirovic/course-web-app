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

    $staraLozinka = $data->staraLozinka;
    $novaLozinka1 = $data->novaLozinka1;



    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $id = $decoded->id;
        $ime = $decoded->ime;
        $prezime = $decoded->prezime;
        $username = $decoded->username;



        //$sql = $conn->query("UPDATE user SET ime = '$ime2', prezime = '$prezime2', username = '$username2' WHERE id = '$id'");

        $sql2 = $conn->query("SELECT * FROM user WHERE id = '$id'");
        if ($sql2->num_rows > 0) {
            $user = $sql2->fetch_assoc();
            if (hash('sha256', $staraLozinka) == $user['password']) {
                $novaLozinka1 = hash('sha256', $novaLozinka1);
                $sql = $conn->query("UPDATE user SET password = '$novaLozinka1' WHERE id = '$id'");
                

                

                if ($sql) {
                    http_response_code(200);
                    http_response_code(200);
                    exit(json_encode(array(
                        'message' => "Uspesno izmenjena lozinka"

                    )));
                } else {
                    http_response_code(500);
                    echo json_encode((array('message' => $novaLozinka1)));
                }
            }
            else{
                http_response_code(500);
                    echo json_encode((array('message' => 'Lozinke se ne podudaraju sa starom')));

            }
        }
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array('message' => 'Please authenticate'));
    }
} else {
    http_response_code(404);
}
