// Import modules
const express = require('express');                     //webserver for restful apis
const bodyParser = require('body-parser');              //make it possible to read incoming post request
const fs = require("fs");                               // file system

const app = express();

app.use(bodyParser.json());                             // create a middleware that only parse json
app.use(bodyParser.urlencoded({ extended: false }));    // The extended option allows to choose between parsing the URL-encoded data with the querystring library


//Redirect root to index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})


//Create list of users, load list of users from file if already exists
let users = [];
if (fs.existsSync("users.json")) {
  let data = fs.readFileSync("users.json", "utf-8");
  users = JSON.parse(data);
}

//Create API endpoints

app.get('/users', (req, res) => {
    res.send(users);
})


app.post('/register', (req, res) => {
    users.push(req.body);
    fs.writeFileSync("users.json", JSON.stringify(users));
    const data = req.body;
    res.send(
        `<h1>Registration successful.</h1><br><br>
        <h2>User Data Registered:</h2>
        ID: ${data.id}<br>
        Full Name: ${data.fullname}<br>
        Address: ${data.address}<br>
        Status: ${data.status}<br>
        Registration Fee ($): ${data.registrationFee}`
    );
})


//Listen on specific port for connections
const port = 8081
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})