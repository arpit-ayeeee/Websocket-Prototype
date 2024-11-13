"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Using HTTP
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(function (request, response) {
    console.log((new Date()) + 'Recived request for ' + request.url);
    response.end("Hi");
});
const wss = new ws_1.WebSocketServer({ server });
let userCount = 0;
// wss.on: Anytime there is a connection, control reaches the inner callback function
wss.on("connection", function connection(socket) {
    //If there is error in connection, log it
    socket.on("error", (err) => console.error(err)); //Event Register
    //Else if there is a message, control reaches inner callback
    socket.on("message", function message(data, isBinary) {
        //So for every client, that is open now, broadcast the message
        //This is a basic use case, there can be other too
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
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
