//список функций для запуска на window.onload
var onloadInit = []; // массив вызываемых функций

window.onload = function(){
  for ( var i in onloadInit ){
    if ( typeof( onloadInit[i] ) == 'function' ){
      onloadInit[i](); // вызываем подряд все функции из _init
    }
  }
}