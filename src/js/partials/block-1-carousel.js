"use strict"

var slider = null;

onloadInit.push( function(){
  //находим слайдер на сцене и создаём объект слайдер
  slider = new Slider(document.getElementById("slider"));
});

function Slider(slider){
  //находим элементы слайдера и превращаем их из коллекции в массив
  var sliderElements = [].slice.call(getSliderElements());

  var sliderChangeInterval = 8000;

  // var timerId = setInterval(sliderNextElement, sliderChangeInterval);

  var classPositionLeft = "slide__position__left";
  var classPositionCenter = "slide__position__center";
  var classPositionRight = "slide__position__right";

  var classHide = "slide__hide";
  var classShow = "slide__show";

  var isAnimatedNow = false;

  // var classSliderBackgrounds = ["light_background","dark_background"];
  var classMarkersBackgrounds = ["slider__markers__position-left","slider__markers__position-right"];

  //показывает реальную очерёдность слайдов в стеке
  var numberList = [0,1];

  //маркеры
  var markers = document.getElementById("slider__markers__position");
  markers.addEventListener("click", sliderNextElement);

  //выравниваме все блоки по по высоте по второму блоку
  setSliderHeight(numberList);
  onResize.push( setSliderHeight );

  function setSliderHeight(){
    sliderElements[numberList[0]].style.height = sliderElements[numberList[1]].getBoundingClientRect().height + "px";
    slider.style.height = sliderElements[0].getBoundingClientRect().height + "px";
  }

  function getSliderElements(){
    return slider.getElementsByClassName("block__1__slide__element");
  }

  function sliderNextElement(){

    if(isAnimatedNow) return;

    sliderElements[0].classList.remove(classPositionCenter);
    sliderElements[0].classList.add(classPositionLeft);

    sliderElements[1].classList.remove(classPositionRight);
    sliderElements[1].classList.add(classPositionCenter);

    setTimeout( function (){
      
      sliderElements[0].classList.remove(classPositionLeft);
      sliderElements[0].classList.add(classPositionRight);

      shiftElements();
      isAnimatedNow = false;

      }, 2000);

    isAnimatedNow = true;

    PrefixedEvent(sliderElements[1], "animationend", function(){

      isAnimatedNow = false;
      clearInterval(timerId);
      timerId = setInterval(sliderNextElement, sliderChangeInterval);

    })

    // //changeBackground();

    // shiftElements();
    changeMarkers();
  }

  function shiftElements(){
    // console.log(sliderElements);

    sliderElements.push(sliderElements.shift());
    numberList.push(numberList.shift());

    // console.log(sliderElements);
  }

  function changeMarkers(){
    
    if(markers.classList.contains(classMarkersBackgrounds[0])){
      markers.classList.remove(classMarkersBackgrounds[0]);
      markers.classList.add(classMarkersBackgrounds[1]);
    } else {
      markers.classList.remove(classMarkersBackgrounds[1]);
      markers.classList.add(classMarkersBackgrounds[0]);
    }
  }

  function changeBackground(){
    if(slider.classList.contains(classSliderBackgrounds[0])){
      slider.classList.remove(classSliderBackgrounds[0]);
      slider.classList.add(classSliderBackgrounds[1]);
    } else {
      slider.classList.remove(classSliderBackgrounds[1]);
      slider.classList.add(classSliderBackgrounds[0]);
    }
  }

  // this.showSliderElements = function(){
  //   console.log(sliderElements);
  // }
}

//'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd'


