//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();
//2. Define global vars and function bindings
//Set up UI state
//Boolean variable to capture the state of the side menu.
var menuOpen = false; 
//Variable captures current UI mode
var mode = "loginMode"; 

//Associative array maps modes to page titles
var modeToTitle = {"feedMode": "My Data",
                   "roundsMode": "Family Page",
                   "coursesMode": "Hobbies",
                   "loginMode": "Welcome to my awesome website"};

//Array of app modes -- useful for iterating through mode pages
var modes = ["loginMode","feedMode","roundsMode","coursesMode"];
var item = "feed";
//We'll use this to indicate we're on a "locked" page where you have to click
//left arrow to get back to main mode page.
var pageLocked = false;


//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",bottomBarBtnClick);
}

//Bind sideMenuItemClick to all elements on class sideMenuItems
var sideMenuItems = document.getElementsByClassName("menuItem");
for (var i = 0; i < sideMenuItems.length; i++) {
    sideMenuItems[i].addEventListener("click",sideMenuItemClick);
}

//Bind closeAbout function to all elements of class close
var closeBtns = document.getElementsByClassName("close");
for (var i = 0; i < closeBtns.length; ++i) {
    closeBtns[i].addEventListener("click",closeAbout);
}


//Execute function to set start state of app
startUp();