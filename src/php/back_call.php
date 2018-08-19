<?php

// todo: надо вынести в отдельную ф-цию, тут только title отличается.

const def_mail = 'vzbdonchik2@mail.ru';

$name = $_POST["name"];
$phone = $_POST["phone"];
$email = def_mail;

$title = "Обратный звонок для $name";
$headers = "From: $email";

$mail = mail(def_mail, $title, $phone, $headers);
if ($mail) {
    http_response_code(200);
} else {
    // пишем в лог
    $log_message = "Name: $name\nEmail: $email\nMessage: $phone";
    http_response_code(400);
}
