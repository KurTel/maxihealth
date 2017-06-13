"use strict"

var superSlider = null;

onloadInit.push( function(){
  //находим слайдер на сцене и создаём объект слайдер
  superSlider = new SuperSlider(document.getElementById("superslider"));
});

function SuperSlider(superslider){
  //находим элементы слайдера и превращаем их из коллекции в массив
  var sliderElements = [].slice.call(getSliderElements());
  var sliderLeft = sliderElements[0];
  var sliderCenter = sliderElements[1];
  var sliderRight = sliderElements[2];

  console.log(sliderElements);

  function getSliderElements(){
    return superslider.getElementsByClassName("slide");
  }

  //onmouseover
  //onmouseout

  sliderCenter.addEventListener("mouseenter", function(){
    sliderCenter.getElementsByClassName("slide__inner__text")[0].classList.add("slide__inner__text__show");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.add("slide__2__inner__open");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.add("slide__2__button__open");
    sliderLeft.getElementsByClassName("button__wrapper")[0].classList.add("slide__2__button__open__left__hide");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.add("slide__2__button__open__right__hide");
  });
  sliderCenter.addEventListener("mouseleave", function(){
    sliderCenter.getElementsByClassName("slide__inner__text")[0].classList.remove("slide__inner__text__show");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.remove("slide__2__inner__open");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.remove("slide__2__button__open");
    sliderLeft.getElementsByClassName("button__wrapper")[0].classList.remove("slide__2__button__open__left__hide");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.remove("slide__2__button__open__right__hide");
  });

  sliderLeft.addEventListener("mouseenter", function(){
    sliderLeft.getElementsByClassName("slide__inner__text")[0].classList.add("slide__inner__text__show");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.add("slide__2__inner__toright");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.add("button__hide");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.add("slide__3__button__hide");
  });
  sliderLeft.addEventListener("mouseleave", function(){
    sliderLeft.getElementsByClassName("slide__inner__text")[0].classList.remove("slide__inner__text__show");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.remove("slide__2__inner__toright");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.remove("button__hide");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.remove("slide__3__button__hide");

  });

  sliderRight.addEventListener("mouseenter", function(){
    sliderRight.getElementsByClassName("slide__inner__text")[0].classList.add("slide__3__inner__text__show");
    sliderRight.getElementsByClassName("slide__inner")[0].classList.add("slide__3__inner__open");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.add("slide__2__inner__toleft");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.add("slide__3__button__open__center__hidetoleft");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.add("slide__3__button__open");
    sliderLeft.getElementsByClassName("button__wrapper")[0].classList.add("slide__3__button__open__left__hide");
  });
  sliderRight.addEventListener("mouseleave", function(){
    sliderRight.getElementsByClassName("slide__inner__text")[0].classList.remove("slide__3__inner__text__show");
    sliderRight.getElementsByClassName("slide__inner")[0].classList.remove("slide__3__inner__open");
    sliderCenter.getElementsByClassName("slide__2__inner")[0].classList.remove("slide__2__inner__toleft");
    sliderCenter.getElementsByClassName("button__wrapper")[0].classList.remove("slide__3__button__open__center__hidetoleft");
    sliderRight.getElementsByClassName("button__wrapper")[0].classList.remove("slide__3__button__open");
    sliderLeft.getElementsByClassName("button__wrapper")[0].classList.remove("slide__3__button__open__left__hide");
  });
}


