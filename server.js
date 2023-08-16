/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------- LIBRARIES ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

const express = require(`express`);
const bodyParser = require(`body-parser`);

const fs = require(`fs`);
 
const app = express();

app.use(express.static(`public`));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------- VARIABLES AND OBJECTS -------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

// Create variables
portNumber = 3000;
let verifiedUser;
let counterIndexUser = 0;
let counterIndexProperty = 0;
let counterIndexWorkspace = 0;
let properties = [];
let workspaces = [];
let users = [];

//Update values of variables if they already exist as local files
counterIndexUser = loadLocalFileIfExists(`value`, `counterIndexUser.json`)
counterIndexProperty = loadLocalFileIfExists(`value`, `counterIndexProperty.json`)
counterIndexWorkspace = loadLocalFileIfExists(`value`, `counterIndexWorkspace.json`)
properties = loadLocalFileIfExists(`list`, `properties.json`)
workspaces = loadLocalFileIfExists(`list`, `workspaces.json`)
users = loadLocalFileIfExists(`list`, `users.json`)


app.listen(portNumber, () => {
  console.log(`Example app listening on port ${portNumber}!`);
})


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

function loadLocalFileIfExists(variableType, filename) {
  let output;
  if (fs.existsSync(`./data/${filename}`)) {
    let dataTemp = fs.readFileSync(`./data/${filename}`, `utf-8`);
    output = JSON.parse(dataTemp);
  } else if (variableType==`value`) {
    output = 0;
  }
  else if (variableType==`list`) {
    output = [];
  }

  return output
}


function saveLocalFileOverwrite(variable, filename) {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(variable));
}


function validateUserAndPassword(username, password, status) {
  for(i = 0; i < users.length; i++) {
    if(username == users[i].username && password == users[i].password && status == users[i].status) {
      return users[i];
    }
  }
  return undefined;
}



/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------- API ROUTES ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

app.get(`/`, (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
})



app.post(`/loginOwner`, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let status = req.body.status;
  verifiedUser = validateUserAndPassword(username, password, status);

  if(verifiedUser != undefined){
    saveLocalFileOverwrite(verifiedUser, `verifiedUser.json`);
    res.sendFile(`${__dirname}/public/homepageOwnerPage.html`);
  } else {
    res.sendFile(`${__dirname}/public/index.html`);
  }

})



app.post(`/loginCoworker`, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let status = req.body.status;
  verifiedUser = validateUserAndPassword(username, password, status);

  if(verifiedUser != undefined){
    saveLocalFileOverwrite(verifiedUser, `verifiedUser.json`);
    res.sendFile(`${__dirname}/public/homepageCoworkerPage.html`);
  } else {
    res.sendFile(`${__dirname}/public/index.html`);
  }

})



app.post(`/logout`, (req, res) => {
  
  verifiedUser = {};

  saveLocalFileOverwrite(verifiedUser, `verifiedUser.json`);

  res.sendFile(`${__dirname}/public/index.html`);

})



app.post(`/registrationUser`, (req, res) => {

  let newUser = req.body;

  //Add first user to users list.
  if(users.length==0){
    newUser.indexUser = counterIndexUser++;
    users.push(newUser);
  }

  //Check if username is already registered.
  for(let i=0; i<users.length; i++) {
    if(users[i].username!=newUser.username) {
      newUser.indexUser = counterIndexUser++;
      users.push(newUser);
    }
  }

  saveLocalFileOverwrite(users, `users.json`);
  saveLocalFileOverwrite(counterIndexUser, `counterIndexUser.json`);
  res.sendFile(`${__dirname}/public/index.html`);
})



app.post(`/registrationProperty`, (req, res) => {

  let newProperty = req.body;

  newProperty.indexProperty = counterIndexProperty++;
  newProperty.indexUser = verifiedUser.indexUser;
  properties.push(newProperty);

  saveLocalFileOverwrite(properties, `properties.json`);
  saveLocalFileOverwrite(counterIndexProperty, `counterIndexProperty.json`);
  res.sendFile(`${__dirname}/public/homepageOwnerPage.html`);
})


app.post(`/registrationWorkspace`, (req, res) => {


  let newWorkspace = req.body;

  newWorkspace.indexWorkspace = counterIndexWorkspace++;
  newWorkspace.indexUser = verifiedUser.indexUser;
  newWorkspace.isRented = false;

  workspaces.push(newWorkspace);

  saveLocalFileOverwrite(workspaces, `workspaces.json`);
  saveLocalFileOverwrite(counterIndexWorkspace, `counterIndexWorkspace.json`);
  res.sendFile(`${__dirname}/public/homepageOwnerPage.html`);
})



