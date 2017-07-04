function sendMail() {
    console.log('click');
    var name = document.getElementById('send-message-name');
    var email = document.getElementById('send-message-email');
    var message = document.getElementById('send-message-message');

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'php/send_mail.php');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.send('name=' + name.value + '&email=' + email.value + '&message=' + message.value);
    xmlHttpRequest.onreadystatechange = function () {
        console.log(xmlHttpRequest.readyState);
        console.log(xmlHttpRequest.status);
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            console.log('Все ок. Сообщение отправлено.');
            alert('Все ок. Сообщение отправлено.');
        } else {
            console.log('Что-то пошло не так. Сообщение не отправлено.');
            //alert('Что-то пошло не так. Сообщение не отправлено.');
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('ready');
    var sendMessageButton = document.getElementById('send-message-button');
    sendMessageButton.addEventListener('click', sendMail);
});