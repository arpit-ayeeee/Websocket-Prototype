# WebSocket Server with HTTP and Express

## Overview

This project demonstrates how to set up a WebSocket server using both plain HTTP and Express.js. The WebSocket server broadcasts messages to all connected clients in real time. The project features two different implementations:
1. Using the `http` module to create a WebSocket server.
2. Using Express.js as the base for the WebSocket server.

## Features

- WebSocket server using the `ws` library for real-time communication.
- Broadcast messages to all connected WebSocket clients.
- Basic HTTP server setup using the `http` module.
- (Optional) Express.js-based WebSocket server setup.

## Requirements

- **Node.js** installed on your machine.
- **ws** library for WebSocket support.

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   Before running the application, install the required dependencies:
   ```bash
   npm install ws http
   ```

## How It Works

### 1. HTTP and WebSocket Server

This setup uses Node's `http` module to serve a basic HTTP server and integrates it with a WebSocket server using the `ws` library.

- **Server Initialization**: An HTTP server is created using the `http.createServer()` function. WebSocket is bound to the HTTP server.

- **WebSocket Connection Handling**:
  - When a client connects, it is registered via the `connection` event.
  - Errors are logged via the `error` event handler.
  - Messages sent by a client are broadcasted to all other connected clients using `wss.clients.forEach()`.

- **Message Broadcasting**: All active WebSocket connections receive the broadcasted messages.

### 2. Express.js and WebSocket (Optional)

This alternative implementation uses Express.js to handle HTTP requests and WebSocket connections.

- **Server Initialization**: Express.js is used to handle HTTP routes, while the WebSocket server is attached to the same underlying HTTP server.

- **Connection Handling**: Same as the plain HTTP version, with message broadcasting among all clients.

### Code Explanation

1. **HTTP Server Setup**
   ```ts
   const server = http.createServer(function (request, response) {
       console.log(`Received request for ${request.url}`);
       response.end("Hi");
   });
   ```

2. **WebSocket Server Setup**
   ```ts
   const wss = new WebSocketServer({ server });

   wss.on("connection", function connection(socket) {
       socket.on("error", (err) => console.error(err));
       socket.on("message", function message(data, isBinary) {
           wss.clients.forEach(function each(client) {
               if (client.readyState === WebSocket.OPEN) {
                   client.send(data, { binary: isBinary });
               }
           });
       });
       socket.send("Hi, message from server");
   });
   ```

3. **Starting the Server**
   ```ts
   server.listen(8080, function () {
       console.log("Server is listening on localhost:8080");
   });
   ```

## Usage

1. **Run the Server**
   Use the following command to run the server:
   ```bash
   node <file-name>.js
   ```

2. **Connecting Clients**
   Open multiple WebSocket clients (e.g., using a browser or a WebSocket client tool like `wscat` or a WebSocket tester extension) and connect them to `ws://localhost:8080`.

3. **Send and Receive Messages**
   Once clients are connected, any message sent by one client will be broadcasted to all other connected clients.

## Dependencies

- **ws**: A simple WebSocket client and server implementation.
- **http**: The default Node.js HTTP module for creating the HTTP server.
- **express (optional)**: If you want to use the Express.js version of the WebSocket server.

## Personal Notes

- Not using SocketIO, because it's harder to support multiple platforms in it(Android, IOS, Rust). We need to do socketIO implementation in Android as well as Rust.

- So it's better to use plain websocket implementation, browser also supports default websocket implementation.

- One thing to notice in websocket, that it's over an http connection. The first request that the browser makes is over an http connection, and then it gets upgraded to a websocket connection.

- tsc -b :  To compile the code in JS, in dist folder
- node dist/index.js :  To run it

- If we do not have a client, we can use https://hoppscotch.io/realtime/websocket to test it, by opening it in two tabs, connecting, and sending message from one to see it broadcast into other