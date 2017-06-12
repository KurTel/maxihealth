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

  var BMRcoef = {
    male : [88.362, 13.397, 4.799, 5.677],
    famale : [447.593, 9.247, 3.098, 4.330]
  }

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
  calcForm.onsubmit = calculate;

  function calculate(){
    console.log(calcForm.gender.value);
    console.log(calcForm.age.value);
    console.log(calcForm.height.value);
    console.log(calcForm.weight.value);
    console.log(calcForm.activity.value);
    console.log(calcForm.target.value);

    console.log(calculateBMR(calcForm.gender.value, calcForm.weight.value, calcForm.height.value, calcForm.age.value));

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
    }, animationDuration);
  }

/*
  Мужчины
    BMR = 88.362 + (13.397 x вес в кг) + (4.799 x рост в сантиметрах) - (5.677 x возраст в годах)
  Женщины
    BMR = 447.593 + (9.247 x вес в кг) + (3.098 x рост в сантиметрах) - (4.330 x возраст в годах)
*/

  function calculateBMR(gender, weight, height, age){
    return BMRcoef[gender][0] + (BMRcoef[gender][1] * weight) + (BMRcoef[gender][2] * height) + (BMRcoef[gender][3] * age);
  }

}