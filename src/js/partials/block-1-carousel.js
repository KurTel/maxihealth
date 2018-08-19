"use strict"

var slider = null;

onloadInit.push( function(){
  //находим слайдер на сцене и создаём объект слайдер
  slider = new Slider(document.getElementById("slider"));
});

function Slider(slider){
  //находим элементы слайдера и превращаем их из коллекции в массив
  var sliderElements = [].slice.call(getSliderElements());

  var sliderChangeInterval = 6000;
  var timerId = null;

  var scrollListener = function(){
    if( window.scrollY > 100){
      sliderNextElement();
      timerId = setSliderInterval(sliderChangeInterval);
      window.removeEventListener("scroll", scrollListener);
    }
  }

  window.addEventListener("scroll", scrollListener);

  var sliderDownSpeedTimer = null;

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
  markers.addEventListener("click", slowDownSlider);

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

  function setSliderInterval(interval){
    clearInterval(timerId);
    return setInterval(sliderNextElement, interval);
  }

  function slowDownSlider(){
    sliderChangeInterval = 8000;

    timerId = setSliderInterval(sliderChangeInterval);

    // clearTimeout(sliderDownSpeedTimer);

    // sliderDownSpeedTimer = setTimeout( function(){
    //   sliderChangeInterval = 4000;
    //   setSliderInterval(sliderChangeInterval);
    // }, 8000);
  }

  //детект жестов и перелистывание по жестам.

  var touchstartX = 0;
  var touchstartY = 0;
  var touchendX = 0;
  var touchendY = 0;

  slider.addEventListener('touchstart', function(event) {
      touchstartX = event.touches[0].screenX;
      touchstartY = event.touches[0].screenY;
  }, false);

  slider.addEventListener('touchmove', function(event) {
      touchendX = event.touches[0].screenX;
      touchendY = event.touches[0].screenY;
  }, false);

  slider.addEventListener('touchend', function(event) {
      handleGesure();
  }, false); 

  function handleGesure() {

    var swipeThreshold = 100;

    if ( touchendX < touchstartX && Math.abs(touchendX - touchstartX) > swipeThreshold ) {
      // alert(swiped + 'left!');
      sliderNextElement();
      slowDownSlider();
    }
    if ( touchendX > touchstartX && Math.abs(touchendX - touchstartX) > swipeThreshold ) {
      // alert(swiped + 'right!');
      sliderNextElement();
      slowDownSlider();
    }
    if (touchendY < touchstartY) {
      // alert(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
      // alert(swiped + 'up!');
    }
    if (touchendY == touchstartY) {
      // alert('tap!');
    }
  }

}

//'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd'


