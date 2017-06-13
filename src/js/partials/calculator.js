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

    var result = calculateAll(calcForm.gender.value, 
                              calcForm.weight.value, 
                              calcForm.height.value, 
                              calcForm.age.value, 
                              calcForm.activity.value,
                              calcForm.target.value);

    console.log(result);

    setResult(result, calcForm.target.value);
    changeToResult();
    return false;
  }

  function setResult(result, target){
    var kkPerDayResultLowerBound = document.getElementById("kkPerDayResult-lowerBound");
    var kkPerDayResultUpperBound = document.getElementById("kkPerDayResult-upperBound");
    var harrisBenedictDayResult = document.getElementById("harrisBenedictDayResult");
    var mifflinStJeorDayResult = document.getElementById("mifflinStJeorDayResult");

    var kkWayMarkResultLowerBound = document.getElementById("kkWayMarkResult-lowerBound");
    var kkWayMarkResultUpperBound = document.getElementById("kkWayMarkResult-upperBound");
    var harrisBenedictWayMarkResult = document.getElementById("harrisBenedictWayMarkResult");
    var mifflinStJeorWayMarkResult = document.getElementById("mifflinStJeorWayMarkResult");

    kkPerDayResultLowerBound.innerHTML = result.day.kkPerDayResult.lowerBound;
    kkPerDayResultUpperBound.innerHTML = result.day.kkPerDayResult.upperBound;
    harrisBenedictDayResult.innerHTML = result.day.harrisBenedictDayResult;
    mifflinStJeorDayResult.innerHTML = result.day.mifflinStJeorDayResult;

    kkWayMarkResultLowerBound.innerHTML = result.wayMarks.kkWayMarkResult.lowerBound;
    kkWayMarkResultUpperBound.innerHTML = result.wayMarks.kkWayMarkResult.upperBound;
    harrisBenedictWayMarkResult.innerHTML = result.wayMarks.harrisBenedictWayMarkResult;
    mifflinStJeorWayMarkResult.innerHTML = result.wayMarks.mifflinStJeorWayMarkResult;

    var landmarksHeader = document.getElementById("landmarks-header");
    var landmarksBackgroundClasses = {
      lose : "landmarks__background__lose",
      gain : "landmarks__background__gain",
      main : "landmarks__background__main"
    }

    landmarksHeader.classList.remove(landmarksBackgroundClasses.lose);
    landmarksHeader.classList.remove(landmarksBackgroundClasses.gain);
    landmarksHeader.classList.remove(landmarksBackgroundClasses.main);

    landmarksHeader.classList.add(landmarksBackgroundClasses[target]);

    var targetText = document.getElementById("target-text");
    var targetTextByTerget = {
      lose : "СНИЖЕНИЯ ВЕСА",
      gain : "НАБОРА МАССЫ",
      main : "ПОДЕРЖАНИЯ ВЕСА"
    }

    targetText.innerHTML = targetTextByTerget[target];
  }

  function changeToResult(){
    calcBodyFront.classList.remove(classShow);
    calcBodyFront.classList.add(classHide);

    calcForm.onsubmit = function (){
      return false;   //сбросили функцию чтобы не лагало конда много рз жмёшь
    };

    setTimeout( function(){
      calcBodyFront.classList.remove(classShowDisplay);
      calcBodyFront.classList.add(classHideDisplay);

      calcBodyResult.classList.remove(classHideDisplay);
      calcBodyResult.classList.add(classShowDisplay);
      calcBodyResult.classList.remove(classHide);
      calcBodyResult.classList.add(classShow);
      calcForm.onsubmit = calculate;
    }, animationDuration);
  }

  function changeToFront(){
    calcBodyResult.classList.remove(classShow);
    calcBodyResult.classList.add(classHide);

    buttonRecalc.onclick = function (){}; //сбросили функцию чтобы не лагало конда много рз жмёшь

    setTimeout( function(){
      calcBodyResult.classList.remove(classShowDisplay);
      calcBodyResult.classList.add(classHideDisplay);

      calcBodyFront.classList.remove(classHideDisplay);
      calcBodyFront.classList.add(classShowDisplay);
      calcBodyFront.classList.remove(classHide);
      calcBodyFront.classList.add(classShow);
      buttonRecalc.onclick = changeToFront;

    }, animationDuration);
  }

