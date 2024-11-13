# React WebSocket App

## Overview

This is a basic React application that demonstrates how to use WebSockets to communicate with a server. The app connects to a WebSocket server, sends messages to the server, and receives messages in real time.

## Features

- Establishes a WebSocket connection to a server.
- Sends messages from the client to the server.
- Displays messages received from the WebSocket server.

## Project Structure

```plaintext
src/
├── App.css       # Basic styles for the app
├── App.tsx       # Main React component with WebSocket implementation
└── index.tsx     # Entry point for the React app
```

## Requirements

- **React**: This app uses React (with TypeScript) as the frontend framework.
- **WebSocket Server**: A WebSocket server running locally at `ws://localhost:8080` is required for the app to work.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   Before running the app, install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Start the React App**
   Run the following command to start the app locally:
   ```bash
   npm start
   ```

4. **Run WebSocket Server**
   Ensure you have a WebSocket server running at `ws://localhost:8080` for the app to connect to.

## How It Works

1. **WebSocket Initialization**:
   The `useEffect` hook is used to initialize a WebSocket connection when the app is loaded. It connects to the WebSocket server at `ws://localhost:8080`.

   ```ts
   useEffect(() => {
     const socket = new WebSocket('ws://localhost:8080');
     socket.onopen = () => { setSocket(socket); };
     socket.onmessage = (event) => { setLastMessage(event.data); };
   }, []);
   ```

2. **Sending Messages**:
   The app provides an input field for the user to type a message. When the user clicks the **Send Message** button, the message is sent to the WebSocket server.

   ```ts
   <button onClick={() => socket.send(val)}>Send Message</button>
   ```

3. **Receiving Messages**:
   When a message is received from the WebSocket server, it is stored in the `lastMessage` state and displayed in the UI.

   ```ts
   socket.onmessage = (event) => { setLastMessage(event.data); };
   ```

## Usage

1. **Connect to WebSocket**: Upon loading the app, the client will automatically try to connect to the WebSocket server.

2. **Send Messages**: Enter a message in the input field and click the "Send Message" button to send the message to the server.

3. **Receive Messages**: The app will display any message received from the server in real-time below the input field.

## Example

- **Input**: The user types "Hello" and clicks send.
- **Output**: The app sends "Hello" to the WebSocket server and displays any response from the server.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **WebSocket**: A native browser API for creating WebSocket connections.