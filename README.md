# BoreDMcoding-round
Final Coding round 


# Real-Time Data Grids Web Application

This project demonstrates a simple web application that utilizes Quart for the backend, React with Vite for the frontend, and Material-UI for the UI components. The application features two Material-UI Data Grids with data being populated and updated in real-time via WebSocket connection.

## Backend Setup with Quart

### Prerequisites
- Python 3.6+
- pip

### Steps

1. **Create and activate a new Python virtual environment:**
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. **Install Quart:**
   ```bash
   pip install quart
   ```

3. **Create a file `app.py` with the following content:**
   ```python
   from quart import Quart, websocket

   app = Quart(__name__)

   @app.websocket('/ws')
   async def ws():
       while True:
           data = await websocket.receive()
           await websocket.send(f"Echo: {data}")

   if __name__ == '__main__':
       app.run()
   ```

4. **Run your Quart app:**
   ```bash
   python app.py
   ```

## Frontend Setup with React and MUI

### Prerequisites
- Node.js
- npm

### Steps

1. **Create a new React app using Vite:**
   ```bash
   npm create vite@latest my-app -- --template react
   ```

2. **Navigate to the project directory and install dependencies:**
   ```bash
   cd my-app
   npm install
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-use-websocket
   ```

3. **Replace the content of `src/App.jsx` with:**
   ```jsx
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
   ```

4. **Start the React development server:**
   ```bash
   npm run dev
   ```

## Next Steps

- Implement the Material-UI Data Grids and populate them with data from the backend.
- Implement real-time data updates using WebSockets.
- Add CRUD operations and ensure changes are reflected across all clients in real-time.
