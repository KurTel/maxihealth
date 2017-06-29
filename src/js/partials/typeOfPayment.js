"use strict"

window.addEventListener('DOMContentLoaded', function(){
  document.querySelector('select[name="type-of-payment"]').onchange = changeEventHandler;
});

function changeEventHandler(event){
  var typOfPaymentWrapper = this.parentNode;
  var buttonOrder = document.getElementById("button_order");

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

  this.style.width = this.options[this.selectedIndex].getAttribute("data-width");
  typOfPaymentWrapper.style.width = this.options[this.selectedIndex].getAttribute("data-width");
  menuControl.updateTypeOfPayment();

  buttonOrder.textContent = button[this.value].text;
  buttonOrder.style.width = button[this.value].width;
  // console.log(this);
  // if(!event.target.value) 
  //   alert('Please Select One');
  // else 
  //   alert('You like ' + event.target.value + ' ice cream.'); 
}