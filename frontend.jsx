
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useWebSocket from 'react-use-websocket';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'value', headerName: 'Value', width: 150 },
];

function useRealTimeDataGrid() {
    const [records, setRecords] = React.useState([]);
    const { sendMessage, lastJsonMessage } = useWebSocket('ws://localhost:5000/ws', {
        onOpen: () => console.log('WebSocket Connected'),
        onClose: () => console.log('WebSocket Disconnected'),
        onMessage: () => {
            if (lastJsonMessage) {
                setRecords(lastJsonMessage);
            }
        },
        shouldReconnect: (closeEvent) => true,
    });

    return { records, sendMessage };
}

function MyDataGrid() {
    const { records, sendMessage } = useRealTimeDataGrid();

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={records}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default MyDataGrid;
