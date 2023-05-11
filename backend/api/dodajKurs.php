<?php

include_once 'config/dbh.php';
include_once 'config/cors.php';
include_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$authHeader = getallheaders();
if (isset($authHeader['Authorization']) && $_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"));



    $tipKursa = $data->tipKursa;
    $imeKursa = $data->imeKursa;

    $cenaKursa = $data->cenaKursa;
    $opisKursa = $data->opisKursa;

    $imageUrl = $data->imageUrl;

    $oblastiArray = $data->oblastiArray;
    $i;
    $lekcije;
    $token = $authHeader['Authorization'];
    $token = explode(" ", $token)[1];

    try {

        $key = "YOUR_SECRET_KEY";
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $id = $decoded->id;

        // http_response_code(200);
        // echo json_encode($decoded);
    } catch (Exception $e) {
        http_response_code(401);
        exit(json_encode(array('message' => 'Please authenticate')));
    }



    $sql = $conn->query("INSERT INTO kursevi (id_user,tipKursa,imeKursa,opisKursa,imageUrl, cena) values ('$id','$tipKursa','$imeKursa','$opisKursa', '$imageUrl', '$cenaKursa')");
    $last_id = $conn->insert_id;
    for ($i = 0; $i < count($oblastiArray); $i++) {
        $oblast = $oblastiArray[$i]->oblast;

        $sql = $conn->query("INSERT INTO oblastiarray (idKursa,oblasti) values ('$last_id','$oblast')");

        $last = $conn->insert_id;
        for ($j = 0; $j < count($oblastiArray[$i]->lekcije); $j++) {
            $nazivLekcije = $oblastiArray[$i]->lekcije[$j]->nazivLekcije;
            $urlLekcije = $oblastiArray[$i]->lekcije[$j]->urlLekcije;
            $sql = $conn->query("INSERT INTO lekcije (idOblasti,nazivLekcije, urlLekcije) values ('$last','$nazivLekcije', '$urlLekcije')");
        }
    }



    $index = 0;





    // $sql = $conn->query("INSERT INTO oblastiArray (idKursa,oblasti) values ('$last_id','$oblast1')");
    // $sql = $conn->query("INSERT INTO oblastiArray (idKursa,oblasti) values ('$last_id','$oblast2')");






    if ($sql) {
        http_response_code(201);
        echo json_encode((array('message' => $oblastiArray[0]->lekcije[0]->nazivLekcije)));
    } else {
        http_response_code(500);
        echo json_encode((array('message' => 'Internal Server error')));
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $kursevi = [];
    $idKursa;
    $idOblasti;

    //$sql = $conn->query("SELECT * FROM kursevi JOIN oblastiarray ON kursevi.idKursa = oblastiarray.idKursa JOIN lekcije ON oblastiarray.idOblasti = lekcije.idOblasti");
    $sql2 = $conn->query("SELECT * FROM kursevi");


    for ($i = 0; $i < $sql2->num_rows; $i++) {
        $row = $sql2->fetch_assoc();
        $idKursa = $row['idKursa'];
        $id_user = $row['id_user'];
        $tipKursa = $row['tipKursa'];
        $imeKursa = $row['imeKursa'];
        $opisKursa = $row['opisKursa'];
        $imageUrl = $row['imageUrl'];
        $cena = $row['cena'];

        $kursevi[$i] = array(
            'idKursa' => $idKursa,
            'id_user' => $id_user,
            'tipKursa' => $tipKursa,
            'imeKursa' => $imeKursa,
            'opisKursa' => $opisKursa,
            'cenaKursa' => $cena,
            'imageUrl' => $imageUrl,

            'oblastiArray' => array(),

        );


        // array_push($kursevi[0]['oblastiArray'],'oblast');









        // $kursevi[$i] = [
        //     'idKursa' => $idKursa,
        //     'id_user' => $id_user,
        //     'tip_kursa' => $tipKursa,
        //     'imeKursa' => $imeKursa,
        //     'opisKursa' => $opisKursa,
        //     'imageUrl' => $imageUrl,
        //     'cena' => $cena,
        //     'oblastiArray' => [
        //         'oblast' => '',
        //         'lekcije' => [
        //             'nazivLekcije' => '',
        //             'urlLekcije' => ''
        //         ]

        //     ]
        // ];
        $sql3 = $conn->query("SELECT * FROM oblastiarray WHERE idKursa = '$idKursa'");




        for ($j = 0; $j < $sql3->num_rows; $j++) {
            $row2 = $sql3->fetch_assoc();
            $oblast = $row2['oblasti'];
            $idOblasti = $row2['idOblasti'];
            //$kursevi[$i]->oblastiArray[$j]->oblast = $oblast;
            //$kursevi[$i]['oblastiArray'][$j]['oblast'] = $oblast;
            $oblast = array(
                'oblast' => $row2['oblasti'],
                'lekcije' => array()
            );

            $sql4 = $conn->query("SELECT * FROM lekcije WHERE idOblasti = '$idOblasti'");

            for ($k = 0; $k < $sql4->num_rows; $k++) {

                $row3 = $sql4->fetch_assoc();
                $nazivLekcije = $row3['nazivLekcije'];
                $urlLekcije = $row3['urlLekcije'];

                // $kursevi[$i]['oblastiArray'][$j]['lekcije'][$k]['nazivLekcije'] = $nazivLekcije;
                // $kursevi[$i]['oblastiArray'][$j]['lekcije'][$k]['urlLekcije'] = $urlLekcije;

                $lekcija = array(
                    'nazivLekcije' => $nazivLekcije,
                    'urlLekcije' => $urlLekcije
                );

                array_push($oblast['lekcije'], $lekcija);
            }
            array_push($kursevi[$i]['oblastiArray'], $oblast);
        }
    }


    // $kursevi[0]['oblastiArray']['oblast'] = 0;

    http_response_code(201);
    echo json_encode(['response' => $kursevi]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));


    $idKursa = $data->idKursa;
    $tipKursa = $data->tipKursa;
    $imeKursa = $data->imeKursa;

    $cenaKursa = $data->cenaKursa;
    $opisKursa = $data->opisKursa;

    $imageUrl = $data->imageUrl;

    $oblastiArray = $data->oblastiArray;
    $indexOblasti;
    $indexLekcije;


    $sql = $conn->query("UPDATE kursevi SET tipKursa = '$tipKursa', imeKursa = '$imeKursa', opisKursa = '$opisKursa', imageUrl = '$imageUrl', cena = '$cenaKursa' WHERE idKursa = '$idKursa'");

    $sql2 = $conn->query("SELECT * FROM oblastiarray where idKursa = '$idKursa'");

    for ($i = 0; $i < $sql2->num_rows; $i++) {
        $indexOblasti = $i;
        $row = $sql2->fetch_array(MYSQLI_ASSOC);
        $oblast = $oblastiArray[$i]->oblast;
        $idOblasti = $row['idOblasti'];
        if ($oblast == '') {
            $sql = $conn->query("DELETE FROM oblastiarray where idOblasti = '$idOblasti'");
        }
        $sql = $conn->query("UPDATE oblastiarray SET oblasti = '$oblast' WHERE idOblasti = '$idOblasti'");
        $sql3 = $conn->query("SELECT * FROM lekcije where idOblasti = '$idOblasti'");

        if (count($oblastiArray[$i]->lekcije) <= 0) {
            http_response_code(400);
            exit(json_encode((array('message' => 'Oblast ne sme biti bez lekcije'))));
            //return;
        }

        for ($j = 0; $j < $sql3->num_rows; $j++) {
            $indexLekcije = $j;
            $row2 = $sql3->fetch_array(MYSQLI_ASSOC);
            $idLekcije = $row2['idLekcije'];
            $nazivLekcije = $oblastiArray[$i]->lekcije[$j]->nazivLekcije;
            $urlLekcije = $oblastiArray[$i]->lekcije[$j]->urlLekcije;
            if (!$oblastiArray[$i]->lekcije[$j]) {
                $sql4 = $conn->query("DELETE FROM lekcije WHERE idLekcije = '$idLekcije'");
            }

            $sql4 = $conn->query("UPDATE lekcije SET nazivLekcije = '$nazivLekcije', urlLekcije = '$urlLekcije' WHERE idLekcije = '$idLekcije'");
        }
        if ($sql3->num_rows < count($oblastiArray[$i]->lekcije)) {
            $indexLekcije = $indexLekcije + 1;

            for ($k = $indexLekcije; $k < count($oblastiArray[$i]->lekcije); $k++) {
                $nazivLekcije = $oblastiArray[$i]->lekcije[$k]->nazivLekcije;
                $urlLekcije = $oblastiArray[$i]->lekcije[$k]->urlLekcije;
                $sql5 = $conn->query("INSERT INTO lekcije (idOblasti,nazivLekcije,urlLekcije) values ('$idOblasti', '$nazivLekcije', '$urlLekcije')");
            }
        }
    }
    $indexOblasti = $indexOblasti + 1;

    $sql = $conn->query("SELECT * from oblastiArray where idKursa = '$idKursa'");
    if ($sql->num_rows < count($oblastiArray)) {
        for ($i = $indexOblasti; $i < count($oblastiArray); $i++) {
            $oblast = $oblastiArray[$i]->oblast;

            $sql = $conn->query("INSERT INTO oblastiarray (idKursa,oblasti) values ('$idKursa','$oblast')");
            $last = $conn->insert_id;
            for ($j = 0; $j < count($oblastiArray[$i]->lekcije); $j++) {
                $nazivLekcije = $oblastiArray[$i]->lekcije[$j]->nazivLekcije;
                $urlLekcije = $oblastiArray[$i]->lekcije[$j]->urlLekcije;
                $sql = $conn->query("INSERT INTO lekcije (idOblasti,nazivLekcije, urlLekcije) values ('$last','$nazivLekcije', '$urlLekcije')");
            }
        }
    }

    if ($sql) {
        http_response_code(201);


        echo json_encode(['response' => $sql3->num_rows . " " . count($oblastiArray[0]->lekcije)]);
    } else {
        http_response_code(500);
        echo json_encode((array('message' => 'Internal Server error')));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']);

        $sql = $conn->query("DELETE FROM kursevi where idKursa = '$id'");
        $sql2 = $conn->query("DELETE FROM kupljenikursevi where idKursa = '$id'");
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
