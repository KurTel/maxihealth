"use strict"

onloadInit.push( modalInit );

function modalInit(){


  
  (function init(){

    var elems = document.getElementsByTagName( '*' );

    for( let i =0, elem; elem = elems[ i++ ]; ) {

      if ( elem.hasAttribute('modal-view')) {
        elem.addEventListener("click", modalHide);
      }

      if ( elem.hasAttribute('modal-button-show') && elem.getAttribute('href').indexOf('#') === 0 ) {
        elem.addEventListener("click", modalShow);
      }

      if ( elem.hasAttribute('modal-button-hide')) {
        elem.addEventListener("click", modalHide);
      }
    }

  }());

  var b = document.getElementsByTagName( 'body' )[0];

  function modalShow(event ){
    var thehref = this.getAttribute('href').slice(1),
        modalWindow = document.getElementById(thehref);

    modalWindow.setAttribute("modal-view","show");
    b.setAttribute("modal-window-active","");
  }

  function modalHide(event){

    event = event || window.event;
    var target = event.target || event.srcElement;

    let modalWindowHref = this.getAttribute('modal-button-hide');
    let modalWindow = null;

    if( modalWindowHref != null ){
      modalWindow = document.getElementById(modalWindowHref);
    } else {
      modalWindow = this;
    }

    if(modalWindow != null){
      modalWindow.setAttribute("modal-view","hide");
      b.removeAttribute("modal-window-active");
    }
  }


}