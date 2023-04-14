import {DataGrid, GridColDef, GridToolbarContainer, GridValueGetterParams} from '@mui/x-data-grid';
import React, {useEffect} from "react";
import {State} from "../redux/reducers/root";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {listPurchases, PurchasesListStatus} from '../redux/reducers/purchases';
import {Button, IconButton} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';


const selectPurchases = (state: State) => state.purchases.entities
const selectListStatus = (state: State) => state.purchases.purchasesListStatus


function AddPurchaseToolbar(customerId: string) {
    const path = `/customers/${customerId}/purchase/add`
    return (
        <GridToolbarContainer>
            <Link to={path}>
                <Button color="success" startIcon={<Add/>}>
                    Dodaj zakup
                </Button>
            </Link>
        </GridToolbarContainer>
    );
}

const PurchasesTable: React.FC = () => {
    const customerId = useParams().id!
    const dispatch = useDispatch();

    const editPurchaseHandler = (event: any) => {
        console.log(event) // TODO - implement
    }
    const deletePurchaseHandler = (event: any) => {
        console.log(event) // TODO - implement
    }


    useEffect(() => {
            const listPurchasesThunk = listPurchases(customerId)
            // @ts-ignore
            dispatch(listPurchasesThunk)
        }
        , [customerId, dispatch])

    const purchases = useSelector(selectPurchases)
    const listStatus = useSelector(selectListStatus)

    const columns: GridColDef[] = [
        {field: 'frame_model', headerName: 'Model Oprawki', width: 150, editable: true,},
        {field: 'lens_type', headerName: 'Rodzaj Szkieł', width: 150, editable: true},
        {field: 'lens_power', headerName: 'Moce Szkieł', width: 120, editable: true},
        {field: 'pd', headerName: 'PD', width: 50, editable: true},
        {
            field: 'created_at',
            headerName: 'Data Zakupu',
            type: "dateTime",
            width: 200,
            valueGetter: (params: GridValueGetterParams) => new Date(params.value),
            editable: true
        },
        {
            field: '',
            headerName: '',
            flex: 1,
            renderCell: (params) => (
                <React.Fragment>
                    <IconButton onClick={() => deletePurchaseHandler(params.id)}>
                        <Delete/>
                    </IconButton>
                </React.Fragment>
            ),
        },
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={purchases}
                columns={columns}
                checkboxSelection
                editMode="row"
                loading={(() => {
                    return listStatus === PurchasesListStatus.LOADING
                })()}
                slots={{
                    toolbar: () => AddPurchaseToolbar(customerId)
                }}
            />
        </div>
    );
}


export default PurchasesTable