/**
* @name: Assignement1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Daniel Kakiuthi
*/

/*----------------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------ ARRAYS, VARIABLES, OBJECTS ------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------------*/

// Variables
let previousScrollPosition = window.pageYOffset;
let string_idFooterSpan = "current-date";
const currentHtml = document.currentScript.getAttribute("currentHtml");         // Get file name of HTML that is calling this script.js

//console.log(`currentHtml: ${currentHtml}`);


// Only create these variables or objects when executing script.js from certain html files
if (currentHtml=="mark_to_grade_converter_page.html") {
  // Input Element Objects
  myMarkInputBox = document.getElementById("mark-input-box");              // Initializing without declaration (on purpose) to make it a global variable
  
  // Output Element Objects
  myGradeOutputBox = document.getElementById("grade-output-box");              // Initializing without declaration (on purpose) to make it a global variable
  
  // BUTTON Element Objects
  myButtonMarkInput = document.getElementById("button-mark-input");            // Initializing without declaration (on purpose) to make it a global variable
}

if (currentHtml=="staff_information_page.html") {
  dataSet = [   
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
  ];

  myTbodyTableStaffInfo = document.getElementById("tbody-table-staff-info");

  // BUTTON Element Objects
  myButtonSortName = document.getElementById("button-sort-name");            // Initializing without declaration (on purpose) to make it a global variable
  myButtonSortSalary = document.getElementById("button-sort-salary");            // Initializing without declaration (on purpose) to make it a global variable
}


if (currentHtml=="temperature_converter_page.html") {
    
  // Input Element Objects
  myFahrenheitInputBox = document.getElementById("fahrenheit-input-box");              // Initializing without declaration (on purpose) to make it a global variable
  
  // Output Element Objects
  myCelsiusOutputBox = document.getElementById("celsius-output-box");
  myKelvinOutputBox = document.getElementById("kelvin-output-box");              // Initializing without declaration (on purpose) to make it a global variable
  
  // BUTTON Element Objects
  myButtonTemperatureInput = document.getElementById("button-temperature-input");            // Initializing without declaration (on purpose) to make it a global variable
}

/*----------------------------------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------- FUNCTIONS ---------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------------*/


/**
 * Function to hide navbar when scrolling down and show navbar when scrolling up.
 */
function functionAnimateNavbar() {
var currentScrollPosition = window.pageYOffset;
  if (previousScrollPosition > currentScrollPosition) {
    document.getElementById("navbar").style.top = "0";
  }
  else {
    document.getElementById("navbar").style.top = "-100px";
  }
  previousScrollPosition = currentScrollPosition;
}


/**
 * Function to get current date into innerHTML of 'id' element.
 */
function functionGetCurrentDate(id) {
  document.getElementById(id).innerHTML = Date();
}


/**
 * Function to convert Mark to Grade.
 */
function functionMarkToGrade() {
  inputValue = parseInt(myMarkInputBox.value);

  console.log(inputValue);

  //Check for invalid Inputs
  if(isNaN(inputValue)) {
    alert("[INVALID INPUT ERROR] Please provide a number in the range [0 - 100] !");
    return null
  }
  else if (inputValue<0 || inputValue>100) {
    alert("[OUT OF RANGE ERROR] Please provide a number in the range [0 - 100] !");
    return null
  }

  //Check for valid Inputs
  if(inputValue>=90) {
    myGradeOutputBox.innerHTML = "A";
  }
  else if(inputValue>=80) {
    myGradeOutputBox.innerHTML = "B";
  }
  else if(inputValue>=70) {
    myGradeOutputBox.innerHTML = "C";
  }
  else if(inputValue>=50) {
    myGradeOutputBox.innerHTML = "D";
  }
  else if(inputValue<50) {
    myGradeOutputBox.innerHTML = "F";
  }

}


/**
 * Function to Display Staff Info as Table.
 */
function functionDisplayStaffTable() {
  
  console.table(dataSet);

  //clear tbody of table
  myTbodyTableStaffInfo.innerHTML = "";

  //build content to put into tbody
  let textContent = "";
  for(i=0; i<dataSet.length; i++) {
    textContent += `<tr><td>${dataSet[i][0]}</td><td>${dataSet[i][1]}</td><td>${dataSet[i][2]}</td><td>${dataSet[i][3]}</td><td>${dataSet[i][4]}</td><td>${dataSet[i][5]}</td></tr>`
  }
  myTbodyTableStaffInfo.innerHTML = textContent;
}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table-staff-info");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



/**
 * Function to Convert Temperature in Fahrenheit to Celsius.
 */
function functionConvertTemperature() {
 
  inputFloatFahrenheit = parseFloat(myFahrenheitInputBox.value);

  outputFloatCelsius = (inputFloatFahrenheit - 32) * 5 / 9;
  outputFloatKelvin = outputFloatCelsius + 273.15;

  myCelsiusOutputBox.innerHTML = outputFloatCelsius;
  myKelvinOutputBox.innerHTML = outputFloatKelvin;
  
  // BUTTON Element Objects
  myButtonTemperatureInput = document.getElementById("button-temperature-input");            // Initializing without declaration (on purpose) to make it a global variable


}


/*----------------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------- CALL FUNCTIONS -----------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------------*/

functionGetCurrentDate(string_idFooterSpan);

window.onscroll = functionAnimateNavbar;

// Only call these functions when executing script.js from certain html files
if (currentHtml=="mark_to_grade_converter_page.html") {
  //Link functions to events
  myButtonMarkInput.onclick = functionMarkToGrade;
}


if (currentHtml=="staff_information_page.html") {
  //Link functions to events
  window.onload = functionDisplayStaffTable;

}


if (currentHtml=="temperature_converter_page.html") {
  //Link functions to events
  myButtonTemperatureInput.onclick = functionConvertTemperature;
}