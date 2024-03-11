
from quart import Quart, websocket

app = Quart(__name__)

records = [
    {"id": 1, "name": "Record 1", "value": 100},
    {"id": 2, "name": "Record 2", "value": 200}
]

def add_record(data):
    records.append(data)

def update_record(record_id, data):
    for record in records:
        if record["id"] == record_id:
            record.update(data)
            break

def delete_record(record_id):
    global records
    records = [record for record in records if record["id"] != record_id]

@app.websocket('/ws')
async def ws():
    while True:
        message = await websocket.receive_json()
        action = message["action"]
        data = message["data"]

        if action == "add_record":
            add_record(data)
        elif action == "update_record":
            update_record(data["id"], data)
        elif action == "delete_record":
            delete_record(data["id"])

        # Broadcast the updated records to all clients
        await websocket.send_json(records)

if __name__ == '__main__':
    app.run()