app.post(`/editProperty`, (req, res) => {

  let editProperty = req.body;
  let indexPropertyToDelete = req.body.indexProperty;

  editProperty.indexUser = verifiedUser.indexUser;
  
  for(let i=0; i<properties.length; i++) {
    if(properties[i].indexProperty==indexPropertyToDelete) {
      properties.splice(i, 1);
    }
  }

  properties.push(editProperty);
  
  saveLocalFileOverwrite(properties, `properties.json`);
  res.sendFile(`${__dirname}/public/myPropertiesPage.html`);

})



app.post(`/deleteProperty`, (req, res) => {

  let indexPropertyToDelete = req.body.indexProperty;

  for(let i=properties.length-1; i>=0; i--) {
    if(properties[i].indexProperty==indexPropertyToDelete) {
      properties.splice(i, 1);
    }
  }

  for(let i=workspaces.length-1; i>=0; i--) {
    if(workspaces[i].indexProperty==indexPropertyToDelete) {
      workspaces.splice(i, 1);
    }
  }

  saveLocalFileOverwrite(properties, `properties.json`);
  saveLocalFileOverwrite(workspaces, `workspaces.json`);
  res.sendFile(`${__dirname}/public/myPropertiesPage.html`);

})


app.post(`/editWorkspace`, (req, res) => {

  let editWorkspace = req.body;
  let indexWorkspaceToDelete = req.body.indexWorkspace;

  editWorkspace.indexUser = verifiedUser.indexUser;
  
  for(let i=0; i<workspaces.length; i++) {
    if(workspaces[i].indexWorkspace==indexWorkspaceToDelete) {
      workspaces.splice(i, 1);
    }
  }

  workspaces.push(editWorkspace);

  saveLocalFileOverwrite(workspaces, `workspaces.json`);
  res.sendFile(`${__dirname}/public/myWorkspacesPage.html`);
})



app.post(`/deleteWorkspace`, (req, res) => {

  let indexWorkspaceToDelete = req.body.indexWorkspace;

  for(let i=workspaces.length-1; i>=0; i--) {
    if(workspaces[i].indexWorkspace==indexWorkspaceToDelete) {
      workspaces.splice(i, 1);
    }
  }

  saveLocalFileOverwrite(workspaces, `workspaces.json`);
  res.sendFile(`${__dirname}/public/myWorkspacesPage.html`);
})



app.get(`/allUsers`, (req, res) => {
  let responseObj = `{"tableUsers": "<table><th>indexUser</th><th>username</th><th>password</th><th>fullname</th><th>phone</th><th>email</th>`;
  for(var i = 0; i <= users.length - 1; i++){
    responseObj += `<tr><td>${users[i].indexUser}</td>`;
    responseObj += `<td>${users[i].username}</td>`;
    responseObj += `<td>${users[i].password}</td>`;
    responseObj += `<td>${users[i].fullname}</td>`;
    responseObj += `<td>${users[i].phone}</td>`;
    responseObj += `<td>${users[i].email}</td></tr>`;
  }
  responseObj += `</table>"}`;
  console.log(responseObj);
  res.send(responseObj);
})



