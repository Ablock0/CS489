//Start-up functions run when page is loaded.
includeHTML();

//2. Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.

//Associative array maps modes to page titles
var modeToTitle = {"feedMode": "About Me Page",
                   "roundsMode": "Family Page",
                   "coursesMode": "Hobbies Page"};

//On startup, set current app mode to "feedMode"
var mode = "feedMode"; //Variable captures current UI mode
var item = "feed"; //Variable captures current menu item
document.getElementById(mode).classList.add("menuItemSelected");

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

//Hide all pages except for Activity Feed, which is the start page.
var displayPages = document.getElementsByClassName("paddedPage");
for (var i = 0; i < displayPages.length; ++i) {
    displayPages[i].style.display = "none";
}
document.getElementById("feedModeDiv").style.display = "block";

//Hide all menu items except for Activity Feed items: 
var roundItems = document.getElementsByClassName("roundsModeItem"); 
var courseItems = document.getElementsByClassName("coursesModeItem"); 
for (var i = 0; i < roundItems.length; ++i) { 
    roundItems[i].style.display = "none"; 
} 
for (var i = 0; i < courseItems.length; ++i) { 
    courseItems[i].style.display = "none"; 
}