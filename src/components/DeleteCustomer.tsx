import React from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteCustomer} from "../redux/reducers/customers";


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