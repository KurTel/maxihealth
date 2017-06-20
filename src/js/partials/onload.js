//список функций для запуска на window.onload
var onloadInit = []; // массив вызываемых функций
var onResize = [];

window.onload = function(){
  for ( var i in onloadInit ){
    if ( typeof( onloadInit[i] ) == 'function' ){
      onloadInit[i](); // вызываем подряд все функции из onloadInit
    }
  }
}

window.onresize = function(event) {
    for ( var i in onResize ){
    if ( typeof( onResize[i] ) == 'function' ){
      onResize[i](); // вызываем подряд все функции из onResize
    }
  }
};