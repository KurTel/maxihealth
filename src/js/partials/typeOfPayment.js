"use strict"

window.addEventListener('DOMContentLoaded', function(){
  var typesOfPayment = document.querySelectorAll('select[name="type-of-payment"]');
  for (var i = 0; i < typesOfPayment.length; i++) {
    typesOfPayment[i].addEventListener('change', changeEventHandler);
  }
});

function changeEventHandler(event){
  var typOfPaymentWrapper = this.parentNode;
  var buttonOrderDes = document.getElementById("button_order_desktop");
  var buttonOrderMob = document.getElementById("button_order_mobile");

  var button = {
    online: {
      text: "ПЕРЕЙТИ К ОПЛАТЕ КАРТОЙ",
      width: "220px"
    },
    cash: {
      text: "ОФОРМИТЬ ЗАКАЗ",
      width: "160px"
    }
  }

  // console.log(event.target);
  // console.log(event.target.value);
  // console.log(this.options[this.selectedIndex]);

  console.log(this);
  console.log(document.documentElement.clientWidth);



  if(document.documentElement.clientWidth <= 400){

    this.style.width = this.options[this.selectedIndex].getAttribute("data-width-xsmall");
    typOfPaymentWrapper.style.width = this.options[this.selectedIndex].getAttribute("data-width-xsmall");
    menuControl.updateTypeOfPayment();

    buttonOrderMob.textContent = button[this.value].text;

  } else if(document.documentElement.clientWidth <= 480){

    this.style.width = this.options[this.selectedIndex].getAttribute("data-width");
    typOfPaymentWrapper.style.width = this.options[this.selectedIndex].getAttribute("data-width");
    menuControl.updateTypeOfPayment();

    buttonOrderMob.textContent = button[this.value].text;

  } else {

    this.style.width = this.options[this.selectedIndex].getAttribute("data-width");
    typOfPaymentWrapper.style.width = this.options[this.selectedIndex].getAttribute("data-width");
    menuControl.updateTypeOfPayment();

    buttonOrderDes.textContent = button[this.value].text;
    buttonOrderDes.style.width = button[this.value].width;

  }

  // console.log(this);
  // if(!event.target.value) 
  //   alert('Please Select One');
  // else 
  //   alert('You like ' + event.target.value + ' ice cream.'); 
}