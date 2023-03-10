import React from "react";
import {Button, Card, Col} from "react-bootstrap";
import {Customer} from "../models/customer";
import {useParams} from "react-router-dom";

interface CustomerDetailsProps {
    customers: Customer[]
}

const CustomerDetails: React.FC<CustomerDetailsProps> = (props) => {
    const customerId = useParams().id
    const customer = props.customers.find(customer => customer.id === customerId)!

    // TODO here I will call backend API for fetching customer details (no need to pass list of customers here)

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>{customer.first_name} {customer.last_name}</Card.Title>
                    <Card.Text>
                        Telephone number: {customer.telephone_number}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomerDetails