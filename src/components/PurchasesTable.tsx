import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import React from "react";

const columns: GridColDef[] = [
    {field: 'frameModel', headerName: 'Model Oprawki', width: 120, editable: true, },
    {field: 'lensType', headerName: 'Rodzaj Szkieł', resizable: true},
    {field: 'lensPower', headerName: 'Moce Szkieł', width: 120},
    {field: 'pd', headerName: 'PD',width: 50},
    {field: 'lensPower', headerName: 'Moce Szkieł'},
    {field: 'createdAt', headerName: 'Data Zakupu', type: "dateTime", width: 200, valueGetter: (params: GridValueGetterParams) => new Date(params.value)}
];

const rows = [
    {
        id: "26e0bce4-a47b-433c-b8eb-d2cb05f1d537",
        frameModel: "Oprawka",
        lensType: "Szkło",
        lensPower: "10",
        pd: "2",
        // customer_id: "63535833-305b-4050-a028-701b333b37d9",
        createdAt: "2021-01-01T00:00:00Z"
    },
    {
        id: "26e0bce4-a47b-433c-b8eb-d2cb05f1d5375",
        frameModel: "Oprawka",
        lensType: "Szkło",
        lensPower: "10",
        pd: "2",
        // customer_id: "63535833-305b-4050-a028-701b333b37d9",
        createdAt: "2002-01-01T00:00:00Z"
    }
]

const PurchasesTable: React.FC = () => {
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </div>
    );
}

export default PurchasesTable