<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';

include_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;


    $sql = $conn->query("SELECT * FROM user WHERE username = '$username'");

    if($sql->num_rows > 0){
        $user = $sql->fetch_assoc();
        $hashed = hash('sha256', $password);
        

        

         if($hashed == $user['password']){

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
            http_response_code(200);
            exit(json_encode(array(
                'token' => $token,
                'id' => $user['id'],
                'username' => $user['username'],
                'ime' => $user['ime'],
                'prezime' => $user['prezime'],
                'password' => $user['password'],
                'tip' => $user['tip']

            )));


        }else{
            http_response_code(400);
            echo json_encode(array('message'=> 'Login Failed!', 'hashovana' => $hashed, 'user' => $user['password']));

        } // ovo nesto ne radi nece da hashuje dobro ovo ne znam sta je


    }else{
        http_response_code(400);
            echo json_encode(array('message'=> 'Nisi Registrovan'));

    }

}



?>