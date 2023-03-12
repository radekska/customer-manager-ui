import React from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {deleteCustomer} from "../reducers/root";
import {useDispatch} from "react-redux";


const DeleteCustomer: React.FC = () => {
    const customerId = useParams().id!
    const dispatch = useDispatch()

    const deleteCustomerHandler = (event: React.MouseEvent<HTMLButtonElement>, customerId: string) => {
        event.preventDefault()
        const deleteCustomerThunk = deleteCustomer(customerId)
        // @ts-ignore
        dispatch(deleteCustomerThunk)
    }

    return <Button variant="danger" onClick={(event) => {deleteCustomerHandler(event,customerId)}}>Usuń klienta</Button>
}

export default DeleteCustomer