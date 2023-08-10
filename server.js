/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------- LIBRARIES ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

const express = require('express')
const bodyParser = require('body-parser')

const fs = require("fs")  // file system 
 
const app = express()

app.use(express.static('public'))
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------- VARIABLES AND OBJECTS -------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

portNumber = 3000;

app.listen(portNumber, () => {
  console.log(`Example app listening on port ${portNumber}!`)
})


let properties = [];
if (fs.existsSync("./data/properties.json")) {
  let propertiesData = fs.readFileSync("./data/properties.json", "utf-8");
  properties = JSON.parse(propertiesData);
}

let workspaces = [];
if (fs.existsSync("./data/workspaces.json")) {
    let workspacesData = fs.readFileSync("./data/workspaces.json", "utf-8");
    workspaces = JSON.parse(workspacesData);
}
 
let users = [];
if (fs.existsSync("./data/users.json")) {
  let usersData = fs.readFileSync("./data/users.json", "utf-8");
  users = JSON.parse(usersData);
}



/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

function passwordCheck(userName, password) {
  for(i = 0; i < users.length; i++) {
    if(userName == users[i].userName && password == users[i].password) {
      return users[i]
    }
  }
  return undefined;
}



/* ------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------- API ROUTES ------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------ */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})


app.post('/', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let verifiedUser = passwordCheck(userName, password);

  if(verifiedUser == undefined){
    res.sendFile(__dirname + '/public/index.html')
  } else {
    if(verifiedUser.status == "owner"){
      res.sendFile(__dirname + '/public/homePageOwner.html')
    } else if (verifiedUser.status == "coworker"){
      res.sendFile(__dirname + '/public/homePageCoworker.html')
    }
  }

  fs.writeFileSync("./data/users.json", JSON.stringify(users));
})


app.get('/users', (req, res) => {
  let tableStruct = "<table><th>Full Name</th><th>Id</th><th>Address</th><th>Status</th><th>Fee</th>"
    
  for(var i = 0; i <= users.length - 1; i++){
    tableStruct += 
      `<tr>
        <td>${users[i].fullName}</td>
        <td>${users[i].id}</td>
        <td>${users[i].address}</td>
        <td>${users[i].status}</td>
        <td>${users[i].fee}</td>
      </tr>`
  }

  tableStruct += "</table>"
  
  console.log(tableStruct)
  res.send(tableStruct)
})


app.post('/userRegistration', (req, res) => {
  users.push(req.body)
  fs.writeFileSync("./data/users.json", JSON.stringify(users));
  res.sendFile(__dirname + '/public/index.html')
})
