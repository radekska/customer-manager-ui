import axios from "axios";
import React, {Dispatch, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";

interface DeleteCustomerProps {
    setCustomerDeleted: Dispatch<SetStateAction<boolean>>
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = (props) => {
    const customerId = useParams().id
    const deleteCustomerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log("Api call to delete")
        console.log(customerId)
        axios.delete(`http://localhost:8080/api/customers/${customerId}`).then(response => {
            console.log(response);
            props.setCustomerDeleted(true)
        }).catch(err => console.log(err))
    }

    return <Button variant="danger" onClick={deleteCustomerHandler}>Usuń klienta</Button>
}

export default DeleteCustomer