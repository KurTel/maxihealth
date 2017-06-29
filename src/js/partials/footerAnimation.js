// onloadInit.push( function(){

//   var contacts = document.getElementById("contacts");

//   setInterval( function(){


//     var contactsRect = contacts.getBoundingClientRect();

//     // console.log(contactsRect);
//     // console.log(document.elementFromPoint(contactsRect.left,
//     //                                       contactsRect.top));

//     if(document.elementFromPoint(contactsRect.left,
//                                           contactsRect.top) != null){
//       contacts.classList.remove("contacts__hide");
//     }
//   }, 200);
// });


var footerScrollListener = function(){
  var contacts = document.getElementById("contacts");
  var contactsRect = contacts.getBoundingClientRect();

  // console.log(contactsRect);
  // console.log(document.elementFromPoint(contactsRect.left,
                                        // contactsRect.top));

  if(document.elementFromPoint(contactsRect.left,
                                        contactsRect.top) != null){
    contacts.classList.remove("contacts__hide");
    window.removeEventListener("scroll", footerScrollListener);
  }
}

window.addEventListener("scroll", footerScrollListener);