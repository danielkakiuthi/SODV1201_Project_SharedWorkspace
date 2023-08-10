const express = require('express')
const bodyParser = require('body-parser')

const fs = require("fs")  // file system 
 
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* app.use(express.json());       
app.use(express.urlencoded({extended: true}));  */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

let properties = [];
if (fs.existsSync("properties.json")) {
    let propertiesData = fs.readFileSync("properties.json", "utf-8");
    properties = JSON.parse(propertiesData);
  }

let workspaces = [];
if (fs.existsSync("workspaces.json")) {
    let workspacesData = fs.readFileSync("workspaces.json", "utf-8");
    workspaces = JSON.parse(workspacesData);
  }
 
let users = [];
if (fs.existsSync("users.json")) {
  let usersData = fs.readFileSync("users.json", "utf-8");
  users = JSON.parse(usersData);
}

app.get('/users', (req, res) => {
    let tableStruct = "<table><th>Full Name</th><th>Id</th><th>Address</th><th>Status</th><th>Fee</th>"
    for(var i = 0; i <= users.length - 1; i++){
        tableStruct += `<tr><td>${users[i].fullName}</td><td>${users[i].id}</td><td>${users[i].address}</td><td>${users[i].status}</td><td>${users[i].fee}</td></tr>`
    }
    tableStruct += "</table>"
    console.log(tableStruct)
  res.send(tableStruct)
})

app.post('/', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let verifiedUser = passwordCheck(userName, password);
    if(verifiedUser == undefined){
        res.sendFile(__dirname + '/public/index.html')
    }


    fs.writeFileSync("users.json", JSON.stringify(users));
    const data = req.body;
})

function passwordCheck(userName, password){
    for(i = 0; i < users.length; i++){
        if(userName == users[i].userName && password == users[i].password){
            return users[i]
        } 
    } 
    return undefined;
}

app.post('/userRegistration', (req, res) => {


    users.push(req.body)

    fs.writeFileSync("users.json", JSON.stringify(users));
})


 
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})