app.get(`/myProperties`, (req, res) => {

  let responseObj = `{"tableProperties": "`
  if(properties.length>0) {
    responseObj += `<table><th>indexProperty</th><th>address</th><th>neighborhood</th><th>squareFeet</th><th>hasParkingGarage</th><th>isReachableByPublicTransportation</th><th>Count Workspaces</th>`;
    for(var i = 0; i<properties.length; i++){
      if(verifiedUser.indexUser==properties[i].indexUser){

        var counter = 0;
        for(var j=0; j<workspaces.length; j++) {
          if(properties[i].indexProperty==workspaces[j].indexProperty) {
            counter++;
          }
        }

        responseObj += `<tr>`;
        responseObj += `<td>${properties[i].indexProperty}</td>`;
        responseObj += `<td>${properties[i].address}</td>`;
        responseObj += `<td>${properties[i].neighborhood}</td>`;
        responseObj += `<td>${properties[i].squareFeet}</td>`;
        responseObj += `<td>${properties[i].hasParkingGarage}</td>`;
        responseObj += `<td>${properties[i].isReachableByPublicTransportation}</td>`;
        responseObj += `<td>${counter}</td>`;
        responseObj += `<td><form action='/editPropertyPage.html' method='get' id='editProperty_${properties[i].indexProperty}'>`;
        responseObj += `<input type='hidden' name='indexProperty' value='${properties[i].indexProperty}'>`
        responseObj += `<input type='hidden' name='address' value='${properties[i].address}'>`
        responseObj += `<input type='hidden' name='neighborhood' value='${properties[i].neighborhood}'>`
        responseObj += `<input type='hidden' name='squareFeet' value='${properties[i].squareFeet}'>`
        responseObj += `<input type='hidden' name='hasParkingGarage' value='${properties[i].hasParkingGarage}'>`
        responseObj += `<input type='hidden' name='isReachableByPublicTransportation' value='${properties[i].isReachableByPublicTransportation}'>`
        responseObj += `<button type='submit' form='editProperty_${properties[i].indexProperty}' value='editProperty'>Edit</button>`;
        responseObj += `</form></td>`;
        responseObj += `<td><form action='/deleteProperty' method='post' id='deleteProperty_${properties[i].indexProperty}'>`;
        responseObj += `<input type='hidden' name='indexProperty' value='${properties[i].indexProperty}'>`
        responseObj += `<button type='submit' form='deleteProperty_${properties[i].indexProperty}' value='deleteProperty'>Delete</button>`;
        responseObj += `</form></td>`;
        responseObj += `<td><form action='/registrationWorkspacePage.html' method='get' id='registerNewWorkspace_${properties[i].indexProperty}'>`;
        responseObj += `<input type='hidden' name='indexProperty' value='${properties[i].indexProperty}'>`
        responseObj += `<button type='submit' form='registerNewWorkspace_${properties[i].indexProperty}' value='registerNewWorkspace'>Register New Workspace</button>`;
        responseObj += `</form></td>`;
        responseObj += `</tr>`;
      }
    }
    responseObj += `</table>`;
  }
  responseObj += `"}`;
  
  console.log(responseObj);
  res.send(responseObj);
})



app.get(`/myWorkspaces`, (req, res) => {
  let responseObj = `{"tableWorkspaces": "<table><th>indexProperty</th><th>indexWorkspace</th><th>type</th><th>numberOccupants</th><th>allowedSmoking</th><th>availabilityDate</th><th>leaseTerm</th><th>price</th><th>isRented</th>`;
  for(var i = 0; i<workspaces.length; i++){
    if(verifiedUser.indexUser==workspaces[i].indexUser){
      responseObj += `<tr>`;
      responseObj += `<td>${workspaces[i].indexProperty}</td>`;
      responseObj += `<td>${workspaces[i].indexWorkspace}</td>`;
      responseObj += `<td>${workspaces[i].type}</td>`;
      responseObj += `<td>${workspaces[i].numberOccupants}</td>`;
      responseObj += `<td>${workspaces[i].allowedSmoking}</td>`;
      responseObj += `<td>${workspaces[i].availabilityDate}</td>`;
      responseObj += `<td>${workspaces[i].leaseTerm}</td>`;
      responseObj += `<td>${workspaces[i].price}</td>`
      responseObj += `<td>${workspaces[i].isRented}</td>`
      responseObj += `<td><form action='/editWorkspacePage.html' method='get' id='editWorkspace_${workspaces[i].indexWorkspace}'>`;
      responseObj += `<input type='hidden' name='indexProperty' value='${workspaces[i].indexProperty}'>`
      responseObj += `<input type='hidden' name='indexWorkspace' value='${workspaces[i].indexWorkspace}'>`
      responseObj += `<input type='hidden' name='type' value='${workspaces[i].type}'>`
      responseObj += `<input type='hidden' name='numberOccupants' value='${workspaces[i].numberOccupants}'>`
      responseObj += `<input type='hidden' name='allowedSmoking' value='${workspaces[i].allowedSmoking}'>`
      responseObj += `<input type='hidden' name='availabilityDate' value='${workspaces[i].availabilityDate}'>`
      responseObj += `<input type='hidden' name='leaseTerm' value='${workspaces[i].leaseTerm}'>`
      responseObj += `<input type='hidden' name='price' value='${workspaces[i].price}'>`
      responseObj += `<input type='hidden' name='isRented' value='${workspaces[i].isRented}'>`
      responseObj += `<button type='submit' form='editWorkspace_${workspaces[i].indexWorkspace}' value='editWorkspace'>Edit</button>`;
      responseObj += `</form></td>`;
      responseObj += `<td><form action='/deleteWorkspace' method='post' id='deleteWorkspace_${workspaces[i].indexWorkspace}'>`;
      responseObj += `<input type='hidden' name='indexWorkspace' value='${workspaces[i].indexWorkspace}'>`
      responseObj += `<button type='submit' form='deleteWorkspace_${workspaces[i].indexWorkspace}' value='deleteWorkspace'>Delete</button>`;
      responseObj += `</form></td>`;
      responseObj += `</tr>`;
    }
  }
  responseObj += `</table>"}`;
  console.log(responseObj);
  res.send(responseObj);
})




