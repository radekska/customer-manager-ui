import {DataGrid, GridColDef, GridRowId, GridToolbarContainer, GridValueGetterParams} from '@mui/x-data-grid';
import React, {useEffect} from "react";
import {State} from "../redux/reducers/root";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {deletePurchase, listPurchases, PurchasesListStatus} from '../redux/reducers/purchases';
import {Button, IconButton} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';
import {Card} from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import {DeleteStatus} from "../redux/reducers/customers";


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

const selectDeleteStatus = (state: State) => state.purchases.purchaseDeleteStatus


const PurchasesTable: React.FC = () => {
    const customerId = useParams().id!
    const dispatch = useDispatch();

    const editPurchaseHandler = (event: any) => {
        console.log(event) // TODO - implement
    }
    const deletePurchaseHandler = (purchaseId: GridRowId) => {
        console.log(purchaseId.toString(), customerId)
        const deletePurchaseThunk = deletePurchase(customerId, purchaseId.toString())
        // @ts-ignore
        dispatch(deletePurchaseThunk)
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
        {field: 'lens_power', headerName: 'Moce szkieł', width: 120, editable: true},
        {field: 'frame_model', headerName: 'Model oprawki', width: 150, editable: true,},
        {field: 'lens_type', headerName: 'Rodzaj szkieł', width: 150, editable: true},
        {field: 'pd', headerName: 'PD', width: 50, editable: true},
        {field: 'purchase_type', headerName: 'Rodzaj zakupu', width: 100},
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
    const deleteStatus = useSelector(selectDeleteStatus)

    const showErrorLabel = () => {
        if (deleteStatus === DeleteStatus.FAILED) {
            return <Alert key="danger" severity="error">Wystąpił błąd w usuwaniu zakupu</Alert>
        }
    }
    const showSuccessfulLabel = () => {
        if (deleteStatus === DeleteStatus.SUCCESS) {
            return <Alert key="success" severity="success">Zakup usunięty poprawnie</Alert>
        }
    }

    return (
        <Card>
            {showErrorLabel()}
            {showSuccessfulLabel()}
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={purchases}
                    columns={columns}
                    checkboxSelection={false}
                    editMode="row"
                    loading={(() => {
                        return listStatus === PurchasesListStatus.LOADING
                    })()}
                    slots={{
                        toolbar: () => AddPurchaseToolbar(customerId)
                    }}
                />
            </div>
        </Card>
    );
}


export default PurchasesTable
