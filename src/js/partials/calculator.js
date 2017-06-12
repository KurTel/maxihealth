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

"use strict";

var calculator = null;

onloadInit.push(function () {
    //создаём объект калькулятора
    calculator = new Calculator();
});

function Calculator() {

    var BMRcoef = {
        male: [88.362, 13.397, 4.799, 5.677],
        female: [447.593, 9.247, 3.098, 4.330]
    };

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

    function calculate() {
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

    function changeToResult() {
        calcBodyFront.classList.remove(classShow);
        calcBodyFront.classList.add(classHide);


        setTimeout(function () {
            calcBodyFront.classList.remove(classShowDisplay);
            calcBodyFront.classList.add(classHideDisplay);

            calcBodyResult.classList.remove(classHideDisplay);
            calcBodyResult.classList.add(classShowDisplay);
            calcBodyResult.classList.remove(classHide);
            calcBodyResult.classList.add(classShow);
        }, animationDuration);
    }

    function changeToFront() {
        calcBodyResult.classList.remove(classShow);
        calcBodyResult.classList.add(classHide);

        setTimeout(function () {
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

    function calculateBMR(gender, weight, height, age) {
        if (gender === 'male') {
            // Результаты по Харрису-Бенедикту
            var harrisBenedictMaleResult = 13.7 * weight + 5 * height - 6.76 * age + 66;
            // Результаты по Миффлину-Ст.Жеору
            var mifflinStJeorMaleResult = 9.99 * weight + 6.25 * height + 4.92 * age + 5;

        } else {
            // Результаты по Харрису-Бенедикту
            var harrisBenedictFemaleResult = 9.6 * weight + 1.8 * height - 4.7 * age + 655;
            // Результаты по Миффлину-Ст.Жеору
            var mifflinStJeorFemaleResult = 9.99 * weight + 6.25 * height + 4.92 * age - 161;

        }

        const activityMap = {};
        activityMap['low'] = {lowerBound: 1.3, upperBound: 1.4};
        activityMap['mid'] = {lowerBound: 1.5, upperBound: 1.6};
        activityMap['high'] = {lowerBound: 1.7, upperBound: 1.8};
        // лучше тогда, чтобы сверху приходил этот элемент или его value в кач-ве аргумента ф-ции, как и с другими 4мя параметрами
        var activityInput = document.getElementById('calc__activity');
        var key = activityInput.options[activityInput.selectedIndex].value;
        // todo: либо так (в новом js можно использовать нормальный Map), либо добавить в каждый option select'а html тег, в котором передавать значение
        var activityValue = activityMap[key];
        var bodyFatPercentage = 30; // спросил у чуваков как это считать... пока не ответили
        // Результаты по Кэтчу-МакАрдлу
        // не делим результат на мужчин и женщин
        var katchMcArdleResult = 21.6 * (height * (100 - bodyFatPercentage)) / 100 + 370;
        var katchMcArdleResultLowerBound = katchMcArdleResult * activityValue.lowerBound;
        var katchMcArdleResultUpperBound = katchMcArdleResult * activityValue.upperBound;
        // В зависимости от target_loss_weight,target_gain_weight,target_maintenance_weight
        // для набора + 10-20% к получившемуся результату (хоть к lower, хоть к upper bound)
        // для снижения - 10-20% к получившемуся результату (хоть к lower, хоть к upper bound)
    }
}
