const http=require('http');
const port= 8000;
const app = require('./app')
//function that manage the server, the function get another function with 2 argument: 1- reqast 2-response. 
//every time someone call my server i send him 2 things: 1: header with metadata 200 to ok (their is 404 - not found and more) and type of the data in body.
// 2: body with messge
const server=http.createServer(app); 

server.listen(port);