<?php

    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Credentials: true'); 
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Kenzap-Token, Kenzap-Sid, Kenzap-Header');
    header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
    header('Content-Type: application/json');

    /*
    =========================
    Kenzap MyTicket Cloud API

    Project:   Kenzap MyTicket - Backend Gateway
    Author:    Kenzap
    Version:   1.0.0

    =========================
    */
    $block_redirects = true;

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    if (isset($_SERVER['HTTP_KENZAP_TOKEN'])) { $_COOKIE['kenzap_token'] = $_SERVER['HTTP_KENZAP_TOKEN']; }

    require_once '../signin/config.php';
    require_once '../signin/auth.php';

    // connect to myticket db
    try {

        // create PDO connection 
        // $db = new PDO("mysql:host=".getenv('MYSQL8A_SERVICE_SERVICE_HOST').";port=3306;dbname=myticket", "root", getenv('MYSQLA_PASS'));
        $db = new PDO("mysql:host=private-db-mysql-sgp1-64912-do-user-7272250-0.a.db.ondigitalocean.com;port=25060;dbname=myticket", "kenzap", 'rmf7o5sven6trepe');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch(PDOException $e) {
        
        // show error
        echo '<p class="bg-danger">'.$e->getMessage().'</p>';
        exit;
    }

    if ( KENZAP_USER_ID == '' ){

        $output['success'] = false;
        $output['code'] = 10;
        $output['reason'] = "not signed in";
        echo json_encode($output);
        die;
    }

    $output = [];
    $output['success'] = true;

    switch($_REQUEST['cmd']){
        
        case 'get_layouts':

            // die("error".KENZAP_USER_ID);
            // $q = $db->prepare('SELECT id, title, created, JSON_EXTRACT(extra, \'$.img\') as img, JSON_EXTRACT(extra, \'$.areas\') as areas FROM layouts WHERE kid = :kid ');
            $q = $db->prepare('SELECT id, title, created, JSON_EXTRACT(extra, \'$.img\') as img FROM layouts WHERE kid = :kid ');
            $q->execute(array(':kid' => KENZAP_USER_ID));
            while($row = $q->fetch(PDO::FETCH_ASSOC)){

                $temp = [];
                $temp['id'] = $row['id'];
                $temp['title'] = $row['title'];
                $temp['created'] = $row['created'];
                $temp['img'] = $row['img'];

                // consumes too much performance
                // $areas = json_decode($row['areas'], true);
                // $temp['count_seats'] = 0;
                // $temp['count_zones'] = 0;
                // if(isset($areas)) if(is_array($areas)) foreach($areas as $k => $v){ 

                //     if(isset($areas[$k]['seats'])){

                //         $temp['count_zones'] += 1;
                //         if(isset($areas[$k]['seats']['tws']))
                //             $temp['count_seats'] += intval($areas[$k]['seats']['tws']);
                    
                //     }
                // }
                // $temp['count_zones'] = sizeof($areas);
                
                $output['layouts'][] = $temp;
            }

            echo json_encode($output);

        break;
        case 'get_layout':

            // admin
            if(KENZAP_USER_ID != 5229){

                $q = $db->prepare('SELECT * FROM layouts WHERE id = :id AND kid = :kid');
                $q->execute(array(':id' => $_REQUEST['id'], ':kid' => KENZAP_USER_ID));
            }else{

                $q = $db->prepare('SELECT * FROM layouts WHERE id = :id');
                $q->execute(array(':id' => $_REQUEST['id']));
            }

            while($row = $q->fetch(PDO::FETCH_ASSOC)){

                $output['layout']['id'] = $row['id'];
                $output['layout']['title'] = $row['title'];
                $output['layout']['img'] = $row['img'];
                $output['layout']['extra'] = json_decode($row['extra']);

                // check if layout image exists
                if (file_exists("/var/www/kenzap/myticket/uploads/".$row['img'])) {
                    $output['img'] = $row['img'];
                } else {
                    $output['img'] = "-";
                }
            }

            // echo json_encode(json_encode($output));
            echo json_encode($output);

        break;
        case 'duplicate_layout':

            $q = $db->prepare('SELECT * FROM layouts WHERE id = :id AND kid = :kid');
            $q->execute(array(':id' => urldecode($_POST['id']), ':kid' => KENZAP_USER_ID));

            if($row = $q->fetch(PDO::FETCH_ASSOC)){


                $q = $db->prepare("INSERT INTO layouts (kid, title, img, extra) VALUES (:kid, :title, :img, :extra)");
                $output['status'] = $q->execute(array(':kid' => KENZAP_USER_ID, ':title' => $row['title'], ':extra' => $row['extra'], ':img' => $row['img']));
            }

            echo json_encode($output);

        break;
        case 'add_layout':

            $img = "";
            $extra = [];
            $extra_js = json_encode($extra);
            $q = $db->prepare("INSERT INTO layouts (kid, title, img, extra) VALUES (:kid, :title, :img, :extra)");
            $output['status'] = $q->execute(array(':kid' => KENZAP_USER_ID, ':title' => urldecode($_REQUEST['title']), ':extra' => $extra_js, ':img' => $img));

            if($output['status']==0){
                $output['success'] = false;
                $output['reason'] = "Please contact support";
            }

            echo json_encode($output);

        break;
        case 'save_layout':

            $extra = $_POST['extra'];
            $extra_js = $_POST['extra'];
            $q = $db->prepare("UPDATE layouts SET extra = :extra WHERE id = :id AND kid = :kid");
            $output['status'] = $q->execute(array(':kid' => KENZAP_USER_ID, ':id' => urldecode($_POST['id']), ':extra' => $extra_js));

            if($output['status']==0){
                $output['success'] = false;
                $output['reason'] = "Please contact support";
            }

            echo json_encode($output);

        break;
        case 'rename_layout':

            $title = $_POST['title'];
            $q = $db->prepare("UPDATE layouts SET title = :title WHERE id = :id AND kid = :kid");
            $output['status'] = $q->execute(array(':kid' => KENZAP_USER_ID, ':id' => urldecode($_POST['id']), ':title' => $title));

            if($output['status']==0){
                $output['success'] = false;
                $output['reason'] = "Please contact support";
            }

            echo json_encode($output);

        break;
        case 'remove_layout':

            $q = $db->prepare("DELETE FROM layouts WHERE id = :id AND kid = :kid");
            $output['status'] = $q->execute(array(':kid' => KENZAP_USER_ID, ':id' => urldecode($_POST['id'])));

            if($output['status']==0){
                $output['success'] = false;
                $output['reason'] = "Please contact support";
            }

            echo json_encode($output);

        break;
        case 'store_image':
            
            /* Getting file name */      
            $imageFileType = pathinfo("upload/".$_FILES['file']['name'],PATHINFO_EXTENSION);
            $filename = "layout_".$_REQUEST['id'].".".strtolower($imageFileType);

            /* Location */
            $location = "/var/www/kenzap/myticket/uploads/".$filename;
            $output['status'] = 1;

            /* Valid Extensions */
            $valid_extensions = array("jpg","jpeg","png");

            /* Check file extension */
            if( !in_array(strtolower($imageFileType),$valid_extensions) ) {

                $output['status'] = 0;
            }

            if($output['status'] == 0){

                $output['success'] = false;
                $output['reason'] = "Please contact support #1";

            }else{

               /* Upload file */
               if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){

                    $output['path'] = $filename;

               }else{

                    $output['success'] = false;
                    $output['reason'] = "Please contact support #2";
               }
            }

            $q = $db->prepare("UPDATE layouts SET img = :img WHERE id = :id AND kid = :kid");
            $output['status'] = $q->execute(array(':img' => $filename, ':id' => $_REQUEST['id'], ':kid' => KENZAP_USER_ID));

            echo json_encode($output);

        break;
    }
