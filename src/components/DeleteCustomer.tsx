import axios from "axios";
import React, {Dispatch, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";


const DeleteCustomer: React.FC = () => {
    const customerId = useParams().id
    const deleteCustomerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        axios.delete(`http://localhost:8080/api/customers/${customerId}`).then(response => {
            console.log(response);
        }).catch(err => console.log(err))
    }

    return <Button variant="danger" onClick={deleteCustomerHandler}>Usuń klienta</Button>
}

export default DeleteCustomer