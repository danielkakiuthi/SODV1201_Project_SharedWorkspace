const express = require('express')
const bodyParser = require('body-parser')

const fs = require("fs")  // file system 
 
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* app.use(express.json());       
app.use(express.urlencoded({extended: true}));  */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
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
    let fullName = req.body.fullName;
    let id = req.body.id;
    let address = req.body.address;
    let status = req.body.status;
    if (status == 'student') {
        res.send("<h4>You are registered! <br> As a student you will have to pay $10 at the entrance! :)</h4>");
    } else if (status == 'staff') {
        res.send("<h4>You are registered! <br> As a staff member you will have to pay $50 at the entrance! :)</h4>");
    } else if (status == 'volunteer') {
        res.send("<h4>You are registered! <br> As a volunteer you won't have to pay! :)</h4>");
    }

    users.push(req.body);

    fs.writeFileSync("users.json", JSON.stringify(users));
    const data = req.body;
})


 
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})