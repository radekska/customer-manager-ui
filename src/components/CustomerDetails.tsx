import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Customer} from "../models/customer";
import DeleteCustomer from "./DeleteCustomer";

interface CustomerDetailsProps {
    setCustomerDeleted: Dispatch<SetStateAction<boolean>>
}


const CustomerDetails: React.FC<CustomerDetailsProps> = (props) => {
    const customerId = useParams().id!

    const [customer, setCustomer] = useState<Customer>({first_name: "", id: "", last_name: "", telephone_number: ""});
    useEffect(() => {
        axios.get(`http://localhost:8080/api/customers/${customerId}`).then(response => setCustomer(response.data))
    }, [customerId]);


    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>Imię i nazwisko: {customer.first_name} {customer.last_name}</Card.Title>
                    <Card.Text>
                        Numer telefonu: {customer.telephone_number}
                    </Card.Text>
                    <DeleteCustomer setCustomerDeleted={props.setCustomerDeleted}/>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomerDetails