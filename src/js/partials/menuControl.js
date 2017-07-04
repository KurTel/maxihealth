"use strict"

// console.log("menuControl = " + menuControl);
var menuControl = null;
// console.log("menuControl = " + menuControl);

onloadInit.push( function (){
  menuControl = new MenuControl();
  // console.log("create menuControl");
  // console.log(menuControl);
});

function MenuControl(){

  var modalView       =   document.getElementById("modal__window");

  var menuHeader      =   document.getElementById("menu__header");
  var menuDescription =   document.getElementById("menu__description");
  var menuDays        =   document.getElementById("menu__days");
  var menuWomenKcal   =   document.getElementById("menu__women__kcal");
  var menuMenKcal     =   document.getElementById("menu__men__kcal");
  var menuSex         =   document.querySelector('input[name="sex"]:checked');
  var menuPrice       =   document.getElementById("menu_price_mobile");

  var typeOfPayment   =   document.querySelector('select[name="type-of-payment"]');
  var buttonOrderDes  =   document.getElementById("button_order_desktop");
  var buttonOrderMob  =   document.getElementById("button_order_mobile");

  var sex           = {
                        men:    "men",
                        women:  "women"
  }

  var programs      = {
                        lose :  "lose",
                        main :  "main",
                        gain :  "gain",
                        action: "action"
                      }

  var headers       = {
                        lose :  "ПРАВИЛЬНАЯ ДИЕТА ДЛЯ ВАШЕГО ОРГАНИЗМА",
                        main :  "ДЛЯ СОХРАНЕНИЯ ПОСТОЯННОЙ МАССЫ",
                        gain :  "ДЛЯ НАБОРА МЫШЕЧНОЙ МАССЫ ТЕЛА",
                        action: "АКЦИЯ"
                      }

  var dascriptions  = {
                        lose : "Если ваша цель избавиться от лишних кг без вреда для здоровья, выбирайте правильное питание для похудения и соблюдайте эту программу постоянно. Минимальная калорийность с балансом нутриентов в сторону увеличения белка и ограничением углеводов делает процесс снижения веса плавным и позволяет сохранить мышечную массу.",
                        main : "Программа на поддержку отлично подойдёт для тех людей кто уже добился желаемого результата и хочет закрепить его. В программу включены блюда с равным соотношением белков и углеводов и оптимальным количеством жира. Это позволит находится в прекрасной форме.",
                        gain : "Эта программа отлично подойдёт для людей которые занимаются активной физической нагрузкой и хотят правильно увеличить мышечную массу тела. Особое внимание уделяется большому содержанию углеводов и оптимальному содержанию белков и жиров. Идеальное соотношение нутриентов для набора веса любым категориям спортсменов.",
                        action : "ТУТ ОПИСАНИЕ ДЛЯ АКЦИИ БЛА БЛА БЛА "
                      }

  var days          = {
                        1 : "НА 1 ДЕНЬ",
                        2 : "НА 2 ДНЯ",
                        5 : "НА 5 ДНЕЙ",
                        7 : "НА 7 ДНЕЙ",
                        14: "НА 14 ДНЕЙ",
                        30: "НА 30 ДНЕЙ"
                      }

  var womenKcals    = {
                        lose : "1600",
                        main : "1800",
                        gain : "2000",
                        action : "1800"
                      }

  var menKcals      = {
                        lose : "2100",
                        main : "2500",
                        gain : "2300",
                        action : "2500"
                      }

  var totalPrice    = 0;

  var menuElements  = {

    header : {
      htmlElement : menuHeader,
      values : headers,
      setHtml : setElementTextByProgram
    },

    day : {
      htmlElement : menuDays,
      values : days,
      setHtml : setElementTextByDay
    },

    menKcal : {
      htmlElement : menuMenKcal,
      values : menKcals,
      setHtml : setElementTextByProgram
    },

    womenKcal : {
      htmlElement : menuWomenKcal,
      values : womenKcals,
      setHtml : setElementTextByProgram
    },

    dascription : {
      htmlElement : menuDescription,
      values : dascriptions,
      setHtml : setElementTextByProgram
    },

    updateHtmlAll : function(){
      for(element in this){
        // console.log(this[element]);
        // console.log(this[element].setHtml);
        if(this[element].setHtml == null) break;
        
        this[element].setHtml();
      }
    }
  }

  function setElementTextByProgram(){
    this.htmlElement.textContent = this.values[currentProgram];
    this.htmlElement.setAttribute("data-program", currentProgram);
    this.htmlElement.setAttribute("data-days", currentDays);
    if( this == menuElements["header"] ){
      this.htmlElement.parentNode.setAttribute("data-program", currentProgram);
    }
    // console.log(this);
  }

  function setElementTextByDay(){
    this.htmlElement.textContent = this.values[currentDays];
    this.htmlElement.setAttribute("data-program", currentProgram);
    this.htmlElement.setAttribute("data-days", currentDays);
  }

  function updateElements(){
    // console.log("updateElements start");
    menuElements.updateHtmlAll();
    // console.log("updateElements finish");
    modalView.setAttribute("data-program", currentProgram);
    modalView.setAttribute("data-days", currentDays);
  }

  var currentProgram = programs.main;
  var lastProgram = currentProgram;
  var currentDays = 2;
  var currentTypeOfPayment = typeOfPayment.value;
  var currentSex = sex.men;

  this.updateTypeOfPayment = function(){
    currentTypeOfPayment = typeOfPayment.value;
  }

  // function setCurrentProgram(program){
  //   currentProgram = program;
  // }

  // function setCurrentDays(days){
  //   currentDays = days;
  // }

  // function setProgramAndUpdate(program){
  //   setCurrentProgram(program);
  //   updateElements();
  // }

  // function setDaysAndUpdate(days){
  //   setCurrentProgram(days);
  //   updateElements();
  // }

  menuSex.addEventListener("change", this.setParametersAndUpdate);

  this.setParametersAndUpdate = function(){
    // console.log(this);
    if( this.hasAttribute("data-program-target") ){

      
      if(this.getAttribute("data-program-target") == programs.action){

        if( currentProgram != programs.action ){
          lastProgram = currentProgram;
          currentProgram = this.getAttribute("data-program-target");
        } else {
          // console.log("nothingNappend");
        }

      } else {
        lastProgram = currentProgram;
        currentProgram = this.getAttribute("data-program-target");
      }

      
      // console.log("setParametersAndUpdate currentProgram = " + currentProgram);
      

      if( this.hasAttribute("data-tabs-lock")){
        hideTabs();
      } else {
        showTabs();
      }

    } else {
      if( currentProgram == programs.action ){
        currentProgram = lastProgram;
      } 

    }

    if (this.hasAttribute("data-days-target") ){
      currentDays = this.getAttribute("data-days-target");
    } else {
      currentDays = 2;
    }

    updateElements();
    updateContenDays();
    //console.log(document.querySelector('input[name="sex"]:checked'));
  }

  function setInputsAndUpdate(){
    currentSex = document.querySelector('input[name="sex"]:checked').value;
    updateElements();
    updateContenDays();
  }

  var sexInputs = document.getElementsByName("sex");
  // console.log();
  for( let i = 0, input; input = sexInputs[ i++ ]; ) {
    input.addEventListener("change", setInputsAndUpdate);
    // console.log();
  }

  var daysButtons = modalView.getElementsByClassName('data__days__element');
  for( let i = 0, btn; btn = daysButtons[ i++ ]; ) {
    btn.addEventListener("click", this.setParametersAndUpdate);
  }

  function hideTabs(){
    for( let i =0, btn; btn = daysButtons[ i++ ]; ) {
      btn.style.visibility = "hidden";
    }
  }

  function showTabs(){
    for( let i =0, btn; btn = daysButtons[ i++ ]; ) {
      btn.style.visibility = "visible";
    }
  }


  var menu = {
    monday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    tuesday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    wednesday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    thursday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    friday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    saturday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    },
    sunday:{
      1: dishes.porridgeAndBread,
      2: dishes.curdMuffins,
      3: dishes.dietaryChicken,
      4: dishes.tunaAvocadoSandwich,
      5: dishes.stewedTurkey,
    }
  }

  function dishToText(dish){
    // console.log("currentSex = " + currentSex);
    // console.log("currentProgram = " + currentProgram);
    return {
      dishName: dish.fullName,
      dishInfo: "(БЖУ " + 
                dish.proteins[currentSex][currentProgram] + 
                "/" + 
                dish.fats[currentSex][currentProgram] +
                "/" + 
                dish.carbohydrates[currentSex][currentProgram] +
                " &ndash; " + 
                dish.kcal[currentSex][currentProgram] + 
                " ккал)"
    }
  }

  var menuContent = document.getElementById("menu__content");

  var contentDays = menuContent.getElementsByTagName("section");

  function updateContenDays(){

    let dayCount = 0;

    for(let day in menu){

      // console.log(contentDays[dayCount].firstChild);
      // contentDays[dayCount].firstChild.remove();

      while (contentDays[dayCount].firstChild) {
        contentDays[dayCount].removeChild(contentDays[dayCount].firstChild);
      }

      let dayInMenu = menu[day];

      let ul = document.createElement('ul');
      ul.className = "menu__day__list";

      for(let number in dayInMenu){
        //это нужно для определения, оставляем ли мы инфу продолжением имени или переносим её на новую строку
        let maxLength = 38;

        let li = document.createElement('li');
        li.className = "day__dish";

        // console.log(menu);
        // console.log(dayInMenu);
        // console.log(number);
        // console.log(dayInMenu[number]);

        let dishText = dishToText(dayInMenu[number]);
        let breakElement = "";

        if(dishText.dishName.length > maxLength){
          breakElement = " ";
        } else {
          breakElement = "<br>"
        }

        // console.log("dishText");
        // console.log(dishText);

        let spanName = document.createElement('span');
        spanName.className = "dish__name";
        spanName.innerHTML = dishText.dishName;

        // console.log("spanName");
        // console.log(spanName);

        // console.log("spanName.height");
        // console.log(spanName);

        let spanInfo = document.createElement('span');
        spanInfo.className = "dish__info";
        spanInfo.innerHTML = breakElement + dishText.dishInfo;

        li.appendChild(spanName);
        li.appendChild(spanInfo);

        ul.appendChild(li);
      }

      contentDays[dayCount].appendChild(ul);
      dayCount++;
    }
  }

}