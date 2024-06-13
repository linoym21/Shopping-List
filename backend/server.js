const http=require('http');

const app = require('./app')
const port= 8000;
const server=http.createServer(app); 


const PORT=process.env.PORT||3000;
server.listen(PORT,()=> console.log("server is runing on port 3000"));