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
  var animationDuration = 1000; // 1s

  var calcBodyFront = document.getElementById("calc__body__front");
  var calcBodyResult = document.getElementById("calc__body__result");

  var calcForm = document.forms["calculator"];
  var buttonRecalc = document.getElementById("button__recalc");
  buttonRecalc.onclick = changeToFront;

  var classShow = "calc__show";
  var classHide = "calc__hide";
  var classShowDisplay = "calc__show__display";
  var classHideDisplay = "calc__hide__display";

  //назначаем нашу функцию на кнопку.
  //TODO надо проверить все поля на валидность, тоесть там где должно быть число, а там слово, нужно исправить.
  calcForm.onsubmit = calculate;

  function calculate(){
    console.log(calcForm.gender.value);
    console.log(isNaN(+calcForm.age.value));
    console.log(isNaN(+calcForm.height.value));
    console.log(isNaN(+calcForm.weight.value));
    console.log(calcForm.activity.value);
    console.log(calcForm.target.value);

    changeToResult();
    return false;
  }

  function changeToResult(){
    calcBodyFront.classList.remove(classShow);
    calcBodyFront.classList.add(classHide);


    setTimeout( function(){
      calcBodyFront.classList.remove(classShowDisplay);
      calcBodyFront.classList.add(classHideDisplay);

      calcBodyResult.classList.remove(classHideDisplay);
      calcBodyResult.classList.add(classShowDisplay);
      calcBodyResult.classList.remove(classHide);
      calcBodyResult.classList.add(classShow);
      console.log("calcBodyFront animationend");
    }, animationDuration);
  }

  function changeToFront(){
    calcBodyResult.classList.remove(classShow);
    calcBodyResult.classList.add(classHide);

    setTimeout( function(){
      calcBodyResult.classList.remove(classShowDisplay);
      calcBodyResult.classList.add(classHideDisplay);

      calcBodyFront.classList.remove(classHideDisplay);
      calcBodyFront.classList.add(classShowDisplay);
      calcBodyFront.classList.remove(classHide);
      calcBodyFront.classList.add(classShow);
      console.log("calcBodyFront animationend");
    }, animationDuration);
  }
}