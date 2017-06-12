document.addEventListener('DOMContentLoaded', function () {
    var kbjuFormId = 'kbju_form';
    var kbjuForm = document.getElementById(kbjuFormId);
    if (kbjuForm === null) {
        // todo: добавить константы для сообщений логирования и использовать интерполяцию (если перейдем на новый js)
        console.log("Форма с id='" + kbjuFormId + "' не найдена");
        return;
    }
    kbjuForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });
    var kbjuButtonId = 'kbju_button';
    var kbjuButton = document.getElementById(kbjuButtonId);
    if (kbjuButton === null) {
        console.log("Кнопка с id='" + kbjuButtonId + "' не найдена");
        return;
    }
    kbjuButton.addEventListener('click', function () {
        var genderMaleInput = document.getElementById('gender_male');
        var genderFemaleInput = document.getElementById('gender_female');
        var ageInput = document.getElementById('calc__age');
        var heightInput = document.getElementById('calc__height');
        var weightInput = document.getElementById('calc__weight');
        var age = Number(ageInput.value);
        var height = Number(heightInput.value);
        var weight = Number(weightInput.value);
        // Результаты по Харрису-Бенедикту
        var harrisBenedictMaleResult = 13.7 * weight + 5 * height - 6.76 * age + 66;
        var harrisBenedictFemaleResult = 9.6 * weight + 1.8 * height - 4.7 * age + 655;
        // Результаты по Миффлину-Ст.Жеору
        var mifflinStJeorMaleResult = 9.99 * weight + 6.25 * height + 4.92 * age + 5;
        var mifflinStJeorFemaleResult = 9.99 * weight + 6.25 * height + 4.92 * age - 161;
        const activityMap = {};
        activityMap['low'] = {lowerBound: 1.3, upperBound: 1.4};
        activityMap['mid'] = {lowerBound: 1.5, upperBound: 1.6};
        activityMap['high'] = {lowerBound: 1.7, upperBound: 1.8};
        var activityInput = document.getElementById('calc__activity');
        var key = activityInput.options[activityInput.selectedIndex].value;
        // todo: либо так (в новом js можно использовать нормальный Map), либо добавить в каждый option select'а html тег, в котором передавать значение
        var activityValue = activityMap[key];
        var bodyFatPercentage = 30;
        // Результаты по Кэтчу-МакАрдлу
        // не делим результат на мужчин и женщин
        var katchMcArdleResult = 21.6 * (height * (100 - bodyFatPercentage)) / 100 + 370;
        var katchMcArdleResultLowerBound = katchMcArdleResult * activityValue.lowerBound;
        var katchMcArdleResultUpperBound = katchMcArdleResult * activityValue.upperBound;
        console.log(genderMaleInput.checked);
        console.log(genderFemaleInput.checked);
        // для набора + 10-20% к получившемуся результату
        // для снижения - 10-20% к получившемуся результату
        // target_loss_weight,target_gain_weight,target_maintenance_weight
    });
});
