import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [lastMessage, setLastMessage] = useState<null | string>(null);

  const [val, setVal] = useState<string>("");

  useEffect(() => {
    //Websocket is natively present in browser API's
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      setSocket(socket);
    }

    socket.onmessage = (event) => {
      console.log('Received message from server: ', event.data);
      setLastMessage(event.data);
    }

    return () => {
      socket.close();
    }

  }, []);

  if(!socket) {
    return <div>
      Connecting to socket server ...
    </div>
  }
  return (
    <>
      <input type="text" onChange={e=> setVal(e.target.value)}></input>
      <button onClick={() => socket.send(val)}>Send Message</button>
      Got message from websocket : {lastMessage}
    </>
  )
}

export default App
