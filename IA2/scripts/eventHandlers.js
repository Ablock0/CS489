//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    for (var i = 0; i < modes.length; ++i) {
      var pages = document.getElementsByClassName(modes[i] + "Div");
      for (var j = 0; j < pages.length; ++j) {
        pages[j].style.display = "none"
      }
    }
    document.getElementById("loginModeDiv").style.display = "block";

    //Clear all text from email and password fields
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "Welcome to MyApp";

    //Hide the bottom bar initially
    document.getElementById("bottomBar").style.visibility = "hidden";

    //Hide all menu items except for Activity Feed items:
    var feedItems = document.getElementsByClassName("feedModeItem");
    var roundItems = document.getElementsByClassName("roundsModeItem");
    var courseItems = document.getElementsByClassName("coursesModeItem");

    for (var i = 0; i < feedItems.length; ++i) {
        feedItems[i].style.display = "block";
      }
    for (var i = 0; i < roundItems.length; ++i) {
      roundItems[i].style.display = "none";
    }

    for (var i = 0; i < courseItems.length; ++i) {
        courseItems[i].style.display = "none";
    }

    //Disable menu button:
    document.getElementById("menuBtn").disabled = true;

    mode = "loginMode";

    //set the input focus of login screen to the email field
    document.getElementById("emailInput").focus();

    //Set default date in log round input form to today:
    document.getElementById("roundDate").valueAsNumber = 
      Date.now()-(new Date()).getTimezoneOffset()*60000;
  }

//clearRoundForm -- Helper function that clears out data previously entered into
//the "Log New Round" form and resets all fields to their default values
function clearRoundForm() {
  document.getElementById("roundDate").valueAsNumber = 
  Date.now()-(new Date()).getTimezoneOffset()*60000;
  document.getElementById("roundCourse").value = "";
  document.getElementById("roundType").value = "practice";
  document.getElementById("roundHoles").value = "18";
  document.getElementById("roundStrokes").value = "80";
  document.getElementById("roundMinutes").value = "50";
  document.getElementById("roundSeconds").value = "00";
  document.getElementById("roundSGS").value = "130:00";
  document.getElementById("roundNotes").value = "";
}


  //document click: When the user clicks anywhere in the doc and the menu is open
  //we need to close it and toggle menu state variable.
  document.addEventListener("click",function(e) {
    if (menuOpen) {
      if (!pageLocked) { //Change hamburger back to 'X'
          document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
          document.getElementById("menuBtnIcon").classList.add("fa-bars");
      }
      document.getElementById("sideMenu").style.width = "0px"; //close menu
      menuOpen = false;
    }
});

 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (pageLocked) { //user is clicking left arrow to exit locked page
    pageLocked = false;
    //restore hamburger icon
    document.getElementById("menuBtnIcon").classList.remove("fa-arrow-left"); 
    document.getElementById("menuBtnIcon").classList.add("fa-bars");
    //change shaded menu item back to original
    console.log("MODE: = " + mode);
    document.getElementById("major").classList.remove("menuItemSelected"); 
    document.getElementById("feed").classList.add("menuItemSelected");
    //Hide current page
    var currModePages = document.getElementsByClassName(mode + "Div");
    for (var i = 0; i < currModePages.length; ++i) {
      currModePages[i].style.display = "none"; //hide
    }
    //Show main mode page
    document.getElementById(mode + "MainDiv").style.display = "block";
    //Restore main mode page title
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    //Re-enable bottom bar buttons
    document.getElementById("bottomBar").classList.remove("disabledButton");
    e.stopPropagation();
    return;
  }
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    e.stopPropagation();
  }
});   


// sideMenuItem Click: This function does the side menu housekeeping in cases where the item clicked 
  // (of class sideMenuItem) is actually a redirect to another page.  
  var sideMenuItemClick = function() {
    if (item != this.id) {
      if ((this.id != "aboutBtn") && (this.id != "logOutBtn")){
        var prevItem = item;
        item = this.id;
        console.log("prevItem: " + prevItem);
        console.log("item: " + item);
        document.getElementById(prevItem).classList.remove("menuItemSelected"); 
        this.classList.add("menuItemSelected");
        //don't need to change the mode
        //change page content to show current item
        console.log("before error");
        document.getElementById(item + "ModeMainDiv").style.display = "block";
        console.log("after error");
        //hide other page
        document.getElementById(prevItem + "ModeMainDiv").style.display = "none";
      }
      //dont need to change the menu items

      // else { //this.id is either "aboutBtn" or "logOutBtn"
      //   console.log("item: " + item);
      //   if (this.id != "aboutBtn"){
      //     document.getElementById(item + "ModeMainDiv").style.display = "block";
      //   }
      //   else {
      //     item = "feed";
      //     document.getElementById("feedModeMainDiv").style.display = "block";
      //   }
      // }


    }
  }


//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially
//need to toggle the mode.
var bottomBarBtnClick = function() {
  if (mode != this.id) {
    var prevMode = mode;
    mode = this.id;
    //Change mode button:
    document.getElementById(prevMode).classList.remove("menuItemSelected");
    this.classList.add("menuItemSelected");
    //Change page title:
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    //Change page content
    //Hide pages from previous mode
    console.log("prevMode: " + prevMode);
    var currPages = document.getElementsByClassName(prevMode + "Div");
    for (var i = 0; i < currPages.length; ++i) {
      currPages[i].style.display = "none";
    }
    //Show main page in current mode
    //hide all first, then show the current one we want
    //show the one we want
    document.getElementById(mode + "MainDiv").style.display = "block";
    //update menu items value
    if (mode == "feedMode") {item = "feed";}
    else if (mode == "roundsMode") {item = "rounds";}
    else {item = "courses";}
    //Change menu items:
    var oldItems = document.getElementsByClassName(prevMode + "Item");
    var newItems = document.getElementsByClassName(mode + "Item");
        for (var i = 0; i < oldItems.length; ++i) {
      oldItems[i].style.display = "none";
    }
    for (var i = 0; i < newItems.length; ++i) {
      newItems[i].style.display = "block";
    }
  }
}

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.bottombar
function login() {
  //Stop spinner
  document.getElementById("loginBtnIcon").classList.remove("fas","fa-spinner","fa-spin");
  
  //Enable menu button:
  document.getElementById("menuBtn").disabled = false;

  //Show bottom bar buttons and highlight feed mode button
  document.getElementById("bottomBar").style.visibility = "visible";
  document.getElementById("feedMode").classList.add("menuItemSelected");
  document.getElementById("roundsMode").classList.remove("menuItemSelected");
  //document.getElementById("coursesMode").classList.remove("menuItemSelected");
  //Change mode
  mode = "feedMode"
  //Change title bar to current mode
  document.getElementById("topBarTitle").textContent = modeToTitle[mode];
  //Show only the current mode menu items
  var modeItems = document.getElementsByClassName("modeItem");
  //Hide _all_ mode items
  for (var i = 0; i < modeItems.length; ++i) {
    modeItems[i].style.display = "none";
  }
  //Show current mode items
  var feedItems = document.getElementsByClassName(mode + "Item");
  for (var i = 0; i < feedItems.length; ++i) {
    feedItems[i].style.display = "block";
  }

  //hide login screen and show feed screen
  document.getElementById("loginModeDiv").style.display = "none";
  console.log("mode: " + mode);
  document.getElementById(mode + "MainDiv").style.display = "block";

  //Write login name of user who just logged in to localStorage
  let thisUser = document.getElementById("emailInput").value;
  localStorage.setItem("userName",thisUser);
  //Check whether we have saved data on this (or any) user:
  let data = localStorage.getItem("speedgolfUserData");
  if (data == null) { 
    //No user app data stored yet -- create blank record for current user
    localStorage.setItem("speedgolfUserData",
      JSON.stringify({thisUser : {"rounds" : {}, "roundCount": 0}}));  
  } else {
    //app data exists -- check if data exists for thisUser
    data = JSON.parse(data);
    if  (!data.hasOwnProperty(thisUser)) { 
      //No data for this user -- create empty data
      data[thisUser] = {"rounds": {}, "roundCount": 0}; 
      localStorage.setItem("speedgolfUserData",JSON.stringify(data));
    }
  }
   
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,1000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};
  
//MENU BUTTON HANDLERS GO HERE

//aboutBtn click: When the user clicks on "About", launch the modal About dialog
//box.
document.getElementById("aboutBtn").onclick = function(e) {
  document.getElementById("aboutModal").style.display = "block";
};

//closeAbout click: When the user clicks a button to cloe the modal About box, hide the
//dialog box. Note that this function is bound to the two items with class
//"close" in function startUp
function closeAbout(e) {
  document.getElementById("aboutModal").style.display = "none";
}

//logOutBtn click: When the user logs out, we need to reset the app to its start
//state, with the login page visible
document.getElementById("logOutBtn").onclick = function(e) {
  //Restore starting app state
  startUp();
};

//logRoundForm SUBMIT: When the user clicks the "Save" button to save a newly
//entered speedgolf round, we need to save it to local storage
document.getElementById("logRoundForm").onsubmit = function(e) {
  e.preventDefault(); //We do NOT want the button to trigger a page reload!
  //Start spinner
  document.getElementById("saveIcon").classList.add("fas", "fa-spinner", "fa-spin");
  //Set spinner to spin for one second, after which saveRoundData will be called
  setTimeout(saveRoundData,1000);
}

