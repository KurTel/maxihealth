// TODO calculator 
// принимать значения из таблицы и менять по id соответствующие поля.
// что менять:
// 1.суточная норма калорий -> 
//   средний расходи на кг мин* и макс*
//   по харриса бенедикта* 
//   по миффлина - санжерона*
// 2.ориентиры для (*) веса + замена иконки(бэкграунд)
//   диапазон калорий мин* и макс*
//   бенедикта*
//   миффлин*

"use strict"

var calculator = null;

onloadInit.push( function(){
  //создаём объект калькуkятора
  calculator = new Calculator();
});

function Calculator(){
  var calcBodyFront = document.getElementById("calc__body__front");
  var calcBodyResult = document.getElementById("calc__body__result");

  var calcForm = document.forms["calculator"];

  //назначаем нашу функцию на кнопку.
  //TODO надо проверить все поля на валидность, тоесть там где должно быть число, а там слово, нужно исправить.
  calcForm.onsubmit = calculate;

  function calculate(){
    console.log(calcForm.gender.value);
    console.log(calcForm.age.value);
    console.log(calcForm.height.value);
    console.log(calcForm.weight.value);
    console.log(calcForm.activity.value);
    console.log(calcForm.target.value);
    return false;
  }
  
}