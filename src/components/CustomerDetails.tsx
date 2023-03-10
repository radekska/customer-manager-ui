import React, {useEffect, useState} from "react";
import {Button, Card, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Customer} from "../models/customer";


const CustomerDetails: React.FC = () => {
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
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomerDetails