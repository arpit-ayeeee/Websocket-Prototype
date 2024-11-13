//Using HTTP
import WebSocket, {WebSocketServer} from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
    console.log((new Date()) + 'Recived request for ' + request.url);
    response.end("Hi");
});

const wss = new WebSocketServer({server});

let userCount = 0;

// wss.on: Anytime there is a connection, control reaches the inner callback function
wss.on("connection", function connection(socket: WebSocket) {
    //If there is error in connection, log it
    socket.on("error", (err) => console.error(err)); //Event Register

    //Else if there is a message, control reaches inner callback
    socket.on("message", function message(data, isBinary) {

        //So for every client, that is open now, broadcast the message
        //This is a basic use case (naive implementation), there can be other too
        wss.clients.forEach(function each(client) {

            if(client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    console.log("User connection", ++userCount);
    socket.send("Hi, message from server"); //Event Register
});


server.listen(8080, function () {
    console.log((new Date()) + 'Server is listening on localhost:8080');
});


//Using ExpressJS

// import express from 'express'
// import { WebSocketServer } from 'ws'

// const app = express()
// const httpServer = app.listen(8080)

// const wss = new WebSocketServer({ server: httpServer });

// wss.on('connection', function connection(ws) {
//   socket.on('error', console.error);

//   socket.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });

//   socket.send('Hello! Message From Server!!');
// });