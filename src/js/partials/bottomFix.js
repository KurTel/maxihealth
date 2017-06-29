"use strict"

window.addEventListener('DOMContentLoaded', function(){

  var timeout = 100; //10 sec
  

  setTimeout( function(){
    var bottom__fix = document.getElementById("bottom__fix__action");

    bottom__fix.classList.remove("bottom__fix__hide");

  }, timeout);
})

function closeBottomFixAction(){
  var timeout2 = 5000; //5 sec

  document.getElementById('bottom__fix__action').classList.add('bottom__fix__hide');

  setTimeout( function(){
    var bottom__fix = document.getElementById("bottom__fix__30days");

    bottom__fix.classList.remove("bottom__fix__hide");

  }, timeout2);
}