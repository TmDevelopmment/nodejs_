// const http = require('http');
// const port = 3000;
// const server = http.createServer((req, res) => {
//     if (req.method==='GET' && req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('Hello World\n');
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Not Found\n');
//     }
// });
// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });

/*
* express.js -> spring
* mongoose -> jpa
* nodemon
* dotenv
 */

const express = require('express');
const CustomerRouter = require('./routes/CustomerRoute');
const UserRouter = require('./routes/UserRoute');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require ('dotenv').config();

const serverPort = process.env.SERVER_PORT;

console.log('Server port: ', serverPort);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/TestApp');

app.listen(serverPort, () => {
    console.log(`Server running ${serverPort}`);
})

app.get('/test', (req, res) => {
    return res.json('Server working');
})

app.use('api/v1/customers/',CustomerRouter);
app.use('api/v1/users/',UserRouter);