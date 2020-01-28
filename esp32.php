<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require __DIR__ . '/Twilio/autoload.php';



// Return if parameters not set or empty
if (!isset($_POST['timestamp']) or empty($_POST['timestamp'])) die("No TimeStamp");

if (!isset($_POST["img"]) or empty($_POST["img"])) die("No Image Data");


$timestamp = $_POST["timestamp"];
$img = $_POST["img"];
$ImgURL = str_replace("download-id", "download&id", $img);


use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
$sid    = "Twilio SSID";
$token  = "Twilio Token";
$twilio = new Client($sid, $token);

$message = $twilio->messages
                  ->create("whatsapp:+xxxxxxxx", // to number
                           array(
                               "mediaUrl" => array($ImgURL),
                               "from" => "whatsapp:+14155238886", //from number
                               "body" => $timestamp
                           )
                  );

print($message->sid);