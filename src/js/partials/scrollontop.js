"use strict"

function scrollOnTop(scrollDuration) {
const   scrollHeight = window.scrollY,
        scrollStep = Math.PI / ( scrollDuration / 15 ),
        cosParameter = scrollHeight / 2;
var     scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval( function() {
            if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;  
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } 
            else clearInterval(scrollInterval); 
        }, 15);
}

onloadInit.push( function(){
  
    var timeToCheck = 500;
    var offsetToShow = 300;
    var buttonOnTop = document.getElementById("on-top-button");

    setInterval( function (){
      
        if( window.scrollY > offsetToShow ){
            buttonOnTop.classList.remove("button__scrollontop__hide");
            buttonOnTop.classList.add("button__scrollontop__show");
        } else {
            buttonOnTop.classList.remove("button__scrollontop__show");
            buttonOnTop.classList.add("button__scrollontop__hide");
        }

    }, timeToCheck);

});


// document.documentElement.scrollTop

// function scrollOnTop(scrollDuration) {
//     var cosParameter = window.scrollY / 2,
//         scrollCount = 0,
//         oldTimestamp = performance.now();
//     function step (newTimestamp) {
//         scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
//         if (scrollCount >= Math.PI) window.scrollTo(0, 0);
//         if (window.scrollY === 0) return;
//         window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
//         oldTimestamp = newTimestamp;
//         window.requestAnimationFrame(step);
//     }
//     window.requestAnimationFrame(step);
// }
/* 
    Explanations:
    - pi is the length/end point of the cosinus intervall (see above)
    - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
      (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
    - newTimestamp - oldTimestamp equals the duration

      a * cos (bx + c) + d                      | c translates along the x axis = 0
    = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
    = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
    = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    = cosParameter + cosParameter * (cos scrollCount * x)
*/