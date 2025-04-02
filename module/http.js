const fs = require('fs');
const http = require('http');




const server = http.createServer((req,res)=>{

    res.({message :'Hello from the server side'});
});



server.listen(3000, '127.0.0.1',()=>{
    console.log( "Server is listening on port 3000")
});