app.get(`/availableWorkspaces`, (req, res) => {
  let responseObj = `{"tableAvailableWorkspaces": "<table id='table-available-workspaces'>`;
  responseObj += `<th><button onclick='sortTableByNumber(0)'>indexProperty</button></th>`;
  responseObj += `<th><button onclick='sortTableByNumber(1)'>indexWorkspace</button></th>`;
  responseObj += `<th><button onclick='sortTableByText(2)'>type</button></th>`;
  responseObj += `<th><button onclick='sortTableByNumber(3)'>numberOccupants</button></th>`;
  responseObj += `<th><button onclick='sortTableByText(4)'>allowedSmoking</button></th>`;
  responseObj += `<th><button onclick='sortTableByText(5)'>availabilityDate</button></th>`;
  responseObj += `<th><button onclick='sortTableByText(6)'>leaseTerm</button></th>`;
  responseObj += `<th><button onclick='sortTableByNumber(7)'>price</button></th>`;  
  
  for(var i = 0; i<workspaces.length; i++){
    if(workspaces[i].isRented==false){
      responseObj += `<tr>`;
      responseObj += `<td>${workspaces[i].indexProperty}</td>`;
      responseObj += `<td>${workspaces[i].indexWorkspace}</td>`;
      responseObj += `<td>${workspaces[i].type}</td>`;
      responseObj += `<td>${workspaces[i].numberOccupants}</td>`;
      responseObj += `<td>${workspaces[i].allowedSmoking}</td>`;
      responseObj += `<td>${workspaces[i].availabilityDate}</td>`;
      responseObj += `<td>${workspaces[i].leaseTerm}</td>`;
      responseObj += `<td>${Number(workspaces[i].price)}</td>`
      responseObj += `<td><form action='/editWorkspacePage.html' method='get' id='editWorkspace_${workspaces[i].indexWorkspace}'>`;
      responseObj += `<input type='hidden' name='indexProperty' value='${workspaces[i].indexProperty}'>`
      responseObj += `<input type='hidden' name='indexWorkspace' value='${workspaces[i].indexWorkspace}'>`
      responseObj += `<input type='hidden' name='type' value='${workspaces[i].type}'>`
      responseObj += `<input type='hidden' name='numberOccupants' value='${workspaces[i].numberOccupants}'>`
      responseObj += `<input type='hidden' name='allowedSmoking' value='${workspaces[i].allowedSmoking}'>`
      responseObj += `<input type='hidden' name='availabilityDate' value='${workspaces[i].availabilityDate}'>`
      responseObj += `<input type='hidden' name='leaseTerm' value='${workspaces[i].leaseTerm}'>`
      responseObj += `<input type='hidden' name='price' value='${workspaces[i].price}'>`
      responseObj += `<button type='submit' form='editWorkspace_${workspaces[i].indexWorkspace}' value='editWorkspace'>Edit</button>`;
      responseObj += `</form></td>`;
      responseObj += `<td><form action='/deleteWorkspace' method='post' id='deleteWorkspace_${workspaces[i].indexWorkspace}'>`;
      responseObj += `<input type='hidden' name='indexWorkspace' value='${workspaces[i].indexWorkspace}'>`
      responseObj += `<button type='submit' form='deleteWorkspace_${workspaces[i].indexWorkspace}' value='deleteWorkspace'>Delete</button>`;
      responseObj += `</form></td>`;
      responseObj += `</tr>`;
    }
  }
  responseObj += `</table>"}`;
  console.log(responseObj);
  res.send(responseObj);
})
