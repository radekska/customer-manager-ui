import React from "react";
import {Alert, Card, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Customer} from "../models/customer";
import DeleteCustomer from "./DeleteCustomer";
import {useSelector} from "react-redux";

function selectCustomerById(customerId: string) {
    return (state: { customers: Customer[]; }) => state.customers.find(customer => customer.id === customerId)
}

const CustomerDetails: React.FC = () => {
    const customerId = useParams().id!
    const customer = useSelector(selectCustomerById(customerId))

    if (typeof customer === "undefined") {
        return <Col><Card><Card.Body><Card.Title><Alert variant="warning">Klient nieznaleziony</Alert></Card.Title> </Card.Body></Card></Col>
    }

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>Imię i nazwisko: {customer.first_name} {customer.last_name}</Card.Title>
                    <Card.Text>
                        Numer telefonu: {customer.telephone_number}
                    </Card.Text>
                    <DeleteCustomer/>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CustomerDetails