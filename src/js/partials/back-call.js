function backCall() {
    console.log('click');
    var name = document.getElementById('back-call-name');
    var phone = document.getElementById('back-call-phone');

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'php/back_call.php');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlHttpRequest.send('name=' + name + '&phone=' + phone);
    if (xmlHttpRequest.status === 200) {
        console.log('Все ок. Сообщение отправлено.');
        alert('Все ок. Сообщение отправлено.');
    } else {
        console.log('Что-то пошло не так. Сообщение не отправлено.');
        alert('Что-то пошло не так. Сообщение не отправлено.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('ready');
    var sendMessageButton = document.getElementById('back-call-button');
    sendMessageButton.addEventListener('click', backCall);
});
