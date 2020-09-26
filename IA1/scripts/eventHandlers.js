////////////////////////////////////////////////////////////////////////////
//eventHandlers.js -- This file includes JavaScript functions used to handle
//user interaction and page navigation.
////////////////////////////////////////////////////////////////////////////

/* bindListenerToClassName -- Given a (CSS) class name, a function, and a listener type (e.g., "click"),
this function iterates through all elements with the class, binding the event listener function to 
the appropriate listener type. 
This is a utility function that allows us to bind the same function to all elements of a class. */
function bindListenerToClassName(className, func, listenerType) {
    var classes = document.getElementsByClassName(className);
    for (var i = 0; i < classes.length; ++i) {
      classes[i].addEventListener(listenerType,func);
    }
  }

  //menuBtn click: When the top-left side menu button is clicked, we need to act based on which icon is
  //presently displayed -- hamburger or left arrow. If hamburger, we need to check what mode we're in 
  //and what the current page is and change the menu contents accordingly. If left arrow, we need to hide
  //the menu.

//document click: When the user clicks anywhere in the doc and the menu is open
//we need to close it and toggle menu state variable.
document.addEventListener("click",function(e) {
  if (menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-bars");
    document.getElementById("sideMenu").style.width = "0px"; //close menu
    menuOpen = false;
  }
});
 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    //toggleInputDisabled(true);
    e.stopPropagation();
  }
});

  // sideMenuItem Click: This function does the side menu housekeeping in cases where the item clicked 
  // (of class sideMenuItem) is actually a redirect to another page.  
  var sideMenuItemClick = function() {
    if (item != this.id) {
      var prevItem = item;
      item = this.id;
      console.log("prevItem: " + prevItem);
      console.log("item: " + item);
      document.getElementById(prevItem).classList.remove("menuItemSelected"); 
      this.classList.add("menuItemSelected");
      //don't need to change the mode
      //change page content
      document.getElementById(prevItem + "ModeDiv").style.display = "none";
      document.getElementById(item + "ModeDiv").style.display = "block";
      //dont need to change the menu items
    }
  }


  //modeBtn click: When the user clicks on a mode button in the bottom fixed bar, we need to switch to
  //the corresponding area of the app.

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially 
//need to toggle the mode. 
var bottomBarBtnClick = function() { 
  if (mode != this.id) {
    var prevMode = mode;
    mode = this.id;
    console.log("prevMode: " + prevMode);
    console.log("mode: " + mode);
    //Change mode button 
    document.getElementById(prevMode).classList.remove("menuItemSelected"); 
    this.classList.add("menuItemSelected"); 
    //Change page title
    document.getElementById("topBarTitle").textContent = modeToTitle[mode]
    //Change page content
    document.getElementById(prevMode + "Div").style.display = "none"; 
    document.getElementById(mode + "Div").style.display = "block"
    //Change menu items:
    var oldItems = document.getElementsByClassName(prevMode + "Item");
    var newItems = document.getElementsByClassName(mode + "Item");
    //Uses for loop:
    for (var i = 0; i < oldItems.length; ++i) {
      oldItems[i].style.display = "none";
    }
    for (var i = 0; i < newItems.length; ++i) {
      newItems[i].style.display = "block";
    } 
    //Hide last menu item
    document.getElementById(item + "ModeDiv").style.display = "none";
    //update last menu item to current mode's first menu item
    if (mode == "feedMode") { item = "feed";}
    else if (mode == "roundsMode") {item = "rounds";}
    else item = "courses";
  } 
}