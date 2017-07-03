<?php

const def_mail = 'vzbdonchik2@mail.ru';

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$title = "Сообщение от $name";
$headers = "From: $email";

$mail = mail(def_mail, $title, $message, $headers);
if ($mail) {
    http_response_code(200);
} else {
    // пишем в лог
    $log_message = "Name: $name\nEmail: $email\nMessage: $message";
    http_response_code(400);
}