/*
  Мужчины
    BMR = 88.362 + (13.397 x вес в кг) + (4.799 x рост в сантиметрах) - (5.677 x возраст в годах)
  Женщины
    BMR = 447.593 + (9.247 x вес в кг) + (3.098 x рост в сантиметрах) - (4.330 x возраст в годах)
*/

  // function calculateBMR(gender, weight, height, age){
  //   return BMRcoef[gender][0] + (BMRcoef[gender][1] * weight) + (BMRcoef[gender][2] * height) + (BMRcoef[gender][3] * age);
  // }

  function calculateAll(gender, weight, height, age, activity, target) {
        var harrisBenedictDayResult = 0;
        var mifflinStJeorDayResult = 0;
        var kkPerDayResult = {};

        //кк в день на килограмм веса в зависимости от активности
        var KKperDay = {
          low  : [26,30],
          norm : [31,37],
          high : [38,40]
        }

        //коэффициент активности, используется в обоих формулах
        var AMR = {
          low  : 1.2,
          norm : 1.375,
          high : 1.4625
        }

        kkPerDayResult.lowerBound = KKperDay[activity][0] * weight;
        kkPerDayResult.upperBound = KKperDay[activity][1] * weight;

        if (gender === 'male') {
            // Результаты по Харрису-Бенедикту
            harrisBenedictDayResult = (13.7 * weight + 5 * height - 6.76 * age + 66) * AMR[activity];
            // Результаты по Миффлину-Ст.Жеору
            mifflinStJeorDayResult = (9.99 * weight + 6.25 * height + 4.92 * age + 5) * AMR[activity]

        } else {
            // Результаты по Харрису-Бенедикту
            harrisBenedictDayResult = (9.6 * weight + 1.8 * height - 4.7 * age + 655) * AMR[activity];
            // Результаты по Миффлину-Ст.Жеору
            mifflinStJeorDayResult = (9.99 * weight + 6.25 * height + 4.92 * age - 161) * AMR[activity];
        }

        // В зависимости от lose,gaint,main
        // для набора + 10-20% к получившемуся результату (хоть к lower, хоть к upper bound)
        // для снижения - 10-20% к получившемуся результату (хоть к lower, хоть к upper bound)

        var harrisBenedictWayMarkResult;
        var mifflinStJeorWayMarkResult;
        var kkWayMarkResult = {};

        if (target === 'lose') {
            harrisBenedictWayMarkResult = harrisBenedictDayResult * 0.8;
            mifflinStJeorWayMarkResult = mifflinStJeorDayResult * 0.8;
            kkWayMarkResult.lowerBound = kkPerDayResult.lowerBound * 0.8;
            kkWayMarkResult.upperBound = kkPerDayResult.upperBound * 0.8;
            // console.log("target_loss_weight");
        } else if (target === 'gain') {
            harrisBenedictWayMarkResult = harrisBenedictDayResult * 1.2;
            mifflinStJeorWayMarkResult = mifflinStJeorDayResult * 1.2;
            kkWayMarkResult.lowerBound = kkPerDayResult.lowerBound * 1.2;
            kkWayMarkResult.upperBound = kkPerDayResult.upperBound * 1.2;
            // console.log("target_gain_weight");
        } else {
            harrisBenedictWayMarkResult = harrisBenedictDayResult;
            mifflinStJeorWayMarkResult = mifflinStJeorDayResult;
            kkWayMarkResult.lowerBound = kkPerDayResult.lowerBound;
            kkWayMarkResult.upperBound = kkPerDayResult.upperBound;
        }

        kkPerDayResult.lowerBound = Math.round(kkPerDayResult.lowerBound);
        kkPerDayResult.upperBound = Math.round(kkPerDayResult.upperBound);

        kkWayMarkResult.lowerBound = Math.round(kkWayMarkResult.lowerBound);
        kkWayMarkResult.upperBound = Math.round(kkWayMarkResult.upperBound);

        //почему так, ниразу не возвращал объект
        var result = {
          day : {
            kkPerDayResult : kkPerDayResult,
            harrisBenedictDayResult : Math.round(harrisBenedictDayResult),
            mifflinStJeorDayResult : Math.round(mifflinStJeorDayResult)
          },
          wayMarks : {
            kkWayMarkResult : kkWayMarkResult,
            harrisBenedictWayMarkResult : Math.round(harrisBenedictWayMarkResult),
            mifflinStJeorWayMarkResult : Math.round(mifflinStJeorWayMarkResult)
          }
        }

        return result;
    }

}