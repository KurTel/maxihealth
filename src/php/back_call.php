<?php

// todo: надо вынести в отдельную ф-цию, тут только title отличается.

const def_mail = 'vzbdonchik2@mail.ru';

$name = $_POST["name"];
$message = $_POST["message"];
$email = def_mail;

$title = "Обратный звонок для $name";
$headers = "From: $email";

$mail = mail(def_mail, $title, $message, $headers);
if ($mail) {
    http_response_code(200);
} else {
    // пишем в лог
    $log_message = "Name: $name\nEmail: $email\nMessage: $message";
    http_response_code(400);
}