//saveRoundData -- Callback function called from logRoundForm's submit handler.
//Stops the spinner and then saves the entered round data to local storage.
function saveRoundData() {

  //Stop spinner
  document.getElementById("saveIcon").classList.remove("fa-spinner", "fa-spin");

  //Retrieve from localStorage this user's rounds and roundCount
  let thisUser = localStorage.getItem("userName");
  let data = JSON.parse(localStorage.getItem("speedgolfUserData"));
   
    //increment roundCount since we're adding a new round
  data[thisUser].roundCount++;

  //Initialize empty JavaScript object to store this new round
  let thisRound = {}; //iniitalize empty object for this round
  let temp; //temporary value for storying DOM elements as needed

  //Store the data
  thisRound.roundNum = data[thisUser].roundCount;
  thisRound.date = document.getElementById("roundDate").value; //round date
  thisRound.course = document.getElementById("roundCourse").value;
  temp = document.getElementById("roundType");
  thisRound.type = temp.options[temp.selectedIndex].value;
  temp = document.getElementById("roundHoles");
  thisRound.numHoles = temp.options[temp.selectedIndex].value;
  thisRound.strokes = document.getElementById("roundStrokes").value;
  thisRound.minutes = document.getElementById("roundMinutes").value;
  thisRound.seconds = document.getElementById("roundSeconds").value;
  thisRound.SGS = document.getElementById("roundSGS").value;
  thisRound.notes = document.getElementById("roundNotes").value;

  //Add this round to associative array of rounds
  data[thisUser].rounds[data[thisUser].roundCount] = thisRound;

  //Commit updated user data to app data in local storage
  localStorage.setItem("speedgolfUserData",JSON.stringify(data));

  //Show alert box with current state of speedgolfUserData for debugging purposes
  data = localStorage.getItem('speedgolfUserData');
  alert("speedgolfUserData: " +  data);
  

 //Go back to "My Rounds" page by programmatically clicking the menu button
 document.getElementById("menuBtn").click();

 //Clear form to ready for next use
 clearRoundForm();
}

// addBtnLabel click: when the user clicks the "plus" button on the home page after login
document.getElementById("addBtn").onclick = function (e) {
  //hide current mode
  document.getElementById("feedModeMainDiv").style.display = "none";
  //show logRound page
  document.getElementById("majorModeMainDiv").style.display = "block";
  //Change page title:
  document.getElementById("topBarTitle").textContent = "Log New Round";
  //Set label of form button appropriately
  document.getElementById("submitBtnLabel").textContent = "Save Round Data";
  //Set pageLocked to true, thus indicating that we're on a page that may only
  //be exited by clicking on the left arrow at top left
  pageLocked = true;
  //When pageLocked is true, the menu  icon is the left arrow
  document.getElementById("menuBtnIcon").classList.remove("fa-bars");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.add("disabledButton");
}

//logRoundItem click: Take the user to the log round page
document.getElementById("major").onclick = function(e) {
  //Swap pages:
  document.getElementById("feedModeMainDiv").style.display = "none";
  document.getElementById("majorModeMainDiv").style.display = "block";
  //Change page title:
  document.getElementById("topBarTitle").textContent = "Log New Round";
  //Set label of form button appropriately
  document.getElementById("submitBtnLabel").textContent = "Save Round Data";
  //Set pageLocked to true, thus indicating that we're on a page that may only
  //be exited by clicking on the left arrow at top left
  pageLocked = true;
  //When pageLocked is true, the menu  icon is the left arrow
  document.getElementById("menuBtnIcon").classList.remove("fa-times");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.add("disabledButton");
}


//ADDITIONAL AUXILARY FUNCTIONS GO HERE
//updateSGS --When the strokes, minutes or seconds fields are updated, we need
//to update the speedgolf score accordingly.
function updateSGS() {
  var strokes = document.getElementById("roundStrokes").valueAsNumber;
  var minutes = document.getElementById("roundMinutes").valueAsNumber;
  var seconds = document.getElementById("roundSeconds").value;
  document.getElementById("roundSGS").value = (strokes + minutes) + ":" + seconds;
}
//changeSeconds - When the seconds fields is updated, we need to ensure that the
//nds field of the round time is zero-padded. We also need to call updateSGS to
//update the speedgolf score based on the new seconds value.
function changeSeconds() {
  var seconds = document.getElementById("roundSeconds").value;
  if (seconds.length < 2) {
    document.getElementById("roundSeconds").value = "0" + seconds;
  }
  updateSGS();
}