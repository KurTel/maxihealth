/*! ScrollToAnchor.js v1.1,0 | Paul Browne | 2015 | GNU 2.0  */

onloadInit.push( 
    function() {
    var bod = document.getElementsByTagName("body")[0];
    var FIREFOX = /Firefox/i.test(navigator.userAgent);
    if (FIREFOX) {
        bod = document.getElementsByTagName("html")[0];
    }

    //   setInterval( function(){
    //     console.log("window.scrollY = " + window.scrollY);
    // }, 200);

//5321.111328125

    function scrollToAnchor(scrollDuration, distToTop) {
    const   scrollHeight = window.scrollY,
            scrollStep = Math.PI / ( scrollDuration / 15 );
            // cosParameter = scrollHeight / 2;

    const   windowHeight = document.documentElement.clientHeight;

    var     scrollCount = 0,
            scrollMargin;

    var body = document.body,
        html = document.documentElement;

    const documentHeight = Math.max(  body.scrollHeight, 
                            body.offsetHeight, 
                            html.clientHeight, 
                            html.scrollHeight, 
                            html.offsetHeight );

    // console.log("documentHeight = " + documentHeight);
    // console.log("distToTop = " + distToTop);
    // console.log("windowHeight = " + windowHeight);

    distToTop = (  (documentHeight - distToTop) < windowHeight ) ? documentHeight - windowHeight : distToTop;
    const cosParameter = (distToTop - scrollHeight + 10)/2; 

    // console.log("distToTop = " + distToTop);

    var     scrollInterval = setInterval( function() {
                if ( +window.scrollY < +distToTop ) {
                    scrollCount = scrollCount + 1;  
                    scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                    window.scrollTo( 0, ( scrollHeight + scrollMargin ) );
                    // console.log("cosParameter = " + cosParameter);
                    // console.log("scrollStep = " + scrollStep);
                    // console.log("scrollCount = " + scrollCount);
                    // console.log("scrollMargin = " + scrollMargin);
                    // console.log("distToTop = " + distToTop);
                    // console.log("scrollHeight = " + scrollHeight);
                } 
                else clearInterval(scrollInterval);
            }, 15);
    }
    
    function boo(evt) {
        var thehref = this.getAttribute('href').slice(1),
            idofhref = document.getElementById(thehref),
            disttotop = idofhref.offsetTop,
            length = Math.abs(disttotop - bod.scrollTop),
            timing;
        // if (Math.abs(length) < 500) {
            timing = 1000;
        // }
        // if (Math.abs(length) > 2500) {
        //     timing = 2500;
        // } else {
        //     timing = length;
        // }
        scrollToAnchor(timing, disttotop);
        evt.preventDefault();
    }

    var elements = document.getElementsByTagName("a");
    // console.log(elements);
    // console.log(elements.length);
    for (var i = 0; i < elements.length; ++i) {

        console.log("elements");
        var href = elements[i].getAttribute('href');

        if (href.indexOf("#") === 0 && elements[i].hasAttribute("scrollable")) {
            elements[i].addEventListener('click', boo);
        }
    }
});