
from quart import Quart, websocket

app = Quart(__name__)

@app.websocket('/ws')
async def ws():
    while True:
        data = await websocket.receive()
        await websocket.send(f"Echo: {data}")

if __name__ == '__main__':
    app.run()
