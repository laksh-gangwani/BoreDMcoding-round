
import React from 'react';
import { Button } from '@mui/material';
import useWebSocket from 'react-use-websocket';

function App() {
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:5000/ws');

  return (
    <div className="App">
      <Button variant="contained" onClick={() => sendMessage('Hello, server!')}>
        Send Message to Server
      </Button>
      <p>Last message from server: {lastMessage?.data}</p>
    </div>
  );
}

export default App;
