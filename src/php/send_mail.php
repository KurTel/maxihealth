<?php

const def_mail = 'vzbdonchik2@mail.ru';

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$title = "Сообщение от $name";
$headers = "From: $email";

console_log("BEGIN");

console_log(def_mail);
console_log($name);
console_log($email);
console_log($message);
console_log($headers);

$mail = mail(def_mail, $title, $message, $headers);
if ($mail) {
    console_log("Yeah!");
    http_response_code(200);
} else {
    // пишем в лог
    $log_message = "Name: $name\nEmail: $email\nMessage: $message";
    console_log("Oh no, error: $log_message");
    http_response_code(400);
}

console_log("END");

function console_log($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}
