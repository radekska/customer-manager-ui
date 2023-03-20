import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../redux/reducers/root";
import {useParams} from "react-router-dom";
import {listPurchases, PurchasesListStatus} from "../redux/reducers/purchases";
import {CustomerListStatus} from "../redux/reducers/customers";
import {Spinner} from "react-bootstrap";

const columns: GridColDef[] = [
    {field: 'frame_model', headerName: 'Model Oprawki', width: 150, editable: true,},
    {field: 'lens_type', headerName: 'Rodzaj Szkieł', width: 150},
    {field: 'lens_power', headerName: 'Moce Szkieł', width: 120},
    {field: 'pd', headerName: 'PD', width: 50},
    {
        field: 'created_at',
        headerName: 'Data Zakupu',
        type: "dateTime",
        width: 200,
        valueGetter: (params: GridValueGetterParams) => new Date(params.value)
    }
];

const selectPurchases = (state: State) => state.purchases.entities
const selectListStatus = (state: State) => state.purchases.purchasesListStatus


const PurchasesTable: React.FC = () => {
    const customerId = useParams().id!
    const dispatch = useDispatch();

    useEffect(() => {
            const listPurchasesThunk = listPurchases(customerId)
            // @ts-ignore
            dispatch(listPurchasesThunk)
        }
        , [customerId, dispatch])

    const purchases = useSelector(selectPurchases)
    const listStatus = useSelector(selectListStatus)

    function renderLoader() {
        if (listStatus === PurchasesListStatus.LOADING) {
            return <Spinner animation="border" className="list-customers-loading-spinner"/>
        }
    }


    return (
        <div style={{height: 400, width: '100%'}}>
            {renderLoader()}
            <DataGrid
                rows={purchases}
                columns={columns}
                checkboxSelection
            />
        </div>
    );
}

export default PurchasesTable